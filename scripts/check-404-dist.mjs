#!/usr/bin/env node
/**
 * Fail if dist/404.html is missing or lacks the branded GitHub Pages 404 shell.
 *
 * Checks:
 * - dist/404.html exists at the Pages output root
 * - heading text "Page not found"
 * - robots noindex meta
 * - CSS/JS/image href|src values are root-absolute or absolute URLs
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const HEADING = "Page not found";
const ASSET_ATTR_RE =
  /\b(?:href|src)=(["'])([^"']+)\1/gi;
const ABSOLUTE_RE = /^(?:\/|https?:|mailto:|tel:|#|data:)/i;

function parseArgs(argv) {
  const args = { dist: join(ROOT, "dist") };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dist") args.dist = resolve(argv[++i]);
    else if (arg === "--help" || arg === "-h") args.help = true;
  }
  return args;
}

function collectRelativeAssets(html) {
  const relative = [];
  for (const match of html.matchAll(ASSET_ATTR_RE)) {
    const value = match[2];
    if (!ABSOLUTE_RE.test(value)) {
      relative.push(value);
    }
  }
  return relative;
}

function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  if (args.help) {
    console.log("Usage: node scripts/check-404-dist.mjs [--dist dist]");
    return 0;
  }

  const pagePath = join(args.dist, "404.html");
  if (!existsSync(pagePath)) {
    console.error(`FAIL: missing ${pagePath}`);
    return 1;
  }

  const html = readFileSync(pagePath, "utf8");
  const errors = [];

  if (!html.includes(HEADING)) {
    errors.push(`missing heading text ${JSON.stringify(HEADING)}`);
  }
  if (!/name=["']robots["'][^>]*content=["']noindex["']/i.test(html)
    && !/content=["']noindex["'][^>]*name=["']robots["']/i.test(html)) {
    errors.push('missing <meta name="robots" content="noindex">');
  }

  const relative = collectRelativeAssets(html);
  if (relative.length) {
    errors.push(
      `non-absolute asset path(s): ${relative
        .slice(0, 8)
        .map((value) => JSON.stringify(value))
        .join(", ")}`,
    );
  }

  if (errors.length) {
    console.error("404 dist check FAILED:");
    for (const err of errors) {
      console.error(`  ${err}`);
    }
    return 1;
  }

  console.log(`404 dist check OK: ${pagePath}`);
  return 0;
}

process.exit(main());
