import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  ANALYTICS_LOADER_ATTR,
  analyticsRegistry,
  loadAnalyticsRegistry,
  validateAnalyticsPayload,
} from "./analyticsRegistry.js";

describe("analyticsRegistry", () => {
  it("loads the kit-aligned production registry", () => {
    assert.equal(ANALYTICS_LOADER_ATTR, "data-sn-analytics-loader");
    assert.equal(analyticsRegistry.version, 1);
    assert.equal(analyticsRegistry.internalCookie, "pcds_internal");
    assert.equal(analyticsRegistry.spa, true);
    assert.equal(analyticsRegistry.primaryGa4Id, "G-QGCDDHPV9X");
    assert.equal(
      analyticsRegistry.primaryCfToken,
      "5e17ff78afe6423a8a9834b7870b55fd",
    );
    assert.deepEqual(analyticsRegistry.hostnames, [
      "pcds2030.com",
      "www.pcds2030.com",
    ]);
    assert.deepEqual(analyticsRegistry.legacyInternalCookies, []);
    assert.deepEqual(analyticsRegistry.honourCookies, ["pcds_internal"]);
  });

  it("rejects unknown top-level keys", () => {
    assert.throws(
      () =>
        validateAnalyticsPayload({
          version: 1,
          internal_cookie: "pcds_internal",
          spa: true,
          hosts: {
            "pcds2030.com": {
              ga4_measurement_id: "G-QGCDDHPV9X",
              cf_beacon_token: "5e17ff78afe6423a8a9834b7870b55fd",
              aliases: [],
              legacy_internal_cookies: [],
            },
          },
          extra: true,
        }),
      /unknown keys/,
    );
  });

  it("rejects spa drift type", () => {
    assert.throws(
      () =>
        loadAnalyticsRegistry({
          version: 1,
          internal_cookie: "pcds_internal",
          spa: "true",
          hosts: {
            "pcds2030.com": {
              ga4_measurement_id: "G-QGCDDHPV9X",
              cf_beacon_token: "5e17ff78afe6423a8a9834b7870b55fd",
              aliases: ["www.pcds2030.com"],
              legacy_internal_cookies: [],
            },
          },
        }),
      /spa must be a boolean/,
    );
  });
});
