import { defineConfig, envField, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://portfolio.pages.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: 'General Sans',
      cssVariable: '--font-general-sans',
      weights: [500, 600, 700],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: [400, 500],
    },
  ],
  env: {
    schema: {
      PUBLIC_CONTACT_EMAIL: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_GITHUB_URL: envField.string({ context: 'client', access: 'public' }),
      PUBLIC_LINKEDIN_URL: envField.string({ context: 'client', access: 'public' }),

      PUBLIC_WEB3FORMS_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: '',
      }),
    },
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: false,
    },
  },
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
