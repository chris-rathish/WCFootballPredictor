import Team from './Team'

export interface Winner {
  name: string
  points?: number // shown as "N pts" when set
  sub?: string // subtitle shown instead of points (e.g. "Champions")
  team?: boolean // render name with a flag
}

const STYLE: Record<number, { medal: string; ring: string; grad: string; h: string; text: string }> = {
  1: { medal: '🥇', ring: 'ring-amber-400/60', grad: 'from-amber-400/25', h: 'pt-6 pb-8', text: 'text-amber-200' },
  2: { medal: '🥈', ring: 'ring-zinc-300/40', grad: 'from-zinc-300/15', h: 'pt-4 pb-6', text: 'text-zinc-200' },
  3: { medal: '🥉', ring: 'ring-orange-400/40', grad: 'from-orange-400/15', h: 'pt-4 pb-5', text: 'text-orange-200' },
}

// Top-3 podium card (2nd · 1st · 3rd), gold/silver/bronze.
export default function Podium({ winners, title = '🏆 Overall Winners' }: { winners: Winner[]; title?: string }) {
  if (winners.length < 3) return null
  const order = [
    { w: winners[1], place: 2 },
    { w: winners[0], place: 1 },
    { w: winners[2], place: 3 },
  ]
  return (
    <div className="mb-6 rounded-2xl border border-amber-500/25 bg-gradient-to-b from-amber-500/5 to-transparent p-4">
      <h2 className="mb-4 text-center text-lg font-bold">{title}</h2>
      <div className="flex items-end justify-center gap-2 sm:gap-4">
        {order.map(({ w, place }) => {
          const s = STYLE[place]
          return (
            <div
              key={w.name}
              className={`relative flex w-28 flex-col items-center rounded-xl bg-gradient-to-b ${s.grad} to-transparent px-2 ${s.h} text-center ring-1 ${s.ring} sm:w-36`}
            >
              <div className="absolute left-2 top-1 text-xs font-bold text-zinc-500">{place}</div>
              <div
                className="text-3xl sm:text-4xl"
                style={{ animation: `podium-pop 0.5s ${place === 1 ? 0.15 : place === 2 ? 0 : 0.3}s both` }}
              >
                {s.medal}
              </div>
              <div className={`mt-1 flex max-w-full items-center justify-center gap-1 truncate text-sm font-bold sm:text-base ${s.text}`} title={w.name}>
                {w.team ? <Team name={w.name} height={16} /> : w.name}
              </div>
              <div className="text-xs text-zinc-400">{w.points != null ? `${w.points} pts` : w.sub}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
