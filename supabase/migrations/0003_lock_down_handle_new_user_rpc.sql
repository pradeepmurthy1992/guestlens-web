-- handle_new_user is a trigger function, not a public API - it does not
-- need to be callable directly via PostgREST RPC by anon/authenticated
revoke execute on function public.handle_new_user() from anon, authenticated;
