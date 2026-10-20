#!/usr/bin/env node
/**
 * Fail if dist HTML analytics loaders drift from data/analytics.json.
 *
 * Checks each built *.html page:
 * - exactly one data-sn-analytics-loader script (zero or two+ fails; names the file)
 * - every GA4 id and CF beacon token found must appear in the registry
 * - every internal-cookie name referenced must be the registry primary or a
 *   per-host legacy_internal_cookies entry
 * - CF beacon spa must match the registry boolean
 *
 * Also scans dist/assets/*.js for IDs / cookie / spa drift (Vite SPA bundles).
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LOADER_ATTR = "data-sn-analytics-loader";

const GA4_RE = /\bG-[A-Z0-9]+\b/g;
const CF_TOKEN_NEAR_BEACON_RE =
  /(?:data-cf-beacon|cloudflareinsights|cf_beacon_token|token["']?\s*:\s*)[^a-f0-9]{0,40}([a-f0-9]{32})/gi;
const SPA_TRUE_RE = /["']spa["']\s*:\s*true|\bspa\s*:\s*true\b|\bspa\s*:\s*!0/;
const SPA_FALSE_RE = /["']spa["']\s*:\s*false|\bspa\s*:\s*false\b|\bspa\s*:\s*!1/;
const STRAY_COOKIE_RE =
  /document\.cookie\s*=\s*(["'])([A-Za-z0-9_-]+)\1|(["'])([A-Za-z0-9_-]+)\3\s*\+\s*['"]=1['"]|indexOf\(\s*(["'])([A-Za-z0-9_-]+)\5\s*\+\s*['"]=1['"]\)/g;
/** Cookie-like *_internal identifiers in HTML/JS (avoids traffic_type:"internal"). */
const INTERNAL_COOKIE_NAME_RE = /\b([A-Za-z0-9]+_internal)\b/g;
const LOADER_BLOCK_RE = new RegExp(
  `<script[^>]*\\b${LOADER_ATTR}\\b[^>]*>([\\s\\S]*?)</script>`,
  "gi",
);

async function loadRegistry(registryPath) {
  const mod = await import(
    pathToFileURL(join(ROOT, "src/analyticsRegistry.js")).href
  );
  const raw = JSON.parse(readFileSync(registryPath, "utf8"));
  return mod.validateAnalyticsPayload(raw, {
    path: registryPath.startsWith(ROOT)
      ? registryPath.slice(ROOT.length + 1)
      : registryPath,
  });
}

function walkHtmlPages(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkHtmlPages(full, out);
    } else if (name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

function htmlPages(dist) {
  const pages = walkHtmlPages(dist).sort();
  if (!pages.length) {
    throw new Error(`no HTML pages under ${dist}`);
  }
  return pages;
}

function assetTexts(dist) {
  const assetsDir = join(dist, "assets");
  if (!existsSync(assetsDir)) return [];
  return readdirSync(assetsDir)
    .filter((name) => name.endsWith(".js"))
    .map((name) => readFileSync(join(assetsDir, name), "utf8"));
}

function collectCookiesFromText(text, into) {
  for (const match of text.matchAll(STRAY_COOKIE_RE)) {
    const name = match[2] || match[4] || match[6];
    if (name) into.add(name);
  }
  for (const match of text.matchAll(INTERNAL_COOKIE_NAME_RE)) {
    into.add(match[1]);
  }
}

function collectCfTokens(text) {
  const tokens = new Set();
  for (const match of text.matchAll(CF_TOKEN_NEAR_BEACON_RE)) {
    tokens.add(match[1]);
  }
  return tokens;
}

function checkPage(path, text, registry, bundleText) {
  const rel = path;
  const errors = [];
  const combined = `${text}\n${bundleText}`;

  const loaderCount = (text.match(new RegExp(LOADER_ATTR, "g")) || []).length;
  if (loaderCount === 0) {
    errors.push(`${rel}: zero analytics loaders (missing ${LOADER_ATTR})`);
  } else if (loaderCount !== 1) {
    errors.push(
      `${rel}: ${loaderCount} analytics loaders (want exactly one ${LOADER_ATTR})`,
    );
  }

  const allowedGa = new Set([registry.primaryGa4Id]);
  const allowedTokens = new Set([registry.primaryCfToken]);
  const allowedCookies = new Set(registry.honourCookies);

  for (const mid of new Set(combined.match(GA4_RE) || [])) {
    if (!allowedGa.has(mid)) {
      errors.push(`${rel}: GA4 id ${JSON.stringify(mid)} not in data/analytics.json`);
    }
  }

  if (
    combined.includes("cloudflareinsights.com/beacon") ||
    combined.includes("data-cf-beacon") ||
    combined.includes("cf_beacon_token")
  ) {
    for (const token of collectCfTokens(combined)) {
      if (!allowedTokens.has(token)) {
        errors.push(
          `${rel}: CF beacon token ${JSON.stringify(token)} not in data/analytics.json`,
        );
      }
    }
  }

  const foundCookies = new Set();
  for (const block of text.matchAll(LOADER_BLOCK_RE)) {
    try {
      const payload = JSON.parse(block[1]);
      if (typeof payload.internal_cookie === "string") {
        foundCookies.add(payload.internal_cookie);
      }
      if (Array.isArray(payload.legacy_internal_cookies)) {
        for (const name of payload.legacy_internal_cookies) {
          if (typeof name === "string") foundCookies.add(name);
        }
      }
      if (payload.spa !== registry.spa) {
        errors.push(
          `${rel}: loader marker spa=${JSON.stringify(payload.spa)} but registry spa=${registry.spa}`,
        );
      }
      if (payload.ga4_measurement_id && !allowedGa.has(payload.ga4_measurement_id)) {
        errors.push(
          `${rel}: loader marker GA4 id ${JSON.stringify(payload.ga4_measurement_id)} not in registry`,
        );
      }
      if (payload.cf_beacon_token && !allowedTokens.has(payload.cf_beacon_token)) {
        errors.push(
          `${rel}: loader marker CF token ${JSON.stringify(payload.cf_beacon_token)} not in registry`,
        );
      }
      if (
        payload.internal_cookie &&
        payload.internal_cookie !== registry.internalCookie
      ) {
        errors.push(
          `${rel}: loader marker cookie ${JSON.stringify(payload.internal_cookie)} != registry ${JSON.stringify(registry.internalCookie)}`,
        );
      }
    } catch {
      errors.push(`${rel}: analytics loader marker is not valid JSON`);
    }
  }
  collectCookiesFromText(combined, foundCookies);

  for (const name of [...foundCookies].sort()) {
    if (!allowedCookies.has(name)) {
      errors.push(
        `${rel}: cookie name ${JSON.stringify(name)} is not registry internal_cookie (${JSON.stringify(registry.internalCookie)}) or legacy_internal_cookies ${JSON.stringify(registry.legacyInternalCookies)}`,
      );
    }
  }

  const hasSpaTrue = SPA_TRUE_RE.test(combined);
  const hasSpaFalse = SPA_FALSE_RE.test(combined);
  if (
    combined.includes("cloudflareinsights.com/beacon") ||
    combined.includes("data-cf-beacon")
  ) {
    if (registry.spa && !hasSpaTrue) {
      errors.push(`${rel}: registry spa is true but CF beacon config lacks spa:true`);
    }
    if (!registry.spa && hasSpaTrue) {
      errors.push(
        `${rel}: registry spa is false but CF beacon sets spa:true (drift)`,
      );
    }
    if (!registry.spa && hasSpaFalse) {
      // Explicit false is fine.
    }
  }

  return errors;
}

function parseArgs(argv) {
  const args = { dist: join(ROOT, "dist"), registry: join(ROOT, "data/analytics.json") };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dist") args.dist = resolve(argv[++i]);
    else if (arg === "--registry") args.registry = resolve(argv[++i]);
    else if (arg === "--help" || arg === "-h") args.help = true;
  }
  return args;
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    console.log(
      "Usage: node scripts/check-analytics-dist.mjs [--dist dist] [--registry data/analytics.json]",
    );
    return 0;
  }

  if (!existsSync(args.dist)) {
    console.error(`FAIL: dist directory missing: ${args.dist}`);
    return 1;
  }
  if (!existsSync(args.registry)) {
    console.error(`FAIL: analytics registry missing: ${args.registry}`);
    return 1;
  }

  const registry = await loadRegistry(args.registry);
  const pages = htmlPages(args.dist);
  const bundleText = assetTexts(args.dist).join("\n");
  const errors = [];

  for (const page of pages) {
    const text = readFileSync(page, "utf8");
    errors.push(...checkPage(page, text, registry, bundleText));
  }

  if (errors.length) {
    console.error("Analytics dist check FAILED:");
    for (const err of errors) {
      console.error(`  ${err}`);
    }
    return 1;
  }

  console.log(
    `Analytics dist check OK: ${pages.length} page(s), ` +
      `version=${registry.version}, cookie=${JSON.stringify(registry.internalCookie)}, ` +
      `spa=${registry.spa}, ga4=${JSON.stringify([registry.primaryGa4Id])}, ` +
      `hosts=${JSON.stringify(Object.keys(registry.hosts))}, ` +
      `legacy_internal_cookies=${JSON.stringify(registry.legacyInternalCookies)}`,
  );
  return 0;
}

const exitCode = await main();
process.exit(exitCode);
