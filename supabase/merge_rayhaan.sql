-- =====================================================================
--  Merge the duplicate "Rayhaan" (conflict-safe).
--  A = registered account (keep). B = seeded account (remove).
--  Both already got the imported predictions (the import matched by name),
--  so we only move rows A is missing, then delete B (cascade clears the rest).
--  Run ONCE in the SQL Editor.
-- =====================================================================
do $$
declare
  a uuid := '172a7a8c-337c-445f-a193-1fbc7200e7e3'; -- registered (keep)
  b uuid := '4c0ae797-1fb9-411e-aba7-d93c50b7bc40'; -- seeded (remove)
begin
  -- move only predictions A doesn't already have
  update public.predictions set user_id = a
    where user_id = b
      and match_id not in (select match_id from public.predictions where user_id = a);
  -- move the bracket only if A has none
  update public.brackets set user_id = a
    where user_id = b
      and not exists (select 1 from public.brackets where user_id = a);
  -- carry-over / perfect points onto the registered profile
  update public.profiles
    set gs_match_pts = 565, gs_pred_pts = 190, tourney_pts = 0, perfect_pts = 3
    where id = a;
  -- remove the duplicate (cascade clears any leftover dup predictions/bracket)
  delete from public.profiles where id = b;
end $$;

select public.recompute_brackets();
