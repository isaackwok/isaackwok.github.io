# isaackwok.com

Personal site of Isaac Kwok — built with [Astro](https://astro.build) 7, Tailwind CSS 4, and pnpm, designed around Japanese minimalism: plain *kami* white paper, warm *sumi* ink, and spacing instead of borders.

## Pages

- `/` — hero, about, work experience, contact
- `/articles` — Markdown/MDX articles with drafts, tags, reading time, and optional hero images
- `/music` — album grid with ~30–90s preview playback (metadata resolved from the iTunes Lookup API at build time; a persistent mini-player survives page navigation)
- `/gallery` — curated photo flow from a content collection

## Commands

Requires Node ≥ 22 (`.nvmrc`: 24.14.1) and pnpm — run `nvm use` first.

| Command                           | Action                                                    |
| :-------------------------------- | :-------------------------------------------------------- |
| `pnpm install`                    | Install dependencies                                      |
| `pnpm dev`                        | Start the dev server at `localhost:4321`                  |
| `pnpm astro dev --background`     | Dev server in the background (`stop` / `status` / `logs`) |
| `pnpm test`                       | Run unit tests (`pnpm test:watch` for watch mode)         |
| `pnpm new:article "Title" [slug]` | Scaffold a draft article with full frontmatter            |
| `pnpm build`                      | Build the production site to `./dist/`                    |
| `pnpm preview`                    | Preview the production build                              |

## Content

- **Articles** — Markdown/MDX in `src/content/articles/`; scaffold with `pnpm new:article`. Drafts (`draft: true`) render in dev but 404 in production; set `draft: false` to publish. Hero images live in `src/assets/articles/`.
- **Gallery** — drop a JPEG (~2000px longest edge) into `src/assets/gallery/` and add an `image` / `alt` / `caption` entry to `src/data/gallery.yaml`; list order is display order.
- **Music** — append an album (artist/title/`itunesId`/`country`/`spotifyUrl`) to `src/data/music.yaml`; see [AGENTS.md](AGENTS.md) for the `itunesId` lookup.

## Deployment

Every push to `main` runs the unit tests, then deploys to [isaackwok.com](https://isaackwok.com) on GitHub Pages via `.github/workflows/deploy.yml` — no manual build step.

Project conventions (design tokens, layout rules, workflows) live in [AGENTS.md](AGENTS.md), which `CLAUDE.md` symlinks to.
