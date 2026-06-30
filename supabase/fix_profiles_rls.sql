-- =====================================================================
--  Fix profiles RLS so claiming a name (update) and adding a new player
--  (insert) both work for signed-in users. Run ONCE in the SQL Editor.
-- =====================================================================

-- claim an unclaimed name, edit your own, or (admin) edit anyone
drop policy if exists profiles_update_own on public.profiles;
drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update
  using (claimed = false or id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- create a brand-new player for yourself (the "Add yourself" button)
drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert
  with check (id = auth.uid() or public.is_admin());
