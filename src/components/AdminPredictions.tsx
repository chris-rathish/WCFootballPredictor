import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { isKnockout, type BracketPicks, type Match, type Prediction, type Profile, type R32Matchup, type Settings } from '../lib/types'
import Bracket from './Bracket'
import Team from './Team'
import MotmInput from './MotmInput'

type View = 'matches' | 'bracket'

export default function AdminPredictions() {
  const [players, setPlayers] = useState<Profile[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [userId, setUserId] = useState<string>('')
  const [view, setView] = useState<View>('matches')

  useEffect(() => {
    supabase.from('profiles').select('id, display_name, is_admin').order('display_name').then(({ data }: any) => {
      setPlayers((data as Profile[]) ?? [])
      if (data?.length && !userId) setUserId(data[0].id)
    })
    supabase.from('matches').select('*').order('kickoff', { ascending: true, nullsFirst: false }).then(({ data }: any) =>
      setMatches((data as Match[]) ?? [])
    )
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-zinc-400">Player</label>
        <select className="input max-w-xs" value={userId} onChange={(e) => setUserId(e.target.value)}>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.display_name}
            </option>
          ))}
        </select>
        <div className="ml-auto flex gap-1 text-sm">
          {(['matches', 'bracket'] as View[]).map((v) => (
            <button
              key={v}
              className={`rounded-md px-3 py-1 capitalize ${view === v ? 'bg-red-600 text-white' : 'bg-zinc-700/60 text-zinc-300'}`}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {userId && view === 'matches' && <MatchEditor userId={userId} matches={matches} />}
      {userId && view === 'bracket' && <BracketEditor userId={userId} />}
    </div>
  )
}

function MatchEditor({ userId, matches }: { userId: string; matches: Match[] }) {
  const [preds, setPreds] = useState<Record<number, Prediction>>({})
  const [filter, setFilter] = useState('')

  async function load() {
    const { data } = await supabase.from('predictions').select('*').eq('user_id', userId)
    const map: Record<number, Prediction> = {}
    ;(data as Prediction[] ?? []).forEach((p) => (map[p.match_id] = p))
    setPreds(map)
  }
  useEffect(() => {
    load()
  }, [userId])

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return matches
    return matches.filter(
      (m) =>
        m.home_team.toLowerCase().includes(q) ||
        m.away_team.toLowerCase().includes(q) ||
        (m.label ?? '').toLowerCase().includes(q) ||
        m.stage.toLowerCase().includes(q)
    )
  }, [matches, filter])

  return (
    <div className="space-y-2">
      <input className="input max-w-sm" placeholder="Filter matches (team, label, stage)…" value={filter} onChange={(e) => setFilter(e.target.value)} />
      {filtered.map((m) => (
        <PredRow key={m.id} match={m} userId={userId} pred={preds[m.id] ?? null} onSaved={load} />
      ))}
      {filtered.length === 0 && <p className="text-sm text-zinc-500">No matches.</p>}
    </div>
  )
}

function PredRow({ match, userId, pred, onSaved }: { match: Match; userId: string; pred: Prediction | null; onSaved: () => void }) {
  const knockout = isKnockout(match)
  const [home, setHome] = useState(pred?.home_score?.toString() ?? '')
  const [away, setAway] = useState(pred?.away_score?.toString() ?? '')
  const [motm, setMotm] = useState(pred?.motm ?? '')
  const [winner, setWinner] = useState(pred?.winner ?? '')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setHome(pred?.home_score?.toString() ?? '')
    setAway(pred?.away_score?.toString() ?? '')
    setMotm(pred?.motm ?? '')
    setWinner(pred?.winner ?? '')
  }, [pred])

  async function save() {
    const payload = {
      user_id: userId,
      match_id: match.id,
      home_score: home === '' ? null : parseInt(home, 10),
      away_score: away === '' ? null : parseInt(away, 10),
      motm: motm.trim() || null,
      winner: knockout ? winner || null : null,
    }
    const { error } = await supabase.from('predictions').upsert(payload, { onConflict: 'user_id,match_id' })
    if (error) return alert(error.message)
    setSaved(true)
    onSaved()
    setTimeout(() => setSaved(false), 1200)
  }

  return (
    <div className="card flex flex-wrap items-center gap-2 text-sm">
      <span className="pill bg-zinc-600/40">{match.stage}</span>
      <span className="flex min-w-[200px] items-center gap-1.5 font-medium">
        <Team name={match.home_team} /> vs <Team name={match.away_team} />
      </span>
      {match.status === 'finished' && (
        <span className="pill bg-red-500/20 text-red-300">
          {match.home_score}–{match.away_score}
        </span>
      )}
      <div className="ml-auto flex items-center gap-1">
        <input className="input w-12 text-center" value={home} onChange={(e) => setHome(e.target.value.replace(/[^0-9]/g, ''))} placeholder="–" />
        <span>:</span>
        <input className="input w-12 text-center" value={away} onChange={(e) => setAway(e.target.value.replace(/[^0-9]/g, ''))} placeholder="–" />
        {knockout && (
          <select className="input w-32" value={winner} onChange={(e) => setWinner(e.target.value)} title="Predicted to advance">
            <option value="">Advances…</option>
            <option value={match.home_team}>{match.home_team}</option>
            <option value={match.away_team}>{match.away_team}</option>
          </select>
        )}
        <MotmInput home={match.home_team} away={match.away_team} value={motm} onChange={setMotm} placeholder="MOTM" className="input w-44" />
        <button className="btn-primary px-3 py-1" onClick={save}>
          Save
        </button>
        {pred?.points != null && match.status === 'finished' && (
          <span className="pill bg-zinc-700">{pred.points} pts</span>
        )}
        {saved && <span className="text-red-300">✓</span>}
      </div>
    </div>
  )
}

function BracketEditor({ userId }: { userId: string }) {
  const [r32, setR32] = useState<R32Matchup[]>([])
  const [picks, setPicks] = useState<BracketPicks>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('settings').select('*').eq('id', 1).single().then(({ data }: any) => {
      setR32((data as Settings)?.bracket_r32 ?? [])
    })
  }, [])

  useEffect(() => {
    supabase.from('brackets').select('picks').eq('user_id', userId).maybeSingle().then(({ data }: any) => {
      setPicks((data?.picks as BracketPicks) ?? {})
    })
  }, [userId])

  async function save() {
    const { error } = await supabase.from('brackets').upsert({ user_id: userId, picks, updated_at: new Date().toISOString() })
    if (error) return alert(error.message)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={save}>
          Save this player’s bracket
        </button>
        {saved && <span className="text-sm text-red-300">Saved ✓</span>}
        <span className="text-sm text-zinc-400">Editing as admin — the deadline lock does not apply to you.</span>
      </div>
      <Bracket r32={r32} picks={picks} editable onChange={setPicks} />
    </div>
  )
}
