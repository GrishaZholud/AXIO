// All service offerings, grouped as they appear in the site navigation and
// the homepage "Полный спектр digital-услуг" grid. Each entry drives:
//   • the mega-menu and homepage cards (label, short, group, icon)
//   • the service landing page <Seo> (seoTitle, seoDescription)
//   • Service schema.org markup (name, description)

export type ServiceGroup = 'Сайты' | 'Маркетинг' | 'Площадки';

export interface Service {
  slug: string;
  /** Short label used in nav / cards */
  label: string;
  /** One-line value proposition under the label */
  short: string;
  group: ServiceGroup;
  /** Inline SVG icon id (see ServiceCard) */
  icon: string;
  seoTitle: string;
  seoDescription: string;
}

export const services: Service[] = [
  {
    slug: 'tilda',
    label: 'Сайты на Tilda',
    short: 'Лендинги, корпоративные сайты и интернет-магазины',
    group: 'Сайты',
    icon: 'layout',
    seoTitle: 'Создание сайтов на Tilda — лендинги и корпоративные сайты | AXIO',
    seoDescription:
      'Разработка сайтов на Tilda в Екатеринбурге: лендинги, корпоративные сайты и интернет-магазины под ключ. Индивидуальный дизайн, адаптивность, интеграция с CRM. Запуск от 5 дней.',
  },
  {
    slug: 'code',
    label: 'Сайты на коде',
    short: 'Индивидуальные решения любой сложности',
    group: 'Сайты',
    icon: 'code',
    seoTitle: 'Разработка сайтов на коде — быстро, гибко, без ограничений | AXIO',
    seoDescription:
      'Разработка сайтов на коде: HTML/CSS/JS, React, Next.js, Node.js. Высокая скорость загрузки, любой функционал, интеграции и масштабируемость. Сайты под задачи бизнеса.',
  },
  {
    slug: 'template',
    label: 'Шаблонные сайты',
    short: 'Быстрый запуск на готовом шаблоне',
    group: 'Сайты',
    icon: 'rocket',
    seoTitle: 'Шаблонные сайты — быстрый старт за 5 дней | AXIO',
    seoDescription:
      'Готовые шаблонные сайты с быстрым запуском за 5 дней. Адаптивный дизайн, базовое SEO и подключение аналитики. Оптимальный старт для малого бизнеса.',
  },
  {
    slug: 'seo',
    label: 'SEO-продвижение',
    short: 'Рост позиций в поиске и стабильный трафик',
    group: 'Маркетинг',
    icon: 'search',
    seoTitle: 'SEO-продвижение сайтов в Яндексе и Google — рост трафика | AXIO',
    seoDescription:
      'SEO-продвижение сайтов в Екатеринбурге: технический аудит, сбор семантики, оптимизация и ссылки. Рост позиций в Яндексе и Google, стабильный трафик и заявки. Прозрачная отчётность.',
  },
  {
    slug: 'target',
    label: 'Таргетированная реклама',
    short: 'Привлечение клиентов из соцсетей и рекламных сетей',
    group: 'Маркетинг',
    icon: 'target',
    seoTitle: 'Таргетированная реклама ВКонтакте и Telegram — заявки от 300 ₽ | AXIO',
    seoDescription:
      'Настройка таргетированной рекламы во ВКонтакте, Telegram Ads и Яндекс.Директе. Креативы, сквозная аналитика и оптимизация. Заявки от 300 ₽, прозрачные отчёты по результатам.',
  },
  {
    slug: 'ai',
    label: 'Внедрение ИИ',
    short: 'Автоматизация бизнеса с помощью нейросетей',
    group: 'Маркетинг',
    icon: 'spark',
    seoTitle: 'Внедрение ИИ в бизнес в Екатеринбурге — чат-боты и автоматизация | AXIO',
    seoDescription:
      'Внедрение ИИ в бизнес: чат-боты, ИИ-агенты, автоматизация поддержки и продаж. Снижаем нагрузку на сотрудников и ускоряем обработку обращений. Решения под ваши процессы.',
  },
  {
    slug: 'aeo',
    label: 'AEO-продвижение',
    short: 'Оптимизация под ответы ИИ-ассистентов',
    group: 'Маркетинг',
    icon: 'message',
    seoTitle: 'AEO-продвижение — оптимизация под ответы ИИ ChatGPT и Perplexity | AXIO',
    seoDescription:
      'AEO-продвижение: оптимизация сайта под ответы ИИ-ассистентов — ChatGPT, Perplexity, Яндекс Нейро и Google AI Overviews. Структурированные данные, FAQ-разметка, экспертный контент.',
  },
  {
    slug: 'chatgptads',
    label: 'Реклама в ChatGPT',
    short: 'Объявления в OpenAI Ads Manager',
    group: 'Маркетинг',
    icon: 'megaphone',
    seoTitle: 'Реклама в ChatGPT — настройка через OpenAI Ads Manager | AXIO',
    seoDescription:
      'Настройка и ведение рекламы в ChatGPT через OpenAI Ads Manager. Размещение объявлений в ответах ИИ, таргетинг по запросам и аналитика. Новый канал привлечения клиентов.',
  },
  {
    slug: 'marketplaces',
    label: 'Маркетплейсы и Авито',
    short: 'Вывод и продвижение товаров в топ',
    group: 'Площадки',
    icon: 'cart',
    seoTitle: 'Продвижение на Wildberries, Ozon и Авито — рост продаж | AXIO',
    seoDescription:
      'Продвижение на Wildberries, Ozon, Яндекс Маркете и Авито: оформление карточек, SEO-описания, инфографика и реклама. Вывод товаров в топ и рост продаж под ключ.',
  },
  {
    slug: 'maps',
    label: 'Карты (Google, Яндекс)',
    short: 'Продвижение в картах и привлечение локальных клиентов',
    group: 'Площадки',
    icon: 'pin',
    seoTitle: 'Продвижение на Яндекс и Google Картах — локальные клиенты | AXIO',
    seoDescription:
      'Продвижение бизнеса на Яндекс и Google Картах: регистрация и верификация, заполнение профиля, работа с отзывами и реклама. Привлекаем локальных клиентов, которые ищут «рядом».',
  },
  {
    slug: 'crm',
    label: 'Внедрение CRM',
    short: 'Автоматизация продаж и аналитика',
    group: 'Площадки',
    icon: 'flow',
    seoTitle: 'Внедрение CRM — автоматизация продаж и сквозная аналитика | AXIO',
    seoDescription:
      'Внедрение и настройка CRM (amoCRM, Bitrix24): автоматизация воронки продаж, интеграция с сайтом и телефонией, сквозная аналитика. Наводим порядок в заявках и продажах.',
  },
];

export const serviceGroups: ServiceGroup[] = ['Сайты', 'Маркетинг', 'Площадки'];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

export const servicesByGroup = (group: ServiceGroup) =>
  services.filter((s) => s.group === group);
