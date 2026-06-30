import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Match } from '../lib/types'

interface Day {
  date: string
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
      const matchDate: Record<number, string> = {}
      ;((m as Match[]) ?? []).forEach((mt) => {
        if (mt.kickoff) matchDate[mt.id] = new Date(mt.kickoff).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
      })
      // sum points per (date, user)
      const byDate: Record<string, Record<string, number>> = {}
      ;(p as any[] ?? []).forEach((pr) => {
        const d = matchDate[pr.match_id]
        if (!d) return
        ;(byDate[d] ??= {})[pr.user_id] = (byDate[d][pr.user_id] ?? 0) + (pr.points ?? 0)
      })
      const out: Day[] = Object.entries(byDate)
        .map(([date, users]) => {
          const max = Math.max(...Object.values(users))
          const top = Object.entries(users)
            .filter(([, v]) => v === max && max > 0)
            .map(([uid, v]) => ({ name: names[uid] ?? '—', pts: v }))
          return { date, top }
        })
        .filter((d) => d.top.length > 0)
      setDays(out)
    }
    load()
  }, [])

  if (days.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="mb-2 text-lg font-semibold">🏅 Matchday winners</h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((d) => (
          <div key={d.date} className="card flex items-center justify-between py-2 text-sm">
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
