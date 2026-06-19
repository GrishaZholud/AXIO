# Style Guide

## Design System

### Colors
- **Primary Brand**: Use variables from `src/styles/` (check for CSS custom properties)
- **Neutral**: Black, white, grays for text and backgrounds
- **Accent**: Match brand palette for CTAs and highlights

See global stylesheet for exact values.

### Typography

#### Font Stack
- **Body**: Manrope (variable, from `@fontsource-variable/manrope`)
- **Sizes**: Scales from `text-sm` (small) to `text-2xl` (large)
- **Line Height**: Default 1.5 for body, tighter for headings

#### Heading Hierarchy
- `<h1>` — Page title (once per page)
- `<h2>` — Section headings
- `<h3>` — Subsections
- `<h4>–<h6>` — Nested content

### Spacing

Use consistent spacing scale:
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px

### Layout

- **Hero sections**: Full-width with padding, centered text
- **Content sections**: Max-width container (typically 1200px)
- **Cards**: Consistent padding and border-radius
- **Forms**: Standard label-above-input layout

### Interactive Elements

#### Buttons
- Primary CTA: Solid background, white text
- Secondary: Outlined style
- Hover states: Slightly darker or lifted shadow
- Disabled: Reduced opacity

#### Forms
- Label styling: Small, semibold
- Input borders: Light gray, darker on focus
- Validation: Red error text below field
- Success: Green check mark or highlight

### Animations

Keep animations subtle:
- Fade-ins on scroll (intersection observer)
- Hover effects on interactive elements (0.2s duration)
- Form interactions: Quick feedback (0.1s)
- No auto-playing animations (accessibility)

## Code Style

### Astro Components
- Use descriptive prop names
- Keep components under 300 lines (split into smaller pieces)
- Frontmatter (---) for logic, template below

### TypeScript
- Strict mode enabled
- Define interfaces for all data structures
- Export typed constants from `lib/` modules

### CSS
- Prefer utility classes (Tailwind) over custom CSS
- If custom CSS needed: Scoped `<style>` blocks in Astro components
- Avoid `!important`

### Markdown (Blog/Docs)
- H1 only at top
- Readable line length (60–80 chars)
- Code blocks with language hints (```typescript)
- Link references clearly labeled

## Accessibility

- Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Sufficient color contrast (WCAG AA minimum)
- Alt text on all images
- Form labels connected to inputs
- Focus states visible (outline or border)

## Performance

- Lazy-load images (native `loading="lazy"`)
- Compress images before adding (use Sharp)
- Avoid large JavaScript payloads
- Keep CSS minimal (leverage utilities)
