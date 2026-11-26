import type { Diagram, DiagramNode } from '../../types/pattern'
import type { Tone } from '../print/pigments'
import type { SceneCall, SceneDefinition } from '../types'

/** Diagram labels starting with "Client" stand for client code, not a class. */
export function isClientLabel(label: string): boolean {
  return /^Client\b/.test(label)
}

/** The role a node plays, which picks its tone and shape mark. A node with role Client counts as the client. */
export function toneOf(node: DiagramNode | undefined): Tone {
  if (!node) return 'class'
  if (isClientLabel(node.label) || node.role === 'Client') return 'client'
  return node.kind
}

/** Pins are lettered A, B, C… in the order the scene lists them. */
export const pinLetter = (index: number) => String.fromCharCode(65 + index)

export function nodeMap(diagram: Diagram): Map<string, DiagramNode> {
  return new Map(diagram.nodes.map(node => [node.id, node]))
}

/** `Label.method()` for one call, as the step player and legend print it. */
export function callLabel(call: SceneCall, nodes: Map<string, DiagramNode>): string {
  return `${nodes.get(call.nodeId)?.label ?? call.nodeId}.${call.method}()`
}

/** The code chips for one step: its call arrows, deduplicated, without returns. */
export function stepChips(definition: SceneDefinition, stepIndex: number, nodes: Map<string, DiagramNode>): string[] {
  const step = definition.steps[stepIndex]
  if (!step) return []
  const byId = new Map(definition.calls.map(call => [call.id, call]))
  const chips = step.calls
    .map(id => byId.get(id))
    .filter((call): call is SceneCall => !!call && (call.kind ?? 'call') === 'call')
    .map(call => callLabel(call, nodes))
  return [...new Set(chips)]
}
