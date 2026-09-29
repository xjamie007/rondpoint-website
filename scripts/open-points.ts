/**
 * Listet alle sichtbaren Platzhalter [FEHLT …] / [UNBESTÄTIGT …] im gebauten dist/
 * je Seite. Hilft, OFFENE-PUNKTE.md aktuell zu halten.
 *   npm run build && npm run open-points [-- fr]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const only = process.argv[2];

function* walk(dir: string): Generator<string> {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

const byPoint = new Map<string, Set<string>>();
for (const file of walk(dist)) {
  const rel = '/' + relative(dist, file).replace(/index\.html$/, '');
  if (only && !rel.startsWith(`/${only}/`)) continue;
  const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  for (const m of html.matchAll(/\[(FEHLT|UNBESTÄTIGT)[^\]<]*\]/g)) {
    const key = m[0].replace(/\s+/g, ' ');
    if (!byPoint.has(key)) byPoint.set(key, new Set());
    byPoint.get(key)!.add(rel);
  }
}
const sorted = [...byPoint.entries()].sort((a, b) => b[1].size - a[1].size);
for (const [point, pages] of sorted) {
  const list = [...pages].sort();
  console.log(`${point}\n    ${list.length} Seite(n): ${list.slice(0, 6).join(', ')}${list.length > 6 ? ', …' : ''}`);
}
console.log(`\n${sorted.length} verschiedene offene Punkte.`);
