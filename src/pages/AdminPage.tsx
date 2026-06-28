import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/types'
import AdminMatches from '../components/AdminMatches'
import AdminBracket from '../components/AdminBracket'
import AdminPredictions from '../components/AdminPredictions'

type Tab = 'matches' | 'predictions' | 'bracket' | 'players'

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('matches')

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Admin</h1>
      <div className="mb-4 flex gap-1 text-sm">
        {(['matches', 'predictions', 'bracket', 'players'] as Tab[]).map((t) => (
          <button
            key={t}
            className={`rounded-md px-3 py-1 capitalize ${tab === t ? 'bg-red-600 text-white' : 'bg-zinc-700/60 text-zinc-300'}`}
            onClick={() => setTab(t)}
          >
            {t === 'matches' ? 'Matches & Results' : t === 'predictions' ? 'Edit Predictions' : t}
          </button>
        ))}
      </div>

      {tab === 'matches' && <AdminMatches />}
      {tab === 'predictions' && <AdminPredictions />}
      {tab === 'bracket' && <AdminBracket />}
      {tab === 'players' && <Players />}
    </div>
  )
}

function Players() {
  const [rows, setRows] = useState<Profile[]>([])

  async function load() {
    const { data } = await supabase
      .from('profiles')
      .select('id, display_name, is_admin, gs_match_pts, gs_pred_pts, tourney_pts, perfect_pts')
      .order('display_name')
    setRows((data as Profile[]) ?? [])
  }
  useEffect(() => {
    load()
  }, [])

  async function patch(id: string, vals: Partial<Profile>) {
    await supabase.from('profiles').update(vals).eq('id', id)
    load()
  }

  const numField = (
    id: string,
    key: 'gs_match_pts' | 'gs_pred_pts' | 'tourney_pts' | 'perfect_pts',
    val: number | undefined
  ) => (
    <input
      className="input w-20 text-right"
      inputMode="numeric"
      defaultValue={val ?? 0}
      onBlur={(e) => {
        const n = parseInt(e.target.value || '0', 10)
        if (n !== (val ?? 0)) patch(id, { [key]: n })
      }}
    />
  )

  return (
    <div className="card space-y-3">
      <p className="text-sm text-zinc-400">
        Manage names, admin rights, and the manual point buckets. Knockout match points and the knockout
        bracket are calculated automatically — these fields are for group-stage carry-over and tournament-wide predictions.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-zinc-400">
            <tr>
              <th className="py-1 pr-3">Name</th>
              <th className="py-1 pr-3">Group Stage Matches</th>
              <th className="py-1 pr-3">Group Stage Prediction</th>
              <th className="py-1 pr-3">Tournament Predictions</th>
              <th className="py-1 pr-3">🎯 Perfect</th>
              <th className="py-1 pr-3 text-center">Admin</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-t border-zinc-700/40">
                <td className="py-2 pr-3">
                  <input
                    className="input max-w-[10rem]"
                    defaultValue={p.display_name}
                    onBlur={(e) => e.target.value !== p.display_name && patch(p.id, { display_name: e.target.value })}
                  />
                </td>
                <td className="py-2 pr-3">{numField(p.id, 'gs_match_pts', p.gs_match_pts)}</td>
                <td className="py-2 pr-3">{numField(p.id, 'gs_pred_pts', p.gs_pred_pts)}</td>
                <td className="py-2 pr-3">{numField(p.id, 'tourney_pts', p.tourney_pts)}</td>
                <td className="py-2 pr-3">{numField(p.id, 'perfect_pts', p.perfect_pts)}</td>
                <td className="py-2 pr-3 text-center">
                  <input
                    type="checkbox"
                    checked={p.is_admin}
                    onChange={(e) => patch(p.id, { is_admin: e.target.checked })}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
