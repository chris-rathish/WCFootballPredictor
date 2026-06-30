import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { isKnockout, type LeaderboardRow, type Match, type Prediction } from '../lib/types'
import { GROUP_MATCH_PREDS } from '../data/groupMatchPreds'
import Team from '../components/Team'
import { SkeletonRows } from '../components/Skeleton'

// Group-stage matches aren't in the DB (only carry-over point buckets are) — their
// per-match picks live in the static archive. Count a player's group exact scores,
// MOTM hits and perfects from there so the profile reflects the whole tournament.
function groupStatsFor(name: string) {
  let exact = 0,
    motmHits = 0,
    perfect = 0,
    predicted = 0
  for (const day of GROUP_MATCH_PREDS) {
    for (const g of day.games) {
      if (g.hs == null || g.as == null) continue // game not played
      const pl = g.players.find((p) => p.name === name)
      if (!pl || pl.hs == null || pl.as == null) continue // player didn't predict
      predicted++
      if (pl.hs === g.hs && pl.as === g.as) exact++
      if (g.motm && pl.motm && g.motm.trim().toLowerCase() === pl.motm.trim().toLowerCase()) motmHits++
      if (pl.pts === 20) perfect++
    }
  }
  return { exact, motmHits, perfect, predicted }
}

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>()
  const [row, setRow] = useState<LeaderboardRow | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc') // latest first by default

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
    // knockout (live, from the DB)
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
    // group stage (from the static archive)
    const g = row ? groupStatsFor(row.display_name) : { exact: 0, motmHits: 0, perfect: 0, predicted: 0 }
    return {
      exact: exact + g.exact,
      perfect: perfect + g.perfect,
      motmHits: motmHits + g.motmHits,
      winnerHits,
      koWinners,
      predicted: predicted + g.predicted,
    }
  }, [finished, preds, row])

  // unified prediction log: group-stage archive + knockout DB, earliest first
  const predRows = useMemo(() => {
    if (!row) return []
    type R = {
      key: string
      home: string
      away: string
      ahs: number | null
      aas: number | null
      awinner: string | null
      amotm: string | null
      phs: number | null
      pas: number | null
      pwinner: string | null
      pmotm: string | null
      pts: number
      knockout: boolean
      sort: number
    }
    const rows: R[] = []
    // group stage (static archive) — keep archive order (already chronological)
    let gi = 0
    for (const day of GROUP_MATCH_PREDS) {
      for (const g of day.games) {
        gi++
        if (g.hs == null || g.as == null) continue // game not played
        const pl = g.players.find((p) => p.name === row.display_name)
        if (!pl || pl.hs == null || pl.as == null) continue // player didn't predict
        rows.push({
          key: `g${gi}`,
          home: g.home,
          away: g.away,
          ahs: g.hs,
          aas: g.as,
          awinner: null,
          amotm: g.motm || null,
          phs: pl.hs,
          pas: pl.as,
          pwinner: null,
          pmotm: pl.motm || null,
          pts: pl.pts,
          knockout: false,
          sort: gi,
        })
      }
    }
    // knockout (DB) — always after the group stage, ordered by kickoff
    for (const m of finished) {
      const p = preds[m.id]
      if (!p) continue
      rows.push({
        key: `k${m.id}`,
        home: m.home_team,
        away: m.away_team,
        ahs: m.home_score,
        aas: m.away_score,
        awinner: m.winner ?? null,
        amotm: m.motm ?? null,
        phs: p.home_score,
        pas: p.away_score,
        pwinner: p.winner ?? null,
        pmotm: p.motm ?? null,
        pts: p.points ?? 0,
        knockout: true,
        sort: 1e12 + (m.kickoff ? new Date(m.kickoff).getTime() : 0),
      })
    }
    return rows.sort((a, b) => a.sort - b.sort)
  }, [row, finished, preds])

  const badges: { icon: string; label: string }[] = []
  if (stats.perfect > 0) badges.push({ icon: '🎯', label: `${stats.perfect} perfect prediction${stats.perfect > 1 ? 's' : ''}` })
  if (stats.exact >= 3) badges.push({ icon: '🔭', label: `Sharpshooter — ${stats.exact} exact scores` })
  if (stats.motmHits >= 2) badges.push({ icon: '🧤', label: `MOTM reader — ${stats.motmHits} hits` })
  if (stats.koWinners > 0 && stats.winnerHits === stats.koWinners)
    badges.push({ icon: '🧠', label: 'Called every knockout winner' })

  if (loading) return <SkeletonRows rows={8} />
  if (!row) return <p className="text-zinc-400">Player not found.</p>

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
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Predictions</h2>
          {predRows.length > 0 && (
            <button
              className="btn-ghost px-3 py-1 text-sm"
              onClick={() => setOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}
              title="Toggle order"
            >
              {order === 'desc' ? 'Latest first ▼' : 'Earliest first ▲'}
            </button>
          )}
        </div>
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
                  <th className="px-3 py-2">Their MOTM</th>
                  <th className="px-3 py-2">Actual MOTM</th>
                  <th className="px-3 py-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {(order === 'desc' ? [...predRows].reverse() : predRows).map((r) => {
                  const motmHit =
                    !!r.pmotm && !!r.amotm && r.pmotm.trim().toLowerCase() === r.amotm.trim().toLowerCase()
                  return (
                    <tr key={r.key} className="border-t border-zinc-700/40">
                      <td className="whitespace-nowrap px-3 py-2">
                        <span className="flex items-center gap-1">
                          {!r.knockout && <span className="pill bg-zinc-700/50 text-[10px]">G</span>}
                          <Team name={r.home} height={11} /> v <Team name={r.away} height={11} />
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                        {r.ahs}–{r.aas}
                        {r.knockout && r.awinner && <span className="text-zinc-500"> ({r.awinner})</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 tabular-nums">
                        {r.phs ?? '–'}–{r.pas ?? '–'}
                        {r.knockout && r.pwinner && <span className="text-zinc-500"> ({r.pwinner})</span>}
                      </td>
                      <td className={`px-3 py-2 ${motmHit ? 'font-medium text-emerald-300' : 'text-zinc-400'}`}>
                        {r.pmotm ?? '—'}
                      </td>
                      <td className="px-3 py-2 text-zinc-400">{r.amotm ?? '—'}</td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums">{r.pts}</td>
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
