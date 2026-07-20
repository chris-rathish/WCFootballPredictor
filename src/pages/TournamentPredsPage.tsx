import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { TOURNAMENT_COLUMNS, TOURNAMENT_PREDS, type TournamentPred } from '../data/tournamentPreds'
import { supabase } from '../lib/supabase'
import { mode } from '../lib/average'
import Team from '../components/Team'
import Podium, { type Winner } from '../components/Podium'
import Confetti from '../components/Confetti'

// Final results.
const ACTUAL: Record<keyof Omit<TournamentPred, 'name'>, string> = {
  goldenBoot: 'Kylian Mbappé',
  goldenGlove: 'Unai Simón',
  potm: 'Rodri',
  winner: 'Spain',
}
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
function isCorrect(key: keyof Omit<TournamentPred, 'name'>, val: string): boolean {
  if (!val || val === '-') return false
  const v = norm(val)
  if (key === 'goldenBoot') return v.includes('mbappe')
  if (key === 'goldenGlove') return v === 'unai simon'
  if (key === 'potm') return v === 'rodri'
  return v === 'spain'
}

export default function TournamentPredsPage() {
  // actual cup podium, derived from the final + third-place results
  const [cup, setCup] = useState<Winner[]>([])

  useEffect(() => {
    supabase
      .from('matches')
      .select('stage, home_team, away_team, winner, status')
      .in('stage', ['FINAL', '3RD'])
      .then(({ data }: any) => {
        const ms = (data as { stage: string; home_team: string; away_team: string; winner: string; status: string }[]) ?? []
        const fin = ms.find((m) => m.stage === 'FINAL' && m.status === 'finished' && m.winner)
        const third = ms.find((m) => m.stage === '3RD' && m.status === 'finished' && m.winner)
        if (!fin) return
        const runnerUp = fin.winner === fin.home_team ? fin.away_team : fin.home_team
        const rows: Winner[] = [
          { name: fin.winner, team: true, sub: 'Champions' },
          { name: runnerUp, team: true, sub: 'Runners-up' },
        ]
        if (third) rows.push({ name: third.winner, team: true, sub: 'Third place' })
        setCup(rows)
      })
  }, [])

  // "Average" = the most common pick in each category
  const consensus = useMemo<TournamentPred>(
    () => ({
      name: 'Average',
      goldenBoot: mode(TOURNAMENT_PREDS.map((p) => p.goldenBoot).filter((x) => x && x !== '-')) ?? '-',
      goldenGlove: mode(TOURNAMENT_PREDS.map((p) => p.goldenGlove).filter((x) => x && x !== '-')) ?? '-',
      potm: mode(TOURNAMENT_PREDS.map((p) => p.potm).filter((x) => x && x !== '-')) ?? '-',
      winner: mode(TOURNAMENT_PREDS.map((p) => p.winner).filter((x) => x && x !== '-')) ?? '-',
    }),
    []
  )

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold">Tournament Predictions</h1>
      <p className="mb-4 text-sm text-zinc-400">
        Everyone’s pre-tournament picks — Golden Boot, Golden Glove, Player of the Tournament and the overall winner.
      </p>

      {cup.length === 3 && <Confetti id="cup-winners" />}
      <Podium winners={cup} title="🏆 World Cup Winners" />

      {/* Tournament awards card */}
      <div className="mb-6 rounded-2xl border border-emerald-500/25 bg-gradient-to-b from-emerald-500/5 to-transparent p-4">
        <h2 className="mb-3 text-center text-lg font-bold">🏅 Tournament Awards</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Award icon="🏆" label="Winner">
            <Team name={ACTUAL.winner} height={14} />
          </Award>
          <Award icon="👟" label="Golden Boot">{ACTUAL.goldenBoot}</Award>
          <Award icon="🧤" label="Golden Glove">{ACTUAL.goldenGlove}</Award>
          <Award icon="⭐" label="Player of the Tournament">{ACTUAL.potm}</Award>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-zinc-900 text-left">
            <tr>
              <th className="sticky left-0 z-10 bg-zinc-900 px-3 py-2">Player</th>
              {TOURNAMENT_COLUMNS.map((c) => (
                <th key={c.key} className="px-3 py-2">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[consensus, ...TOURNAMENT_PREDS].map((p) => {
              const isAvg = p.name === 'Average'
              return (
                <tr key={p.name} className={`border-t border-zinc-700/40 ${isAvg ? 'bg-amber-500/10 italic' : ''}`}>
                  <td className={`sticky left-0 z-10 px-3 py-2 font-medium ${isAvg ? 'bg-amber-900/30 text-amber-200' : 'bg-night'}`}>
                    {isAvg ? (
                      <>Average <span className="pill bg-amber-500/20 text-amber-300">consensus</span></>
                    ) : (
                      p.name
                    )}
                  </td>
                  {TOURNAMENT_COLUMNS.map((c) => {
                    const val = p[c.key]
                    const correct = isCorrect(c.key, val)
                    return (
                      <td
                        key={c.key}
                        className={`px-3 py-2 ${correct ? 'bg-emerald-400/15 font-semibold text-emerald-200' : isAvg ? 'text-amber-100' : 'text-zinc-300'}`}
                      >
                        {val === '-' ? '—' : c.key === 'winner' ? <Team name={val} height={12} /> : val}
                        {correct && ' ✓'}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        Correct picks are highlighted green. <span className="text-amber-300">Average</span> is the group’s consensus —
        the most common pick in each category.
      </p>
    </div>
  )
}

function Award({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-zinc-800/50 px-2 py-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="text-[11px] uppercase tracking-wide text-zinc-400">{label}</div>
      <div className="flex items-center justify-center gap-1 text-sm font-semibold text-zinc-100">{children}</div>
    </div>
  )
}
