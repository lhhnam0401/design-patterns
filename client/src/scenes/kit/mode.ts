import { createContext, useContext } from 'react'
import type { SceneVariant } from '../types'

const SceneVariantContext = createContext<SceneVariant>('detail')

export const SceneVariantProvider = SceneVariantContext.Provider
export const useSceneVariant = () => useContext(SceneVariantContext)
