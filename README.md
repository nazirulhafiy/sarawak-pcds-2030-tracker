# PCDS 2030 Project Tracker

V2 is now the default interface for local development and Preview. Read the
[V2 maintenance and release guide](docs/v2.md). Start all new work from the latest
`preview` branch. Cursor data changes should use pull requests into `preview`.
V2 is approved for Production. The production build enables it through `.env.production`.

An independent public tracker for major projects connected to Sarawak's Post COVID-19 Development Strategy 2030 (PCDS 2030).

**View the tracker: [pcds2030.com](https://pcds2030.com)**

## What this tracker does

The tracker brings publicly available project information into one place so anyone can quickly see:

- which major projects are being tracked;
- whether each project is planning, ongoing, or completed;
- the next publicly visible milestone; and
- links to public reports, announcements, and other sources.

Select a project card on the website to see its summary, lead parties, reported value, milestones, and source links. Filters make it easy to browse projects by status. The interface can be switched between English and Bahasa Melayu, and the theme control supports light and dark viewing.

The site also has an [editorial updates page](https://pcds2030.com/updates/) that records meaningful public developments already reflected in the tracker. Each entry links to its supporting public source.

## Why it exists

Information about large development projects is often spread across many announcements and reports. This project presents that information in a simple, scan-friendly format for members of the public, researchers, journalists, and policy watchers.

The tracker is independently maintained and is not affiliated with the Sarawak Government. Its statuses are best-effort summaries based on publicly available information, not official determinations. Always check the linked sources for the original context.

## How the information is maintained

Project information is reviewed and added manually. Each active project must have documented PCDS inclusion provenance and public source links, and the website displays the date of the latest data update. Any change to project data, Bahasa Melayu project copy, editorial updates, or a tracked-project addition must follow the [data methodology](docs/data-methodology.md).

Because the process is manual:

- the tracker may not reflect a new announcement immediately;
- public sources may change or become unavailable; and
- a project's displayed status may simplify a more detailed real-world situation.

See the [data methodology](docs/data-methodology.md) for more detail.

## For contributors and developers

The website is a static [Vite](https://vite.dev/) and [React](https://react.dev/) app. It has no backend or database. Most tracker interface code is in `src/App.jsx`, the hand-maintained project data is in `src/trackerData.js`, BM presentation copy is in `src/localization.js`, and editorial update entries are in `src/updateHistory.js`.

The build creates real static HTML for the English tracker at `/`, the BM tracker at `/bm/`, and bilingual update history routes at `/updates/` and `/bm/updates/`. This allows direct navigation on GitHub Pages without relying on a client-side fallback.

### Run it locally

You need a current version of [Node.js](https://nodejs.org/) and npm.

```bash
npm install
npm run dev
```

Useful checks and build commands:

```bash
npm run lint           # Check the code
npm run check:content   # Validate tracker and editorial content
npm run check:links     # Report public source links that need manual review
npm run build:preview  # Build the Preview version
npm run build          # Build the Production version
npm run preview        # Serve the latest build locally
```

After a build, `npm run preview` can be used to open `/`, `/bm/`, `/updates/`, and `/bm/updates/` directly.

### Development and release workflow

Changes go through Preview before reaching the public website:

| Environment | Purpose | Address | Branch |
| --- | --- | --- | --- |
| Development | Local work | `localhost` | `preview` |
| Preview | Review before release | [preview.pcds2030.com](https://preview.pcds2030.com) | `preview` |
| Production | Public website | [pcds2030.com](https://pcds2030.com) | `main` |

Normal workflow:

1. Make a focused change on the `preview` branch.
2. For content changes, complete the [data review checklist](docs/data-review-checklist.md), then run `npm run check:content`, `npm run lint`, and `npm run build:preview`.
3. Push to `preview` and review the Preview website.
4. Promote approved changes to `main` for Production.

Preview deploys through Vercel. Production deploys through GitHub Pages. Preview is marked `noindex` so search engines should only index the Production website.

GitHub Actions keeps validation separate from Production deployment. Pull requests to `preview` or
`main` run read-only content, lint, and matching-environment build checks. Only a push to `main` or
an explicitly started Production workflow can deploy to GitHub Pages. Actions are pinned to reviewed
commits, with Dependabot proposing weekly GitHub Actions updates to `preview` for review.

### Project documentation

- [Product and audience](docs/product.md)
- [Design guidance](docs/design.md)
- [Data methodology](docs/data-methodology.md)
- [Project research template](docs/project-research-template.md)
- [Data review checklist](docs/data-review-checklist.md)
- [SEO measurement after release](docs/seo-measurement.md)
- [Known issues and next tasks](docs/backlog.md)
- [Weekly milestone automation contract](docs/automation.md)
- [Contributor and agent instructions](AGENTS.md)

These files are the project's source of truth for product intent, design decisions, data handling, and planned work.

## Current limitations

- Data updates are manual. A report-only source-link checker flags unavailable links for manual review.
- Project facts are maintained in the codebase rather than a content management system.
- Automated content checks validate structure and consistency. The source-link checker tests
  availability without blocking releases, while factual accuracy and flagged links still require
  manual review.

See the [backlog](docs/backlog.md) for the current list of known issues and recommended next tasks.
