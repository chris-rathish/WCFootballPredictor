import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

interface UnclaimedPlayer {
  id: string
  display_name: string
}

export default function ClaimName() {
  const { session, refreshProfile, signOut } = useAuth()
  const [players, setPlayers] = useState<UnclaimedPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    supabase
      .from('profiles')
      .select('id, display_name')
      .eq('claimed', false)
      .order('display_name')
      .then(({ data }: any) => {
        setPlayers((data as UnclaimedPlayer[]) ?? [])
        setLoading(false)
      })
  }, [])

  async function claim(playerId: string) {
    if (!session?.user || busy) return
    setBusy(true)
    setError(null)
    // claiming = the player's row takes on this auth user's id
    const { error } = await supabase
      .from('profiles')
      .update({ id: session.user.id, claimed: true })
      .eq('id', playerId)
    if (error) {
      setError(error.message)
      setBusy(false)
      return
    }
    await refreshProfile()
  }

  async function createNew(e: React.FormEvent) {
    e.preventDefault()
    if (!session?.user || busy || !newName.trim()) return
    setBusy(true)
    setError(null)
    const { error } = await supabase
      .from('profiles')
      .insert({ id: session.user.id, display_name: newName.trim(), claimed: true })
    if (error) {
      setError(error.message)
      setBusy(false)
      return
    }
    await refreshProfile()
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="mb-4 text-center">
          <div className="text-4xl">⚽</div>
          <h1 className="mt-2 text-2xl font-bold">Who are you?</h1>
          <p className="text-sm text-zinc-400">
            Pick your name to claim your spot and carry over your group-stage points.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-zinc-400">Loading players…</p>
        ) : (
          <>
            <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1">
              {players.map((p) => (
                <button
                  key={p.id}
                  className="btn-ghost justify-start"
                  disabled={busy}
                  onClick={() => claim(p.id)}
                >
                  {p.display_name}
                </button>
              ))}
            </div>
            {players.length === 0 && (
              <p className="text-center text-sm text-zinc-500">Everyone’s been claimed — create your name below.</p>
            )}

            <form onSubmit={createNew} className="mt-4 border-t border-zinc-700/60 pt-4">
              <label className="text-xs text-zinc-400">Not listed? Add yourself:</label>
              <div className="mt-1 flex gap-2">
                <input
                  className="input"
                  placeholder="Your name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <button className="btn-primary" disabled={busy || !newName.trim()}>
                  Join
                </button>
              </div>
            </form>
          </>
        )}

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <button className="mt-4 w-full text-center text-xs text-zinc-500 hover:underline" onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
  )
}
