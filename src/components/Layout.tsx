import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { isKnockout, isPredictable, type Match, type Prediction } from '../lib/types'
import { IS_DEMO } from '../lib/supabase'
import { resetDemo } from '../lib/demoClient'

function navClass({ isActive }: { isActive: boolean }) {
  return [
    'px-3 py-2 rounded-lg text-sm font-medium transition',
    isActive ? 'bg-red-500 text-night' : 'text-zinc-300 hover:bg-zinc-700/60',
  ].join(' ')
}

function Badge({ n }: { n: number }) {
  if (!n) return null
  return (
    <span className="ml-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
      {n}
    </span>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const { profile, session, signOut } = useAuth()
  const [unpredicted, setUnpredicted] = useState(0)

  const refreshUnpredicted = useCallback(async () => {
    if (!session?.user) return
    const [{ data: m }, { data: p }] = await Promise.all([
      supabase.from('matches').select('*'),
      supabase.from('predictions').select('match_id, home_score, away_score, motm, winner').eq('user_id', session.user.id),
    ])
    const preds: Record<number, Prediction> = {}
    ;(p as any[] ?? []).forEach((x) => (preds[x.match_id] = x))
    const open = ((m as Match[]) ?? []).filter(isPredictable)
    const missing = open.filter((mt) => {
      const pr = preds[mt.id]
      if (!pr) return true
      const ok = pr.home_score != null && pr.away_score != null && !!pr.motm && (!isKnockout(mt) || !!pr.winner)
      return !ok
    }).length
    setUnpredicted(missing)
  }, [session])

  useEffect(() => {
    refreshUnpredicted()
    const id = setInterval(refreshUnpredicted, 60000)
    return () => clearInterval(id)
  }, [refreshUnpredicted])

  const links = [
    { to: '/', label: 'Leaderboard', icon: '🏆', end: true, badge: 0 },
    { to: '/matches', label: 'Matches', icon: '⚽', badge: unpredicted },
    { to: '/history', label: 'History', icon: '🕑', badge: 0 },
    { to: '/bracket', label: 'Bracket', icon: '🗂️', badge: 0 },
    { to: '/group-preds', label: 'Group', icon: '📋', badge: 0 },
    { to: '/tournament', label: 'Tournament', icon: '🎯', badge: 0 },
    ...(profile?.is_admin ? [{ to: '/admin', label: 'Admin', icon: '⚙️', badge: 0 }] : []),
  ]

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
      <header className="sticky top-0 z-20 border-b border-zinc-700/60 bg-night/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3">
          <span className="mr-2 text-xl font-bold">⚽ PPR WC Predictor</span>
          {/* desktop nav */}
          <nav className="hidden flex-wrap items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={navClass} end={l.end}>
                {l.label}
                <Badge n={l.badge} />
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="hidden text-zinc-400 sm:inline">{profile?.display_name}</span>
            <button className="btn-ghost px-3 py-1" onClick={signOut}>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-24 md:pb-6">{children}</main>

      {/* mobile bottom tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex overflow-x-auto border-t border-zinc-700/60 bg-night/95 backdrop-blur md:hidden">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `relative flex min-w-[4.2rem] flex-1 flex-col items-center gap-0.5 px-1 py-2 text-[10px] ${
                isActive ? 'text-red-400' : 'text-zinc-400'
              }`
            }
          >
            <span className="text-lg leading-none">{l.icon}</span>
            {l.label}
            {l.badge > 0 && (
              <span className="absolute right-3 top-1 inline-flex min-w-[1rem] items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold text-white">
                {l.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
