import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Emission, NewEmission } from '../types/emission'
import { fetchEmissions, insertEmission } from '../services/supabase/emissionsService'

interface UseEmissionsResult {
  emissions: Emission[]
  loading: boolean
  error: string | null
  totalCO2: number
  addEmission: (payload: NewEmission) => Promise<void>
  refetch: () => Promise<void>
}

export function useEmissions(): UseEmissionsResult {
  const [emissions, setEmissions] = useState<Emission[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchEmissions()
      setEmissions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar emisiones')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addEmission = useCallback(async (payload: NewEmission) => {
    setError(null)
    try {
      const created = await insertEmission(payload)
      setEmissions((prev) => [created, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la medición')
      throw err
    }
  }, [])

  const totalCO2 = useMemo(
    () => emissions.reduce((sum, e) => sum + e.co2_kg, 0),
    [emissions]
  )

  return { emissions, loading, error, totalCO2, addEmission, refetch: load }
}
