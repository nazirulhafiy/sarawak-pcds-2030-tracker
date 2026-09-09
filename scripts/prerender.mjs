#!/usr/bin/env node
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { build, loadEnv } from "vite";

const mode = process.argv[2] || "production";
const projectRoot = resolve(".");
const concept = loadEnv(mode, projectRoot).VITE_DESIGN_CONCEPT === "v2";
const distIndexPath = resolve("dist/index.html");
const serverOutDir = await mkdtemp(join(tmpdir(), "pcds-tracker-prerender-"));
const productionOrigin = "https://pcds2030.com";
const socialOrigin =
  mode === "preview" ? "https://preview.pcds2030.com" : productionOrigin;
const socialImage = `${socialOrigin}/social-preview-${mode}.png?v=20260805a`;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getCanonical(route) {
  return new URL(route.path, productionOrigin).href;
}

function getStructuredData(route) {
  const canonical = getCanonical(route);

  if (route.id === "tracker-en") {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PCDS 2030 Project Tracker",
      alternateName: ["PCDS 2030 Dashboard", "Penjejak Projek PCDS 2030"],
      url: canonical,
      description: route.metadata.description,
      inLanguage: ["en-MY", "ms-MY"],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": route.page === "updates" ? "CollectionPage" : "WebPage",
    name: route.metadata.title,
    url: canonical,
    description: route.metadata.description,
    inLanguage: route.language === "ms" ? "ms-MY" : "en-MY",
    isPartOf: {
      "@type": "WebSite",
      name: "PCDS 2030 Project Tracker",
      url: `${productionOrigin}/`,
    },
  };
}

function applyRouteMetadata(template, route, allRoutes) {
  const canonical = getCanonical(route);
  const title = escapeHtml(route.metadata.title);
  const description = escapeHtml(route.metadata.description);
  const alternateLinks = route.alternates
    .map(({ hreflang, routeId }) => {
      const alternateRoute = allRoutes.find((candidate) => candidate.id === routeId);
      if (!alternateRoute) {
        throw new Error(`Unknown alternate route ${routeId} for ${route.id}.`);
      }
      return `    <link rel="alternate" hreflang="${hreflang}" href="${getCanonical(alternateRoute)}" />`;
    })
    .join("\n");
  const alternateLocale = route.alternates
    .map(({ routeId }) => allRoutes.find((candidate) => candidate.id === routeId))
    .find(
      (alternateRoute) =>
        alternateRoute && alternateRoute.locale !== route.locale
    )?.locale;
  const localeMarkup = [
    `    <meta property="og:locale" content="${route.locale}" />`,
    alternateLocale
      ? `    <meta property="og:locale:alternate" content="${alternateLocale}" />`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
  const structuredData = JSON.stringify(getStructuredData(route), null, 6)
    .split("\n")
    .map((line) => `      ${line}`)
    .join("\n");

  let output = template
    .replace(/<html lang="[^"]*">/, `<html lang="${route.language}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonical}" />${alternateLinks ? `\n${alternateLinks}` : ""}`
    )
    .replace(
      /\s*<meta property="og:locale" content="[^"]*" \/>\s*(?:<meta property="og:locale:alternate" content="[^"]*" \/>)?/,
      `\n${localeMarkup}`
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${socialImage}" />`
    )
    .replace(
      /<meta property="og:image:secure_url" content="[^"]*" \/>/,
      `<meta property="og:image:secure_url" content="${socialImage}" />`
    )
    .replace(
      /<meta property="og:image:alt" content="[^"]*" \/>/,
      `<meta property="og:image:alt" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*" \/>/,
      `<meta name="twitter:image" content="${socialImage}" />`
    )
    .replace(
      /<meta name="twitter:image:alt" content="[^"]*" \/>/,
      `<meta name="twitter:image:alt" content="${title}" />`
    )
    .replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n${structuredData}\n    </script>`
    );

  return output;
}

try {
  await build({
    root: projectRoot,
    mode,
    ssr: {
      noExternal: ["react", "react-dom"],
    },
    build: {
      ssr: resolve("src/entry-server.jsx"),
      outDir: serverOutDir,
      emptyOutDir: true,
    },
  });

  const outputFiles = await readdir(serverOutDir);
  const serverEntry = outputFiles.find((file) => file.endsWith(".js"));

  if (!serverEntry) {
    throw new Error("Prerender server entry was not generated.");
  }

  const { getStaticRoutes, render } = await import(
    pathToFileURL(join(serverOutDir, serverEntry)).href
  );
  const routes = getStaticRoutes();
  const template = await readFile(distIndexPath, "utf8");
  let conceptStylesheet;
  if (concept) {
    const assets = await readdir(resolve("dist/assets"));
    conceptStylesheet = assets.find((file) => /^v2-interface-.*\.css$/.test(file));
    if (!conceptStylesheet) throw new Error("V2 stylesheet was not generated.");
  }
  const rootMarker = '<div id="root"></div>';

  if (!template.includes(rootMarker)) {
    throw new Error(`Could not find ${rootMarker} in ${distIndexPath}.`);
  }

  for (const route of routes) {
    const appHtml = render(route.path);
    let routeTemplate = applyRouteMetadata(template, route, routes);
    if (concept) {
      routeTemplate = routeTemplate
        .replace(/<html lang="([^"]*)">/, '<html lang="$1" data-concept="v2">')
        .replace('</head>', `    <link rel="stylesheet" crossorigin href="/assets/${conceptStylesheet}" />\n  </head>`);
    }
    const output = routeTemplate.replace(
      rootMarker,
      `<div id="root">${appHtml}</div>`
    );
    const outputPath =
      route.path === "/"
        ? distIndexPath
        : resolve("dist", route.path.slice(1), "index.html");

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output);
    console.log(`Prerendered ${mode} ${route.path} into ${outputPath}.`);
  }
} finally {
  await rm(serverOutDir, { recursive: true, force: true });
}
