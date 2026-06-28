// In-memory seed data for DEMO MODE (no Supabase required).
import type { BracketPicks, Match, R32Matchup } from './types'

export interface DemoStore {
  profiles: {
    id: string
    display_name: string
    is_admin: boolean
    gs_match_pts: number
    gs_pred_pts: number
    tourney_pts: number
    perfect_pts: number
  }[]
  teams: { id: number; name: string; grp: string | null; flag: string | null }[]
  matches: Match[]
  predictions: {
    id: number
    user_id: string
    match_id: number
    home_score: number | null
    away_score: number | null
    motm: string | null
    winner: string | null
    points: number
  }[]
  brackets: { user_id: string; picks: BracketPicks; points: number }[]
  settings: {
    id: number
    bracket_r32: R32Matchup[]
    actual_bracket: BracketPicks
    bracket_deadline: string | null
    pts_r16: number
    pts_qf: number
    pts_sf: number
    pts_final: number
    pts_champion: number
    pts_third: number
  }[]
}

export const DEMO_USER_ID = 'demo-you'

// gs_match_pts / gs_pred_pts mimic carried-over group-stage totals from the sheet.
const PLAYERS = [
  { id: DEMO_USER_ID, display_name: 'You', is_admin: true, gs_match_pts: 560, gs_pred_pts: 230, tourney_pts: 0 },
  { id: 'p-ajay', display_name: 'Ajay', is_admin: false, gs_match_pts: 540, gs_pred_pts: 240, tourney_pts: 0 },
  { id: 'p-ben', display_name: 'Ben', is_admin: false, gs_match_pts: 515, gs_pred_pts: 235, tourney_pts: 0 },
  { id: 'p-chris', display_name: 'Chris', is_admin: false, gs_match_pts: 560, gs_pred_pts: 230, tourney_pts: 0 },
  { id: 'p-darth', display_name: 'Darth', is_admin: false, gs_match_pts: 540, gs_pred_pts: 235, tourney_pts: 0 },
  { id: 'p-hari', display_name: 'Hari', is_admin: false, gs_match_pts: 560, gs_pred_pts: 255, tourney_pts: 0 },
  { id: 'p-katta', display_name: 'Katta', is_admin: false, gs_match_pts: 80, gs_pred_pts: 265, tourney_pts: 0 },
  { id: 'p-simon', display_name: 'Simon', is_admin: false, gs_match_pts: 570, gs_pred_pts: 220, tourney_pts: 0 },
]

// The official FIFA WC 2026 Round-of-32 (RTT) matchups.
const R32: R32Matchup[] = [
  { home: 'South Africa', away: 'Canada' },
  { home: 'Netherlands', away: 'Morocco' },
  { home: 'Germany', away: 'Paraguay' },
  { home: 'France', away: 'Sweden' },
  { home: 'Belgium', away: 'Senegal' },
  { home: 'USA', away: 'Bosnia and Herzegovina' },
  { home: 'Spain', away: 'Austria' },
  { home: 'Portugal', away: 'Croatia' },
  { home: 'Brazil', away: 'Japan' },
  { home: 'Ivory Coast', away: 'Norway' },
  { home: 'Mexico', away: 'Ecuador' },
  { home: 'England', away: 'DR Congo' },
  { home: 'Switzerland', away: 'Algeria' },
  { home: 'Colombia', away: 'Ghana' },
  { home: 'Australia', away: 'Egypt' },
  { home: 'Argentina', away: 'Cape Verde' },
]

function iso(daysFromNow: number, hour = 18): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  d.setHours(hour, 0, 0, 0)
  return d.toISOString()
}

function scoreOf(
  m: Match,
  p: { home_score: number | null; away_score: number | null; motm: string | null; winner: string | null }
): number {
  if (m.status !== 'finished' || m.home_score == null || m.away_score == null) return 0
  let pts = 0
  if (p.home_score === m.home_score) pts += 5
  if (p.away_score === m.away_score) pts += 5
  if (m.stage !== 'group') {
    if (m.winner && p.winner && p.winner === m.winner) pts += 5
  } else if (p.home_score != null && p.away_score != null) {
    if (Math.sign(p.home_score - p.away_score) === Math.sign(m.home_score - m.away_score)) pts += 5
  }
  if (m.motm && p.motm && m.motm.trim().toLowerCase() === p.motm.trim().toLowerCase()) pts += 5
  return pts
}

export function buildDemoStore(): DemoStore {
  const allTeams = Array.from(new Set(R32.flatMap((g) => [g.home, g.away])))
  const teams = allTeams.map((name, i) => ({ id: i + 1, name, grp: null, flag: null }))

  // A few knockout matches: 2 finished (table has data), 2 today (predict now), 2 future (locked).
  const matches: Match[] = [
    mk(1, 'RTT1', 'South Africa', 'Canada', iso(-1, 16), 1, 2, 'Alphonso Davies', 'Canada'),
    mk(2, 'RTT2', 'Netherlands', 'Morocco', iso(-1, 20), 2, 0, 'Cody Gakpo', 'Netherlands'),
    mk(3, 'RTT3', 'Germany', 'Paraguay', iso(0, 18), null, null, null, null),
    mk(4, 'RTT4', 'France', 'Sweden', iso(0, 21), null, null, null, null),
    mk(5, 'RTT5', 'Belgium', 'Senegal', iso(1, 18), null, null, null, null),
    mk(6, 'RTT6', 'USA', 'Bosnia and Herzegovina', iso(1, 21), null, null, null, null),
  ]

  const predictions: DemoStore['predictions'] = []
  let pid = 1
  const motmGuess = ['Alphonso Davies', 'Cody Gakpo', 'Someone Else', 'Jonathan David']
  for (const m of matches.filter((x) => x.status === 'finished')) {
    PLAYERS.forEach((pl, idx) => {
      const seed = (m.id * 7 + idx * 13) % 5
      const predHome = clamp(m.home_score! + [0, 0, 1, -1, 2][seed])
      const predAway = clamp(m.away_score! + [0, 1, 0, -1, 0][seed])
      const predMotm = idx % 3 === 0 ? m.motm! : motmGuess[(idx + m.id) % motmGuess.length]
      // most pick the actual advancer, some pick the other team
      const predWinner = idx % 4 === 0 ? m.home_team : m.winner!
      predictions.push({
        id: pid++,
        user_id: pl.id,
        match_id: m.id,
        home_score: predHome,
        away_score: predAway,
        motm: predMotm,
        winner: predWinner,
        points: scoreOf(m, { home_score: predHome, away_score: predAway, motm: predMotm, winner: predWinner }),
      })
    })
  }
  // "You" already predicted today's first match (so the form shows update state)
  predictions.push({ id: pid++, user_id: DEMO_USER_ID, match_id: 3, home_score: 2, away_score: 1, motm: 'Florian Wirtz', winner: 'Germany', points: 0 })

  const brackets: DemoStore['brackets'] = [
    { user_id: 'p-ajay', picks: { R16: R32.map((x) => x.home) }, points: 0 },
    { user_id: 'p-ben', picks: { R16: R32.map((x, i) => (i % 2 ? x.away : x.home)) }, points: 0 },
  ]

  return {
    profiles: PLAYERS.map((p) => ({ ...p, perfect_pts: 0 })),
    teams,
    matches,
    predictions,
    brackets,
    settings: [
      {
        id: 1,
        bracket_r32: R32,
        actual_bracket: {},
        bracket_deadline: iso(2, 12), // future -> bracket editable
        pts_r16: 5,
        pts_qf: 10,
        pts_sf: 15,
        pts_final: 20,
        pts_champion: 30,
        pts_third: 10,
      },
    ],
  }
}

function mk(
  id: number, label: string, home: string, away: string, kickoff: string,
  hs: number | null, as: number | null, motm: string | null, winner: string | null
): Match {
  return {
    id, stage: 'R32', grp: null, label,
    home_team: home, away_team: away, kickoff,
    home_score: hs, away_score: as, motm, winner,
    status: hs != null && as != null ? 'finished' : 'scheduled',
    created_at: new Date().toISOString(),
  }
}

function clamp(n: number): number {
  return Math.max(0, n)
}
