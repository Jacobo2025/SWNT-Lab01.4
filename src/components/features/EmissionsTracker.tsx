import { useState, type FormEvent } from 'react'
import { useEmissions } from '../../hooks/useEmissions'
import type { EmissionCategory } from '../../types/emission'

const CATEGORIES: EmissionCategory[] = ['Transporte', 'Energía', 'Residuos']

export function EmissionsTracker() {
  const { emissions, loading, error, totalCO2, addEmission } = useEmissions()
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState<EmissionCategory>('Transporte')
  const [co2, setCo2] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!nombre.trim() || !co2) return
    setSubmitting(true)
    try {
      await addEmission({ nombre_fuente: nombre, categoria, co2_kg: Number(co2) })
      setNombre('')
      setCo2('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="emissions-heading" className="max-w-3xl mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 id="emissions-heading" className="text-xl font-semibold text-slate-800">
          Dashboard de Emisiones
        </h1>
        <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Total: {totalCO2.toFixed(1)} kg CO2
        </span>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <label className="sm:col-span-2 text-sm text-slate-600">
          Fuente
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            aria-label="Nombre de la fuente"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <label className="text-sm text-slate-600">
          Categoría
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as EmissionCategory)}
            aria-label="Categoría"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="text-sm text-slate-600">
          CO2 (kg)
          <input
            type="number"
            min="0"
            step="0.1"
            value={co2}
            onChange={(e) => setCo2(e.target.value)}
            required
            aria-label="CO2 en kilogramos"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-4 rounded-md bg-emerald-600 text-white py-2 font-medium hover:bg-emerald-700 disabled:opacity-50 transition-colors"
        >
          {submitting ? 'Guardando…' : 'Agregar medición'}
        </button>
      </form>

      {error && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-slate-500 text-sm" aria-live="polite">Cargando emisiones…</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {emissions.map((e) => (
            <li
              key={e.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col gap-1"
            >
              <span className="font-medium text-slate-800">{e.nombre_fuente}</span>
              <span className="text-xs uppercase tracking-wide text-slate-500">{e.categoria}</span>
              <span className="text-emerald-700 font-semibold">{e.co2_kg} kg CO2</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
