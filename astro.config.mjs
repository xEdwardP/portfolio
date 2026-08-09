import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://portfolio.pages.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [react(), mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
