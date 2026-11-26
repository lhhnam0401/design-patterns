import { useEffect, useMemo, useState } from 'react'
import type { Diagram } from '../../types/pattern'
import ScenePlate from '../ScenePlate'
import type { Lang, SceneDefinition } from '../types'
import { highlightFor, OVERVIEW, type HighlightState } from './highlight'
import { HighlightContext } from './HighlightContext'
import Legend from './Legend'
import { nodeMap } from './nodes'
import Pins from './Pins'
import StepPlayer from './StepPlayer'

interface Props {
  definition: SceneDefinition
  diagram: Diagram
  lang: Lang
}

/**
 * The example plate on a pattern page: the drawing with its lettered pins and
 * step badges, the step player, and the legend. Pointing at a pin or a row
 * lights that object and its arrows; the step player lights one call at a time.
 */
export default function SceneExplorer({ definition, diagram, lang }: Props) {
  const [state, setState] = useState<HighlightState>(OVERVIEW)
  const nodes = useMemo(() => nodeMap(diagram), [diagram])
  const highlight = useMemo(() => highlightFor(definition, state), [definition, state])
  // The drawing never changes on hover; only Parts and arrows re-render through the context.
  const plate = useMemo(
    () => <ScenePlate definition={definition} diagram={diagram} lang={lang} variant="detail" />,
    [definition, diagram, lang],
  )

  useEffect(() => {
    if (!state.pressed) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setState(s => ({ ...s, pressed: null, hovered: null }))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.pressed])

  const onHover = (node: string | null) => setState(s => (s.hovered === node ? s : { ...s, hovered: node }))
  const onToggle = (node: string) => setState(s => ({ ...s, pressed: s.pressed === node ? null : node }))
  const onStep = (step: number | null) => setState(s => ({ ...s, step, pressed: null }))

  return (
    <figure className="@container mt-6 min-w-0" data-scene-explorer={definition.slug}>
      <div className="overflow-hidden rounded-lg border border-line bg-scene-paper">
        <div className="relative">
          <HighlightContext.Provider value={highlight}>{plate}</HighlightContext.Provider>
          <Pins
            definition={definition}
            nodes={nodes}
            highlight={highlight}
            step={state.step}
            onHover={onHover}
            onToggle={onToggle}
            onStep={onStep}
          />
        </div>
      </div>
      <StepPlayer definition={definition} nodes={nodes} lang={lang} step={state.step} onStep={onStep} />
      <Legend
        definition={definition}
        nodes={nodes}
        lang={lang}
        highlight={highlight}
        pressed={state.pressed}
        onHover={onHover}
        onToggle={onToggle}
      />
    </figure>
  )
}
