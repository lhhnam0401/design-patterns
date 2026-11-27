export type Category = 'creational' | 'structural' | 'behavioral'

export interface LocalizedText {
  en: string
  vi: string
}

export type ProseBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
export type Prose = string | ProseBlock[]
export interface LocalizedProse {
  en: Prose
  vi: Prose
}
export interface CodeExample {
  language: string
  code: string
  label?: string
}

// ── UML Diagram ───────────────────────────────────────────────
export type NodeKind = 'class' | 'interface' | 'abstract'
export type EdgeKind =
  | 'inherits'       // open triangle arrowhead
  | 'implements'     // dashed + open triangle
  | 'composes'       // filled diamond
  | 'aggregates'     // open diamond
  | 'associates'     // plain arrow
  | 'depends'        // dashed arrow

export interface DiagramNode {
  id: string
  label: string          // class/interface name
  kind: NodeKind
  x: number              // grid column (0-based)
  y: number              // grid row    (0-based)
  methods?: string[]     // shown inside box
  role?: string          // e.g. "Creator", "Product" — shown as small label
}

export interface DiagramEdge {
  from: string           // node id
  to: string             // node id
  kind: EdgeKind
  label?: string         // optional label on edge
}

export interface Diagram {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
}

// ── Pattern ───────────────────────────────────────────────────
export interface Pattern {
  id: string
  name: LocalizedText
  category: Category
  slug: string
  complexity: 1 | 2 | 3
  popularity: 1 | 2 | 3
  also_known_as?: LocalizedText[]
  intent: LocalizedProse
  problem: LocalizedProse
  solution: LocalizedProse
  applicability: LocalizedProse
  vietnamese_example: {
    title: LocalizedText
    description: LocalizedProse
  }
  diagram: Diagram
  code_examples: CodeExample[]
  structure_notes: LocalizedProse
}
