import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { BracketPicks, Match, R32Matchup, Settings } from '../lib/types'
import { actualFromMatches, eliminatedFromMatches, scoreBracket } from '../lib/bracket'
import Bracket from '../components/Bracket'

interface BracketRow {
  user_id: string
  display_name: string
  picks: BracketPicks
  score: number
}

export default function BracketPage() {
  const { session } = useAuth()
  const [r32, setR32] = useState<R32Matchup[]>([])
  const [settings, setSettings] = useState<Settings | null>(null)
  const [picks, setPicks] = useState<BracketPicks>({})
  const [matches, setMatches] = useState<Match[]>([])
  const [allBrackets, setAllBrackets] = useState<{ user_id: string; picks: BracketPicks }[]>([])
  const [names, setNames] = useState<Record<string, string>>({})
  const [deadline, setDeadline] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function load() {
    const [{ data: s }, { data: m }, { data: bs }, { data: profs }] = await Promise.all([
      supabase.from('settings').select('*').eq('id', 1).single(),
      supabase.from('matches').select('*'),
      supabase.from('brackets').select('user_id, picks'),
      supabase.from('profiles').select('id, display_name'),
    ])
    const settingsRow = s as Settings | null
    setSettings(settingsRow)
    setR32(settingsRow?.bracket_r32 ?? [])
    setDeadline(settingsRow?.bracket_deadline ?? null)
    setMatches((m as Match[]) ?? [])
    setAllBrackets((bs as any[]) ?? [])
    const nameMap: Record<string, string> = {}
    ;(profs as any[] ?? []).forEach((p) => (nameMap[p.id] = p.display_name))
    setNames(nameMap)
    if (session?.user) {
      setPicks(((bs as any[]) ?? []).find((b) => b.user_id === session.user!.id)?.picks ?? {})
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const locked = deadline != null && new Date(deadline).getTime() <= Date.now()
  const actual = useMemo(() => actualFromMatches(matches), [matches])
  const eliminated = useMemo(() => eliminatedFromMatches(matches), [matches])
  const resultsStarted = (actual.R16 ?? []).length > 0

  const standings = useMemo<BracketRow[]>(() => {
    if (!settings) return []
    return allBrackets
      .map((b) => ({
        user_id: b.user_id,
        display_name: names[b.user_id] ?? '—',
        picks: b.picks,
        score: scoreBracket(b.picks, actual),
      }))
      .sort((a, b) => b.score - a.score)
  }, [allBrackets, names, actual, settings])

  const myScore = scoreBracket(picks, actual)

  async function save() {
    if (!session?.user) return
    setSaving(true)
    setMsg(null)
    const { error } = await supabase
      .from('brackets')
      .upsert({ user_id: session.user.id, picks, updated_at: new Date().toISOString() })
    setSaving(false)
    setMsg(error ? error.message : 'Bracket saved ✓')
    if (!error) setTimeout(() => setMsg(null), 1800)
  }

  if (loading) return <p className="text-zinc-400">Loading bracket…</p>

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold">Knockout Bracket</h1>
        {deadline && (
          <span className={`pill ${locked ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>
            {locked ? 'Locked' : `Locks ${new Date(deadline).toLocaleString()}`}
          </span>
        )}
        <span className="ml-auto rounded-lg bg-zinc-800 px-3 py-1 text-sm">
          Your bracket score: <span className="font-bold text-red-300">{myScore}</span>
        </span>
        {!locked && (
          <button className="btn-primary" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save bracket'}
          </button>
        )}
        {msg && <span className="text-sm text-red-300">{msg}</span>}
      </div>

      <p className="text-sm text-zinc-400">
        {resultsStarted
          ? 'Updating live as results come in — green = correct, red = knocked out. This score adds to your Knockout Stage Prediction on the leaderboard when the tournament ends.'
          : 'Locked picks. Once knockout matches are played, correct picks turn green and wrong ones red, and your score updates here automatically.'}
      </p>

      <Bracket r32={r32} picks={picks} editable={!locked} onChange={setPicks} actual={actual} eliminated={eliminated} />

      {/* Bracket standings (this tab only) */}
      <div>
        <h2 className="mb-2 text-lg font-semibold">Bracket Standings</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-900 text-left">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Player</th>
                <th className="px-3 py-2 text-right">Bracket Score</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((r, i) => {
                const me = r.user_id === session?.user?.id
                return (
                  <tr key={r.user_id} className={`border-t border-zinc-700/40 ${me ? 'bg-red-500/10' : ''}`}>
                    <td className="px-3 py-2">{i + 1}</td>
                    <td className={`px-3 py-2 font-medium ${me ? 'text-red-200' : ''}`}>
                      {r.display_name} {me && <span className="text-xs text-red-400">(you)</span>}
                    </td>
                    <td className="px-3 py-2 text-right font-bold tabular-nums">{r.score}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {standings.length === 0 && <p className="p-4 text-zinc-400">No brackets yet.</p>}
        </div>
      </div>
    </div>
  )
}
