import { isProductionAnalyticsHost } from "./environment.js";

export { isProductionAnalyticsHost };

/** GA4 measurement ID for production property. */
export const GA_MEASUREMENT_ID = "G-QGCDDHPV9X";

/** First-party cookie marking agent/QA/internal traffic. */
export const INTERNAL_TRAFFIC_COOKIE = "pcds_internal";

const INTERNAL_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

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

/**
 * Sync internal cookie from the URL, then load GA4 only on production hosts.
 * Safe to call on Preview/localhost — cookie may still sync; the tag does not load.
 */
export function initAnalytics({
  location: loc = typeof window !== "undefined" ? window.location : null,
  document: doc = typeof document !== "undefined" ? document : null,
  window: win = typeof window !== "undefined" ? window : null,
  measurementId = GA_MEASUREMENT_ID,
} = {}) {
  if (!loc || !doc) return { loaded: false, reason: "no-dom" };

  const secure = loc.protocol === "https:";
  const cookieToSet = cookieFromInternalQuery(loc.search, { secure });
  if (cookieToSet) {
    doc.cookie = cookieToSet;
  }

  if (!isProductionAnalyticsHost(loc.hostname)) {
    return { loaded: false, reason: "non-production-host" };
  }

  if (!win) return { loaded: false, reason: "no-window" };

  const isInternal = hasInternalTrafficCookie(doc.cookie);
  const gtag = ensureGtag(win);
  injectGtagScript(doc, measurementId);
  gtag("js", new Date());
  gtag("config", measurementId, buildGtagConfigFields(isInternal));

  return { loaded: true, internal: isInternal };
}
