import { useEffect } from 'react'

// Re-run `fn` when the tab regains focus and on a fixed interval, so live data
// (leaderboard, bracket, matches) stays fresh without a manual refresh.
export function useAutoRefresh(fn: () => void, intervalMs = 30000) {
  useEffect(() => {
    const onFocus = () => fn()
    const onVisible = () => {
      if (document.visibilityState === 'visible') fn()
    }
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onVisible)
    const id = setInterval(fn, intervalMs)
    return () => {
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onVisible)
      clearInterval(id)
    }
  }, [fn, intervalMs])
}
