-- the events existence check was redundant: is_event_owner/is_event_collaborator
-- already return false for a nonexistent event, and this dropped an
-- unnecessary query against events from the hot insert path
drop policy "owners and collaborators can add professional media" on public.media;
create policy "owners and collaborators can add professional media"
  on public.media for insert
  with check (
    is_professional = true
    and (public.is_event_owner(event_id) or public.is_event_collaborator(event_id))
  );
