import type { Diagram } from '../types/pattern'
import { nodeMap, toneOf } from './explorer/nodes'
import { CallPath } from './print/arrows'
import PlateFrame from './print/PlateFrame'
import type { Lang, SceneDefinition, SceneVariant } from './types'

interface Props {
  definition: SceneDefinition
  diagram: Diagram
  lang: Lang
  variant?: SceneVariant
}

/**
 * Draws a plate: the art plus the call arrows. Thumbnails crop to the scene's
 * focus and drop arrows and captions; pins and steps live in SceneExplorer.
 */
export default function ScenePlate({ definition, diagram, lang, variant = 'detail' }: Props) {
  const nodes = nodeMap(diagram)
  const { Art } = definition
  const thumbnail = variant === 'thumbnail'

  return (
    <PlateFrame
      title={definition.title[lang]}
      setting={definition.setting}
      variant={variant}
      view={thumbnail ? definition.focus : undefined}
      art={<Art lang={lang} compact={thumbnail} />}
      calls={thumbnail ? undefined : definition.calls.map(call => (
        <CallPath key={call.id} id={call.id} d={call.d} tone={toneOf(nodes.get(call.nodeId))} kind={call.kind} />
      ))}
    />
  )
}
