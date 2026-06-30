import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { isKnockout, outcomeLabel, type LeaderboardRow, type Match, type Prediction } from '../lib/types'
import Team from '../components/Team'
import { SkeletonRows } from '../components/Skeleton'

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>()
  const [row, setRow] = useState<LeaderboardRow | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: lb }, { data: m }, { data: p }] = await Promise.all([
        supabase.from('leaderboard').select('*').eq('user_id', id).maybeSingle(),
        supabase.from('matches').select('*').order('kickoff', { ascending: false, nullsFirst: false }),
        supabase.from('predictions').select('*').eq('user_id', id),
      ])
      setRow((lb as LeaderboardRow) ?? null)
      setMatches((m as Match[]) ?? [])
      const map: Record<number, Prediction> = {}
      ;(p as Prediction[] ?? []).forEach((x) => (map[x.match_id] = x))
      setPreds(map)
      setLoading(false)
    }
    load()
  }, [id])

  const finished = useMemo(() => matches.filter((m) => m.status === 'finished'), [matches])

  const stats = useMemo(() => {
    let exact = 0,
      perfect = 0,
      motmHits = 0,
      winnerHits = 0,
      koWinners = 0,
      predicted = 0
    for (const m of finished) {
      const p = preds[m.id]
      if (!p) continue
      predicted++
      if (p.home_score === m.home_score && p.away_score === m.away_score) exact++
      if (p.points === 20) perfect++
      if (m.motm && p.motm && m.motm.trim().toLowerCase() === p.motm.trim().toLowerCase()) motmHits++
      if (isKnockout(m)) {
        koWinners++
        if (m.winner && p.winner && p.winner === m.winner) winnerHits++
      }
    }
    return { exact, perfect, motmHits, winnerHits, koWinners, predicted }
  }, [finished, preds])

  const badges: { icon: string; label: string }[] = []
  if (stats.perfect > 0) badges.push({ icon: '🎯', label: `${stats.perfect} perfect prediction${stats.perfect > 1 ? 's' : ''}` })
  if (stats.exact >= 3) badges.push({ icon: '🔭', label: `Sharpshooter — ${stats.exact} exact scores` })
  if (stats.motmHits >= 2) badges.push({ icon: '🧤', label: `MOTM reader — ${stats.motmHits} hits` })
  if (stats.koWinners > 0 && stats.winnerHits === stats.koWinners)
    badges.push({ icon: '🧠', label: 'Called every knockout winner' })

  if (loading) return <SkeletonRows rows={8} />
  if (!row) return <p className="text-zinc-400">Player not found.</p>

  const predRows = finished.filter((m) => preds[m.id])

  const stat = (label: string, value: number | string) => (
    <div className="card px-3 py-2 text-center">
      <div className="text-lg font-bold tabular-nums">{value}</div>
      <div className="text-xs text-zinc-400">{label}</div>
    </div>
  )

  return (
    <div className="space-y-5">
      <div>
        <Link to="/" className="text-sm text-red-400 hover:underline">
          ← Leaderboard
        </Link>
        <h1 className="mt-1 text-2xl font-bold">{row.display_name}</h1>
        <div className="text-sm text-zinc-400">
          {row.total_points} total points · {row.perfect_predictions} perfect
        </div>
      </div>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span key={b.label} className="pill bg-amber-500/15 text-amber-200">
              {b.icon} {b.label}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {stat('Group match', row.group_stage_matches)}
        {stat('Group pred', row.group_stage_prediction)}
        {stat('KO match', row.knockout_stage_matches)}
        {stat('KO bracket', row.knockout_stage_prediction)}
        {stat('Exact scores', stats.exact)}
        {stat('MOTM hits', stats.motmHits)}
      </div>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Predictions</h2>
        {predRows.length === 0 ? (
          <div className="card text-sm text-zinc-500">No scored predictions yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
            <table className="min-w-full text-sm">
              <thead className="bg-zinc-900 text-left">
                <tr>
                  <th className="px-3 py-2">Match</th>
                  <th className="px-3 py-2">Result</th>
                  <th className="px-3 py-2">Their pick</th>
                  <th className="px-3 py-2">MOTM</th>
                  <th className="px-3 py-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {predRows.map((m) => {
                  const p = preds[m.id]
                  return (
                    <tr key={m.id} className="border-t border-zinc-700/40">
                      <td className="whitespace-nowrap px-3 py-2">
                        <span className="flex items-center gap-1">
                          <Team name={m.home_team} height={11} /> v <Team name={m.away_team} height={11} />
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                        {m.home_score}–{m.away_score}
                        {isKnockout(m) && m.winner && <span className="text-zinc-500"> ({m.winner})</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                        {p.home_score ?? '–'}–{p.away_score ?? '–'}
                        {isKnockout(m) && p.winner && <span className="text-zinc-500"> ({p.winner})</span>}
                      </td>
                      <td className="px-3 py-2 text-zinc-400">{p.motm ?? '—'}</td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums">{p.points}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
