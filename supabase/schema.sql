-- =====================================================================
--  World Cup Predictor — database schema
--  Run this in your Supabase project: SQL Editor -> New query -> paste -> Run
-- =====================================================================

-- ---------- PROFILES ----------
-- One row per player. Players are pre-loaded (e.g. carried over from a sheet) and
-- exist before anyone logs in. On first login a user CLAIMS a player: their auth
-- id becomes that profile's id and claimed flips to true. Trust-based pool.
create table if not exists public.profiles (
  id           uuid primary key default gen_random_uuid(),
  display_name text not null,
  is_admin     boolean not null default false,
  claimed      boolean not null default false,
  -- admin-managed point buckets (e.g. carry-over from the group stage / special predictions)
  gs_match_pts int not null default 0,
  gs_pred_pts  int not null default 0,
  tourney_pts  int not null default 0,
  perfect_pts  int not null default 0,  -- manual / carry-over perfect-prediction count
  created_at   timestamptz not null default now()
);

-- ---------- TEAMS ----------
create table if not exists public.teams (
  id   serial primary key,
  name text not null unique,
  grp  text,           -- group letter (A..L) for group stage
  flag text            -- emoji flag, optional
);

-- ---------- MATCHES ----------
-- A single fixture. Knockout teams can be free text ("Winner Group A") until known.
create table if not exists public.matches (
  id          serial primary key,
  stage       text not null default 'group',  -- group | R32 | R16 | QF | SF | 3RD | FINAL
  grp         text,                           -- group letter for group-stage matches
  label       text,                           -- free label e.g. "Day 1 - Match 1"
  home_team   text not null,
  away_team   text not null,
  kickoff     timestamptz,                    -- predictions lock at this time
  home_score  int,
  away_score  int,
  motm        text,                           -- man of the match (actual)
  winner      text,                           -- team that advanced (knockout; penalties count)
  status      text not null default 'scheduled', -- scheduled | finished
  created_at  timestamptz not null default now()
);

create index if not exists matches_kickoff_idx on public.matches (kickoff);

-- ---------- PREDICTIONS ----------
create table if not exists public.predictions (
  id          serial primary key,
  user_id     uuid not null references public.profiles(id) on update cascade on delete cascade,
  match_id    int  not null references public.matches on delete cascade,
  home_score  int,
  away_score  int,
  motm        text,
  winner      text,                           -- predicted team to advance (knockout)
  points      int  not null default 0,
  updated_at  timestamptz not null default now(),
  unique (user_id, match_id)
);

-- ---------- BRACKETS ----------
-- One bracket per user, stored as JSON (advancers per round + champion).
create table if not exists public.brackets (
  user_id    uuid primary key references public.profiles(id) on update cascade on delete cascade,
  picks      jsonb not null default '{}'::jsonb,
  points     int   not null default 0,
  updated_at timestamptz not null default now()
);

-- ---------- SETTINGS ----------
-- Single-row config table (id is always 1).
create table if not exists public.settings (
  id               int primary key default 1,
  bracket_r32      jsonb not null default '[]'::jsonb,  -- 16 matchups: [{"home":"...","away":"..."}, ...]
  actual_bracket   jsonb not null default '{}'::jsonb,  -- admin-entered real advancers, same shape as picks
  bracket_deadline timestamptz,                          -- brackets lock at this time
  -- bracket scoring points per correctly predicted advancer (flat 20 each)
  pts_r16          int not null default 20,
  pts_qf           int not null default 20,
  pts_sf           int not null default 20,
  pts_final        int not null default 20,
  pts_champion     int not null default 20,
  pts_third        int not null default 20,
  constraint settings_singleton check (id = 1)
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

-- =====================================================================
--  SCORING: per-match points (5 home goals / 5 away goals / 5 outcome / 5 MOTM)
-- =====================================================================
create or replace function public.recalc_match_points(p_match_id int)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  m        record;
  pred     record;
  pts      int;
  a_out    int;   -- actual outcome: 1 home win, 0 draw, -1 away win
  p_out    int;   -- predicted outcome
begin
  select * into m from public.matches where id = p_match_id;
  if not found then return; end if;

  -- If match not finished, zero everything out.
  if m.status <> 'finished' or m.home_score is null or m.away_score is null then
    update public.predictions set points = 0 where match_id = p_match_id;
    return;
  end if;

  a_out := sign(m.home_score - m.away_score);

  for pred in select * from public.predictions where match_id = p_match_id loop
    pts := 0;
    if pred.home_score is not null and pred.home_score = m.home_score then
      pts := pts + 5;
    end if;
    if pred.away_score is not null and pred.away_score = m.away_score then
      pts := pts + 5;
    end if;
    -- outcome: knockout -> who advances (penalties count); group -> scoreline result
    if m.stage <> 'group' then
      if m.winner is not null and pred.winner is not null and pred.winner = m.winner then
        pts := pts + 5;
      end if;
    elsif pred.home_score is not null and pred.away_score is not null then
      p_out := sign(pred.home_score - pred.away_score);
      if p_out = a_out then
        pts := pts + 5;
      end if;
    end if;
    if m.motm is not null and pred.motm is not null
       and lower(btrim(pred.motm)) = lower(btrim(m.motm)) then
      pts := pts + 5;
    end if;
    update public.predictions set points = pts where id = pred.id;
  end loop;
end;
$$;

-- Recalculate whenever a match's result fields change.
create or replace function public.on_match_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  perform public.recalc_match_points(new.id);
  return new;
end;
$$;

drop trigger if exists matches_after_update on public.matches;
create trigger matches_after_update
  after update of home_score, away_score, motm, winner, status on public.matches
  for each row execute function public.on_match_change();

-- Recalculate a single prediction immediately on insert/update
-- (so a late predictor on a finished match still scores correctly — normally locked though).
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

drop trigger if exists predictions_before_write on public.predictions;
create trigger predictions_before_write
  before insert or update on public.predictions
  for each row execute function public.on_prediction_change();

-- =====================================================================
--  LEADERBOARD VIEW (match points + bracket points)
-- =====================================================================
--  Columns mirror the tracking sheet: group/knockout match points (auto from
--  predictions, split by match stage), the knockout bracket, plus admin-managed
--  buckets for group-stage carry-over and tournament-wide predictions.
drop view if exists public.leaderboard;
create view public.leaderboard as
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
    -- a "perfect" prediction = the full 20 points (exact score + outcome/winner + MOTM)
    count(*) filter (where m.status = 'finished' and pr.points = 20) as perfect
  from public.predictions pr
  join public.matches m on m.id = pr.match_id
  group by pr.user_id
) mp on mp.user_id = p.id
left join public.brackets b on b.user_id = p.id;

-- =====================================================================
--  ROW LEVEL SECURITY
-- =====================================================================
alter table public.profiles    enable row level security;
alter table public.teams       enable row level security;
alter table public.matches     enable row level security;
alter table public.predictions enable row level security;
alter table public.brackets    enable row level security;
alter table public.settings    enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- PROFILES: everyone can read names; claim an unclaimed player, edit your own, or
-- (admin) edit anyone; signed-in users can also create a brand-new player.
drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select using (true);
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (claimed = false or id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert
  with check (id = auth.uid() or public.is_admin());

-- TEAMS: everyone reads; admins write.
drop policy if exists teams_read on public.teams;
create policy teams_read on public.teams for select using (true);
drop policy if exists teams_admin on public.teams;
create policy teams_admin on public.teams for all
  using (public.is_admin()) with check (public.is_admin());

-- MATCHES: everyone reads; admins write.
drop policy if exists matches_read on public.matches;
create policy matches_read on public.matches for select using (true);
drop policy if exists matches_admin on public.matches;
create policy matches_admin on public.matches for all
  using (public.is_admin()) with check (public.is_admin());

-- SETTINGS: everyone reads; admins write.
drop policy if exists settings_read on public.settings;
create policy settings_read on public.settings for select using (true);
drop policy if exists settings_admin on public.settings;
create policy settings_admin on public.settings for all
  using (public.is_admin()) with check (public.is_admin());

-- PREDICTIONS:
--  read: your own always; others' only after kickoff (or match finished).
drop policy if exists predictions_read on public.predictions;
create policy predictions_read on public.predictions for select using (
  auth.uid() = user_id
  or exists (
    select 1 from public.matches m
    where m.id = match_id
      -- others revealed once predictions close (1h before kickoff) or match finished
      and (m.status = 'finished' or (m.kickoff is not null and now() >= m.kickoff - interval '1 hour'))
  )
);
--  write: only your own, and only before kickoff while scheduled.
drop policy if exists predictions_write on public.predictions;
create policy predictions_write on public.predictions for all
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.matches m
      where m.id = match_id
        and m.status = 'scheduled'
        and m.kickoff is not null
        and now() < m.kickoff - interval '1 hour'      -- open until 1h before kickoff
    )
  );
--  admins can read & edit anyone's predictions, any time (overview/correction tool).
drop policy if exists predictions_admin on public.predictions;
create policy predictions_admin on public.predictions for all
  using (public.is_admin()) with check (public.is_admin());

-- =====================================================================
--  BRACKET SCORING — actual results are DERIVED from finished knockout
--  matches (winners by stage). Recomputed automatically on match changes.
-- =====================================================================
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
  select coalesce(array_agg(winner), '{}') into a_r16   from public.matches where stage = 'R32'   and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_qf    from public.matches where stage = 'R16'   and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_sf    from public.matches where stage = 'QF'    and status = 'finished' and winner is not null;
  select coalesce(array_agg(winner), '{}') into a_final from public.matches where stage = 'SF'    and status = 'finished' and winner is not null;
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

-- admin-callable wrapper (the "re-score" button)
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

-- recompute brackets automatically when a match result changes
create or replace function public.on_match_bracket_sync()
returns trigger language plpgsql security definer set search_path = public
as $$ begin perform public.recompute_brackets(); return new; end; $$;

drop trigger if exists matches_bracket_sync on public.matches;
create trigger matches_bracket_sync
  after update of winner, status on public.matches
  for each row execute function public.on_match_bracket_sync();

-- BRACKETS:
--  read: your own always; others' only after the bracket deadline.
drop policy if exists brackets_read on public.brackets;
create policy brackets_read on public.brackets for select using (
  auth.uid() = user_id
  or exists (
    select 1 from public.settings s
    where s.bracket_deadline is not null and s.bracket_deadline <= now()
  )
);
--  write: only your own, and only before the deadline.
drop policy if exists brackets_write on public.brackets;
create policy brackets_write on public.brackets for all
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and not exists (
      select 1 from public.settings s
      where s.bracket_deadline is not null and s.bracket_deadline <= now()
    )
  );
--  admins can read & edit anyone's bracket, any time.
drop policy if exists brackets_admin on public.brackets;
create policy brackets_admin on public.brackets for all
  using (public.is_admin()) with check (public.is_admin());
