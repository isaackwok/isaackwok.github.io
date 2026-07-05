// @ts-check
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import { remarkReadingTime } from './src/lib/remark-reading-time.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://isaackwok.com',
  integrations: [sitemap(), mdx()],
  markdown: {
    // Default shiki theme is github-dark — wrong against kami white.
    shikiConfig: { theme: 'github-light' },
    processor: unified({ remarkPlugins: [remarkReadingTime] }),
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
