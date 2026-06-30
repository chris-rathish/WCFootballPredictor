-- Knockout match predictions update from sheet (matched by teams).
-- Results set only where the sheet had them.

update public.matches set home_score=0, away_score=1, winner='Canada', motm='Stephen Eustáquio', status='finished' where home_team='South Africa' and away_team='Canada';
update public.matches set home_score=2, away_score=1, winner='Brazil', motm='Casemiro', status='finished' where home_team='Brazil' and away_team='Japan';
update public.matches set home_score=1, away_score=1, winner='Paraguay', motm='Orlando Gill', status='finished' where home_team='Germany' and away_team='Paraguay';
update public.matches set home_score=1, away_score=1, winner='Morocco', motm='Issa Diop', status='finished' where home_team='Netherlands' and away_team='Morocco';

insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,1,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='GPK' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,1,'Canada','Alphonso Davies' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,3,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Karthik' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Alphonso Davies' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,1,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,3,'Canada','Alphonso Davies' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,3,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,1,'Canada','Alphonso Davies' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Cyle Larin' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Canada','Jonathan David' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'South Africa' and m.away_team = 'Canada'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Matheus Cunha' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,3,'Japan','Takefusa Kubo' from public.profiles p, public.matches m where p.display_name='Chris' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Japan','Ayase Ueda' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,2,'Japan','Ayase Ueda' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,3,'Japan','Daichi Kamada' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Japan','Ayase Ueda' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,2,'Japan','Ayase Ueda' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Brazil','Vinícius Júnior' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'Brazil' and m.away_team = 'Japan'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Germany','Florian Wirtz' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,4,1,'Germany','Florian Wirtz' from public.profiles p, public.matches m where p.display_name='Chris' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,4,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='GPK' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Florian Wirtz' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Karthik' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Germany','Florian Wirtz' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Jamal Musiala' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'Germany','Kai Havertz' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'Germany' and m.away_team = 'Paraguay'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Morocco','Brahim Díaz' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Morocco','Ismael Saibari' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,2,'Netherlands','Denzel Dumfries' from public.profiles p, public.matches m where p.display_name='Chris' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Netherlands','Brian Brobbey' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Netherlands','Denzel Dumfries' from public.profiles p, public.matches m where p.display_name='GPK' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,0,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Netherlands','Brian Brobbey' from public.profiles p, public.matches m where p.display_name='Karthik' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,2,'Netherlands','Brian Brobbey' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Morocco','Ismael Saibari' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Brian Brobbey' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Cody Gakpo' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Morocco','Ismael Saibari' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,2,'Netherlands','Donyell Malen' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Netherlands','Ismael Saibari' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'Netherlands' and m.away_team = 'Morocco'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,5,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,8,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,4,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Chris' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,6,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,7,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='GPK' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Karthik' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,6,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,3,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,7,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,0,'Ivory Coast','Amad Diallo' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,2,'Norway','Erling Haaland' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'Ivory Coast' and m.away_team = 'Norway'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'France','Michael Olise' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,2,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,4,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Chris' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'France','Michael Olise' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,4,0,'France','Michael Olise' from public.profiles p, public.matches m where p.display_name='GPK' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Karthik' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,4,2,'France','Michael Olise' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,0,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,4,0,'France','Michael Olise' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,null,'Ousmane Dembélé' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Michael Olise' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'France','Kylian Mbappé' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'France' and m.away_team = 'Sweden'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,1,'Ecuador','Moisés Caicedo' from public.profiles p, public.matches m where p.display_name='Ajay' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,3,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Ajith' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Akhil' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Ecuador','Moisés Caicedo' from public.profiles p, public.matches m where p.display_name='Anaf' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Mexico','Santiago Giménez' from public.profiles p, public.matches m where p.display_name='Anan' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,2,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Ben' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,0,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Bhargav' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Chris' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,0,1,'Ecuador','Moisés Caicedo' from public.profiles p, public.matches m where p.display_name='Darth' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Dennis' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Ecuador','Moisés Caicedo' from public.profiles p, public.matches m where p.display_name='DikTrikle' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,0,'Mexico','Santiago Giménez' from public.profiles p, public.matches m where p.display_name='Faizal' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Ecuador','Julián Quiñones' from public.profiles p, public.matches m where p.display_name='FTP' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Ecuador','Nilson Angulo' from public.profiles p, public.matches m where p.display_name='GPK' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,0,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Hari' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Jashaul' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Karthik' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Mexico','Julián Quiñones' from public.profiles p, public.matches m where p.display_name='Lan' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Julián Quiñones' from public.profiles p, public.matches m where p.display_name='Noodles' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,2,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Rage' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Ecuador','Moisés Caicedo' from public.profiles p, public.matches m where p.display_name='Rayhaan' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,0,'Mexico','Julián Quiñones' from public.profiles p, public.matches m where p.display_name='RTZ' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,1,'Ecuador','Nilson Angulo' from public.profiles p, public.matches m where p.display_name='Simon' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Sunz' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,2,1,'Mexico','Brian Gutiérrez' from public.profiles p, public.matches m where p.display_name='Viper' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
insert into public.predictions (user_id,match_id,home_score,away_score,winner,motm)
select p.id,m.id,1,0,'Mexico','Raúl Jiménez' from public.profiles p, public.matches m where p.display_name='Vishal' and m.home_team = 'Mexico' and m.away_team = 'Ecuador'
on conflict (user_id,match_id) do update set home_score=excluded.home_score, away_score=excluded.away_score, winner=excluded.winner, motm=excluded.motm;
