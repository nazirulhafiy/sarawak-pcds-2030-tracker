import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Web Analytics is loaded at runtime from src/analytics.js so
// internal/agent traffic (?internal=1 cookie) can skip the beacon. Do not
// re-introduce a build-time HTML inject here.

function loadSiteCopy() {
  return JSON.parse(readFileSync(resolve('data/site.json'), 'utf8'))
}

function escapeHtmlAttr(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/** Fill index.html site title/description placeholders from data/site.json. */
function siteCopyHtmlPlugin() {
  return {
    name: 'site-copy-html',
    transformIndexHtml(html) {
      const site = loadSiteCopy()
      return html
        .replaceAll('__SITE_TITLE__', escapeHtmlAttr(site.title))
        .replaceAll('__SITE_DESCRIPTION__', escapeHtmlAttr(site.description))
    },
  }
}

export default defineConfig({
  plugins: [react(), siteCopyHtmlPlugin()],
})
