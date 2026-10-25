/**
 * Draufsicht der Ladefläche (C5), im Build gerendert und in der Island wiederverwendet.
 * Alle Anhänger im selben Maßstab: 40 px/m mobil, 56 px/m ab 1024 px; ist der längste
 * zu lang für die Spalte, skalieren alle gemeinsam (CSS: --m / --maxm).
 * Nichts erfinden: ohne Maße keine Zeichnung.
 */
import { packPallets, type Rect } from '../../lib/pallets.ts';
import { placeVehicles, type VehicleKind } from '../../lib/vehicles.ts';

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
  /** Motorräder bzw. Autos auf der Ladefläche (Motorrad- und Autoanhänger) */
  vehicles?: { kind: VehicleKind; count: number; capacity: number } | null;
}

const FILL = '#AEB2B5';

/** Motorrad von oben, Vorderrad Richtung Deichsel (links); b = Platz in px */
function Moto({ b, delay }: { b: Rect; delay: string }) {
  const X = (t: number) => b.x + t * b.w;
  const Y = (t: number) => b.y + t * b.h;
  const wheel = (x0: number, x1: number, half: number) => (
    <rect x={X(x0)} y={Y(0.5 - half)} width={X(x1) - X(x0)} height={Y(0.5 + half) - Y(0.5 - half)} rx={1.5} fill="#000" />
  );
  return (
    <g className="pallet" style={{ ['--d' as string]: delay }}>
      {wheel(0, 0.25, 0.11)}
      {wheel(0.73, 1, 0.13)}
      {/* Tank und Sitzbank */}
      <rect x={X(0.2)} y={Y(0.3)} width={X(0.8) - X(0.2)} height={Y(0.7) - Y(0.3)} rx={(Y(0.7) - Y(0.3)) / 2} fill={FILL} stroke="#000" strokeWidth="1.2" />
      <rect x={X(0.47)} y={Y(0.37)} width={X(0.76) - X(0.47)} height={Y(0.63) - Y(0.37)} rx={2} fill="#4b4e52" />
      {/* Lenker mit Griffen */}
      <line x1={X(0.24)} y1={Y(0.04)} x2={X(0.24)} y2={Y(0.96)} stroke="#000" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
}

/** Auto von oben, Front Richtung Deichsel (links) */
function Car({ b, delay }: { b: Rect; delay: string }) {
  const X = (t: number) => b.x + t * b.w;
  const Y = (t: number) => b.y + t * b.h;
  const tyre = (x0: number, y0: number) => <rect x={X(x0)} y={Y(y0)} width={X(x0 + 0.13) - X(x0)} height={Y(y0 + 0.08) - Y(y0)} rx={1.5} fill="#000" />;
  return (
    <g className="pallet" style={{ ['--d' as string]: delay }}>
      {tyre(0.12, -0.02)}
      {tyre(0.12, 0.94)}
      {tyre(0.73, -0.02)}
      {tyre(0.73, 0.94)}
      <rect x={X(0)} y={Y(0.04)} width={b.w} height={Y(0.96) - Y(0.04)} rx={Math.min(b.h, b.w) * 0.22} fill={FILL} stroke="#000" strokeWidth="1.5" />
      {/* Windschutzscheibe, Dach, Heckscheibe */}
      <path d={`M${X(0.27)} ${Y(0.17)} L${X(0.37)} ${Y(0.22)} L${X(0.37)} ${Y(0.78)} L${X(0.27)} ${Y(0.83)} Z`} fill="#4b4e52" />
      <rect x={X(0.39)} y={Y(0.2)} width={X(0.74) - X(0.39)} height={Y(0.8) - Y(0.2)} rx={3} fill="#c9ccce" stroke="#000" strokeWidth="1" />
      <path d={`M${X(0.76)} ${Y(0.22)} L${X(0.84)} ${Y(0.18)} L${X(0.84)} ${Y(0.82)} L${X(0.76)} ${Y(0.78)} Z`} fill="#4b4e52" />
    </g>
  );
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
  const pallets = p.showPallets && !p.vehicles ? packPallets(p.lengthM, p.widthM).rects : [];
  const vehicles = p.vehicles ? placeVehicles(p.vehicles.kind, p.lengthM, p.widthM, p.vehicles.count, p.vehicles.capacity) : [];
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
      {vehicles.map((r, i) => {
        const b = { x: x0 + r.x * u, y: y0 + r.y * u, w: r.w * u, h: r.h * u };
        const delay = `${i * 90}ms`;
        return p.vehicles!.kind === 'moto' ? <Moto key={i} b={b} delay={delay} /> : <Car key={i} b={b} delay={delay} />;
      })}
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
