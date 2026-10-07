/**
 * Admin-Dashboard der Website (/admin/).
 * Live: Anmeldung mit GitHub-Zugangsschlüssel, Speichern = Commit, danach veröffentlicht
 * der Pages-Workflow automatisch. Demo: alles ausprobieren, Speichern nur im Browser.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GitHub, GitHubError, type RunInfo } from './github';
import { changes, clone, fleetErrors, hoursErrors, type BuildData, type Draft, type FleetEntry, type FleetData } from './model';
import { STRINGS, type UiLang } from './strings';
import { Ctx, type View } from './state';
import Overview from './views/Overview';
import Hours from './views/Hours';
import Fleet from './views/Fleet';
import Photos from './views/Photos';
import Texts from './views/Texts';
import Seo from './views/Seo';
import Reviews from './views/Reviews';
import Settings from './views/Settings';

const KEY_STORE = 'rp-admin-key';
const UI_STORE = 'rp-admin-ui';
const DEMO_STORE = 'rp-admin-demo-v1';

const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k) ?? sessionStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string, persist = true) {
    try {
      (persist ? localStorage : sessionStorage).setItem(k, v);
    } catch {}
  },
  del(k: string) {
    try {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    } catch {}
  },
};

const NAV: View[] = ['overview', 'hours', 'fleet', 'photos', 'texts', 'seo', 'reviews', 'settings'];

function draftFrom(d: BuildData): Draft {
  return { site: clone(d.site), horaires: clone(d.horaires), texts: clone(d.texts), fleet: clone(d.fleet), uploads: {}, deletes: [] };
}

/** Aktuelle Dateien frisch aus GitHub (falls seit dem Build gespeichert wurde) */
async function loadLive(gh: GitHub, data: BuildData): Promise<BuildData> {
  const read = async (p: string) => {
    const f = await gh.readText(p);
    return f ? JSON.parse(f.text) : null;
  };
  const [site, horaires, texts] = await Promise.all([read('src/content/site.json'), read('src/content/horaires.json'), read('src/content/texts.json')]);
  const fleetFiles: string[] = [];
  const walk = async (dir: string) => {
    for (const e of await gh.listDir(dir)) {
      if (e.type === 'dir') await walk(e.path);
      else if (e.name.endsWith('.json')) fleetFiles.push(e.path);
    }
  };
  await walk('src/content/flotte');
  const previews = new Map(data.fleet.map((f) => [f.path, f.preview]));
  const fleet: FleetEntry[] = await Promise.all(fleetFiles.map(async (p) => ({ path: p, data: (await read(p)) as FleetData, preview: previews.get(p) ?? null })));
  const ownFiles = new Map((await gh.listDir('src/assets/photos')).map((e) => [e.name.replace(/\.(jpe?g|png|webp)$/i, ''), e.path]));
  const own = new Set(ownFiles.keys());
  const photos = data.photos.map((p) => ({ ...p, demo: !own.has(p.key) && p.demo, file: ownFiles.get(p.key) ?? p.file, own: own.has(p.key) }));
  return { ...data, site: site ?? data.site, horaires: horaires ?? data.horaires, texts: texts ?? data.texts, fleet, photos };
}

export default function App(props: { base: string; siteHref: string }) {
  const [ui, setUi] = useState<UiLang>(() => (store.get(UI_STORE) as UiLang) || (navigator.language.startsWith('fr') ? 'fr' : 'de'));
  const S = STRINGS[ui];
  const [mode, setMode] = useState<'login' | 'loading' | 'demo' | 'live'>('login');
  const [gh, setGh] = useState<GitHub | null>(null);
  const [data, setData] = useState<BuildData | null>(null);
  const [orig, setOrig] = useState<Draft | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const history = useRef<Draft[]>([]);
  const lastPush = useRef(0);
  const [view, setView] = useState<View>('overview');
  const [arg, setArg] = useState<string | undefined>();
  const [toast, setToast] = useState<{ text: string; kind: 'ok' | 'err' } | null>(null);
  const [saving, setSaving] = useState(false);
  const [run, setRun] = useState<{ state: 'running' | 'done' | 'failed' | 'unknown'; info?: RunInfo } | null>(null);
  const [loginErr, setLoginErr] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [remember, setRemember] = useState(true);

  useEffect(() => store.set(UI_STORE, ui), [ui]);

  const fetchBuild = useCallback(async (): Promise<BuildData> => {
    const r = await fetch(`${props.base}/admin/data.json`, { cache: 'no-store' });
    return r.json();
  }, [props.base]);

  const startDemo = useCallback(async () => {
    setMode('loading');
    const d = await fetchBuild();
    let saved: Draft | null = null;
    try {
      const raw = localStorage.getItem(DEMO_STORE);
      if (raw) saved = JSON.parse(raw) as Draft;
    } catch {}
    const base = saved ?? draftFrom(d);
    setData(d);
    setOrig(clone(base));
    setDraft(clone(base));
    history.current = [];
    setMode('demo');
  }, [fetchBuild]);

  const startLive = useCallback(
    async (token: string, persist: boolean) => {
      setMode('loading');
      setLoginErr('');
      try {
        const d = await fetchBuild();
        const g = new GitHub(token, d.site.admin.repo, d.site.admin.branch);
        const { canPush } = await g.check();
        if (!canPush) throw new GitHubError(403, 'no push');
        const live = await loadLive(g, d);
        store.set(KEY_STORE, token, persist);
        setGh(g);
        setData(live);
        const base = draftFrom(live);
        setOrig(clone(base));
        setDraft(clone(base));
        history.current = [];
        setMode('live');
        g.latestRun().then((info) => info && setRun({ state: info.status === 'completed' ? (info.conclusion === 'success' ? 'done' : 'failed') : 'running', info }));
      } catch (e) {
        store.del(KEY_STORE);
        setMode('login');
        setLoginErr(e instanceof GitHubError ? (e.message === 'no push' ? S.errNoPush : S.errKey) : S.errNet);
      }
    },
    [fetchBuild, S],
  );

  // Anmeldung über Link (#key=…) oder gespeicherten Schlüssel
  useEffect(() => {
    const m = location.hash.match(/key=([\w-]+)/);
    if (m) {
      window.history.replaceState(null, '', location.pathname);
      startLive(m[1], true);
      return;
    }
    const k = store.get(KEY_STORE);
    if (k) startLive(k, !!localStorage.getItem(KEY_STORE));
    else if (location.hash === '#demo') startDemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = useCallback((fn: (d: Draft) => void) => {
    setDraft((cur) => {
      if (!cur) return cur;
      const now = Date.now();
      if (now - lastPush.current > 900) {
        history.current.push(cur);
        if (history.current.length > 60) history.current.shift();
      }
      lastPush.current = now;
      const next = clone(cur);
      fn(next);
      return next;
    });
  }, []);

  const undo = () => {
    const prev = history.current.pop();
    if (prev) setDraft(prev);
  };
  const discard = () => {
    if (orig && confirm(S.discardConfirm)) {
      setDraft(clone(orig));
      history.current = [];
    }
  };

  const files = useMemo(() => (orig && draft ? changes(orig, draft) : []), [orig, draft]);

  const validate = (): boolean => {
    if (!draft || !data) return false;
    const fleetBad = draft.fleet.some((f) => Object.keys(fleetErrors(f.data, data.categories, data.cargo)).length > 0);
    const hoursBad = Object.keys(hoursErrors(draft.horaires)).length > 0;
    const noticeBad = draft.site.notice?.active && !draft.site.notice.fr?.trim();
    return !fleetBad && !hoursBad && !noticeBad;
  };

  const summary = (): string => {
    const parts = new Set<string>();
    for (const f of files) {
      if (f.path.endsWith('horaires.json')) parts.add('Öffnungszeiten');
      else if (f.path.endsWith('texts.json')) parts.add('Texte');
      else if (f.path.endsWith('site.json')) parts.add('Einstellungen');
      else if (f.path.includes('/flotte/')) parts.add('Flotte');
      else if (f.path.includes('/assets/')) parts.add('Fotos');
    }
    return `Dashboard: ${[...parts].join(', ')}`;
  };

  const pollRun = useCallback(
    (g: GitHub, since: number) => {
      let n = 0;
      const tick = async () => {
        n++;
        const info = await g.latestRun();
        if (info && new Date(info.createdAt).getTime() >= since - 60_000) {
          if (info.status === 'completed') {
            setRun({ state: info.conclusion === 'success' ? 'done' : 'failed', info });
            return;
          }
          setRun({ state: 'running', info });
        } else if (!info && n > 2) {
          setRun({ state: 'unknown' });
          return;
        }
        if (n < 60) setTimeout(tick, 10_000);
        else setRun({ state: 'unknown' });
      };
      setTimeout(tick, 8000);
    },
    [],
  );

  const save = async () => {
    if (!draft || !orig) return;
    if (!validate()) {
      setToast({ text: S.fixErrors, kind: 'err' });
      return;
    }
    setSaving(true);
    try {
      if (mode === 'demo') {
        const stored = clone(draft);
        try {
          localStorage.setItem(DEMO_STORE, JSON.stringify(stored));
        } catch {}
        setOrig(stored);
        setToast({ text: S.savedDemo, kind: 'ok' });
      } else if (gh) {
        const since = Date.now();
        await gh.commit(files, summary());
        const next = clone(draft);
        next.uploads = {};
        next.deletes = [];
        setOrig(clone(next));
        setDraft(next);
        history.current = [];
        setToast({ text: S.saved, kind: 'ok' });
        setRun({ state: 'running' });
        pollRun(gh, since);
      }
    } catch (e) {
      const msg = e instanceof GitHubError && (e.status === 401 || e.status === 403) ? (e.status === 401 ? S.errKey : S.errNoPush) : (e as Error).message;
      setToast({ text: `${S.saveError} ${msg}`, kind: 'err' });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), toast.kind === 'err' ? 8000 : 4000);
    return () => clearTimeout(id);
  }, [toast]);

  // vor dem Verlassen warnen, wenn ungespeichert
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => {
      if (files.length) e.preventDefault();
    };
    addEventListener('beforeunload', h);
    return () => removeEventListener('beforeunload', h);
  }, [files.length]);

  const logout = () => {
    store.del(KEY_STORE);
    setGh(null);
    setData(null);
    setDraft(null);
    setOrig(null);
    setMode('login');
  };
  const go = (v: View, a?: string) => {
    setView(v);
    setArg(a);
    window.scrollTo({ top: 0 });
  };

  const langSwitch = (
    <div className="a-uilang" role="group" aria-label="Sprache / Langue">
      {(['de', 'fr'] as UiLang[]).map((l) => (
        <button key={l} type="button" aria-pressed={ui === l} onClick={() => setUi(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  // nie in einem fremden Rahmen anzeigen (Schutz vor Klick-Täuschung)
  if (window.top !== window.self) return null;

  if (mode === 'login' || mode === 'loading') {
    return (
      <main className="a-login">
        <div className="a-login-card">
          <div className="a-login-top">
            <span className="a-brand">Um Rond Point</span>
            {langSwitch}
          </div>
          <h1>{S.appName}</h1>
          <p>{S.loginIntro}</p>
          {mode === 'loading' ? (
            <p className="a-loading" role="status">
              <span className="a-spinner" aria-hidden="true" /> {S.loading}
            </p>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (keyInput.trim()) startLive(keyInput.trim(), remember);
                }}
              >
                <label className="a-field">
                  <span className="a-label">{S.keyLabel}</span>
                  <input type="password" autoComplete="current-password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} spellCheck={false} />
                  <span className="a-hint">{S.keyHint}</span>
                </label>
                <label className="a-check">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> {S.remember}
                </label>
                {loginErr && (
                  <p className="a-err" role="alert">
                    {loginErr}
                  </p>
                )}
                <button className="a-btn a-btn-primary a-block" type="submit">
                  {S.login}
                </button>
              </form>
              <p className="a-or">{S.or}</p>
              <button className="a-btn a-btn-secondary a-block" type="button" onClick={startDemo}>
                {S.demo}
              </button>
            </>
          )}
        </div>
      </main>
    );
  }

  if (!data || !draft || !orig) return null;
  const ctx = { data, orig, draft, update, S, ui, mode: mode as 'demo' | 'live', go };
  const pub = run && (
    <div className={`a-publish is-${run.state}`} role="status">
      {run.state === 'running' && <span className="a-spinner" aria-hidden="true" />}
      <span>
        {run.state === 'running' && S.publish.running}
        {run.state === 'done' && `${S.publish.done} ${new Date(run.info!.createdAt).toLocaleString(ui === 'fr' ? 'fr-LU' : 'de-LU', { dateStyle: 'short', timeStyle: 'short' })}`}
        {run.state === 'failed' && S.publish.failed}
        {run.state === 'unknown' && S.publish.unknown}
      </span>
      {run.info?.url && (
        <a href={run.info.url} target="_blank" rel="noopener">
          {S.publish.open}
        </a>
      )}
    </div>
  );

  return (
    <Ctx.Provider value={ctx}>
      <div className="a-app">
        <header className="a-top">
          <div className="a-top-l">
            <span className="a-brand">Um Rond Point</span>
            <span className={`a-mode is-${mode}`}>{mode === 'demo' ? S.modeDemo : S.modeLive}</span>
          </div>
          <div className="a-top-r">
            <a className="a-link a-site" href={props.siteHref} target="_blank" rel="noopener">
              {S.viewSite} ↗
            </a>
            {langSwitch}
            <button className="a-link" type="button" onClick={logout}>
              {S.logout}
            </button>
          </div>
        </header>
        {mode === 'demo' && <p className="a-demo">{S.demoBanner}</p>}
        <nav className="a-nav" aria-label={S.appName}>
          {NAV.map((v) => (
            <button key={v} type="button" aria-current={view === v ? 'page' : undefined} onClick={() => go(v)}>
              {S.nav[v]}
            </button>
          ))}
        </nav>
        <main className="a-main">
          {pub}
          {view === 'overview' && <Overview run={run?.info ?? null} siteHref={props.siteHref} />}
          {view === 'hours' && <Hours focus={arg} />}
          {view === 'fleet' && <Fleet arg={arg} />}
          {view === 'photos' && <Photos />}
          {view === 'texts' && <Texts />}
          {view === 'seo' && <Seo />}
          {view === 'reviews' && <Reviews />}
          {view === 'settings' && <Settings />}
        </main>
        <div className={`a-savebar${files.length ? ' is-on' : ''}`} aria-hidden={!files.length}>
          <span className="a-count">{S.changes(files.length)}</span>
          <button type="button" className="a-btn a-btn-ghost" onClick={undo} disabled={!history.current.length || saving}>
            ↶ {S.undo}
          </button>
          <button type="button" className="a-btn a-btn-ghost" onClick={discard} disabled={saving}>
            {S.discard}
          </button>
          <button type="button" className="a-btn a-btn-primary" onClick={save} disabled={saving || !files.length}>
            {saving ? S.saving : mode === 'demo' ? S.saveDemo : S.save}
          </button>
        </div>
        {toast && (
          <div className={`a-toast is-${toast.kind}`} role={toast.kind === 'err' ? 'alert' : 'status'}>
            {toast.text}
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}
