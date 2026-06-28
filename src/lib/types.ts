export type Stage = 'group' | 'R32' | 'R16' | 'QF' | 'SF' | '3RD' | 'FINAL'

export interface Profile {
  id: string
  display_name: string
  is_admin: boolean
  // admin-managed point buckets (carry-over / special predictions)
  gs_match_pts?: number
  gs_pred_pts?: number
  tourney_pts?: number
}

export interface Team {
  id: number
  name: string
  grp: string | null
  flag: string | null
}

export interface Match {
  id: number
  stage: Stage
  grp: string | null
  label: string | null
  home_team: string
  away_team: string
  kickoff: string | null
  home_score: number | null
  away_score: number | null
  motm: string | null
  status: 'scheduled' | 'finished'
  created_at: string
}

export interface Prediction {
  id?: number
  user_id: string
  match_id: number
  home_score: number | null
  away_score: number | null
  motm: string | null
  points: number
  updated_at?: string
}

export interface LeaderboardRow {
  user_id: string
  display_name: string
  group_stage_matches: number
  group_stage_prediction: number
  knockout_stage_matches: number
  knockout_stage_prediction: number
  tournament_predictions: number
  total_points: number
  perfect_predictions: number
}

// Bracket pick shape stored in brackets.picks / settings.actual_bracket
export interface BracketPicks {
  R16?: string[]
  QF?: string[]
  SF?: string[]
  FINAL?: string[]
  CHAMPION?: string
  THIRD?: string
}

export interface R32Matchup {
  home: string
  away: string
}

export interface Settings {
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
}

// helper: is a match locked for predictions?
export function isLocked(m: Match): boolean {
  if (m.status === 'finished') return true
  if (m.kickoff && new Date(m.kickoff).getTime() <= Date.now()) return true
  return false
}

// Predictions open this many hours before kickoff.
export const PREDICTION_WINDOW_HOURS = 24

// When the prediction window opens (kickoff − 24h), or null if no kickoff set.
export function predictionOpensAt(m: Match): Date | null {
  if (!m.kickoff) return null
  return new Date(new Date(m.kickoff).getTime() - PREDICTION_WINDOW_HOURS * 3600_000)
}

// can a user submit/edit a prediction right now?
// Rule: within the 24h window before kickoff, and before kickoff.
export function isPredictable(m: Match): boolean {
  if (m.status !== 'scheduled' || !m.kickoff) return false
  const now = Date.now()
  const ko = new Date(m.kickoff).getTime()
  return now >= ko - PREDICTION_WINDOW_HOURS * 3600_000 && now < ko
}

// has the match kicked off / been revealed (so others' picks become visible)?
export function hasStarted(m: Match): boolean {
  return isLocked(m)
}

export function outcomeLabel(home: number | null, away: number | null, homeTeam: string, awayTeam: string): string {
  if (home == null || away == null) return ''
  if (home > away) return homeTeam
  if (home < away) return awayTeam
  return 'Draw'
}
