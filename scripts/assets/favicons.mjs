// Favicons aus dem Rad im „O“ von POINT (src/assets/brand/logo.svg): schwarzer Reifen, orange
// Bremsscheibe und Bremssattel. Weißer runder Hintergrund, damit es auch auf dunklen Tabs und in
// der Google-Suche gut aussieht. Google verlangt ein Vielfaches von 48 px (favicon-48/-96).
//
//   node scripts/assets/favicons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../../', import.meta.url);
const logo = readFileSync(new URL('src/assets/brand/logo.svg', root), 'utf8');

// Pfade des Rads: alle Formen im Bereich des zweiten „O“ (x 240–305, oberhalb von „GARAGE - CARROSSERIE“)
const box = (d) => {
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number);
  const xs = n.filter((_, k) => k % 2 === 0);
  const ys = n.filter((_, k) => k % 2 === 1);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
};
const group = [...logo.matchAll(/<path fill="[^"]+" d="([^"]+)"\/>/g)]
  .filter((m) => { const [x0, , x1, y1] = box(m[1]); return x0 > 240 && x1 < 305 && y1 < 105; })
  .map((m) => m[0])
  .join('');

// Mitte von Reifen und Bremssattel zusammen (x 242.9–301.9, y 39.3–98.3), etwas Rand rundherum
const side = 68;
const [cx, cy] = [272.4, 68.8];
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
