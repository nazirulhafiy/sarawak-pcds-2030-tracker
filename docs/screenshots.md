# Screenshot capture (`tools/shots.mjs`)

Use this Node CLI for tracker UI screenshots in PRs, design reviews, and visual comparisons. It drives **system Google Chrome** via `playwright-core` (no bundled browser download).

## Quick start

```bash
node tools/shots.mjs \
  --url https://preview.pcds2030.com \
  --out ./shots \
  --name my-change \
  --crop '.project-card' \
  --pad 24 \
  --devices phone \
  --themes light,dark
```

For a local build, pass the `dist/` directory; the tool serves it on a temporary `127.0.0.1` port.

## Defaults agents should use

For every UI change screenshot in a PR or review:

- **Device:** `phone` (390×844 CSS px, `deviceScaleFactor` 3 → ~1170px-wide PNG, no downscaling)
- **Crop:** the changed region (often the first affected `.project-card`), with `--pad 24`
- **Themes:** `light` and `dark`

Desktop captures use 1280×900 at scale 1; pass `--desktop-scale 2` when higher resolution is needed.

## CLI reference

| Flag | Purpose |
|------|---------|
| `--url` | HTTPS URL or path to a built site (`dist/`) |
| `--out` | Output directory (created if missing) |
| `--name` | Filename prefix (default `shot`) |
| `--crop` | CSS selector; clip is full viewport width, height = element + padding, capped at ~1.3× viewport width (top-aligned) |
| `--clip` | Manual `x,y,width,height` clip in CSS pixels |
| `--pad` | Padding around `--crop` (default `24`) |
| `--themes` | Comma-separated: `light`, `dark` |
| `--devices` | Comma-separated: `phone`, `desktop` |
| `--desktop-scale` | `deviceScaleFactor` for desktop (default `1`) |
| `--compare` | `<beforeUrl> <afterUrl>` — writes `-before`, `-after`, and side-by-side `-compare` PNGs; logs differing pixel count |

Output filenames: `<name>-<device>-<theme>[-before|-after|-compare].png`.

## Theme and render stability

The site exposes **light and dark** only. Theme is set before first paint by matching production behavior:

- `localStorage` key `pcds-theme`
- `html[data-theme]` and `color-scheme` (see `index.html` and `src/theme.js`)

The tool disables CSS transitions/animations, waits for `document.fonts.ready` and the crop selector (or `#root`), uses an opaque page background, and logs the computed `body` background color.

Without `--crop` or `--clip`, the capture is the first viewport (above-the-fold).

## Compare mode

```bash
node tools/shots.mjs \
  --compare https://preview.pcds2030.com/ https://localhost-build/ \
  --out ./compare \
  --name nav \
  --devices phone \
  --themes light
```

## Build isolation

`tools/` lives outside `src/` and is not imported by the Vite app; it is never bundled into production or preview build output.
