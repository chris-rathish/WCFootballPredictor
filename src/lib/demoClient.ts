// A tiny in-memory stand-in for the Supabase client, supporting exactly the
// query patterns this app uses. Activated automatically in DEMO MODE.
import { buildDemoStore, DEMO_USER_ID, type DemoStore } from './demoData'

const LS_KEY = 'wc-demo-store-v5'

function load(): DemoStore {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const fresh = buildDemoStore()
  save(fresh)
  return fresh
}
function save(s: DemoStore) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s))
  } catch {
    /* ignore */
  }
}

export function resetDemo() {
  localStorage.removeItem(LS_KEY)
  location.reload()
}

const store = load()

const DEMO_SESSION = {
  user: { id: DEMO_USER_ID, email: 'you@demo.local' },
  access_token: 'demo',
}

type Row = Record<string, any>

function matchPoints(m: Row, p: Row): number {
  if (m?.status !== 'finished' || m.home_score == null || m.away_score == null) return 0
  let pts = 0
  if (p.home_score === m.home_score) pts += 5
  if (p.away_score === m.away_score) pts += 5
  if (m.stage !== 'group') {
    if (m.winner && p.winner && p.winner === m.winner) pts += 5
  } else if (p.home_score != null && p.away_score != null) {
    if (Math.sign(p.home_score - p.away_score) === Math.sign(m.home_score - m.away_score)) pts += 5
  }
  if (m.motm && p.motm && String(m.motm).trim().toLowerCase() === String(p.motm).trim().toLowerCase()) pts += 5
  return pts
}

function recalcMatch(matchId: number) {
  const m = store.matches.find((x) => x.id === matchId)
  if (!m) return
  for (const p of store.predictions.filter((x) => x.match_id === matchId)) {
    p.points = matchPoints(m, p)
  }
}

function recalcBrackets() {
  const s = store.settings[0]
  const actual = s.actual_bracket || {}
  for (const b of store.brackets) {
    let pts = 0
    const rounds: [keyof typeof actual, number][] = [
      ['R16', s.pts_r16],
      ['QF', s.pts_qf],
      ['SF', s.pts_sf],
      ['FINAL', s.pts_final],
    ]
    for (const [round, val] of rounds) {
      const actualList: string[] = (actual[round] as string[]) ?? []
      const picks: string[] = (b.picks[round as keyof typeof b.picks] as string[]) ?? []
      for (const t of picks) if (t && actualList.includes(t)) pts += val
    }
    if (actual.CHAMPION && b.picks.CHAMPION && actual.CHAMPION === b.picks.CHAMPION) pts += s.pts_champion
    if (actual.THIRD && b.picks.THIRD && actual.THIRD === b.picks.THIRD) pts += s.pts_third
    b.points = pts
  }
}

function nameOf(userId: string): string {
  return store.profiles.find((p) => p.id === userId)?.display_name ?? '—'
}

function computeLeaderboard(): Row[] {
  const matchOf = (matchId: number) => store.matches.find((m) => m.id === matchId)
  const stageOf = (matchId: number) => matchOf(matchId)?.stage ?? 'group'
  return store.profiles.map((p: any) => {
    const mine = store.predictions.filter((x) => x.user_id === p.id)
    const autoGroup = mine.filter((x) => stageOf(x.match_id) === 'group').reduce((a, b) => a + (b.points || 0), 0)
    const autoKo = mine.filter((x) => stageOf(x.match_id) !== 'group').reduce((a, b) => a + (b.points || 0), 0)
    const perfect_predictions = mine.filter((x) => {
      const m = matchOf(x.match_id)
      return m && m.status === 'finished' && (x.points || 0) === 20
    }).length
    const bracket = store.brackets.find((b) => b.user_id === p.id)?.points ?? 0
    const group_stage_matches = (p.gs_match_pts ?? 0) + autoGroup
    const group_stage_prediction = p.gs_pred_pts ?? 0
    const knockout_stage_matches = autoKo
    const knockout_stage_prediction = bracket
    const tournament_predictions = p.tourney_pts ?? 0
    return {
      user_id: p.id,
      display_name: p.display_name,
      group_stage_matches,
      group_stage_prediction,
      knockout_stage_matches,
      knockout_stage_prediction,
      tournament_predictions,
      perfect_predictions,
      total_points:
        group_stage_matches +
        group_stage_prediction +
        knockout_stage_matches +
        knockout_stage_prediction +
        tournament_predictions,
    }
  })
}

class Query {
  private filters: [string, any][] = []
  private orderBy: { col: string; ascending: boolean } | null = null
  private _single: 'single' | 'maybe' | null = null
  private cols = '*'
  private op: { type: string; rows?: any; vals?: any; opts?: any } | null = null

  constructor(private table: string) {}

  select(cols = '*') {
    this.cols = cols
    return this
  }
  eq(col: string, val: any) {
    this.filters.push([col, val])
    return this
  }
  order(col: string, opts?: { ascending?: boolean }) {
    this.orderBy = { col, ascending: opts?.ascending ?? true }
    return this
  }
  limit() {
    return this
  }
  single() {
    this._single = 'single'
    return this
  }
  maybeSingle() {
    this._single = 'maybe'
    return this
  }
  insert(rows: any) {
    this.op = { type: 'insert', rows }
    return this
  }
  upsert(rows: any, opts?: any) {
    this.op = { type: 'upsert', rows, opts }
    return this
  }
  update(vals: any) {
    this.op = { type: 'update', vals }
    return this
  }
  delete() {
    this.op = { type: 'delete' }
    return this
  }

  private tableRows(): Row[] {
    if (this.table === 'leaderboard') return computeLeaderboard()
    return (store as any)[this.table] ?? []
  }

  private run(): { data: any; error: any } {
    // mutations
    if (this.op) return this.runMutation()

    let rows = [...this.tableRows()]
    rows = rows.filter((r) => this.filters.every(([c, v]) => r[c] === v))
    if (this.orderBy) {
      const { col, ascending } = this.orderBy
      rows.sort((a, b) => {
        const av = a[col]
        const bv = b[col]
        if (av == null && bv == null) return 0
        if (av == null) return 1
        if (bv == null) return -1
        if (av < bv) return ascending ? -1 : 1
        if (av > bv) return ascending ? 1 : -1
        return 0
      })
    }
    if (this.table === 'predictions' && this.cols.includes('profiles')) {
      rows = rows.map((r) => ({ ...r, profiles: { display_name: nameOf(r.user_id) } }))
    }
    if (this._single === 'single') {
      return { data: rows[0] ?? null, error: rows[0] ? null : { message: 'No rows' } }
    }
    if (this._single === 'maybe') {
      return { data: rows[0] ?? null, error: null }
    }
    return { data: rows, error: null }
  }

  private runMutation(): { data: any; error: any } {
    const arr: Row[] = (store as any)[this.table]
    const op = this.op!
    if (op.type === 'insert') {
      const rows = Array.isArray(op.rows) ? op.rows : [op.rows]
      const nextId = Math.max(0, ...arr.map((r) => r.id ?? 0)) + 1
      rows.forEach((r, i) => {
        const row = { id: nextId + i, status: 'scheduled', created_at: new Date().toISOString(), ...r }
        arr.push(row)
      })
      save(store)
      return { data: rows, error: null }
    }
    if (op.type === 'upsert') {
      const rows = Array.isArray(op.rows) ? op.rows : [op.rows]
      const conflict: string[] = (op.opts?.onConflict ?? 'id').split(',').map((s: string) => s.trim())
      for (const r of rows) {
        const existing = arr.find((x) => conflict.every((k) => x[k] === r[k]))
        if (existing) {
          Object.assign(existing, r)
          if (this.table === 'predictions') {
            const m = store.matches.find((mm) => mm.id === existing.match_id)
            if (m) existing.points = matchPoints(m, existing)
          }
        } else {
          const nextId = Math.max(0, ...arr.map((x) => x.id ?? 0)) + 1
          const row = { id: nextId, points: 0, ...r }
          if (this.table === 'predictions') {
            const m = store.matches.find((mm) => mm.id === row.match_id)
            if (m) row.points = matchPoints(m, row)
          }
          arr.push(row)
        }
      }
      save(store)
      return { data: rows, error: null }
    }
    if (op.type === 'update') {
      const targets = arr.filter((r) => this.filters.every(([c, v]) => r[c] === v))
      targets.forEach((r) => Object.assign(r, op.vals))
      if (this.table === 'matches') targets.forEach((r) => recalcMatch(r.id))
      save(store)
      return { data: targets, error: null }
    }
    if (op.type === 'delete') {
      const keep = arr.filter((r) => !this.filters.every(([c, v]) => r[c] === v))
      const removed = arr.filter((r) => this.filters.every(([c, v]) => r[c] === v))
      ;(store as any)[this.table] = keep
      if (this.table === 'matches') {
        const ids = new Set(removed.map((r) => r.id))
        store.predictions = store.predictions.filter((p) => !ids.has(p.match_id))
      }
      save(store)
      return { data: removed, error: null }
    }
    return { data: null, error: { message: 'unsupported op' } }
  }

  then(onfulfilled?: (v: { data: any; error: any }) => any, _onrejected?: (e: any) => any): any {
    let result: { data: any; error: any }
    try {
      result = this.run()
    } catch (e: any) {
      result = { data: null, error: { message: e?.message ?? String(e) } }
    }
    return onfulfilled ? onfulfilled(result) : result
  }
}

export const demoClient = {
  from(table: string) {
    return new Query(table)
  },
  rpc(name: string) {
    if (name === 'recalc_all_brackets') {
      recalcBrackets()
      save(store)
    }
    return Promise.resolve({ data: null, error: null })
  },
  auth: {
    async getSession() {
      return { data: { session: DEMO_SESSION }, error: null }
    },
    onAuthStateChange() {
      return { data: { subscription: { unsubscribe() {} } } }
    },
    async signInWithOtp() {
      return { data: {}, error: null }
    },
    async signOut() {
      return { error: null }
    },
  },
}
