/**
 * sitemap.xml (G3): alle Seiten in fünf Sprachen mit hreflang-Alternativen.
 * Nur aktive Autos, lastmod aus dem Abgleich. Danke-Seite (noindex) fehlt bewusst.
 */
import type { APIRoute } from 'astro';
import { HREFLANG, LANGS, PAGE_SLUGS, RENTAL_CATEGORY_KEYS, alternates, pathFor, type PageKey, type Route } from '@/i18n/config';
import { activeCars } from '@/lib/stock';
import { getFleet } from '@/lib/fleet.server';
import { SITE_ORIGIN } from '@/lib/jsonld';

export const GET: APIRoute = async () => {
  const fleet = await getFleet('fr');
  const routes: { route: Route; lastmod?: string }[] = (Object.keys(PAGE_SLUGS) as PageKey[])
    .filter((p) => p !== 'thanks')
    .map((page) => ({ route: { page } }));
  for (const category of RENTAL_CATEGORY_KEYS) {
    if (fleet.some((i) => i.category === category)) routes.push({ route: { page: 'rentalCategory', category } });
  }
  for (const v of activeCars) routes.push({ route: { page: 'car', slug: v.slug }, lastmod: v.lastChanged });

  const abs = (p: string) => new URL(p, SITE_ORIGIN).toString();
  const urls = routes.flatMap(({ route, lastmod }) => {
    const alts = alternates(route);
    const links = [
      ...alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[a.lang]}" href="${abs(a.href)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(pathFor('fr', route))}"/>`,
    ].join('\n');
    return LANGS.map(
      (lang) =>
        `  <url>\n    <loc>${abs(pathFor(lang, route))}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}${links}\n  </url>`,
    );
  });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
