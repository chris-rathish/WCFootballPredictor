import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { BracketPicks, R32Matchup, Settings } from '../lib/types'
import { TEAM_NAMES, TEAM_DATALIST_ID } from '../lib/flags'
import Bracket from './Bracket'

function toLocalInput(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16)
}

export default function AdminBracket() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [r32, setR32] = useState<R32Matchup[]>([])
  const [actual, setActual] = useState<BracketPicks>({})
  const [deadline, setDeadline] = useState('')
  const [pts, setPts] = useState({ r16: 20, qf: 20, sf: 20, final: 20, champion: 20, third: 20 })
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('settings').select('*').eq('id', 1).single().then(({ data }: any) => {
      const s = data as Settings
      setSettings(s)
      const grid = [...(s.bracket_r32 ?? [])]
      while (grid.length < 16) grid.push({ home: '', away: '' })
      setR32(grid)
      setActual(s.actual_bracket ?? {})
      setDeadline(toLocalInput(s.bracket_deadline))
      setPts({ r16: s.pts_r16, qf: s.pts_qf, sf: s.pts_sf, final: s.pts_final, champion: s.pts_champion, third: s.pts_third ?? 20 })
    })
  }, [])

  function setMatchup(i: number, side: 'home' | 'away', val: string) {
    const next = [...r32]
    next[i] = { ...next[i], [side]: val }
    setR32(next)
  }

  async function saveSetup() {
    setMsg(null)
    const cleaned = r32.filter((m) => m.home.trim() || m.away.trim())
    const { error } = await supabase
      .from('settings')
      .update({
        bracket_r32: cleaned,
        bracket_deadline: deadline ? new Date(deadline).toISOString() : null,
        pts_r16: pts.r16,
        pts_qf: pts.qf,
        pts_sf: pts.sf,
        pts_final: pts.final,
        pts_champion: pts.champion,
        pts_third: pts.third,
      })
      .eq('id', 1)
    setMsg(error ? error.message : 'Setup saved ✓')
    if (!error) setR32(cleaned.length ? cleaned : r32)
  }

  async function saveActualAndScore() {
    setMsg(null)
    const { error } = await supabase.from('settings').update({ actual_bracket: actual }).eq('id', 1)
    if (error) {
      setMsg(error.message)
      return
    }
    const { error: rpcErr } = await supabase.rpc('recalc_all_brackets')
    setMsg(rpcErr ? rpcErr.message : 'Actual results saved & everyone’s bracket re-scored ✓')
  }

  if (!settings) return <p className="text-zinc-400">Loading…</p>

  const savedR32 = settings.bracket_r32 ?? []

  return (
    <div className="space-y-8">
      {/* R32 setup */}
      <section className="card space-y-3">
        <h3 className="font-semibold">Round-of-32 matchups (16 games)</h3>
        <p className="text-sm text-zinc-400">
          Enter the two teams in each first-knockout-round game. These define everyone's bracket.
        </p>
        <datalist id={TEAM_DATALIST_ID}>
          {TEAM_NAMES.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <div className="grid gap-2 md:grid-cols-2">
          {r32.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-6 text-xs text-zinc-500">{i + 1}</span>
              <input className="input" list={TEAM_DATALIST_ID} value={m.home} placeholder="Home" onChange={(e) => setMatchup(i, 'home', e.target.value)} />
              <span className="text-zinc-500">v</span>
              <input className="input" list={TEAM_DATALIST_ID} value={m.away} placeholder="Away" onChange={(e) => setMatchup(i, 'away', e.target.value)} />
            </div>
          ))}
        </div>
      </section>

      {/* Deadline + scoring */}
      <section className="card grid gap-3 md:grid-cols-2">
        <div>
          <label className="text-xs text-zinc-400">Bracket deadline (locks picks)</label>
          <input className="input" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </div>
        <div className="grid grid-cols-6 gap-2">
          {([
            ['r16', 'R16'],
            ['qf', 'QF'],
            ['sf', 'SF'],
            ['final', 'Final'],
            ['champion', 'Champ'],
            ['third', '3rd'],
          ] as const).map(([k, label]) => (
            <div key={k}>
              <label className="text-xs text-zinc-400">{label}</label>
              <input
                className="input text-center"
                inputMode="numeric"
                value={pts[k]}
                onChange={(e) => setPts({ ...pts, [k]: parseInt(e.target.value || '0', 10) })}
              />
            </div>
          ))}
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <button className="btn-primary" onClick={saveSetup}>
            Save bracket setup
          </button>
          {msg && <span className="text-sm text-red-300">{msg}</span>}
        </div>
      </section>

      {/* Actual results */}
      <section className="space-y-3">
        <h3 className="font-semibold">Enter actual results (re-scores brackets)</h3>
        <p className="text-sm text-zinc-400">
          Click through the real winners as the tournament progresses, then save to award everyone their bracket points.
        </p>
        <Bracket r32={savedR32} picks={actual} editable onChange={setActual} />
        <button className="btn-primary" onClick={saveActualAndScore} disabled={savedR32.length === 0}>
          Save actual results & re-score all brackets
        </button>
      </section>
    </div>
  )
}
