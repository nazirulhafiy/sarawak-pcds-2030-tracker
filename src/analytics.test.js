import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CLOUDFLARE_WEB_ANALYTICS_TOKEN,
  GA_MEASUREMENT_ID,
  INTERNAL_TRAFFIC_COOKIE,
  buildGtagConfigFields,
  buildInternalTrafficCookie,
  cookieFromInternalQuery,
  hasInternalTrafficCookie,
  isInternalFlagOnValue,
  isProductionAnalyticsHost,
  readCookie,
  initAnalytics,
} from "./analytics.js";

describe("isProductionAnalyticsHost", () => {
  it("allows only production hostnames", () => {
    assert.equal(isProductionAnalyticsHost("pcds2030.com"), true);
    assert.equal(isProductionAnalyticsHost("www.pcds2030.com"), true);
    assert.equal(isProductionAnalyticsHost("PCDS2030.COM"), true);
  });

  it("rejects preview, localhost, and other hosts", () => {
    assert.equal(isProductionAnalyticsHost("preview.pcds2030.com"), false);
    assert.equal(isProductionAnalyticsHost("localhost"), false);
    assert.equal(isProductionAnalyticsHost("127.0.0.1"), false);
    assert.equal(isProductionAnalyticsHost("pcds-tracker.vercel.app"), false);
    assert.equal(isProductionAnalyticsHost(""), false);
  });
});

describe("internal traffic cookie helpers", () => {
  it("reads and detects the internal cookie", () => {
    assert.equal(readCookie(INTERNAL_TRAFFIC_COOKIE, "a=1; pcds_internal=1; b=2"), "1");
    assert.equal(hasInternalTrafficCookie("pcds_internal=1"), true);
    assert.equal(hasInternalTrafficCookie("pcds_internal=0"), false);
    assert.equal(hasInternalTrafficCookie(""), false);
  });

  it("builds set and clear cookie strings", () => {
    assert.match(
      buildInternalTrafficCookie("1", { secure: true }),
      /^pcds_internal=1; Path=\/; Max-Age=31536000; SameSite=Lax; Secure$/,
    );
    assert.match(
      buildInternalTrafficCookie("0", { secure: false }),
      /^pcds_internal=; Path=\/; Max-Age=0; SameSite=Lax$/,
    );
  });

  it("maps ?internal=1 and ?internal=0 query values", () => {
    assert.match(cookieFromInternalQuery("?internal=1", { secure: true }), /pcds_internal=1/);
    assert.match(cookieFromInternalQuery("internal=0"), /Max-Age=0/);
    assert.equal(cookieFromInternalQuery("?foo=1"), null);
    assert.equal(cookieFromInternalQuery(""), null);
  });

  it("accepts ?internal=1 plus one allowed trailing stray character", () => {
    assert.equal(isInternalFlagOnValue("1"), true);
    assert.equal(isInternalFlagOnValue("1`"), true);
    assert.equal(isInternalFlagOnValue("1."), true);
    assert.equal(isInternalFlagOnValue("1)"), true);
    assert.equal(isInternalFlagOnValue("1]"), true);
    assert.equal(isInternalFlagOnValue("10"), false);
    assert.equal(isInternalFlagOnValue("1x"), false);
    assert.equal(isInternalFlagOnValue("1``"), false);
    assert.equal(isInternalFlagOnValue("2"), false);
    assert.equal(isInternalFlagOnValue(null), false);

    assert.match(cookieFromInternalQuery("?internal=1%60", { secure: true }), /pcds_internal=1/);
    assert.match(cookieFromInternalQuery("?internal=1.", { secure: true }), /pcds_internal=1/);
    assert.match(cookieFromInternalQuery("?internal=1)", { secure: true }), /pcds_internal=1/);
    assert.match(cookieFromInternalQuery("?internal=1]", { secure: true }), /pcds_internal=1/);
    assert.equal(cookieFromInternalQuery("?internal=10"), null);
    assert.equal(cookieFromInternalQuery("?internal=1x"), null);
    assert.equal(cookieFromInternalQuery("?internal=1%60%60"), null);
    assert.equal(cookieFromInternalQuery("?internal=2"), null);
  });
});

describe("buildGtagConfigFields", () => {
  it("adds traffic_type only for internal traffic", () => {
    assert.deepEqual(buildGtagConfigFields(true), { traffic_type: "internal" });
    assert.deepEqual(buildGtagConfigFields(false), {});
  });
});

describe("initAnalytics", () => {
  function fakeDom({ hostname, search = "", protocol = "https:", cookie = "" }) {
    const scripts = [];
    const dataLayer = [];
    let cookieStore = cookie;
    const doc = {
      head: {
        appendChild(node) {
          scripts.push(node);
        },
      },
      body: {
        appendChild(node) {
          scripts.push(node);
        },
      },
      querySelector(selector) {
        const match = /script\[src="([^"]+)"\]/.exec(selector);
        if (!match) return null;
        return scripts.find((s) => s.src === match[1]) || null;
      },
      createElement(tag) {
        const attrs = {};
        return {
          tagName: tag,
          async: false,
          defer: false,
          src: "",
          setAttribute(name, value) {
            attrs[name] = value;
          },
          getAttribute(name) {
            return attrs[name];
          },
        };
      },
    };
    Object.defineProperty(doc, "cookie", {
      get() {
        return cookieStore;
      },
      set(value) {
        const raw = String(value);
        if (raw.includes("Max-Age=0")) {
          cookieStore = "";
          return;
        }
        if (raw.includes(`${INTERNAL_TRAFFIC_COOKIE}=1`)) {
          cookieStore = `${INTERNAL_TRAFFIC_COOKIE}=1`;
        }
      },
      configurable: true,
    });
    return {
      location: { hostname, search, protocol },
      document: doc,
      window: { dataLayer },
      scripts,
      dataLayer,
    };
  }

  it("does not load GA or Cloudflare on preview hosts", () => {
    const env = fakeDom({ hostname: "preview.pcds2030.com", search: "?internal=1" });
    const result = initAnalytics(env);
    assert.equal(result.loaded, false);
    assert.equal(result.gaLoaded, false);
    assert.equal(result.cloudflareLoaded, false);
    assert.equal(result.reason, "non-production-host");
    assert.equal(env.scripts.length, 0);
    assert.equal(env.document.cookie, `${INTERNAL_TRAFFIC_COOKIE}=1`);
  });

  it("loads GA with traffic_type and skips Cloudflare when internal cookie set", () => {
    const env = fakeDom({ hostname: "pcds2030.com", search: "?internal=1" });
    const result = initAnalytics(env);
    assert.equal(result.loaded, true);
    assert.equal(result.internal, true);
    assert.equal(result.gaLoaded, true);
    assert.equal(result.cloudflareLoaded, false);
    assert.equal(env.scripts.length, 1);
    assert.equal(
      env.scripts[0].src,
      `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
    );
    const configCall = env.dataLayer.find(
      (entry) => entry[0] === "config" && entry[1] === GA_MEASUREMENT_ID,
    );
    assert.ok(configCall);
    assert.deepEqual(configCall[2], { traffic_type: "internal" });
    assert.equal(
      env.scripts.some((s) => s.src.includes("cloudflareinsights.com")),
      false,
    );
  });

  it("loads GA and Cloudflare beacon for public production traffic", () => {
    const env = fakeDom({ hostname: "www.pcds2030.com", search: "" });
    const result = initAnalytics(env);
    assert.equal(result.loaded, true);
    assert.equal(result.internal, false);
    assert.equal(result.gaLoaded, true);
    assert.equal(result.cloudflareLoaded, true);
    const configCall = env.dataLayer.find(
      (entry) => entry[0] === "config" && entry[1] === GA_MEASUREMENT_ID,
    );
    assert.deepEqual(configCall[2], {});
    const beacon = env.scripts.find((s) => s.src.includes("cloudflareinsights.com"));
    assert.ok(beacon);
    assert.equal(beacon.defer, true);
    assert.equal(
      beacon.getAttribute("data-cf-beacon"),
      JSON.stringify({ token: CLOUDFLARE_WEB_ANALYTICS_TOKEN, spa: true }),
    );
  });

  it("clears the internal cookie with ?internal=0 and loads Cloudflare again", () => {
    const env = fakeDom({
      hostname: "pcds2030.com",
      search: "?internal=0",
      cookie: `${INTERNAL_TRAFFIC_COOKIE}=1`,
    });
    const result = initAnalytics(env);
    assert.equal(result.loaded, true);
    assert.equal(result.internal, false);
    assert.equal(result.cloudflareLoaded, true);
    assert.equal(env.document.cookie, "");
  });
});
