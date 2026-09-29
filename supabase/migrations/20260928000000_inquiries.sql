-- Anfragen der Website (F). Region: EU (beim Anlegen des Projekts wählen, z. B. eu-central-1 Frankfurt).
-- Zugriff nur über den Service-Role-Schlüssel der Edge Function; RLS ohne Policies sperrt alles andere.

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('location', 'voiture', 'atelier', 'contact')),
  lang text not null check (lang in ('fr', 'de', 'lb', 'en', 'pt')),
  name text not null,
  phone text not null,
  email text,
  subject text not null,
  payload jsonb not null,
  mail_status text not null default 'pending' check (mail_status in ('pending', 'sent', 'failed')),
  mail_error text
);
create index if not exists inquiries_created_at_idx on public.inquiries (created_at);
alter table public.inquiries enable row level security;

-- Rate-Limit: nur ein SHA-256-Hash der IP (mit Salt), 24 Stunden
create table if not exists public.inquiry_rate (
  id bigserial primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists inquiry_rate_hash_idx on public.inquiry_rate (ip_hash, created_at);
alter table public.inquiry_rate enable row level security;

-- Automatisch löschen: Anfragen nach 90 Tagen, IP-Hashes nach 24 Stunden
create extension if not exists pg_cron;

select cron.schedule(
  'purge-inquiries-90-days',
  '17 3 * * *',
  $$delete from public.inquiries where created_at < now() - interval '90 days'$$
);

select cron.schedule(
  'purge-inquiry-rate-24-hours',
  '*/30 * * * *',
  $$delete from public.inquiry_rate where created_at < now() - interval '24 hours'$$
);
