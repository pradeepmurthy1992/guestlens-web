-- aggregate-only public stats for the landing page trust bar.
-- Security definer so it can count across all events/media without
-- exposing individual rows (RLS on those tables stays fully locked down -
-- this only ever returns two numbers, never row content).
create function public.get_platform_stats()
returns table(event_count bigint, media_count bigint)
language sql
security definer
set search_path = public
stable
as $$
  select
    (select count(*) from public.events where status = 'active') as event_count,
    (select count(*) from public.media) as media_count;
$$;

revoke execute on function public.get_platform_stats() from public;
grant execute on function public.get_platform_stats() to anon, authenticated;
