import type { Diagram, DiagramEdge, DiagramNode } from '../../types/pattern'
import { monoWidth, sansWidth } from '../../scenes/kit/metrics'

// ── Typography (shared with DiagramCanvas so measuring matches drawing) ──
export const FONT = {
  name: 13,
  method: 11,
  stereotype: 10,
  role: 10,
  edgeLabel: 10.5,
} as const

/** Bold/italic names run wider than the regular sans estimate. */
const BOLD_FACTOR = 1.1

// ── Box metrics ───────────────────────────────────────────────
export const BOX_PAD_X = 12
const MIN_BOX_W = 120
const HEADER_H_CLASS = 32       // name only
const HEADER_H_STEREO = 42      // «stereotype» + name
export const METHOD_H = 17
export const METHODS_PAD_TOP = 8
const METHODS_PAD_BOTTOM = 6
const FOOTER_H = 20             // role label row
const EMPTY_BODY_H = 10         // no methods and no role

// ── Grid ──────────────────────────────────────────────────────
const MIN_COL_PITCH = 180
const MIN_ROW_PITCH = 130
const H_GAP = 36                // min horizontal space between boxes
const V_GAP = 28                // min vertical space between boxes
const PARALLEL_EDGE_GAP = 14    // spacing between edges joining the same pair

const EDGE_LABEL_PAD_X = 5
const EDGE_LABEL_H = 16

export interface Rect { x: number; y: number; width: number; height: number }
export interface Point { x: number; y: number }
export type NodeOffsets = Readonly<Record<string, { dx: number; dy: number }>>

export interface NodeMetrics {
  width: number
  height: number
  headerH: number
  /** Height of the methods section (0 when there are none). */
  methodsH: number
  /** Height of the role footer (0 when there is no role). */
  footerH: number
}

export interface PlacedNode { node: DiagramNode; rect: Rect; metrics: NodeMetrics }

export interface PlacedEdge {
  edge: DiagramEdge
  x1: number; y1: number; x2: number; y2: number
  /** Background rect for the edge label, centred on the line. */
  label?: Rect
}

export interface DiagramLayout {
  nodes: PlacedNode[]
  edges: PlacedEdge[]
  rects: Map<string, Rect>
  bounds: Rect
  pitch: { col: number; row: number }
}

export const stereotypeText = (node: DiagramNode) => `«${node.kind}»`
export const hasStereotype = (node: DiagramNode) => node.kind !== 'class'

/** Estimated width of each text line in a box, in the box's own font sizes. */
export function textWidths(node: DiagramNode): number[] {
  const widths = [sansWidth(node.label, FONT.name) * BOLD_FACTOR]
  if (hasStereotype(node)) widths.push(sansWidth(stereotypeText(node), FONT.stereotype))
  if (node.role) widths.push(sansWidth(node.role, FONT.role))
  for (const m of node.methods ?? []) widths.push(monoWidth(m, FONT.method))
  return widths
}

export function measureNode(node: DiagramNode): NodeMetrics {
  const width = Math.ceil(Math.max(MIN_BOX_W, ...textWidths(node).map(w => w + BOX_PAD_X * 2)))
  const headerH = hasStereotype(node) ? HEADER_H_STEREO : HEADER_H_CLASS
  const count = node.methods?.length ?? 0
  const methodsH = count > 0 ? METHODS_PAD_TOP + count * METHOD_H + METHODS_PAD_BOTTOM : 0
  const footerH = node.role ? FOOTER_H : 0
  const body = methodsH + footerH
  return { width, height: headerH + (body > 0 ? body : EMPTY_BODY_H), headerH, methodsH, footerH }
}

/**
 * Grid pitch large enough that no two boxes overlap. Each overlapping pair
 * grows whichever axis needs the smaller relative increase, so wide boxes
 * spread the columns and tall boxes spread the rows.
 */
function solvePitch(nodes: DiagramNode[], sizes: NodeMetrics[]): { col: number; row: number } {
  let col = MIN_COL_PITCH
  let row = MIN_ROW_PITCH
  for (let iter = 0; iter < 100; iter++) {
    let changed = false
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [a, b] = [nodes[i], nodes[j]]
        const dx = Math.abs(a.x - b.x)
        const dy = Math.abs(a.y - b.y)
        if (dx === 0 && dy === 0) continue
        const halfWidths = (sizes[i].width + sizes[j].width) / 2 + H_GAP
        const upperH = (a.y <= b.y ? sizes[i] : sizes[j]).height + V_GAP
        const overlapX = dx * col < halfWidths - 1e-6
        const overlapY = dy * row < upperH - 1e-6
        if (!overlapX || !overlapY) continue
        const needCol = dx > 0 ? halfWidths / dx : Infinity
        const needRow = dy > 0 ? upperH / dy : Infinity
        if (needCol / col <= needRow / row) col = needCol
        else row = needRow
        changed = true
      }
    }
    if (!changed) break
  }
  return { col: Math.ceil(col), row: Math.ceil(row) }
}

const center = (r: Rect): Point => ({ x: r.x + r.width / 2, y: r.y + r.height / 2 })

/** Where a ray from `p` (inside `r`) in direction `d` leaves the rect. */
function exitPoint(r: Rect, p: Point, d: Point): Point {
  const tx = d.x > 0 ? (r.x + r.width - p.x) / d.x : d.x < 0 ? (r.x - p.x) / d.x : Infinity
  const ty = d.y > 0 ? (r.y + r.height - p.y) / d.y : d.y < 0 ? (r.y - p.y) / d.y : Infinity
  const t = Math.max(0, Math.min(tx, ty))
  return { x: p.x + d.x * t, y: p.y + d.y * t }
}

/**
 * Endpoints of a straight edge between two boxes, each clipped to its own
 * box border. `offset` shifts the edge sideways so parallel edges between
 * the same pair don't draw on top of each other.
 */
export function edgePoints(from: Rect, to: Rect, offset = 0): { x1: number; y1: number; x2: number; y2: number } {
  const a = center(from)
  const b = center(to)
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  if (len < 1e-9) return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
  const d = { x: dx / len, y: dy / len }
  // Keep the shifted start points inside both boxes.
  const limit = Math.min(from.width, from.height, to.width, to.height) / 2 - 1
  const o = Math.max(-limit, Math.min(limit, offset))
  const n = { x: -d.y * o, y: d.x * o }
  const p1 = exitPoint(from, { x: a.x + n.x, y: a.y + n.y }, d)
  const p2 = exitPoint(to, { x: b.x + n.x, y: b.y + n.y }, { x: -d.x, y: -d.y })
  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
}

export function edgeLabelRect(label: string, at: Point): Rect {
  const width = Math.ceil(sansWidth(label, FONT.edgeLabel) + EDGE_LABEL_PAD_X * 2)
  return { x: at.x - width / 2, y: at.y - EDGE_LABEL_H / 2, width, height: EDGE_LABEL_H }
}

function union(rects: Rect[]): Rect {
  if (rects.length === 0) return { x: 0, y: 0, width: 0, height: 0 }
  const x0 = Math.min(...rects.map(r => r.x))
  const y0 = Math.min(...rects.map(r => r.y))
  const x1 = Math.max(...rects.map(r => r.x + r.width))
  const y1 = Math.max(...rects.map(r => r.y + r.height))
  return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }
}

/** Sideways offset for each edge, spreading edges that join the same pair. */
function parallelOffsets(edges: DiagramEdge[]): number[] {
  const groups = new Map<string, number[]>()
  edges.forEach((e, i) => {
    const key = [e.from, e.to].sort().join('\u0000')
    groups.set(key, [...(groups.get(key) ?? []), i])
  })
  const offsets = edges.map(() => 0)
  for (const members of groups.values()) {
    members.forEach((edgeIndex, k) => {
      const e = edges[edgeIndex]
      // Offsets are perpendicular to the edge direction, which flips with it.
      const sign = e.from <= e.to ? 1 : -1
      offsets[edgeIndex] = sign * (k - (members.length - 1) / 2) * PARALLEL_EDGE_GAP
    })
  }
  return offsets
}

/**
 * Pixel layout of a diagram. Each box is centred on its grid column and its
 * top sits on its grid row; `offsets` move individual boxes (from dragging).
 */
export function layoutDiagram(diagram: Diagram, offsets: NodeOffsets = {}): DiagramLayout {
  const sizes = diagram.nodes.map(measureNode)
  const pitch = solvePitch(diagram.nodes, sizes)

  const nodes: PlacedNode[] = diagram.nodes.map((node, i) => {
    const m = sizes[i]
    const off = offsets[node.id] ?? { dx: 0, dy: 0 }
    return {
      node,
      metrics: m,
      rect: { x: node.x * pitch.col - m.width / 2 + off.dx, y: node.y * pitch.row + off.dy, width: m.width, height: m.height },
    }
  })
  const rects = new Map(nodes.map(n => [n.node.id, n.rect]))

  const offsetsByEdge = parallelOffsets(diagram.edges)
  const edges: PlacedEdge[] = []
  diagram.edges.forEach((edge, i) => {
    const from = rects.get(edge.from)
    const to = rects.get(edge.to)
    if (!from || !to) return
    const pts = edgePoints(from, to, offsetsByEdge[i])
    const mid = { x: (pts.x1 + pts.x2) / 2, y: (pts.y1 + pts.y2) / 2 }
    edges.push({ edge, ...pts, label: edge.label ? edgeLabelRect(edge.label, mid) : undefined })
  })

  const bounds = union([
    ...nodes.map(n => n.rect),
    ...edges.flatMap(e => (e.label ? [e.label] : [])),
  ])
  return { nodes, edges, rects, bounds, pitch }
}
