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
  ('R32','RTT1','South Africa','Canada',                  now() + interval '1 day' + interval '13 hours'),
  ('R32','RTT2','Netherlands','Morocco',                  now() + interval '1 day' + interval '16 hours'),
  ('R32','RTT3','Germany','Paraguay',                     now() + interval '1 day' + interval '19 hours'),
  ('R32','RTT4','France','Sweden',                        now() + interval '1 day' + interval '22 hours'),
  ('R32','RTT5','Belgium','Senegal',                      now() + interval '2 days' + interval '13 hours'),
  ('R32','RTT6','USA','Bosnia and Herzegovina',           now() + interval '2 days' + interval '16 hours'),
  ('R32','RTT7','Spain','Austria',                        now() + interval '2 days' + interval '19 hours'),
  ('R32','RTT8','Portugal','Croatia',                     now() + interval '2 days' + interval '22 hours'),
  ('R32','RTT9','Brazil','Japan',                         now() + interval '3 days' + interval '13 hours'),
  ('R32','RTT10','Ivory Coast','Norway',                  now() + interval '3 days' + interval '16 hours'),
  ('R32','RTT11','Mexico','Ecuador',                      now() + interval '3 days' + interval '19 hours'),
  ('R32','RTT12','England','DR Congo',                    now() + interval '3 days' + interval '22 hours'),
  ('R32','RTT13','Switzerland','Algeria',                 now() + interval '4 days' + interval '13 hours'),
  ('R32','RTT14','Colombia','Ghana',                      now() + interval '4 days' + interval '16 hours'),
  ('R32','RTT15','Australia','Egypt',                     now() + interval '4 days' + interval '19 hours'),
  ('R32','RTT16','Argentina','Cape Verde',                now() + interval '4 days' + interval '22 hours');

-- bracket_r32 + deadline were already set by seed.sql; nothing else to do.
