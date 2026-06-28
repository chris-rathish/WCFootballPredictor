-- =====================================================================
--  Optional seed data — run AFTER schema.sql.
--  Loads the FIFA WC 2026 Round-of-32 bracket and a few knockout matches.
--  Everything here is editable later from the in-app Admin panel.
-- =====================================================================

-- A couple of example knockout matches so the app isn't empty.
-- (Add the rest, with kickoff times, from Admin -> Matches.)
insert into public.matches (stage, label, home_team, away_team, kickoff) values
  ('R32', 'RTT1', 'South Africa', 'Canada', now() + interval '1 day'),
  ('R32', 'RTT2', 'Netherlands', 'Morocco', now() + interval '1 day' + interval '3 hours'),
  ('R32', 'RTT3', 'Germany', 'Paraguay', now() + interval '2 days'),
  ('R32', 'RTT4', 'France', 'Sweden', now() + interval '2 days' + interval '3 hours');

-- The 16 Round-of-32 matchups that define everyone's bracket.
update public.settings
set bracket_r32 = '[
  {"home":"South Africa","away":"Canada"},
  {"home":"Netherlands","away":"Morocco"},
  {"home":"Germany","away":"Paraguay"},
  {"home":"France","away":"Sweden"},
  {"home":"Belgium","away":"Senegal"},
  {"home":"USA","away":"Bosnia and Herzegovina"},
  {"home":"Spain","away":"Austria"},
  {"home":"Portugal","away":"Croatia"},
  {"home":"Brazil","away":"Japan"},
  {"home":"Ivory Coast","away":"Norway"},
  {"home":"Mexico","away":"Ecuador"},
  {"home":"England","away":"DR Congo"},
  {"home":"Switzerland","away":"Algeria"},
  {"home":"Colombia","away":"Ghana"},
  {"home":"Australia","away":"Egypt"},
  {"home":"Argentina","away":"Cape Verde"}
]'::jsonb,
    bracket_deadline = now() + interval '2 days'
where id = 1;
