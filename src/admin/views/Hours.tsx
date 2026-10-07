import { useEffect, useRef } from 'react';
import { useAdmin } from '../state';
import { Card, Field, Toggle } from '../ui';
import { DAYS, hoursErrors, LANGS, type Interval } from '../model';

export default function Hours(props: { focus?: string }) {
  const { draft, update, S } = useAdmin();
  const errs = hoursErrors(draft.horaires);
  const noticeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (props.focus === 'notice') noticeRef.current?.scrollIntoView();
  }, [props.focus]);
  const setIv = (d: (typeof DAYS)[number], i: number, j: 0 | 1, v: string) =>
    update((x) => {
      x.horaires.week[d][i][j] = v;
    });
  const notice = draft.site.notice ?? { active: false };
  return (
    <>
      <Card title={S.hours.title} intro={S.hours.intro}>
        <div className="a-hours">
          {DAYS.map((d) => {
            const iv = draft.horaires.week[d] ?? [];
            return (
              <div className={`a-day${errs[d] ? ' has-err' : ''}`} key={d}>
                <div className="a-day-name">{S.hours.days[d]}</div>
                <Toggle
                  checked={iv.length > 0}
                  label={iv.length ? S.hours.open : S.hours.closed}
                  onChange={(on) =>
                    update((x) => {
                      x.horaires.week[d] = on ? [['08:00', '12:00'] as Interval] : [];
                    })
                  }
                />
                <div className="a-ivs">
                  {iv.map(([a, b], i) => (
                    <div className="a-iv" key={i}>
                      <input type="time" aria-label={`${S.hours.days[d]} ${S.hours.from}`} value={a} onChange={(e) => setIv(d, i, 0, e.target.value)} />
                      <span>–</span>
                      <input type="time" aria-label={`${S.hours.days[d]} ${S.hours.to}`} value={b} onChange={(e) => setIv(d, i, 1, e.target.value)} />
                      {i === 1 && (
                        <button type="button" className="a-link" onClick={() => update((x) => void x.horaires.week[d].splice(1, 1))}>
                          {S.hours.remove}
                        </button>
                      )}
                    </div>
                  ))}
                  {iv.length === 1 && (
                    <button type="button" className="a-link" onClick={() => update((x) => void x.horaires.week[d].push(['13:00', '18:00']))}>
                      {S.hours.add}
                    </button>
                  )}
                </div>
                {errs[d] && <p className="a-err">{S.hours.err[errs[d] as keyof typeof S.hours.err]}</p>}
              </div>
            );
          })}
        </div>
      </Card>
      <div ref={noticeRef} id="notice">
        <Card title={S.hours.noticeTitle} intro={S.hours.noticeIntro}>
          <Toggle
            checked={!!notice.active}
            label={S.hours.noticeOn}
            onChange={(v) =>
              update((x) => {
                x.site.notice = { ...(x.site.notice ?? {}), active: v };
              })
            }
          />
          <div className="a-grid">
            {LANGS.map((l) => (
              <Field key={l} label={`${S.hours.noticeText} ${l.toUpperCase()}`} error={l === 'fr' && notice.active && !notice.fr?.trim() ? S.hours.noticeFrRequired : undefined}>
                <input
                  type="text"
                  value={notice[l] ?? ''}
                  maxLength={160}
                  onChange={(e) =>
                    update((x) => {
                      x.site.notice = { ...(x.site.notice ?? { active: false }), [l]: e.target.value };
                    })
                  }
                />
              </Field>
            ))}
          </div>
          {notice.active && notice.fr && (
            <div className="a-preview">
              <span className="a-hint">{S.hours.preview}</span>
              <div className="a-notice-prev">{notice.fr}</div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
