import { useEffect, useRef, useState } from 'react'
import { squadFor } from '../lib/squads'
import { Flag } from './Team'

interface Props {
  home: string
  away: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

// Man-of-the-Match picker: click the field to see all players (grouped + colour-coded
// by team), or type to filter. Free text is still allowed.
export default function MotmInput({ home, away, value, onChange, placeholder = 'Man of the Match', className = 'input' }: Props) {
  const [open, setOpen] = useState(false)
  const [typed, setTyped] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const q = value.trim().toLowerCase()
  const match = (n: string) => !typed || !q || n.toLowerCase().includes(q)
  const homeList = squadFor(home).filter(match)
  const awayList = squadFor(away).filter(match)

  function pick(n: string) {
    onChange(n)
    setOpen(false)
    setTyped(false)
  }

  return (
    <div className="relative" ref={ref}>
      <input
        className={className}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        name={`motm-${home}-${away}`}
        onFocus={() => {
          setOpen(true)
          setTyped(false)
        }}
        onChange={(e) => {
          onChange(e.target.value)
          setTyped(true)
          setOpen(true)
        }}
      />
      {open && (homeList.length > 0 || awayList.length > 0) && (
        <div className="absolute z-30 mt-1 max-h-64 w-60 overflow-y-auto rounded-md border border-zinc-700 bg-zinc-900 shadow-xl">
          {homeList.length > 0 && <Group team={home} names={homeList} tone="home" onPick={pick} />}
          {awayList.length > 0 && <Group team={away} names={awayList} tone="away" onPick={pick} />}
        </div>
      )}
    </div>
  )
}

function Group({ team, names, tone, onPick }: { team: string; names: string[]; tone: 'home' | 'away'; onPick: (n: string) => void }) {
  const head = tone === 'home' ? 'text-sky-300' : 'text-amber-300'
  const opt =
    tone === 'home' ? 'text-sky-100 hover:bg-sky-500/20' : 'text-amber-100 hover:bg-amber-500/20'
  return (
    <div>
      <div className={`sticky top-0 flex items-center gap-1 bg-zinc-900 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${head}`}>
        <Flag name={team} height={10} /> {team}
      </div>
      {names.map((n) => (
        <button
          key={n}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            onPick(n)
          }}
          className={`block w-full px-3 py-1 text-left text-sm ${opt}`}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
