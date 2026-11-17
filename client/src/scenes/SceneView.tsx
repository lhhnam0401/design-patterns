import type { Diagram } from '../types/pattern'
import SceneFrame from './kit/SceneFrame'
import { toneOf } from './kit/names'
import { Call, Tag } from './kit/overlay'
import type { Lang, SceneDefinition } from './types'

interface Props {
  definition: SceneDefinition
  diagram: Diagram
  lang: Lang
  compact?: boolean
}

/** Draws a scene's art, then its call arrows and code-name tags taken from the diagram. */
export default function SceneView({ definition, diagram, lang, compact = false }: Props) {
  const nodes = new Map(diagram.nodes.map(n => [n.id, n]))
  const { Art } = definition

  return (
    <SceneFrame
      title={definition.title[lang]}
      sky={definition.sky}
      compact={compact}
      art={<Art lang={lang} compact={compact} />}
      overlay={
        <g>
          {definition.calls.map((c, i) => (
            <Call key={`c${i}`} d={c.d} method={c.method} at={c.at} tone={toneOf(nodes.get(c.nodeId))} compact={compact} />
          ))}
          {!compact && definition.tags.map((t, i) => {
            const node = nodes.get(t.nodeId)
            return (
              <Tag
                key={`t${i}`}
                name={node?.label ?? t.nodeId}
                method={t.method}
                caption={t.caption[lang]}
                at={t.at}
                to={t.to}
                tone={toneOf(node)}
              />
            )
          })}
        </g>
      }
    />
  )
}
