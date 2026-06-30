import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Match } from '../lib/types'

interface Day {
  key: string // yyyy-mm-dd for sorting
  date: string // display label
  top: { name: string; pts: number }[]
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
        const k = dt.toISOString().slice(0, 10)
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
          const max = Math.max(...Object.values(users))
          const top = Object.entries(users)
            .filter(([, v]) => v === max && max > 0)
            .map(([uid, v]) => ({ name: names[uid] ?? '—', pts: v }))
          return { key, date: label[key] ?? key, top }
        })
        .filter((d) => d.top.length > 0)
        .sort((a, b) => b.key.localeCompare(a.key)) // most recent first
        .slice(0, 2) // only the last 2 matchdays
      setDays(out)
    }
    load()
  }, [])

  if (days.length === 0) return null

  return (
    <div className="mb-6">
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
  )
}
