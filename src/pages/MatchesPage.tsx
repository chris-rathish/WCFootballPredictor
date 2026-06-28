import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { isPredictable, predictionOpensAt, type Match, type Prediction } from '../lib/types'
import MatchCard from '../components/MatchCard'

export default function MatchesPage() {
  const { session } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data: m } = await supabase
      .from('matches')
      .select('*')
      .order('kickoff', { ascending: true, nullsFirst: false })
    setMatches((m as Match[]) ?? [])

    if (session?.user) {
      const { data: p } = await supabase.from('predictions').select('*').eq('user_id', session.user.id)
      const map: Record<number, Prediction> = {}
      ;(p as Prediction[] ?? []).forEach((x) => (map[x.match_id] = x))
      setPreds(map)
    }
    setLoading(false)
  }, [session])

  useEffect(() => {
    load()
  }, [load])

  // Open now (within 24h of kickoff) vs upcoming (window not open yet).
  const open = useMemo(() => matches.filter(isPredictable), [matches])
  const upcoming = useMemo(
    () =>
      matches.filter((m) => {
        if (m.status !== 'scheduled' || !m.kickoff) return false
        const opensAt = predictionOpensAt(m)
        return opensAt != null && Date.now() < opensAt.getTime()
      }),
    [matches]
  )

  if (loading) return <p className="text-zinc-400">Loading matches…</p>

  return (
    <div>
      <section className="mb-8">
        <h1 className="mb-1 text-xl font-bold">Open for Predictions</h1>
        <p className="mb-3 text-sm text-zinc-400">
          {open.length === 0
            ? 'Nothing open right now — predictions open 24 hours before each kickoff.'
            : 'Enter your scoreline and Man of the Match. Locks at kickoff.'}
        </p>
        {open.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {open.map((m) => (
              <MatchCard key={m.id} match={m} myPrediction={preds[m.id] ?? null} onSaved={load} />
            ))}
          </div>
        )}
      </section>

      {upcoming.length > 0 && (
        <section>
          <h2 className="mb-1 text-lg font-semibold">Upcoming</h2>
          <p className="mb-3 text-sm text-zinc-400">These open for predictions 24 hours before kickoff.</p>
          <div className="grid gap-3 md:grid-cols-2">
            {upcoming.map((m) => (
              <MatchCard key={m.id} match={m} myPrediction={preds[m.id] ?? null} onSaved={load} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
