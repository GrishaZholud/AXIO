// Processes raw stock/source photos into branded blog covers.
// Same anti-stock pipeline as process-case-img.mjs (re-encode webp, strip EXIF,
// imperceptible modulate/sharpen, stamp AXIO authorship). 1600×900 (16:9).
// Run: `npm run blog:img`. Output: public/images/blog/<slug>.webp
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '../../'); // ~/Downloads — where source photos live
const OUT = resolve(__dirname, '../public/images/blog');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 900; // 16:9

// source file (in ~/Downloads) → blog slug + descriptive metadata
const jobs = [
  { file: 'photo-1619468129361-.jpg', slug: 'localyandexmaps', desc: 'Яндекс Карты для локального бизнеса — гайд | AXIO' },
  { file: 'photo-1678690832311-.jpg', slug: 'post-yandex', desc: 'Как вывести сайт в топ Яндекса за 3 месяца | AXIO' },
  { file: 'photo-1486312338219-.jpg', slug: 'tildavscode', desc: 'Tilda vs чистый код: что выбрать в 2025 | AXIO' },
  { file: 'photo-1683721003111-.jpg', slug: 'targetvk2025', desc: 'Таргет ВКонтакте в 2025: форматы и цена заявки | AXIO' },
  { file: 'photo-1555396273-367.jpg', slug: 'ai-bot-kofeyna', desc: 'ИИ-бот в кофейне: кейс внедрения | AXIO' },
  { file: 'L_height.webp', slug: 'wildberries-2025-algoritm-ranzhirovaniya', desc: 'Wildberries 2025: алгоритм ранжирования | AXIO' },
];

let n = 0;
for (const j of jobs) {
  const input = resolve(SRC, j.file);
  if (!existsSync(input)) {
    console.warn(`SKIP ${j.slug}: source not found — ${j.file}`);
    continue;
  }
  const pipeline = sharp(input)
    .rotate()
    .resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
    .modulate({ brightness: 1.02, saturation: 1.04 })
    .sharpen({ sigma: 0.6 });

  try {
    pipeline.withExif({
      IFD0: {
        ImageDescription: j.desc,
        Copyright: 'AXIO — axioagency.ru',
        Software: 'AXIO',
        Artist: 'AXIO',
      },
    });
  } catch {
    // older sharp — default behaviour already strips source metadata
  }

  await pipeline.webp({ quality: 80, effort: 5 }).toFile(resolve(OUT, `${j.slug}.webp`));
  n++;
  console.log(`✓ ${j.slug}.webp`);
}
console.log(`\nProcessed ${n}/${jobs.length} blog covers → public/images/blog/`);
