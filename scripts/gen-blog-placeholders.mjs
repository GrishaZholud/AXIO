// Temporary branded placeholder covers for blog posts that don't have a real
// photo yet. Dark warm background + golden waves (matching OG style) + category
// label, so pages look intentional until real photos arrive.
// Run: `npm run blog:placeholders`. Output: public/images/blog/<slug>.webp
// Skips slugs whose cover already exists (won't overwrite real photos).
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/images/blog');
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 675;
const FONT = 'Helvetica, Arial, sans-serif';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hash = (s) => [...s].reduce((a, c) => a + c.charCodeAt(0), 0);

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
      const y = baseY + amp * Math.sin(x * 0.006 + i * 0.5 + phase) + amp * 0.4 * Math.sin(x * 0.013 + i * 0.9 - phase);
      d += (x === -40 ? 'M' : 'L') + x.toFixed(0) + ',' + y.toFixed(1) + ' ';
    }
    lines.push(`<path d="${d}" fill="none" stroke="url(#gold)" stroke-width="1.2" opacity="${a.toFixed(2)}"/>`);
  }
  return lines.join('\n');
}

const defs = `<defs>
  <radialGradient id="bg" cx="50%" cy="8%" r="110%">
    <stop offset="0%" stop-color="#18130d"/><stop offset="55%" stop-color="#0f0c08"/><stop offset="100%" stop-color="#080604"/>
  </radialGradient>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#e7cda0"/><stop offset="0.55" stop-color="#c4a675"/><stop offset="1" stop-color="#8f6d44"/>
  </linearGradient>
  <radialGradient id="glow" cx="38%" cy="46%" r="55%">
    <stop offset="0%" stop-color="rgba(214,176,120,0.18)"/><stop offset="62%" stop-color="rgba(214,176,120,0)"/>
  </radialGradient>
</defs>`;

function svg(slug, label) {
  const phase = (hash(slug) % 100) / 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  ${defs}
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  ${waves(W, H, phase)}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="80" y="${H / 2 - 6}" font-family="${FONT}" font-size="30" font-weight="800" letter-spacing="4" fill="#c4a675">${esc(label.toUpperCase())}</text>
  <text x="80" y="${H / 2 + 34}" font-family="${FONT}" font-size="20" fill="rgba(244,241,235,0.45)">axioagency.ru · обложка скоро</text>
</svg>`;
}

// slug → category label (placeholders only; remove a slug once a real photo lands)
const targets = [
  { slug: 'post-yandex', label: 'SEO' },
  { slug: 'wildberries-2025-algoritm-ranzhirovaniya', label: 'Маркетплейсы' },
  { slug: 'targetvk2025', label: 'Таргет' },
  { slug: 'ai-bot-kofeyna', label: 'Внедрение ИИ' },
];

let n = 0;
for (const t of targets) {
  const out = resolve(OUT, `${t.slug}.webp`);
  if (existsSync(out)) {
    console.log(`skip ${t.slug} (cover exists)`);
    continue;
  }
  await sharp(Buffer.from(svg(t.slug, t.label))).webp({ quality: 80 }).toFile(out);
  n++;
  console.log(`✓ ${t.slug}.webp (placeholder)`);
}
console.log(`\nGenerated ${n} placeholder cover(s).`);
