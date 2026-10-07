import { useMemo, useState } from 'react';
import { useAdmin } from '../state';
import { Card } from '../ui';
import { LANGS, textValue, type Lang } from '../model';

const PAGE = 40;

/** Lesbare Bezeichnung aus dem Schlüssel: „content.workshop.faq.q1.a“ → „faq › q1 › a“ */
const human = (k: string) => k.split('.').slice(-3).join(' › ');

export default function Texts() {
  const { data, draft, update, S } = useAdmin();
  const [group, setGroup] = useState(data.groups[0]?.id ?? 'home');
  const [lang, setLang] = useState<Lang>('fr');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(PAGE);

  const keys = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (term) {
      const all = data.groups.flatMap((g) => g.keys);
      return all.filter((k) => k.toLowerCase().includes(term) || textValue(data, draft.texts, lang, k).toLowerCase().includes(term) || data.dict.fr[k]?.toLowerCase().includes(term));
    }
    return data.groups.find((g) => g.id === group)?.keys ?? [];
  }, [data, group, q, lang, draft.texts]);

  const set = (k: string, v: string) =>
    update((x) => {
      const map = { ...(x.texts[lang] ?? {}) };
      if (v === (data.dict[lang]?.[k] ?? '')) delete map[k];
      else map[k] = v;
      x.texts[lang] = map;
    });

  const changedIn = (g: { keys: string[] }) => g.keys.filter((k) => LANGS.some((l) => draft.texts[l]?.[k] != null)).length;

  return (
    <Card title={S.texts.title} intro={S.texts.intro}>
      <div className="a-texts-bar">
        <input type="search" placeholder={S.texts.search} value={q} onChange={(e) => (setQ(e.target.value), setLimit(PAGE))} aria-label={S.texts.search} />
        <div className="a-seg" role="group" aria-label={S.texts.lang}>
          {LANGS.map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {!q && (
        <div className="a-groups" role="tablist">
          {data.groups
            .filter((g) => g.keys.length)
            .map((g) => {
              const c = changedIn(g);
              return (
                <button key={g.id} type="button" role="tab" aria-selected={group === g.id} onClick={() => (setGroup(g.id), setLimit(PAGE))}>
                  {S.texts.groups[g.id] ?? g.id}
                  {c > 0 && <span className="a-dot">{c}</span>}
                </button>
              );
            })}
        </div>
      )}
      <p className="a-hint">{S.texts.count(keys.length)}</p>
      <div className="a-textlist">
        {keys.slice(0, limit).map((k) => {
          const v = textValue(data, draft.texts, lang, k);
          const changed = draft.texts[lang]?.[k] != null;
          const long = v.length > 70;
          return (
            <div className={`a-text${changed ? ' is-changed' : ''}`} key={k}>
              <div className="a-text-head">
                <span className="a-key">{human(k)}</span>
                {changed && (
                  <button type="button" className="a-link" onClick={() => set(k, data.dict[lang]?.[k] ?? '')}>
                    {S.texts.reset}
                  </button>
                )}
              </div>
              {lang !== 'fr' && <p className="a-ref">{textValue(data, draft.texts, 'fr', k)}</p>}
              {long ? (
                <textarea rows={Math.min(8, Math.ceil(v.length / 70) + 1)} value={v} onChange={(e) => set(k, e.target.value)} lang={lang} />
              ) : (
                <input type="text" value={v} onChange={(e) => set(k, e.target.value)} lang={lang} />
              )}
            </div>
          );
        })}
      </div>
      {keys.length > limit && (
        <button type="button" className="a-btn a-btn-secondary" onClick={() => setLimit(limit + PAGE * 2)}>
          {S.texts.more} ({keys.length - limit})
        </button>
      )}
    </Card>
  );
}
