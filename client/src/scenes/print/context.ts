import { createContext, useContext } from 'react'
import type { SceneVariant } from '../types'
import type { Tone } from './pigments'

/** Unique SVG ids for one rendered plate, so several plates can share a page. */
export interface PlateIds {
  fleck: string
  call: Record<Tone, string>
  ret: Record<Tone, string>
}

export const PlateIdsContext = createContext<PlateIds | null>(null)

export function usePlateIds(): PlateIds {
  const ids = useContext(PlateIdsContext)
  if (!ids) throw new Error('Plate primitives must be rendered inside PlateFrame')
  return ids
}

export const PlateVariantContext = createContext<SceneVariant>('detail')
export const usePlateVariant = () => useContext(PlateVariantContext)

export const url = (id: string) => `url(#${id})`
