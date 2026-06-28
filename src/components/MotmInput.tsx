import { useId } from 'react'
import { squadOptionsForMatch } from '../lib/squads'

interface Props {
  home: string
  away: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}

// Man-of-the-Match text input backed by a datalist of both teams' squad members.
// Free text is still allowed for anyone not on the list.
export default function MotmInput({ home, away, value, onChange, placeholder = 'Man of the Match', className = 'input' }: Props) {
  const listId = useId()
  const options = squadOptionsForMatch(home, away)
  return (
    <>
      <input
        className={className}
        list={listId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={`${o.team}:${o.name}`} value={o.name} label={`${o.name} — ${o.team}`} />
        ))}
      </datalist>
    </>
  )
}
