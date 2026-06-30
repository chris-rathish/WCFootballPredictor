-- =====================================================================
--  MIGRATION: live bracket scoring from match results + leaderboard gating.
--  - Bracket "actual" results are DERIVED from finished knockout matches
--    (winners by stage), so scoring updates automatically when an admin
--    enters a result. No separate "actual bracket" entry needed.
--  - brackets.points is recomputed on every match winner/status change.
--  - The leaderboard's Knockout Stage Prediction column stays 0 until the
--    FINAL is played, then shows each bracket's final score.
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================

-- Recompute every bracket's points against the actual results so far.
create or replace function public.recompute_brackets()
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  s        record;
  b        record;
  pts      int;
  t        text;
  a_r16    text[];
  a_qf     text[];
  a_sf     text[];
  a_final  text[];
  a_champ  text;
  a_third  text;
begin
  select * into s from public.settings where id = 1;

  select coalesce(array_agg(winner), '{}') into a_r16  from public.matches where stage = 'R32'   and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_qf   from public.matches where stage = 'R16'   and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_sf   from public.matches where stage = 'QF'    and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_final from public.matches where stage = 'SF'   and status = 'finished' and winner is not null;
  select winner into a_champ from public.matches where stage = 'FINAL' and status = 'finished' and winner is not null limit 1;
  select winner into a_third from public.matches where stage = '3RD'   and status = 'finished' and winner is not null limit 1;

  for b in select * from public.brackets loop
    pts := 0;
    for t in select jsonb_array_elements_text(coalesce(b.picks->'R16','[]'::jsonb)) loop
      if t = any(a_r16) then pts := pts + s.pts_r16; end if;
    end loop;
    for t in select jsonb_array_elements_text(coalesce(b.picks->'QF','[]'::jsonb)) loop
      if t = any(a_qf) then pts := pts + s.pts_qf; end if;
    end loop;
    for t in select jsonb_array_elements_text(coalesce(b.picks->'SF','[]'::jsonb)) loop
      if t = any(a_sf) then pts := pts + s.pts_sf; end if;
    end loop;
    for t in select jsonb_array_elements_text(coalesce(b.picks->'FINAL','[]'::jsonb)) loop
      if t = any(a_final) then pts := pts + s.pts_final; end if;
    end loop;
    if a_champ is not null and b.picks->>'CHAMPION' = a_champ then pts := pts + s.pts_champion; end if;
    if a_third is not null and b.picks->>'THIRD' = a_third then pts := pts + s.pts_third; end if;
    update public.brackets set points = pts where user_id = b.user_id;
  end loop;
end;
$$;

-- Admin-callable wrapper (keeps the existing "re-score" button working).
create or replace function public.recalc_all_brackets()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'only admins may recalc brackets';
  end if;
  perform public.recompute_brackets();
end;
$$;

-- Recompute brackets automatically whenever a match result changes.
create or replace function public.on_match_bracket_sync()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  perform public.recompute_brackets();
  return new;
end;
$$;

drop trigger if exists matches_bracket_sync on public.matches;
create trigger matches_bracket_sync
  after update of winner, status on public.matches
  for each row execute function public.on_match_bracket_sync();

-- ---- Leaderboard: bracket points count only once the FINAL is played ----
create or replace view public.leaderboard as
select
  p.id                                                                          as user_id,
  p.display_name,
  p.gs_match_pts + coalesce(mp.group_pts, 0)                                    as group_stage_matches,
  p.gs_pred_pts                                                                 as group_stage_prediction,
  coalesce(mp.ko_pts, 0)                                                        as knockout_stage_matches,
  case when tourney.over then coalesce(b.points, 0) else 0 end                  as knockout_stage_prediction,
  p.tourney_pts                                                                 as tournament_predictions,
  p.gs_match_pts + coalesce(mp.group_pts, 0)
    + p.gs_pred_pts
    + coalesce(mp.ko_pts, 0)
    + (case when tourney.over then coalesce(b.points, 0) else 0 end)
    + p.tourney_pts                                                            as total_points,
  p.perfect_pts + coalesce(mp.perfect, 0)                                       as perfect_predictions
from public.profiles p
cross join (select exists (select 1 from public.matches where stage = 'FINAL' and status = 'finished') as over) tourney
left join (
  select pr.user_id,
    sum(case when m.stage = 'group' then pr.points else 0 end) as group_pts,
    sum(case when m.stage <> 'group' then pr.points else 0 end) as ko_pts,
    count(*) filter (where m.status = 'finished' and pr.points = 20) as perfect
  from public.predictions pr
  join public.matches m on m.id = pr.match_id
  group by pr.user_id
) mp on mp.user_id = p.id
left join public.brackets b on b.user_id = p.id;

-- score the just-imported brackets against current results
select public.recompute_brackets();
