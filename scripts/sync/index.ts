/**
 * Täglicher Bestand-Abgleich (T2). Aufruf: npm run sync [-- --dry-run]
 *
 * Ablauf: MovingCar-API (Bestandsverwaltung der Garage) → Sicherungen →
 * Lebenslauf → stock.json (nur bei Änderung) + sync-status.json (immer).
 * Bei Abbruch bleibt stock.json unverändert, der Prozess endet mit Code 1
 * und schreibt sync-report.md für das GitHub-Issue.
 */
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  overridesSchema,
  stockFileSchema,
  syncStatusSchema,
  type Overrides,
  type StockFile,
  type SyncStatus,
  type Vehicle,
} from '../../src/lib/stock-schema.ts';
import { PoliteClient, type HttpClient } from './http.ts';
import type { SourceAdapter, SourceResult } from './sources/types.ts';
import { movingCarAdapter, movingCarConfigFromEnv } from './sources/movingcar.ts';
import { guardReason, GuardError } from './guards.ts';
import { mergeStock, type Changes } from './lifecycle.ts';

/** Datum in Luxemburger Zeit, YYYY-MM-DD */
export function todayInLuxembourg(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Luxembourg' }).format(now);
}

function newCarsWithoutWltp(vehicles: Vehicle[], overrides: Overrides): string[] {
  return vehicles
    .filter((v) => v.status === 'active' && v.condition === 'new')
    .filter((v) => !(v.wltpConsumption && v.co2Gkm != null))
    .filter((v) => !(overrides[v.stableId]?.wltpConsumption && overrides[v.stableId]?.co2Gkm != null))
    .map((v) => `Neuwagen ohne WLTP-Verbrauch/CO₂: ${v.stableId} ${v.make} ${v.model} (${v.slug}) – in vehicle-overrides.json ergänzen`);
}

function summary(today: string, changes: Changes, vehicles: Vehicle[], source: string, warnings: string[]): string {
  const active = vehicles.filter((v) => v.status === 'active').length;
  const fmt = (ids: string[]) => (ids.length ? ids.join(', ') : '–');
  return [
    `## Bestand-Abgleich ${today}`,
    '',
    `Quelle: **${source}**, aktive Autos: **${active}**`,
    '',
    `| | Anzahl | stableId |`,
    `|---|---:|---|`,
    `| neu | ${changes.added.length} | ${fmt(changes.added)} |`,
    `| geändert | ${changes.changed.length} | ${fmt(changes.changed)} |`,
    `| wieder da | ${changes.reappeared.length} | ${fmt(changes.reappeared)} |`,
    `| nicht mehr verfügbar | ${changes.unavailable.length} | ${fmt(changes.unavailable)} |`,
    `| entfernt (14 Tage) | ${changes.removed.length} | ${fmt(changes.removed)} |`,
    '',
    warnings.length ? `### Warnungen\n\n${warnings.map((w) => `- ${w}`).join('\n')}` : 'Keine Warnungen.',
    '',
  ].join('\n');
}

/**
 * Einzige Quelle: MovingCar. LuxAuto und AutoScout24 werden nicht mehr gelesen (die Inserate dort
 * kommen ohnehin aus MovingCar). Ohne Zugang bricht der Lauf ab, der Bestand bleibt unverändert.
 */
export function defaultAdapters(env: Record<string, string | undefined> = process.env): SourceAdapter[] {
  const mc = movingCarConfigFromEnv(env);
  if (!mc) throw new Error('MOVINGCAR_API_KEY fehlt (GitHub-Secret bzw. .env)');
  return [movingCarAdapter(mc)];
}

export interface SyncInput {
  client: HttpClient;
  previous: StockFile;
  previousStatus: SyncStatus;
  overrides: Overrides;
  now: Date;
  log: (msg: string) => void;
  adapters?: SourceAdapter[];
}

export interface SyncOutput {
  code: 0 | 1;
  /** neuer Bestand oder null bei Abbruch (dann bleibt stock.json unverändert) */
  stock: StockFile | null;
  stockChanged: boolean;
  status: SyncStatus;
  report: string;
}

export async function runSync(input: SyncInput): Promise<SyncOutput> {
  const { client, previous, previousStatus, overrides, now, log } = input;
  const today = todayInLuxembourg(now);
  const previousCount = previous.vehicles.filter((v) => v.status === 'active').length;
  const errors: string[] = [];
  let result: SourceResult | null = null;

  let adapters: SourceAdapter[];
  try {
    adapters = input.adapters ?? defaultAdapters();
  } catch (err) {
    errors.push((err as Error).message);
    adapters = [];
  }
  for (const adapter of adapters) {
    try {
      if (adapter.robots !== false) {
        log(`Quelle ${adapter.name}: robots.txt prüfen`);
        await client.loadRobots(adapter.origin);
      } else log(`Quelle ${adapter.name}`);
      const r = await adapter.fetchAll(client, log);
      const reason = guardReason({ previousCount, valid: r.listings.length, invalid: r.invalid.length });
      if (reason) throw new GuardError(reason);
      result = r;
      break;
    } catch (err) {
      const msg = `${adapter.name}: ${(err as Error).name} – ${(err as Error).message}`;
      errors.push(msg);
      log(`Quelle aufgegeben: ${msg}`);
    }
  }

  if (!result) {
    const status: SyncStatus = { ...previousStatus, lastRun: now.toISOString(), status: 'error', error: errors.join(' | ') };
    const report = [
      '## Bestand-Sync fehlgeschlagen',
      '',
      `Lauf: ${now.toISOString()}`,
      `Letzter Erfolg: ${previousStatus.lastSuccess ?? 'nie'}`,
      `Anzahl alt: ${previousCount}`,
      '',
      '### Gründe',
      ...errors.map((e) => `- ${e}`),
      '',
      'Die Website zeigt weiter den letzten guten Stand (stock.json unverändert).',
      '',
    ].join('\n');
    return { code: 1, stock: null, stockChanged: false, status, report };
  }

  const warnings = [...result.warnings];
  for (const inv of result.invalid) warnings.push(`übersprungen: ${inv.url} – ${inv.reason}`);
  const listings = result.listings;

  const merged = mergeStock(previous.vehicles, listings, today);
  const next = stockFileSchema.parse({ vehicles: merged.vehicles });
  warnings.push(...newCarsWithoutWltp(next.vehicles, overrides));

  const status: SyncStatus = {
    lastSuccess: now.toISOString(),
    lastRun: now.toISOString(),
    status: 'ok',
    source: result.source,
    count: next.vehicles.filter((v) => v.status === 'active').length,
    warnings,
    error: null,
  };
  return {
    code: 0,
    stock: next,
    stockChanged: JSON.stringify(next) !== JSON.stringify(previous),
    status,
    report: summary(today, merged.changes, next.vehicles, result.source, warnings),
  };
}

/* ------------------------------------------------------------------
   Aufruf von der Kommandozeile
------------------------------------------------------------------- */
async function main(): Promise<number> {
  const root = (p: string) => fileURLToPath(new URL(`../../${p}`, import.meta.url));
  const STOCK = root('src/data/stock.json');
  const STATUS = root('src/data/sync-status.json');
  const OVERRIDES = root('src/data/vehicle-overrides.json');
  const REPORT = root('sync-report.md');
  const dryRun = process.argv.includes('--dry-run');
  const readJson = (file: string, fallback: unknown): unknown => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);
  const writeJson = (file: string, data: unknown) => {
    if (!dryRun) writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  };
  const logLines: string[] = [];
  const log = (msg: string) => {
    const line = `[${new Date().toISOString().slice(11, 19)}] ${msg}`;
    logLines.push(line);
    console.log(line);
  };

  const client = new PoliteClient({ log });
  const out = await runSync({
    client,
    previous: stockFileSchema.parse(readJson(STOCK, { vehicles: [] })),
    previousStatus: syncStatusSchema.parse(
      readJson(STATUS, { lastSuccess: null, lastRun: null, status: 'never', source: null, count: 0, warnings: [] }),
    ),
    overrides: overridesSchema.parse(readJson(OVERRIDES, {})),
    now: new Date(),
    log,
  });

  writeJson(STATUS, out.status);
  if (out.stock && out.stockChanged) writeJson(STOCK, out.stock);
  const report =
    out.code === 0
      ? out.report
      : `${out.report}\n<details><summary>Log</summary>\n\n\`\`\`\n${logLines.join('\n')}\n\`\`\`\n</details>\n`;
  if (out.code !== 0 && !dryRun) writeFileSync(REPORT, report);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
  console.log('\n' + report);
  log(
    `${client.requestCount ? `${client.requestCount} Portal-Anfragen, ` : ''}stock.json ${out.code !== 0 ? 'unverändert (Abbruch)' : out.stockChanged ? 'aktualisiert' : 'unverändert'}${dryRun ? ' (Probelauf, nichts geschrieben)' : ''}`,
  );
  return out.code;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().then(
    (code) => process.exit(code),
    (err) => {
      console.error(err);
      process.exit(1);
    },
  );
}
