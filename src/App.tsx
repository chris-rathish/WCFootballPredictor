import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import ClaimName from './components/ClaimName'
import Layout from './components/Layout'
import StandingsPage from './pages/StandingsPage'
import MatchesPage from './pages/MatchesPage'
import HistoryPage from './pages/HistoryPage'
import BracketPage from './pages/BracketPage'
import GroupPredsPage from './pages/GroupPredsPage'
import TournamentPredsPage from './pages/TournamentPredsPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  const { session, loading, profile } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-zinc-400">
        Loading…
      </div>
    )
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
      <Routes>
        <Route path="/" element={<StandingsPage />} />
        <Route path="/matches" element={<MatchesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/bracket" element={<BracketPage />} />
        <Route path="/group-preds" element={<GroupPredsPage />} />
        <Route path="/tournament" element={<TournamentPredsPage />} />
        <Route
          path="/admin"
          element={profile?.is_admin ? <AdminPage /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
