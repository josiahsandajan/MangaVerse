import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const OUTPUT_DIR = path.resolve(process.cwd(), 'src/assets/dithered');

const SOURCE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="280" viewBox="0 0 480 280">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#635BDB" />
      <stop offset="55%" stop-color="#3974C6" />
      <stop offset="100%" stop-color="#171923" />
    </linearGradient>
    <radialGradient id="sun" cx="72%" cy="28%" r="36%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="55%" stop-color="#C7C4F8" />
      <stop offset="100%" stop-color="#635BDB" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="480" height="280" fill="url(#sky)" />
  <circle cx="345" cy="82" r="95" fill="url(#sun)" />
  <path d="M0 195 Q 95 140, 195 180 T 390 165 L 480 185 L 480 280 L 0 280 Z" fill="#232842" opacity="0.88" />
  <path d="M0 220 Q 130 175, 250 212 T 480 205 L 480 280 L 0 280 Z" fill="#171923" />
  <circle cx="118" cy="76" r="24" fill="#FFFFFF" opacity="0.85" />
</svg>
`;

const AMBIENT_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#635BDB" />
      <stop offset="50%" stop-color="#3974C6" />
      <stop offset="100%" stop-color="#16845B" />
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#bg)" />
  <circle cx="140" cy="110" r="130" fill="#9B95F7" opacity="0.55" />
  <circle cx="510" cy="240" r="160" fill="#171923" opacity="0.45" />
  <circle cx="360" cy="90" r="90" fill="#F7F8FC" opacity="0.3" />
</svg>
`;

// Floyd-Steinberg error diffusion dithering into a duotone palette
function floydSteinbergDuotone(raw, width, height, darkRgb, lightRgb) {
  const lum = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const idx = i * 4;
    lum[i] =
      0.299 * raw[idx] + 0.587 * raw[idx + 1] + 0.114 * raw[idx + 2];
  }

  const out = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      const oldVal = lum[i];
      const newVal = oldVal < 128 ? 0 : 255;
      const err = oldVal - newVal;

      const rgb = newVal === 0 ? darkRgb : lightRgb;
      const outIdx = i * 4;
      out[outIdx] = rgb[0];
      out[outIdx + 1] = rgb[1];
      out[outIdx + 2] = rgb[2];
      out[outIdx + 3] = 255;

      if (x + 1 < width) lum[i + 1] += (err * 7) / 16;
      if (y + 1 < height) {
        if (x > 0) lum[i + width - 1] += (err * 3) / 16;
        lum[i + width] += (err * 5) / 16;
        if (x + 1 < width) lum[i + width + 1] += (err * 1) / 16;
      }
    }
  }

  return out;
}

async function generate() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const width = 320;
  const height = 186;

  // 1. Original source promotional artwork
  await sharp(Buffer.from(SOURCE_SVG))
    .resize(width, height)
    .png()
    .toFile(path.join(OUTPUT_DIR, 'promo-horizon-source.png'));

  const { data: rawPixels } = await sharp(Buffer.from(SOURCE_SVG))
    .resize(width, height)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 2. Light-theme dithered asset (deep ink #171923 + soft paper #F7F8FC)
  const lightBuffer = floydSteinbergDuotone(
    rawPixels,
    width,
    height,
    [23, 25, 35],
    [247, 248, 252]
  );
  await sharp(lightBuffer, { raw: { width, height, channels: 4 } })
    .png({ palette: true, colours: 4 })
    .toFile(path.join(OUTPUT_DIR, 'promo-horizon-light.png'));

  // 3. Dark-theme dithered asset (surface #161923 + accent-tinted #9B95F7)
  const darkBuffer = floydSteinbergDuotone(
    rawPixels,
    width,
    height,
    [22, 25, 35],
    [155, 149, 247]
  );
  await sharp(darkBuffer, { raw: { width, height, channels: 4 } })
    .png({ palette: true, colours: 4 })
    .toFile(path.join(OUTPUT_DIR, 'promo-horizon-dark.png'));

  // 4. Atmospheric ambient backdrop for blurred-photo treatment
  await sharp(Buffer.from(AMBIENT_SVG))
    .resize(640, 360)
    .png({ quality: 85 })
    .toFile(path.join(OUTPUT_DIR, 'ambient-backdrop.png'));

  console.log('Generated dithered & ambient assets in', OUTPUT_DIR);
}

generate().catch((err) => {
  console.error('Failed to generate dithered assets:', err);
  process.exit(1);
});
