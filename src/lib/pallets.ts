/**
 * Europaletten (1,20 × 0,80 m) auf einer Ladefläche: dichteste Packung aus
 * zwei Blöcken mit beiden Ausrichtungen, geteilt entlang der Länge oder der Breite.
 * Liefert Anzahl und Rechtecke (in Metern) für die Zeichnung.
 */
export const PALLET = { l: 1.2, w: 0.8 } as const;

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const EPS = 1e-9;
const fit = (space: number, size: number) => Math.max(0, Math.floor((space + EPS) / size));

function grid(x0: number, y0: number, lenSpace: number, widSpace: number, pl: number, pw: number): Rect[] {
  const nx = fit(lenSpace, pl);
  const ny = fit(widSpace, pw);
  const out: Rect[] = [];
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) out.push({ x: x0 + i * pl, y: y0 + j * pw, w: pl, h: pw });
  return out;
}

/**
 * @param length Länge der Ladefläche in Fahrtrichtung (m)
 * @param width Breite der Ladefläche (m)
 */
export function packPallets(length: number, width: number): { count: number; rects: Rect[] } {
  let best: Rect[] = [];
  const consider = (r: Rect[]) => {
    if (r.length > best.length) best = r;
  };
  const { l: A, w: B } = PALLET;
  // Teilung entlang der Länge: vorn Block 1, dahinter Block 2
  for (const [p1l, p1w, p2l, p2w] of [
    [A, B, B, A],
    [B, A, A, B],
  ]) {
    for (let k = 0; k * p1l <= length + EPS; k++) {
      const a = k * p1l;
      consider([...grid(0, 0, a, width, p1l, p1w), ...grid(a, 0, length - a, width, p2l, p2w)]);
    }
    // Teilung entlang der Breite
    for (let k = 0; k * p1w <= width + EPS; k++) {
      const b = k * p1w;
      consider([...grid(0, 0, length, b, p1l, p1w), ...grid(0, b, length, width - b, p2l, p2w)]);
    }
  }
  return { count: best.length, rects: best };
}
