-- Protokoll des Admin-Bereichs auf der Website: wer hat wann was veröffentlicht.
-- Schreibt nur die Edge Function `publish` (Service-Role); RLS ohne Policies sperrt alles andere.
-- Die Inhalte selbst liegen versioniert im GitHub-Repository (jeder Speichervorgang = ein Commit).

create table if not exists public.admin_changes (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  user_email text not null,
  summary text not null,
  commit_sha text not null
);
create index if not exists admin_changes_created_at_idx on public.admin_changes (created_at desc);
alter table public.admin_changes enable row level security;
