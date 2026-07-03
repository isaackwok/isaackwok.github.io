// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

/** Fontsource CSS lists a legacy .woff fallback after every .woff2 source;
 * every browser that runs this site supports woff2, so dropping the fallback
 * halves the font CSS and keeps ~120 unused .woff files out of dist. */
const dropWoffFallback = {
  name: 'drop-woff-fallback',
  enforce: 'pre',
  transform(code, id) {
    if (id.includes('@fontsource') && id.endsWith('.css')) {
      return code.replace(/,\s*url\([^)]+\.woff\)\s*format\(['"]woff['"]\)/g, '');
    }
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://isaackwok.com',
  vite: {
    plugins: [tailwindcss(), dropWoffFallback]
  }
});