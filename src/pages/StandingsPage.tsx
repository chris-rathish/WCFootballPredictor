import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { LeaderboardRow, Match } from '../lib/types'
import { AVERAGE_NAME, AVERAGE_USER_ID, computeAverageRow } from '../lib/average'

const COLS: { key: keyof LeaderboardRow; label: string }[] = [
  { key: 'total_points', label: 'Total' },
  { key: 'group_stage_matches', label: 'Group Stage Matches' },
  { key: 'group_stage_prediction', label: 'Group Stage Prediction' },
  { key: 'knockout_stage_matches', label: 'Knockout Stage Matches' },
  { key: 'knockout_stage_prediction', label: 'Knockout Stage Prediction' },
  { key: 'tournament_predictions', label: 'Tournament Predictions' },
  { key: 'perfect_predictions', label: '🎯 Perfect' },
]

type SortKey = keyof LeaderboardRow

export default function StandingsPage() {
  const { session } = useAuth()
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [average, setAverage] = useState<LeaderboardRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('total_points')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    async function load() {
      const [{ data: lb }, { data: m }, { data: preds }] = await Promise.all([
        supabase.from('leaderboard').select('*').order('total_points', { ascending: false }),
        supabase.from('matches').select('*'),
        supabase.from('predictions').select('match_id, home_score, away_score, winner, motm'),
      ])
      // real players (exclude any stray "Average" profile — Average is computed)
      const real = ((lb as LeaderboardRow[]) ?? []).filter((r) => r.display_name !== AVERAGE_NAME)
      setRows(real)
      setAverage(computeAverageRow((m as Match[]) ?? [], (preds as any[]) ?? []))
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p className="text-zinc-400">Loading leaderboard…</p>

  function sortBy(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(key === 'display_name' ? 'asc' : 'desc')
    }
  }

  // consensus row ranks together with everyone else
  const allRows = average ? [...rows, average] : rows
  const sorted = [...allRows].sort((a, b) => {
    const av = a[sortKey]
    const bv = b[sortKey]
    let cmp: number
    if (typeof av === 'string' && typeof bv === 'string') cmp = av.localeCompare(bv)
    else cmp = (av as number) - (bv as number)
    return sortDir === 'asc' ? cmp : -cmp
  })

  const arrow = (key: SortKey) => (key === sortKey ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '')

  function renderRow(r: LeaderboardRow, rank: string | number) {
    const me = r.user_id === session?.user?.id
    const isAvg = r.user_id === AVERAGE_USER_ID
    const rowBg = me ? 'bg-red-500/10' : isAvg ? 'bg-amber-500/10' : ''
    const stickyBg = me ? 'bg-red-900/40' : isAvg ? 'bg-amber-900/30' : 'bg-night'
    return (
      <tr key={r.user_id} className={`border-t border-zinc-700/40 ${rowBg} ${isAvg ? 'italic' : ''}`}>
        <td className={`sticky left-0 z-10 px-3 py-2 ${stickyBg}`}>{rank}</td>
        <td className={`sticky left-10 z-10 px-3 py-2 font-semibold ${stickyBg} ${me ? 'text-red-200' : isAvg ? 'text-amber-200' : ''}`}>
          {r.display_name}
          {isAvg && <span className="ml-1 pill bg-amber-500/20 text-amber-300">consensus</span>}
        </td>
        {COLS.map((c) => (
          <td key={c.key} className={`px-3 py-2 text-right tabular-nums ${c.key === 'total_points' ? 'font-bold' : ''}`}>
            {r[c.key] as number}
          </td>
        ))}
      </tr>
    )
  }

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold">Leaderboard</h1>
      <p className="mb-4 text-xs text-zinc-500">Click any column header to sort.</p>
      <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-zinc-900 text-left">
              <th className="sticky left-0 z-10 bg-zinc-900 px-3 py-2 font-semibold">#</th>
              <th
                className="sticky left-10 z-10 cursor-pointer select-none bg-zinc-900 px-3 py-2 font-semibold hover:text-red-300"
                onClick={() => sortBy('display_name')}
              >
                Name{arrow('display_name')}
              </th>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  className="cursor-pointer select-none px-3 py-2 text-right font-semibold hover:text-red-300"
                  onClick={() => sortBy(c.key)}
                >
                  {c.label}
                  {arrow(c.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{sorted.map((r, i) => renderRow(r, i + 1))}</tbody>
        </table>
        {rows.length === 0 && <p className="p-4 text-zinc-400">No players yet.</p>}
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Match points are calculated automatically. <span className="text-amber-300">Average</span> is the group’s
        consensus — each match it uses the most common score, winner and MOTM everyone picked, then is scored like a player.
      </p>
    </div>
  )
}
