<!-- CLAUDE.md is a symlink to this file — edit AGENTS.md and keep the symlink intact. -->

## Environment

- Package manager: pnpm. Node >= 22 required (`.nvmrc`: 24.14.1) — the shell may default to Node 20, which breaks pnpm 11 with a `node:sqlite` error. Run `nvm use` (or prepend `$HOME/.nvm/versions/node/v24.14.1/bin` to PATH) before pnpm commands.
- Tailwind v4: no `tailwind.config.js`; design tokens are defined via `@theme` in `src/styles/global.css`.

## Design system

- Japanese minimalism: plain white background, warm ink text, no borders or divider rules — spacing does the structural work.
- Color tokens (in `global.css`): `kami` white, `sumi` ink, `hai` secondary gray, `hinata` sunlight-gold links, `komorebi` pale glow (selection). Fonts: Shippori Mincho (display), Zen Kaku Gothic New (body), loaded from Google Fonts in `Layout.astro`.
- Sections use `Section.astro` with vertical kanji margin markers (`kanji` + `label` props).
- Compound components: folders like `src/components/WorkExperience/` hold `List.astro` + `Row.astro` re-exported from `index.ts`, used as `<WorkExperience.List>` via `import * as WorkExperience` dot notation.

## Layout & pages

- `Layout.astro` owns the entire `<head>`: canonical URL, Open Graph/Twitter meta, JSON-LD Person schema, fonts. Pages pass `title` / `description` props — never add meta tags in a page.
- Page navigation fades via Astro's `<ClientRouter />`: old page out (0.3s), blank kami hold (0.15s), new page in (0.3s). Timing config in `Layout.astro`, keyframes in `global.css`.
- Astro's default `compressHTML` strips whitespace between elements in rendered output — where a rendered space is load-bearing in a `.astro` template, write an explicit `{" "}` expression (see the article byline paragraphs). Verify spacing against rendered HTML, not the template source.
- `/music` is an intentional stub rendered with `Placeholder.astro`.
- `/articles` is a Markdown/MDX content collection. Add an article: `pnpm new:article "Article title" [slug]` scaffolds a dated draft with every frontmatter field (or create `src/content/articles/<slug>.md` by hand). Fields: `title`, `description`, `date` required; `tags`, `lang` (`en` or `zh-Hant`), `draft: true`, `image` + `imageAlt` optional. The scaffold defaults `lang: zh-Hant` — set `en` for English pieces, or they get the CJK prose spacing and `og:locale zh_TW`. Keep files flat — no subfolders. Drafts render in dev but are excluded from production builds. Reading time is computed at build time by `src/lib/remark-reading-time.mjs`. Hero images live in `src/assets/articles/`, referenced relatively (`../../assets/articles/<file>`).
- `/gallery` is a curated photo flow driven by a content collection. Add a photo: drop a JPEG (pre-resized to ~2000px longest edge) into `src/assets/gallery/` and add three lines to `src/data/gallery.yaml` (`image`, `alt`, `caption`); top-to-bottom order is display order.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Unit tests (Vitest, co-located `src/**/*.test.ts`): `pnpm test`.

## Deployment

- Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml` (withastro/action, Node 24) — no manual build step.
- Custom domain `isaackwok.com` lives in two places that must stay in sync: `public/CNAME` and `site` in `astro.config.mjs`. Canonical URLs and the sitemap both derive from `site`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
