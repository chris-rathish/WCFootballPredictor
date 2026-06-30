import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { isKnockout, isPredictable, type Match, type Prediction } from '../lib/types'
import MatchCard, { type MatchDraft } from '../components/MatchCard'

function predToDraft(p: Prediction | null): MatchDraft {
  return {
    home: p?.home_score?.toString() ?? '',
    away: p?.away_score?.toString() ?? '',
    motm: p?.motm ?? '',
    winner: p?.winner ?? '',
  }
}

export default function MatchesPage() {
  const { session } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [drafts, setDrafts] = useState<Record<number, MatchDraft>>({})
  const [loading, setLoading] = useState(true)
  const [savingAll, setSavingAll] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

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
      // seed drafts from saved predictions (don't clobber unsaved edits)
      setDrafts((prev) => {
        const next = { ...prev }
        for (const x of (p as Prediction[]) ?? []) {
          if (!(x.match_id in next)) next[x.match_id] = predToDraft(x)
        }
        return next
      })
    }
    setLoading(false)
  }, [session])

  useEffect(() => {
    load()
  }, [load])

  const open = useMemo(() => matches.filter(isPredictable), [matches])

  const draftFor = (m: Match) => drafts[m.id] ?? predToDraft(preds[m.id] ?? null)

  function changeDraft(matchId: number, field: keyof MatchDraft, value: string) {
    setDrafts((prev) => {
      const cur = prev[matchId] ?? predToDraft(preds[matchId] ?? null)
      return { ...prev, [matchId]: { ...cur, [field]: value } }
    })
  }

  async function saveAll() {
    if (!session?.user) return
    setSavingAll(true)
    setMsg(null)
    const payloads = open
      .map((m) => {
        const d = draftFor(m)
        const knockout = isKnockout(m)
        const complete = d.home !== '' && d.away !== '' && d.motm.trim() !== '' && (!knockout || d.winner !== '')
        if (!complete) return null
        return {
          user_id: session.user!.id,
          match_id: m.id,
          home_score: parseInt(d.home, 10),
          away_score: parseInt(d.away, 10),
          motm: d.motm.trim(),
          winner: knockout ? d.winner : null,
        }
      })
      .filter(Boolean) as any[]

    if (payloads.length === 0) {
      setMsg('Fill in at least one match (score, winner & MOTM) first.')
      setSavingAll(false)
      return
    }
    const { error } = await supabase.from('predictions').upsert(payloads, { onConflict: 'user_id,match_id' })
    setSavingAll(false)
    if (error) {
      setMsg(error.message)
    } else {
      setMsg(`Saved ${payloads.length} pick${payloads.length > 1 ? 's' : ''} ✓`)
      load()
      setTimeout(() => setMsg(null), 2500)
    }
  }

  if (loading) return <p className="text-zinc-400">Loading matches…</p>

  return (
    <div>
      <section>
        <div className="mb-1 flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-bold">Open for Predictions</h1>
          {open.length > 0 && (
            <button className="btn-primary ml-auto" onClick={saveAll} disabled={savingAll}>
              {savingAll ? 'Saving…' : 'Save all picks'}
            </button>
          )}
          {msg && <span className="text-sm text-red-300">{msg}</span>}
        </div>
        <p className="mb-3 text-sm text-zinc-400">
          {open.length === 0
            ? 'Nothing open right now — each match stays open until 1 hour before kickoff.'
            : 'Fill in any matches, then “Save all picks” saves every one you’ve completed at once. Locks 1 hour before kickoff.'}
        </p>
        {open.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {open.map((m) => (
              <MatchCard
                key={m.id}
                match={m}
                myPrediction={preds[m.id] ?? null}
                onSaved={load}
                draft={draftFor(m)}
                onDraftChange={(field, value) => changeDraft(m.id, field, value)}
                onSaveAll={saveAll}
                savingAll={savingAll}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
