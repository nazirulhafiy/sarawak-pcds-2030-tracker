import { getUiCopy } from "./localization.js";

const PRODUCTION_ORIGIN = "https://pcds2030.com";

const trackerAlternates = [
  { hreflang: "en-MY", routeId: "tracker-en" },
  { hreflang: "ms-MY", routeId: "tracker-ms" },
  { hreflang: "x-default", routeId: "tracker-en" },
];

const updatesAlternates = [
  { hreflang: "en-MY", routeId: "updates" },
  { hreflang: "ms-MY", routeId: "updates-ms" },
  { hreflang: "x-default", routeId: "updates" },
];

export const STATIC_ROUTES = [
  ...['en', 'ms'].map((language) => ({
    id: language === 'en' ? 'about' : 'about-ms', page: 'about',
    path: language === 'en' ? '/about/' : '/bm/about/', language,
    locale: language === 'en' ? 'en_MY' : 'ms_MY',
    metadata: {
      title: language === 'en' ? 'About | PCDS 2030 Project Tracker' : 'Tentang | PCDS 2030 Project Tracker',
      description: language === 'en' ? 'Purpose, public sources and status definitions for the independent PCDS 2030 Project Tracker.' : 'Tujuan, sumber awam dan takrif status bagi platform pemantauan bebas PCDS 2030.',
    },
    alternates: [{ hreflang: 'en-MY', routeId: 'about' }, { hreflang: 'ms-MY', routeId: 'about-ms' }, { hreflang: 'x-default', routeId: 'about' }],
  })),
  {
    id: "tracker-en",
    page: "tracker",
    path: "/",
    language: "en",
    locale: "en_MY",
    metadata: getUiCopy("en").metadata,
    alternates: trackerAlternates,
  },
  {
    id: "tracker-ms",
    page: "tracker",
    path: "/bm/",
    language: "ms",
    locale: "ms_MY",
    metadata: getUiCopy("ms").metadata,
    alternates: trackerAlternates,
  },
  {
    id: "updates",
    page: "updates",
    path: "/updates/",
    language: "en",
    locale: "en_MY",
    metadata: {
      title: "PCDS 2030 Updates: Project and Sector Developments | Sarawak",
      description:
        "Follow dated public developments across PCDS 2030 projects and sectors, with source links and routes back to the independent tracker.",
    },
    alternates: updatesAlternates,
  },
  {
    id: "updates-ms",
    page: "updates",
    path: "/bm/updates/",
    language: "ms",
    locale: "ms_MY",
    metadata: {
      title: "Kemas Kini PCDS 2030: Perkembangan Projek dan Sektor | Sarawak",
      description:
        "Ikuti perkembangan awam bertarikh bagi projek dan sektor PCDS 2030, berserta pautan sumber dan laluan kembali ke 'project tracker'.",
    },
    alternates: updatesAlternates,
  },
];

export function getRouteById(routeId) {
  return STATIC_ROUTES.find((route) => route.id === routeId) || STATIC_ROUTES.find((route) => route.id === 'tracker-en');
}

export function getRouteCanonical(route) {
  return new URL(route.path, PRODUCTION_ORIGIN).href;
}

export function getRouteHref(routeId, base = "/") {
  const route = getRouteById(routeId);
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;

  if (normalizedBase === "/") {
    return route.path;
  }

  return `${normalizedBase.replace(/\/$/, "")}${route.path}`;
}

export function resolveRoute(pathname = "/", base = "/") {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const pathnameWithoutBase =
    normalizedBase !== "/" && pathname.startsWith(normalizedBase)
      ? `/${pathname.slice(normalizedBase.length)}`
      : pathname;
  const normalizedPath = pathnameWithoutBase.endsWith("/")
    ? pathnameWithoutBase
    : `${pathnameWithoutBase}/`;

  return (
    STATIC_ROUTES.find((route) => route.path === normalizedPath) ||
    STATIC_ROUTES.find((route) => route.id === 'tracker-en')
  );
}

export function getProjectAnchor(projectName) {
  return `project-${projectName
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}
