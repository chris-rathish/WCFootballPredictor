-- =====================================================================
--  Sync standings from the sheet's leaderboard tab (gid 464696181).
--  Group stage is final; knockout columns are all 0 there — the app scores
--  knockout automatically from here. This only sets the group-stage carry-over
--  buckets and adds the "Average" player. Run in the SQL Editor; safe to re-run.
-- =====================================================================

-- Add any players not yet present (notably "Average").
insert into public.profiles (display_name, gs_match_pts, gs_pred_pts, tourney_pts)
select v.name, v.gm, v.gp, v.tp
from (values
  ('Average', 560, 255, 0)
) as v(name, gm, gp, tp)
where not exists (select 1 from public.profiles p where p.display_name = v.name);

-- Set group-stage buckets to exactly match the sheet for everyone.
update public.profiles as p set
  gs_match_pts = v.gm,
  gs_pred_pts  = v.gp,
  tourney_pts  = v.tp
from (values
  ('Hari',      560, 255, 0),
  ('Average',   560, 255, 0),
  ('Dennis',    560, 245, 0),
  ('Bhargav',   570, 220, 0),
  ('Simon',     570, 220, 0),
  ('Chris',     560, 230, 0),
  ('Faizal',    550, 230, 0),
  ('Ajay',      540, 240, 0),
  ('Darth',     540, 235, 0),
  ('Jashaul',   525, 250, 0),
  ('Vishal',    570, 200, 0),
  ('Noodles',   550, 220, 0),
  ('RTZ',       525, 245, 0),
  ('DikTrikle', 545, 215, 0),
  ('Rayhaan',   565, 190, 0),
  ('Ben',       515, 235, 0),
  ('FTP',       490, 260, 0),
  ('Lan',       480, 270, 0),
  ('Viper',     535, 190, 0),
  ('Anan',      485, 240, 0),
  ('Akhil',     505, 165, 0),
  ('Karthik',   460, 205, 0),
  ('Ajith',     475, 170, 0),
  ('Rage',      405, 240, 0),
  ('Sunz',      420, 220, 0),
  ('GPK',       460, 155, 0),
  ('Katta',      80, 265, 0),
  ('Anaf',      175,   0, 0)
) as v(name, gm, gp, tp)
where p.display_name = v.name;
