// Central source of truth for business data (NAP), navigation and brand.
// Keeping this in one typed module means schema.org markup, the footer,
// the contacts page and the sitemap can never drift apart.

export const site = {
  name: 'AXIO',
  legalName: 'AXIO',
  tagline: 'Разработка сайтов и digital-маркетинг в Екатеринбурге',
  domain: 'axioagency.ru',
  url: 'https://axioagency.ru',
  foundingYear: 2024,
  description:
    'Digital-агентство полного цикла в Екатеринбурге. Разрабатываем сайты на коде и Tilda, продвигаем в Яндексе и Google, настраиваем таргет, выводим товары на маркетплейсы и внедряем ИИ.',
  // NAP — Name, Address, Phone — must stay identical everywhere for local SEO.
  phone: '+7 982 855 91 77',
  phoneHref: '+79828559177',
  email: 'info@axioagency.ru',
  address: {
    street: 'улица Хомякова, 14',
    city: 'Екатеринбург',
    region: 'Свердловская область',
    postalCode: '620026',
    country: 'RU',
    // Coordinates of the verified Yandex Maps org card (ул. Хомякова, 14)
    lat: 56.84166,
    lng: 60.576382,
  },
  // Legal entity — operator of personal data, party to the public offer.
  legal: {
    entity: 'Индивидуальный предприниматель Жолудь Григорий Вячеславович',
    entityShort: 'ИП Жолудь Г. В.',
    inn: '667900632793',
    ogrnip: '325665800075938',
  },
  hours: 'Пн–Пт, 9:00 — 18:00',
  hoursSchema: ['Mo-Fr 09:00-18:00'],
  areaServed: ['Екатеринбург', 'Свердловская область', 'УрФО'],
  social: {
    telegram: 'https://t.me/axioagency',
    telegramHandle: '@axioagency',
    dzen: 'https://dzen.ru/axioagency',
    yandexMaps: 'https://yandex.ru/maps/org/axio/114165096429/',
  },
  // Yandex Metrika counter id. Loaded only AFTER the user accepts cookies
  // (see Analytics.astro + CookieBar.astro). Replace with the real counter id.
  metrikaId: '109370053',
  // og:image fallback (absolute path resolved against site.url in <Seo>)
  defaultOgImage: '/images/og-default.jpg',
} as const;

export const sameAs = [
  site.social.telegram,
  site.social.dzen,
  site.social.yandexMaps,
];

// Primary navigation. `mega` groups feed the desktop dropdown.
export const nav = {
  primary: [
    { label: 'Главная', href: '/' },
    { label: 'Услуги', href: '#', mega: true },
    { label: 'Кейсы', href: '/cases' },
    { label: 'О нас', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '/contacts' },
  ],
  legal: [
    { label: 'Политика конфиденциальности', href: '/privacy' },
    { label: 'Публичная оферта', href: '/oferta' },
    { label: 'Отмена заказа', href: '/refund' },
  ],
} as const;
