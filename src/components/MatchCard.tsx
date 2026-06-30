import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { hasStarted, isKnockout, isPredictable, outcomeLabel, predictionClosesAt, type Match, type Prediction } from '../lib/types'
import { scorePrediction } from '../lib/scoring'
import Team from './Team'
import MotmInput from './MotmInput'

interface Props {
  match: Match
  myPrediction: Prediction | null
  onSaved: () => void
}

function fmtRemaining(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${sec}s`
  return `${m}m ${sec}s`
}

function Countdown({ target, prefix, className }: { target: number; prefix: string; className?: string }) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  if (target - now <= 0) return null
  return (
    <span className={className}>
      {prefix} <span className="font-semibold tabular-nums">{fmtRemaining(target - now)}</span>
    </span>
  )
}

interface OtherPred {
  user_id: string
  home_score: number | null
  away_score: number | null
  motm: string | null
  winner: string | null
  points: number
  display_name: string
}

export default function MatchCard({ match, myPrediction, onSaved }: Props) {
  const { session } = useAuth()
  const predictable = isPredictable(match)
  const started = hasStarted(match)
  const finished = match.status === 'finished'

  const knockout = isKnockout(match)
  const [home, setHome] = useState<string>(myPrediction?.home_score?.toString() ?? '')
  const [away, setAway] = useState<string>(myPrediction?.away_score?.toString() ?? '')
  const [motm, setMotm] = useState<string>(myPrediction?.motm ?? '')
  const [winner, setWinner] = useState<string>(myPrediction?.winner ?? '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const [others, setOthers] = useState<OtherPred[] | null>(null)
  const [showOthers, setShowOthers] = useState(false)

  useEffect(() => {
    setHome(myPrediction?.home_score?.toString() ?? '')
    setAway(myPrediction?.away_score?.toString() ?? '')
    setMotm(myPrediction?.motm ?? '')
    setWinner(myPrediction?.winner ?? '')
  }, [myPrediction])

  const complete =
    home !== '' && away !== '' && motm.trim() !== '' && (!knockout || winner !== '')

  async function loadOthers() {
    // toggle closed if already open
    if (showOthers) {
      setShowOthers(false)
      return
    }
    setShowOthers(true)
    if (others) return
    const { data } = await supabase
      .from('predictions')
      .select('user_id, home_score, away_score, motm, winner, points, profiles(display_name)')
      .eq('match_id', match.id)
    const rows: OtherPred[] = (data ?? []).map((r: any) => ({
      user_id: r.user_id,
      home_score: r.home_score,
      away_score: r.away_score,
      motm: r.motm,
      winner: r.winner,
      points: r.points,
      display_name: r.profiles?.display_name ?? '—',
    }))
    rows.sort((a, b) => b.points - a.points)
    setOthers(rows)
  }

  async function save() {
    if (!session?.user || !complete) return
    setSaving(true)
    setMsg(null)
    const payload = {
      user_id: session.user.id,
      match_id: match.id,
      home_score: parseInt(home, 10),
      away_score: parseInt(away, 10),
      motm: motm.trim(),
      winner: knockout ? winner : null,
    }
    const { error } = await supabase.from('predictions').upsert(payload, { onConflict: 'user_id,match_id' })
    setSaving(false)
    if (error) {
      setMsg(error.message)
    } else {
      setMsg('Saved ✓')
      onSaved()
      setTimeout(() => setMsg(null), 1500)
    }
  }

  const kickoffStr = match.kickoff
    ? new Date(match.kickoff).toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'TBD'

  const previewPts =
    finished && myPrediction
      ? scorePrediction(match, {
          home_score: myPrediction.home_score,
          away_score: myPrediction.away_score,
          motm: myPrediction.motm,
          winner: myPrediction.winner,
        })
      : null

  return (
    <div className="card">
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
        <span>
          {match.stage !== 'group' ? (
            <span className="pill bg-amber-500/20 text-amber-300">{match.stage}</span>
          ) : (
            match.grp && <span className="pill bg-zinc-600/40">Group {match.grp}</span>
          )}{' '}
          {match.label}
        </span>
        <span>{kickoffStr}</span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex justify-end font-semibold"><Team name={match.home_team} /></div>
        <div className="flex items-center gap-1">
          {predictable ? (
            <>
              <input
                className="input w-12 text-center"
                inputMode="numeric"
                value={home}
                onChange={(e) => setHome(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="–"
              />
              <span className="text-zinc-500">:</span>
              <input
                className="input w-12 text-center"
                inputMode="numeric"
                value={away}
                onChange={(e) => setAway(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="–"
              />
            </>
          ) : (
            <span className="rounded bg-zinc-900 px-3 py-1 text-lg font-bold tabular-nums">
              {finished ? `${match.home_score ?? '–'} : ${match.away_score ?? '–'}` : started ? 'LOCKED' : 'vs'}
            </span>
          )}
        </div>
        <div className="font-semibold"><Team name={match.away_team} /></div>
      </div>

      {finished && (
        <div className="mt-1 flex flex-wrap items-center justify-center gap-1 text-xs text-red-300">
          Result: {match.home_score}–{match.away_score}
          {knockout && match.winner && (
            <>
              {' '}· advances: <Team name={match.winner} height={12} />
            </>
          )}
          {match.motm && <> · MOTM: {match.motm}</>}
        </div>
      )}

      {/* Live countdown */}
      {!finished && match.kickoff && (
        <div className="mt-1 text-center text-xs">
          {predictable ? (
            <Countdown
              target={predictionClosesAt(match)!.getTime()}
              prefix="🔒 Predictions lock in"
              className="text-amber-300"
            />
          ) : Date.now() < new Date(match.kickoff).getTime() ? (
            <Countdown target={new Date(match.kickoff).getTime()} prefix="⚽ Kicks off in" className="text-zinc-400" />
          ) : (
            <span className="text-zinc-500">⏱ In progress — awaiting result</span>
          )}
        </div>
      )}

      {/* Editable form — only on match day, before kickoff */}
      {predictable && (
        <div className="mt-3 space-y-2">
          {knockout && (
            <div>
              <div className="mb-1 text-xs text-zinc-400">Who advances? (penalties count)</div>
              <div className="grid grid-cols-2 gap-2">
                {[match.home_team, match.away_team].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setWinner(t)}
                    className={`rounded-md px-2 py-1.5 text-sm transition ${
                      winner === t ? 'bg-red-600 text-white font-semibold' : 'bg-zinc-700/60 text-zinc-200 hover:bg-zinc-600'
                    }`}
                  >
                    <Team name={t} height={12} className="w-full justify-center" />
                  </button>
                ))}
              </div>
            </div>
          )}
          <MotmInput
            home={match.home_team}
            away={match.away_team}
            value={motm}
            onChange={setMotm}
            placeholder="Man of the Match (required)"
          />
          <div className="flex items-center gap-3">
            <button className="btn-primary" onClick={save} disabled={saving || !complete}>
              {saving ? 'Saving…' : myPrediction ? 'Update pick' : 'Save pick'}
            </button>
            {!complete && (
              <span className="text-xs text-amber-300">
                {knockout ? 'Score, winner & MOTM required' : 'Score & MOTM required'}
              </span>
            )}
            {msg && <span className="text-sm text-red-300">{msg}</span>}
          </div>
        </div>
      )}

      {/* No kickoff set yet — can't open predictions */}
      {!predictable && !started && (
        <div className="mt-3 rounded-lg bg-zinc-900/50 px-3 py-2 text-center text-sm text-zinc-400">
          🔒 Predictions open once a kickoff time is set
        </div>
      )}

      {/* Started / finished — show your pick and everyone else's */}
      {started && (
        <div className="mt-3">
          {myPrediction ? (
            <div className="text-sm text-zinc-300">
              Your pick: <span className="font-semibold">{myPrediction.home_score ?? '–'}–{myPrediction.away_score ?? '–'}</span>
              {knockout && myPrediction.winner && <> · advances: {myPrediction.winner}</>}
              {myPrediction.motm && <> · MOTM: {myPrediction.motm}</>}
              {previewPts != null && (
                <span className="ml-2 pill bg-red-500/20 text-red-300">+{previewPts} pts</span>
              )}
            </div>
          ) : (
            <div className="text-sm text-zinc-500">You didn't predict this match.</div>
          )}

          <button className="mt-2 text-sm text-red-400 hover:underline" onClick={loadOthers}>
            {showOthers ? 'Hide everyone’s picks ▲' : 'Show everyone’s picks ▼'}
          </button>

          {showOthers && others && (
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-zinc-400">
                  <tr>
                    <th className="py-1 pr-3">Player</th>
                    <th className="py-1 pr-3">Score</th>
                    {knockout && <th className="py-1 pr-3">Advances</th>}
                    <th className="py-1 pr-3">MOTM</th>
                    <th className="py-1 text-right">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {others.map((o) => (
                    <tr key={o.user_id} className="border-t border-zinc-700/40">
                      <td className="py-1 pr-3">{o.display_name}</td>
                      <td className="py-1 pr-3 tabular-nums">
                        {o.home_score ?? '–'}–{o.away_score ?? '–'}
                      </td>
                      {knockout && <td className="py-1 pr-3 text-zinc-400">{o.winner ?? '—'}</td>}
                      <td className="py-1 pr-3 text-zinc-400">{o.motm ?? '—'}</td>
                      <td className="py-1 text-right font-semibold tabular-nums">{o.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
