import { describe, expect, it } from 'vitest'
import { FALLBACK_DIAGRAM, allPatterns } from '../data'
import { BOX_PAD_X, edgePoints, layoutDiagram, textWidths, type Rect } from '../components/diagram/layout'
import type { Diagram } from '../types/pattern'

const EPS = 1e-6

const intersects = (a: Rect, b: Rect) =>
  a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height

const contains = (outer: Rect, inner: Rect) =>
  inner.x >= outer.x - EPS && inner.y >= outer.y - EPS &&
  inner.x + inner.width <= outer.x + outer.width + EPS &&
  inner.y + inner.height <= outer.y + outer.height + EPS

/** True when (x, y) lies on the border of r (inside it and touching one side). */
function onBorder(r: Rect, x: number, y: number): boolean {
  const inside = x >= r.x - EPS && x <= r.x + r.width + EPS && y >= r.y - EPS && y <= r.y + r.height + EPS
  const side = Math.min(Math.abs(x - r.x), Math.abs(x - (r.x + r.width)), Math.abs(y - r.y), Math.abs(y - (r.y + r.height)))
  return inside && side < 1e-3
}

const cases: [string, Diagram][] = [
  ...allPatterns.map(p => [p.slug, p.diagram] as [string, Diagram]),
  ['fallback', FALLBACK_DIAGRAM],
]

describe.each(cases)('%s diagram layout', (_slug, diagram) => {
  const layout = layoutDiagram(diagram)

  it('sizes every box to fit its text', () => {
    const tooWide = layout.nodes.flatMap(({ node, rect }) =>
      textWidths(node).filter(w => w + BOX_PAD_X * 2 > rect.width + EPS).map(w => `${node.id}: ${w.toFixed(1)}px > ${rect.width}px`))
    expect(tooWide).toEqual([])
  })

  it('keeps boxes from overlapping', () => {
    const overlaps: string[] = []
    for (let i = 0; i < layout.nodes.length; i++) {
      for (let j = i + 1; j < layout.nodes.length; j++) {
        const [a, b] = [layout.nodes[i], layout.nodes[j]]
        if (intersects(a.rect, b.rect)) overlaps.push(`${a.node.id} / ${b.node.id}`)
      }
    }
    expect(overlaps).toEqual([])
  })

  it('attaches every edge to the borders of its own boxes', () => {
    const off = layout.edges.flatMap(({ edge, x1, y1, x2, y2 }) => {
      const from = layout.rects.get(edge.from)!
      const to = layout.rects.get(edge.to)!
      const bad: string[] = []
      if (!onBorder(from, x1, y1)) bad.push(`${edge.from}→${edge.to} start`)
      if (!onBorder(to, x2, y2)) bad.push(`${edge.from}→${edge.to} end`)
      return bad
    })
    expect(off).toEqual([])
    expect(layout.edges).toHaveLength(diagram.edges.length)
  })

  it('has bounds that contain every box and edge label', () => {
    const outside = [
      ...layout.nodes.filter(n => !contains(layout.bounds, n.rect)).map(n => n.node.id),
      ...layout.edges.filter(e => e.label && !contains(layout.bounds, e.label)).map(e => `label ${e.edge.label}`),
    ]
    expect(outside).toEqual([])
  })

  it('produces only finite numbers', () => {
    const values = [
      ...layout.nodes.flatMap(n => [n.rect.x, n.rect.y, n.rect.width, n.rect.height]),
      ...layout.edges.flatMap(e => [e.x1, e.y1, e.x2, e.y2]),
      layout.bounds.x, layout.bounds.y, layout.bounds.width, layout.bounds.height,
    ]
    expect(values.every(Number.isFinite)).toBe(true)
  })
})

describe('layoutDiagram with drag offsets', () => {
  const diagram = allPatterns.find(p => p.slug === 'singleton')!.diagram
  const base = layoutDiagram(diagram)

  it('moves only the dragged box, and its edges follow', () => {
    const moved = layoutDiagram(diagram, { c1: { dx: 50, dy: -30 } })
    const before = base.rects.get('c1')!
    const after = moved.rects.get('c1')!
    expect(after).toEqual({ ...before, x: before.x + 50, y: before.y - 30 })
    expect(moved.rects.get('c2')).toEqual(base.rects.get('c2'))

    const i = diagram.edges.findIndex(e => e.from === 'c1')
    const edge = moved.edges[i]
    expect([edge.x1, edge.y1]).not.toEqual([base.edges[i].x1, base.edges[i].y1])
    expect(onBorder(after, edge.x1, edge.y1)).toBe(true)
    expect(onBorder(moved.rects.get('sing')!, edge.x2, edge.y2)).toBe(true)
  })

  it('keeps the grid pitch fixed while dragging', () => {
    expect(layoutDiagram(diagram, { c1: { dx: 400, dy: 400 } }).pitch).toEqual(base.pitch)
  })
})

describe('edgePoints', () => {
  it('uses each box’s own size for its end', () => {
    const wide: Rect = { x: 0, y: 0, width: 300, height: 60 }
    const narrow: Rect = { x: 400, y: 0, width: 100, height: 60 }
    const p = edgePoints(wide, narrow)
    expect(p).toEqual({ x1: 300, y1: 30, x2: 400, y2: 30 })
  })

  it('does not produce NaN when the boxes share a centre', () => {
    const r: Rect = { x: 0, y: 0, width: 100, height: 50 }
    expect(Object.values(edgePoints(r, r)).every(Number.isFinite)).toBe(true)
  })

  it('separates parallel edges between the same pair', () => {
    const composite = allPatterns.find(p => p.slug === 'composite')!.diagram
    const layout = layoutDiagram(composite)
    const pair = layout.edges.filter(e => e.edge.from === 'composite' && e.edge.to === 'comp')
    expect(pair).toHaveLength(2)
    expect([pair[0].x1, pair[0].y1]).not.toEqual([pair[1].x1, pair[1].y1])
  })
})
