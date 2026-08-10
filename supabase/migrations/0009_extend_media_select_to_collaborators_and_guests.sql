-- owner and invited photographer both get full, ungated access to their event's media
drop policy "media is viewable by event owner" on public.media;
create policy "media is viewable by owner or collaborator"
  on public.media for select
  using (public.is_event_owner(event_id) or public.is_event_collaborator(event_id));

-- anyone holding the event link can view media, but only once the event
-- is revealed (or has no reveal date) - same "link is the credential" model
-- already used for guest uploads. Blocked entirely before reveal, even
-- if someone has the link.
create policy "revealed event media is viewable by anyone with the link"
  on public.media for select
  using (
    exists (
      select 1 from public.events
      where events.id = media.event_id
      and events.status = 'active'
      and (events.reveal_date is null or events.reveal_date <= current_date)
    )
  );
