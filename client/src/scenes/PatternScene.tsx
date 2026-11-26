import type { Pattern } from '../types/pattern'
import ScenePlate from './ScenePlate'
import SceneView from './SceneView'
import { sceneFor } from './registry'
import { isPlate, type Lang, type SceneVariant } from './types'

interface Props {
  pattern: Pattern
  lang: Lang
  variant?: SceneVariant
  /** @deprecated Use variant="thumbnail". */
  compact?: boolean
}

export default function PatternScene({ pattern, lang, variant, compact = false }: Props) {
  const definition = sceneFor(pattern.slug)
  if (!definition) return null
  const resolved = variant ?? (compact ? 'thumbnail' : 'detail')
  if (isPlate(definition)) {
    return <ScenePlate definition={definition} diagram={pattern.diagram} lang={lang} variant={resolved} />
  }
  return <SceneView definition={definition} diagram={pattern.diagram} lang={lang} variant={resolved} />
}
