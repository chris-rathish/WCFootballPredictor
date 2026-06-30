import { scorePrediction } from './scoring'
import { isKnockout, type LeaderboardRow, type Match, type Prediction } from './types'

// "Average" is a synthetic entry: for each match its prediction is the MOST COMMON
// (mode) score / winner / MOTM everyone chose — always whole numbers, never a decimal.
// It is then scored like a player. Group-stage points are the final carry-over from
// the sheet; knockout accrues as the consensus is scored against real results.
export const AVERAGE_NAME = 'Average'
export const AVERAGE_USER_ID = '__average__'
const AVERAGE_GROUP_MATCHES = 560
const AVERAGE_GROUP_PREDICTION = 255

type Pred = Pick<Prediction, 'match_id' | 'home_score' | 'away_score' | 'winner' | 'motm'>

function cmp<T extends string | number>(a: T, b: T): number {
  return typeof a === 'number' ? a - (b as number) : String(a).localeCompare(String(b))
}

// most common value; ties broken deterministically (smallest number / first alphabetically)
export function mode<T extends string | number>(values: T[]): T | null {
  if (!values.length) return null
  const counts = new Map<T, number>()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  let best: T | null = null
  let bestCount = -1
  for (const [v, c] of counts) {
    if (c > bestCount || (c === bestCount && best !== null && cmp(v, best) < 0)) {
      best = v
      bestCount = c
    }
  }
  return best
}

export function computeAverageRow(matches: Match[], predictions: Pred[]): LeaderboardRow {
  const byMatch = new Map<number, Pred[]>()
  for (const p of predictions) {
    const arr = byMatch.get(p.match_id) ?? []
    arr.push(p)
    byMatch.set(p.match_id, arr)
  }

  let koPts = 0
  let perfect = 0
  for (const m of matches) {
    if (m.status !== 'finished' || !isKnockout(m)) continue
    const ps = byMatch.get(m.id) ?? []
    if (!ps.length) continue
    const home = mode(ps.map((p) => p.home_score).filter((x): x is number => x != null))
    const away = mode(ps.map((p) => p.away_score).filter((x): x is number => x != null))
    const winner = mode(ps.map((p) => p.winner).filter((x): x is string => !!x))
    const motm = mode(ps.map((p) => p.motm).filter((x): x is string => !!x))
    const pts = scorePrediction(m, { home_score: home, away_score: away, winner, motm })
    koPts += pts
    if (pts === 20) perfect++
  }

  return {
    user_id: AVERAGE_USER_ID,
    display_name: AVERAGE_NAME,
    group_stage_matches: AVERAGE_GROUP_MATCHES,
    group_stage_prediction: AVERAGE_GROUP_PREDICTION,
    knockout_stage_matches: koPts,
    knockout_stage_prediction: 0,
    tournament_predictions: 0,
    total_points: AVERAGE_GROUP_MATCHES + AVERAGE_GROUP_PREDICTION + koPts,
    perfect_predictions: perfect,
  }
}
