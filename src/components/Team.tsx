import { flagUrl } from '../lib/flags'

export function Flag({ name, height = 14, className = '' }: { name: string; height?: number; className?: string }) {
  const f = flagUrl(name, 40)
  if (!f) return null
  return (
    <img
      src={f.src}
      srcSet={f.srcSet}
      alt=""
      height={height}
      style={{ height }}
      className={`inline-block w-auto rounded-[2px] ring-1 ring-black/30 ${className}`}
      loading="lazy"
    />
  )
}

// Inline flag + team name. Use anywhere a country is displayed.
export default function Team({
  name,
  fallback = '',
  className = '',
  height = 14,
}: {
  name: string
  fallback?: string
  className?: string
  height?: number
}) {
  if (!name) return <span className={className}>{fallback}</span>
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Flag name={name} height={height} />
      <span>{name}</span>
    </span>
  )
}
