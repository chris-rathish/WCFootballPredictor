-- =====================================================================
--  FIX: predictions/brackets foreign keys should point at profiles(id),
--  not auth.users. In the claim-on-login model a player's profile id is a
--  random UUID until they log in, so admin-entered picks for not-yet-joined
--  players failed the old FK to auth.users.
--  ON UPDATE CASCADE keeps picks attached when a player claims (their
--  profile id changes from the random UUID to their auth uid).
--  Run ONCE in the SQL Editor. Safe to re-run.
-- =====================================================================

alter table public.predictions drop constraint if exists predictions_user_id_fkey;
alter table public.predictions
  add constraint predictions_user_id_fkey
  foreign key (user_id) references public.profiles(id)
  on update cascade on delete cascade;

alter table public.brackets drop constraint if exists brackets_user_id_fkey;
alter table public.brackets
  add constraint brackets_user_id_fkey
  foreign key (user_id) references public.profiles(id)
  on update cascade on delete cascade;
