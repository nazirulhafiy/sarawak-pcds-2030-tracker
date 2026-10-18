import { isProductionAnalyticsHost } from "./environment.js";

export { isProductionAnalyticsHost };

/** GA4 measurement ID for production property. */
export const GA_MEASUREMENT_ID = "G-QGCDDHPV9X";

/** Cloudflare Web Analytics token (same value formerly in vite.config.js). */
export const CLOUDFLARE_WEB_ANALYTICS_TOKEN = "5e17ff78afe6423a8a9834b7870b55fd";

/** First-party cookie marking agent/QA/internal traffic. */
export const INTERNAL_TRAFFIC_COOKIE = "pcds_internal";

const INTERNAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

const CLOUDFLARE_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

export function readCookie(cookieName, cookieHeader = "") {
  const parts = String(cookieHeader).split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    const name = eq === -1 ? trimmed : trimmed.slice(0, eq);
    if (name === cookieName) {
      return eq === -1 ? "" : trimmed.slice(eq + 1);
    }
  }
  return null;
}

export function hasInternalTrafficCookie(cookieHeader = "") {
  return readCookie(INTERNAL_TRAFFIC_COOKIE, cookieHeader) === "1";
}

export function buildInternalTrafficCookie(value, { maxAgeSeconds, secure } = {}) {
  if (value === "0" || value === null || value === undefined) {
    return `${INTERNAL_TRAFFIC_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax${secure ? "; Secure" : ""}`;
  }
  const age = maxAgeSeconds ?? INTERNAL_COOKIE_MAX_AGE_SECONDS;
  return `${INTERNAL_TRAFFIC_COOKIE}=1; Path=/; Max-Age=${age}; SameSite=Lax${secure ? "; Secure" : ""}`;
}

/**
 * Apply `?internal=1` (set) / `?internal=0` (clear) from a query string.
 * Returns the Set-Cookie string to assign, or null when unchanged.
 */
export function cookieFromInternalQuery(search, { secure = false } = {}) {
  const params = new URLSearchParams(
    String(search || "").startsWith("?") ? String(search).slice(1) : search,
  );
  const value = params.get("internal");
  if (value === "1") {
    return buildInternalTrafficCookie("1", { secure });
  }
  if (value === "0") {
    return buildInternalTrafficCookie("0", { secure });
  }
  return null;
}

/** gtag config fields when the internal-traffic cookie is present. */
export function buildGtagConfigFields(isInternal) {
  if (!isInternal) return {};
  return { traffic_type: "internal" };
}

function ensureGtag(win) {
  win.dataLayer = win.dataLayer || [];
  if (typeof win.gtag !== "function") {
    win.gtag = function gtag() {
      win.dataLayer.push(arguments);
    };
  }
  return win.gtag;
}

function injectGtagScript(doc, measurementId) {
  const src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  if (doc.querySelector(`script[src="${src}"]`)) return;
  const script = doc.createElement("script");
  script.async = true;
  script.src = src;
  doc.head.appendChild(script);
}

export function injectCloudflareBeacon(
  doc,
  token = CLOUDFLARE_WEB_ANALYTICS_TOKEN,
) {
  if (doc.querySelector(`script[src="${CLOUDFLARE_BEACON_SRC}"]`)) return false;
  const script = doc.createElement("script");
  script.defer = true;
  script.src = CLOUDFLARE_BEACON_SRC;
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token, spa: true }),
  );
  const parent = doc.body || doc.head;
  parent.appendChild(script);
  return true;
}

/**
 * Sync internal cookie from the URL, then on production hosts:
 * - load GA4 (with `traffic_type: 'internal'` when the cookie is set)
 * - load Cloudflare Web Analytics only for non-internal visits
 *
 * Safe to call on Preview/localhost — cookie may still sync; tags do not load.
 */
export function initAnalytics({
  location: loc = typeof window !== "undefined" ? window.location : null,
  document: doc = typeof document !== "undefined" ? document : null,
  window: win = typeof window !== "undefined" ? window : null,
  measurementId = GA_MEASUREMENT_ID,
  cloudflareToken = CLOUDFLARE_WEB_ANALYTICS_TOKEN,
} = {}) {
  if (!loc || !doc) {
    return { loaded: false, gaLoaded: false, cloudflareLoaded: false, reason: "no-dom" };
  }

  const secure = loc.protocol === "https:";
  const cookieToSet = cookieFromInternalQuery(loc.search, { secure });
  if (cookieToSet) {
    doc.cookie = cookieToSet;
  }

  if (!isProductionAnalyticsHost(loc.hostname)) {
    return {
      loaded: false,
      gaLoaded: false,
      cloudflareLoaded: false,
      reason: "non-production-host",
    };
  }

  if (!win) {
    return { loaded: false, gaLoaded: false, cloudflareLoaded: false, reason: "no-window" };
  }

  const isInternal = hasInternalTrafficCookie(doc.cookie);
  const gtag = ensureGtag(win);
  injectGtagScript(doc, measurementId);
  gtag("js", new Date());
  gtag("config", measurementId, buildGtagConfigFields(isInternal));

  let cloudflareLoaded = false;
  if (!isInternal) {
    cloudflareLoaded = injectCloudflareBeacon(doc, cloudflareToken);
  }

  return {
    loaded: true,
    gaLoaded: true,
    cloudflareLoaded,
    internal: isInternal,
  };
}
