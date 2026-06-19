# Quick Start — AXIO

For common tasks, look here first. For full reference → see [CLAUDE.md](./CLAUDE.md) and [docs/](./docs/).

---

## Add a New Service

1. Open `src/data/serviceContent.ts`
2. Add object:
```typescript
{
  id: 'web-dev',
  title: 'Web Development',
  description: 'Custom websites on code',
  icon: 'code-icon',
  features: ['Responsive design', 'Fast loading', 'SEO-ready'],
  metaDescription: 'Web development services in Yekaterinburg',
}
```
3. Run `npm run build` → auto-routes to `/services/web-dev`
4. No new files needed — routing is automatic

---

## Add a New Page

1. Copy template:
```bash
cp src/layouts/BaseLayout.astro src/pages/new-page.astro
```

2. Add Seo metadata and content:
```astro
---
import { site } from '@/lib/site';
import Seo from '@/components/Seo.astro';
---

<Seo 
  title="Page Title"
  description="Meta description (150–160 chars)"
/>

<main>
  <h1>Page Title</h1>
  {/* Your content */}
</main>
```

3. Page is live at `/new-page`

---

## Add a Blog Post

1. Create file: `src/pages/blog/my-post.md` or `.astro`
2. Add frontmatter:
```yaml
---
layout: ../../layouts/BlogPost.astro
title: "Post Title"
date: 2026-06-17
author: "Your Name"
description: "SEO description"
---

Your markdown content here...
```

3. Post is live at `/blog/my-post`

---

## Add a Case Study

1. Create file: `src/pages/cases/client-name.astro`
2. Use template:
```astro
---
import CasePage from '@/layouts/CasePage.astro';
import Seo from '@/components/Seo.astro';
---

<CasePage>
  <Seo title="Case: Client Name" />
  <h1>Client Name</h1>
  <section class="challenge">
    <h2>Challenge</h2>
    {/* ... */}
  </section>
  <section class="results">
    <h2>Results</h2>
    {/* metrics, before/after */}
  </section>
</CasePage>
```

3. Case is live at `/cases/client-name`

---

## Update Contact Info (NAP)

**One place only**: `src/lib/site.ts`

```typescript
phone: '+7 982 855 91 77',      // ← change here
email: 'info@axioagency.ru',   // ← change here
address: { /* ... */ }          // ← change here
```

Changes auto-flow to:
- Footer (`Footer.astro`)
- Schema.org markup (`Seo.astro`)
- Sitemap metadata
- All pages using `<Seo>`

---

## Update Navigation

`src/lib/site.ts` → `nav` object:

```typescript
export const nav = {
  primary: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '#', mega: true },  // ← mega dropdown auto-populates from serviceContent
    { label: 'Cases', href: '/cases' },
    // Add new items here
  ],
  legal: [
    // Footer legal links
  ],
};
```

---

## Update FAQs

1. Open `src/data/faqs.ts`
2. Add:
```typescript
{
  question: "How much does a website cost?",
  answer: "Depends on complexity. From 50K to 500K RUB.",
  category: "pricing"
}
```

3. FAQs auto-display in components using `<Faq>` or `<FaqTabs>`

---

## Add an Image or Icon

1. Place file in `public/` (images) or `src/data/assets.ts` (references)
2. Update `src/data/assets.ts`:
```typescript
export const assets = {
  icons: {
    arrowRight: '/icons/arrow-right.svg',
  },
  images: {
    hero: '/images/hero-bg.jpg',
  }
};
```

3. Use in components:
```astro
<img src={assets.images.hero} alt="Hero background" />
```

---

## Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local server at http://localhost:3000 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Test production build locally |
| `npm run og` | Generate OG images (Sharp) |
| `npm run astro` | Direct Astro CLI access |

---

## Most Common Issues

**Issue**: Page doesn't show up after I created it  
**Fix**: Did you use `<Seo>`? Without it, metadata breaks. Run `npm run build` to rebuild routing.

**Issue**: Contact info is different in footer vs Schema.org  
**Fix**: Update in `src/lib/site.ts` only, not scattered across files.

**Issue**: Old page still cached  
**Fix**: Clear cache: `rm -rf dist/ .astro/` then `npm run build`

---

## When to Read Full Docs

| Question | Read |
|----------|------|
| "How does SEO work?" | [docs/seo-structure.md](./docs/seo-structure.md) |
| "What components exist?" | [docs/components.md](./docs/components.md) |
| "What's the project structure?" | [docs/architecture.md](./docs/architecture.md) |
| "How do I add content?" | [docs/content-structure.md](./docs/content-structure.md) |
| "Design tokens & styles?" | [docs/style-guide.md](./docs/style-guide.md) |

---

**Last updated**: 2026-06-17  
**Questions?** Check CLAUDE.md → see the Rules section (rule #2 = NAP, rule #3 = assets, etc.)
