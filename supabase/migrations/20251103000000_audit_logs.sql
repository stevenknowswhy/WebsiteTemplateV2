create table if not exists public.audit_logs (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  request_id text not null,
  actor_user_id uuid not null,
  subject_user_id uuid not null,
  action text not null check (action in ('DSR_EXPORT', 'DSR_DELETE')),
  outcome text not null check (outcome in ('SUCCESS', 'FAIL', 'QUEUED')),
  details jsonb not null default '{}'
);

-- RLS: readable by admins; insert only by service role
alter table public.audit_logs enable row level security;

create policy "audit read admins only"
on public.audit_logs
for select
using ( exists (select 1 from public.user_roles ur where ur.user_id = auth.uid() and ur.role = 'admin') );

-- Optional 'user_roles' table if not present:
create table if not exists public.user_roles (
  user_id uuid not null,
  role text not null,
  constraint user_roles_user_id_role_key unique (user_id, role)
);