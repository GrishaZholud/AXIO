# Content Structure

## Data Files

All structured content lives in `src/data/`:

### `serviceContent.ts`
Defines all services offered:
```typescript
{
  id: string;              // Unique key (used in URLs)
  title: string;           // Service name
  description: string;     // Short description
  icon?: string;           // Icon identifier
  features: string[];      // Service features
  metaDescription: string; // SEO meta description
  // ...other metadata
}
```
Used by:
- Service listing pages
- Navigation dropdown (`mega` menu)
- Service detail pages in `/src/pages/services/[slug].astro`

### `faqs.ts`
Structured FAQ data:
```typescript
{
  question: string;
  answer: string;
  category?: string;  // For grouping/filtering
}
```
Used by:
- FAQ components across pages
- Schema.org FAQPage markup

### `assets.ts`
Central reference for images, icons, and static files:
```typescript
{
  icons: { [key]: '/icons/...' };
  images: { [key]: '/images/...' };
}
```
Benefits:
- Single source for all asset paths
- Prevents broken references
- Easy to audit and update

## Pages

### `/pages/cases/`
- Case study routes (auto-generated from data)
- Uses `CasePage.astro` layout
- Includes before/after, metrics, testimonials

### `/pages/blog/`
- Blog posts (auto-generated)
- Uses `BlogPost.astro` layout
- Markdown or Astro components

### `/pages/services/`
- Service detail pages
- Uses `ServicePage.astro` layout
- Pulls from `serviceContent.ts`

## Adding New Content

1. **New Service**: Add entry to `src/data/serviceContent.ts`
2. **New FAQ**: Add to `src/data/faqs.ts`
3. **New Case/Blog**: Create `.astro` or `.md` file in appropriate folder
4. **New Image/Icon**: Add path reference to `src/data/assets.ts`
