/** Kleinbuchstaben, ohne Akzente und Sonderzeichen – für Vergleiche und Zuordnungen. */
export function norm(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
