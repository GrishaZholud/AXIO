// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin. Used for absolute URLs in SEO tags,
// canonical links, JSON-LD and the generated sitemap.
export const SITE = 'https://axioagency.ru';

export default defineConfig({
  site: SITE,
  // Plain static build — deploys to any host (Timeweb shared/Apache).
  output: 'static',
  trailingSlash: 'never',
  build: {
    // Directory format (/seo/index.html) → Apache serves /seo automatically,
    // so clean URLs work on shared hosting without rewrite rules.
    format: 'directory',
  },
  integrations: [
    sitemap({
      // Exclude utility pages from the sitemap
      filter: (page) =>
        !['/404', '/header', '/footer', '/error', '/app'].some((p) =>
          page.replace(SITE, '').replace(/\/$/, '').endsWith(p)
        ),
    }),
  ],
});
