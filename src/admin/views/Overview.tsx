import { useAdmin } from '../state';
import { Card } from '../ui';
import type { RunInfo } from '../github';

const svg = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);
const ICONS = {
  clock: svg('M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2'),
  notice: svg('M4 10v4h3l6 4V6L7 10H4ZM17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11'),
  plus: svg('M12 5v14M5 12h14'),
  camera: svg('M4 8h3l2-3h6l2 3h3v11H4ZM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z'),
  site: svg('M14 4h6v6M20 4l-9 9M18 14v6H4V6h6'),
};

export default function Overview(props: { run: RunInfo | null; siteHref: string }) {
  const { data, draft, S, ui, go, mode } = useAdmin();
  const locale = ui === 'fr' ? 'fr-LU' : 'de-LU';
  const own = draft.fleet.filter((f) => !f.data.sample).length;
  const ex = draft.fleet.filter((f) => f.data.sample).length;
  const sync = data.stock.sync;
  return (
    <>
      <div className="a-hello">
        <h1>{S.ov.hello}</h1>
        <p>{S.ov.intro}</p>
      </div>
      {draft.site.presentation && <p className="a-note">{S.ov.presentationOn}</p>}
      <div className="a-quick">
        <button type="button" onClick={() => go('hours')}>
          <span>{ICONS.clock}</span>
          {S.ov.quick.hours}
        </button>
        <button type="button" onClick={() => go('hours', 'notice')}>
          <span>{ICONS.notice}</span>
          {S.ov.quick.notice}
        </button>
        <button type="button" onClick={() => go('fleet', 'new')}>
          <span>{ICONS.plus}</span>
          {S.ov.quick.fleet}
        </button>
        <button type="button" onClick={() => go('photos')}>
          <span>{ICONS.camera}</span>
          {S.ov.quick.photos}
        </button>
        <a className="a-quick-link" href={props.siteHref} target="_blank" rel="noopener">
          <span>{ICONS.site}</span>
          {S.viewSite}
        </a>
      </div>
      <div className="a-stats">
        <Card>
          <p className="a-stat-n">{data.stock.count}</p>
          <p className="a-stat-l">{S.ov.cars}</p>
          <p className="a-hint">
            {S.ov.carsSync}: {sync.status === 'ok' ? S.ov.syncOk : S.ov.syncErr}
            {sync.lastSuccess && ` · ${new Date(sync.lastSuccess).toLocaleString(locale, { dateStyle: 'short', timeStyle: 'short' })}`}
          </p>
        </Card>
        <Card>
          <p className="a-stat-n">{own}</p>
          <p className="a-stat-l">{S.ov.fleet}</p>
          {ex > 0 && <p className="a-hint">{S.ov.examples(ex)}</p>}
        </Card>
        <Card>
          <p className="a-stat-n a-stat-sm">
            {new Date(props.run?.createdAt ?? data.builtAt).toLocaleString(locale, { dateStyle: 'short', timeStyle: 'short' })}
          </p>
          <p className="a-stat-l">{mode === 'live' && props.run ? S.ov.lastPublish : S.ov.builtAt}</p>
        </Card>
      </div>
    </>
  );
}
