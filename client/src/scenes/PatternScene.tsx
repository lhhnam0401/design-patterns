import type { Pattern } from '../types/pattern'
import ScenePlate from './ScenePlate'
import { sceneFor } from './registry'
import type { Lang, SceneVariant } from './types'

interface Props {
  pattern: Pattern
  lang: Lang
  variant?: SceneVariant
}

/** The plate for a pattern, or nothing if the pattern has no scene. */
export default function PatternScene({ pattern, lang, variant = 'detail' }: Props) {
  const definition = sceneFor(pattern.slug)
  if (!definition) return null
  return <ScenePlate definition={definition} diagram={pattern.diagram} lang={lang} variant={variant} />
}
