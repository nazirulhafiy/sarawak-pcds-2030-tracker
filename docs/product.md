# Product Notes

## Product

The V2 Preview interface includes English and Malay About pages at `/about/` and
`/bm/about/`. They explain scope, public sources, status definitions, milestone limits,
independence and correction contact details. The public site is not being promoted to v2.

PCDS 2030 Project Tracker is an independent public tracker for major Sarawak development projects connected to the Post COVID-19 Development Strategy 2030.

The site presents a scan-first view of major projects, their current status, next visible milestone,
and links to publicly available sources.

## Audience

Primary users:

- People who want a quick public-status view of Sarawak development projects.
- The site owner, who maintains the tracker as a solo AI-assisted developer.
- Readers who need source links before trusting a project status.

Secondary users:

- Researchers, journalists, policy watchers, or civic-minded readers comparing project progress.

## Current User Experience

The current product is a small static React site with:

- Header: "Sarawak Development Monitor" and "PCDS 2030 Project Tracker".
- Summary metrics for tracked projects, ongoing projects, planning projects, completed projects, and milestones.
- A URL-backed project search below the metrics. Its quiet default state shows only the search icon;
  once a query is entered, a right-aligned × control appears to clear it.
- Last updated indicator beneath the page description, sourced from `LAST_UPDATED` in `src/trackerData.js`.
- Status filters for all, planning, ongoing, and completed projects. Pressing the selected Planning,
  Ongoing, or Completed metric a second time resets the status view to all projects.
- A horizontally scrollable row of specific project categories beneath the metrics, paired with the
  project search. Category and status filters can be combined. The selected category remains visible,
  can be pressed again to return to `All`, and uses `All` as the second explicit reset path.
  Classification pills inside project cards are static identity labels so the global row remains the
  single category-filtering surface.
- A compact `EN | BM` control that switches instantly after hydration while retaining normal links to separately pre-rendered English and BM routes. Language options provide a restrained hover, focus, and press response; the selected option temporarily flattens when the alternate option is being explored. The BM presentation translates the interface, project summaries, facts, milestones, and editorial update history into Malaysian Bahasa Melayu while keeping the site identity and project titles in English and preserving canonical project identities and source links. The BM introduction uses the idiomatic phrase `platform pemantauan bebas`, while the footer retains the quoted English phrase `'Project tracker'` as part of the site's identity.
- An icon theme control that defaults to the reader's system preference, supports explicit light or dark selection, remembers that selection locally, and animates its icon, hover surface, and press state when toggled.
- Status and category filters use restrained hover, focus, and press responses. The active status
  temporarily flattens when another status is being explored. Card detail pills retain their
  category-colour hover treatment.
- The last-updated pill rests neutrally, then links directly to the editorial update history with the same restrained hover treatment. The update history has a visible top-level pill back to the matching-language tracker.
- Expandable project cards with lead parties, reported value, summary, milestones, and source links.
- Project details expand and collapse individually; the Milestones metric remains a non-interactive
  progress summary.
- Two short introductory paragraphs explaining what the tracker covers, its independence, its
  milestone and status content, and its public-source links without adding a separate promotional
  About section. The English second line is `An independent tracker with project status, milestones
  and links to public sources.` The full strategy name stays together on tablet and desktop, then
  wraps normally on narrow screens to prevent overflow.
- Plain, direct hero copy that foregrounds the tracker’s public-source value; strategy targets remain
  available in the project and methodology content rather than competing with the first-glance purpose.
- Plain-language source wording that promises links to publicly available sources rather than
  referring abstractly to "supporting public evidence".
- A shared compact footer on the tracker and update-history routes. A subtle neutral surface separates
  it from the project grid without adding a promotional section. Its Explore group links to the
  current Tracker and Updates routes and provides a bilingual Contact or Hubungi email link for
  corrections, missing sources, and feedback. The email subject is prefilled with the tracker name,
  while hafiy.my remains linked in the credit line. It retains the public-source and best-effort
  milestone note and states that the tracker is independent and not affiliated with the Sarawak
  Government. No About or Methodology placeholders are shown.
- A compact localized Back to top control appears in the lower-right corner after the reader has
  moved beyond the opening viewport. It is shared by the tracker and update-history routes, uses the
  active light or dark theme, stays clear of the non-production environment badge, and uses an
  icon-only arrow on mobile with a teal brand surface.

The English tracker at `/`, BM tracker at `/bm/`, English editorial history at `/updates/`, and BM
editorial history at `/bm/updates/` are all pre-rendered during the build and hydrated by React in
the browser. Each route has a real static `index.html` file for direct GitHub Pages navigation.
After hydration, the language control updates the route and presentation without a document
reload. Direct navigation and no-JavaScript fallback still use the static HTML. BM routes are
pre-rendered in Malay with `lang="ms"`. Theme preference is applied before paint to avoid a
light-theme flash.

## Editorial Update History

`/updates/` and `/bm/updates/` are bilingual dated histories of meaningful public developments
already represented in the tracker data. They are not developer changelogs. Each entry identifies
the affected project and sector, briefly describes the public development, links to a supporting
source already attached to that project, and keeps a visible top-level route back to the tracker.

The displayed date is the date of the reported development. It must not be described as the date
the tracker was edited unless that is independently recorded. New entries should remain selective,
source-backed, and useful to readers.

## Search Visibility

Production at `https://pcds2030.com` is the canonical, indexable public site. Its SEO foundation
includes route-specific canonical and social metadata, structured data, `robots.txt`, and a
sitemap. Both tracker and update-history language pairs include reciprocal `hreflang` references.
The pre-rendered tracker and update history give search engines meaningful content before
client-side React runs.

Shared links use an explicit 1200 by 630 social-preview image instead of allowing messaging apps
to choose a favicon or Apple touch icon as a fallback. Production uses the teal tracker mark and
Preview uses the purple tracker mark, with absolute image URLs generated for the matching deployed
environment. The share-card description remains a separate, longer description from the concise
hero line, using the same `project tracker` terminology as the site rather than the legacy
`dashboard` label.

Preview at `https://preview.pcds2030.com` is for development review only. Vercel sends
`X-Robots-Tag: noindex, nofollow` for every Preview route. Pre-rendering Preview improves review
fidelity but does not make Preview eligible for Google indexing.

Search Console measurement for new routes starts only after an approved Production release and
crawler discovery. The review process is documented in `docs/seo-measurement.md`.

Production also loads Cloudflare Web Analytics for privacy-first aggregate traffic measurement,
including visits, page views, referrers, countries, devices, and Core Web Vitals. The beacon uses
the app's History API support so navigation between tracker and update-history routes is measured.
It does not use cookies, fingerprint visitors, or collect personally identifiable information.
Development and Preview builds do not load the beacon, and analytics reports remain available only
through the Cloudflare dashboard.

## Current Data Model

Project data lives in `src/trackerData.js`.

English tracker data remains the canonical editorial source. `src/localization.js` contains the
explicit BM presentation layer for category names, project facts, summaries, and milestones.
Project titles stay in English; URLs, compact date values, completion flags, and canonical project
names are shared between both languages. The BM interface presents the English category term
`Enabler` as `Pemboleh`.

The data currently includes:

- PCDS overview framework data.
- An enforced inclusion-provenance register covering active and monitored project identities.
- 6 economic sectors.
- 7 enablers.
- Project records nested under sectors and enablers.
- Per-project status, lead, value, summary, milestones, and sources.

Some sectors or enablers are intentionally present but have no projects yet. They do not currently render as empty cards because the UI flattens project records rather than rendering every sector.

## Current Status Model

The UI maps detailed statuses into simpler user-facing labels:

- `Awaiting Decision` and `In Progress` display as `Ongoing`.
- `Planning` displays as `Planning`.
- `Operational`, `Designated`, and `Enacted` display as `Completed`.

This keeps the public interface simple while preserving more specific source-data states in the data file.

For reader clarity, a card displays as `Completed` only when every delivery milestone shown on that card is complete. Recurring operational activities such as monitoring, annual reporting, conservation, or routine service delivery belong in the summary rather than remaining permanently open delivery milestones. Umbrella programmes and mixed-scope cards remain `Ongoing` while a genuine delivery milestone is still open.

## Environment Workflow

The product now has three environments:

- Development: local machine, orange favicon, `DEV` badge.
- Preview: Vercel preview site, purple favicon, `PREVIEW` badge.
- Production: GitHub Pages public site, teal brand favicon, no badge.

The environment-coloured browser favicon uses a simplified transparent `S` at every declared
browser size so it stays legible in a tab and remains consistent across browsers. The 180px Apple
touch icon retains the complete dark-tile artwork with the `S` and chart motif.

The same simplified `S` anchors a dedicated social-preview card for each environment. These larger
images include the tracker identity and domain, and are declared through Open Graph and Twitter
metadata so link-sharing services do not substitute the Apple touch icon.

All three environments use the same project-card behavior. Environment differences are limited to
deployment, domain, indexing policy, favicon, social-preview branding, and the Development or
Preview badge.

This workflow exists to prevent unfinished changes from reaching the public site. It is recommended and common in modern web development.

GitHub Actions separates read-only change validation from Production deployment. Pull requests to
`preview` and `main` run the relevant content, lint, and environment build checks without Pages
deployment permission. The Production workflow runs only for a push to `main` or an explicit manual
start, and only its deploy job receives Pages and identity-token write permission. Third-party actions
are pinned to reviewed commits and maintained through weekly Dependabot proposals targeting
`preview`.

## Content Maintenance Notes

The data is manually curated from public reports and announcements. The shared footer states that status and milestones are best-effort based on available information.

Current content risks:

- Data freshness is manual.
- Source-link availability checking is report-only and must be run deliberately. HTTP failures,
  timeouts, redirects, and bot-blocking responses still require manual review before a source is
  changed or removed.
- `LAST_UPDATED` is displayed in the UI but still depends on manual maintenance when tracker data changes.
- Project facts are embedded in code rather than stored in a separate content file or CMS.

## Product Principles

- Keep the tracker scan-first.
- Prioritize clarity over visual novelty.
- Keep public card claims tied to visible, project-specific public webpage links.
- Use PCDS PDFs to confirm inclusion and guide research, not as the sole evidence for a live card claim.
- Avoid turning the site into a marketing landing page.
- Preserve the independent-tracker disclaimer.
- Keep Production indexable and Preview explicitly noindexed.
