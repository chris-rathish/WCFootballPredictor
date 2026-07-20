import { useEffect, useMemo, useState } from 'react'

const COLORS = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#e879f9', '#eab308', '#f8fafc']

// One-shot confetti burst. Pass an `id` to fire only once per browser session
// (so it doesn't replay every time the tab is revisited).
export default function Confetti({ id, count = 130, duration = 5000 }: { id?: string; count?: number; duration?: number }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (id) {
      const key = `confetti-${id}`
      try {
        if (sessionStorage.getItem(key)) return
        sessionStorage.setItem(key, '1')
      } catch {
        /* ignore */
      }
    }
    setShow(true)
    const t = setTimeout(() => setShow(false), duration)
    return () => clearTimeout(t)
  }, [id, duration])

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 2.8 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        drift: (Math.random() - 0.5) * 160,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        round: Math.random() < 0.3,
      })),
    [count]
  )

  if (!show) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            top: '-6%',
            left: `${p.left}%`,
            width: p.w,
            height: p.h,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            ['--drift' as string]: `${p.drift}px`,
            animation: `confetti-fall ${p.dur}s ${p.delay}s cubic-bezier(0.2, 0.6, 0.4, 1) forwards`,
          }}
        />
      ))}
    </div>
  )
}
