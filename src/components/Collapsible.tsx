import { useState, type ReactNode } from 'react'

// Simple collapsible section with a header, optional count pill, and disclosure arrow.
export default function Collapsible({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string
  count?: number
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        className="flex w-full items-center gap-2 rounded-md bg-zinc-800/50 px-3 py-2 text-left text-sm font-semibold text-zinc-300 hover:bg-zinc-700/50"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xs text-zinc-500">{open ? '▼' : '▶'}</span>
        {title}
        {count != null && <span className="pill bg-zinc-600/40 text-zinc-300">{count}</span>}
      </button>
      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  )
}
