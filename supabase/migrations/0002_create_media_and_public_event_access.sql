-- allow anyone to read the minimal fields needed for a guest landing page,
-- but only for events the owner has published (active)
create policy "active events are viewable by anyone"
  on public.events for select
  using (status = 'active');

-- media: photos, videos, voice wishes, and text-only messages guests leave
create table public.media (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  type text not null check (type in ('photo', 'video', 'voice', 'message')),
  storage_path text,
  message text,
  uploader_name text,
  created_at timestamptz not null default now(),
  constraint media_storage_path_required check (
    (type = 'message' and storage_path is null)
    or (type <> 'message' and storage_path is not null)
  )
);

alter table public.media enable row level security;

-- event owners can see everything uploaded to their event
create policy "media is viewable by event owner"
  on public.media for select
  using (
    exists (
      select 1 from public.events
      where events.id = media.event_id
      and events.owner_id = auth.uid()
    )
  );

-- anyone (including anonymous guests) can add media to an active event
create policy "anyone can add media to active events"
  on public.media for insert
  with check (
    exists (
      select 1 from public.events
      where events.id = media.event_id
      and events.status = 'active'
    )
  );

create index media_event_id_idx on public.media (event_id);

-- storage bucket for guest-uploaded photos/videos/voice notes
insert into storage.buckets (id, name, public)
values ('event-media', 'event-media', true);

-- uploads must be placed under a folder named after an existing active event id
create policy "anyone can upload to active event folders"
  on storage.objects for insert
  with check (
    bucket_id = 'event-media'
    and exists (
      select 1 from public.events
      where events.id::text = (storage.foldername(name))[1]
      and events.status = 'active'
    )
  );

create policy "event media is publicly readable"
  on storage.objects for select
  using (bucket_id = 'event-media');
