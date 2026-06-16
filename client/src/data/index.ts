import { creationalPatterns } from './creational'
import { structuralPatterns } from './structural'
import { behavioralPatterns } from './behavioral'
import { patternDiagrams } from './diagrams'
import type { Pattern, Category, Diagram } from '../types/pattern'

const FALLBACK_DIAGRAM: Diagram = {
  nodes: [
    { id: 'a', label: 'AbstractClass', kind: 'abstract', x: 1, y: 0, methods: ['+ operation()'] },
    { id: 'b', label: 'ConcreteClass', kind: 'class', x: 0, y: 2, methods: ['+ operation()'] },
    { id: 'c', label: 'ConcreteClass2', kind: 'class', x: 2, y: 2, methods: ['+ operation()'] },
  ],
  edges: [
    { from: 'b', to: 'a', kind: 'inherits' },
    { from: 'c', to: 'a', kind: 'inherits' },
  ],
}

function withDiagram(p: Omit<Pattern, 'diagram'> & { diagram?: Diagram }): Pattern {
  return { ...p, diagram: p.diagram ?? patternDiagrams[p.slug] ?? FALLBACK_DIAGRAM }
}

const rawPatterns = [
  ...creationalPatterns,
  ...structuralPatterns,
  ...behavioralPatterns,
] as (Omit<Pattern, 'diagram'> & { diagram?: Diagram })[]

export const allPatterns: Pattern[] = rawPatterns.map(withDiagram)

export const patternsByCategory: Record<Category, Pattern[]> = {
  creational: allPatterns.filter(p => p.category === 'creational'),
  structural: allPatterns.filter(p => p.category === 'structural'),
  behavioral: allPatterns.filter(p => p.category === 'behavioral'),
}

export function getPattern(slug: string): Pattern | undefined {
  return allPatterns.find(p => p.slug === slug)
}

export { creationalPatterns, structuralPatterns, behavioralPatterns }
