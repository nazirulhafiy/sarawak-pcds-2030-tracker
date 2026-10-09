#!/usr/bin/env node
/**
 * Capture consistent UI screenshots for the PCDS tracker (Playwright + system Chrome).
 *
 * Usage:
 *   node tools/shots.mjs --url <https-url or dist/> --out <dir> [--name <base>]
 *     [--crop <css selector> | --clip x,y,w,h] [--pad 24]
 *     [--themes light,dark] [--devices phone,desktop] [--desktop-scale 2]
 *     [--compare <beforeUrl> <afterUrl>]
 *
 * Phone: 390×844 viewport, deviceScaleFactor 3 (~1170px-wide PNG).
 * Desktop: 1280×900, scale 1 (or --desktop-scale 2).
 * Theme is applied before first paint via `pcds-theme` / `data-theme` (see index.html).
 * Site supports light and dark only.
 */

import { chromium } from "playwright-core";
import { promises as fs } from "node:fs";
import { createReadStream, existsSync, statSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUPPORTED_THEMES = ["light", "dark"];

const DISABLE_MOTION_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }
`;

function printHelp() {
  console.log(`Usage:
  node tools/shots.mjs --url <url or local build path> --out <dir> [options]

Options:
  --name <base>           Filename prefix (default: shot)
  --crop <selector>       Crop to element box (+ --pad) at full viewport width
  --clip x,y,w,h          Manual clip rectangle in CSS pixels
  --pad <px>              Padding around --crop selector (default: 24)
  --themes light,dark     Comma-separated themes (default: light,dark)
  --devices phone,desktop Comma-separated devices (default: phone,desktop)
  --desktop-scale <n>     deviceScaleFactor for desktop (default: 1)
  --compare <before> <after>  Capture both URLs and emit side-by-side compares
`);
}

function parseArgs(argv) {
  const args = {
    url: null,
    out: null,
    name: "shot",
    crop: null,
    clip: null,
    pad: 24,
    themes: SUPPORTED_THEMES,
    devices: ["phone", "desktop"],
    desktopScale: 1,
    compare: null,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    switch (token) {
      case "--url":
        args.url = argv[++i];
        break;
      case "--out":
        args.out = argv[++i];
        break;
      case "--name":
        args.name = argv[++i];
        break;
      case "--crop":
        args.crop = argv[++i];
        break;
      case "--clip": {
        const parts = argv[++i].split(",").map((n) => Number(n.trim()));
        if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) {
          throw new Error("--clip expects x,y,width,height");
        }
        args.clip = { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
        break;
      }
      case "--pad":
        args.pad = Number(argv[++i]);
        break;
      case "--themes":
        args.themes = argv[++i].split(",").map((t) => t.trim()).filter(Boolean);
        break;
      case "--devices":
        args.devices = argv[++i].split(",").map((d) => d.trim()).filter(Boolean);
        break;
      case "--desktop-scale":
        args.desktopScale = Number(argv[++i]);
        break;
      case "--compare":
        args.compare = [argv[++i], argv[++i]];
        break;
      case "-h":
      case "--help":
        printHelp();
        process.exit(0);
        break;
      default:
        throw new Error(`Unknown argument: ${token}`);
    }
  }

  if (!args.out) {
    throw new Error("--out is required");
  }
  if (!args.compare && !args.url) {
    throw new Error("--url is required (unless using --compare)");
  }
  if (args.compare && args.url) {
    throw new Error("Use either --url or --compare, not both");
  }

  for (const theme of args.themes) {
    if (!SUPPORTED_THEMES.includes(theme)) {
      throw new Error(`Unsupported theme "${theme}" (site supports: ${SUPPORTED_THEMES.join(", ")})`);
    }
  }

  return args;
}

function deviceConfig(device, desktopScale) {
  if (device === "phone") {
    return { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 };
  }
  if (device === "desktop") {
    return {
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: desktopScale,
    };
  }
  throw new Error(`Unknown device "${device}" (use phone or desktop)`);
}

async function resolveTargetUrl(input, serverRef) {
  if (!input) {
    throw new Error("Missing URL");
  }
  if (/^https?:\/\//i.test(input)) {
    return input;
  }

  const resolved = path.resolve(input);
  if (!existsSync(resolved)) {
    throw new Error(`Path not found: ${resolved}`);
  }

  const stat = statSync(resolved);
  if (stat.isFile()) {
    return `file://${resolved}`;
  }

  const root = resolved;
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://local").pathname);
    let filePath = path.join(root, urlPath === "/" ? "index.html" : urlPath);
    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (!existsSync(filePath) || !filePath.startsWith(root)) {
      filePath = path.join(root, "index.html");
    }
    const stream = createReadStream(filePath);
    stream.on("error", () => {
      res.statusCode = 404;
      res.end("Not found");
    });
    stream.pipe(res);
  });

  await new Promise((resolveListen, reject) => {
    server.listen(0, "127.0.0.1", (err) => (err ? reject(err) : resolveListen()));
  });
  const { port } = server.address();
  serverRef.current = server;
  return `http://127.0.0.1:${port}/`;
}

const THEME_INIT_SCRIPT = ({ themeValue, css }) => {
  try {
    localStorage.setItem("pcds-theme", themeValue);
    sessionStorage.setItem("pcds-v2-intro-seen", "1");
  } catch {
    /* ignore */
  }
  const root = document.documentElement;
  root.dataset.theme = themeValue;
  root.style.colorScheme = themeValue;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute(
      "content",
      themeValue === "dark" ? "#121212" : "#ffffff",
    );
  }
  const style = document.createElement("style");
  style.setAttribute("data-shots-tool", "true");
  style.textContent = css;
  document.documentElement.appendChild(style);
};

async function waitForRender(page, cropSelector) {
  await page.waitForFunction(() => document.fonts?.ready, { timeout: 30_000 });
  await page.evaluate(() => document.fonts.ready);
  if (cropSelector) {
    const target = page.locator(cropSelector).first();
    await target.waitFor({ state: "visible", timeout: 30_000 });
    await target.scrollIntoViewIfNeeded();
    await page.waitForFunction(
      (selector) => {
        const el = document.querySelector(selector);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.height >= 120 && rect.width >= 120;
      },
      cropSelector,
      { timeout: 30_000 },
    );
  } else {
    await page.waitForSelector("#root", { state: "attached", timeout: 30_000 });
  }
  await page.waitForTimeout(250);
}

async function computeClip(page, { crop, clip, pad }) {
  if (clip) {
    return clip;
  }
  if (!crop) {
    return null;
  }

  const viewport = page.viewportSize();
  const locator = page.locator(crop).first();
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(50);
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error(`Crop selector not found: ${crop}`);
  }

  const maxHeight = viewport.width * 1.3;
  const paddedTop = Math.max(0, box.y - pad);
  const paddedHeight = box.height + pad * 2;
  const height = Math.min(paddedHeight, maxHeight);

  return {
    x: 0,
    y: paddedTop,
    width: viewport.width,
    height,
  };
}

async function captureShot(page, options) {
  const { theme, crop, clip, pad } = options;
  await page.addInitScript(THEME_INIT_SCRIPT, {
    themeValue: theme,
    css: DISABLE_MOTION_CSS,
  });

  await page.goto(options.url, { waitUntil: "networkidle", timeout: 120_000 });
  await waitForRender(page, crop);

  const bodyBg = await page.evaluate(() => {
    const bg = getComputedStyle(document.body).backgroundColor;
    return bg;
  });
  console.log(`[shots] theme=${theme} device=${options.device} body background: ${bodyBg}`);

  const clipRect = await computeClip(page, { crop, clip, pad });
  const screenshotOptions = {
    type: "png",
    omitBackground: false,
    animations: "disabled",
  };
  if (clipRect) {
    screenshotOptions.clip = clipRect;
  }

  return page.screenshot(screenshotOptions);
}

async function launchBrowser() {
  return chromium.launch({
    channel: "chrome",
    headless: true,
  });
}

async function withPage(browser, device, desktopScale, fn) {
  const config = deviceConfig(device, desktopScale);
  const context = await browser.newContext({
    viewport: config.viewport,
    deviceScaleFactor: config.deviceScaleFactor,
  });
  const page = await context.newPage();
  try {
    return await fn(page);
  } finally {
    await context.close();
  }
}

async function writePng(outDir, filename, buffer) {
  await fs.mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, filename);
  await fs.writeFile(filePath, buffer);
  return filePath;
}

async function pngDimensions(buffer) {
  if (buffer.length < 24) return { width: 0, height: 0 };
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

async function comparePngBuffers(page, left, right) {
  const leftB64 = left.toString("base64");
  const rightB64 = right.toString("base64");
  return page.evaluate(
    async ({ a, b }) => {
      const load = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      const [imgA, imgB] = await Promise.all([
        load(`data:image/png;base64,${a}`),
        load(`data:image/png;base64,${b}`),
      ]);
      const width = Math.max(imgA.width, imgB.width);
      const height = Math.max(imgA.height, imgB.height);
      const canvasA = document.createElement("canvas");
      const canvasB = document.createElement("canvas");
      canvasA.width = canvasB.width = width;
      canvasA.height = canvasB.height = height;
      const ctxA = canvasA.getContext("2d");
      const ctxB = canvasB.getContext("2d");
      ctxA.fillStyle = "#ffffff";
      ctxB.fillStyle = "#ffffff";
      ctxA.fillRect(0, 0, width, height);
      ctxB.fillRect(0, 0, width, height);
      ctxA.drawImage(imgA, 0, 0);
      ctxB.drawImage(imgB, 0, 0);
      const dataA = ctxA.getImageData(0, 0, width, height).data;
      const dataB = ctxB.getImageData(0, 0, width, height).data;
      let diff = 0;
      for (let i = 0; i < dataA.length; i += 4) {
        if (
          dataA[i] !== dataB[i]
          || dataA[i + 1] !== dataB[i + 1]
          || dataA[i + 2] !== dataB[i + 2]
          || dataA[i + 3] !== dataB[i + 3]
        ) {
          diff += 1;
        }
      }
      const side = document.createElement("canvas");
      side.width = width * 2;
      side.height = height;
      const sctx = side.getContext("2d");
      sctx.fillStyle = "#ffffff";
      sctx.fillRect(0, 0, side.width, side.height);
      sctx.drawImage(imgA, 0, 0);
      sctx.drawImage(imgB, width, 0);
      return {
        diffPixels: diff,
        width: side.width,
        height: side.height,
        dataUrl: side.toDataURL("image/png"),
      };
    },
    { a: leftB64, b: rightB64 },
  );
}

async function runSingle(args, browser, serverRef) {
  const url = await resolveTargetUrl(args.url, serverRef);
  const written = [];

  for (const device of args.devices) {
    for (const theme of args.themes) {
      const buffer = await withPage(browser, device, args.desktopScale, (page) =>
        captureShot(page, {
          url,
          theme,
          device,
          crop: args.crop,
          clip: args.clip,
          pad: args.pad,
        }),
      );
      const filename = `${args.name}-${device}-${theme}.png`;
      const filePath = await writePng(args.out, filename, buffer);
      const dims = await pngDimensions(buffer);
      console.log(`[shots] wrote ${filePath} (${dims.width}×${dims.height}px)`);
      written.push({ filePath, dims, device, theme });
    }
  }
  return written;
}

async function runCompare(args, browser, serverRef) {
  const [beforeInput, afterInput] = args.compare;
  const beforeUrl = await resolveTargetUrl(beforeInput, serverRef);
  const afterUrl = await resolveTargetUrl(afterInput, serverRef);
  const written = [];

  for (const device of args.devices) {
    for (const theme of args.themes) {
      const before = await withPage(browser, device, args.desktopScale, (page) =>
        captureShot(page, {
          url: beforeUrl,
          theme,
          device,
          crop: args.crop,
          clip: args.clip,
          pad: args.pad,
        }),
      );
      const after = await withPage(browser, device, args.desktopScale, (page) =>
        captureShot(page, {
          url: afterUrl,
          theme,
          device,
          crop: args.crop,
          clip: args.clip,
          pad: args.pad,
        }),
      );

      const beforeName = `${args.name}-${device}-${theme}-before.png`;
      const afterName = `${args.name}-${device}-${theme}-after.png`;
      const beforePath = await writePng(args.out, beforeName, before);
      const afterPath = await writePng(args.out, afterName, after);
      const beforeDims = await pngDimensions(before);
      const afterDims = await pngDimensions(after);
      console.log(`[shots] wrote ${beforePath} (${beforeDims.width}×${beforeDims.height}px)`);
      console.log(`[shots] wrote ${afterPath} (${afterDims.width}×${afterDims.height}px)`);

      const compareDevice = deviceConfig(device, args.desktopScale);
      const context = await browser.newContext({
        viewport: compareDevice.viewport,
        deviceScaleFactor: compareDevice.deviceScaleFactor,
      });
      const page = await context.newPage();
      const { diffPixels, dataUrl, width, height } = await comparePngBuffers(
        page,
        before,
        after,
      );
      await context.close();

      const compareName = `${args.name}-${device}-${theme}-compare.png`;
      const comparePath = path.join(args.out, compareName);
      await fs.mkdir(args.out, { recursive: true });
      const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
      await fs.writeFile(comparePath, Buffer.from(base64, "base64"));
      console.log(
        `[shots] compare ${device}/${theme}: ${diffPixels} differing pixels → ${comparePath} (${width}×${height}px)`,
      );
      written.push({
        beforePath,
        afterPath,
        comparePath,
        diffPixels,
        device,
        theme,
        dims: { width, height },
      });
    }
  }
  return written;
}

async function main() {
  const args = parseArgs(process.argv);
  const serverRef = { current: null };
  const browser = await launchBrowser();

  try {
    if (args.compare) {
      await runCompare(args, browser, serverRef);
    } else {
      await runSingle(args, browser, serverRef);
    }
  } finally {
    await browser.close();
    if (serverRef.current) {
      serverRef.current.close();
    }
  }
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
