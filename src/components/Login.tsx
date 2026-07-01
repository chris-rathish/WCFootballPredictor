import { useState } from 'react'
import { supabase } from '../lib/supabase'
import logo from '../assets/pprlogo.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function sendLink(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    // return to the exact app URL (works under a GitHub Pages sub-path too),
    // stripping any existing hash/query so Supabase appends its auth params cleanly.
    const redirectTo = window.location.href.split('#')[0].split('?')[0]
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo },
    })
    setLoading(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="mb-6 text-center">
          <img src={logo} alt="PPR" className="mx-auto h-24 w-24 rounded-2xl object-cover shadow-lg" />
          <h1 className="mt-3 text-2xl font-bold">PPR WC Predictor</h1>
          <p className="text-sm text-zinc-400">Predict scores, build your bracket, beat your friends.</p>
        </div>

        {sent ? (
          <div className="rounded-lg bg-red-500/10 p-4 text-center text-red-300">
            <p className="font-semibold">Check your email 📩</p>
            <p className="mt-1 text-sm">
              We sent a magic sign-in link to <span className="font-mono">{email}</span>. Click it to
              log in. (Check spam if you don't see it.)
            </p>
          </div>
        ) : (
          <form onSubmit={sendLink} className="space-y-3">
            <label className="block text-sm text-zinc-300">Email address</label>
            <input
              className="input"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button className="btn-primary w-full" disabled={loading}>
              {loading ? 'Sending…' : 'Send me a magic link'}
            </button>
            <p className="text-center text-xs text-zinc-500">
              No password needed — we email you a one-click sign-in link.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
