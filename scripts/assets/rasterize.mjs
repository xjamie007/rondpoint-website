// Wandelt die SVGs aus build-assets.py in PNG/ICO um (sharp).
import sharp from 'sharp';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = new URL('./out/', import.meta.url);
const pub = new URL('../../public/', import.meta.url);
mkdirSync(new URL('og/', pub), { recursive: true });

await sharp(fileURLToPath(new URL('og.svg', out))).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL('og/rondpoint.png', pub)));
await sharp(fileURLToPath(new URL('favicon.svg', out)), { density: 300 }).resize(180, 180).png().toFile(fileURLToPath(new URL('apple-touch-icon.png', pub)));

// favicon.ico mit einem 32×32-PNG (ICO-Container mit PNG-Inhalt)
const png32 = await sharp(fileURLToPath(new URL('favicon.svg', out)), { density: 300 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt8(0, 8);
header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(new URL('favicon.ico', pub), Buffer.concat([header, png32]));
console.log('public/og/rondpoint.png, apple-touch-icon.png, favicon.ico geschrieben');
