import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { LeaderboardRow } from '../lib/types'

const COLS: { key: keyof LeaderboardRow; label: string }[] = [
  { key: 'total_points', label: 'Total' },
  { key: 'group_stage_matches', label: 'Group Stage Matches' },
  { key: 'group_stage_prediction', label: 'Group Stage Prediction' },
  { key: 'knockout_stage_matches', label: 'Knockout Stage Matches' },
  { key: 'knockout_stage_prediction', label: 'Knockout Stage Prediction' },
  { key: 'tournament_predictions', label: 'Tournament Predictions' },
  { key: 'perfect_predictions', label: '🎯 Perfect' },
]

export default function StandingsPage() {
  const { session } = useAuth()
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('leaderboard')
      .select('*')
      .order('total_points', { ascending: false })
      .then(({ data }: any) => {
        setRows((data as LeaderboardRow[]) ?? [])
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-zinc-400">Loading leaderboard…</p>

  const avg = (key: keyof LeaderboardRow) => {
    if (!rows.length) return 0
    const sum = rows.reduce((a, r) => a + (r[key] as number), 0)
    return Math.round(sum / rows.length)
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Leaderboard</h1>
      <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-900 text-left">
              <th className="sticky left-0 z-10 bg-zinc-900 px-3 py-2 font-semibold">#</th>
              <th className="sticky left-10 z-10 bg-zinc-900 px-3 py-2 font-semibold">Name</th>
              {COLS.map((c) => (
                <th key={c.key} className="px-3 py-2 text-right font-semibold">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Average row */}
            <tr className="border-t border-zinc-700/40 bg-zinc-800/50 italic text-zinc-300">
              <td className="sticky left-0 z-10 bg-zinc-800/80 px-3 py-2"></td>
              <td className="sticky left-10 z-10 bg-zinc-800/80 px-3 py-2 font-semibold">Average</td>
              {COLS.map((c) => (
                <td key={c.key} className="px-3 py-2 text-right tabular-nums">
                  {avg(c.key)}
                </td>
              ))}
            </tr>

            {rows.map((r, i) => {
              const me = r.user_id === session?.user?.id
              return (
                <tr key={r.user_id} className={`border-t border-zinc-700/40 ${me ? 'bg-red-500/10' : ''}`}>
                  <td className={`sticky left-0 z-10 px-3 py-2 ${me ? 'bg-red-900/40' : 'bg-night'}`}>{i + 1}</td>
                  <td className={`sticky left-10 z-10 px-3 py-2 font-semibold ${me ? 'bg-red-900/40 text-red-200' : 'bg-night'}`}>
                    {r.display_name}
                  </td>
                  {COLS.map((c) => (
                    <td
                      key={c.key}
                      className={`px-3 py-2 text-right tabular-nums ${c.key === 'total_points' ? 'font-bold' : ''}`}
                    >
                      {r[c.key] as number}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-4 text-zinc-400">No players yet.</p>}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Match points are calculated automatically. Group-stage carry-over, group-stage prediction and
        tournament-prediction points are managed by the admin (Admin → Players).
      </p>
    </div>
  )
}
