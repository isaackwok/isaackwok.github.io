## Environment

- Package manager: pnpm. Node >= 22 required (`.nvmrc`: 24.14.1) — the shell may default to Node 20, which breaks pnpm 11 with a `node:sqlite` error. Run `nvm use` (or prepend `$HOME/.nvm/versions/node/v24.14.1/bin` to PATH) before pnpm commands.
- Tailwind v4: no `tailwind.config.js`; design tokens are defined via `@theme` in `src/styles/global.css`.

## Design system

- Japanese minimalism: plain white background, warm ink text, no borders or divider rules — spacing does the structural work.
- Color tokens (in `global.css`): `kami` white, `sumi` ink, `hai` secondary gray, `hinata` sunlight-gold links, `komorebi` pale glow (selection). Fonts: Shippori Mincho (display), Zen Kaku Gothic New (body), loaded from Google Fonts in `Layout.astro`.
- Sections use `Section.astro` with vertical kanji margin markers (`kanji` + `label` props).
- Compound components: folders like `src/components/WorkExperience/` hold `List.astro` + `Row.astro` re-exported from `index.ts`, used as `<WorkExperience.List>` via `import * as WorkExperience` dot notation.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
