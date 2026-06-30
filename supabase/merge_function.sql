-- =====================================================================
--  Admin-callable merge for duplicate players. Moves the "remove" profile's
--  predictions/bracket onto "keep" (conflict-safe), carries over the larger
--  point buckets, deletes the duplicate, and re-scores brackets.
--  Run ONCE in the SQL Editor to install. The Admin → Players UI calls it.
-- =====================================================================
create or replace function public.merge_profiles(keep uuid, remove uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'only admins may merge players';
  end if;
  if keep = remove then return; end if;

  -- move predictions the keep-profile doesn't already have
  update public.predictions set user_id = keep
    where user_id = remove
      and match_id not in (select match_id from public.predictions where user_id = keep);
  -- move the bracket only if keep has none
  update public.brackets set user_id = keep
    where user_id = remove
      and not exists (select 1 from public.brackets where user_id = keep);
  -- keep the larger carry-over / perfect buckets so we don't lose the seeded data
  update public.profiles k set
    gs_match_pts = greatest(k.gs_match_pts, r.gs_match_pts),
    gs_pred_pts  = greatest(k.gs_pred_pts,  r.gs_pred_pts),
    tourney_pts  = greatest(k.tourney_pts,  r.tourney_pts),
    perfect_pts  = greatest(k.perfect_pts,  r.perfect_pts),
    is_admin     = (k.is_admin or r.is_admin)
    from public.profiles r
    where k.id = keep and r.id = remove;
  -- remove the duplicate (cascade clears leftover dup predictions/bracket)
  delete from public.profiles where id = remove;

  perform public.recompute_brackets();
end;
$$;
