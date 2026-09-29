/**
 * Holt frische Fixtures für die Parser-Tests (T2.11), wenn LuxAuto oder AutoScout24
 * das Layout ändern. Höflich wie der Abgleich (robots.txt, 2 s Abstand, eigener User-Agent).
 *
 *   npm run fixtures                         # Standard: Referenzinserat 1930044 + Garage
 *   npm run fixtures -- 1930044 1931062      # bestimmte LuxAuto-IDs
 *
 * Danach: npx vitest run  – schlagen Parser-Tests fehl, den Parser anpassen, nie die Erwartung
 * aus den Tests an einen kaputten Parser angleichen.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { PoliteClient } from './http.ts';
import { LUXAUTO_GARAGE_URL, LUXAUTO_ORIGIN, parseGaragePage } from './sources/luxauto.ts';
import { AS24_DEALER_URL, AS24_ORIGIN, parseDealerPage } from './sources/autoscout24.ts';

const dir = (f: string) => fileURLToPath(new URL(`../../tests/fixtures/${f}`, import.meta.url));
const ids = process.argv.slice(2).filter((a) => /^\d+$/.test(a));
const wanted = ids.length ? ids : ['1930044'];

const client = new PoliteClient({ log: console.log, maxRequests: 30 });
await client.loadRobots(LUXAUTO_ORIGIN);
const garage = await client.getText(LUXAUTO_GARAGE_URL);
writeFileSync(dir('luxauto-garage.html'), garage.body);
const page = parseGaragePage(garage.body);
console.log(`Garage: ${page.listingUrls.length} Inserate`);
for (const id of wanted) {
  const url = page.listingUrls.find((u) => u.endsWith(`-${id}`));
  if (!url) {
    console.warn(`Inserat ${id} steht nicht mehr auf der Garagenseite – Fixture bleibt, wie es ist`);
    continue;
  }
  const res = await client.getText(url);
  writeFileSync(dir(`luxauto-detail-${id}.html`), res.body);
  console.log(`LuxAuto ${id}: ${res.body.length} Bytes`);
}

await client.loadRobots(AS24_ORIGIN);
const dealer = await client.getText(AS24_DEALER_URL);
writeFileSync(dir('autoscout-dealer.html'), dealer.body);
console.log(`AutoScout24: ${parseDealerPage(dealer.body).listings.length} Inserate`);
console.log(`${client.requestCount} Anfragen.`);
