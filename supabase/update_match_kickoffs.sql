-- =====================================================================
--  Real Round-of-32 kickoff times (FIFA World Cup 2026), official schedule.
--  Times sourced in Eastern Time (ET = UTC−4 in late June/July) and stored
--  here as UTC (+00). The app shows each viewer their own local time.
--  Run in the Supabase SQL Editor. Safe to re-run (idempotent, keyed by label).
-- =====================================================================

update public.matches set kickoff = '2026-06-28 19:00:00+00' where label = 'RTT1';   -- South Africa v Canada      (Jun 28, 3:00 PM ET)
update public.matches set kickoff = '2026-06-30 01:00:00+00' where label = 'RTT2';   -- Netherlands v Morocco      (Jun 29, 9:00 PM ET)
update public.matches set kickoff = '2026-06-29 20:30:00+00' where label = 'RTT3';   -- Germany v Paraguay         (Jun 29, 4:30 PM ET)
update public.matches set kickoff = '2026-06-30 21:00:00+00' where label = 'RTT4';   -- France v Sweden            (Jun 30, 5:00 PM ET)
update public.matches set kickoff = '2026-07-01 20:00:00+00' where label = 'RTT5';   -- Belgium v Senegal          (Jul 1, 4:00 PM ET)
update public.matches set kickoff = '2026-07-02 00:00:00+00' where label = 'RTT6';   -- USA v Bosnia & Herzegovina (Jul 1, 8:00 PM ET)
update public.matches set kickoff = '2026-07-02 19:00:00+00' where label = 'RTT7';   -- Spain v Austria            (Jul 2, 3:00 PM ET)
update public.matches set kickoff = '2026-07-02 23:00:00+00' where label = 'RTT8';   -- Portugal v Croatia         (Jul 2, 7:00 PM ET)
update public.matches set kickoff = '2026-06-29 17:00:00+00' where label = 'RTT9';   -- Brazil v Japan             (Jun 29, 1:00 PM ET)
update public.matches set kickoff = '2026-06-30 17:00:00+00' where label = 'RTT10';  -- Ivory Coast v Norway       (Jun 30, 1:00 PM ET)
update public.matches set kickoff = '2026-07-01 01:00:00+00' where label = 'RTT11';  -- Mexico v Ecuador           (Jun 30, 9:00 PM ET)
update public.matches set kickoff = '2026-07-01 16:00:00+00' where label = 'RTT12';  -- England v DR Congo         (Jul 1, 12:00 PM ET)
update public.matches set kickoff = '2026-07-03 03:00:00+00' where label = 'RTT13';  -- Switzerland v Algeria      (Jul 2, 11:00 PM ET)
update public.matches set kickoff = '2026-07-04 01:30:00+00' where label = 'RTT14';  -- Colombia v Ghana           (Jul 3, 9:30 PM ET)
update public.matches set kickoff = '2026-07-03 18:00:00+00' where label = 'RTT15';  -- Australia v Egypt          (Jul 3, 2:00 PM ET)
update public.matches set kickoff = '2026-07-03 22:00:00+00' where label = 'RTT16';  -- Argentina v Cape Verde     (Jul 3, 6:00 PM ET)
