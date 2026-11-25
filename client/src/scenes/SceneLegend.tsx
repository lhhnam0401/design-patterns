import type { Diagram } from '../types/pattern'
import type { Lang, SceneDefinition } from './types'

interface Props {
  definition: SceneDefinition
  diagram: Diagram
  lang: Lang
}

export default function SceneLegend({ definition, diagram, lang }: Props) {
  const nodes = new Map(diagram.nodes.map(node => [node.id, node]))
  const heading = lang === 'vi' ? 'Chú giải kỹ thuật' : 'Technical annotations'
  const relationships = lang === 'vi' ? 'Luồng phương thức' : 'Method flow'

  return (
    <div className="mt-4 min-w-0 border-y border-line bg-surface px-4 py-5 md:hidden" aria-label={heading}>
      <h3 className="eyebrow text-ink-muted">{heading}</h3>
      <ul className="mt-4 space-y-3">
        {definition.tags.map((tag, index) => {
          const node = nodes.get(tag.nodeId)
          return (
            <li key={`${tag.nodeId}-${index}`} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-relaxed">
              <span className="tabular-nums text-accent">{String(index + 1).padStart(2, '0')}</span>
              <span>
                <code className="font-mono text-xs font-semibold text-ink">
                  {node?.label ?? tag.nodeId}{tag.method ? `.${tag.method}()` : ''}
                </code>
                <span className="mt-1 block text-ink-muted">{tag.caption[lang]}</span>
              </span>
            </li>
          )
        })}
      </ul>
      {definition.calls.length > 0 && (
        <div className="mt-5 border-t border-line pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">{relationships}</p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-ink">
            {definition.calls.map(call => `${nodes.get(call.nodeId)?.label ?? call.nodeId}.${call.method}()`).join(' · ')}
          </p>
        </div>
      )}
    </div>
  )
}
