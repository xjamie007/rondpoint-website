/**
 * Läuft auf jeder Seite, wenige Zeilen: Der Editor (editor.ts) wird nur geladen, wenn jemand
 * auf „Login" im Footer tippt oder dieser Browser gespeicherte Änderungen hat.
 * Für alle anderen Besucher bleibt die Seite genau wie gebaut.
 */
import { siteStorage } from './storage';

const run = (login = false) => import('./editor').then((m) => m.boot(login));

document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest?.('[data-ed-login]')) return;
  e.preventDefault();
  run(true);
});
if (siteStorage.hint()) run();
