/**
 * Formulare mit JavaScript (F): eigene Fehlermeldungen am Feld (aria-invalid,
 * aria-describedby, angekündigt), Versand per fetch, Bestätigung direkt am Formular.
 * Ohne JavaScript greift die HTML-Validierung und die Edge Function leitet mit 303 weiter.
 */
const WARN =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5 2.5 20h19L12 3.5ZM12 10v4.5M12 17.5v.01"/></svg>';

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function todayIso(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Luxembourg' }).format(new Date());
}

function errorFor(field: Field): string | null {
  const v = field.value.trim();
  if (field instanceof HTMLInputElement && (field.type === 'checkbox' || field.type === 'radio')) {
    if (!field.required) return null;
    if (field.type === 'radio') {
      const group = field.form?.querySelectorAll<HTMLInputElement>(`input[type=radio][name="${field.name}"]`);
      return group && [...group].some((r) => r.checked) ? null : (field.dataset.msgRequired ?? null);
    }
    return field.checked ? null : (field.dataset.msgRequired ?? null);
  }
  if (field.required && !v) return field.dataset.msgRequired ?? null;
  if (!v) return null;
  if (field.dataset.validate === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return field.dataset.msgInvalid ?? null;
  if (field.dataset.validate === 'phone' && v.replace(/\D/g, '').length < 6) return field.dataset.msgInvalid ?? null;
  if (field instanceof HTMLInputElement && field.type === 'date') {
    if (field.dataset.notPast !== undefined && v < todayIso()) return field.dataset.msgPast ?? null;
    const after = field.dataset.after ? field.form?.querySelector<HTMLInputElement>(`[name="${field.dataset.after}"]`) : null;
    if (after?.value && v < after.value) return field.dataset.msgOrder ?? null;
  }
  return null;
}

function anchorOf(field: Field): HTMLElement {
  if (field instanceof HTMLInputElement && field.type === 'radio') return field.closest('fieldset') ?? field;
  if (field instanceof HTMLInputElement && field.type === 'checkbox') return field.closest('.check') ?? field;
  return field;
}

function setError(field: Field, msg: string | null) {
  const anchor = anchorOf(field);
  const id = `${field.form?.id ?? 'f'}-${field.name}-error`;
  let el = document.getElementById(id);
  const targets: Field[] =
    field instanceof HTMLInputElement && field.type === 'radio'
      ? [...(field.form?.querySelectorAll<HTMLInputElement>(`input[type=radio][name="${field.name}"]`) ?? [])]
      : [field];
  if (!msg) {
    el?.remove();
    targets.forEach((f) => {
      f.removeAttribute('aria-invalid');
      const d = (f.getAttribute('aria-describedby') ?? '').split(' ').filter((x) => x && x !== id);
      if (d.length) f.setAttribute('aria-describedby', d.join(' '));
      else f.removeAttribute('aria-describedby');
    });
    return;
  }
  if (!el) {
    el = document.createElement('p');
    el.id = id;
    el.className = 'field-error';
    anchor.insertAdjacentElement('afterend', el);
  }
  el.innerHTML = `${WARN}<span></span>`;
  el.querySelector('span')!.textContent = msg;
  targets.forEach((f) => {
    f.setAttribute('aria-invalid', 'true');
    const d = new Set((f.getAttribute('aria-describedby') ?? '').split(' ').filter(Boolean));
    d.add(id);
    f.setAttribute('aria-describedby', [...d].join(' '));
  });
}

function fieldsOf(form: HTMLFormElement): Field[] {
  const seen = new Set<string>();
  return [...form.querySelectorAll<Field>('input, select, textarea')].filter((f) => {
    if (f.type === 'hidden' || f.name === 'website' || f.disabled) return false;
    if (f.closest('[hidden]')) return false;
    if (f instanceof HTMLInputElement && f.type === 'radio') {
      if (seen.has(f.name)) return false;
      seen.add(f.name);
    }
    return true;
  });
}

function prefill(form: HTMLFormElement) {
  const p = new URLSearchParams(location.search);
  for (const [param, name] of [
    ['remorque', 'vehicle'],
    ['permis', 'licence'],
    ['objet', 'cargo'],
    ['sujet', 'subject'],
  ] as const) {
    const v = p.get(param);
    const el = form.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${name}"]`);
    if (!v || !el) continue;
    if (el instanceof HTMLInputElement && el.type === 'radio') {
      const r = form.querySelector<HTMLInputElement>(`input[type=radio][name="${name}"][value="${CSS.escape(v)}"]`);
      if (r) r.checked = true;
      continue;
    }
    if (el instanceof HTMLSelectElement) {
      if ([...el.options].some((o) => o.value === v)) el.value = v;
    } else el.value = v;
  }
}

function toggleTradeIn(form: HTMLFormElement) {
  const block = form.querySelector<HTMLElement>('[data-trade-in]');
  if (!block) return;
  const update = () => {
    const checked = form.querySelector<HTMLInputElement>('input[name="wish"]:checked');
    block.hidden = checked?.value !== 'reprise';
  };
  form.querySelectorAll('input[name="wish"]').forEach((r) => r.addEventListener('change', update));
  update();
}

export function initInquiryForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-inquiry-form]').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = '1';
    form.noValidate = true;
    prefill(form);
    toggleTradeIn(form);
    const vehicle = form.querySelector<HTMLSelectElement>('select[name="vehicle"]');
    const vehicleName = form.querySelector<HTMLInputElement>('[data-vehicle-name]');
    const syncName = () => {
      if (vehicle && vehicleName) vehicleName.value = vehicle.value ? (vehicle.selectedOptions[0]?.textContent?.trim() ?? '') : '';
    };
    vehicle?.addEventListener('change', syncName);
    syncName();
    const today = todayIso();
    form.querySelectorAll<HTMLInputElement>('input[type=date][data-not-past]').forEach((d) => (d.min = today));
    const from = form.querySelector<HTMLInputElement>('input[name="from"]');
    const to = form.querySelector<HTMLInputElement>('input[name="to"]');
    from?.addEventListener('change', () => {
      if (to) to.min = from.value || today;
    });

    form.addEventListener('change', (e) => {
      const f = e.target as Field;
      if (f.getAttribute('aria-invalid') === 'true' || (f instanceof HTMLInputElement && f.type === 'radio')) setError(f, errorFor(f));
    });
    form.addEventListener('focusout', (e) => {
      const f = e.target as Field;
      if (f.matches?.('input, select, textarea') && f.value) setError(f, errorFor(f));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const summary = form.querySelector<HTMLElement>('[data-form-summary]')!;
      let first: Field | null = null;
      for (const f of fieldsOf(form)) {
        const msg = errorFor(f);
        setError(f, msg);
        if (msg && !first) first = f;
      }
      if (first) {
        summary.textContent = form.dataset.msgSummary ?? '';
        summary.hidden = false;
        (first as HTMLElement).focus();
        return;
      }
      summary.hidden = true;
      if (form.getAttribute('action') === '#') {
        showFallback(form);
        return;
      }

      const btn = form.querySelector<HTMLButtonElement>('[data-submit]')!;
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = form.dataset.msgSending ?? label;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>),
        });
        if (res.ok) {
          const fields = form.querySelector<HTMLElement>('.fields')!;
          const ok = form.querySelector<HTMLElement>('[data-form-success]')!;
          fields.hidden = true;
          ok.hidden = false;
          ok.classList.add('play');
          ok.focus();
          return;
        }
        if (res.status === 422) {
          const data = (await res.json().catch(() => ({}))) as { fields?: string[] };
          for (const name of data.fields ?? []) {
            const f = form.querySelector<Field>(`[name="${name}"]`);
            if (f) setError(f, errorFor(f) ?? f.dataset.msgRequired ?? f.dataset.msgInvalid ?? form.dataset.msgSummary ?? '');
          }
          summary.textContent = form.dataset.msgSummary ?? '';
        } else {
          summary.textContent = res.status === 429 ? (form.dataset.msgRate ?? '') : (form.dataset.msgSend ?? '');
        }
        summary.hidden = false;
        summary.focus?.();
      } catch {
        summary.textContent = form.dataset.msgSend ?? '';
        summary.hidden = false;
      } finally {
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  });
}

/** Text der Anfrage aus den ausgefüllten Feldern: „Beschriftung: Wert“ je Zeile */
function requestText(form: HTMLFormElement): string {
  const lines = [form.dataset.intro ?? '', ''];
  const seen = new Set<string>();
  for (const el of form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea')) {
    const name = el.name;
    if (!name || ['type', 'lang', 'website', 'consent'].includes(name) || el.closest('.hp')) continue;
    if (el instanceof HTMLInputElement && (el.type === 'hidden' || ((el.type === 'radio' || el.type === 'checkbox') && !el.checked))) continue;
    let value = el.value.trim();
    if (!value) continue;
    let label = '';
    if (el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox')) {
      label = el.closest('fieldset')?.querySelector('legend')?.textContent ?? '';
      value = el.closest('label')?.textContent?.trim() || value;
    } else {
      label = (el.id && form.querySelector(`label[for="${el.id}"]`)?.textContent) || '';
      if (el instanceof HTMLSelectElement) value = el.selectedOptions[0]?.textContent?.trim() || value;
      if (el instanceof HTMLInputElement && el.type === 'date') value = new Date(`${value}T12:00`).toLocaleDateString(document.documentElement.lang);
    }
    label = label.replace(/\s*\([^)]*\)\s*$/, '').replace(/\s+/g, ' ').trim();
    const key = `${label}|${value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    lines.push(label ? `${label}: ${value}` : value);
  }
  return lines.join('\n').trim();
}

/** Ohne Formular-Schnittstelle: WhatsApp- und E-Mail-Knopf mit fertigem Text zeigen */
function showFallback(form: HTMLFormElement) {
  const box = form.querySelector<HTMLElement>('[data-form-fallback]');
  if (!box) return;
  const text = requestText(form);
  box.querySelector<HTMLAnchorElement>('[data-fallback-wa]')!.href = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`;
  box.querySelector<HTMLAnchorElement>('[data-fallback-mail]')!.href =
    `mailto:${form.dataset.mail}?subject=${encodeURIComponent(form.dataset.subject ?? '')}&body=${encodeURIComponent(text)}`;
  const fields = form.querySelector<HTMLElement>('.fields')!;
  fields.hidden = true;
  box.hidden = false;
  box.focus();
  box.querySelector('[data-fallback-edit]')!.addEventListener(
    'click',
    () => {
      box.hidden = true;
      fields.hidden = false;
      fields.querySelector<HTMLElement>('input:not([type=hidden]), select, textarea')?.focus();
    },
    { once: true },
  );
}
