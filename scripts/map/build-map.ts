/**
 * Erzeugt die Kreisel-Zeichnung aus OpenStreetMap-Daten (© OpenStreetMap-Mitwirkende, ODbL).
 *
 *   node --experimental-strip-types scripts/map/build-map.ts           # aus osm-raw.json
 *   node --experimental-strip-types scripts/map/build-map.ts --fetch   # vorher neu von Overpass holen
 *
 * Ausgabe: src/data/map.json – projizierte, vereinfachte Pfade in Metern um die Garage.
 * Die Website lädt keine Karte von außen; die Zeichnung ist ein Inline-SVG.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = (p: string) => fileURLToPath(new URL(p, import.meta.url));
const OUT = fileURLToPath(new URL('../../src/data/map.json', import.meta.url));

const LAT0 = 49.8506756;
const LON0 = 6.11385;
/** Ausschnitt in Metern relativ zur Garage (x nach Osten, y nach Süden) */
const VIEW = { x: -250, y: -230, w: 500, h: 360 };

interface OsmEl {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
  geometry?: { lat: number; lon: number }[];
}

type Pt = [number, number];

function project(lat: number, lon: number): Pt {
  const x = (lon - LON0) * Math.cos((LAT0 * Math.PI) / 180) * 111_320;
  const y = -(lat - LAT0) * 110_574;
  return [x, y];
}

function perpDist(p: Pt, a: Pt, b: Pt): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / len;
}

function simplify(pts: Pt[], tol = 0.8): Pt[] {
  if (pts.length < 3) return pts;
  let idx = 0;
  let max = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = perpDist(pts[i], pts[0], pts[pts.length - 1]);
    if (d > max) {
      max = d;
      idx = i;
    }
  }
  if (max <= tol) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function toD(pts: Pt[], closed = false): string {
  return (
    pts.map((p, i) => `${i ? 'L' : 'M'}${r1(p[0] - VIEW.x)} ${r1(p[1] - VIEW.y)}`).join('') + (closed ? 'Z' : '')
  );
}

function inView(pts: Pt[], margin = 60): boolean {
  return pts.some(
    ([x, y]) =>
      x >= VIEW.x - margin && x <= VIEW.x + VIEW.w + margin && y >= VIEW.y - margin && y <= VIEW.y + VIEW.h + margin,
  );
}

async function main() {
  if (process.argv.includes('--fetch')) {
    const q = readFileSync(here('./query.overpass'), 'utf8');
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'User-Agent': 'RondPointWebsite/1.0 (+https://www.rondpoint.lu/fr/contact/)' },
      body: new URLSearchParams({ data: q }),
    });
    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    writeFileSync(here('./osm-raw.json'), await res.text());
  }
  const osm = JSON.parse(readFileSync(here('./osm-raw.json'), 'utf8')) as { elements: OsmEl[] };

  const roads: { cls: string; d: string }[] = [];
  const rail: string[] = [];
  const river: string[] = [];
  let roundabout = '';
  const roundaboutPts: Pt[] = [];
  let garage = '';
  let garageCenter: Pt = [0, 0];
  let aral: Pt | null = null;

  for (const el of osm.elements) {
    const t = el.tags ?? {};
    if (el.type === 'node' && t.amenity === 'fuel' && /aral/i.test(t.brand ?? t.name ?? '')) {
      aral = project(el.lat!, el.lon!);
      continue;
    }
    if (el.type !== 'way' || !el.geometry) continue;
    const pts = el.geometry.map((g) => project(g.lat, g.lon));
    if (!inView(pts)) continue;
    if (t.junction === 'roundabout') {
      roundaboutPts.push(...pts);
      continue;
    }
    if (t.building && /rond\s*point/i.test(t.name ?? '')) {
      garage = toD(pts.slice(0, -1), true);
      const xs = pts.map((p) => p[0]);
      const ys = pts.map((p) => p[1]);
      garageCenter = [(Math.min(...xs) + Math.max(...xs)) / 2, (Math.min(...ys) + Math.max(...ys)) / 2];
      continue;
    }
    if (t.railway === 'rail') {
      rail.push(toD(simplify(pts)));
      continue;
    }
    if (t.waterway === 'river') {
      river.push(toD(simplify(pts, 1.5)));
      continue;
    }
    if (t.highway) {
      const cls = /^(primary|trunk|motorway)/.test(t.highway)
        ? 'major'
        : /^secondary/.test(t.highway)
          ? 'secondary'
          : t.highway === 'service'
            ? 'service'
            : 'minor';
      roads.push({ cls, d: toD(simplify(pts)) });
    }
  }

  // Kreisel als Kreis: Mittelpunkt und mittlerer Radius der Ringpunkte
  if (roundaboutPts.length) {
    const cx = roundaboutPts.reduce((s, p) => s + p[0], 0) / roundaboutPts.length;
    const cy = roundaboutPts.reduce((s, p) => s + p[1], 0) / roundaboutPts.length;
    const r = roundaboutPts.reduce((s, p) => s + Math.hypot(p[0] - cx, p[1] - cy), 0) / roundaboutPts.length;
    roundabout = JSON.stringify({ cx: r1(cx - VIEW.x), cy: r1(cy - VIEW.y), r: r1(r) });
  }

  const out = {
    $comment:
      'Erzeugt von scripts/map/build-map.ts aus OpenStreetMap-Daten (© OpenStreetMap-Mitwirkende, ODbL). Nicht von Hand bearbeiten.',
    width: VIEW.w,
    height: VIEW.h,
    roads,
    rail,
    river,
    roundabout: roundabout ? JSON.parse(roundabout) : null,
    garage,
    garageCenter: [r1(garageCenter[0] - VIEW.x), r1(garageCenter[1] - VIEW.y)],
    aral: aral ? [r1(aral[0] - VIEW.x), r1(aral[1] - VIEW.y)] : null,
  };
  writeFileSync(OUT, JSON.stringify(out) + '\n');
  console.log(`map.json: ${roads.length} Straßen, ${rail.length} Gleise, ${river.length} Flussabschnitte`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
