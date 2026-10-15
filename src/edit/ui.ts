/** Bausteine des Admin-Bereichs: Fenster, Hinweise, Rückfrage, Bilder vorbereiten. */
import { escapeHtml } from '@/i18n';

export const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
export const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

/* ------------------------------------------------------------ Fenster, Hinweise */
export function sheet(title: string, body: string, opts: { wide?: boolean; onClose?: () => void; focus?: boolean } = {}) {
  closeSheet();
  const wrap = document.createElement('div');
  wrap.className = 'ed-sheet-wrap ed-ui';
  wrap.innerHTML = `<div class="ed-sheet${opts.wide ? ' ed-wide' : ''}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
    <div class="ed-sheet-head"><h2>${escapeHtml(title)}</h2><button class="ed-x" aria-label="Schließen">✕</button></div>
    <div class="ed-sheet-body">${body}</div></div>`;
  document.body.append(wrap);
  const close = () => {
    if ($('.ed-sheet.ed-working', wrap)) return; // Foto wird noch hochgeladen
    closeSheet();
    opts.onClose?.();
  };
  $('.ed-x', wrap)!.onclick = close;
  wrap.addEventListener('mousedown', (e) => { if (e.target === wrap) close(); });
  wrap.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  const f = opts.focus === false ? null : $<HTMLInputElement>('input:not([type=file]), textarea', wrap);
  setTimeout(() => (f ?? $<HTMLButtonElement>('.ed-x', wrap))!.focus(), 60);
  return wrap;
}
export function closeSheet() { $$('.ed-sheet-wrap').forEach((w) => w.remove()); }
export function toast(msg: string, ms = 2600) {
  const t = document.createElement('div');
  t.className = 'ed-toast ed-ui';
  t.setAttribute('role', 'status');
  t.textContent = msg;
  document.body.append(t);
  setTimeout(() => { t.classList.add('ed-out'); setTimeout(() => t.remove(), 400); }, ms);
}
export function confirmBox(title: string, text: string, okLabel: string, danger = false): Promise<boolean> {
  return new Promise((res) => {
    const w = sheet(title, `<p class="ed-p">${escapeHtml(text)}</p><div class="ed-row"><button class="ed-btn ed-ghost" data-a="no">Abbrechen</button>
      <button class="ed-btn ${danger ? 'ed-danger' : 'ed-primary'}" data-a="yes">${escapeHtml(okLabel)}</button></div>`, { onClose: () => res(false) });
    $('[data-a=no]', w)!.onclick = () => { closeSheet(); res(false); };
    $('[data-a=yes]', w)!.onclick = () => { closeSheet(); res(true); };
  });
}


/* ------------------------------------------------------------ Bilder */
export function prepareImage(file: File, maxW = 2400): Promise<{ blob: Blob; ext: string }> {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxW / img.naturalWidth);
      const cv = document.createElement('canvas');
      cv.width = Math.round(img.naturalWidth * scale);
      cv.height = Math.round(img.naturalHeight * scale);
      const cx = cv.getContext('2d')!;
      cx.imageSmoothingQuality = 'high';
      cx.drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      cv.toBlob((b) => {
        if (b?.type === 'image/webp') return res({ blob: b, ext: 'webp' });
        cv.toBlob((j) => (j ? res({ blob: j, ext: 'jpg' }) : rej(new Error('encode'))), 'image/jpeg', 0.82);
      }, 'image/webp', 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('format')); };
    img.src = url;
  });
}
export const pickers = () => `<div class="ed-row ed-pick"><label class="ed-btn ed-primary">📁 Foto aus Galerie<input type="file" accept="image/*" hidden></label>
  <label class="ed-btn ed-primary">📷 Foto aufnehmen<input type="file" accept="image/*" capture="environment" hidden></label></div>`;
