import type { BracketPicks, Match, R32Matchup, Settings } from './types'

// ----- Actual results derived from finished knockout matches (by stage) -----
// Each round's "advancers" = winners of that round's matches:
//   R16 advancers = winners of R32 games, QF = winners of R16, etc.
function winnersOf(matches: Match[], stage: string): string[] {
  return matches
    .filter((m) => m.stage === stage && m.status === 'finished' && m.winner)
    .map((m) => m.winner as string)
}
function losersOf(matches: Match[], stage: string): string[] {
  return matches
    .filter((m) => m.stage === stage && m.status === 'finished' && m.winner)
    .map((m) => (m.winner === m.home_team ? m.away_team : m.home_team))
}

export function actualFromMatches(matches: Match[]): BracketPicks {
  return {
    R16: winnersOf(matches, 'R32'),
    QF: winnersOf(matches, 'R16'),
    SF: winnersOf(matches, 'QF'),
    FINAL: winnersOf(matches, 'SF'),
    CHAMPION: winnersOf(matches, 'FINAL')[0],
    THIRD: winnersOf(matches, '3RD')[0],
  }
}

// teams that have been knocked out at each round (lost their game) — for red marks
export function eliminatedFromMatches(matches: Match[]): BracketPicks {
  return {
    R16: losersOf(matches, 'R32'),
    QF: losersOf(matches, 'R16'),
    SF: losersOf(matches, 'QF'),
    FINAL: losersOf(matches, 'SF'),
    CHAMPION: losersOf(matches, 'FINAL')[0],
    THIRD: losersOf(matches, '3RD')[0],
  }
}

type BracketPts = Pick<Settings, 'pts_r16' | 'pts_qf' | 'pts_sf' | 'pts_final' | 'pts_champion' | 'pts_third'>

// Score a bracket against the actual results (mirrors recompute_brackets in SQL).
export function scoreBracket(picks: BracketPicks, actual: BracketPicks, pts: BracketPts): number {
  let total = 0
  const round = (key: 'R16' | 'QF' | 'SF' | 'FINAL', val: number) => {
    const actualList = (actual[key] as string[] | undefined) ?? []
    for (const t of (picks[key] as string[] | undefined) ?? []) {
      if (t && actualList.includes(t)) total += val
    }
  }
  round('R16', pts.pts_r16)
  round('QF', pts.pts_qf)
  round('SF', pts.pts_sf)
  round('FINAL', pts.pts_final)
  if (actual.CHAMPION && picks.CHAMPION === actual.CHAMPION) total += pts.pts_champion
  if (actual.THIRD && picks.THIRD === actual.THIRD) total += pts.pts_third
  return total
}

// Given the 16 R32 matchups and a set of chosen winners per round, derive the
// matchups for the next round. Picks are stored as flat arrays of team names.
//
// Round sizes: R32 has 32 teams (16 games) -> R16 (8 games) -> QF (4) -> SF (2) -> FINAL (1).
// The "advancers" arrays store who the user thinks wins each game, in bracket order.

export type AdvancingRound = 'R16' | 'QF' | 'SF' | 'FINAL'
export const ROUND_ORDER: AdvancingRound[] = ['R16', 'QF', 'SF', 'FINAL']

// Returns the list of games for a given round based on the previous round's advancers.
export function gamesForRound(
  r32: R32Matchup[],
  picks: BracketPicks,
  round: AdvancingRound
): R32Matchup[] {
  let teams: string[]
  if (round === 'R16') {
    // games come straight from the R32 matchups
    return r32.slice(0, 16)
  }
  const prevRound = prevOf(round)
  teams = (picks[prevRound] as string[] | undefined) ?? []
  const games: R32Matchup[] = []
  for (let i = 0; i < teams.length; i += 2) {
    games.push({ home: teams[i] ?? '', away: teams[i + 1] ?? '' })
  }
  return games
}

function prevOf(round: AdvancingRound): AdvancingRound {
  switch (round) {
    case 'QF':
      return 'R16'
    case 'SF':
      return 'QF'
    case 'FINAL':
      return 'SF'
    default:
      return 'R16'
  }
}

// When a user changes a pick in an earlier round, downstream picks that referenced
// a team that no longer advances must be cleared — while keeping array positions
// aligned with their game index (invalid slots become '').
export function pruneDownstream(r32: R32Matchup[], picks: BracketPicks): BracketPicks {
  const result: BracketPicks = { ...picks }
  for (const round of ROUND_ORDER) {
    const games = gamesForRound(r32, result, round)
    const current = (result[round] as string[] | undefined) ?? []
    result[round] = games.map((g, i) =>
      current[i] === g.home || current[i] === g.away ? current[i] : ''
    )
  }
  // champion must be one of the (non-empty) finalists
  const finalists = new Set((result.FINAL ?? []).filter(Boolean))
  if (result.CHAMPION && !finalists.has(result.CHAMPION)) {
    delete result.CHAMPION
  }
  // third-place pick must be one of the two semi-final losers
  const losers = new Set(semiFinalLosers(r32, result).filter(Boolean))
  if (result.THIRD && !losers.has(result.THIRD)) {
    delete result.THIRD
  }
  return result
}

// The two losing semi-finalists (candidates for the 3rd-place match).
export function semiFinalLosers(r32: R32Matchup[], picks: BracketPicks): string[] {
  const semiGames = gamesForRound(r32, picks, 'FINAL') // SF games (winners reach FINAL)
  const finalists = picks.FINAL ?? []
  return semiGames.map((g, i) => {
    const winner = finalists[i]
    if (!winner) return ''
    return winner === g.home ? g.away : g.home
  })
}

export const ROUND_LABELS: Record<string, string> = {
  R16: 'Round of 16',
  QF: 'Quarter-finals',
  SF: 'Semi-finals',
  FINAL: 'Final',
  CHAMPION: 'Champion',
}

// Column headers in the two-sided bracket, keyed by the round a pick *advances into*.
// (Picking the winner of an R32 game advances a team into the R16, etc.)
export const COLUMN_LABELS: Record<string, string> = {
  R16: 'Round of 32',
  QF: 'Round of 16',
  SF: 'Quarter-finals',
  FINAL: 'Semi-finals',
}
