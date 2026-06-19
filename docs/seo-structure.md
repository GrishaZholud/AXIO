# SEO & Schema.org Structure

## Key Files

- `src/components/Seo.astro` — Master SEO component for all pages
- `src/lib/schema.ts` — Schema.org JSON-LD builders (Organization, LocalBusiness, BreadcrumbList)
- `src/lib/site.ts` — Canonical NAP (Name, Address, Phone) and brand metadata

## SEO Principles

### NAP Consistency (Local SEO)
NAP must be identical everywhere for local SEO credibility:
- **Source**: `src/lib/site.ts` exports `site` object
- **Used in**: Schema.org markup, footer, Yandex Maps link, structured data
- **Update once**: All schema, contacts, footer auto-derive from this source

### Metadata Per Page
Each page should use the `<Seo>` component with:
- `title` — Page title (include location for local pages: "Services in Yekaterinburg")
- `description` — 150–160 chars
- `ogImage` — Absolute path (resolved against `site.url`)
- `schema` — Pass Organization, LocalBusiness, or BreadcrumbList JSON-LD

### Canonical & Clean URLs
- Astro `trailingSlash: 'never'` → no trailing slashes
- Canonical automatically set in `Seo.astro` to current URL
- Sitemap filters exclude: `/404`, `/header`, `/footer`, `/error`, `/app`

## OG Images

- **Default**: `/images/og-default.jpg` (fallback in `site.defaultOgImage`)
- **Generated**: `scripts/gen-og.mjs` creates dynamic OG images
- **Format**: Absolute paths passed to `<Seo>` component

## Breadcrumbs

Built dynamically via `schema.ts` functions. Pass breadcrumb items to `<Seo>`:
```astro
---
import { buildBreadcrumbs } from '@/lib/schema';
const crumbs = buildBreadcrumbs([
  { label: 'Home', url: '/' },
  { label: 'Services', url: '/services' },
  { label: 'Web Development' }
]);
---
<Seo title="..." schema={crumbs} />
```

## Local Business Schema

Generated in `Seo.astro` from `site.ts`:
- Address, phone, email
- Business hours (Пн–Пт, 9:00–18:00)
- Service area: Yekaterinburg, Sverdlovsk region, Urals Federal District
- Social profiles: Telegram, Yandex.Dzen, Yandex Maps
