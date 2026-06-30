-- =====================================================================
--  Merge the duplicate "Rayhaan".
--  A = registered account (claimed, but empty)
--  B = seeded account (has carry-over points, predictions, bracket, not logged in)
--  Move B's data onto A so Rayhaan keeps his login AND his data, then delete B.
--  Run ONCE in the SQL Editor.
-- =====================================================================
do $$
declare
  a uuid := '172a7a8c-337c-445f-a193-1fbc7200e7e3'; -- registered (keep)
  b uuid := '4c0ae797-1fb9-411e-aba7-d93c50b7bc40'; -- seeded (merge & remove)
begin
  -- move predictions (A has none, so no conflicts)
  update public.predictions set user_id = a where user_id = b;
  -- move bracket
  update public.brackets set user_id = a where user_id = b;
  -- copy carry-over / perfect points onto the registered profile
  update public.profiles
    set gs_match_pts = 565, gs_pred_pts = 190, tourney_pts = 0, perfect_pts = 3
    where id = a;
  -- remove the duplicate (now empty)
  delete from public.profiles where id = b;
end $$;

-- re-score this player's bracket against current results
select public.recompute_brackets();
