/**
 * Führerscheinlogik für Anhänger (C5). Reine Funktionen, von Build und
 * React-Island gemeinsam benutzt. Quelle: transports.public.lu, police.public.lu.
 * Vor Livegang erneut prüfen (siehe OFFENE-PUNKTE.md).
 *
 *  - Anhänger bis 750 kg zulässige Gesamtmasse: B
 *  - sonst mit bekannter F.2 des Autos: F.2 + Anhänger ≤ 3 500 kg → B,
 *    ≤ 4 250 kg → B96, sonst BE
 *  - BE gilt bis zu einem Anhänger von 3 500 kg; schwerere werden ausgeblendet
 *  - ohne F.2: „dépend"
 */
export type Licence = 'B' | 'B96' | 'BE';
export type VisitorLicence = Licence | 'unknown';

export const LICENCE_RANK: Record<Licence, number> = { B: 0, B96: 1, BE: 2 };

export const LIMITS = {
  lightTrailerKg: 750,
  combinationBKg: 3500,
  combinationB96Kg: 4250,
  trailerBEKg: 3500,
  vanBKg: 3500,
} as const;

export type Required = { kind: 'licence'; licence: Licence } | { kind: 'depends' } | { kind: 'exceeds' };

export interface CarData {
  /** F.2: zulässige Gesamtmasse des Zugfahrzeugs */
  f2?: number | null;
  /** O.1: Anhängelast gebremst */
  o1?: number | null;
  /** O.2: Anhängelast ungebremst */
  o2?: number | null;
}

const known = (n: number | null | undefined): n is number => typeof n === 'number' && Number.isFinite(n) && n > 0;

export function requiredLicence(trailerMmaKg: number, f2?: number | null): Required {
  if (trailerMmaKg > LIMITS.trailerBEKg) return { kind: 'exceeds' };
  if (trailerMmaKg <= LIMITS.lightTrailerKg) return { kind: 'licence', licence: 'B' };
  if (!known(f2)) return { kind: 'depends' };
  const sum = f2 + trailerMmaKg;
  if (sum <= LIMITS.combinationBKg) return { kind: 'licence', licence: 'B' };
  if (sum <= LIMITS.combinationB96Kg) return { kind: 'licence', licence: 'B96' };
  return { kind: 'licence', licence: 'BE' };
}

export type Verdict = 'ok' | 'needB96orBE' | 'needBE' | 'dependsB' | 'dependsB96' | 'info';

export interface Assessment {
  required: Required;
  verdict: Verdict;
  /** Anhängelast des Autos, die für diesen Anhänger gilt (O.1 gebremst, O.2 ungebremst) */
  towLimitKg: number | null;
  exceedsTowLimit: boolean;
  /** 0 passt, 1 dépend, 2 reicht nicht, 3 Anhängelast-Hinweis */
  group: 0 | 1 | 2 | 3;
}

export function assessTrailer(
  trailer: { mmaKg: number; braked: boolean },
  visitor: VisitorLicence | null,
  car: CarData = {},
): Assessment {
  const required = requiredLicence(trailer.mmaKg, car.f2);
  const limit = trailer.braked ? car.o1 : car.o2;
  const towLimitKg = known(limit) ? limit : null;
  const exceedsTowLimit = towLimitKg != null && trailer.mmaKg > towLimitKg;

  let verdict: Verdict;
  let group: Assessment['group'];
  if (!visitor || visitor === 'unknown' || required.kind === 'exceeds') {
    verdict = 'info';
    group = 0;
  } else if (required.kind === 'depends') {
    // BE deckt jeden Anhänger bis 3 500 kg ab, unabhängig vom Auto
    if (visitor === 'BE') {
      verdict = 'ok';
      group = 0;
    } else {
      verdict = visitor === 'B96' ? 'dependsB96' : 'dependsB';
      group = 1;
    }
  } else if (LICENCE_RANK[visitor] >= LICENCE_RANK[required.licence]) {
    verdict = 'ok';
    group = 0;
  } else {
    verdict = required.licence === 'B96' ? 'needB96orBE' : 'needBE';
    group = 2;
  }
  if (exceedsTowLimit) group = 3;
  return { required, verdict, towLimitKg, exceedsTowLimit, group };
}

/** Transporter bis 3 500 kg zulässiger Gesamtmasse: Führerschein B. */
export function assessVan(van: { mmaKg: number }, visitor: VisitorLicence | null): Assessment {
  const ok = van.mmaKg <= LIMITS.vanBKg;
  return {
    required: ok ? { kind: 'licence', licence: 'B' } : { kind: 'exceeds' },
    verdict: !visitor || visitor === 'unknown' ? 'info' : 'ok',
    towLimitKg: null,
    exceedsTowLimit: false,
    group: 0,
  };
}

/** Zählt als „passt" für die Überschrift „N remorques conviennent". */
export function fits(a: Assessment): boolean {
  return !a.exceedsTowLimit && (a.verdict === 'ok' || a.verdict === 'info' || a.verdict === 'dependsB' || a.verdict === 'dependsB96');
}
