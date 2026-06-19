// Processes the company's own building + office photos into web covers for /about.
// These are AXIO's real photos (not stock), so the focus is: strip EXIF
// (HEIC carries GPS geotags — privacy), resize, re-encode to webp, stamp own
// authorship. Run: `npm run about:img`. Output: public/images/about/<name>.webp
//
// Note: HEIC is pre-converted to JPG via macOS `sips` in the npm script, because
// sharp is often built without libheif. We read the converted JPG here.
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '../../'); // ~/Downloads
const TMP = '/tmp';
const OUT = resolve(__dirname, '../public/images/about');
mkdirSync(OUT, { recursive: true });

const jobs = [
  {
    file: resolve(SRC, 'a808b2908c498366ba3af56ab2f6941d.jpg'),
    out: 'building.webp',
    desc: 'Бизнес-центр «Сенатор», ул. Хомякова 14 — офис AXIO в Екатеринбурге',
    w: 1600,
    h: 900, // 16:9 wide — env section
    position: sharp.strategy.attention,
  },
  {
    file: resolve(TMP, 'office_about.jpg'), // converted from IMG_2317.HEIC by sips
    out: 'office.webp',
    desc: 'Офис digital-агентства AXIO в Екатеринбурге',
    w: 1200,
    h: 1400, // ~6:7 portrait — hero column; centre keeps the whole room in frame
    position: 'centre',
  },
  {
    file: resolve(TMP, 'office_about.jpg'),
    out: 'office-wide.webp',
    desc: 'Рабочее пространство офиса digital-агентства AXIO в Екатеринбурге',
    w: 1600,
    h: 900, // 16:9 landscape — «Где мы работаем» section, paired with building
    position: 'centre',
  },
];

let n = 0;
for (const j of jobs) {
  if (!existsSync(j.file)) {
    console.warn(`SKIP ${j.out}: source not found — ${j.file}`);
    continue;
  }
  const pipeline = sharp(j.file)
    .rotate() // honour EXIF orientation before stripping
    .resize(j.w, j.h, { fit: 'cover', position: j.position })
    .sharpen({ sigma: 0.5 });

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
    /* older sharp strips metadata by default */
  }

  await pipeline.webp({ quality: 82, effort: 5 }).toFile(resolve(OUT, j.out));
  n++;
  console.log(`✓ ${j.out}`);
}
console.log(`\nProcessed ${n}/${jobs.length} about images → public/images/about/`);
