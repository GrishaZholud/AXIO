# Component Guide

## Core Components

### Layout Components

#### `BaseLayout.astro`
Default layout wrapper for all pages.
- Sets up HTML structure
- Includes Header, Footer
- Injects SEO metadata

#### `ServicePage.astro`
Layout for service detail pages.
- Breadcrumbs
- Service hero section
- Features list
- CTA form

#### `CasePage.astro`
Layout for case study pages.
- Case hero (client, challenge, solution)
- Metrics/results
- Before/after visuals

#### `BlogPost.astro`
Layout for blog articles.
- Article metadata (author, date)
- Table of contents
- Reading time estimate

### Feature Components

#### `Seo.astro` ⚠️ Critical
Master SEO component. **Every page must use it.**
Props:
- `title: string` — Page title
- `description: string` — Meta description
- `ogImage?: string` — Absolute URL for og:image
- `schema?: any` — JSON-LD structured data
- `noindex?: boolean` — For utility pages

#### `Header.astro`
Navigation header with:
- Logo
- Primary nav with mega-dropdown for Services
- Mobile menu
- CTA button

#### `CtaForm.astro`
Lead capture form:
- Name, phone, email fields
- Service selector
- Form validation & submission

#### `HeroBackground.astro`
Animated background for hero sections.

#### `ServiceCard.astro`
Card component for service listings.

#### `CaseCard.astro`
Card for case study previews.

#### `Footer.astro`
Footer with:
- NAP from `site.ts`
- Social links
- Legal links
- Newsletter signup

#### `Faq.astro` / `FaqTabs.astro`
FAQ components with:
- Accordion or tab layout
- Schema.org FAQPage support

#### `TechBar.astro`
Technology stack display (logos/badges).

#### `Reviews.astro`
Client testimonials carousel.

## Styling

All components use:
- **CSS Modules** (optional) or inline `<style>` scoped to Astro component
- **Tailwind CSS** utilities (if configured)
- Global styles in `src/styles/`

No JavaScript UI frameworks — keep it lightweight and SSG-friendly.

## Icon System

Icons stored in `src/data/assets.ts`:
```astro
<Icon name="arrow-right" class="w-4 h-4" />
```

Import and use `Icon.astro` component.
