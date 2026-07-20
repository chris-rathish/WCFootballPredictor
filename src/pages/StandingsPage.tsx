import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { BracketPicks, LeaderboardRow, Match } from '../lib/types'
import { AVERAGE_NAME, AVERAGE_USER_ID, computeAverageRow } from '../lib/average'
import { actualFromMatches, consensusBracket, scoreBracket } from '../lib/bracket'
import { useAutoRefresh } from '../lib/useAutoRefresh'
import { SkeletonRows } from '../components/Skeleton'
import MatchdayWinners from '../components/MatchdayWinners'

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
const SNAP_KEY = 'wc-rank-snapshot-v2'
// snapshot is re-baselined only when a new match finishes, so the ▲▼ arrows
// reflect "movement since the last results came in" and survive idle refreshes.
type Snap = { finished: number; ranks: Record<string, number>; moves: Record<string, number> }

export default function StandingsPage() {
  const { session } = useAuth()
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [average, setAverage] = useState<LeaderboardRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('total_points')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [moves, setMoves] = useState<Record<string, number>>({})

  const load = useCallback(async () => {
    const [{ data: lb }, { data: m }, { data: preds }, { data: brk }] = await Promise.all([
      supabase.from('leaderboard').select('*').order('total_points', { ascending: false }),
      supabase.from('matches').select('*'),
      supabase.from('predictions').select('match_id, home_score, away_score, winner, motm'),
      supabase.from('brackets').select('picks'),
    ])
    const matches = (m as Match[]) ?? []
    const real = ((lb as LeaderboardRow[]) ?? []).filter((r) => r.display_name !== AVERAGE_NAME)
    // consensus bracket score — gated until the FINAL is played, like real players'
    const tourneyOver = matches.some((mt) => mt.stage === 'FINAL' && mt.status === 'finished')
    const brackets = ((brk as { picks: BracketPicks }[]) ?? []).map((b) => b.picks)
    const bracketPts =
      tourneyOver && brackets.length ? scoreBracket(consensusBracket(brackets), actualFromMatches(matches)) : 0
    const avg = computeAverageRow(matches, (preds as any[]) ?? [], bracketPts)
    setRows(real)
    setAverage(avg)

    // current ranking (by total points, desc)
    const ranked = [...real, avg].sort((a, b) => b.total_points - a.total_points)
    const current: Record<string, number> = {}
    ranked.forEach((r, i) => (current[r.user_id] = i + 1))
    const finished = matches.filter((mm) => mm.status === 'finished').length

    try {
      const prev = JSON.parse(localStorage.getItem(SNAP_KEY) || 'null') as Snap | null
      if (!prev) {
        // first visit — baseline now, nothing to show yet
        localStorage.setItem(SNAP_KEY, JSON.stringify({ finished, ranks: current, moves: {} } as Snap))
        setMoves({})
      } else if (finished > prev.finished) {
        // new result(s) landed — compute movement from the prior baseline and re-baseline
        const mv: Record<string, number> = {}
        for (const uid in current) if (prev.ranks[uid]) mv[uid] = prev.ranks[uid] - current[uid] // +up, -down
        localStorage.setItem(SNAP_KEY, JSON.stringify({ finished, ranks: current, moves: mv } as Snap))
        setMoves(mv)
      } else {
        // no new results — keep showing the last computed movement (don't reset on idle refresh)
        setMoves(prev.moves ?? {})
      }
    } catch {
      /* ignore */
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])
  useAutoRefresh(load)

  function sortBy(key: SortKey) {
    if (key === sortKey) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir(key === 'display_name' ? 'asc' : 'desc')
    }
  }

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

  function move(uid: string) {
    const d = moves[uid]
    if (!d) return null
    return d > 0 ? (
      <span className="ml-1 text-[10px] text-emerald-400">▲{d}</span>
    ) : (
      <span className="ml-1 text-[10px] text-red-400">▼{-d}</span>
    )
  }

  function renderRow(r: LeaderboardRow, rank: number) {
    const me = r.user_id === session?.user?.id
    const isAvg = r.user_id === AVERAGE_USER_ID
    const rowBg = me ? 'bg-red-500/10' : isAvg ? 'bg-amber-500/10' : ''
    const stickyBg = me ? 'bg-red-900/40' : isAvg ? 'bg-amber-900/30' : 'bg-night'
    return (
      <tr key={r.user_id} className={`border-t border-zinc-700/40 ${rowBg} ${isAvg ? 'italic' : ''}`}>
        <td className={`sticky left-0 z-10 px-3 py-2 ${stickyBg}`}>
          {rank}
          {move(r.user_id)}
        </td>
        <td className={`sticky left-10 z-10 whitespace-nowrap px-3 py-2 font-semibold ${stickyBg} ${me ? 'text-red-200' : isAvg ? 'text-amber-200' : ''}`}>
          {isAvg ? (
            <>
              {r.display_name}
              <span className="ml-1 pill bg-amber-500/20 text-amber-300">consensus</span>
            </>
          ) : (
            <Link to={`/player/${r.user_id}`} className="hover:text-red-300 hover:underline">
              {r.display_name}
            </Link>
          )}
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
      <p className="mb-4 text-xs text-zinc-500">Click a name for their profile · click a column header to sort · ▲▼ shows movement since the last results.</p>
      {!loading && <MatchdayWinners />}
      {loading ? (
        <SkeletonRows rows={10} />
      ) : (
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
      )}
      <p className="mt-3 text-xs text-zinc-500">
        Match points are calculated automatically. <span className="text-amber-300">Average</span> is the group’s
        consensus — each match it uses the most common score, winner and MOTM everyone picked, then is scored like a player.
      </p>
    </div>
  )
}
