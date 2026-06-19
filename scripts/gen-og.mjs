// Generates branded Open Graph images (1200×630) for every page — dark warm
// background with golden "wave" lines (matching the hero) and the page title
// baked in. Run: `npm run og`. Output: public/images/og/<slug>.jpg
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/images/og');
const THUMB = resolve(__dirname, '../public/images/thumb');
const OUT_CASES = resolve(OUT, 'cases');
const OUT_BLOG = resolve(OUT, 'blog');
mkdirSync(OUT, { recursive: true });
mkdirSync(THUMB, { recursive: true });
mkdirSync(OUT_CASES, { recursive: true });
mkdirSync(OUT_BLOG, { recursive: true });

const W = 1200;
const H = 630;
const FONT = 'Helvetica, Arial, sans-serif';

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const hash = (s) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

// Golden sine-wave lines, concentrated toward the centre like the hero.
// `phase` varies the pattern so each thumbnail looks distinct.
function waves(w, h, phase = 0) {
  const lines = [];
  const N = 13;
  for (let i = 0; i < N; i++) {
    const p = i / (N - 1);
    const baseY = p * h * 1.1 - h * 0.05;
    const amp = 16 + 16 * Math.sin(i * 0.7 + 1 + phase);
    const dist = Math.abs(p - 0.5);
    const a = Math.max(0.05, 0.42 - dist * 0.5);
    let d = '';
    for (let x = -40; x <= w + 40; x += 16) {
      const y =
        baseY +
        amp * Math.sin(x * 0.006 + i * 0.5 + phase) +
        amp * 0.4 * Math.sin(x * 0.013 + i * 0.9 - phase);
      d += (x === -40 ? 'M' : 'L') + x.toFixed(0) + ',' + y.toFixed(1) + ' ';
    }
    lines.push(
      `<path d="${d}" fill="none" stroke="url(#gold)" stroke-width="1.2" opacity="${a.toFixed(2)}"/>`
    );
  }
  return lines.join('\n');
}

const defs = `<defs>
    <radialGradient id="bg" cx="50%" cy="8%" r="110%">
      <stop offset="0%" stop-color="#18130d"/>
      <stop offset="55%" stop-color="#0f0c08"/>
      <stop offset="100%" stop-color="#080604"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#e7cda0"/>
      <stop offset="0.55" stop-color="#c4a675"/>
      <stop offset="1" stop-color="#8f6d44"/>
    </linearGradient>
    <radialGradient id="glow" cx="38%" cy="46%" r="55%">
      <stop offset="0%" stop-color="rgba(214,176,120,0.18)"/>
      <stop offset="62%" stop-color="rgba(214,176,120,0)"/>
    </radialGradient>
  </defs>`;

// Textless branded thumbnail (used as card covers) — 640×360.
function buildThumb(slug) {
  const tw = 640;
  const th = 360;
  const phase = (hash(slug) % 100) / 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${tw}" height="${th}" viewBox="0 0 ${tw} ${th}">
  ${defs}
  <rect width="${tw}" height="${th}" fill="url(#bg)"/>
  ${waves(tw, th, phase)}
  <rect width="${tw}" height="${th}" fill="url(#glow)"/>
</svg>`;
}

// Wrap a title to lines of ~maxChars, returning <tspan> rows.
function wrapTitle(title, maxChars, x, startY, lineH) {
  const words = title.split(' ');
  const rows = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars && cur) {
      rows.push(cur);
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) rows.push(cur);
  return rows
    .slice(0, 4)
    .map(
      (r, i) =>
        `<tspan x="${x}" y="${startY + i * lineH}">${esc(r)}</tspan>`
    )
    .join('');
}

function buildSvg({ eyebrow, title }) {
  const x = 80;
  const titleSize = title.length > 52 ? 56 : 64;
  const lineH = titleSize * 1.12;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs}
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${waves(W, H, 0)}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <!-- brand -->
  <text x="${x}" y="92" font-family="${FONT}" font-size="34" font-weight="800" letter-spacing="2" fill="#f4f1eb">AXIO</text>
  <!-- eyebrow -->
  <rect x="${x}" y="312" width="36" height="2" fill="#c4a675"/>
  <text x="${x + 50}" y="319" font-family="${FONT}" font-size="20" font-weight="700" letter-spacing="3" fill="#c4a675">${esc(eyebrow.toUpperCase())}</text>
  <!-- title -->
  <text font-family="${FONT}" font-size="${titleSize}" font-weight="800" fill="#f4f1eb" letter-spacing="-1">
    ${wrapTitle(title, 26, x, 380, lineH)}
  </text>
  <!-- domain -->
  <text x="${x}" y="568" font-family="${FONT}" font-size="22" fill="rgba(244,241,235,0.5)">axioagency.ru</text>
</svg>`;
}

// What to generate: slug → { eyebrow, title }
const targets = [
  { slug: 'home', eyebrow: 'Digital-агентство · Екатеринбург', title: 'Сайты и маркетинг, которые приносят результат' },
  { slug: 'tilda', eyebrow: 'Сайты на Tilda', title: 'Сайты на Tilda, которые приносят заявки' },
  { slug: 'code', eyebrow: 'Сайты на коде', title: 'Сайты, которые работают на ваш бизнес' },
  { slug: 'template', eyebrow: 'Шаблонные сайты', title: 'Шаблонные сайты под быстрый запуск' },
  { slug: 'seo', eyebrow: 'SEO-продвижение', title: 'SEO-продвижение с фокусом на заявки и продажи' },
  { slug: 'target', eyebrow: 'Таргетированная реклама', title: 'Таргет ВКонтакте и Telegram — заявки от 300 ₽' },
  { slug: 'ai', eyebrow: 'Внедрение ИИ', title: 'Внедрение ИИ в бизнес — чат-боты и автоматизация' },
  { slug: 'aeo', eyebrow: 'AEO-продвижение', title: 'Оптимизация под ответы ИИ — ChatGPT и Perplexity' },
  { slug: 'chatgptads', eyebrow: 'Реклама в ChatGPT', title: 'Реклама в ChatGPT через OpenAI Ads Manager' },
  { slug: 'marketplaces', eyebrow: 'Маркетплейсы и Авито', title: 'Продвижение на Wildberries, Ozon и Авито' },
  { slug: 'maps', eyebrow: 'Карты', title: 'Продвижение на Яндекс и Google Картах' },
  { slug: 'crm', eyebrow: 'Внедрение CRM', title: 'Автоматизация продаж и сквозная аналитика' },
];

// Case studies — unique OG per case (eyebrow = client, title = headline).
// Keep in sync with src/data/cases.ts.
const caseTargets = [
  { slug: 'coffeepoint', eyebrow: 'Кейс · CoffeePoint', title: '+180% звонков с Яндекс Карт и ИИ-бот' },
  { slug: 'velle', eyebrow: 'Кейс · VELLE', title: 'Продажи ×4.2 на Wildberries и Ozon' },
  { slug: 'pravo', eyebrow: 'Кейс · «Право»', title: 'Топ-3 Яндекса и 47 заявок в месяц для юрфирмы' },
  { slug: 'estatepro', eyebrow: 'Кейс · EstatePro', title: 'Трафик ×5 за полгода для агентства недвижимости' },
  { slug: 'fitlife', eyebrow: 'Кейс · FitLife', title: 'CPL вдвое ниже: таргет для фитнес-клуба' },
  { slug: 'medclinic', eyebrow: 'Кейс · MedClinic', title: 'Сайт на коде для клиники: 60% записей онлайн' },
  { slug: 'autogroup', eyebrow: 'Кейс · «АвтоГрупп»', title: 'ИИ-ассистент для автодилера: −70% нагрузки' },
  { slug: 'ai-yurist', eyebrow: 'Кейс · ИИ для юрфирмы', title: 'ИИ-агент: +40% конверсии в консультацию' },
  { slug: 'ai-shop', eyebrow: 'Кейс · ИИ для магазина', title: 'ИИ в магазине: 87% обращений без оператора' },
];

// Blog posts — unique OG per article (eyebrow = category, title = post title).
// Keep in sync with src/data/posts.ts.
const blogTargets = [
  { slug: 'localyandexmaps', eyebrow: 'Карты', title: 'Яндекс Карты для локального бизнеса: полный гайд' },
  { slug: 'tildavscode', eyebrow: 'Сайты', title: 'Tilda vs чистый код: что выбрать в 2025 году' },
  { slug: 'post-yandex', eyebrow: 'SEO', title: 'Как вывести сайт в топ Яндекса за 3 месяца' },
  { slug: 'wildberries-2025-algoritm-ranzhirovaniya', eyebrow: 'Маркетплейсы', title: 'Wildberries 2025: как работает алгоритм ранжирования' },
  { slug: 'targetvk2025', eyebrow: 'Таргет', title: 'Таргет ВКонтакте в 2025: форматы и цена заявки' },
  { slug: 'ai-bot-kofeyna', eyebrow: 'Внедрение ИИ', title: 'ИИ-бот в кофейне: −60% нагрузки за 3 дня' },
];

let n = 0;
for (const t of targets) {
  await sharp(Buffer.from(buildSvg(t)))
    .jpeg({ quality: 86, progressive: true })
    .toFile(resolve(OUT, `${t.slug}.jpg`));
  // Textless card-cover thumbnail (skip the homepage)
  if (t.slug !== 'home') {
    await sharp(Buffer.from(buildThumb(t.slug)))
      .jpeg({ quality: 82, progressive: true })
      .toFile(resolve(THUMB, `${t.slug}.jpg`));
  }
  n++;
}

// Per-case and per-post OG cards (jpg — renders reliably in VK/Telegram unlike webp).
let extra = 0;
for (const t of caseTargets) {
  await sharp(Buffer.from(buildSvg(t)))
    .jpeg({ quality: 86, progressive: true })
    .toFile(resolve(OUT_CASES, `${t.slug}.jpg`));
  extra++;
}
for (const t of blogTargets) {
  await sharp(Buffer.from(buildSvg(t)))
    .jpeg({ quality: 86, progressive: true })
    .toFile(resolve(OUT_BLOG, `${t.slug}.jpg`));
  extra++;
}
console.log(`Generated ${n} page OG + ${n - 1} thumbnails + ${extra} case/blog OG`);
