import { useAdmin } from '../state';
import { Card, Field, Toggle } from '../ui';

/** „+352 81 05 41“ → „+352810541“ */
const digits = (s: string) => s.replace(/[^\d+]/g, '');

export default function Settings() {
  const { draft, update, S } = useAdmin();
  const s = draft.site;
  return (
    <>
      <Card title={S.settings.mode}>
        <Toggle checked={!!s.presentation} label={S.settings.presentation} hint={S.settings.presentationHint} onChange={(v) => update((x) => void (x.site.presentation = v))} />
        <Toggle checked={!!s.showOpenPoints} label={S.settings.openPoints} onChange={(v) => update((x) => void (x.site.showOpenPoints = v))} />
      </Card>
      <Card title={S.settings.contact}>
        <div className="a-grid">
          <Field label={S.settings.phone} hint={`tel:${s.phone.tel}`}>
            <input
              type="tel"
              value={s.phone.display}
              onChange={(e) =>
                update((x) => {
                  x.site.phone = { display: e.target.value, tel: digits(e.target.value) };
                })
              }
            />
          </Field>
          <Field label={S.settings.whatsapp} hint={`wa.me/${s.whatsapp.wa}`}>
            <input
              type="tel"
              value={s.whatsapp.display}
              onChange={(e) =>
                update((x) => {
                  x.site.whatsapp = { display: e.target.value, wa: digits(e.target.value).replace(/^\+/, '') };
                })
              }
            />
          </Field>
          <Field label={S.settings.email}>
            <input type="email" value={s.email} onChange={(e) => update((x) => void (x.site.email = e.target.value.trim()))} />
          </Field>
        </div>
      </Card>
      <Card title={S.settings.social}>
        <div className="a-grid">
          <Field label="Facebook">
            <input type="url" value={s.social.facebook} onChange={(e) => update((x) => void (x.site.social.facebook = e.target.value.trim()))} />
          </Field>
          <Field label="Instagram">
            <input type="url" value={s.social.instagram} onChange={(e) => update((x) => void (x.site.social.instagram = e.target.value.trim()))} />
          </Field>
          <Field label="TikTok" hint={S.optional}>
            <input
              type="url"
              value={s.social.tiktok?.value ?? ''}
              onChange={(e) => update((x) => void (x.site.social.tiktok = { value: e.target.value.trim() || null, confirmed: !!e.target.value.trim() }))}
            />
          </Field>
        </div>
      </Card>
      <Card title={S.settings.statements} intro={S.settings.statementsIntro}>
        {Object.entries(S.settings.conf).map(([k, label]) => (
          <Toggle key={k} checked={s.confirmations[k] === true} label={label} onChange={(v) => update((x) => void (x.site.confirmations[k] = v))} />
        ))}
      </Card>
      <Card title={S.settings.access} intro={S.settings.accessHint}>
        <div className="a-grid">
          <Field label={S.settings.repo}>
            <input type="text" value={s.admin.repo} onChange={(e) => update((x) => void (x.site.admin.repo = e.target.value.trim()))} />
          </Field>
          <Field label={S.settings.branch}>
            <input type="text" value={s.admin.branch} onChange={(e) => update((x) => void (x.site.admin.branch = e.target.value.trim()))} />
          </Field>
        </div>
      </Card>
    </>
  );
}
