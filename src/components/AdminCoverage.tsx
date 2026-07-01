import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { hasStarted, type Match, type Profile } from '../lib/types'
import Team from './Team'

// Admin overview: per match, who has and hasn't submitted a prediction.
export default function AdminCoverage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [players, setPlayers] = useState<Profile[]>([])
  const [byMatch, setByMatch] = useState<Record<number, Set<string>>>({})
  const [openId, setOpenId] = useState<number | null>(null)
  const [onlyOpen, setOnlyOpen] = useState(true)
  const [loading, setLoading] = useState(true)

  async function load() {
    const [{ data: m }, { data: profs }, { data: preds }] = await Promise.all([
      supabase.from('matches').select('*').order('kickoff', { ascending: true, nullsFirst: false }),
      supabase.from('profiles').select('id, display_name').order('display_name'),
      supabase.from('predictions').select('match_id, user_id'),
    ])
    setMatches((m as Match[]) ?? [])
    setPlayers((profs as Profile[]) ?? [])
    const map: Record<number, Set<string>> = {}
    ;(preds as any[] ?? []).forEach((p) => (map[p.match_id] ??= new Set()).add(p.user_id))
    setByMatch(map)
    setLoading(false)
  }
  useEffect(() => {
    load()
  }, [])

  const total = players.length
  const rows = useMemo(
    () => (onlyOpen ? matches.filter((m) => !hasStarted(m)) : matches),
    [matches, onlyOpen]
  )

  if (loading) return <p className="text-sm text-zinc-500">Loading…</p>

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} />
          Only open matches (not yet locked)
        </label>
        <span className="text-xs text-zinc-500">{total} players total · click a row to see who’s missing</span>
      </div>

      {rows.length === 0 ? (
        <div className="card text-sm text-zinc-500">No matches to show.</div>
      ) : (
        <div className="space-y-2">
          {rows.map((m) => {
            const done = byMatch[m.id]?.size ?? 0
            const missing = players.filter((p) => !byMatch[m.id]?.has(p.id))
            const pct = total ? Math.round((done / total) * 100) : 0
            const open = openId === m.id
            const complete = done >= total
            return (
              <div key={m.id} className="card">
                <button
                  className="flex w-full flex-wrap items-center gap-2 text-left text-sm"
                  onClick={() => setOpenId(open ? null : m.id)}
                >
                  <span className="pill bg-zinc-600/40">{m.stage}</span>
                  <span className="flex min-w-[200px] items-center gap-1.5 font-medium">
                    <Team name={m.home_team} /> vs <Team name={m.away_team} />
                  </span>
                  {m.label && <span className="text-zinc-500">{m.label}</span>}
                  <span className="ml-auto text-xs text-zinc-400">
                    {m.kickoff ? new Date(m.kickoff).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'no kickoff'}
                  </span>
                  <span
                    className={`pill ${complete ? 'bg-emerald-500/20 text-emerald-300' : done === 0 ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}
                  >
                    {done}/{total} predicted · {pct}%
                  </span>
                  <span className="text-zinc-500">{open ? '▲' : '▼'}</span>
                </button>

                {/* progress bar */}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full ${complete ? 'bg-emerald-400' : 'bg-amber-400'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {open && (
                  <div className="mt-3 text-sm">
                    {missing.length === 0 ? (
                      <p className="text-emerald-300">Everyone has predicted this match. 🎉</p>
                    ) : (
                      <>
                        <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                          Hasn’t predicted ({missing.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {missing.map((p) => (
                            <span key={p.id} className="pill bg-red-500/15 text-red-200">
                              {p.display_name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
