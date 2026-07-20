-- =====================================================================
--  Tournament-prediction points → profiles.tourney_pts (the "Tournament
--  Predictions" leaderboard column). One-time award, tournament is over.
--
--  Actual results:  Winner = Spain,  Golden Boot = Mbappe,
--                   Golden Glove = Unai Simon,  Player of Tournament = Rodri
--  Scoring:  50 points per correct category.
--            +50 bonus for getting all 4 correct (nobody predicted Rodri,
--              so this bonus is unearned this year).
--            +50 bonus for the most perfect predictions — a 4-way tie at 6
--              (Viper, GPK, Rayhaan, Hari), so all four get it.
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================
update public.profiles as p set tourney_pts = v.pts from (values
  ('Hari', 150),     -- 100 base + 50 most-perfect
  ('Rayhaan', 150),  -- 100 base + 50 most-perfect
  ('Jashaul', 150),  -- 150 base
  ('Ajay', 100),
  ('Anan', 100),
  ('Chris', 100),
  ('DikTrikle', 100),
  ('Faizal', 100),
  ('GPK', 100),      --  50 base + 50 most-perfect
  ('Sunz', 100),
  ('Ajith', 50),
  ('Akhil', 50),
  ('Ben', 50),
  ('Bhargav', 50),
  ('Dennis', 50),
  ('FTP', 50),
  ('Karthik', 50),
  ('Lan', 50),
  ('RTZ', 50),
  ('Simon', 50),
  ('Viper', 50),     --   0 base + 50 most-perfect
  ('Vishal', 50),
  ('Anaf', 0),
  ('Darth', 0),
  ('Katta', 0),
  ('Noodles', 0),
  ('Rage', 0)
) as v(name, pts) where p.display_name = v.name;
