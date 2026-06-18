// JSON-LD builders. These produce schema.org objects that get merged into a
// single @graph by <Seo>. Rich, interlinked structured data is the biggest
// lever for GEO (AI engines reading the entity graph) and AEO (FAQ / answer
// extraction), and was the main gap in the original Tilda export.

import { site, sameAs } from './site';

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** Organization + LocalBusiness — the brand entity every page references. */
export function organizationSchema() {
  return {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.foundingYear),
    logo: `${site.url}/images/logo.png`,
    image: `${site.url}${site.defaultOgImage}`,
    priceRange: '₽₽',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.address.lat,
      longitude: site.address.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    sameAs,
  };
}

/** WebSite — declares the site entity (helps brand SERP / sitelinks). */
export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: 'ru-RU',
    publisher: { '@id': ORG_ID },
  };
}

/** Service offering, linked back to the provider org. */
export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType ?? opts.name,
    url: opts.url,
    provider: { '@id': ORG_ID },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
  };
}

/** Blog article with author + publisher for E-E-A-T. */
export function articleSchema(opts: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.url },
    image: opts.image ? `${site.url}${opts.image}` : `${site.url}${site.defaultOgImage}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    inLanguage: 'ru-RU',
    author: {
      '@type': opts.authorName ? 'Person' : 'Organization',
      name: opts.authorName ?? site.name,
      ...(opts.authorName ? { worksFor: { '@id': ORG_ID } } : { '@id': ORG_ID }),
    },
    publisher: { '@id': ORG_ID },
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/** FAQPage — the key AEO win: lets answer engines extract Q&A directly. */
export function faqSchema(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** HowTo — marks up the "Этапы работы" process for rich results / AEO. */
export function howToSchema(opts: {
  name: string;
  steps: { t: string; d: string }[];
}) {
  return {
    '@type': 'HowTo',
    name: opts.name,
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.t,
      text: s.d,
    })),
  };
}

/** Review nodes for genuine, named testimonials (referenced to the org). */
export function reviewSchema(items: { text: string; author: string }[]) {
  return items.map((r) => ({
    '@type': 'Review',
    itemReviewed: { '@id': ORG_ID },
    author: { '@type': 'Person', name: r.author },
    reviewBody: r.text,
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
  }));
}

export interface Crumb {
  name: string;
  href: string;
}

/** BreadcrumbList — improves SERP breadcrumbs and crawl understanding. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.href.startsWith('http') ? c.href : `${site.url}${c.href}`,
    })),
  };
}
