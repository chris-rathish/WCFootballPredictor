import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { BracketPicks, R32Matchup, Settings } from '../lib/types'
import Bracket from '../components/Bracket'

export default function BracketPage() {
  const { session } = useAuth()
  const [r32, setR32] = useState<R32Matchup[]>([])
  const [picks, setPicks] = useState<BracketPicks>({})
  const [actual, setActual] = useState<BracketPicks>({})
  const [deadline, setDeadline] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: s } = await supabase.from('settings').select('*').eq('id', 1).single()
      const settings = s as Settings | null
      setR32(settings?.bracket_r32 ?? [])
      setActual(settings?.actual_bracket ?? {})
      setDeadline(settings?.bracket_deadline ?? null)

      if (session?.user) {
        const { data: b } = await supabase
          .from('brackets')
          .select('picks')
          .eq('user_id', session.user.id)
          .maybeSingle()
        setPicks((b?.picks as BracketPicks) ?? {})
      }
      setLoading(false)
    }
    load()
  }, [session])

  const locked = deadline != null && new Date(deadline).getTime() <= Date.now()

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
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-bold">Knockout Bracket</h1>
        {deadline && (
          <span className={`pill ${locked ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>
            {locked ? 'Locked' : `Locks ${new Date(deadline).toLocaleString()}`}
          </span>
        )}
        {!locked && (
          <button className="btn-primary ml-auto" onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save bracket'}
          </button>
        )}
        {msg && <span className="text-sm text-red-300">{msg}</span>}
      </div>

      <p className="mb-4 text-sm text-zinc-400">
        Tap a team to advance it through each round, then crown your champion.
        {locked && ' The bracket is locked — picks shown vs. actual results (green = correct).'}
      </p>

      <Bracket
        r32={r32}
        picks={picks}
        editable={!locked}
        onChange={setPicks}
        actual={locked ? actual : undefined}
      />
    </div>
  )
}
