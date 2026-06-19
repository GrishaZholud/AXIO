# AXIO — Digital Agency Website

> 🚀 **Quick answer?** See [QUICK_START.md](./QUICK_START.md) for common tasks (add service, new page, update contacts, etc.)

**Stack**: Astro 5.x static site generator, TypeScript, Manrope variable font, automated OG image generation, sitemap plugin. Single-source-of-truth data layer for content and NAP (Name, Address, Phone) in `src/lib/site.ts`.

---

## Rules

1. **Use `Seo` component on every page**  
   All pages must inject SEO metadata, schema.org JSON-LD, and og:image via `<Seo>` component. Never skip it. ([docs/seo-structure.md](./docs/seo-structure.md))

2. **NAP is single source of truth**  
   All contact info (address, phone, email) lives in `src/lib/site.ts`. Schema.org, footer, and structured data derive from this one file to prevent drift.

3. **Centralize static references**  
   All icon paths, image paths, and asset URLs live in `src/data/assets.ts`. Update there, not scattered across components.

4. **Content in `src/data/`, not hardcoded**  
   Services, FAQs, and business metadata go into structured TypeScript files. Components consume data via imports, never write HTML strings for marketing copy.

5. **Clean URLs, no trailing slashes**  
   Astro is configured with `trailingSlash: 'never'`. All internal links and routes must follow this pattern: `/services` not `/services/`.

6. **Build-time schema, not hand-written**  
   Use functions in `src/lib/schema.ts` to generate Organization, LocalBusiness, and BreadcrumbList JSON-LD. Never hand-code schema—it drifts from NAP.

7. **Semantic HTML + accessibility first**  
   Use native HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`). Ensure alt text, form labels, focus states, and WCAG AA contrast. No div-based menus or buttons.

8. **Write the least code that works (YAGNI)**  
   Before writing code, check in order: (1) does it need to exist? (2) is it in the standard library / native Astro feature? (3) is it an existing component, util, or data file in this repo? (4) can it be one line? Only then write new code. Reuse `Icon.astro`, `Seo`, `CtaForm`, the `schema.ts` builders and `src/data/` instead of duplicating. No speculative abstractions, no new dependencies without a clear need.

---

## Key Files

**Documentation** — Full architecture, SEO, content patterns, components:
- [Architecture](./docs/architecture.md) — Project structure, build process, data flow
- [SEO & Schema](./docs/seo-structure.md) — Local SEO, NAP consistency, breadcrumbs, OG images
- [Content Structure](./docs/content-structure.md) — Data files (serviceContent, faqs, assets), page patterns
- [Components](./docs/components.md) — Core components, layouts, the critical `Seo` component
- [Style Guide](./docs/style-guide.md) — Design tokens, typography, spacing, animations, a11y

**Critical configs**:
- `astro.config.mjs` — Sitemap filter, clean URLs, site origin (https://axioagency.ru)
- `src/lib/site.ts` — NAP, brand metadata, navigation
- `src/lib/schema.ts` — Schema.org builders
- `.claudeignore` — Excludes node_modules, dist, and build artifacts from Claude indexing

---

**Local development**: `npm run dev` → http://localhost:3000  
**Build**: `npm run build`  
**OG images**: `npm run og` (uses Sharp)
