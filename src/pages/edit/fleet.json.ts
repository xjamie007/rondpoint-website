/**
 * Mietflotte für den Admin-Bereich auf der Seite (src/edit/fleet.ts), beim Build erzeugt:
 * Rohdaten aller Fahrzeuge in allen Sprachen, kleine Vorschau des Fotos und ob das Fahrzeug
 * auf der Website erscheint. Wird nur nach dem Login geladen; enthält nichts, was nicht
 * ohnehin auf der Website steht.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';
import { hiddenReason } from '@/lib/fleet';
import { showSamples } from '@/lib/fleet.server';
import { fleetPhoto } from '@/lib/photos';

export const GET: APIRoute = async () => {
  const entries = [];
  for (const e of await getCollection('flotte')) {
    const ph = fleetPhoto(e.data.photo);
    const thumb = ph ? (await getImage({ src: ph.img, width: 320, format: 'webp' })).src : null;
    entries.push({ id: e.id.split('/').pop()!, path: e.filePath ?? `src/content/flotte/${e.id}.json`, data: e.data, thumb, hidden: hiddenReason(e.data, showSamples) });
  }
  return new Response(JSON.stringify({ showSamples, entries }), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
