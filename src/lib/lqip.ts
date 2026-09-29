/**
 * Unscharfe Mini-Vorschau (LQIP) eines Fotos: 24 px breit, WebP, als data-URL.
 * Wird beim Build berechnet und inline ausgeliefert, damit statt einer grauen
 * Fläche sofort ein Farbeindruck des Fotos erscheint, bis das echte Bild geladen ist.
 */
import sharp from 'sharp';
import path from 'node:path';

const cache = new Map<string, Promise<string>>();

/** file: Pfad ab Projektwurzel, z. B. /src/assets/demo/bodywork.jpg */
export function lqip(file: string): Promise<string> {
  let p = cache.get(file);
  if (!p) {
    p = sharp(path.join(process.cwd(), file))
      .resize(24)
      .webp({ quality: 45 })
      .toBuffer()
      .then((b) => `data:image/webp;base64,${b.toString('base64')}`)
      .catch(() => '');
    cache.set(file, p);
  }
  return p;
}
