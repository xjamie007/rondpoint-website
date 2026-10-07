import { useState } from 'react';
import { useAdmin } from '../state';
import { Card } from '../ui';
import { LANGS, textValue, type Lang } from '../model';

export default function Seo() {
  const { data, draft, update, S } = useAdmin();
  const [lang, setLang] = useState<Lang>('fr');
  const set = (k: string, v: string) =>
    update((x) => {
      const map = { ...(x.texts[lang] ?? {}) };
      if (v === (data.dict[lang]?.[k] ?? '')) delete map[k];
      else map[k] = v;
      x.texts[lang] = map;
    });
  const host = 'www.rondpoint.lu';
  const name = (id: string) => (id.startsWith('category.') ? `${S.seo.category} ${data.labels.categories[id.split('.')[1]] ?? id}` : (S.seo.pages[id] ?? id));
  return (
    <Card title={S.seo.title} intro={S.seo.intro}>
      <div className="a-seg" role="group" aria-label={S.texts.lang}>
        {LANGS.map((l) => (
          <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="a-seo">
        {data.seoPages.map((p) => {
          const title = textValue(data, draft.texts, lang, p.title);
          const desc = textValue(data, draft.texts, lang, p.description);
          return (
            <div className="a-seo-item" key={p.id}>
              <h3>{name(p.id)}</h3>
              <div className="a-serp" aria-hidden="true">
                <span className="a-serp-url">
                  {host}
                  {p.url[lang].replace(data.base, '').replace(/\/$/, '').replaceAll('/', ' › ')}
                </span>
                <span className="a-serp-title">{title.length > 62 ? `${title.slice(0, 60)} …` : title}</span>
                <span className="a-serp-desc">{desc.length > 162 ? `${desc.slice(0, 158)} …` : desc}</span>
              </div>
              <label className="a-field">
                <span className="a-label">
                  {S.seo.pageTitle} <span className={`a-count${title.length > 60 ? ' is-over' : ''}`}>{title.length}/60{title.length > 60 ? ` · ${S.seo.tooLong}` : ''}</span>
                </span>
                <input type="text" value={title} onChange={(e) => set(p.title, e.target.value)} lang={lang} />
              </label>
              <label className="a-field">
                <span className="a-label">
                  {S.seo.pageDesc} <span className={`a-count${desc.length > 160 ? ' is-over' : ''}`}>{desc.length}/160{desc.length > 160 ? ` · ${S.seo.tooLong}` : ''}</span>
                </span>
                <textarea rows={3} value={desc} onChange={(e) => set(p.description, e.target.value)} lang={lang} />
              </label>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
