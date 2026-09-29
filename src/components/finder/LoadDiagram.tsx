/**
 * Draufsicht der Ladefläche (C5), im Build gerendert und in der Island wiederverwendet.
 * Alle Anhänger im selben Maßstab: 40 px/m mobil, 56 px/m ab 1024 px; ist der längste
 * zu lang für die Spalte, skalieren alle gemeinsam (CSS: --m / --maxm).
 * Nichts erfinden: ohne Maße keine Zeichnung.
 */
import { packPallets } from '../../lib/pallets.ts';

export const PX_PER_M = 40;
const DRAWBAR_M = 0.9;
const LABEL_RIGHT_M = 1.05;
const LABEL_BOTTOM_M = 0.5;
const PAD_M = 0.1;

export interface LoadDiagramProps {
  lengthM: number;
  widthM: number;
  showPallets: boolean;
  /** längste Gesamtlänge (m) aller gezeigten Zeichnungen, für den gemeinsamen Maßstab */
  maxTotalM: number;
  lengthLabel: string;
  widthLabel: string;
  ariaLabel: string;
  animate?: boolean;
}

export function diagramTotalM(lengthM: number): number {
  return DRAWBAR_M + lengthM + LABEL_RIGHT_M + PAD_M;
}

export function LoadDiagram(p: LoadDiagramProps) {
  const u = PX_PER_M;
  const total = diagramTotalM(p.lengthM);
  const W = total * u;
  const H = (p.widthM + LABEL_BOTTOM_M + PAD_M * 2) * u;
  const x0 = (DRAWBAR_M + PAD_M) * u;
  const y0 = PAD_M * u;
  const L = p.lengthM * u;
  const B = p.widthM * u;
  const pallets = p.showPallets ? packPallets(p.lengthM, p.widthM).rects : [];
  const cy = y0 + B / 2;
  const tip = PAD_M * u + 0.12 * u;
  const n = pallets.length;
  const step = n > 1 ? Math.min(50, 250 / (n - 1)) : 0;

  return (
    <svg
      className={`load-svg${p.animate ? ' load-in' : ''}`}
      viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`}
      role="img"
      aria-label={p.ariaLabel}
      style={{ ['--m' as string]: total.toFixed(3), ['--maxm' as string]: p.maxTotalM.toFixed(3) }}
    >
      {/* Deichsel: Dreieck mit Kupplungskreis */}
      <path
        d={`M${x0} ${y0 + B * 0.18} L${tip + 0.1 * u} ${cy} L${x0} ${y0 + B * 0.82}`}
        fill="none"
        stroke="#000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx={tip} cy={cy} r={0.1 * u} fill="#fff" stroke="#000" strokeWidth="2" />
      {/* Ladefläche */}
      <rect x={x0} y={y0} width={L} height={B} fill="#fff" stroke="#000" strokeWidth="2" />
      {pallets.map((r, i) => (
        <rect
          key={i}
          className="pallet"
          style={{ ['--d' as string]: `${Math.round(i * step)}ms` }}
          x={x0 + r.x * u + 1.5}
          y={y0 + r.y * u + 1.5}
          width={r.w * u - 3}
          height={r.h * u - 3}
          fill="#AEB2B5"
          stroke="#000"
          strokeWidth="1"
        />
      ))}
      {/* Maße an zwei Seiten */}
      <text x={x0 + L / 2} y={y0 + B + 0.36 * u} textAnchor="middle" className="dim">
        {p.lengthLabel}
      </text>
      <text x={x0 + L + 0.12 * u} y={cy} dominantBaseline="middle" className="dim">
        {p.widthLabel}
      </text>
    </svg>
  );
}
