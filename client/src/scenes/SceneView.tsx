import type { Diagram } from '../types/pattern'
import SceneFrame from './kit/SceneFrame'
import { toneOf } from './kit/names'
import { Call, Tag } from './kit/overlay'
import type { Lang, LegacySceneDefinition, SceneVariant } from './types'

interface Props {
  definition: LegacySceneDefinition
  diagram: Diagram
  lang: Lang
  variant?: SceneVariant
  /** @deprecated Use variant="thumbnail". */
  compact?: boolean
}

/** Draws a scene's art and adds only the annotations appropriate to its context. */
export default function SceneView({ definition, diagram, lang, variant, compact = false }: Props) {
  const resolvedVariant = variant ?? (compact ? 'thumbnail' : 'detail')
  const nodes = new Map(diagram.nodes.map(node => [node.id, node]))
  const { Art } = definition
  const showCalls = resolvedVariant !== 'thumbnail'
  const showTags = resolvedVariant === 'detail'

  return (
    <SceneFrame
      title={definition.title[lang]}
      sky={definition.sky}
      variant={resolvedVariant}
      art={<Art lang={lang} compact={resolvedVariant === 'thumbnail'} />}
      overlay={
        <>
          {showCalls && (
            <g data-scene-calls="true">
              {definition.calls.map((call, index) => (
                <Call
                  key={`c${index}`}
                  d={call.d}
                  method={call.method}
                  at={call.at}
                  tone={toneOf(nodes.get(call.nodeId))}
                  compact={resolvedVariant !== 'detail'}
                />
              ))}
            </g>
          )}
          {showTags && (
            <g data-scene-tags="true">
              {definition.tags.map((tag, index) => {
                const node = nodes.get(tag.nodeId)
                return (
                  <Tag
                    key={`t${index}`}
                    name={node?.label ?? tag.nodeId}
                    method={tag.method}
                    caption={tag.caption[lang]}
                    at={tag.at}
                    to={tag.to}
                    tone={toneOf(node)}
                  />
                )
              })}
            </g>
          )}
        </>
      }
    />
  )
}
