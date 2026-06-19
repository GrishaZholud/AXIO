# Architecture

## Project Structure

```
src/
├── pages/                 # Route pages (Astro)
│   ├── index.astro       # Homepage
│   ├── cases/            # Case studies
│   └── blog/             # Blog posts
├── layouts/              # Page templates
│   ├── BaseLayout.astro  # Default layout
│   ├── ServicePage.astro # Service pages
│   ├── CasePage.astro    # Case study layout
│   └── BlogPost.astro    # Blog post layout
├── components/           # Reusable components
│   ├── Header.astro      # Navigation header
│   ├── Footer.astro      # Footer
│   ├── Seo.astro         # SEO metadata manager
│   ├── HeroBackground.astro
│   └── [others]
├── lib/                  # Utilities
│   ├── site.ts          # Central NAP & brand config
│   └── schema.ts        # Schema.org builders
├── data/                # Content & config
│   ├── serviceContent.ts # Service offerings
│   ├── faqs.ts          # FAQ data
│   └── assets.ts        # Asset references
└── styles/              # Global CSS
```

## Build & Deployment

- **Framework**: Astro 5.x
- **Format**: Clean URLs (`/service` not `/service/index.html`)
- **Output**: Static SSG, sitemap auto-generated
- **Sitemap**: Excludes utility pages (404, /header, /footer, /error, /app)

## Data Flow

1. **NAP Source**: `src/lib/site.ts` is the single source of truth
2. **SEO Schema**: Generated via `src/lib/schema.ts` + `Seo.astro` component
3. **Content**: Structured data in `src/data/` drives pages
4. **OG Images**: Generated via `scripts/gen-og.mjs` during build

## Key Conventions

- Use `Seo` component on every page to inject metadata, schema.org, and og:image
- Keep NAP consistent: all changes to address/phone/email go through `site.ts`
- Schema.org markup is built programmatically, not hand-written, to avoid drift
- Assets and icon references live in centralized `assets.ts` to avoid duplication
