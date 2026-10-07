import { useAdmin } from '../state';
import { Card, Field } from '../ui';
import { LANGS, type Lang } from '../model';

export default function Reviews() {
  const { draft, update, S } = useAdmin();
  const reviews = draft.site.reviews ?? [];
  return (
    <Card
      title={S.reviews.title}
      intro={S.reviews.intro}
      actions={
        <button type="button" className="a-btn a-btn-primary" onClick={() => update((x) => void (x.site.reviews = [...(x.site.reviews ?? []), { quote: '', name: '', date: '', lang: 'fr' }]))}>
          {S.reviews.add}
        </button>
      }
    >
      {!reviews.length && <p className="a-note">{S.reviews.empty}</p>}
      {reviews.map((r, i) => (
        <div className="a-review" key={i}>
          <Field label={S.reviews.quote} wide error={!r.quote.trim() ? S.req : undefined}>
            <textarea rows={3} value={r.quote} onChange={(e) => update((x) => void (x.site.reviews[i].quote = e.target.value))} />
          </Field>
          <div className="a-grid">
            <Field label={S.reviews.name}>
              <input type="text" value={r.name} onChange={(e) => update((x) => void (x.site.reviews[i].name = e.target.value))} />
            </Field>
            <Field label={S.reviews.date}>
              <input type="text" value={r.date} placeholder="03/2026" onChange={(e) => update((x) => void (x.site.reviews[i].date = e.target.value))} />
            </Field>
            <Field label={S.reviews.lang}>
              <select value={r.lang ?? 'fr'} onChange={(e) => update((x) => void (x.site.reviews[i].lang = e.target.value as Lang))}>
                {LANGS.map((l) => (
                  <option key={l} value={l}>
                    {l.toUpperCase()}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <button type="button" className="a-btn a-btn-danger" onClick={() => update((x) => void x.site.reviews.splice(i, 1))}>
            {S.reviews.remove}
          </button>
        </div>
      ))}
    </Card>
  );
}
