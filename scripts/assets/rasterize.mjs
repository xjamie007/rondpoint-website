// Wandelt das Open-Graph-SVG aus build-assets.py in PNG um (sharp).
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = new URL('./out/', import.meta.url);
const pub = new URL('../../public/', import.meta.url);
mkdirSync(new URL('og/', pub), { recursive: true });

await sharp(fileURLToPath(new URL('og.svg', out))).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL('og/rondpoint.png', pub)));
// Favicons und Apple-Touch-Icon kommen seit dem neuen Logo aus scripts/assets/favicons.mjs
console.log('public/og/rondpoint.png geschrieben');
