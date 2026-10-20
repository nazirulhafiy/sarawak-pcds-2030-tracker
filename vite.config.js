import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Web Analytics is loaded at runtime from src/analytics.js so
// internal/agent traffic (?internal=1 cookie) can skip the beacon. Do not
// re-introduce a build-time beacon inject here. The analytics registry
// marker (data-sn-analytics-loader) is injected for CI dist checks only.

function loadSiteCopy() {
  return JSON.parse(readFileSync(resolve('data/site.json'), 'utf8'))
}

function loadAnalyticsRegistryFile() {
  return JSON.parse(readFileSync(resolve('data/analytics.json'), 'utf8'))
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

/**
 * Inject exactly one data-sn-analytics-loader JSON marker per HTML page.
 * Runtime GA + CF loading stays in src/analytics.js; this marker is the
 * fleet-aligned CI hook (zero / two+ loaders fail the dist check).
 */
function analyticsLoaderMarkerPlugin() {
  return {
    name: 'analytics-loader-marker',
    transformIndexHtml(html) {
      if (html.includes('data-sn-analytics-loader')) {
        return html
      }
      const reg = loadAnalyticsRegistryFile()
      const hostEntries = Object.entries(reg.hosts || {})
      if (hostEntries.length !== 1) {
        throw new Error('data/analytics.json must define exactly one primary host for this site')
      }
      const [primaryHost, host] = hostEntries[0]
      const payload = {
        version: reg.version,
        internal_cookie: reg.internal_cookie,
        spa: reg.spa,
        host: primaryHost,
        ga4_measurement_id: host.ga4_measurement_id,
        cf_beacon_token: host.cf_beacon_token,
        aliases: host.aliases,
        legacy_internal_cookies: host.legacy_internal_cookies,
      }
      const tag = `<script type="application/json" data-sn-analytics-loader>${JSON.stringify(payload)}</script>`
      if (!html.includes('</head>')) {
        throw new Error('index.html is missing </head>; cannot inject analytics loader marker')
      }
      return html.replace('</head>', `    ${tag}\n  </head>`)
    },
  }
}

export default defineConfig({
  plugins: [react(), siteCopyHtmlPlugin(), analyticsLoaderMarkerPlugin()],
})
