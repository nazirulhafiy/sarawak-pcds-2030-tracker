#!/usr/bin/env node
// PR docs guard — watched design/behaviour paths (also in docs/ci-docs-check.md):
// - src .jsx and .css under src/
// - public favicons, touch icons, social preview images
// - scripts/prerender.mjs, scripts/write-cname.mjs, vite.config.js
// Not watched: tracker data, localization, updateHistory, content-only paths.

const WATCHED_PATH_TESTS = [
  /^src\/.*\.jsx$/,
  /^src\/.*\.css$/,
  /^public\/(?:favicon|apple-touch-icon|social-preview).+/,
  /^scripts\/(?:prerender|write-cname)\.mjs$/,
  /^vite\.config\.js$/,
];

const DOCS_PREFIX = 'docs/';
const NO_DOCS_LABEL = 'no-docs-needed';
const FAIL_MESSAGE =
  "This PR changes how the site looks or behaves but doesn't update docs/. Update docs/design.md, or add the no-docs-needed label if no doc change is needed.";

function isWatchedPath(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return WATCHED_PATH_TESTS.some((re) => re.test(normalized));
}

function hasDocsChange(files) {
  return files.some((f) => f.replace(/\\/g, '/').startsWith(DOCS_PREFIX));
}

function parseLabels(raw) {
  if (!raw || !String(raw).trim()) return [];
  return String(raw)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function readChangedFiles() {
  const fromEnv = process.env.CHANGED_FILES;
  if (fromEnv && fromEnv.trim()) {
    return fromEnv
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
  return [];
}

const headRef = process.env.PR_HEAD_REF || '';
const baseRef = process.env.PR_BASE_REF || '';
const labels = parseLabels(process.env.PR_LABELS);
const files = readChangedFiles();

// Promote PR: preview → main is a branch promotion; do not require per-file docs on the aggregate diff.
if (headRef === 'preview' && baseRef === 'main') {
  process.exit(0);
}

if (labels.includes(NO_DOCS_LABEL)) {
  process.exit(0);
}

const watchedChanges = files.filter(isWatchedPath);
if (watchedChanges.length === 0) {
  process.exit(0);
}

if (hasDocsChange(files)) {
  process.exit(0);
}

console.error(FAIL_MESSAGE);
console.error('');
console.error('Watched files changed in this PR:');
for (const f of watchedChanges) {
  console.error(`  - ${f}`);
}
process.exit(1);
