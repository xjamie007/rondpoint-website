/** Fotos der Flotte für die Finder-Island: im Build als WebP in mehreren Breiten vorbereiten. */
import { getImage } from 'astro:assets';
import type { FleetView } from './fleet-view.ts';
import { fleetPhoto } from './photos.ts';

export async function withPhotos(items: FleetView[]): Promise<FleetView[]> {
  return Promise.all(
    items.map(async (i) => {
      const ph = fleetPhoto(i.photo);
      if (!ph) return i;
      const widths = [360, 560, 800].filter((w) => w <= ph.img.width);
      const img = await getImage({ src: ph.img, widths, format: 'webp' });
      return {
        ...i,
        display: {
          ...i.display,
          photo: { src: img.src, srcset: img.srcSet.attribute, width: ph.img.width, height: ph.img.height, contain: ph.contain },
        },
      };
    }),
  );
}
