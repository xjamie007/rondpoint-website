import { useEffect, useState } from 'react';
import { useAdmin } from '../state';
import { Card, Field, NumInput, PhotoButtons, Toggle } from '../ui';
import { fleetErrors, LANGS, resizeImage, slugify, type FleetData, type FleetEntry } from '../model';

const TRAILER_MAX = 3500;

function emptyVehicle(category: string): FleetData {
  return {
    category,
    name: { fr: '' },
    brand: null,
    mmaKg: 750,
    emptyKg: null,
    payloadKg: 500,
    braked: false,
    loadLengthM: null,
    loadWidthM: null,
    loadHeightM: null,
    volumeM3: null,
    tempRange: null,
    power: null,
    socket: 13,
    showPallets: false,
    suitableFor: [],
    priceDay: null,
    priceWeekend: null,
    deposit: null,
    notes: null,
    photo: null,
    active: true,
  };
}

export default function Fleet(props: { arg?: string }) {
  const { draft, update, S, data } = useAdmin();
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    if (props.arg === 'new') add();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.arg]);

  function add() {
    const taken = new Set(draft.fleet.map((f) => f.path));
    let n = 1;
    let path = `src/content/flotte/neu-${n}.json`;
    while (taken.has(path)) path = `src/content/flotte/neu-${++n}.json`;
    update((x) => void x.fleet.push({ path, data: emptyVehicle('benne'), preview: null }));
    setEditing(path);
  }

  const entry = draft.fleet.find((f) => f.path === editing);
  if (entry) return <Editor entry={entry} onBack={() => setEditing(null)} onRename={setEditing} />;

  const label = (f: FleetEntry) => f.data.name?.fr || S.fleet.newName;
  const examples = draft.fleet.filter((f) => f.data.sample);
  return (
    <Card
      title={S.fleet.title}
      intro={S.fleet.intro}
      actions={
        <button type="button" className="a-btn a-btn-primary" onClick={add}>
          {S.fleet.add}
        </button>
      }
    >
      {draft.fleet.every((f) => f.data.sample) && <p className="a-note">{S.fleet.empty}</p>}
      <ul className="a-list">
        {draft.fleet.map((f) => {
          const err = Object.keys(fleetErrors(f.data, data.categories, data.cargo)).length > 0;
          const upload = f.data.photo ? draft.uploads[`src/assets/flotte/${f.data.photo}.jpg`] : undefined;
          return (
            <li key={f.path} className={err ? 'has-err' : ''}>
              <div className="a-thumb">{upload ? <img src={upload.dataUrl} alt="" /> : f.preview ? <img src={f.preview} alt="" /> : <span aria-hidden="true">🛻</span>}</div>
              <div className="a-li-main">
                <strong>{label(f)}</strong>
                <span className="a-hint">
                  {data.labels.categories[f.data.category] ?? f.data.category} · {f.data.mmaKg} kg
                  {f.data.priceDay ? ` · ${f.data.priceDay} €/j` : ''}
                </span>
                <span className="a-tags">
                  {f.data.sample && <span className="a-tag">{S.fleet.example}</span>}
                  {f.data.active === false && <span className="a-tag">{S.fleet.inactive}</span>}
                </span>
              </div>
              <div className="a-li-act">
                <button type="button" className="a-btn a-btn-secondary" onClick={() => setEditing(f.path)}>
                  {S.fleet.edit}
                </button>
                <button
                  type="button"
                  className="a-btn a-btn-danger"
                  onClick={() =>
                    confirm(S.fleet.removeConfirm) &&
                    update((x) => {
                      x.fleet = x.fleet.filter((y) => y.path !== f.path);
                      if (f.data.photo) delete x.uploads[`src/assets/flotte/${f.data.photo}.jpg`];
                    })
                  }
                >
                  {S.fleet.remove}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {examples.length > 0 && examples.length < draft.fleet.length && (
        <button
          type="button"
          className="a-btn a-btn-ghost"
          onClick={() => confirm(S.fleet.removeExamplesConfirm) && update((x) => void (x.fleet = x.fleet.filter((y) => !y.data.sample)))}
        >
          {S.fleet.removeExamples}
        </button>
      )}
    </Card>
  );
}

function Editor(props: { entry: FleetEntry; onBack: () => void; onRename: (path: string) => void }) {
  const { draft, update, S, data } = useAdmin();
  const { entry } = props;
  const d = entry.data;
  const errs = fleetErrors(d, data.categories, data.cargo);
  const E = (k: string) => (errs[k] ? S.fleet.err[errs[k] as keyof typeof S.fleet.err] : undefined);
  const set = (fn: (v: FleetData) => void) =>
    update((x) => {
      const f = x.fleet.find((y) => y.path === entry.path);
      if (f) fn(f.data);
    });

  // Dateiname aus dem französischen Namen, solange das Fahrzeug neu ist
  const rename = (name: string) =>
    update((x) => {
      const f = x.fleet.find((y) => y.path === entry.path);
      if (!f) return;
      f.data.name = { ...f.data.name, fr: name };
    });
  useEffect(() => {
    if (!entry.path.includes('/neu-') || !d.name.fr.trim()) return;
    const id = setTimeout(() => {
      const taken = new Set(draft.fleet.map((f) => f.path));
      const base = slugify(d.name.fr);
      let p = `src/content/flotte/${base}.json`;
      let n = 2;
      while (taken.has(p)) p = `src/content/flotte/${base}-${n++}.json`;
      update((x) => {
        const f = x.fleet.find((y) => y.path === entry.path);
        if (f) f.path = p;
      });
      props.onRename(p);
    }, 1500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d.name.fr]);

  const isTrailer = d.category !== 'camionnette' && d.category !== 'voiture';
  const photoPath = d.photo ? `src/assets/flotte/${d.photo}.jpg` : null;
  const upload = photoPath ? draft.uploads[photoPath] : undefined;
  const preview = upload?.dataUrl ?? (d.photo ? entry.preview : null);

  const onPhoto = async (file: File) => {
    const img = await resizeImage(file, 1800);
    const id = d.photo && !d.photo.startsWith('fleet-') ? d.photo : slugify(d.name.fr || entry.path.split('/').pop()!.replace('.json', ''));
    update((x) => {
      x.uploads[`src/assets/flotte/${id}.jpg`] = img;
      const f = x.fleet.find((y) => y.path === entry.path);
      if (f) f.data.photo = id;
    });
  };

  return (
    <>
      <button type="button" className="a-link a-back" onClick={props.onBack}>
        {S.fleet.back}
      </button>
      <Card title={d.name.fr || S.fleet.newName}>
        <h3>{S.fleet.sections.basics}</h3>
        <div className="a-grid">
          <Field label={S.fleet.f.category} error={E('category')}>
            <select value={d.category} onChange={(e) => set((v) => void (v.category = e.target.value))}>
              {data.categories.map((c) => (
                <option key={c} value={c}>
                  {data.labels.categories[c] ?? c}
                </option>
              ))}
            </select>
          </Field>
          <Field label={`${S.fleet.f.name} (FR)`} error={E('name.fr')}>
            <input type="text" value={d.name.fr} onChange={(e) => rename(e.target.value)} maxLength={80} />
          </Field>
          <Field label={S.fleet.f.brand} hint={S.optional}>
            <input type="text" value={d.brand ?? ''} onChange={(e) => set((v) => void (v.brand = e.target.value))} />
          </Field>
        </div>
        <details className="a-details">
          <summary>{S.fleet.otherLangs}</summary>
          <div className="a-grid">
            {LANGS.filter((l) => l !== 'fr').map((l) => (
              <Field key={l} label={`${S.fleet.f.name} (${l.toUpperCase()})`}>
                <input type="text" value={d.name[l] ?? ''} onChange={(e) => set((v) => void (v.name = { ...v.name, [l]: e.target.value }))} />
              </Field>
            ))}
          </div>
        </details>

        <h3>{S.fleet.sections.weights}</h3>
        <div className="a-grid">
          <Field label={S.fleet.f.mmaKg} error={E('mmaKg')} hint={d.mmaKg > TRAILER_MAX ? S.fleet.over : undefined}>
            <NumInput value={d.mmaKg} step="1" min={1} onChange={(n) => set((v) => void (v.mmaKg = n ?? 0))} />
          </Field>
          <Field label={S.fleet.f.emptyKg} error={E('emptyKg')} hint={S.optional}>
            <NumInput value={d.emptyKg} step="1" min={1} onChange={(n) => set((v) => void (v.emptyKg = n))} />
          </Field>
          <Field label={S.fleet.f.payloadKg} error={E('payloadKg')}>
            <NumInput value={d.payloadKg} step="1" min={1} onChange={(n) => set((v) => void (v.payloadKg = n ?? 0))} />
          </Field>
        </div>
        {d.emptyKg && d.mmaKg > d.emptyKg && d.payloadKg !== d.mmaKg - d.emptyKg && (
          <button type="button" className="a-link" onClick={() => set((v) => void (v.payloadKg = v.mmaKg - (v.emptyKg ?? 0)))}>
            {S.fleet.payloadAuto} ({d.mmaKg - d.emptyKg} kg)
          </button>
        )}
        {isTrailer && <Toggle checked={d.braked} label={S.fleet.f.braked} hint={S.fleet.brakedHint} onChange={(b) => set((v) => void (v.braked = b))} />}

        <h3>{S.fleet.sections.size}</h3>
        <div className="a-grid">
          {(['loadLengthM', 'loadWidthM', 'loadHeightM', 'volumeM3'] as const).map((k) => (
            <Field key={k} label={S.fleet.f[k]} error={E(k)} hint={S.optional}>
              <NumInput value={d[k]} step="0.01" onChange={(n) => set((v) => void (v[k] = n))} />
            </Field>
          ))}
        </div>
        {isTrailer && <Toggle checked={!!d.showPallets} label={S.fleet.f.showPallets} onChange={(b) => set((v) => void (v.showPallets = b))} />}

        <h3>{S.fleet.sections.prices}</h3>
        <div className="a-grid">
          {(['priceDay', 'priceWeekend', 'deposit'] as const).map((k) => (
            <Field key={k} label={S.fleet.f[k]} error={E(k)} hint={S.optional}>
              <NumInput value={d[k]} step="0.01" onChange={(n) => set((v) => void (v[k] = n))} />
            </Field>
          ))}
        </div>

        <h3>{S.fleet.sections.extra}</h3>
        <fieldset className="a-fieldset">
          <legend className="a-label">{S.fleet.f.suitableFor}</legend>
          <div className="a-chips">
            {data.cargo.map((c) => (
              <label key={c} className="a-chip">
                <input
                  type="checkbox"
                  checked={(d.suitableFor ?? []).includes(c)}
                  onChange={(e) =>
                    set((v) => {
                      const s = new Set(v.suitableFor ?? []);
                      if (e.target.checked) s.add(c);
                      else s.delete(c);
                      v.suitableFor = data.cargo.filter((x) => s.has(x));
                    })
                  }
                />
                <span>{data.labels.cargo[c] ?? c}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="a-grid">
          {isTrailer && (
            <Field label={S.fleet.f.socket} error={E('socket')}>
              <select value={d.socket ?? ''} onChange={(e) => set((v) => void (v.socket = e.target.value ? (Number(e.target.value) as 7 | 13) : null))}>
                <option value="">{S.fleet.socketNone}</option>
                <option value="7">7</option>
                <option value="13">13</option>
              </select>
            </Field>
          )}
          {d.category === 'frigorifique' && (
            <>
              <Field label={S.fleet.f.tempMin} error={E('tempRange')}>
                <NumInput value={d.tempRange?.minC} step="1" onChange={(n) => set((v) => void (v.tempRange = n == null && v.tempRange?.maxC == null ? null : { minC: n ?? 0, maxC: v.tempRange?.maxC ?? 8 }))} />
              </Field>
              <Field label={S.fleet.f.tempMax}>
                <NumInput value={d.tempRange?.maxC} step="1" onChange={(n) => set((v) => void (v.tempRange = n == null && v.tempRange?.minC == null ? null : { minC: v.tempRange?.minC ?? 2, maxC: n ?? 8 }))} />
              </Field>
              <Field label={S.fleet.f.power} hint={S.optional}>
                <input type="text" value={d.power ?? ''} onChange={(e) => set((v) => void (v.power = e.target.value))} placeholder="230 V" />
              </Field>
            </>
          )}
        </div>
        <Field label={`${S.fleet.f.notes} (FR)`} error={E('notes.fr')} wide>
          <textarea rows={2} value={d.notes?.fr ?? ''} onChange={(e) => set((v) => void (v.notes = { ...(v.notes ?? { fr: '' }), fr: e.target.value }))} />
        </Field>
        <Toggle checked={d.active !== false} label={S.fleet.f.active} onChange={(b) => set((v) => void (v.active = b))} />

        <h3>{S.fleet.sections.photo}</h3>
        <div className="a-photo-edit">
          <div className="a-photo-prev">{preview ? <img src={preview} alt="" /> : <span aria-hidden="true">🛻</span>}</div>
          <div>
            <PhotoButtons onFile={onPhoto} pick={S.fleet.photoPick} take={S.fleet.photoTake} />
            {d.photo && (
              <button
                type="button"
                className="a-link"
                onClick={() =>
                  update((x) => {
                    if (photoPath) delete x.uploads[photoPath];
                    const f = x.fleet.find((y) => y.path === entry.path);
                    if (f) f.data.photo = null;
                  })
                }
              >
                {S.fleet.photoRemove}
              </button>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
