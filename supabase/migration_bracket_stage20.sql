-- =====================================================================
--  Bracket scoring → 20 points per STAGE predicted fully correctly.
--  A stage scores 20 only if EVERY advancer in it is correct, else 0:
--    Stage 1  all R32 winners (the 16 who reach R16)  → 20
--    Stage 2  all R16 winners (the 8 who reach QF)    → 20
--    Stage 3  all QF winners  (the 4 who reach SF)    → 20
--    Stage 4  both finalists  (the 2 SF winners)      → 20
--    Stage 5  champion + third place (both correct)   → 20
--  Max 100. Replaces the old per-pick scoring.
--  Also shows bracket points on the leaderboard as stages complete
--  (previously hidden until the FINAL was played).
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================

create or replace function public.recompute_brackets()
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  b        record;
  pts      int;
  c        int;
  a_r16    text[];
  a_qf     text[];
  a_sf     text[];
  a_final  text[];
  a_champ  text;
  a_third  text;
  g_r32    int;
  g_r16    int;
  g_qf     int;
  g_sf     int;
begin
  select coalesce(array_agg(winner), '{}') into a_r16   from public.matches where stage = 'R32'   and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_qf    from public.matches where stage = 'R16'   and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_sf    from public.matches where stage = 'QF'    and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_final from public.matches where stage = 'SF'    and status = 'finished' and winner is not null;
  select winner into a_champ from public.matches where stage = 'FINAL' and status = 'finished' and winner is not null limit 1;
  select winner into a_third from public.matches where stage = '3RD'   and status = 'finished' and winner is not null limit 1;

  select count(*) into g_r32 from public.matches where stage = 'R32';
  select count(*) into g_r16 from public.matches where stage = 'R16';
  select count(*) into g_qf  from public.matches where stage = 'QF';
  select count(*) into g_sf  from public.matches where stage = 'SF';

  for b in select * from public.brackets loop
    pts := 0;
    select count(*) into c from jsonb_array_elements_text(coalesce(b.picks->'R16','[]'::jsonb)) as x(pick) where x.pick = any(a_r16);
    if g_r32 > 0 and c = g_r32 then pts := pts + 20; end if;
    select count(*) into c from jsonb_array_elements_text(coalesce(b.picks->'QF','[]'::jsonb)) as x(pick) where x.pick = any(a_qf);
    if g_r16 > 0 and c = g_r16 then pts := pts + 20; end if;
    select count(*) into c from jsonb_array_elements_text(coalesce(b.picks->'SF','[]'::jsonb)) as x(pick) where x.pick = any(a_sf);
    if g_qf > 0 and c = g_qf then pts := pts + 20; end if;
    select count(*) into c from jsonb_array_elements_text(coalesce(b.picks->'FINAL','[]'::jsonb)) as x(pick) where x.pick = any(a_final);
    if g_sf > 0 and c = g_sf then pts := pts + 20; end if;
    if a_champ is not null and a_third is not null
       and b.picks->>'CHAMPION' = a_champ and b.picks->>'THIRD' = a_third then
      pts := pts + 20;
    end if;
    update public.brackets set points = pts where user_id = b.user_id;
  end loop;
end;
$$;

-- Show bracket points live (as each stage completes), not only after the FINAL.
drop view if exists public.leaderboard;
create view public.leaderboard as
select
  p.id                                                                          as user_id,
  p.display_name,
  p.gs_match_pts + coalesce(mp.group_pts, 0)                                    as group_stage_matches,
  p.gs_pred_pts                                                                 as group_stage_prediction,
  coalesce(mp.ko_pts, 0)                                                        as knockout_stage_matches,
  coalesce(b.points, 0)                                                         as knockout_stage_prediction,
  p.tourney_pts                                                                 as tournament_predictions,
  p.gs_match_pts + coalesce(mp.group_pts, 0)
    + p.gs_pred_pts
    + coalesce(mp.ko_pts, 0)
    + coalesce(b.points, 0)
    + p.tourney_pts                                                            as total_points,
  p.perfect_pts + coalesce(mp.perfect, 0)                                       as perfect_predictions
from public.profiles p
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

-- re-score every bracket with the new stage rules
select public.recompute_brackets();
