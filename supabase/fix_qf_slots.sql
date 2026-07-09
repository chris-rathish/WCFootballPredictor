-- =====================================================================
--  Fix QF slot swap. The QF pairings are correct (bracket intact) but two
--  matches landed on each other's schedule slot because R16 winners were
--  ordered by kickoff instead of bracket position (a labelNum bug — every
--  "R16-x" label matched "16"). Real schedule:
--    QF-2  Fri Jul 10 (Inglewood) = Belgium/Spain
--    QF-3  Sat Jul 11 (Miami)     = Norway/England
--  So swap the (label, kickoff) of the two rows. Teams/home-away/predictions
--  stay attached to their match_id — only the slot changes.
--  Run ONCE in the SQL Editor. IDs below match the current data.
-- =====================================================================

-- Spain v Belgium  → QF-2, Fri Jul 10 19:00 UTC
update public.matches
set label = 'QF-2', kickoff = '2026-07-10T19:00:00Z'
where stage = 'QF' and home_team = 'Spain' and away_team = 'Belgium';

-- Norway v England → QF-3, Sat Jul 11 21:00 UTC
update public.matches
set label = 'QF-3', kickoff = '2026-07-11T21:00:00Z'
where stage = 'QF' and home_team = 'Norway' and away_team = 'England';
