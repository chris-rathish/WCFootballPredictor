-- =====================================================================
--  MIGRATION: mandatory winner pick for knockout matches (penalties)
--  Adds a "winner" (advancing team) to matches + predictions and makes the
--  outcome point use it for knockout games. Run ONCE in the SQL Editor.
--  Safe to re-run.
-- =====================================================================

alter table public.matches     add column if not exists winner text;
alter table public.predictions add column if not exists winner text;

-- ---- per-match scoring: knockout outcome uses the winner, group uses scoreline ----
create or replace function public.recalc_match_points(p_match_id int)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  m     record;
  pred  record;
  pts   int;
  a_out int;
  p_out int;
begin
  select * into m from public.matches where id = p_match_id;
  if not found then return; end if;

  if m.status <> 'finished' or m.home_score is null or m.away_score is null then
    update public.predictions set points = 0 where match_id = p_match_id;
    return;
  end if;

  a_out := sign(m.home_score - m.away_score);

  for pred in select * from public.predictions where match_id = p_match_id loop
    pts := 0;
    if pred.home_score is not null and pred.home_score = m.home_score then pts := pts + 5; end if;
    if pred.away_score is not null and pred.away_score = m.away_score then pts := pts + 5; end if;
    if m.stage <> 'group' then
      if m.winner is not null and pred.winner is not null and pred.winner = m.winner then pts := pts + 5; end if;
    elsif pred.home_score is not null and pred.away_score is not null then
      p_out := sign(pred.home_score - pred.away_score);
      if p_out = a_out then pts := pts + 5; end if;
    end if;
    if m.motm is not null and pred.motm is not null
       and lower(btrim(pred.motm)) = lower(btrim(m.motm)) then pts := pts + 5; end if;
    update public.predictions set points = pts where id = pred.id;
  end loop;
end;
$$;

-- recalc when winner changes too
drop trigger if exists matches_after_update on public.matches;
create trigger matches_after_update
  after update of home_score, away_score, motm, winner, status on public.matches
  for each row execute function public.on_match_change();

-- ---- per-prediction scoring (on insert/update) ----
create or replace function public.on_prediction_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  m     record;
  pts   int;
  a_out int;
begin
  select * into m from public.matches where id = new.match_id;
  pts := 0;
  if found and m.status = 'finished' and m.home_score is not null and m.away_score is not null then
    a_out := sign(m.home_score - m.away_score);
    if new.home_score = m.home_score then pts := pts + 5; end if;
    if new.away_score = m.away_score then pts := pts + 5; end if;
    if m.stage <> 'group' then
      if m.winner is not null and new.winner is not null and new.winner = m.winner then pts := pts + 5; end if;
    elsif new.home_score is not null and new.away_score is not null
       and sign(new.home_score - new.away_score) = a_out then pts := pts + 5; end if;
    if m.motm is not null and new.motm is not null
       and lower(btrim(new.motm)) = lower(btrim(m.motm)) then pts := pts + 5; end if;
  end if;
  new.points := pts;
  new.updated_at := now();
  return new;
end;
$$;

-- ---- leaderboard: "perfect" = full 20 points ----
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
  coalesce(mp.perfect, 0)                                                       as perfect_predictions
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
