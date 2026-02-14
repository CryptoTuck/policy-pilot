import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const WIDTH = 1200;
const HEIGHT = 630;
const LOGO_SIZE = 220;

async function main() {
  // Create gradient background
  const gradientSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#0369a1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" />
    </svg>
  `;
  const background = sharp(Buffer.from(gradientSvg)).png();

  // Resize logo with rounded corners
  const logoRaw = await sharp(path.join(publicDir, 'policypilot-logo.jpg'))
    .resize(LOGO_SIZE, LOGO_SIZE)
    .png()
    .toBuffer();

  const roundedMask = Buffer.from(`
    <svg width="${LOGO_SIZE}" height="${LOGO_SIZE}">
      <rect x="0" y="0" width="${LOGO_SIZE}" height="${LOGO_SIZE}" rx="36" ry="36" fill="white"/>
    </svg>
  `);

  const logo = await sharp(logoRaw)
    .composite([{ input: await sharp(roundedMask).png().toBuffer(), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Add subtle shadow behind logo
  const shadowSvg = Buffer.from(`
    <svg width="${LOGO_SIZE + 20}" height="${LOGO_SIZE + 20}">
      <rect x="10" y="10" width="${LOGO_SIZE}" height="${LOGO_SIZE}" rx="36" ry="36" fill="rgba(0,0,0,0.25)"/>
    </svg>
  `);
  const shadow = await sharp(shadowSvg).png().toBuffer();

  // Text overlay
  const textSvg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}">
      <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 150}" text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="52" font-weight="700" fill="white">
        PolicyPilot
      </text>
      <text x="${WIDTH / 2}" y="${HEIGHT / 2 + 200}" text-anchor="middle"
        font-family="system-ui, -apple-system, 'Segoe UI', sans-serif" font-size="26" fill="#bae6fd" font-weight="400">
        Your insurance policy, scored by AI.
      </text>
    </svg>
  `);

  const logoLeft = Math.round((WIDTH - LOGO_SIZE) / 2);
  const logoTop = Math.round((HEIGHT - LOGO_SIZE) / 2 - 80);

  const result = await background
    .composite([
      { input: shadow, left: logoLeft - 10, top: logoTop - 2, blend: 'over' },
      { input: logo, left: logoLeft, top: logoTop, blend: 'over' },
      { input: await sharp(textSvg).png().toBuffer(), left: 0, top: 0, blend: 'over' },
    ])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));

  console.log('OG image generated:', result);
}

main().catch(console.error);
