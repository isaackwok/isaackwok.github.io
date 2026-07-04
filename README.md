# isaackwok.com

Personal site of Isaac Kwok — built with [Astro](https://astro.build) and Tailwind CSS v4, designed around Japanese minimalism: plain *kami* white paper, warm *sumi* ink, and spacing instead of borders.

## Pages

- `/` — hero, about, work experience, contact
- `/music` — album grid with ~30–90s preview playback (metadata resolved from the iTunes Lookup API at build time; a persistent mini-player survives page navigation)
- `/gallery` — curated photo flow from a content collection
- `/articles` — intentional stub, coming soon

## Development

Requires Node ≥ 22 (`.nvmrc`: 24.14.1) and pnpm.

| Command        | Action                                    |
| :------------- | :---------------------------------------- |
| `pnpm install` | Install dependencies                      |
| `pnpm dev`     | Start the dev server at `localhost:4321`  |
| `pnpm build`   | Build the production site to `./dist/`    |
| `pnpm preview` | Preview the production build locally      |

Content lives in `src/data/` (`music.yaml`, `gallery.yaml`) with photos in `src/assets/gallery/`. See [AGENTS.md](AGENTS.md) for the add-an-album / add-a-photo workflows and the design-system reference.

## Deployment

Every push to `main` deploys to [isaackwok.com](https://isaackwok.com) on GitHub Pages via `.github/workflows/deploy.yml`.
