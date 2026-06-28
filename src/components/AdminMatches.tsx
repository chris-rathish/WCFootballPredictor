import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { isLocked, type Match, type Stage } from '../lib/types'
import { TEAM_NAMES, TEAM_DATALIST_ID } from '../lib/flags'
import Team from './Team'
import MotmInput from './MotmInput'

const STAGES: Stage[] = ['group', 'R32', 'R16', 'QF', 'SF', '3RD', 'FINAL']

const emptyForm = {
  stage: 'R32' as Stage,
  grp: '',
  label: '',
  home_team: '',
  away_team: '',
  kickoff: '',
}

export default function AdminMatches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [form, setForm] = useState({ ...emptyForm })
  const [msg, setMsg] = useState<string | null>(null)

  async function load() {
    const { data } = await supabase.from('matches').select('*').order('kickoff', { ascending: true, nullsFirst: false })
    setMatches((data as Match[]) ?? [])
  }
  useEffect(() => {
    load()
  }, [])

  async function addMatch(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    const payload = {
      stage: form.stage,
      grp: form.grp.trim() || null,
      label: form.label.trim() || null,
      home_team: form.home_team.trim(),
      away_team: form.away_team.trim(),
      kickoff: form.kickoff ? new Date(form.kickoff).toISOString() : null,
    }
    const { error } = await supabase.from('matches').insert(payload)
    if (error) setMsg(error.message)
    else {
      setForm({ ...emptyForm })
      load()
    }
  }

  async function deleteMatch(id: number) {
    if (!confirm('Delete this match and all its predictions?')) return
    await supabase.from('matches').delete().eq('id', id)
    load()
  }

  // team autofill = known WC teams ∪ teams already used in matches
  const teamOptions = Array.from(
    new Set([...TEAM_NAMES, ...matches.flatMap((m) => [m.home_team, m.away_team])])
  ).sort((a, b) => a.localeCompare(b))

  // categorise
  const awaiting = matches.filter((m) => m.status !== 'finished' && isLocked(m)) // kicked off, no result yet
  const upcoming = matches.filter((m) => m.status !== 'finished' && !isLocked(m)) // not started
  const completed = matches.filter((m) => m.status === 'finished')

  return (
    <div className="space-y-8">
      <datalist id={TEAM_DATALIST_ID}>
        {teamOptions.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>

      {/* ============ STEP 1: upload the day's fixtures ============ */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <span className="pill bg-red-600 text-white">1</span>
          <h3 className="text-lg font-semibold">Add the match(es) of the day</h3>
        </div>
        <p className="mb-3 text-sm text-zinc-400">Create fixtures so players can predict them. Set the kickoff — predictions auto-lock then.</p>
        <form onSubmit={addMatch} className="card grid gap-3 md:grid-cols-3">
          <div>
            <label className="text-xs text-zinc-400">Stage</label>
            <select className="input" value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value as Stage })}>
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-zinc-400">Group (optional)</label>
            <input className="input" value={form.grp} onChange={(e) => setForm({ ...form, grp: e.target.value })} placeholder="A" />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Label (optional)</label>
            <input className="input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="RTT3" />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Home team</label>
            <input className="input" required list={TEAM_DATALIST_ID} value={form.home_team} onChange={(e) => setForm({ ...form, home_team: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Away team</label>
            <input className="input" required list={TEAM_DATALIST_ID} value={form.away_team} onChange={(e) => setForm({ ...form, away_team: e.target.value })} />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Kickoff (local time)</label>
            <input className="input" type="datetime-local" value={form.kickoff} onChange={(e) => setForm({ ...form, kickoff: e.target.value })} />
          </div>
          <div className="md:col-span-3 flex items-center gap-3">
            <button className="btn-primary">Add match</button>
            {msg && <span className="text-sm text-red-400">{msg}</span>}
          </div>
        </form>

        {upcoming.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Scheduled (not started yet)</p>
            {upcoming.map((m) => (
              <div key={m.id} className="card flex flex-wrap items-center gap-2 text-sm">
                <span className="pill bg-zinc-600/40">{m.stage}</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Team name={m.home_team} /> vs <Team name={m.away_team} />
                </span>
                <span className="text-zinc-400">{m.label}</span>
                <span className="ml-auto text-zinc-400">
                  {m.kickoff ? new Date(m.kickoff).toLocaleString() : 'no kickoff set'}
                </span>
                <button className="btn-ghost px-2 py-1 text-red-300" onClick={() => deleteMatch(m.id)} title="Delete">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============ STEP 2: enter results ============ */}
      <section>
        <div className="mb-2 flex items-center gap-2">
          <span className="pill bg-red-600 text-white">2</span>
          <h3 className="text-lg font-semibold">Enter results</h3>
          {awaiting.length > 0 && <span className="pill bg-amber-500/20 text-amber-300">{awaiting.length} awaiting</span>}
        </div>
        <p className="mb-3 text-sm text-zinc-400">
          After a match ends, enter the final score and Man of the Match, then press <b>Finish</b> to score everyone.
        </p>

        {awaiting.length === 0 ? (
          <div className="card text-sm text-zinc-500">No matches are waiting for results right now.</div>
        ) : (
          <div className="space-y-2">
            {awaiting.map((m) => (
              <ResultRow key={m.id} match={m} onChanged={load} onDelete={() => deleteMatch(m.id)} />
            ))}
          </div>
        )}
      </section>

      {/* ============ Completed (editable) ============ */}
      {completed.length > 0 && (
        <section>
          <h3 className="mb-2 text-lg font-semibold text-zinc-300">Completed</h3>
          <p className="mb-3 text-sm text-zinc-400">Already scored — edit if you need to correct a result.</p>
          <div className="space-y-2">
            {completed.map((m) => (
              <ResultRow key={m.id} match={m} onChanged={load} onDelete={() => deleteMatch(m.id)} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function ResultRow({ match, onChanged, onDelete }: { match: Match; onChanged: () => void; onDelete: () => void }) {
  const [home, setHome] = useState(match.home_score?.toString() ?? '')
  const [away, setAway] = useState(match.away_score?.toString() ?? '')
  const [motm, setMotm] = useState(match.motm ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  async function saveResult(finish: boolean) {
    setSaving(true)
    setSaved(false)
    const { error } = await supabase
      .from('matches')
      .update({
        home_score: home === '' ? null : parseInt(home, 10),
        away_score: away === '' ? null : parseInt(away, 10),
        motm: motm.trim() || null,
        status: finish ? 'finished' : 'scheduled',
      })
      .eq('id', match.id)
    setSaving(false)
    if (!error) {
      setSaved(true)
      onChanged()
      setTimeout(() => setSaved(false), 1500)
    } else {
      alert(error.message)
    }
  }

  return (
    <div className="card flex flex-wrap items-center gap-2 text-sm">
      <span className="pill bg-zinc-600/40">{match.stage}</span>
      <span className="flex min-w-[200px] items-center gap-1.5 font-medium">
        <Team name={match.home_team} /> vs <Team name={match.away_team} />
      </span>
      <span className={`pill ${match.status === 'finished' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>
        {match.status === 'finished' ? 'finished' : 'awaiting result'}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <input className="input w-12 text-center" value={home} onChange={(e) => setHome(e.target.value.replace(/[^0-9]/g, ''))} placeholder="–" />
        <span>:</span>
        <input className="input w-12 text-center" value={away} onChange={(e) => setAway(e.target.value.replace(/[^0-9]/g, ''))} placeholder="–" />
        <MotmInput home={match.home_team} away={match.away_team} value={motm} onChange={setMotm} placeholder="MOTM" className="input w-44" />
        <button className="btn-primary px-3 py-1" disabled={saving} onClick={() => saveResult(true)} title="Save result & mark finished (scores everyone)">
          {saving ? '…' : 'Finish'}
        </button>
        <button className="btn-ghost px-3 py-1" disabled={saving} onClick={() => saveResult(false)} title="Save without finishing">
          Save
        </button>
        <button className="btn-ghost px-2 py-1 text-red-300" onClick={onDelete} title="Delete">
          ✕
        </button>
        {saved && <span className="text-red-300">✓</span>}
      </div>
    </div>
  )
}
