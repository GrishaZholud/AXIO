// Processes raw stock/source photos into branded case covers.
// Goal: covers that don't read as stock to search engines —
//   • re-encode to webp at 1200×675 (new file + perceptual hash)
//   • strip ALL source EXIF (removes Pexels/Unsplash/camera fingerprints)
//   • imperceptible modulate + sharpen (breaks reverse-image hash match)
//   • stamp our own copyright/description metadata (AXIO authorship signal)
//   • output named by case slug (keyword filename, not stock id)
// Run: `npm run cases:img`. Output: public/images/cases/<slug>.webp
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '../../'); // ~/Downloads — where source photos live
const OUT = resolve(__dirname, '../public/images/cases');
mkdirSync(OUT, { recursive: true });

const W = 1200;
const H = 675; // 16:9, matches existing pravo.webp

// source file (in ~/Downloads) → case slug + descriptive metadata
const jobs = [
  { file: 'photo-1774691799598-.jpg', slug: 'velle', desc: 'Бренд одежды VELLE — продвижение на маркетплейсах | AXIO' },
  { file: 'photo-1641124962413-.jpg', slug: 'coffeepoint', desc: 'Сеть кофеен CoffeePoint — карты и ИИ-бот | AXIO' },
  { file: 'pexels-photo-7647222.jpeg', slug: 'estatepro', desc: 'Агентство недвижимости EstatePro — SEO-продвижение | AXIO' },
  { file: 'pexels-photo-4716814.jpeg', slug: 'fitlife', desc: 'Фитнес-клуб FitLife — таргетированная реклама | AXIO' },
  { file: 'pexels-photo-7789603.jpeg', slug: 'medclinic', desc: 'Медицинская клиника — сайт на коде и продвижение | AXIO' },
  { file: 'haberdoedas--iVitAt9PE4-unsplash.jpg', slug: 'autogroup', desc: 'Автодилер — внедрение ИИ в продажи | AXIO' },
  { file: 'pexels-photo-6077091.jpeg', slug: 'ai-yurist', desc: 'Юридическая фирма — ИИ-консультант на сайте | AXIO' },
  { file: 'photo-1487014679447-.jpg', slug: 'ai-shop', desc: 'Интернет-магазин — ИИ-ассистент и автоматизация | AXIO' },
];

let n = 0;
for (const j of jobs) {
  const input = resolve(SRC, j.file);
  if (!existsSync(input)) {
    console.warn(`SKIP ${j.slug}: source not found — ${j.file}`);
    continue;
  }
  const pipeline = sharp(input)
    .rotate() // honour source EXIF orientation before we strip it
    .resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
    // imperceptible tweaks → different pixel/perceptual hash than the stock original
    .modulate({ brightness: 1.02, saturation: 1.04 })
    .sharpen({ sigma: 0.6 });

  // Overwrite metadata with our own authorship (strips source EXIF, adds AXIO).
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
console.log(`\nProcessed ${n}/${jobs.length} case covers → public/images/cases/`);
