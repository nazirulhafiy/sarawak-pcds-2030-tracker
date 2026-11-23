#!/usr/bin/env node
/**
 * Fails if any expanded project card overflows its box, or if the page
 * gains horizontal scroll, at common phone widths (default 390px).
 *
 * Usage:
 *   node scripts/check-mobile-card-overflow.mjs [--url <url>] [--widths 320,360,390,430]
 *
 * Serves ./dist on a local port when --url is omitted.
 * Requires system Chrome/Chromium (CHROME_PATH overrides) and
 * playwright-core from tools/node_modules.
 */

import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

function loadPlaywright() {
  const candidates = [
    path.join(ROOT, "tools/node_modules/playwright-core"),
    path.join(ROOT, "node_modules/playwright-core"),
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return require(candidate);
    }
  }
  throw new Error(
    "playwright-core not found. Run `npm install` inside tools/ first."
  );
}

const { chromium } = loadPlaywright();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};

function parseArgs(argv) {
  const options = {
    url: null,
    widths: [320, 360, 390, 430],
    themes: ["light", "dark"],
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--url") {
      options.url = argv[++i];
    } else if (arg === "--widths") {
      options.widths = argv[++i].split(",").map((value) => Number(value.trim())).filter(Boolean);
    } else if (arg === "--themes") {
      options.themes = argv[++i].split(",").map((value) => value.trim()).filter(Boolean);
    } else if (arg === "-h" || arg === "--help") {
      console.log(`Usage: node scripts/check-mobile-card-overflow.mjs [--url <url>] [--widths 320,360,390,430]`);
      process.exit(0);
    }
  }
  return options;
}

function resolveChromePath() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  const candidates = [
    "/usr/local/bin/google-chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  return candidates.find((candidate) => existsSync(candidate)) || null;
}

async function serveDist() {
  const dist = path.join(ROOT, "dist");
  if (!existsSync(path.join(dist, "index.html"))) {
    throw new Error("dist/index.html missing. Run `npm run build:preview` first.");
  }

  const server = http.createServer((req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    let filePath = path.join(dist, decodeURIComponent(url.pathname));
    if (filePath.endsWith("/")) {
      filePath = path.join(filePath, "index.html");
    }
    if (!filePath.startsWith(dist)) {
      res.writeHead(403).end("Forbidden");
      return;
    }
    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      const nested = path.join(filePath, "index.html");
      if (existsSync(nested)) {
        filePath = nested;
      } else {
        res.writeHead(404).end("Not found");
        return;
      }
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    createReadStream(filePath).pipe(res);
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return {
    url: `http://127.0.0.1:${port}/?internal=1`,
    close: () => new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve()))),
  };
}

async function measureWidth(page, width, theme) {
  await page.setViewportSize({ width, height: 844 });
  await page.evaluate((nextTheme) => {
    localStorage.setItem("pcds-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
  }, theme);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector(".project-card");
  await page.addStyleTag({
    content: "*, *::before, *::after { animation: none !important; transition: none !important; }",
  });

  await page.evaluate(() => {
    document.querySelectorAll(".project-card-button[aria-expanded='false']").forEach((button) => {
      button.click();
    });
  });
  await page.waitForTimeout(500);

  return page.evaluate((viewportWidth) => {
    const doc = document.documentElement;
    const pageOverflow = doc.scrollWidth > doc.clientWidth + 1;
    const cards = [...document.querySelectorAll(".project-card")].map((card) => {
      const title = card.querySelector(".project-card-title")?.textContent?.trim() || "(untitled)";
      const expanded = card.getAttribute("data-expanded") === "true";
      const overflowPx = card.scrollWidth - card.clientWidth;
      const rect = card.getBoundingClientRect();
      const pastViewport = rect.right > viewportWidth + 1;
      return {
        title,
        expanded,
        overflowPx,
        scrollWidth: card.scrollWidth,
        clientWidth: card.clientWidth,
        pastViewport,
        right: Math.round(rect.right),
      };
    });

    const overflowingCards = cards.filter((card) => card.expanded && (card.overflowPx > 1 || card.pastViewport));
    const clippedText = [];
    for (const card of document.querySelectorAll('.project-card[data-expanded="true"]')) {
      const title = card.querySelector(".project-card-title")?.textContent?.trim() || "(untitled)";
      const cardRight = card.getBoundingClientRect().right;
      card.querySelectorAll(".project-milestone-text, .project-card-title, .source-link span, .project-next-milestone").forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.width < 2) return;
        if (rect.right > cardRight + 1) {
          clippedText.push({
            title,
            text: (node.textContent || "").trim().slice(0, 80),
            right: Math.round(rect.right),
            cardRight: Math.round(cardRight),
          });
        }
      });
    }

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      pageOverflow,
      cardCount: cards.length,
      expandedCount: cards.filter((card) => card.expanded).length,
      overflowingCards,
      clippedText: clippedText.slice(0, 20),
    };
  }, width);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const chromePath = resolveChromePath();
  if (!chromePath) {
    console.error("Chrome/Chromium not found. Set CHROME_PATH or install Google Chrome.");
    process.exit(1);
  }

  let server = null;
  let targetUrl = options.url;
  if (!targetUrl) {
    server = await serveDist();
    targetUrl = server.url;
  } else if (!/[?&]internal=/.test(targetUrl)) {
    targetUrl += targetUrl.includes("?") ? "&internal=1" : "?internal=1";
  }

  const browser = await chromium.launch({
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const failures = [];
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  await page.addInitScript(() => {
    localStorage.setItem("pcds-v2-intro-seen", "1");
  });
  await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 60000 });

  for (const theme of options.themes) {
    for (const width of options.widths) {
      const result = await measureWidth(page, width, theme);
      const label = `${theme}@${width}px`;
      console.log(
        `${label}: page ${result.scrollWidth}/${result.clientWidth}, ` +
          `${result.expandedCount}/${result.cardCount} expanded, ` +
          `${result.overflowingCards.length} overflowing cards, ` +
          `${result.clippedText.length} clipped text nodes`
      );

      if (result.pageOverflow) {
        failures.push(
          `${label}: document scrollWidth ${result.scrollWidth} > clientWidth ${result.clientWidth}`
        );
      }
      for (const card of result.overflowingCards) {
        failures.push(
          `${label}: expanded card "${card.title}" overflow ${card.overflowPx}px ` +
            `(scrollWidth ${card.scrollWidth}, clientWidth ${card.clientWidth})`
        );
      }
      for (const clip of result.clippedText) {
        failures.push(
          `${label}: clipped text in "${clip.title}": "${clip.text}" ` +
            `(right ${clip.right} > card ${clip.cardRight})`
        );
      }
    }
  }

  await browser.close();
  if (server) {
    await server.close();
  }

  if (failures.length > 0) {
    console.error("\nMobile card overflow check failed:");
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log("\nMobile card overflow check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
