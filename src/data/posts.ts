// Blog post metadata. Article body lives in each post page (in the BlogPost
// slot). `services` / `cases` drive internal interlinking (SEO).
import type { FaqTopic } from './faqs';

export interface Post {
  slug: string;
  title: string;
  /** Card + hero excerpt */
  excerpt: string;
  /** Meta description */
  description: string;
  category: string;
  /** Human reading time, e.g. "5 мин" */
  readingTime: string;
  cover: string;
  faqTopic: FaqTopic;
  /** Related service slugs (internal links) */
  services: string[];
  /** Related case slugs (internal links) */
  cases: string[];
  datePublished: string;
  dateModified: string;
  /** Named author for E-E-A-T (Article schema + byline) */
  author: string;
  /** Author's role/expertise shown next to the name */
  authorRole?: string;
}

// Default author for editorial posts — the agency founder.
const FOUNDER = { author: 'Григорий Жолудь', authorRole: 'основатель AXIO' };

export const posts: Post[] = [
  {
    slug: 'localyandexmaps',
    ...FOUNDER,
    title: 'Яндекс Карты для локального бизнеса: полный гайд',
    excerpt:
      'Как заполнить профиль в Яндекс Бизнес, собрать отзывы и получать стабильный поток звонков с карт и 2ГИС — без рекламного бюджета.',
    description:
      'Как заполнить профиль в Яндекс Бизнес, собрать отзывы и получать стабильный поток звонков с Яндекс Карт и 2ГИС. Пошаговый гайд для локального бизнеса.',
    category: 'Карты',
    readingTime: '6 мин',
    cover: '/images/blog/localyandexmaps.webp',
    faqTopic: 'maps',
    services: ['maps', 'seo'],
    cases: ['coffeepoint'],
    datePublished: '2026-05-12',
    dateModified: '2026-06-09',
  },
  {
    slug: 'tildavscode',
    ...FOUNDER,
    title: 'Tilda vs чистый код: что выбрать в 2025 году',
    excerpt:
      'Честное сравнение: скорость, стоимость, гибкость и SEO-потенциал. Помогаем выбрать правильный вариант под задачу бизнеса.',
    description:
      'Честное сравнение Tilda и разработки на коде: скорость, стоимость, SEO и гибкость. Помогаем выбрать правильный вариант для вашего бизнеса.',
    category: 'Сайты',
    readingTime: '5 мин',
    cover: '/images/blog/tildavscode.webp',
    faqTopic: 'websites',
    services: ['tilda', 'code', 'template'],
    cases: ['pravo', 'medclinic'],
    datePublished: '2026-05-20',
    dateModified: '2026-06-09',
  },
  {
    slug: 'post-yandex',
    ...FOUNDER,
    title: 'Как вывести сайт в топ Яндекса за 3 месяца: разбор реального кейса',
    excerpt:
      'Пошаговый разбор: технический аудит, семантика, контент и поведенческие факторы. +320% трафика и топ-3 за 90 дней — без покупки ссылок.',
    description:
      'Как вывести сайт в топ-3 Яндекса за 3 месяца: технический аудит, сбор семантики, контент и поведенческие факторы. Реальный кейс юрфирмы — +320% трафика и 47 заявок в месяц.',
    category: 'SEO',
    readingTime: '7 мин',
    cover: '/images/blog/post-yandex.webp',
    faqTopic: 'seo',
    services: ['seo', 'code'],
    cases: ['pravo'],
    datePublished: '2026-04-22',
    dateModified: '2026-06-09',
  },
  {
    slug: 'wildberries-2025-algoritm-ranzhirovaniya',
    ...FOUNDER,
    title: 'Wildberries 2025: как работает алгоритм ранжирования',
    excerpt:
      '7 ключевых факторов выдачи WB в 2025 году: конверсия, доставка, отзывы, контент, выкуп, цена и реклама. Что работает, а что больше нет.',
    description:
      'Как работает алгоритм ранжирования Wildberries в 2025 году: 7 ключевых факторов выдачи — конверсия, скорость доставки, отзывы, контент карточки, выкуп, цена и реклама. Что изменилось и как адаптироваться.',
    category: 'Маркетплейсы',
    readingTime: '8 мин',
    cover: '/images/blog/wildberries-2025-algoritm-ranzhirovaniya.webp',
    faqTopic: 'marketplaces',
    services: ['marketplaces', 'seo'],
    cases: ['velle'],
    datePublished: '2026-05-28',
    dateModified: '2026-06-10',
  },
  {
    slug: 'targetvk2025',
    ...FOUNDER,
    title: 'Таргет ВКонтакте в 2025: форматы, аудитории и цена заявки',
    excerpt:
      'Какие форматы VK Рекламы работают сейчас, где искать аудиторию и три рычага снижения цены заявки. С чего начать при бюджете 300 ₽/день.',
    description:
      'Таргетированная реклама ВКонтакте в 2025 году: рабочие форматы объявлений, стратегии таргетинга, ретаргетинг и три способа снизить стоимость заявки. Практическое руководство для бизнеса.',
    category: 'Таргет',
    readingTime: '6 мин',
    cover: '/images/blog/targetvk2025.webp',
    faqTopic: 'target',
    services: ['target', 'seo'],
    cases: ['fitlife'],
    datePublished: '2026-06-03',
    dateModified: '2026-06-10',
  },
  {
    slug: 'ai-bot-kofeyna',
    ...FOUNDER,
    title: 'Как мы внедрили ИИ-бота в кофейню и сократили нагрузку на 60%',
    excerpt:
      'Кейс: Telegram-бот на GPT-4o mini для кофейни. Запись на мастер-классы, приём предзаказов и ответы на FAQ — внедрение за 3 дня.',
    description:
      'Кейс AXIO: как мы внедрили ИИ-бота на GPT-4o mini в кофейню в Екатеринбурге. Стек, логика и результаты: −60% нагрузки на администратора, +34% записей на мастер-классы, внедрение за 3 дня.',
    category: 'Внедрение ИИ',
    readingTime: '6 мин',
    cover: '/images/blog/ai-bot-kofeyna.webp',
    faqTopic: 'ai',
    services: ['ai', 'tilda'],
    cases: ['coffeepoint'],
    datePublished: '2026-06-10',
    dateModified: '2026-06-12',
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
