-- profiles: one row per auth user
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- auto-create a profile row whenever a new auth user signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- events: one row per wedding event
create table public.events (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  bride_name text not null,
  groom_name text not null,
  wedding_date date not null,
  reveal_date date,
  photographer_name text,
  cover_image_url text,
  status text not null default 'active' check (status in ('draft', 'active', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create policy "events are viewable by owner"
  on public.events for select
  using (auth.uid() = owner_id);

create policy "events are insertable by owner"
  on public.events for insert
  with check (auth.uid() = owner_id);

create policy "events are editable by owner"
  on public.events for update
  using (auth.uid() = owner_id);

create policy "events are deletable by owner"
  on public.events for delete
  using (auth.uid() = owner_id);

create index events_owner_id_idx on public.events (owner_id);
