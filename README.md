# Bitácora de Prompts — EmissionsTracker (EcoTrack)

## Prompt 1: Estructura de componentes

Actúa como Arquitecto Frontend React + TypeScript. Necesito el componente EmissionsTracker para un dashboard de huella de carbono. Debe mostrar tarjetas con nombre de fuente, categoría (Transporte/Energía/Residuos) y CO2 producido, más un formulario para agregar mediciones. Dame solo la estructura: qué componentes/archivos crear (EmissionsTracker.tsx, tipos, hook) y cómo se relacionan, sin implementación completa todavía.

**Resultado:** la IA propuso separar `types/emission.ts` (tipos), `hooks/useEmissions.ts` (lógica) y `components/features/EmissionsTracker.tsx` (UI), siguiendo el principio de que el componente no debe hablar directo con Supabase.

---

## Prompt 2: Lógica del Custom Hook

Genera el hook useEmissions.ts en TypeScript estricto. Debe: cargar emisiones al montar, exponer loading y error como estado, tener una función addEmission que inserte una nueva medición vía Supabase y actualice el estado local sin recargar toda la lista, y calcular el total de CO2. Usa un servicio separado (emissionsService.ts) para las llamadas a Supabase, no las hagas directamente en el hook.

**Resultado:** primera versión del hook con `useState` + `useEffect`, `fetchEmissions`/`insertEmission` en un archivo de servicio aparte, y suma de CO2 recalculada en cada render.

---

## Prompt 3: Refinamiento (accesibilidad, TS estricto, performance)

Refina el hook y el componente anteriores con estas restricciones: 1) TypeScript estricto, sin `any`, usando el tipo `NewEmission` para el payload del formulario. 2) El cálculo del total de CO2 debe usar useMemo para no recalcularse en cada render. 3) El formulario y las tarjetas deben ser accesibles: labels asociados a inputs, aria-label en los campos, role="alert" en el mensaje de error y aria-live en el estado de carga. 4) Maneja el estado "submitting" del formulario por separado del "loading" de la carga inicial.

**Resultado:** se agregó `useMemo` para `totalCO2`, tipado estricto con `NewEmission`, atributos `aria-label`, `role="alert"` y `aria-live="polite"`, y un estado `submitting` independiente de `loading` para no bloquear la lista mientras se envía el formulario.

---

## Prompt 4: Estilo visual con Tailwind

Aplica Tailwind CSS al componente EmissionsTracker para un acabado profesional: tarjetas con sombra suave y borde sutil, formulario en grid responsive (una columna en móvil, cuatro en desktop), botón primario en verde acorde a una marca de sostenibilidad, y feedback visual claro para error (fondo rojo suave) y carga (texto secundario). Debe verse bien en móvil y desktop.

**Resultado:** grid `sm:grid-cols-4` para el formulario, tarjetas `rounded-lg shadow-sm border`, paleta verde esmeralda (`emerald-600/700`) para acciones y totales, y bloques de error/carga con colores semánticos (rojo/gris).

---

## Evolución del código entre iteraciones

| Iteración | Cambio clave |
|---|---|
| 1 → 2 | De arquitectura vacía a hook funcional con fetch/insert vía servicio separado |
| 2 → 3 | Se corrigen problemas de performance (useMemo) y accesibilidad (aria-*, role) |
| 3 → 4 | Se agrega diseño visual profesional con Tailwind, responsive y con feedback claro |

## Código fuente entregado

- `src/types/emission.ts` — tipos `Emission`, `EmissionCategory`, `NewEmission`
- `src/services/supabase/client.ts` — cliente Supabase
- `src/services/supabase/emissionsService.ts` — `fetchEmissions`, `insertEmission`
- `src/hooks/useEmissions.ts` — estado, carga, inserción, `totalCO2` con `useMemo`
- `src/components/features/EmissionsTracker.tsx` — UI con Tailwind, formulario y tarjetas accesibles

## Demostración

El componente se probó con datos simulados devueltos por `emissionsService`, verificando: estado de carga inicial, error visible si Supabase falla, inserción optimista de una nueva tarjeta sin recargar la lista completa, y layout responsive (1 columna en móvil, 2 en tablet/desktop para las tarjetas).




## Video de prueba 
[text](<vid/Videocaptura de pantalla_20260812_230250.webm>)