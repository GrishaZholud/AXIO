// Case studies — card/grid metadata. Full body content lives in caseContent.ts.
// Data matches the original site. All cases are demonstration examples for now
// (see casesAreDemo).

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  /** Card + hero headline result */
  headline: string;
  /** Primary services applied (tags) */
  tags: string[];
  metrics: CaseMetric[];
  /** Card teaser */
  teaser: string;
  seoTitle: string;
  seoDescription: string;
  /** Featured on homepage preview */
  featured?: boolean;
}

export const cases: CaseStudy[] = [
  {
    slug: 'coffeepoint',
    client: 'CoffeePoint',
    industry: 'Сеть кофеен',
    headline: '+180% звонков с Яндекс Карт и ИИ-бот для CoffeePoint',
    tags: ['Карты', 'Внедрение ИИ'],
    metrics: [
      { value: '+180%', label: 'звонков с карт' },
      { value: '85%', label: 'обращений берёт ИИ-бот' },
      { value: '4.8', label: 'рейтинг (было 3.9)' },
    ],
    teaser:
      'Оптимизировали профили на картах и внедрили ИИ-бота для обработки заказов: звонков больше, нагрузка на персонал меньше.',
    seoTitle: 'Кейс: +180% звонков с Яндекс Карт и ИИ-бот для CoffeePoint | AXIO',
    seoDescription:
      'Кейс AXIO: продвижение сети кофеен CoffeePoint на Яндекс и Google Картах + ИИ-бот. Топ-3 локального поиска, рейтинг с 3.9 до 4.8, 85% обращений без оператора.',
    featured: true,
  },
  {
    slug: 'velle',
    client: 'VELLE',
    industry: 'Бренд одежды',
    headline: 'Продажи ×4.2 на Wildberries и Ozon для бренда VELLE',
    tags: ['Маркетплейсы'],
    metrics: [
      { value: '×4.2', label: 'рост продаж' },
      { value: 'Топ-10', label: '20 артикулов в категории' },
      { value: '68%', label: 'выкуп (было 41%)' },
    ],
    teaser:
      'Оптимизировали описания, инфографику и рекламные ставки на Wildberries и Ozon — продажи выросли в 4.2 раза.',
    seoTitle: 'Кейс: продажи ×4.2 на Wildberries и Ozon для бренда VELLE | AXIO',
    seoDescription:
      'Кейс AXIO: продвижение бренда одежды VELLE на Wildberries и Ozon. SEO-описания, инфографика, rich-контент и реклама — рост продаж в 4.2 раза, выкуп с 41% до 68%.',
    featured: true,
  },
  {
    slug: 'pravo',
    client: '«Право»',
    industry: 'Юридическая фирма',
    headline: 'Топ-3 Яндекса и 47 заявок/мес для юрфирмы «Право»',
    tags: ['SEO', 'Сайты'],
    metrics: [
      { value: 'Топ-3', label: 'Яндекс за 3 месяца' },
      { value: '47/мес', label: 'заявок (было 0)' },
      { value: '3.2%', label: 'конверсия (было 0.4%)' },
    ],
    teaser:
      'Сделали сайт на Tilda, настроили SEO и вывели в топ-3 Яндекса за 3 месяца. Заявки выросли с нуля до 47 в месяц.',
    seoTitle: 'Кейс: топ-3 Яндекса и 47 заявок в месяц для юрфирмы «Право» | AXIO',
    seoDescription:
      'Кейс AXIO: сайт на Tilda и SEO-продвижение юридической фирмы «Право». Топ-3 Яндекса за 3 месяца, заявки с нуля до 47 в месяц, конверсия с 0.4% до 3.2%.',
    featured: true,
  },
  {
    slug: 'estatepro',
    client: 'EstatePro',
    industry: 'Агентство недвижимости',
    headline: 'Трафик ×5 за полгода для агентства EstatePro',
    tags: ['SEO'],
    metrics: [
      { value: '×5', label: 'органический трафик' },
      { value: 'Топ-5', label: '80% запросов' },
      { value: '2.8%', label: 'конверсия (было 0.6%)' },
    ],
    teaser:
      'Технический аудит, семантика и оптимизация 120 страниц. Трафик вырос в 5 раз за полгода, 80% запросов вышли в топ-5.',
    seoTitle: 'Кейс EstatePro — трафик ×5 за полгода, SEO агентства недвижимости | AXIO',
    seoDescription:
      'Кейс AXIO: SEO-продвижение агентства недвижимости EstatePro. Аудит, семантика и оптимизация 120 страниц — органический трафик вырос в 5 раз, 80% запросов в топ-5.',
  },
  {
    slug: 'fitlife',
    client: 'FitLife',
    industry: 'Фитнес-клуб',
    headline: 'CPL вдвое ниже: таргет для фитнес-клуба FitLife',
    tags: ['Таргет'],
    metrics: [
      { value: '−52%', label: 'стоимость заявки' },
      { value: '864 ₽', label: 'CPL (было 1 800 ₽)' },
      { value: '31%', label: 'конверсия в продажу (было 18%)' },
    ],
    teaser:
      'Запустили таргет во ВКонтакте и Telegram Ads. Сегментация и A/B-тесты снизили стоимость заявки вдвое на том же бюджете.',
    seoTitle: 'Кейс FitLife — таргет ВКонтакте и Telegram, CPL вдвое ниже | AXIO',
    seoDescription:
      'Кейс AXIO: таргетированная реклама фитнес-клуба FitLife во ВКонтакте и Telegram Ads. Сегментация и A/B-тесты снизили стоимость заявки с 1 800 до 864 ₽.',
  },
  {
    slug: 'medclinic',
    client: 'MedClinic',
    industry: 'Медицинская клиника',
    headline: 'Сайт на коде для клиники: 60% записей онлайн',
    tags: ['Сайты'],
    metrics: [
      { value: '60%', label: 'записей онлайн (было 0)' },
      { value: '98', label: 'Google PageSpeed' },
      { value: '45 дней', label: 'от брифа до запуска' },
    ],
    teaser:
      'Разработали сайт на чистом коде с онлайн-записью, личным кабинетом пациента и интеграцией с МИС. PageSpeed — 98 баллов.',
    seoTitle: 'Кейс MedClinic — сайт клиники на коде с онлайн-записью | AXIO',
    seoDescription:
      'Кейс AXIO: разработка сайта медицинской клиники MedClinic на чистом коде. Онлайн-запись, личный кабинет, интеграция с МИС, PageSpeed 98 — 60% записей через сайт.',
  },
  {
    slug: 'autogroup',
    client: '«АвтоГрупп»',
    industry: 'Автодилер',
    headline: 'ИИ-ассистент для автодилера: −70% нагрузки на менеджеров',
    tags: ['Внедрение ИИ'],
    metrics: [
      { value: '78%', label: 'обращений берёт ИИ' },
      { value: '4 мин', label: 'ответ (было 2 часа)' },
      { value: '24%', label: 'в тест-драйв (было 8%)' },
    ],
    teaser:
      'Внедрили ИИ-ассистента для квалификации лидов и записи на тест-драйв. Менеджеры работают только с горячими клиентами.',
    seoTitle: 'Кейс «АвтоГрупп» — ИИ-ассистент для автодилера, −70% нагрузки | AXIO',
    seoDescription:
      'Кейс AXIO: ИИ-ассистент для автодилера «АвтоГрупп» — квалификация лидов и запись на тест-драйв. 78% обращений без менеджера, конверсия в тест-драйв с 8% до 24%.',
  },
  {
    slug: 'ai-yurist',
    client: 'ИИ для юрфирмы',
    industry: 'Юридическая фирма',
    headline: 'ИИ-агент для юрфирмы: +40% конверсии в консультацию',
    tags: ['Внедрение ИИ'],
    metrics: [
      { value: '+40%', label: 'конверсия в консультацию' },
      { value: '24/7', label: 'мгновенный ответ' },
    ],
    teaser:
      'ИИ-агент для первичной квалификации клиентов и сбора документов. К юристу приходят уже подготовленные клиенты.',
    seoTitle: 'ИИ-агент для юридической фирмы: +40% конверсии | Кейс AXIO',
    seoDescription:
      'Кейс AXIO: ИИ-агент для юридической фирмы — круглосуточная квалификация клиентов и сбор документов. Конверсия в консультацию выросла на 40%.',
  },
  {
    slug: 'ai-shop',
    client: 'ИИ для магазина',
    industry: 'Интернет-магазин',
    headline: 'ИИ в интернет-магазине: 87% обращений без оператора',
    tags: ['Внедрение ИИ'],
    metrics: [
      { value: '87%', label: 'обращений без оператора' },
      { value: '24/7', label: 'ответы клиентам' },
    ],
    teaser:
      'ИИ-ассистент в WhatsApp, подключённый к базе магазина в реальном времени. Операторы занялись тем, что требует человека.',
    seoTitle: 'ИИ для интернет-магазина: 87% обращений без оператора | Кейс AXIO',
    seoDescription:
      'Кейс AXIO: ИИ-ассистент в WhatsApp для интернет-магазина с подключением к базе в реальном времени. 87% обращений закрываются без оператора, autozаполнение amoCRM.',
  },
];

// All current case studies are demonstration examples (no real client data).
// Flip to false — or add a per-case `demo` flag — when real cases land.
export const casesAreDemo = true;

export const featuredCases = cases.filter((c) => c.featured);
export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
