import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import ClaimName from './components/ClaimName'
import Layout from './components/Layout'
import StandingsPage from './pages/StandingsPage'
import MatchesPage from './pages/MatchesPage'
import { SkeletonRows } from './components/Skeleton'

// archive/heavy pages are code-split so the main app loads fast
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
const BracketPage = lazy(() => import('./pages/BracketPage'))
const GroupPredsPage = lazy(() => import('./pages/GroupPredsPage'))
const TournamentPredsPage = lazy(() => import('./pages/TournamentPredsPage'))
const PlayerPage = lazy(() => import('./pages/PlayerPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))

export default function App() {
  const { session, loading, profile } = useAuth()

  if (loading) {
    return <div className="flex h-screen items-center justify-center text-zinc-400">Loading…</div>
  }

  if (!session) {
    return <Login />
  }

  // logged in but hasn't claimed a player yet
  if (!profile) {
    return <ClaimName />
  }

  return (
    <Layout>
      <Suspense fallback={<SkeletonRows rows={8} className="mt-4" />}>
        <Routes>
          <Route path="/" element={<StandingsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/bracket" element={<BracketPage />} />
          <Route path="/group-preds" element={<GroupPredsPage />} />
          <Route path="/tournament" element={<TournamentPredsPage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
          <Route path="/admin" element={profile?.is_admin ? <AdminPage /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
