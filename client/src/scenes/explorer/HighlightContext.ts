import { createContext, useContext } from 'react'
import type { Highlight } from './highlight'

/** What the plate currently lights; null for the overview, where nothing is dimmed. */
export const HighlightContext = createContext<Highlight | null>(null)

export type LitState = 'lit' | 'dimmed' | null

export function useNodeLit(node: string): LitState {
  const highlight = useContext(HighlightContext)
  if (!highlight) return null
  return highlight.nodes.has(node) ? 'lit' : 'dimmed'
}

export function useCallLit(id: string): LitState {
  const highlight = useContext(HighlightContext)
  if (!highlight) return null
  return highlight.calls.has(id) ? 'lit' : 'dimmed'
}

export function useBackdropLit(): LitState {
  return useContext(HighlightContext) ? 'dimmed' : null
}

/** Opacity and data attributes for a lit state. Transitions honour prefers-reduced-motion via index.css. */
export function litProps(state: LitState) {
  return {
    'data-lit': state === 'lit' ? 'true' : undefined,
    'data-dimmed': state === 'dimmed' ? 'true' : undefined,
    style: { opacity: state === 'dimmed' ? 0.3 : 1, transition: 'opacity 200ms ease-out' },
  }
}
