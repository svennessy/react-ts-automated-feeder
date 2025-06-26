import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Cat {
  id: string
  name: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Meal {
  id: string
  cat_id: string
  name: string
  time: string
  portions: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FeedingLog {
  id: string
  cat_id: string
  meal_id: string
  portions: number
  fed_at: string
  created_at: string
} 