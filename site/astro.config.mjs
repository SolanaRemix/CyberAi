import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://cyberai.network',
  base: '/',
  outDir: './dist',
  publicDir: './public',
  build: {
    format: 'file',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
