import payload from "../data/analytics.json" with { type: "json" };

/** Marker attribute injected once per built HTML page for CI dist checks. */
export const ANALYTICS_LOADER_ATTR = "data-sn-analytics-loader";

const GA4_ID_RE = /^G-[A-Z0-9]+$/;
const CF_TOKEN_RE = /^[a-f0-9]{32}$/;
const HOST_RE = /^[a-z0-9.-]+$/;
const COOKIE_RE = /^[A-Za-z0-9_-]+$/;

const TOP_LEVEL_KEYS = new Set(["version", "internal_cookie", "spa", "hosts"]);
const HOST_ENTRY_KEYS = new Set([
  "ga4_measurement_id",
  "cf_beacon_token",
  "aliases",
  "legacy_internal_cookies",
]);

function requireString(obj, key, path) {
  const value = obj[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${path}: ${key} must be a non-empty string`);
  }
  return value.trim();
}

function requireStringList(obj, key, path) {
  const raw = obj[key];
  if (!Array.isArray(raw)) {
    throw new Error(`${path}: ${key} must be an array of strings`);
  }
  return raw.map((item, i) => {
    if (typeof item !== "string" || !item.trim()) {
      throw new Error(`${path}: ${key}[${i}] must be a non-empty string`);
    }
    return item.trim();
  });
}

/**
 * Validate kit-aligned analytics registry shape (version 1).
 * Shared fleet fields match sarawak-news-hub / bantuan-sarawak.
 */
export function validateAnalyticsPayload(
  raw,
  { path = "data/analytics.json" } = {},
) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new Error(`${path} must be a JSON object`);
  }

  const unknown = Object.keys(raw).filter((k) => !TOP_LEVEL_KEYS.has(k));
  if (unknown.length) {
    throw new Error(`${path}: unknown keys: ${unknown.sort().join(", ")}`);
  }
  for (const key of TOP_LEVEL_KEYS) {
    if (!(key in raw)) {
      throw new Error(`${path}: missing key ${key}`);
    }
  }

  if (raw.version !== 1) {
    throw new Error(`${path}: version must be 1, got ${JSON.stringify(raw.version)}`);
  }

  const internalCookie = requireString(raw, "internal_cookie", path);
  if (!COOKIE_RE.test(internalCookie)) {
    throw new Error(`${path}: internal_cookie has invalid characters: ${internalCookie}`);
  }

  if (typeof raw.spa !== "boolean") {
    throw new Error(`${path}: spa must be a boolean`);
  }

  const hostsRaw = raw.hosts;
  if (!hostsRaw || typeof hostsRaw !== "object" || Array.isArray(hostsRaw)) {
    throw new Error(`${path}: hosts must be a non-empty object keyed by hostname`);
  }
  const hostKeys = Object.keys(hostsRaw);
  if (!hostKeys.length) {
    throw new Error(`${path}: hosts must be a non-empty object keyed by hostname`);
  }

  const hosts = {};
  const seenNames = new Set();

  for (const host of hostKeys) {
    if (!HOST_RE.test(host)) {
      throw new Error(`${path}: invalid host key ${JSON.stringify(host)}`);
    }
    if (seenNames.has(host)) {
      throw new Error(`${path}: duplicate hostname ${host}`);
    }
    seenNames.add(host);

    const entry = hostsRaw[host];
    const entryPath = `${path}.hosts[${JSON.stringify(host)}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error(`${entryPath} must be an object`);
    }

    const entryUnknown = Object.keys(entry).filter((k) => !HOST_ENTRY_KEYS.has(k));
    if (entryUnknown.length) {
      throw new Error(`${entryPath}: unknown keys: ${entryUnknown.sort().join(", ")}`);
    }
    for (const key of HOST_ENTRY_KEYS) {
      if (!(key in entry)) {
        throw new Error(`${entryPath}: missing key ${key}`);
      }
    }

    const ga4Id = requireString(entry, "ga4_measurement_id", entryPath);
    if (!GA4_ID_RE.test(ga4Id)) {
      throw new Error(`${entryPath}: ga4_measurement_id invalid: ${ga4Id}`);
    }
    const token = requireString(entry, "cf_beacon_token", entryPath);
    if (!CF_TOKEN_RE.test(token)) {
      throw new Error(`${entryPath}: cf_beacon_token invalid: ${token}`);
    }

    const aliases = requireStringList(entry, "aliases", entryPath);
    for (let i = 0; i < aliases.length; i += 1) {
      const alias = aliases[i];
      if (!HOST_RE.test(alias)) {
        throw new Error(`${entryPath}: aliases[${i}] invalid: ${alias}`);
      }
      if (alias === host) {
        throw new Error(`${entryPath}: aliases must not repeat the primary host`);
      }
      if (seenNames.has(alias)) {
        throw new Error(`${entryPath}: duplicate hostname via aliases: ${alias}`);
      }
      seenNames.add(alias);
    }

    const legacy = requireStringList(entry, "legacy_internal_cookies", entryPath);
    for (let i = 0; i < legacy.length; i += 1) {
      if (!COOKIE_RE.test(legacy[i])) {
        throw new Error(
          `${entryPath}: legacy_internal_cookies[${i}] has invalid characters: ${legacy[i]}`,
        );
      }
    }

    hosts[host] = {
      primary: host,
      ga4MeasurementId: ga4Id,
      cfBeaconToken: token,
      aliases,
      legacyInternalCookies: legacy,
    };
  }

  const hostnames = [];
  const legacyInternalCookies = [];
  for (const entry of Object.values(hosts)) {
    for (const name of [entry.primary, ...entry.aliases]) {
      if (!hostnames.includes(name)) hostnames.push(name);
    }
    for (const name of entry.legacyInternalCookies) {
      if (!legacyInternalCookies.includes(name)) legacyInternalCookies.push(name);
    }
  }

  const honourCookies = [internalCookie];
  for (const name of legacyInternalCookies) {
    if (!honourCookies.includes(name)) honourCookies.push(name);
  }

  const ga4Ids = [...new Set(Object.values(hosts).map((h) => h.ga4MeasurementId))];
  const cfTokens = [...new Set(Object.values(hosts).map((h) => h.cfBeaconToken))];

  if (ga4Ids.length !== 1) {
    throw new Error(
      `${path}: expected one GA4 measurement id across hosts, got ${JSON.stringify(ga4Ids)}`,
    );
  }
  if (cfTokens.length !== 1) {
    throw new Error(
      `${path}: expected one CF beacon token across hosts, got ${JSON.stringify(cfTokens)}`,
    );
  }

  return {
    version: raw.version,
    internalCookie,
    spa: raw.spa,
    hosts,
    hostnames,
    legacyInternalCookies,
    honourCookies,
    primaryGa4Id: ga4Ids[0],
    primaryCfToken: cfTokens[0],
  };
}

export function loadAnalyticsRegistry(raw = payload) {
  return validateAnalyticsPayload(raw);
}

export const analyticsRegistry = loadAnalyticsRegistry();
