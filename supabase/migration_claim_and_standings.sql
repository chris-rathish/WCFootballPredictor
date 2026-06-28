-- =====================================================================
--  MIGRATION: claim-on-login model + load current sheet standings
--  Run ONCE in the Supabase SQL Editor (New query -> paste -> Run).
--  Safe: no real predictions exist yet.
-- =====================================================================

-- 1) Decouple profiles from auth.users so players can exist before they log in.
alter table public.profiles drop constraint if exists profiles_id_fkey;
alter table public.profiles alter column id set default gen_random_uuid();
alter table public.profiles add column if not exists claimed boolean not null default false;

-- 2) Stop auto-creating a profile on signup — users now CLAIM a pre-loaded name.
drop trigger if exists on_auth_user_created on auth.users;

-- 3) Reset and load the sheet's current standings fresh.
delete from public.profiles;

-- 4) The 27 players with their group-stage carry-over (Matches / Prediction).
--    Knockout columns stay 0 and fill in from the app going forward.
insert into public.profiles (display_name, is_admin, gs_match_pts, gs_pred_pts, tourney_pts) values
  ('Chris',     true,  560, 230, 0),
  ('Hari',      false, 560, 255, 0),
  ('Dennis',    false, 560, 245, 0),
  ('Bhargav',   false, 570, 220, 0),
  ('Simon',     false, 570, 220, 0),
  ('Faizal',    false, 550, 230, 0),
  ('Ajay',      false, 540, 240, 0),
  ('Darth',     false, 540, 235, 0),
  ('Jashaul',   false, 525, 250, 0),
  ('Vishal',    false, 570, 200, 0),
  ('Noodles',   false, 550, 220, 0),
  ('RTZ',       false, 525, 245, 0),
  ('DikTrikle', false, 545, 215, 0),
  ('Rayhaan',   false, 565, 190, 0),
  ('Ben',       false, 515, 235, 0),
  ('FTP',       false, 490, 260, 0),
  ('Lan',       false, 480, 270, 0),
  ('Viper',     false, 535, 190, 0),
  ('Anan',      false, 485, 240, 0),
  ('Akhil',     false, 505, 165, 0),
  ('Karthik',   false, 460, 205, 0),
  ('Ajith',     false, 475, 170, 0),
  ('Rage',      false, 405, 240, 0),
  ('Sunz',      false, 420, 220, 0),
  ('GPK',       false, 460, 155, 0),
  ('Katta',     false,  80, 265, 0),
  ('Anaf',      false, 175,   0, 0);

-- 5) Claim policies: any signed-in user may claim an unclaimed player (trust-based pool),
--    edit their own profile, or (admin) edit anyone. Plus allow creating a brand-new player.
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (claimed = false or id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert
  with check (id = auth.uid() or public.is_admin());

-- 6) Load all 16 Round-of-32 (RTT) fixtures. Placeholder kickoffs — edit real
--    times in Admin -> Matches. (No predictions exist yet, so we reset matches.)
delete from public.matches;
insert into public.matches (stage, label, home_team, away_team, kickoff) values
  ('R32','RTT1','South Africa','Canada',                  '2026-06-28 19:00:00+00'),
  ('R32','RTT2','Netherlands','Morocco',                  '2026-06-30 01:00:00+00'),
  ('R32','RTT3','Germany','Paraguay',                     '2026-06-29 20:30:00+00'),
  ('R32','RTT4','France','Sweden',                        '2026-06-30 21:00:00+00'),
  ('R32','RTT5','Belgium','Senegal',                      '2026-07-01 20:00:00+00'),
  ('R32','RTT6','USA','Bosnia and Herzegovina',           '2026-07-02 00:00:00+00'),
  ('R32','RTT7','Spain','Austria',                        '2026-07-02 19:00:00+00'),
  ('R32','RTT8','Portugal','Croatia',                     '2026-07-02 23:00:00+00'),
  ('R32','RTT9','Brazil','Japan',                         '2026-06-29 17:00:00+00'),
  ('R32','RTT10','Ivory Coast','Norway',                  '2026-06-30 17:00:00+00'),
  ('R32','RTT11','Mexico','Ecuador',                      '2026-07-01 01:00:00+00'),
  ('R32','RTT12','England','DR Congo',                    '2026-07-01 16:00:00+00'),
  ('R32','RTT13','Switzerland','Algeria',                 '2026-07-03 03:00:00+00'),
  ('R32','RTT14','Colombia','Ghana',                      '2026-07-04 01:30:00+00'),
  ('R32','RTT15','Australia','Egypt',                     '2026-07-03 18:00:00+00'),
  ('R32','RTT16','Argentina','Cape Verde',                '2026-07-03 22:00:00+00');

-- 7) Prediction window: open from 24h before kickoff until kickoff.
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
        and now() >= m.kickoff - interval '24 hours'
        and now() <  m.kickoff
    )
  );

-- bracket_r32 + deadline were already set by seed.sql; nothing else to do.
