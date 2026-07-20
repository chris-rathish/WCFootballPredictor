import { useEffect, useMemo, useState } from 'react'
import { TOURNAMENT_COLUMNS, TOURNAMENT_PREDS, type TournamentPred } from '../data/tournamentPreds'
import { supabase } from '../lib/supabase'
import { mode } from '../lib/average'
import Team from '../components/Team'
import Podium, { type Winner } from '../components/Podium'

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
  const [podium, setPodium] = useState<Winner[]>([])

  useEffect(() => {
    supabase
      .from('leaderboard')
      .select('display_name, total_points')
      .order('total_points', { ascending: false })
      .then(({ data }: any) => {
        const rows = ((data as { display_name: string; total_points: number }[]) ?? [])
          .filter((r) => r.display_name !== 'Average')
          .slice(0, 3)
          .map((r) => ({ name: r.display_name, points: r.total_points }))
        setPodium(rows)
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

      <Podium winners={podium} />

      {/* Actual results banner */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm">
        <span className="font-semibold text-emerald-300">Results:</span>
        <span className="flex items-center gap-1.5">🏆 Winner <Team name={ACTUAL.winner} height={12} /></span>
        <span>👟 Golden Boot <b className="text-zinc-100">{ACTUAL.goldenBoot}</b></span>
        <span>🧤 Golden Glove <b className="text-zinc-100">{ACTUAL.goldenGlove}</b></span>
        <span>⭐ POTM <b className="text-zinc-100">{ACTUAL.potm}</b></span>
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
