// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://isaackwok.com',
  integrations: [sitemap()],
  image: {
    // Album artwork comes from Apple's CDN and is optimized into
    // self-hosted assets at build time.
    remotePatterns: [{ protocol: 'https', hostname: '**.mzstatic.com' }],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});