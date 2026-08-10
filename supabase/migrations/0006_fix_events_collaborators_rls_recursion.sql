-- events <-> event_collaborators policies referenced each other directly,
-- causing "infinite recursion detected in policy for relation events".
-- Break the cycle with security-definer helper functions: their internal
-- queries run with elevated privilege and bypass RLS, so they don't
-- re-trigger the calling table's policies.
create function public.is_event_owner(p_event_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(
    select 1 from public.events
    where id = p_event_id and owner_id = auth.uid()
  );
$$;

create function public.is_event_collaborator(p_event_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(
    select 1 from public.event_collaborators
    where event_id = p_event_id and email = (auth.jwt() ->> 'email')
  );
$$;

-- anon/authenticated must be able to call these directly, because RLS
-- policy evaluation runs as the querying role - without EXECUTE the
-- policies that reference these functions would fail outright
revoke execute on function public.is_event_owner(uuid) from public;
revoke execute on function public.is_event_collaborator(uuid) from public;
grant execute on function public.is_event_owner(uuid) to anon, authenticated;
grant execute on function public.is_event_collaborator(uuid) to anon, authenticated;

drop policy "events are viewable by invited collaborators" on public.events;
create policy "events are viewable by invited collaborators"
  on public.events for select
  using (public.is_event_collaborator(id));

drop policy "owners manage their event collaborators" on public.event_collaborators;
create policy "owners manage their event collaborators"
  on public.event_collaborators for all
  using (public.is_event_owner(event_id))
  with check (public.is_event_owner(event_id));

drop policy "owners and collaborators can add professional media" on public.media;
create policy "owners and collaborators can add professional media"
  on public.media for insert
  with check (
    is_professional = true
    and exists (select 1 from public.events where events.id = media.event_id and events.status is not null)
    and (public.is_event_owner(event_id) or public.is_event_collaborator(event_id))
  );
