/**
 * Fail when English site title/tagline/deck/description/about_lead are
 * hand-typed outside data/site.json.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve, extname } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const SITE_JSON = join(ROOT, "data", "site.json");

const SKIP_DIR_NAMES = new Set([
  ".git",
  ".cursor",
  "dist",
  "node_modules",
  "coverage",
  "__pycache__",
  ".venv",
  "shots",
]);

const SKIP_SUFFIXES = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".pdf",
  ".pyc",
  ".map",
]);

const TEXT_SUFFIXES = new Set([
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".md",
  ".json",
  ".html",
  ".css",
  ".txt",
  ".yml",
  ".yaml",
  ".svg",
  ".toml",
  ".cfg",
  ".ini",
]);

function loadCopy() {
  const payload = JSON.parse(readFileSync(SITE_JSON, "utf8"));
  const required = ["title", "tagline", "deck", "description", "about_lead"];
  const missing = required.filter(
    (key) => typeof payload[key] !== "string" || !payload[key].trim()
  );
  if (missing.length) {
    throw new Error(`data/site.json missing fields: ${missing.join(", ")}`);
  }
  return Object.fromEntries(required.map((key) => [key, payload[key].trim()]));
}

function iterSourceFiles(dir = ROOT, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (SKIP_DIR_NAMES.has(name)) continue;
    const st = statSync(path);
    if (st.isDirectory()) {
      iterSourceFiles(path, files);
      continue;
    }
    if (resolve(path) === resolve(SITE_JSON)) continue;
    const suffix = extname(path).toLowerCase();
    if (SKIP_SUFFIXES.has(suffix)) continue;
    if (!TEXT_SUFFIXES.has(suffix) && !["CNAME", "Makefile", "Dockerfile"].includes(name)) {
      try {
        readFileSync(path, "utf8");
      } catch {
        continue;
      }
    }
    files.push(path);
  }
  return files.sort();
}

function titlePattern(title) {
  const escaped = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![A-Za-z0-9.-])${escaped}(?![A-Za-z0-9.-])`);
}

function findHandTyped(path, copy) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return [];
  }
  const rel = relative(ROOT, path).split("\\").join("/");
  const checks = [
    ["title", titlePattern(copy.title)],
    ["tagline", new RegExp(copy.tagline.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))],
    ["deck", new RegExp(copy.deck.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))],
    [
      "description",
      new RegExp(copy.description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    ],
  ];
  if (copy.about_lead !== copy.tagline && copy.about_lead !== copy.description) {
    checks.push([
      "about_lead",
      new RegExp(copy.about_lead.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    ]);
  }

  const hits = [];
  for (const [lineNo, line] of text.split(/\r?\n/).entries()) {
    for (const [label, pattern] of checks) {
      if (pattern.test(line)) {
        hits.push(`${rel}:${lineNo + 1}: hand-typed ${label}: ${line.trim()}`);
      }
    }
  }
  return hits;
}

describe("site copy source of truth", () => {
  it("keeps required fields in data/site.json", () => {
    const copy = loadCopy();
    assert.equal(typeof copy.title, "string");
    assert.ok(copy.title.length > 0);
    assert.ok(copy.tagline.length > 0);
    assert.ok(copy.deck.length > 0);
    assert.ok(copy.description.length > 0);
    assert.ok(copy.about_lead.length > 0);
  });

  it("fails when site wording is hand-typed outside data/site.json", () => {
    const copy = loadCopy();
    const violations = [];
    for (const path of iterSourceFiles()) {
      violations.push(...findHandTyped(path, copy));
    }
    if (violations.length) {
      const sample = violations.slice(0, 40).join("\n");
      const more =
        violations.length > 40
          ? `\n... and ${violations.length - 40} more`
          : "";
      assert.fail(
        `Site title/tagline/deck/description must live only in data/site.json.\nFound ${violations.length} hand-typed occurrence(s):\n${sample}${more}`
      );
    }
  });
});
