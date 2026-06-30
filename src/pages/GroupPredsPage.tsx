import { useState } from 'react'
import { GROUP_PREDS } from '../data/groupPreds'

export default function GroupPredsPage() {
  const [g, setG] = useState(GROUP_PREDS[0]?.group ?? 'A')
  const group = GROUP_PREDS.find((x) => x.group === g) ?? GROUP_PREDS[0]
  if (!group) return <p className="text-zinc-400">No data.</p>

  const ranked = [...group.players].sort((a, b) => b.points - a.points)

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold">Group Stage Predictions</h1>
      <p className="mb-4 text-sm text-zinc-400">
        How everyone predicted each group would finish (1st → 4th). Green = correct position.
      </p>

      <div className="mb-4 flex flex-wrap gap-1">
        {GROUP_PREDS.map((x) => (
          <button
            key={x.group}
            onClick={() => setG(x.group)}
            className={`rounded-md px-3 py-1 text-sm ${x.group === g ? 'bg-red-600 text-white' : 'bg-zinc-700/60 text-zinc-300'}`}
          >
            {x.group}
          </button>
        ))}
      </div>

      {/* actual finishing order */}
      <div className="card mb-4">
        <div className="mb-2 text-sm font-semibold text-zinc-300">Group {group.group} — actual result</div>
        <ol className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-4">
          {group.actual.map((t, i) => (
            <li key={i} className="rounded bg-emerald-500/15 px-2 py-1 text-emerald-200">
              <span className="mr-1 text-xs text-zinc-400">{i + 1}.</span>
              {t}
            </li>
          ))}
        </ol>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-700/60">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-zinc-900 text-left">
            <tr>
              <th className="px-3 py-2">Player</th>
              <th className="px-3 py-2">1st</th>
              <th className="px-3 py-2">2nd</th>
              <th className="px-3 py-2">3rd</th>
              <th className="px-3 py-2">4th</th>
              <th className="px-3 py-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((p) => (
              <tr key={p.name} className="border-t border-zinc-700/40">
                <td className="px-3 py-2 font-medium">{p.name}</td>
                {p.order.map((t, i) => (
                  <td
                    key={i}
                    className={`px-3 py-2 ${t && t === group.actual[i] ? 'bg-emerald-500/15 text-emerald-200' : 'text-zinc-300'}`}
                  >
                    {t || '—'}
                  </td>
                ))}
                <td className="px-3 py-2 text-right font-semibold tabular-nums">{p.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
