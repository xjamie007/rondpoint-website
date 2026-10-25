// Favicons aus dem Kreisel-„O“ des Logos (src/assets/brand/logo.svg, Gruppe .logo-o), Okt. 2026.
// Weißer runder Hintergrund, damit das schwarze Zentrum auch auf dunklen Tabs und in der
// Google-Suche sichtbar bleibt. Google verlangt ein Vielfaches von 48 px (favicon-48/-96).
//
//   node scripts/assets/favicons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../../', import.meta.url);
const logo = readFileSync(new URL('src/assets/brand/logo.svg', root), 'utf8');
const start = logo.indexOf('<g class="logo-o">');
const group = logo.slice(start, logo.indexOf('</g>', start) + 4).replace(' class="logo-o"', '');

// Ausdehnung des „O“ im Logo: x 38.6–93.6, y 46.1–97.3 → Mitte (66.1, 71.7)
const side = 70;
const [cx, cy] = [66.1, 71.7];
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${cx - side / 2} ${cy - side / 2} ${side} ${side}">`
  + `<circle cx="${cx}" cy="${cy}" r="${side / 2}" fill="#fff"/>${group}</svg>\n`;
// Apple: volle Fläche ohne Transparenz (iOS rundet selbst ab)
const svgSquare = svg.replace(/<circle[^>]*\/>/, `<rect x="${cx - side / 2}" y="${cy - side / 2}" width="${side}" height="${side}" fill="#fff"/>`);

const pub = (f) => new URL(`public/${f}`, root);
writeFileSync(pub('favicon.svg'), svg);
const png = (s, size) => sharp(Buffer.from(s), { density: 600 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

for (const [file, size] of [['favicon-48.png', 48], ['favicon-96.png', 96], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  writeFileSync(pub(file), await png(svg, size));
}
writeFileSync(pub('apple-touch-icon.png'), await png(svgSquare, 180));

// favicon.ico mit 16, 32 und 48 px (ICO-Container mit PNG-Inhalt)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(svg, s)));
const head = Buffer.alloc(6 + 16 * sizes.length);
head.writeUInt16LE(0, 0);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let offset = head.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  head.writeUInt8(s, e);
  head.writeUInt8(s, e + 1);
  head.writeUInt16LE(1, e + 4);
  head.writeUInt16LE(32, e + 6);
  head.writeUInt32LE(images[i].length, e + 8);
  head.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync(pub('favicon.ico'), Buffer.concat([head, ...images]));
console.log('Favicons geschrieben: favicon.svg, favicon.ico (16/32/48), favicon-48/-96, icon-192/-512, apple-touch-icon');

// Logo als PNG für Google (strukturierte Daten → logo), weißer Hintergrund, 816 px breit
await sharp(Buffer.from(logo), { density: 600 }).resize(816).flatten({ background: '#ffffff' }).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL('public/logo.png', root)));

console.log('logo.png geschrieben');
