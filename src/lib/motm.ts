import { supabase } from './supabase'

// Shared, de-duplicated list of Man-of-the-Match names already used anywhere in the
// app (predictions + actual results). Feeding this into a <datalist> means once a
// canonical spelling exists, everyone picks the same one — avoiding mismatches that
// would cost points.
let cache: string[] | null = null
let inflight: Promise<string[]> | null = null

export async function getMotmOptions(): Promise<string[]> {
  if (cache) return cache
  if (inflight) return inflight
  inflight = (async () => {
    const [{ data: preds }, { data: matches }] = await Promise.all([
      supabase.from('predictions').select('motm'),
      supabase.from('matches').select('motm'),
    ])
    const set = new Set<string>()
    for (const r of [...(preds ?? []), ...(matches ?? [])] as any[]) {
      const v = (r.motm ?? '').trim()
      if (v) set.add(v)
    }
    cache = Array.from(set).sort((a, b) => a.localeCompare(b))
    inflight = null
    return cache
  })()
  return inflight
}

export function invalidateMotm() {
  cache = null
  inflight = null
}

export const MOTM_DATALIST_ID = 'motm-options'
