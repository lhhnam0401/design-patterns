import { createContext, useContext } from 'react'
import type { Tone } from './palette'

/** Unique SVG ids for one rendered scene, so several scenes can share a page. */
export interface SceneIds {
  grain: string
  print: string
  arrow: Record<Tone, string>
}

export const SceneIdsContext = createContext<SceneIds | null>(null)

export function useSceneIds(): SceneIds {
  const ids = useContext(SceneIdsContext)
  if (!ids) throw new Error('Scene primitives must be rendered inside SceneFrame')
  return ids
}

export const url = (id: string) => `url(#${id})`
