-- Imported knockout match predictions from the sheet (gid 1290125192).
-- Per-player MOTM/Winner were not recorded in the sheet; winner is derived
-- from the predicted score (draw -> null). Also sets the 4 played results.

-- Set the 4 played R32 results (score + advancing team + MOTM).
update public.matches set home_score = 0, away_score = 1, winner = 'Canada', motm = 'Stephen Eustaquio', status = 'finished' where label = 'RTT1';
update public.matches set home_score = 2, away_score = 1, winner = 'Brazil', motm = 'Casemiro', status = 'finished' where label = 'RTT9';
update public.matches set home_score = 1, away_score = 1, winner = 'Paraguay', motm = 'Orlando Gill', status = 'finished' where label = 'RTT3';
update public.matches set home_score = 1, away_score = 1, winner = 'Morocco', motm = 'Issa Diop', status = 'finished' where label = 'RTT2';

insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Ajay' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 1, null, null
from public.profiles p, public.matches m where p.display_name = 'Ajith' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Akhil' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Anaf' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Anan' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 3, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Ben' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 3, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Bhargav' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Darth' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Dennis' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'DikTrikle' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 3, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Faizal' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'FTP' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 1, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'GPK' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 1, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Hari' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Jashaul' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 3, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Karthik' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Lan' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 1, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Noodles' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Rage' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 3, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Rayhaan' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 3, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'RTZ' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 0, 1, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Simon' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 1, null, null
from public.profiles p, public.matches m where p.display_name = 'Sunz' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Viper' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Canada', null
from public.profiles p, public.matches m where p.display_name = 'Vishal' and m.label = 'RTT1'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Ajay' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Ajith' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Akhil' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Anaf' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Anan' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Ben' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Bhargav' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 3, 'Japan', null
from public.profiles p, public.matches m where p.display_name = 'Chris' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Japan', null
from public.profiles p, public.matches m where p.display_name = 'Darth' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 2, null, null
from public.profiles p, public.matches m where p.display_name = 'Dennis' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'DikTrikle' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Faizal' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'FTP' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Hari' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Jashaul' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 3, 'Japan', null
from public.profiles p, public.matches m where p.display_name = 'Lan' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Japan', null
from public.profiles p, public.matches m where p.display_name = 'Noodles' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 2, null, null
from public.profiles p, public.matches m where p.display_name = 'Rage' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Rayhaan' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'RTZ' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Simon' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Sunz' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Viper' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Brazil', null
from public.profiles p, public.matches m where p.display_name = 'Vishal' and m.label = 'RTT9'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Ajay' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Ajith' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Akhil' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Anaf' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Anan' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Ben' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Bhargav' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 4, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Chris' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 4, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Darth' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Dennis' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'DikTrikle' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Faizal' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'FTP' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'GPK' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Hari' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Jashaul' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Karthik' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Lan' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Noodles' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Rage' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Rayhaan' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'RTZ' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Simon' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Sunz' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Viper' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 0, 'Germany', null
from public.profiles p, public.matches m where p.display_name = 'Vishal' and m.label = 'RTT3'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Ajay' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Morocco', null
from public.profiles p, public.matches m where p.display_name = 'Ajith' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Akhil' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Morocco', null
from public.profiles p, public.matches m where p.display_name = 'Anaf' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Anan' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Ben' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Bhargav' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 2, null, null
from public.profiles p, public.matches m where p.display_name = 'Chris' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Darth' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Dennis' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'DikTrikle' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Faizal' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'FTP' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'GPK' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 0, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Hari' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Jashaul' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 0, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Karthik' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 2, null, null
from public.profiles p, public.matches m where p.display_name = 'Lan' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Morocco', null
from public.profiles p, public.matches m where p.display_name = 'Noodles' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Rage' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Rayhaan' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'RTZ' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Simon' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 1, 2, 'Morocco', null
from public.profiles p, public.matches m where p.display_name = 'Sunz' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 3, 2, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Viper' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;
insert into public.predictions (user_id, match_id, home_score, away_score, winner, motm)
select p.id, m.id, 2, 1, 'Netherlands', null
from public.profiles p, public.matches m where p.display_name = 'Vishal' and m.label = 'RTT2'
on conflict (user_id, match_id) do update set home_score = excluded.home_score, away_score = excluded.away_score, winner = excluded.winner;

-- Open all scheduled games for prediction until 1 hour before kickoff
-- (removes the old 24h "opens" lower bound).
drop policy if exists predictions_write on public.predictions;
create policy predictions_write on public.predictions for all
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.matches m
      where m.id = match_id
        and m.status = 'scheduled'
        and m.kickoff is not null
        and now() < m.kickoff - interval '1 hour'
    )
  );
