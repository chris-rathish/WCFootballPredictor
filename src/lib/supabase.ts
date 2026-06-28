import { createClient } from '@supabase/supabase-js'
import { demoClient } from './demoClient'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// DEMO MODE: when Supabase env vars aren't configured, run fully in-browser with
// fake data so the whole app is clickable without any backend setup.
export const IS_DEMO = !url || !anon

if (IS_DEMO) {
  // eslint-disable-next-line no-console
  console.info('⚽ Running in DEMO MODE (no Supabase configured). Data is fake and local to this browser.')
}

export const supabase: any = IS_DEMO
  ? demoClient
  : createClient(url, anon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
