/**
 * „Quelle remorque ?" (C5) – React-Island.
 * Ohne JavaScript (Server-Render, hydrated=false): vollständige Liste mit „Permis nécessaire",
 * Fragen ausgeblendet, Führerscheinregeln als Text. Mit JavaScript dieselben Daten und
 * dieselbe permis.ts, plus Fragen, Aussagen und Umordnen per View Transition.
 * Kein Buchungssystem, keine Verfügbarkeit.
 */
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { LoadDiagram } from './LoadDiagram.tsx';
import { evaluate, requestHref, type Cargo, type ResultRow } from '../../lib/fleet.ts';
import type { FleetView } from '../../lib/fleet-view.ts';
import type { Assessment, CarData, VisitorLicence } from '../../lib/permis.ts';

export interface FinderStrings {
  cargoLegend: string;
  cargo: Record<Cargo, string>;
  licenceLegend: string;
  licence: Record<'B' | 'B96' | 'BE' | 'unknown', string>;
  exactSummary: string;
  f2: string;
  o1: string;
  o2: string;
  kg: string;
  exactHint: string;
  fleetCount: { one: string; other: string };
  matchCount: { one: string; other: string };
  none: string;
  vansHeading: string;
  vanStatement: string;
  specs: { payload: string; mma: string; surface: string; braked: string; socket: string; deposit: string; volume: string; temp: string; power: string; empty: string; height: string };
  verdict: {
    ok: string;
    needB96orBE: string;
    needBE: string;
    dependsB: string;
    dependsB96: string;
    required: string;
    requiredDepends: string;
    towLimit: string;
  };
  licenceShort: Record<'B' | 'B96' | 'BE', string>;
  priceMissing: string;
  request: string;
  requestVan: string;
  seeAll: string;
  finePrint: string;
  sourceLink: string;
  empty: string;
  noJsRules: string;
  photoAlt: string;
}

export interface FinderProps {
  lang: string;
  intlLocale: string;
  strings: FinderStrings;
  items: FleetView[];
  cargoOptions: Cargo[];
  compact: boolean;
  requestBase: string;
  seeAllHref: string;
  maxTotalM: number;
  uid: string;
  headingLevel?: 3 | 2;
  /** Präsentationsversion: fehlende Preise nicht als Platzhalter zeigen */
  presentation?: boolean;
}

const OPEN_SPLIT = /(\[(?:FEHLT|UNBESTÄTIGT)[^\]]*\])/;
const OPEN_ONE = /^\[(?:FEHLT|UNBESTÄTIGT)/;
function Open({ text }: { text: string }) {
  const parts = text.split(OPEN_SPLIT);
  return (
    <>
      {parts.map((p, i) =>
        OPEN_ONE.test(p) ? (
          <mark key={i} className="open-point" data-open-point>
            {p}
          </mark>
        ) : (
          p
        ),
      )}
    </>
  );
}

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
const ICON = {
  check: 'M5 12.5l4.5 4.5L19 7.5',
  warning: 'M12 3.5 2.5 20h19L12 3.5ZM12 10v4.5M12 17.5v.01',
  question: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.9-.9 1.5v.7M12 16.8v.01',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v5.5M12 7.8v.01',
};

const toNum = (s: string): number | null => {
  const n = Number(s.replace(/[^\d]/g, ''));
  return s.trim() && Number.isFinite(n) && n > 0 ? n : null;
};

function pluralize(locale: string, forms: { one: string; other: string }, n: number) {
  let rule: string = 'other';
  try {
    rule = new Intl.PluralRules(locale).select(n);
  } catch {
    /* ignorieren */
  }
  return (rule === 'one' ? forms.one : forms.other).replace('{n}', String(n));
}

export default function Finder(props: FinderProps) {
  const { strings: s, items, compact, uid } = props;
  const [hydrated, setHydrated] = useState(false);
  const [cargo, setCargo] = useState<Cargo | null>(null);
  const [licence, setLicence] = useState<VisitorLicence | null>(null);
  const [f2, setF2] = useState('');
  const [o1, setO1] = useState('');
  const [o2, setO2] = useState('');
  const seen = useRef(new Set<string>());
  const [animateIds, setAnimateIds] = useState<Set<string>>(new Set());
  const interacted = useRef(false);

  useEffect(() => setHydrated(true), []);

  const car: CarData = useMemo(() => ({ f2: toNum(f2), o1: toNum(o1), o2: toNum(o2) }), [f2, o1, o2]);
  const ev = useMemo(() => evaluate(items, { cargo, licence, car }), [items, cargo, licence, car]);
  const trailers = compact ? ev.trailers.slice(0, 3) : ev.trailers;
  const vans = compact ? ev.vans.slice(0, Math.max(0, 3 - trailers.length)) : ev.vans;

  // Paletten „beladen" nur beim ersten Erscheinen eines Ergebnisses nach einer Auswahl
  useEffect(() => {
    if (!interacted.current) {
      trailers.forEach((r) => seen.current.add(r.item.id));
      return;
    }
    const fresh = new Set<string>();
    for (const r of [...trailers, ...vans]) {
      if (!seen.current.has(r.item.id)) fresh.add(r.item.id);
      seen.current.add(r.item.id);
    }
    if (fresh.size) setAnimateIds(fresh);
  }, [trailers, vans]);

  const change = (fn: () => void) => {
    interacted.current = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (!doc.startViewTransition || reduce) {
      fn();
      return;
    }
    document.documentElement.dataset.vt = 'finder';
    const vt = doc.startViewTransition(() => flushSync(fn));
    vt.finished.finally(() => {
      delete document.documentElement.dataset.vt;
    });
  };

  if (items.length === 0) {
    return (
      <p className="finder-empty">
        <Open text={s.empty} />
      </p>
    );
  }

  const heading = !cargo
    ? pluralize(props.intlLocale, s.fleetCount, ev.trailers.length)
    : ev.fitCount === 0
      ? s.none
      : pluralize(props.intlLocale, s.matchCount, ev.fitCount);
  const H = props.headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div className={`finder-ui${hydrated ? ' is-hydrated' : ''}`}>
      {!hydrated && <p className="finder-nojs">{s.noJsRules}</p>}
      <div className="finder-questions" hidden={!hydrated}>
        <fieldset className="finder-q">
          <legend>{s.cargoLegend}</legend>
          <div className="chips">
            {props.cargoOptions.map((c) => (
              <label className="chip" key={c}>
                <input
                  type="radio"
                  name={`cargo-${uid}`}
                  value={c}
                  checked={cargo === c}
                  onChange={() => change(() => setCargo(c))}
                />
                <span>
                  <Svg d={ICON.check} />
                  {s.cargo[c]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="finder-q">
          <legend>{s.licenceLegend}</legend>
          <div className="chips">
            {(['B', 'B96', 'BE', 'unknown'] as const).map((l) => (
              <label className="chip" key={l}>
                <input
                  type="radio"
                  name={`licence-${uid}`}
                  value={l}
                  checked={licence === l}
                  onChange={() => change(() => setLicence(l))}
                />
                <span>
                  <Svg d={ICON.check} />
                  {s.licence[l]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <details className="finder-exact">
          <summary>{s.exactSummary}</summary>
          <p className="t-small">{s.exactHint}</p>
          <div className="exact-grid">
            {(
              [
                ['f2', s.f2, f2, setF2],
                ['o1', s.o1, o1, setO1],
                ['o2', s.o2, o2, setO2],
              ] as const
            ).map(([key, label, value, set]) => (
              <div key={key}>
                <label className="field-label" htmlFor={`${key}-${uid}`}>
                  {label}
                </label>
                <div className="unit-field">
                  <input
                    className="field"
                    id={`${key}-${uid}`}
                    inputMode="numeric"
                    autoComplete="off"
                    value={value}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^\d\s.]/g, '');
                      change(() => set(v));
                    }}
                  />
                  <span aria-hidden="true">{s.kg}</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>

      <div className="finder-results">
        <H className="finder-count" aria-live="polite">
          {heading === s.none ? <Open text={s.none} /> : heading}
        </H>
        <ol className="result-list">
          {trailers.map((r) => (
            <Result key={r.item.id} row={r} {...props} licence={licence} cargo={cargo} animate={animateIds.has(r.item.id)} hydrated={hydrated} />
          ))}
        </ol>
        {vans.length > 0 && (
          <>
            <p className="vans-h">{s.vansHeading}</p>
            <ol className="result-list">
              {vans.map((r) => (
                <Result key={r.item.id} row={r} {...props} licence={licence} cargo={cargo} animate={animateIds.has(r.item.id)} hydrated={hydrated} />
              ))}
            </ol>
          </>
        )}
        {compact && (
          <p className="see-all">
            <a className="btn btn-secondary btn-go" href={props.seeAllHref}>
              {s.seeAll}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

function Verdict({ a, row, s, licence, locale, hydrated }: { a: Assessment; row: ResultRow; s: FinderStrings; licence: VisitorLicence | null; locale: string; hydrated: boolean }) {
  const out: ReactNode[] = [];
  const d = (row.item as FleetView).display;
  if (row.kind === 'van') {
    out.push(
      <p className="verdict v-info" key="v">
        <Svg d={licence && licence !== 'unknown' ? ICON.check : ICON.info} />
        <span>{licence && licence !== 'unknown' ? `${s.verdict.ok} ${s.vanStatement}` : s.vanStatement}</span>
      </p>,
    );
    return <>{out}</>;
  }
  const req = a.required;
  const reqText = req.kind === 'licence' ? s.verdict.required.replace('{licence}', s.licenceShort[req.licence]) : s.verdict.requiredDepends;
  if (!hydrated || a.verdict === 'info') {
    out.push(
      <p className="verdict v-info" key="v">
        <Svg d={ICON.info} />
        <span>{hydrated ? reqText : d.requiredText}</span>
      </p>,
    );
  } else if (a.verdict === 'ok') {
    out.push(
      <p className="verdict v-ok" key="v">
        <Svg d={ICON.check} />
        <span>{s.verdict.ok}</span>
      </p>,
    );
  } else if (a.verdict === 'needB96orBE' || a.verdict === 'needBE') {
    out.push(
      <p className="verdict v-warn" key="v">
        <Svg d={ICON.warning} />
        <span>{s.verdict[a.verdict]}</span>
      </p>,
    );
  } else {
    out.push(
      <p className="verdict v-depends" key="v">
        <Svg d={ICON.question} />
        <span>{s.verdict[a.verdict]}</span>
      </p>,
    );
  }
  if (hydrated && a.exceedsTowLimit && a.towLimitKg != null) {
    let limit = String(a.towLimitKg);
    try {
      limit = new Intl.NumberFormat(locale).format(a.towLimitKg);
    } catch {
      /* ignorieren */
    }
    out.push(
      <p className="verdict v-warn" key="tow">
        <Svg d={ICON.warning} />
        <span>{s.verdict.towLimit.replace('{limite}', limit)}</span>
      </p>,
    );
  }
  return <>{out}</>;
}

function Result(
  props: FinderProps & { row: ResultRow; licence: VisitorLicence | null; cargo: Cargo | null; animate: boolean; hydrated: boolean },
) {
  const { row, strings: s, licence, cargo, hydrated } = props;
  const i = row.item as FleetView;
  const d = i.display;
  const key = `${hydrated ? row.assessment.verdict : 'static'}${row.assessment.exceedsTowLimit ? '-tow' : ''}`;
  return (
    <li className="result" style={{ viewTransitionName: `fleet-${props.uid}-${i.id}` }}>
      {d.photo && (
        <div className={`result-photo${d.photo.contain ? ' contain' : ''}`}>
          <img
            src={d.photo.src}
            srcSet={d.photo.srcset}
            sizes="(min-width: 1024px) 380px, calc(100vw - 32px)"
            width={d.photo.width}
            height={d.photo.height}
            loading="lazy"
            decoding="async"
            alt={s.photoAlt.replace('{name}', i.name)}
          />
        </div>
      )}
      <h4 className="result-name">{i.name}</h4>
      {i.loadLengthM != null && i.loadWidthM != null && d.lengthLabel && d.widthLabel && d.diagramAria && (
        <figure className="result-diagram">
          <LoadDiagram
            lengthM={i.loadLengthM}
            widthM={i.loadWidthM}
            showPallets={i.showPallets}
            maxTotalM={props.maxTotalM}
            lengthLabel={d.lengthLabel}
            widthLabel={d.widthLabel}
            ariaLabel={d.diagramAria}
            animate={props.animate}
          />
          {(d.palletsText || d.volume || d.temp) && (
            <figcaption className="t-small">
              {[d.palletsText, d.volume, d.temp].filter(Boolean).join(', ')}
            </figcaption>
          )}
        </figure>
      )}
      <dl className="specs result-specs">
        <div>
          <dt>{s.specs.payload}</dt>
          <dd>{d.payload}</dd>
        </div>
        <div>
          <dt>{s.specs.mma}</dt>
          <dd>{d.mma}</dd>
        </div>
        {d.surface && (
          <div>
            <dt>{s.specs.surface}</dt>
            <dd>{d.surface}</dd>
          </div>
        )}
        <div>
          <dt>{s.specs.braked}</dt>
          <dd>{d.braked}</dd>
        </div>
        {d.socket && (
          <div>
            <dt>{s.specs.socket}</dt>
            <dd>{d.socket}</dd>
          </div>
        )}
      </dl>
      <div className="verdicts" key={key} data-verdict>
        <Verdict a={row.assessment} row={row} s={s} licence={licence} locale={props.intlLocale} hydrated={hydrated} />
      </div>
      {(d.price || !props.presentation) && <p className="result-price">{d.price ?? <Open text={s.priceMissing} />}</p>}
      <p className="result-cta">
        <a className="btn btn-primary" href={requestHref(props.requestBase, i.id, hydrated ? licence : null, hydrated ? cargo : null)}>
          {row.kind === 'van' ? s.requestVan : s.request}
        </a>
      </p>
    </li>
  );
}
