/**
 * Tabellen der Datenbank. Der Worker legt sie beim ersten Aufruf selbst an (alles „IF NOT EXISTS“),
 * es braucht also keinen eigenen Schritt. worker/migrations/0001_init.sql enthält dasselbe mit
 * Erklärungen (Test prüft die Gleichheit), z. B. zum Einfügen in der D1-Konsole.
 */
export const SCHEMA: string[] = [
  "CREATE TABLE IF NOT EXISTS admins ( email TEXT PRIMARY KEY, pass_hash TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')) )",
  'CREATE TABLE IF NOT EXISTS login_attempts ( id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL, ts INTEGER NOT NULL )',
  'CREATE INDEX IF NOT EXISTS login_attempts_key ON login_attempts (key, ts)',
  "CREATE TABLE IF NOT EXISTS admin_changes ( id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL DEFAULT (datetime('now')), user_email TEXT NOT NULL, summary TEXT NOT NULL, commit_sha TEXT NOT NULL )",
  "CREATE TABLE IF NOT EXISTS inquiries ( id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL DEFAULT (datetime('now')), type TEXT NOT NULL CHECK (type IN ('location', 'voiture', 'atelier', 'contact')), lang TEXT NOT NULL CHECK (lang IN ('fr', 'de', 'lb', 'en', 'pt')), name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, subject TEXT NOT NULL, payload TEXT NOT NULL, mail_status TEXT NOT NULL DEFAULT 'pending' CHECK (mail_status IN ('pending', 'sent', 'failed')), mail_error TEXT )",
  'CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries (created_at)',
  'CREATE TABLE IF NOT EXISTS inquiry_rate ( id INTEGER PRIMARY KEY AUTOINCREMENT, ip_hash TEXT NOT NULL, ts INTEGER NOT NULL )',
  'CREATE INDEX IF NOT EXISTS inquiry_rate_hash ON inquiry_rate (ip_hash, ts)',
];
