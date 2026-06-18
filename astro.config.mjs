// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Canonical production origin. Used for absolute URLs in SEO tags,
// canonical links, JSON-LD and the generated sitemap.
export const SITE = 'https://axioagency.ru';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    // Clean URLs: /seo instead of /seo/index.html
    format: 'file',
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
