import { useLayoutEffect, useRef, useState } from 'react'
import { COLUMN_LABELS, gamesForRound, pruneDownstream, semiFinalLosers, type AdvancingRound } from '../lib/bracket'
import Team from './Team'
import type { BracketPicks, R32Matchup } from '../lib/types'

interface Props {
  r32: R32Matchup[]
  picks: BracketPicks
  editable: boolean
  onChange: (next: BracketPicks) => void
  actual?: BracketPicks // teams that actually advanced — correct picks turn green
  eliminated?: BracketPicks // teams that lost — wrong picks turn red (undecided stay neutral)
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

export default function Bracket({ r32, picks, editable, onChange, actual, eliminated }: Props) {
  const cardRefs = useRef<Record<string, HTMLElement | null>>({})
  const innerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const [segs, setSegs] = useState<number[][]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    function point(key: string, edge: 'L' | 'R') {
      const el = cardRefs.current[key]
      const inner = innerRef.current
      if (!el || !inner) return null
      const r = el.getBoundingClientRect()
      const ir = inner.getBoundingClientRect()
      return { x: edge === 'L' ? r.left - ir.left : r.right - ir.left, y: r.top - ir.top + r.height / 2 }
    }
    function compute() {
      const inner = innerRef.current
      if (!inner) return
      const out: number[][] = []
      const elbow = (a: any, b: any, t: any) => {
        if (!a || !b || !t) return
        const xm = (a.x + t.x) / 2
        out.push([a.x, a.y, xm, a.y], [b.x, b.y, xm, b.y], [xm, a.y, xm, b.y], [xm, t.y, t.x, t.y])
      }
      const single = (a: any, t: any) => {
        if (!a || !t) return
        const xm = (a.x + t.x) / 2
        out.push([a.x, a.y, xm, a.y], [xm, a.y, xm, t.y], [xm, t.y, t.x, t.y])
      }
      for (const s of ['L', 'R'] as const) {
        const srcEdge = s === 'L' ? 'R' : 'L'
        const tgtEdge = s === 'L' ? 'L' : 'R'
        for (let d = 0; d < 3; d++) {
          const nextCount = 8 >> (d + 1)
          for (let j = 0; j < nextCount; j++) {
            elbow(
              point(`${s}:${d}:${2 * j}`, srcEdge),
              point(`${s}:${d}:${2 * j + 1}`, srcEdge),
              point(`${s}:${d + 1}:${j}`, tgtEdge)
            )
          }
        }
        // innermost semi card -> centre final
        const sp = point(`${s}:3:0`, srcEdge)
        const center = centerRef.current
        if (sp && center) {
          const ir = innerRef.current!.getBoundingClientRect()
          const cr = center.getBoundingClientRect()
          const cx = s === 'L' ? cr.left - ir.left : cr.right - ir.left
          single(sp, { x: cx, y: cr.top - ir.top + cr.height / 2 })
        }
      }
      setSegs(out)
      setSize({ w: inner.scrollWidth, h: inner.scrollHeight })
    }
    compute()
    const ro = new ResizeObserver(() => compute())
    if (innerRef.current) ro.observe(innerRef.current)
    window.addEventListener('resize', compute)
    const t = setTimeout(compute, 200)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
      clearTimeout(t)
    }
  }, [r32, picks, actual, editable])

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

  // true = correct (green), false = wrong/eliminated (red), undefined = undecided (neutral)
  const isCorrect = (round: keyof BracketPicks, team: string): boolean | undefined => {
    if (!actual || !team) return undefined
    const inActual =
      round === 'CHAMPION'
        ? actual.CHAMPION === team
        : round === 'THIRD'
        ? actual.THIRD === team
        : ((actual[round] as string[] | undefined) ?? []).includes(team)
    if (inActual) return true
    if (!eliminated) return undefined
    const isOut =
      round === 'CHAMPION'
        ? eliminated.CHAMPION === team
        : round === 'THIRD'
        ? eliminated.THIRD === team
        : ((eliminated[round] as string[] | undefined) ?? []).includes(team)
    return isOut ? false : undefined
  }

  // --- stage scoring (20 per stage predicted fully correctly) ---
  const STAGE_SIZE: Record<'R16' | 'QF' | 'SF' | 'FINAL', number> = { R16: 16, QF: 8, SF: 4, FINAL: 2 }
  function stageInfo(round: 'R16' | 'QF' | 'SF' | 'FINAL') {
    const actualList = (actual?.[round] as string[] | undefined) ?? []
    const picked = (picks[round] as string[] | undefined) ?? []
    const total = STAGE_SIZE[round]
    let correct = 0
    for (const t of picked) if (t && actualList.includes(t)) correct++
    return { correct, total, scored: correct === total, graded: !!actual }
  }
  const champThirdScored =
    !!actual && !!actual.CHAMPION && !!actual.THIRD && picks.CHAMPION === actual.CHAMPION && picks.THIRD === actual.THIRD

  // Colour meaning under stage scoring:
  //  solid green  = correct AND its whole stage is complete+correct (earned the 20)
  //  green outline= correct pick, but the stage hasn't earned its 20 (yet)
  //  red          = wrong (eliminated)
  //  neutral/gold = selected, not yet graded
  function teamCls(selected: boolean, correct?: boolean, gold = false, stageScored = false): string {
    if (!selected) return 'bg-zinc-900/70 text-zinc-300 hover:bg-zinc-700'
    if (correct === true)
      return stageScored
        ? 'bg-emerald-400 text-zinc-900 font-semibold'
        : 'bg-zinc-800 text-emerald-300 font-semibold ring-1 ring-inset ring-emerald-500/50'
    if (correct === false) return 'bg-red-500 text-white font-semibold'
    return gold ? 'bg-amber-400 text-zinc-900 font-semibold' : 'bg-zinc-600 text-zinc-50 font-semibold'
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
          isCorrect(round, team),
          false,
          stageInfo(round as 'R16' | 'QF' | 'SF' | 'FINAL').scored
        )} ${!editable ? 'cursor-default' : ''} ${!team ? 'opacity-40' : ''}`}
        disabled={!editable || !team}
        onClick={() => selectWinner(round, gameIndex, team)}
        title={team}
      >
        <Team name={team} fallback="TBD" height={12} className={`w-full ${align === 'right' ? 'justify-end' : ''}`} />
      </button>
    )
  }

  function Column({ col, side, depth }: { col: Col; side: 'left' | 'right'; depth: number }) {
    const games = gamesForRound(r32, picks, col.round)
    const sel = (picks[col.round] as string[] | undefined) ?? []
    const sc = side === 'left' ? 'L' : 'R'
    const info = stageInfo(col.round as 'R16' | 'QF' | 'SF' | 'FINAL')
    return (
      <div className="relative z-10 flex min-w-[132px] flex-1 flex-col">
        <h3 className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
          {COLUMN_LABELS[col.round]}
        </h3>
        {info.graded && (
          <div className="mb-2 text-center">
            {info.scored ? (
              <span className="pill bg-emerald-500/25 text-emerald-300">+20 ✓</span>
            ) : (
              <span className="pill bg-zinc-700/60 text-zinc-400" title="stage scores 20 only if every pick is correct">
                {info.correct}/{info.total}
              </span>
            )}
          </div>
        )}
        <div className="flex h-full flex-col justify-around gap-2">
          {col.indices.map((i, cardIdx) => {
            const g = games[i]
            if (!g) return null
            return (
              <div key={i} ref={(el) => (cardRefs.current[`${sc}:${depth}:${cardIdx}`] = el)} className="card space-y-1 p-1.5">
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

  const ctCorrect =
    (actual?.CHAMPION && picks.CHAMPION === actual.CHAMPION ? 1 : 0) +
    (actual?.THIRD && picks.THIRD === actual.THIRD ? 1 : 0)

  const Center = (
    <div className="relative z-10 flex min-w-[172px] flex-col items-center justify-center gap-4 px-2">
      <div className="text-center text-2xl">🏆</div>
      <div ref={centerRef} className="card w-full space-y-1 p-2">
        <div className="text-center text-[11px] font-semibold uppercase tracking-wide text-amber-300">Final + 3rd</div>
        {actual && (
          <div className="text-center">
            {champThirdScored ? (
              <span className="pill bg-emerald-500/25 text-emerald-300">+20 ✓</span>
            ) : (
              <span className="pill bg-zinc-700/60 text-zinc-400" title="20 pts if champion AND 3rd place are both correct">
                {ctCorrect}/2
              </span>
            )}
          </div>
        )}
        {finalists.length < 2 && <div className="px-2 py-1 text-center text-xs text-zinc-500">Pick both finalists</div>}
        {finalists.map((t) => {
          const selected = picks.CHAMPION === t
          return (
            <button
              key={t}
              className={`w-full rounded px-2 py-1.5 text-sm ${teamCls(selected, isCorrect('CHAMPION', t), true, champThirdScored)} ${!editable ? 'cursor-default' : ''}`}
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
              className={`w-full rounded px-2 py-1 text-sm ${teamCls(selected, isCorrect('THIRD', t), false, champThirdScored)} ${!editable ? 'cursor-default' : ''}`}
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
    // full-bleed: break out of the page's max-width and span the whole browser
    <div className="overflow-x-auto pb-4" style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)' }}>
      <div ref={innerRef} className="relative flex w-full min-w-[960px] items-stretch gap-1.5 px-4">
        <svg className="pointer-events-none absolute inset-0" width={size.w} height={size.h}>
          {segs.map((s, i) => (
            <line key={i} x1={s[0]} y1={s[1]} x2={s[2]} y2={s[3]} stroke="rgb(113 113 122 / 0.55)" strokeWidth={1.5} />
          ))}
        </svg>
        {LEFT.map((col, i) => (
          <Column key={`l${i}`} col={col} side="left" depth={i} />
        ))}
        {Center}
        {RIGHT.map((col, i) => (
          <Column key={`r${i}`} col={col} side="right" depth={RIGHT.length - 1 - i} />
        ))}
      </div>
    </div>
  )
}
