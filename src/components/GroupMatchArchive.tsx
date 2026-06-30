import { useState } from 'react'
import { GROUP_MATCH_PREDS, type GMGame } from '../data/groupMatchPreds'
import Team from './Team'

function GameRow({ g }: { g: GMGame }) {
  const [open, setOpen] = useState(false)
  const ranked = [...g.players].sort((a, b) => b.pts - a.pts)
  return (
    <div className="card">
      <button className="flex w-full items-center justify-between gap-2 text-sm" onClick={() => setOpen((o) => !o)}>
        <span className="flex flex-1 items-center justify-end gap-1.5 text-right font-medium">
          <Team name={g.home} height={12} />
        </span>
        <span className="rounded bg-zinc-900 px-2 py-0.5 font-bold tabular-nums">
          {g.hs ?? '–'}–{g.as ?? '–'}
        </span>
        <span className="flex flex-1 items-center gap-1.5 font-medium">
          <Team name={g.away} height={12} />
        </span>
        <span className="ml-2 text-xs text-zinc-500">{open ? '▲' : '▼'}</span>
      </button>
      {g.motm && (
        <div className="mt-1 text-center text-xs text-emerald-300/80">MOTM: {g.motm}</div>
      )}
      {open && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-zinc-400">
              <tr>
                <th className="py-1 pr-3">Player</th>
                <th className="py-1 pr-3">Score</th>
                <th className="py-1 pr-3">Winner</th>
                <th className="py-1 pr-3">MOTM</th>
                <th className="py-1 text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((p) => (
                <tr key={p.name} className="border-t border-zinc-700/40">
                  <td className="py-1 pr-3 font-medium">{p.name}</td>
                  <td className="py-1 pr-3 tabular-nums">
                    {p.hs == null && p.as == null ? '—' : `${p.hs ?? '–'}–${p.as ?? '–'}`}
                  </td>
                  <td className="py-1 pr-3 text-zinc-400">{p.winner || '—'}</td>
                  <td className="py-1 pr-3 text-zinc-400">{p.motm || '—'}</td>
                  <td className="py-1 text-right font-semibold tabular-nums">{p.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function GroupMatchArchive() {
  const [day, setDay] = useState(0)
  const matchday = GROUP_MATCH_PREDS[day]
  return (
    <div>
      <div className="mb-3 flex gap-1">
        {GROUP_MATCH_PREDS.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setDay(i)}
            className={`rounded-md px-3 py-1 text-sm ${i === day ? 'bg-red-600 text-white' : 'bg-zinc-700/60 text-zinc-300'}`}
          >
            {d.day}
          </button>
        ))}
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {matchday?.games.map((g, i) => (
          <GameRow key={i} g={g} />
        ))}
      </div>
    </div>
  )
}
