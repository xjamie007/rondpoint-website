/**
 * Supabase Edge Function `publish` – Speichern aus dem Admin-Bereich der Website.
 * Logik in publish.ts (getestet), Umwandlung in Dateien in convert.ts.
 *
 * Geheimnisse (supabase secrets set …):
 *   GITHUB_TOKEN     Fine-grained Token, nur dieses Repository, „Contents: Read and write“
 *   GITHUB_REPO      xjamie007/rondpoint-website
 *   GITHUB_BRANCH    main (Standard)
 *   ALLOWED_ORIGINS  Adressen der Website, kommagetrennt
 *   ADMIN_EMAILS     optional: nur diese Konten dürfen speichern
 * SUPABASE_URL, SUPABASE_ANON_KEY und SUPABASE_SERVICE_ROLE_KEY setzt Supabase selbst.
 */
import { makeHandler } from './publish.ts';

const env = (k: string) => Deno.env.get(k) ?? '';

Deno.serve(
  makeHandler({
    SUPABASE_URL: env('SUPABASE_URL'),
    SUPABASE_ANON_KEY: env('SUPABASE_ANON_KEY'),
    SUPABASE_SERVICE_ROLE_KEY: env('SUPABASE_SERVICE_ROLE_KEY'),
    GITHUB_TOKEN: env('GITHUB_TOKEN'),
    GITHUB_REPO: env('GITHUB_REPO'),
    GITHUB_BRANCH: env('GITHUB_BRANCH') || 'main',
    ADMIN_EMAILS: env('ADMIN_EMAILS'),
    ALLOWED_ORIGINS: env('ALLOWED_ORIGINS'),
  }),
);
