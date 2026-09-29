/**
 * Sicherungen (T2.9): lieber gestern als falsch.
 * Liefert einen Abbruchgrund oder null.
 */
export interface GuardInput {
  previousCount: number;
  valid: number;
  invalid: number;
}

export const MAX_INVALID_SHARE = 0.3;
export const MAX_DROP_SHARE = 0.5;
export const DROP_CHECK_MIN_PREVIOUS = 4;

export function guardReason({ previousCount, valid, invalid }: GuardInput): string | null {
  const total = valid + invalid;
  if (total === 0 || valid === 0) return '0 Autos gefunden – der Parser ist vermutlich kaputt, der Hof ist nicht leer';
  if (invalid / total > MAX_INVALID_SHARE) {
    return `${invalid} von ${total} Inseraten ungültig (mehr als ${MAX_INVALID_SHARE * 100} %)`;
  }
  if (previousCount >= DROP_CHECK_MIN_PREVIOUS && valid < previousCount * (1 - MAX_DROP_SHARE)) {
    return `Anzahl fällt von ${previousCount} auf ${valid} (mehr als ${MAX_DROP_SHARE * 100} %)`;
  }
  return null;
}

export class GuardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GuardError';
  }
}
