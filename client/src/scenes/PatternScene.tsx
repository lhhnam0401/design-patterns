import type { Pattern } from '../types/pattern'
import SceneView from './SceneView'
import { sceneFor } from './registry'
import type { Lang } from './types'

interface Props {
  pattern: Pattern
  lang: Lang
  /** Card thumbnail: fills its box, no tags or call labels. */
  compact?: boolean
}

export default function PatternScene({ pattern, lang, compact = false }: Props) {
  const definition = sceneFor(pattern.slug)
  if (!definition) return null
  return <SceneView definition={definition} diagram={pattern.diagram} lang={lang} compact={compact} />
}
