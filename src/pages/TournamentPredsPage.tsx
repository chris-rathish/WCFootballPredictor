import { TOURNAMENT_COLUMNS, TOURNAMENT_PREDS } from '../data/tournamentPreds'
import Team from '../components/Team'

export default function TournamentPredsPage() {
  return (
    <div>
      <h1 className="mb-1 text-xl font-bold">Tournament Predictions</h1>
      <p className="mb-4 text-sm text-zinc-400">
        Everyone’s pre-tournament picks — Golden Boot, Golden Glove, Player of the Tournament and the
        overall winner. (Not yet decided.)
      </p>
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
            {TOURNAMENT_PREDS.map((p) => (
              <tr key={p.name} className="border-t border-zinc-700/40">
                <td className="sticky left-0 z-10 bg-night px-3 py-2 font-medium">{p.name}</td>
                {TOURNAMENT_COLUMNS.map((c) => (
                  <td key={c.key} className="px-3 py-2 text-zinc-300">
                    {p[c.key] === '-' ? '—' : c.key === 'winner' ? <Team name={p[c.key]} height={12} /> : p[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
