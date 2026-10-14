/**
 * Zeitpunkt des Commits, aus dem diese Seite gebaut wurde (ISO).
 * Der Admin-Bereich vergleicht damit, ob eine gespeicherte Änderung schon veröffentlicht ist.
 */
import { execSync } from 'node:child_process';

function commitTime(): string {
  try {
    return execSync('git log -1 --format=%cI', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
  } catch {
    return '';
  }
}

export const BUILD_COMMIT_TIME = commitTime() || new Date().toISOString();
