# Seed data — remove before launch

The landing page shows a live trust-stats bar ("N weddings on Iniya Kadhai
· N memories collected"), pulled from `get_platform_stats()`. It hides
itself automatically once the event count is 0, so there's nothing to
toggle in code.

A demo event was previously seeded (and later deleted) to keep this
non-zero during early testing. If seeding one again, insert it directly in
Supabase (not through the app), find it the same way:

```sql
select id, slug, bride_name, groom_name from public.events
where slug = 'demo-seed-do-not-use';
```

To reset to real numbers before public launch, delete it and its media:

```sql
delete from public.media
where event_id = (select id from public.events where slug = 'demo-seed-do-not-use');

delete from public.events where slug = 'demo-seed-do-not-use';
```

The stats bar will then disappear from the landing page until your first real
event goes live, at which point it reappears on its own.
