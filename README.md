# ⚽ World Cup Predictor

A web app for you and your friends to predict World Cup matches and build a knockout
bracket — replacing the daily Excel sheet. Shared data via Supabase, email magic-link
login, an admin panel to enter results, and an automatic leaderboard.

## Scoring (per match — same as your sheet)

| What | Points |
|------|--------|
| Correct home-team goals (exact) | +5 |
| Correct away-team goals (exact) | +5 |
| Correct outcome (win / draw / loss) | +5 |
| Correct Man of the Match | +5 |
| **Max per match** | **20** |

**Bracket** (configurable in Admin): each team you correctly predict to reach a round
scores — Round of 16 +5, QF +10, SF +15, Final +20, correct Champion +30.

---

## Setup (one time, ~10 minutes)

### 1. Create a Supabase project
1. Go to <https://supabase.com> → sign in → **New project** (the free tier is fine).
2. Pick a name and a database password, choose a region, create it.
3. Wait ~2 minutes for it to provision.

### 2. Create the database
1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
3. (Optional) Do the same with [`supabase/seed.sql`](supabase/seed.sql) for a few example matches.

### 3. Configure email login
1. **Authentication → Providers → Email**: make sure **Email** is enabled.
   The default "magic link" flow needs no extra config.
2. **Authentication → URL Configuration**: set **Site URL** to where you'll host the
   app (e.g. `http://localhost:5173` while testing, then your deployed URL like
   `https://your-app.vercel.app`). Add both under **Redirect URLs**.

### 4. Get your API keys
**Project Settings → API**, copy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 5. Run locally
```bash
npm install
cp .env.example .env      # then edit .env with your URL + anon key
npm run dev
```
Open the printed URL (usually <http://localhost:5173>), enter your email, click the
magic link in your inbox, and you're in.

### 6. Make yourself admin
The first time you log in a profile is created automatically. To grant yourself the
admin panel, run this once in the Supabase **SQL Editor** (use your login email):
```sql
update public.profiles set is_admin = true
where id = (select id from auth.users where email = 'YOUR_EMAIL_HERE');
```
After that you can promote others from **Admin → Players**.

---

## Deploy (so friends can use it)

Easiest is **Vercel** or **Netlify** (both free):

1. Push this folder to a GitHub repo.
2. Import it in Vercel/Netlify. Framework preset: **Vite**. Build command `npm run build`,
   output dir `dist`.
3. Add the two environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
4. Deploy, then add the deployed URL to Supabase **Authentication → URL Configuration**
   (Site URL + Redirect URLs).

Share the URL with your friends — they log in with their email and start predicting.

---

## Daily workflow

- **Friends**: open the app → **Matches** → enter a scoreline + MOTM for upcoming games.
  Picks lock at kickoff. After kickoff everyone's picks become visible.
- **You (admin)**: after a match ends, **Admin → Matches** → type the final score + MOTM
  → **Finish**. Everyone's points are calculated automatically and the **Leaderboard**
  updates.
- **Bracket**: set up the Round-of-32 matchups and a lock deadline in **Admin → Bracket**.
  Friends fill in their bracket on the **Bracket** page before the deadline. As knockout
  games finish, enter the real winners in **Admin → Bracket → actual results** and click
  **re-score all brackets**.

## Tech
React + Vite + TypeScript + Tailwind, Supabase (Postgres + Auth + Row Level Security).
All scoring runs server-side in SQL ([`supabase/schema.sql`](supabase/schema.sql)) so it
can't be tampered with from the browser.
