-- Imported bracket predictions from the sheet (gid 1478210098).
-- Maps each player’s picks to the app bracket shape and locks the window.

insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Ecuador","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","England","Argentina"],"FINAL":["France","England"],"THIRD":"Spain","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Ajay'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Austria","Portugal","Brazil","Norway","Mexico","England","Algeria","Colombia","Australia","Argentina"],"QF":["Netherlands","France","Belgium","Portugal","Norway","England","Colombia","Argentina"],"SF":["France","Portugal","Norway","Argentina"],"FINAL":["Portugal","Argentina"],"THIRD":"Norway","CHAMPION":"Portugal"}'::jsonb from public.profiles where display_name = 'Ajith'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Senegal","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Senegal","Spain","Brazil","England","Switzerland","Argentina"],"SF":["France","Spain","England","Argentina"],"FINAL":["France","Argentina"],"THIRD":"England","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Akhil'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Morocco","Germany","France","Belgium","Bosnia and Herzegovina","Spain","Portugal","Brazil","Norway","Mexico","England","Algeria","Colombia","Australia","Argentina"],"QF":["Morocco","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"France","CHAMPION":"Argentina"}'::jsonb from public.profiles where display_name = 'Anaf'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Ivory Coast","Ecuador","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["France","Brazil"],"THIRD":"Spain","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Anan'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Ghana","Egypt","Argentina"],"QF":["Netherlands","France","USA","Spain","Brazil","England","Switzerland","Argentina"],"SF":["France","Spain","England","Argentina"],"FINAL":["France","England"],"THIRD":"Spain","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Ben'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","England","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"England","CHAMPION":"Spain"}'::jsonb from public.profiles where display_name = 'Bhargav'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Senegal","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Portugal","Japan","England","Colombia","Argentina"],"SF":["France","Portugal","Japan","Argentina"],"FINAL":["France","Argentina"],"THIRD":"Portugal","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Chris'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Portugal","Norway","England","Colombia","Argentina"],"SF":["Netherlands","Portugal","England","Argentina"],"FINAL":["Portugal","England"],"THIRD":"Argentina","CHAMPION":"Portugal"}'::jsonb from public.profiles where display_name = 'Darth'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Australia","Argentina"],"QF":["Netherlands","France","USA","Portugal","Norway","England","Colombia","Argentina"],"SF":["France","Portugal","England","Argentina"],"FINAL":["Portugal","England"],"THIRD":"France","CHAMPION":"Portugal"}'::jsonb from public.profiles where display_name = 'Dennis'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Norway","England","Colombia","Argentina"],"SF":["Netherlands","Spain","England","Argentina"],"FINAL":["Spain","England"],"THIRD":"Argentina","CHAMPION":"Spain"}'::jsonb from public.profiles where display_name = 'DikTrikle'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Portugal","Norway","England","Colombia","Argentina"],"SF":["France","Portugal","England","Argentina"],"FINAL":["France","Argentina"],"THIRD":"Portugal","CHAMPION":"Argentina"}'::jsonb from public.profiles where display_name = 'Faizal'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Portugal","Norway","England","Switzerland","Argentina"],"SF":["France","Portugal","England","Argentina"],"FINAL":["Portugal","Argentina"],"THIRD":"England","CHAMPION":"Portugal"}'::jsonb from public.profiles where display_name = 'FTP'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Senegal","USA","Spain","Portugal","Japan","Norway","Ecuador","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Portugal","Norway","England","Colombia","Argentina"],"SF":["France","Portugal","Norway","Argentina"],"FINAL":["Portugal","Norway"],"THIRD":"France","CHAMPION":"Norway"}'::jsonb from public.profiles where display_name = 'GPK'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"France","CHAMPION":"Spain"}'::jsonb from public.profiles where display_name = 'Hari'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"France","CHAMPION":"Spain"}'::jsonb from public.profiles where display_name = 'Jashaul'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Portugal","Norway","England","Colombia","Argentina"],"SF":["France","Portugal","England","Argentina"],"FINAL":["France","Argentina"],"THIRD":"England","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Karthik'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
-- Katta: empty bracket, skipped
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Senegal","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Portugal","Norway","England","Colombia","Argentina"],"SF":["France","Portugal","England","Argentina"],"FINAL":["France","England"],"THIRD":"Argentina","CHAMPION":"England"}'::jsonb from public.profiles where display_name = 'Lan'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Morocco","Germany","France","Belgium","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Australia","Argentina"],"QF":["Morocco","France","USA","Spain","Norway","England","Colombia","Argentina"],"SF":["France","Spain","Norway","Argentina"],"FINAL":["France","Norway"],"THIRD":"Argentina","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Noodles'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Croatia","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Norway","England","Colombia","Argentina"],"SF":["France","Spain","England","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"England","CHAMPION":"Argentina"}'::jsonb from public.profiles where display_name = 'Rage'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Senegal","USA","Spain","Portugal","Japan","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","Germany","USA","Spain","Norway","England","Colombia","Argentina"],"SF":["Germany","Spain","England","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"England","CHAMPION":"Spain"}'::jsonb from public.profiles where display_name = 'Rayhaan'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["France","Brazil"],"THIRD":"Spain","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'RTZ'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"France","CHAMPION":"Spain"}'::jsonb from public.profiles where display_name = 'Simon'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Morocco","Germany","France","Belgium","Bosnia and Herzegovina","Spain","Portugal","Brazil","Norway","Mexico","England","Algeria","Colombia","Australia","Argentina"],"QF":["Morocco","France","Belgium","Spain","Brazil","England","Colombia","Argentina"],"SF":["France","Spain","Brazil","Argentina"],"FINAL":["Spain","Argentina"],"THIRD":"France","CHAMPION":"Argentina"}'::jsonb from public.profiles where display_name = 'Sunz'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Senegal","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","USA","Portugal","Brazil","England","Colombia","Argentina"],"SF":["Netherlands","Portugal","England","Argentina"],"FINAL":["Portugal","England"],"THIRD":"Netherlands","CHAMPION":"Portugal"}'::jsonb from public.profiles where display_name = 'Viper'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();
insert into public.brackets (user_id, picks)
select id, '{"R16":["Canada","Netherlands","Germany","France","Belgium","USA","Spain","Portugal","Brazil","Norway","Mexico","England","Switzerland","Colombia","Egypt","Argentina"],"QF":["Netherlands","France","Belgium","Portugal","Brazil","England","Colombia","Argentina"],"SF":["France","Portugal","Brazil","Argentina"],"FINAL":["France","Argentina"],"THIRD":"Portugal","CHAMPION":"France"}'::jsonb from public.profiles where display_name = 'Vishal'
on conflict (user_id) do update set picks = excluded.picks, updated_at = now();

-- Lock the bracket window (deadline in the past).
update public.settings set bracket_deadline = now() - interval '1 day' where id = 1;
