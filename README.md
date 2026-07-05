# isaackwok.com

Personal site of Isaac Kwok — built with [Astro](https://astro.build) 7, Tailwind CSS 4, and pnpm. Japanese-minimalist design: plain kami-white background, warm ink text, spacing over borders.

## Commands

Node >= 22 is required (`.nvmrc`: 24.14.1) — run `nvm use` first.

| Command                           | Action                                                    |
| :-------------------------------- | :-------------------------------------------------------- |
| `pnpm install`                    | Install dependencies                                      |
| `pnpm dev`                        | Start the dev server at `localhost:4321`                  |
| `pnpm astro dev --background`     | Dev server in the background (`stop` / `status` / `logs`) |
| `pnpm test`                       | Run unit tests (Vitest)                                   |
| `pnpm new:article "Title" [slug]` | Scaffold a draft article with full frontmatter            |
| `pnpm build`                      | Build the production site to `./dist/`                    |
| `pnpm preview`                    | Preview the production build                              |

## Content

- **Articles** (`/articles`) — Markdown/MDX files in `src/content/articles/`. Scaffold one with `pnpm new:article`; drafts (`draft: true`) render in dev but 404 in production. Set `draft: false` to publish. Reading time is computed at build; hero images live in `src/assets/articles/`.
- **Gallery** (`/gallery`) — drop a JPEG (~2000px longest edge) into `src/assets/gallery/` and add an `image` / `alt` / `caption` entry to `src/data/gallery.yaml`; list order is display order.

## Deployment

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml` — no manual build step. Custom domain: [isaackwok.com](https://isaackwok.com).

Project conventions (design tokens, layout rules, workflows) live in [AGENTS.md](AGENTS.md), which `CLAUDE.md` symlinks to.
