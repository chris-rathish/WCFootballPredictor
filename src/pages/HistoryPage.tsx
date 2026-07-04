import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { hasStarted, type Match, type Prediction } from '../lib/types'
import MatchCard from '../components/MatchCard'
import GroupMatchArchive from '../components/GroupMatchArchive'
import Collapsible from '../components/Collapsible'
import { GROUP_MATCH_PREDS } from '../data/groupMatchPreds'

const groupMatchCount = GROUP_MATCH_PREDS.reduce((n, d) => n + d.games.length, 0)

export default function HistoryPage() {
  const { session } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    const { data: m } = await supabase
      .from('matches')
      .select('*')
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

  // locked (window closed) but result not in yet — predictions visible, no score
  const awaiting = useMemo(
    () => matches.filter((m) => m.status !== 'finished' && hasStarted(m)),
    [matches]
  )
  const completed = useMemo(() => matches.filter((m) => m.status === 'finished'), [matches])
  // R32 is over — collapse it so the current round leads
  const completedR32 = useMemo(() => completed.filter((m) => m.stage === 'R32'), [completed])
  const completedRest = useMemo(() => completed.filter((m) => m.stage !== 'R32'), [completed])

  if (loading) return <p className="text-zinc-400">Loading history…</p>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold">Match History</h1>
        <p className="text-sm text-zinc-400">Predictions are visible once the window closes (1h before kickoff).</p>
      </div>

      {/* Locked, awaiting result */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-lg font-semibold">🔒 Locked — awaiting result</h2>
          {awaiting.length > 0 && <span className="pill bg-amber-500/20 text-amber-300">{awaiting.length}</span>}
        </div>
        <p className="mb-3 text-sm text-zinc-400">Predictions are in and revealed; points are added once the admin enters the result.</p>
        {awaiting.length === 0 ? (
          <div className="card text-sm text-zinc-500">Nothing locked right now.</div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {awaiting.map((m) => (
              <MatchCard key={m.id} match={m} myPrediction={preds[m.id] ?? null} onSaved={load} />
            ))}
          </div>
        )}
      </section>

      {/* Completed (knockout, in-app) */}
      <section>
        <h2 className="mb-1 text-lg font-semibold">✅ Completed (knockout)</h2>
        <p className="mb-3 text-sm text-zinc-400">Final results with everyone’s picks and points.</p>
        {completed.length === 0 ? (
          <div className="card text-sm text-zinc-500">No matches completed yet.</div>
        ) : (
          <div className="space-y-3">
            {completedRest.length > 0 && (
              <div className="grid gap-3 md:grid-cols-2">
                {completedRest.map((m) => (
                  <MatchCard key={m.id} match={m} myPrediction={preds[m.id] ?? null} onSaved={load} />
                ))}
              </div>
            )}
            {completedR32.length > 0 && (
              <Collapsible title="Round of 32" count={completedR32.length}>
                <div className="grid gap-3 md:grid-cols-2">
                  {completedR32.map((m) => (
                    <MatchCard key={m.id} match={m} myPrediction={preds[m.id] ?? null} onSaved={load} />
                  ))}
                </div>
              </Collapsible>
            )}
          </div>
        )}
      </section>

      {/* Group stage day-by-day archive (everyone's predictions) — collapsed, it's over */}
      <section>
        <Collapsible title="⚽ Group Stage — day by day" count={groupMatchCount}>
          <p className="mb-3 text-sm text-zinc-400">Every group match — tap a game to see everyone’s score, winner, MOTM and points.</p>
          <GroupMatchArchive />
        </Collapsible>
      </section>
    </div>
  )
}
