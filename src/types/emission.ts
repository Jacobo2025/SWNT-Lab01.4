export type EmissionCategory = 'Transporte' | 'Energía' | 'Residuos'

export interface Emission {
  id: string
  nombre_fuente: string
  categoria: EmissionCategory
  co2_kg: number
  creado_en: string
}

export type NewEmission = Omit<Emission, 'id' | 'creado_en'>
