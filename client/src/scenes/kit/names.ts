import type { DiagramNode } from '../../types/pattern'
import type { Tone } from './palette'

/** Diagram labels starting with "Client" stand for client code, not a class. */
export function isClientLabel(label: string): boolean {
  return /^Client\b/.test(label)
}

export function toneOf(node: DiagramNode | undefined): Tone {
  if (!node) return 'class'
  return isClientLabel(node.label) ? 'client' : node.kind
}
