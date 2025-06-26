import { useState, useEffect } from 'react'
import { supabase, Cat, Meal, FeedingLog } from '../lib/supabase'

// Cats hooks
export const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCats = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('cats')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCats(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addCat = async (name: string, imageUrl?: string) => {
    try {
      const { data, error } = await supabase
        .from('cats')
        .insert([{ name, image_url: imageUrl }])
        .select()

      if (error) throw error
      await fetchCats()
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    }
  }

  const updateCat = async (id: string, updates: Partial<Cat>) => {
    try {
      const { error } = await supabase
        .from('cats')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      await fetchCats()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const deleteCat = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cats')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchCats()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  useEffect(() => {
    fetchCats()
  }, [])

  return {
    cats,
    loading,
    error,
    fetchCats,
    addCat,
    updateCat,
    deleteCat
  }
}

// Meals hooks
export const useMeals = (catId?: string) => {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMeals = async () => {
    try {
      setLoading(true)
      let query = supabase.from('meals').select('*')
      
      if (catId) {
        query = query.eq('cat_id', catId)
      }
      
      const { data, error } = await query.order('time', { ascending: true })

      if (error) throw error
      setMeals(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addMeal = async (meal: Omit<Meal, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('meals')
        .insert([meal])
        .select()

      if (error) throw error
      await fetchMeals()
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    }
  }

  const updateMeal = async (id: string, updates: Partial<Meal>) => {
    try {
      const { error } = await supabase
        .from('meals')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      await fetchMeals()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const deleteMeal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('meals')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchMeals()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [catId])

  return {
    meals,
    loading,
    error,
    fetchMeals,
    addMeal,
    updateMeal,
    deleteMeal
  }
}

// Feeding logs hooks
export const useFeedingLogs = (catId?: string) => {
  const [logs, setLogs] = useState<FeedingLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLogs = async () => {
    try {
      setLoading(true)
      let query = supabase.from('feeding_logs').select('*')
      
      if (catId) {
        query = query.eq('cat_id', catId)
      }
      
      const { data, error } = await query.order('fed_at', { ascending: false })

      if (error) throw error
      setLogs(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addFeedingLog = async (log: Omit<FeedingLog, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('feeding_logs')
        .insert([log])
        .select()

      if (error) throw error
      await fetchLogs()
      return data?.[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [catId])

  return {
    logs,
    loading,
    error,
    fetchLogs,
    addFeedingLog
  }
} 