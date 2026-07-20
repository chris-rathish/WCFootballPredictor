-- =====================================================================
--  Tournament-prediction points → profiles.tourney_pts (the "Tournament
--  Predictions" leaderboard column). One-time award, tournament is over.
--
--  Actual results:  Winner = Spain,  Golden Boot = Mbappe,
--                   Golden Glove = Unai Simon,  Player of Tournament = Rodri
--  Scoring:  50 points per correct category.
--            +50 bonus for getting all 4 correct (nobody predicted Rodri,
--              so this bonus is unearned this year).
--            +50 bonus for the MOST correct predictions (group + knockout, any
--              points): top 6 — Hari, Sunz, Rayhaan, Bhargav, Dennis, FTP.
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================
update public.profiles as p set tourney_pts = v.pts from (values
  ('Hari', 150),     -- 100 base + 50 most-correct
  ('Sunz', 150),     -- 100 base + 50 most-correct
  ('Rayhaan', 150),  -- 100 base + 50 most-correct
  ('Jashaul', 150),  -- 150 base
  ('Bhargav', 100),  --  50 base + 50 most-correct
  ('Dennis', 100),   --  50 base + 50 most-correct
  ('FTP', 100),      --  50 base + 50 most-correct
  ('Ajay', 100),
  ('Anan', 100),
  ('Chris', 100),
  ('DikTrikle', 100),
  ('Faizal', 100),
  ('Ajith', 50),
  ('Akhil', 50),
  ('Ben', 50),
  ('GPK', 50),
  ('Karthik', 50),
  ('Lan', 50),
  ('RTZ', 50),
  ('Simon', 50),
  ('Vishal', 50),
  ('Anaf', 0),
  ('Darth', 0),
  ('Katta', 0),
  ('Noodles', 0),
  ('Rage', 0),
  ('Viper', 0)
) as v(name, pts) where p.display_name = v.name;
