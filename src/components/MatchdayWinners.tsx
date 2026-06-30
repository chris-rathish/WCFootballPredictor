import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Match } from '../lib/types'

interface Day {
  key: string // yyyy-mm-dd for sorting
  date: string // display label
  top: { name: string; pts: number }[] // best scorer(s)
  bottom: { name: string; pts: number }[] // worst scorer(s), among those who predicted
}

export default function MatchdayWinners() {
  const [days, setDays] = useState<Day[]>([])

  useEffect(() => {
    async function load() {
      const [{ data: m }, { data: p }, { data: profs }] = await Promise.all([
        supabase.from('matches').select('id, kickoff, status').eq('status', 'finished'),
        supabase.from('predictions').select('match_id, user_id, points'),
        supabase.from('profiles').select('id, display_name'),
      ])
      const names: Record<string, string> = {}
      ;(profs as any[] ?? []).forEach((r) => (names[r.id] = r.display_name))
      // map each match to a sortable day key (yyyy-mm-dd) + display label
      const matchKey: Record<number, string> = {}
      const label: Record<string, string> = {}
      ;((m as Match[]) ?? []).forEach((mt) => {
        if (!mt.kickoff) return
        const dt = new Date(mt.kickoff)
        // local-date key (yyyy-mm-dd) so it matches the local display label —
        // toISOString() is UTC and would split a single matchday across midnight.
        const k = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
        matchKey[mt.id] = k
        label[k] = dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      })
      // sum points per (day, user)
      const byDate: Record<string, Record<string, number>> = {}
      ;(p as any[] ?? []).forEach((pr) => {
        const k = matchKey[pr.match_id]
        if (!k) return
        ;(byDate[k] ??= {})[pr.user_id] = (byDate[k][pr.user_id] ?? 0) + (pr.points ?? 0)
      })
      const out: Day[] = Object.entries(byDate)
        .map(([key, users]) => {
          const vals = Object.values(users) // only players who predicted that day
          const max = Math.max(...vals)
          const min = Math.min(...vals)
          const top = Object.entries(users)
            .filter(([, v]) => v === max && max > 0)
            .map(([uid, v]) => ({ name: names[uid] ?? '—', pts: v }))
          // losers only when there's a spread (everyone tied => no "worst")
          const bottom =
            min < max
              ? Object.entries(users)
                  .filter(([, v]) => v === min)
                  .map(([uid, v]) => ({ name: names[uid] ?? '—', pts: v }))
              : []
          return { key, date: label[key] ?? key, top, bottom }
        })
        .filter((d) => d.top.length > 0)
        .sort((a, b) => b.key.localeCompare(a.key)) // most recent first
        .slice(0, 2) // only the last 2 matchdays
      setDays(out)
    }
    load()
  }, [])

  if (days.length === 0) return null

  const losers = days.filter((d) => d.bottom.length > 0)

  return (
    <div className="mb-6 space-y-4">
      <div>
        <h2 className="mb-2 text-lg font-semibold">🏅 Matchday winners</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {days.map((d) => (
            <div key={d.key} className="card flex items-center justify-between py-2 text-sm">
              <span className="text-zinc-400">{d.date}</span>
              <span className="font-medium">
                {d.top.map((t) => t.name).join(', ')} <span className="text-emerald-300">({d.top[0].pts})</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {losers.length > 0 && (
        <div>
          <h2 className="mb-2 text-lg font-semibold">💀 Matchday losers</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {losers.map((d) => (
              <div key={d.key} className="card flex items-center justify-between py-2 text-sm">
                <span className="text-zinc-400">{d.date}</span>
                <span className="font-medium">
                  {d.bottom.map((t) => t.name).join(', ')} <span className="text-red-400">({d.bottom[0].pts})</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-1 text-xs text-zinc-500">Lowest score among players who predicted that day.</p>
        </div>
      )}
    </div>
  )
}
