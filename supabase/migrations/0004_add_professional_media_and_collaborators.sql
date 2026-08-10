-- distinguish photographer deliverables from guest contributions
alter table public.media add column is_professional boolean not null default false;

-- the existing guest-insert policy allowed setting is_professional freely;
-- replace it with one that pins guest inserts to non-professional only
drop policy "anyone can add media to active events" on public.media;

create policy "anyone can add non-professional media to active events"
  on public.media for insert
  with check (
    is_professional = false
    and exists (
      select 1 from public.events
      where events.id = media.event_id
      and events.status = 'active'
    )
  );

-- event_collaborators: couples invite photographers by email to a specific event
create table public.event_collaborators (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  email text not null,
  role text not null default 'photographer' check (role in ('photographer')),
  created_at timestamptz not null default now(),
  unique (event_id, email)
);

alter table public.event_collaborators enable row level security;

create policy "owners manage their event collaborators"
  on public.event_collaborators for all
  using (
    exists (
      select 1 from public.events
      where events.id = event_collaborators.event_id
      and events.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.events
      where events.id = event_collaborators.event_id
      and events.owner_id = auth.uid()
    )
  );

create policy "collaborators can see their own invitations"
  on public.event_collaborators for select
  using (email = (auth.jwt() ->> 'email'));

-- collaborators (and owners, already covered) can upload professional media
create policy "owners and collaborators can add professional media"
  on public.media for insert
  with check (
    is_professional = true
    and exists (
      select 1 from public.events
      where events.id = media.event_id
      and (
        events.owner_id = auth.uid()
        or exists (
          select 1 from public.event_collaborators
          where event_collaborators.event_id = events.id
          and event_collaborators.email = (auth.jwt() ->> 'email')
        )
      )
    )
  );

-- invited photographers can view the event itself (not just media)
create policy "events are viewable by invited collaborators"
  on public.events for select
  using (
    exists (
      select 1 from public.event_collaborators
      where event_collaborators.event_id = events.id
      and event_collaborators.email = (auth.jwt() ->> 'email')
    )
  );

create index event_collaborators_event_id_idx on public.event_collaborators (event_id);
create index event_collaborators_email_idx on public.event_collaborators (email);

-- payments placeholder: which plan an event is on
alter table public.events add column plan text not null default 'free' check (plan in ('free', 'premium'));
