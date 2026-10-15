/**
 * Konten für den Admin-Bereich auf Cloudflare verwalten (Tabelle admins in D1).
 * Das Passwort wird nur hier auf dem Rechner verschlüsselt; zu Cloudflare geht nur der Hash.
 *
 *   npm run admin -- add name@example.com      Konto anlegen oder Passwort ändern
 *   npm run admin -- remove name@example.com   Konto löschen (Sitzungen sofort ungültig)
 *   npm run admin -- list                      Konten anzeigen
 *
 * Voraussetzung: einmal `npx wrangler login`. Mit --print wird nur der SQL-Befehl ausgegeben
 * (z. B. zum Einfügen in der D1-Konsole im Cloudflare-Dashboard).
 */
import { spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { hashPassword } from '../worker/auth.ts';

const [cmd, emailArg, ...rest] = process.argv.slice(2);
const printOnly = rest.includes('--print') || emailArg === '--print';
const email = (emailArg ?? '').trim().toLowerCase();
const EMAIL = /^[^\s@'"]+@[^\s@'"]+\.[^\s@'"]+$/;

function d1(sql: string) {
  if (printOnly) {
    console.log(sql);
    return;
  }
  const r = spawnSync('npx', ['wrangler@4', 'd1', 'execute', 'rondpoint', '--remote', '--command', sql], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

/** Passwort verdeckt abfragen */
function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const out = rl as unknown as { _writeToOutput: (s: string) => void; output: NodeJS.WriteStream };
    let shown = false;
    out._writeToOutput = (s: string) => {
      if (!shown) { out.output.write(s); shown = true; } else if (s.includes('\n')) out.output.write('\n');
    };
    rl.question(question, (a) => { rl.close(); resolve(a); });
  });
}

if (cmd === 'list') {
  d1('SELECT email, created_at FROM admins ORDER BY email;');
} else if (cmd === 'remove' && EMAIL.test(email)) {
  d1(`DELETE FROM admins WHERE email = '${email}';`);
  console.log(`Konto ${email} gelöscht.`);
} else if (cmd === 'add' && EMAIL.test(email)) {
  const pw = await ask(`Neues Passwort für ${email} (mindestens 12 Zeichen): `);
  if (pw.length < 12) { console.error('Zu kurz – mindestens 12 Zeichen.'); process.exit(1); }
  const again = await ask('Passwort wiederholen: ');
  if (pw !== again) { console.error('Die Passwörter stimmen nicht überein.'); process.exit(1); }
  const hash = await hashPassword(pw);
  d1(`INSERT INTO admins (email, pass_hash) VALUES ('${email}', '${hash}') ON CONFLICT(email) DO UPDATE SET pass_hash = excluded.pass_hash;`);
  console.log(`Konto ${email} ist bereit. Anmelden über „Login“ unten auf der Website.`);
} else {
  console.log('Aufruf: npm run admin -- add name@example.com | remove name@example.com | list');
  process.exit(1);
}
