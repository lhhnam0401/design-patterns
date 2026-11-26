import type { SceneDefinition } from '../types'

export interface HighlightState {
  /** Node under the pointer or keyboard focus, on a pin or a legend row. */
  hovered: string | null
  /** Node whose legend row is pressed. */
  pressed: string | null
  /** Index into `definition.steps`, or null for the overview. */
  step: number | null
}

export interface Highlight {
  nodes: ReadonlySet<string>
  calls: ReadonlySet<string>
}

export const OVERVIEW: HighlightState = { hovered: null, pressed: null, step: null }

/**
 * What the plate lights, in priority order: the hovered object, then the pressed
 * legend row, then the selected step. Null means the overview: nothing is dimmed.
 * An object's arrows are the calls to its own methods.
 */
export function highlightFor(definition: SceneDefinition, state: HighlightState): Highlight | null {
  const node = state.hovered ?? state.pressed
  if (node) {
    return {
      nodes: new Set([node]),
      calls: new Set(definition.calls.filter(call => call.nodeId === node).map(call => call.id)),
    }
  }
  if (state.step !== null) {
    const step = definition.steps[state.step]
    if (step) return { nodes: new Set(step.nodes), calls: new Set(step.calls) }
  }
  return null
}
