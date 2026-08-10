-- the earlier per-role revoke (0003) missed that PUBLIC itself still had
-- EXECUTE granted, which anon/authenticated inherit from - close that too
revoke execute on function public.handle_new_user() from public;
