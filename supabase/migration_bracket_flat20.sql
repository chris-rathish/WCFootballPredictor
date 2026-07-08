-- =====================================================================
--  Bracket scoring → flat 20 points per correct advancer (every round,
--  champion and 3rd place). Replaces the old tiered 5/10/15/20/30/10.
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================
update public.settings
set pts_r16 = 20,
    pts_qf = 20,
    pts_sf = 20,
    pts_final = 20,
    pts_champion = 20,
    pts_third = 20
where id = 1;

-- re-score every bracket against results so far with the new values
select public.recompute_brackets();
