import type { APIRoute } from 'astro';
import { withBase } from '@/i18n/config';
import { SITE_ORIGIN } from '@/lib/jsonld';
import { presentation } from '@/lib/site';

// Die Präsentationsversion (Stockfotos, Beispiele) soll nicht in Suchmaschinen auftauchen.
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      presentation ? 'Disallow: /' : 'Allow: /',
      '',
      `Sitemap: ${new URL(withBase('/sitemap.xml'), SITE_ORIGIN).toString()}`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
