import { isKnockout, type Match, type Prediction } from './types'

// Mirrors the server-side scoring in schema.sql so the UI can show a preview.
// +5 correct home goals, +5 correct away goals, +5 correct outcome, +5 correct MOTM.
// Outcome for knockout = predicted advancing team vs actual (handles penalties);
// for group stage = scoreline result (win/draw/loss).
export function scorePrediction(
  m: Match,
  p: Pick<Prediction, 'home_score' | 'away_score' | 'motm' | 'winner'>
): number {
  if (m.status !== 'finished' || m.home_score == null || m.away_score == null) return 0
  let pts = 0
  if (p.home_score != null && p.home_score === m.home_score) pts += 5
  if (p.away_score != null && p.away_score === m.away_score) pts += 5

  if (isKnockout(m)) {
    if (m.winner && p.winner && p.winner === m.winner) pts += 5
  } else if (p.home_score != null && p.away_score != null) {
    const aOut = Math.sign(m.home_score - m.away_score)
    const pOut = Math.sign(p.home_score - p.away_score)
    if (aOut === pOut) pts += 5
  }

  if (m.motm && p.motm && m.motm.trim().toLowerCase() === p.motm.trim().toLowerCase()) pts += 5
  return pts
}
