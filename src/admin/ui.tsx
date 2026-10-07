/** Kleine Bausteine der Oberfläche */
import type { ReactNode } from 'react';

export function Field(props: { label: string; hint?: string; error?: string; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`a-field${props.wide ? ' wide' : ''}${props.error ? ' has-err' : ''}`}>
      <span className="a-label">{props.label}</span>
      {props.children}
      {props.hint && <span className="a-hint">{props.hint}</span>}
      {props.error && <span className="a-err">{props.error}</span>}
    </label>
  );
}

export function Toggle(props: { checked: boolean; onChange: (v: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="a-toggle">
      <input type="checkbox" checked={props.checked} onChange={(e) => props.onChange(e.target.checked)} />
      <span className="a-switch" aria-hidden="true" />
      <span>
        <span className="a-toggle-label">{props.label}</span>
        {props.hint && <span className="a-hint">{props.hint}</span>}
      </span>
    </label>
  );
}

export function Card(props: { title?: string; intro?: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="a-card">
      {(props.title || props.actions) && (
        <div className="a-card-head">
          {props.title && <h2>{props.title}</h2>}
          {props.actions}
        </div>
      )}
      {props.intro && <p className="a-intro">{props.intro}</p>}
      {props.children}
    </section>
  );
}

/** Zahlenfeld, das leere Eingabe als null liefert */
export function NumInput(props: { value: number | null | undefined; onChange: (v: number | null) => void; step?: string; min?: number }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      step={props.step ?? 'any'}
      min={props.min}
      value={props.value ?? ''}
      onChange={(e) => props.onChange(e.target.value === '' ? null : Number(e.target.value))}
    />
  );
}

/** Foto auswählen oder mit der Kamera aufnehmen */
export function PhotoButtons(props: { onFile: (f: File) => void; pick: string; take: string }) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) props.onFile(f);
    e.target.value = '';
  };
  return (
    <div className="a-photo-btns">
      <label className="a-btn a-btn-secondary">
        {props.pick}
        <input type="file" accept="image/*" onChange={handle} hidden />
      </label>
      <label className="a-btn a-btn-secondary">
        {props.take}
        <input type="file" accept="image/*" capture="environment" onChange={handle} hidden />
      </label>
    </div>
  );
}
