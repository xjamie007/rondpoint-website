-- Datenbank der Website auf Cloudflare (D1, beim Anlegen „Jurisdiction: EU“ wählen).
-- Kein Zugriff von außen: nur der Worker liest und schreibt.

-- Konten für den Admin-Bereich (anlegen mit: npm run admin -- add name@example.com)
CREATE TABLE IF NOT EXISTS admins (
  email TEXT PRIMARY KEY,
  pass_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Fehlversuche beim Anmelden (Schutz gegen Ausprobieren), nach 24 Stunden gelöscht
CREATE TABLE IF NOT EXISTS login_attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT NOT NULL,
  ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS login_attempts_key ON login_attempts (key, ts);

-- Protokoll: wer hat wann was veröffentlicht (die Inhalte selbst liegen im Git-Verlauf)
CREATE TABLE IF NOT EXISTS admin_changes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  user_email TEXT NOT NULL,
  summary TEXT NOT NULL,
  commit_sha TEXT NOT NULL
);

-- Anfragen aus den Formularen, nach 90 Tagen gelöscht
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  type TEXT NOT NULL CHECK (type IN ('location', 'voiture', 'atelier', 'contact')),
  lang TEXT NOT NULL CHECK (lang IN ('fr', 'de', 'lb', 'en', 'pt')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  payload TEXT NOT NULL,
  mail_status TEXT NOT NULL DEFAULT 'pending' CHECK (mail_status IN ('pending', 'sent', 'failed')),
  mail_error TEXT
);
CREATE INDEX IF NOT EXISTS inquiries_created_at ON inquiries (created_at);

-- Rate-Limit der Formulare: nur ein Hash der IP-Adresse, nach 24 Stunden gelöscht
CREATE TABLE IF NOT EXISTS inquiry_rate (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_hash TEXT NOT NULL,
  ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS inquiry_rate_hash ON inquiry_rate (ip_hash, ts);
