import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IS_DEMO } from '../lib/supabase'
import { resetDemo } from '../lib/demoClient'

function navClass({ isActive }: { isActive: boolean }) {
  return [
    'px-3 py-2 rounded-lg text-sm font-medium transition',
    isActive ? 'bg-red-500 text-night' : 'text-zinc-300 hover:bg-zinc-700/60',
  ].join(' ')
}

export default function Layout({ children }: { children: ReactNode }) {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-screen">
      {IS_DEMO && (
        <div className="bg-amber-500/90 px-4 py-1.5 text-center text-sm font-medium text-night">
          🧪 Demo mode — fake data, saved only in this browser. Sign in / sharing needs Supabase setup (see README).{' '}
          <button className="underline" onClick={resetDemo}>
            Reset demo data
          </button>
        </div>
      )}
      <header className="sticky top-0 z-10 border-b border-zinc-700/60 bg-night/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
          <span className="mr-2 text-xl font-bold">⚽ WC Predictor</span>
          <nav className="flex flex-wrap items-center gap-1">
            <NavLink to="/" className={navClass} end>
              Leaderboard
            </NavLink>
            <NavLink to="/matches" className={navClass}>
              Matches
            </NavLink>
            <NavLink to="/history" className={navClass}>
              History
            </NavLink>
            <NavLink to="/bracket" className={navClass}>
              Bracket
            </NavLink>
            <NavLink to="/group-preds" className={navClass}>
              Group Preds
            </NavLink>
            <NavLink to="/tournament" className={navClass}>
              Tournament
            </NavLink>
            {profile?.is_admin && (
              <NavLink to="/admin" className={navClass}>
                Admin
              </NavLink>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="text-zinc-400">{profile?.display_name}</span>
            <button className="btn-ghost px-3 py-1" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  )
}
