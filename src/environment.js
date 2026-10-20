import { analyticsRegistry } from "./analyticsRegistry.js";

const ENVIRONMENTS = {
  development: {
    name: "development",
    badgeLabel: "DEV",
    badgeColor: "#f97316",
  },
  preview: {
    name: "preview",
    badgeLabel: "PREVIEW",
    badgeColor: "#7c3aed",
  },
  production: {
    name: "production",
    badgeLabel: "",
    badgeColor: "",
  },
};

export function getAppEnvironment() {
  if (import.meta.env.DEV) {
    return ENVIRONMENTS.development;
  }

  if (import.meta.env.MODE === "preview") {
    return ENVIRONMENTS.preview;
  }

  return ENVIRONMENTS.production;
}

export function shouldShowEnvironmentBadge(environment) {
  return environment.name !== "production";
}

/**
 * Hostnames where Google Analytics may load. Preview, localhost, and
 * other hosts must never load the GA tag — see `src/analytics.js`.
 * Host list comes from data/analytics.json (primary + aliases).
 */
export function isProductionAnalyticsHost(hostname) {
  const host = String(hostname || "").toLowerCase();
  return analyticsRegistry.hostnames.includes(host);
}
