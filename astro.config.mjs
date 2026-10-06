// @ts-check
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// Public URL of the site. Change it here (or via SITE_URL) when the custom domain is ready.
const site = process.env.SITE_URL ?? 'https://portfolio.scastrillon.workers.dev';

// https://astro.build/config
export default defineConfig({
  site,
  // No images to transform and no sessions: keep the Worker free of extra bindings.
  adapter: cloudflare({ imageService: 'passthrough' }),
  session: false,
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-CO', en: 'en-US' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
