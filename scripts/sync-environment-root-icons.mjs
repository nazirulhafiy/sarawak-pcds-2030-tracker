#!/usr/bin/env node
import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const environments = new Set(["production", "preview", "development"]);
const environment = process.argv[2] || "production";

if (!environments.has(environment)) {
  console.error(
    `Unknown icon environment: ${environment}. Expected production, preview, or development.`,
  );
  process.exit(1);
}

const distDir = resolve("dist");
const mappings = [
  [`favicon-${environment}.ico`, "favicon.ico"],
  [`favicon-${environment}-browser.png`, "favicon-browser.png"],
  [`apple-touch-icon-${environment}.png`, "apple-touch-icon.png"],
  [`favicon-${environment}-16x16.png`, "favicon-16x16.png"],
  [`favicon-${environment}-32x32.png`, "favicon-32x32.png"],
  [`favicon-${environment}-48x48.png`, "favicon-48x48.png"],
];

for (const [sourceName, destinationName] of mappings) {
  const sourcePath = resolve(distDir, sourceName);
  const destinationPath = resolve(distDir, destinationName);

  if (!existsSync(sourcePath)) {
    console.error(`Missing ${sourcePath}. Run vite build before syncing root icons.`);
    process.exit(1);
  }

  copyFileSync(sourcePath, destinationPath);
}

console.log(`Synced ${environment} root favicon aliases in dist/.`);
