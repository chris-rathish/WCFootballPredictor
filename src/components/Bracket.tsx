import { COLUMN_LABELS, gamesForRound, pruneDownstream, semiFinalLosers, type AdvancingRound } from '../lib/bracket'
import Team from './Team'
import type { BracketPicks, R32Matchup } from '../lib/types'

interface Props {
  r32: R32Matchup[]
  picks: BracketPicks
  editable: boolean
  onChange: (next: BracketPicks) => void
  actual?: BracketPicks // when set, highlight correct/incorrect picks
}

// A column = one round, restricted to a slice of game indices (left or right half).
interface Col {
  round: AdvancingRound
  indices: number[]
}

const LEFT: Col[] = [
  { round: 'R16', indices: [0, 1, 2, 3, 4, 5, 6, 7] },
  { round: 'QF', indices: [0, 1, 2, 3] },
  { round: 'SF', indices: [0, 1] },
  { round: 'FINAL', indices: [0] },
]
const RIGHT: Col[] = [
  { round: 'FINAL', indices: [1] },
  { round: 'SF', indices: [2, 3] },
  { round: 'QF', indices: [4, 5, 6, 7] },
  { round: 'R16', indices: [8, 9, 10, 11, 12, 13, 14, 15] },
]

export default function Bracket({ r32, picks, editable, onChange, actual }: Props) {
  if (!r32 || r32.length === 0) {
    return (
      <div className="card text-zinc-400">
        The knockout bracket hasn't been set up yet. An admin needs to enter the Round-of-32 matchups
        in the Admin panel.
      </div>
    )
  }

  function selectWinner(round: AdvancingRound, gameIndex: number, team: string) {
    if (!editable || !team) return
    const arr = [...((picks[round] as string[] | undefined) ?? [])]
    arr[gameIndex] = team
    onChange(pruneDownstream(r32, { ...picks, [round]: arr }))
  }

  const isCorrect = (round: keyof BracketPicks, team: string): boolean | undefined => {
    if (!actual || !team) return undefined
    if (round === 'CHAMPION') return actual.CHAMPION === team
    if (round === 'THIRD') return actual.THIRD === team
    return ((actual[round] as string[] | undefined) ?? []).includes(team)
  }

  function teamCls(selected: boolean, correct?: boolean, gold = false): string {
    let cls = 'bg-zinc-900/70 text-zinc-200 hover:bg-zinc-700'
    if (selected) cls = gold ? 'bg-amber-400 text-night font-semibold' : 'bg-red-500 text-night font-semibold'
    if (selected && correct === true) cls = `${gold ? 'bg-amber-300' : 'bg-red-400'} text-night font-semibold ring-2 ring-white/60`
    if (selected && correct === false) cls = 'bg-red-500/80 text-white font-semibold'
    return cls
  }

  function TeamBtn({
    round,
    gameIndex,
    team,
    selected,
    align = 'left',
  }: {
    round: AdvancingRound
    gameIndex: number
    team: string
    selected: boolean
    align?: 'left' | 'right'
  }) {
    return (
      <button
        className={`w-full rounded px-2 py-1.5 text-sm transition ${teamCls(
          selected,
          isCorrect(round, team)
        )} ${!editable ? 'cursor-default' : ''} ${!team ? 'opacity-40' : ''}`}
        disabled={!editable || !team}
        onClick={() => selectWinner(round, gameIndex, team)}
        title={team}
      >
        <Team name={team} fallback="TBD" height={12} className={`w-full ${align === 'right' ? 'justify-end' : ''}`} />
      </button>
    )
  }

  function Column({ col, side }: { col: Col; side: 'left' | 'right' }) {
    const games = gamesForRound(r32, picks, col.round)
    const sel = (picks[col.round] as string[] | undefined) ?? []
    return (
      <div className="flex min-w-[150px] flex-1 flex-col">
        <h3 className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          {COLUMN_LABELS[col.round]}
        </h3>
        <div className="flex h-full flex-col justify-around gap-2">
          {col.indices.map((i) => {
            const g = games[i]
            if (!g) return null
            return (
              <div key={i} className="card space-y-1 p-1.5">
                <TeamBtn round={col.round} gameIndex={i} team={g.home} selected={!!g.home && sel[i] === g.home} align={side} />
                <TeamBtn round={col.round} gameIndex={i} team={g.away} selected={!!g.away && sel[i] === g.away} align={side} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ----- center: final + champion + third place -----
  const finalists = (picks.FINAL ?? []).filter(Boolean)
  const losers = semiFinalLosers(r32, picks).filter(Boolean)

  function pickChampion(team: string) {
    if (editable && team) onChange({ ...picks, CHAMPION: team })
  }
  function pickThird(team: string) {
    if (editable && team) onChange({ ...picks, THIRD: team })
  }

  const Center = (
    <div className="flex min-w-[200px] flex-col items-center justify-center gap-4 px-2">
      <div className="text-center text-2xl">🏆</div>
      <div className="card w-full space-y-1 p-2">
        <div className="text-center text-[11px] font-semibold uppercase tracking-wide text-amber-300">Final</div>
        {finalists.length < 2 && <div className="px-2 py-1 text-center text-xs text-zinc-500">Pick both finalists</div>}
        {finalists.map((t) => {
          const selected = picks.CHAMPION === t
          return (
            <button
              key={t}
              className={`w-full rounded px-2 py-1.5 text-sm ${teamCls(selected, isCorrect('CHAMPION', t), true)} ${!editable ? 'cursor-default' : ''}`}
              disabled={!editable}
              onClick={() => pickChampion(t)}
              title={t}
            >
              <Team name={t} height={12} className="w-full justify-center" />
            </button>
          )
        })}
        {picks.CHAMPION && (
          <div className="flex items-center justify-center gap-1 pt-1 text-xs text-amber-300">
            Champion: <Team name={picks.CHAMPION} height={12} />
          </div>
        )}
      </div>

      <div className="card w-full space-y-1 p-2">
        <div className="text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-400">3rd place</div>
        {losers.length < 2 && <div className="px-2 py-1 text-center text-xs text-zinc-500">Decided after semis</div>}
        {losers.map((t) => {
          const selected = picks.THIRD === t
          return (
            <button
              key={t}
              className={`w-full rounded px-2 py-1 text-sm ${teamCls(selected, isCorrect('THIRD', t))} ${!editable ? 'cursor-default' : ''}`}
              disabled={!editable}
              onClick={() => pickThird(t)}
              title={t}
            >
              <Team name={t} height={12} className="w-full justify-center" />
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-[1100px] items-stretch gap-2">
        {LEFT.map((col, i) => (
          <Column key={`l${i}`} col={col} side="left" />
        ))}
        {Center}
        {RIGHT.map((col, i) => (
          <Column key={`r${i}`} col={col} side="right" />
        ))}
      </div>
    </div>
  )
}
