create table if not exists public.orders (
  id uuid primary key,
  first_name text not null,
  last_name text not null,
  house_flat_number text not null,
  street text not null,
  city text not null,
  country text not null,
  phone_number text not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

drop policy if exists "No public order reads" on public.orders;
drop policy if exists "No public order writes" on public.orders;

create policy "No public order reads"
  on public.orders
  for select
  using (false);

create policy "No public order writes"
  on public.orders
  for insert
  with check (false);
