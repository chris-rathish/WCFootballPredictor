import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Match, Prediction } from '../lib/types'
import MatchCard from '../components/MatchCard'

export default function HistoryPage() {
  const { session } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data: m } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'finished')
      .order('kickoff', { ascending: false, nullsFirst: false })
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

  if (loading) return <p className="text-zinc-400">Loading history…</p>

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold">Match History</h1>
      <p className="mb-4 text-sm text-zinc-400">All completed matches with final results — expand any match to see everyone’s picks and points.</p>

      {matches.length === 0 ? (
        <div className="card text-zinc-400">No matches have been completed yet.</div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} myPrediction={preds[m.id] ?? null} onSaved={load} />
          ))}
        </div>
      )}
    </div>
  )
}
