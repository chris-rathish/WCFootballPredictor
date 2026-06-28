-- =====================================================================
--  MIGRATION: editable "perfect predictions" count per player.
--  Adds a manual perfect_pts bucket (e.g. group-stage carry-over) that the
--  admin can edit; the leaderboard's Perfect column = manual + auto (full-20 hits).
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================

alter table public.profiles add column if not exists perfect_pts int not null default 0;

create or replace view public.leaderboard as
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
