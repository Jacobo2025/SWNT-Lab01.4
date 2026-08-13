import { supabase } from './client'
import type { Emission, NewEmission } from '../../types/emission'

export async function fetchEmissions(): Promise<Emission[]> {
  const { data, error } = await supabase
    .from('emisiones')
    .select('*')
    .order('creado_en', { ascending: false })

  if (error) throw error
  return data as Emission[]
}

export async function insertEmission(payload: NewEmission): Promise<Emission> {
  const { data, error } = await supabase
    .from('emisiones')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data as Emission
}
