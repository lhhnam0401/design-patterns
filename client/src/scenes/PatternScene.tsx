import type { Pattern } from '../types/pattern'
import SceneView from './SceneView'
import { sceneFor } from './registry'
import type { Lang, SceneVariant } from './types'

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
  return (
    <SceneView
      definition={definition}
      diagram={pattern.diagram}
      lang={lang}
      variant={variant ?? (compact ? 'thumbnail' : 'detail')}
    />
  )
}
