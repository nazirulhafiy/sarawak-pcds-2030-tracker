# Agent Instructions

This repository is the PCDS 2030 Project Tracker, a Vite and React static site.

## Working Rules

- Do not redesign the website unless the user explicitly asks for a redesign.
- Preserve existing functionality unless a requested workflow or bug fix requires a change.
- Keep changes small, reviewable, and scoped to the requested task.
- Prefer the existing Vite and React conventions already used in the project.
- Do not introduce new dependencies unless there is a clear maintenance benefit.
- Treat `README.md`, `docs/product.md`, `docs/design.md`, and `docs/backlog.md` as the project memory.
- Treat [the data methodology](docs/data-methodology.md) as mandatory, canonical guidance for any work that changes `src/trackerData.js`, `src/localization.js`, `src/updateHistory.js`, or adds a tracked project. Read it before editing and follow its evidence, identity, source-link, milestone, localisation, and review-record rules. Do not duplicate or override that methodology in other documents.

## Agent skills

- Opt-in audit skill: `/audit-pcds-2030-projects`. Not for every run. Canonical methodology remains `docs/data-methodology.md`.
- [`docs/automation.md`](docs/automation.md) is the weekly milestone audit Stage A+B contract.
- [`automation/prompts/weekly-milestone-agent.md`](automation/prompts/weekly-milestone-agent.md) is the injectable Cloud Agent prompt.

## Branch Workflow

- `preview` is the normal development branch.
- V2 is the default interface on Preview and in local development. Start new work from the latest `origin/preview`, not `codex/v2-review`.
- Cursor data updates use focused branches and pull requests into `preview`. Follow `docs/data-methodology.md`; preserve the V2 interface and build configuration.
- Codex maintains interface behavior and release workflow. See `docs/v2.md` for the migration and release contract.
- `main` is the production branch.
- Preview deploys to `https://preview.pcds2030.com` through Vercel.
- Production deploys to `https://pcds2030.com` through GitHub Pages.
- Push work to `preview` first.
- Merge or promote to `main` only after the preview site has been reviewed and approved.

## Local Commands

- Install dependencies with `npm install` or `npm ci`.
- Run local development with `npm run dev`.
- Run lint checks with `npm run lint`.
- Build production with `npm run build`.
- Build preview with `npm run build:preview`.
- Serve a built site with `npm run preview`.
- Run `npm run check:content` for data or editorial-content changes.
- Run `npm run check:links` for a report-only review of public source availability.

## Documentation Expectations

- Update docs when changing product behavior, design direction, deployment workflow, or data structure.
- Put product intent and audience changes in `docs/product.md`.
- Put visual and interaction guidance in `docs/design.md`.
- Put known issues and recommended next tasks in `docs/backlog.md`.
- Keep README focused on setup, workflow, and links to deeper docs.
- Use [the project research template](docs/project-research-template.md) for project reviews and [the data review checklist](docs/data-review-checklist.md) before releasing evidence-based data changes.
- [`docs/automation.md`](docs/automation.md) is the weekly milestone audit Stage A+B contract.

## Current Architecture Notes

- Most UI is currently implemented in `src/App.jsx`.
- Project data is currently hand-maintained in `src/trackerData.js`.
- Environment detection lives in `src/environment.js`.
- Favicon and custom-domain build helpers live in `scripts/`.

## Safety Notes

- Do not edit generated `dist/` output directly.
- Do not edit DNS, Vercel, or GitHub Pages settings unless the user explicitly asks.
- Do not remove PCDS source PDFs or public assets without user approval.
