import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { isKnockout, isLocked, type Match, type Stage } from '../lib/types'
import { KNOCKOUT_KICKOFFS } from '../lib/knockoutSchedule'
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

  // ---- auto-generate the next knockout round from finished results ----
  const labelNum = (l: string | null) => parseInt((l ?? '').match(/\d+/)?.[0] ?? '0', 10)
  const loserOf = (m: Match) => (m.winner === m.home_team ? m.away_team : m.home_team)

  async function generateNextRound() {
    const order: { from: Stage; to: Stage }[] = [
      { from: 'R32', to: 'R16' },
      { from: 'R16', to: 'QF' },
      { from: 'QF', to: 'SF' },
      { from: 'SF', to: 'FINAL' },
    ]
    for (const { from, to } of order) {
      const cur = matches.filter((m) => m.stage === from).sort((a, b) => labelNum(a.label) - labelNum(b.label))
      if (cur.length === 0) continue
      const allDone = cur.every((m) => m.status === 'finished' && m.winner)
      const nextExists = matches.some((m) => m.stage === to)
      if (!allDone || nextExists) continue

      const newMatches: any[] = []
      if (to === 'FINAL') {
        // final + 3rd place from the two semis
        const [s1, s2] = cur
        newMatches.push({ stage: 'FINAL', label: 'FINAL', home_team: s1.winner, away_team: s2.winner, kickoff: KNOCKOUT_KICKOFFS['FINAL'] ?? null })
        newMatches.push({ stage: '3RD', label: '3RD', home_team: loserOf(s1), away_team: loserOf(s2), kickoff: KNOCKOUT_KICKOFFS['3RD'] ?? null })
      } else {
        for (let i = 0; i < cur.length; i += 2) {
          const label = `${to}-${i / 2 + 1}`
          newMatches.push({
            stage: to,
            label,
            home_team: cur[i].winner,
            away_team: cur[i + 1]?.winner ?? 'TBD',
            kickoff: KNOCKOUT_KICKOFFS[label] ?? null, // pre-fill from the WC26 schedule
          })
        }
      }
      const { error } = await supabase.from('matches').insert(newMatches)
      if (error) alert(error.message)
      else {
        alert(`Created ${newMatches.length} ${to} fixture(s) with kickoff times from the WC26 schedule — adjust below if needed.`)
        load()
      }
      return
    }
    alert('Nothing to generate — the current round isn’t fully finished, or the next round already exists.')
  }

  // fill kickoff for any existing knockout fixture that's missing one (from the WC26 schedule)
  async function backfillKickoffs() {
    const missing = matches.filter((m) => !m.kickoff && m.label && KNOCKOUT_KICKOFFS[m.label])
    if (!missing.length) return alert('No missing kickoff times to fill — every knockout fixture already has one.')
    for (const m of missing) {
      const { error } = await supabase.from('matches').update({ kickoff: KNOCKOUT_KICKOFFS[m.label!] }).eq('id', m.id)
      if (error) return alert(error.message)
    }
    alert(`Set kickoff times for ${missing.length} match(es) from the WC26 schedule.`)
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
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="pill bg-red-600 text-white">1</span>
          <h3 className="text-lg font-semibold">Add the match(es) of the day</h3>
          <button className="btn-ghost ml-auto px-3 py-1 text-sm" onClick={backfillKickoffs} title="Fill any missing knockout kickoff times from the WC26 schedule">
            🕒 Fill kickoff times
          </button>
          <button className="btn-ghost px-3 py-1 text-sm" onClick={generateNextRound} title="Pair the winners of the last completed round into the next round">
            ✨ Generate next round
          </button>
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
  const knockout = isKnockout(match)
  const [home, setHome] = useState(match.home_score?.toString() ?? '')
  const [away, setAway] = useState(match.away_score?.toString() ?? '')
  const [motm, setMotm] = useState(match.motm ?? '')
  const [winner, setWinner] = useState(match.winner ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // knockout: the higher score wins → autofill winner; only a tie needs a manual pick.
  function applyScores(h: string, a: string) {
    setHome(h)
    setAway(a)
    if (!knockout || h === '' || a === '') return
    const hn = parseInt(h, 10)
    const an = parseInt(a, 10)
    if (hn > an) setWinner(match.home_team)
    else if (an > hn) setWinner(match.away_team)
    // equal → leave winner as-is for the admin to decide (penalties)
  }

  async function saveResult(finish: boolean) {
    setSaving(true)
    setSaved(false)
    const { error } = await supabase
      .from('matches')
      .update({
        home_score: home === '' ? null : parseInt(home, 10),
        away_score: away === '' ? null : parseInt(away, 10),
        motm: motm.trim() || null,
        winner: knockout ? winner || null : null,
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
        <input className="input w-12 text-center" value={home} onChange={(e) => applyScores(e.target.value.replace(/[^0-9]/g, ''), away)} placeholder="–" />
        <span>:</span>
        <input className="input w-12 text-center" value={away} onChange={(e) => applyScores(home, e.target.value.replace(/[^0-9]/g, ''))} placeholder="–" />
        {knockout && (
          <select className="input w-36" value={winner} onChange={(e) => setWinner(e.target.value)} title="Team that advanced (penalties count)">
            <option value="">Advances…</option>
            <option value={match.home_team}>{match.home_team}</option>
            <option value={match.away_team}>{match.away_team}</option>
          </select>
        )}
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
