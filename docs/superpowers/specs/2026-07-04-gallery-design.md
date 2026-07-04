# Gallery — Design

**Date:** 2026-07-04
**Status:** Approved
**Replaces:** the `Placeholder.astro` stub at `/gallery`

## Purpose

A curated photography portfolio: a small, deliberate set of photographs (10–30,
mixed landscape and portrait), presented one at a time in a single-column
contemplative scroll. Quality over quantity, updated rarely. The page must feel
like the rest of the site — kami white, generous whitespace, no borders, no
JavaScript.

## Requirements

- Single-column flow: one photograph at a time with large vertical gaps.
- Short caption under each photo (quiet one-liner, `hai` gray).
- Handles mixed orientations gracefully.
- Photos are curated and explicitly ordered (editorial order, not chronological).
- Adding a photo must be cheap: drop a file, add three lines of YAML.
- Fully static; images optimized at build time; no client-side JS.
- Alt text required for every photo, distinct from the caption.

## Data model

```
src/assets/gallery/           originals (JPEG, resized to ~2000px longest edge before committing)
src/data/gallery.yaml         the curated list, in display order
src/content.config.ts         new file: content collection config
```

Each entry in `gallery.yaml`:

```yaml
- image: ../assets/gallery/morning-kyoto.jpg
  alt: Narrow Kyoto street at dawn, soft light on wet stone
  caption: morning light, kyoto
```

A `gallery` content collection uses Astro's `file()` loader with a custom YAML
parser (new dependency: `yaml`). The parser:

- derives each entry's `id` from the image filename (basename, no extension),
- injects `order` from the entry's array position — reordering the gallery is
  moving lines in the file; no numbers to maintain.

Schema: `image()` for the photo (build-time validated and optimizable),
required non-empty `alt`, required non-empty `caption`. Image paths resolve
relative to `gallery.yaml`.

## Page layout

`src/pages/gallery.astro` drops `Placeholder` and follows the homepage
skeleton: `Layout` → `Nav` → header (tategaki 攝影 margin marker, "Isaac Kwok"
breadcrumb link, `h1` Gallery) → photo flow → footer. Same `max-w-xl`
container — the gallery keeps the site's intimate scale.

Photo flow:

- A sequence of `<figure>` elements sorted by `order`, with large vertical
  gaps (`mt-16` / `sm:mt-20`) — spacing does the pacing.
- `<figcaption>` in small `hai` gray text under each image (`text-sm`,
  `mt-3`), lowercase voice matching the captions' style.
- **Orientation rule:** landscape photos render at full container width;
  portrait photos render at 70% width, left-aligned. Orientation is computed
  at build time from the image's intrinsic width/height metadata — no manual
  flags.
- The page passes `title` / `description` props to `Layout` (which owns all
  meta tags), keeping the existing "Gallery — Isaac Kwok" title and
  description.
- Nav already links `/gallery` (kanji 攝影); no nav changes.

## Image pipeline & performance

- Astro `<Image />` with the default Sharp service (bundled, zero config).
- Build-time WebP, two responsive widths (~512px container width, ~1024px for
  retina), `sizes` matched to each photo's rendered width (70% of container
  for portrait photos).
- Width/height attributes emitted automatically → zero layout shift.
- First photo: `loading="eager"` + `fetchpriority="high"`; all others lazy.
- GitHub Actions performs all image processing at deploy; originals live in
  the repo (hence the ~2000px pre-resize guideline to keep the repo lean).

## Accessibility & error handling

- `alt` is schema-required and semantically distinct from `caption` (alt
  describes the image; caption evokes).
- Wrong image path, missing alt/caption, or malformed YAML fails
  `pnpm build`, blocking a broken deploy — errors surface at build time,
  never for visitors.
- No client-side JavaScript; nothing to fail at runtime.

## Out of scope

- Lightbox / click-to-enlarge, albums or collections, per-photo pages,
  EXIF/camera metadata, pagination. The page also does not need an empty
  state: it ships with real photographs.

## Verification

- `pnpm build` proves schema validation and the image pipeline.
- Dev server visual pass at desktop and mobile widths.
- Check the ClientRouter page-fade transition still behaves with images
  (regression watch: the iOS Safari fade fix in commit `4b86163`).
