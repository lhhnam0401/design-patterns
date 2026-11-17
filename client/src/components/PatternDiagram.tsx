import type { Diagram, DiagramNode, DiagramEdge } from '../types/pattern'

// ── Layout constants ──────────────────────────────────────────
const COL_W = 180   // grid cell width
const ROW_H = 130   // grid cell height
const BOX_W = 160   // box width
const BOX_MIN_H = 64
const METHOD_H = 18
const PAD_X = 20    // canvas padding
const PAD_Y = 20

const COLORS = {
  class:     { fill: '#1e293b', stroke: '#3b82f6', header: '#1d4ed8', headerText: '#eff6ff', text: '#94a3b8' },
  abstract:  { fill: '#1e293b', stroke: '#a855f7', header: '#7e22ce', headerText: '#faf5ff', text: '#94a3b8' },
  interface: { fill: '#1e2a1e', stroke: '#22c55e', header: '#15803d', headerText: '#f0fdf4', text: '#86efac' },
}

const ARROW = {
  inherits:   { dash: '',       end: 'tri-open' },
  implements: { dash: '6,3',    end: 'tri-open' },
  composes:   { dash: '',       end: 'diamond-filled' },
  aggregates: { dash: '',       end: 'diamond-open' },
  associates: { dash: '',       end: 'arrow' },
  depends:    { dash: '6,3',    end: 'arrow' },
}

function boxH(node: DiagramNode) {
  return BOX_MIN_H + (node.methods?.length ?? 0) * METHOD_H
}

function nodeCenter(node: DiagramNode): [number, number] {
  return [
    PAD_X + node.x * COL_W + BOX_W / 2,
    PAD_Y + node.y * ROW_H + boxH(node) / 2,
  ]
}

function edgePoints(
  from: DiagramNode,
  to: DiagramNode
): { x1: number; y1: number; x2: number; y2: number } {
  const [fx, fy] = nodeCenter(from)
  const [tx, ty] = nodeCenter(to)

  // Exit/enter from box edges
  const dx = tx - fx
  const dy = ty - fy
  const hw = BOX_W / 2
  const hh = boxH(from) / 2
  const thh = boxH(to) / 2

  let x1: number, y1: number, x2: number, y2: number

  // Determine from-exit edge
  if (Math.abs(dx) / hw > Math.abs(dy) / hh) {
    x1 = fx + Math.sign(dx) * hw
    y1 = fy + dy * (hw / Math.abs(dx))
  } else {
    x1 = fx + dx * (hh / Math.abs(dy))
    y1 = fy + Math.sign(dy) * hh
  }

  // Determine to-enter edge
  if (Math.abs(dx) / (BOX_W / 2) > Math.abs(dy) / thh) {
    x2 = tx - Math.sign(dx) * hw
    y2 = ty - dy * (hw / Math.abs(dx))
  } else {
    x2 = tx - dx * (thh / Math.abs(dy))
    y2 = ty - Math.sign(dy) * thh
  }

  return { x1, y1, x2, y2 }
}

// ── SVG Markers (arrowheads) ──────────────────────────────────
function Markers() {
  return (
    <defs>
      {/* Open triangle (inherit/implement) */}
      <marker id="tri-open" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
        <path d="M0,0 L9,4 L0,8 Z" fill="none" stroke="#64748b" strokeWidth="1.2" />
      </marker>
      {/* Filled diamond (compose) */}
      <marker id="diamond-filled" markerWidth="12" markerHeight="8" refX="1" refY="4" orient="auto">
        <path d="M0,4 L5,0 L10,4 L5,8 Z" fill="#64748b" />
      </marker>
      {/* Open diamond (aggregate) */}
      <marker id="diamond-open" markerWidth="12" markerHeight="8" refX="1" refY="4" orient="auto">
        <path d="M0,4 L5,0 L10,4 L5,8 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
      </marker>
      {/* Plain arrow */}
      <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6" fill="none" stroke="#64748b" strokeWidth="1.2" />
      </marker>
    </defs>
  )
}

// ── Node box ──────────────────────────────────────────────────
function NodeBox({ node }: { node: DiagramNode }) {
  const x = PAD_X + node.x * COL_W
  const y = PAD_Y + node.y * ROW_H
  const h = boxH(node)
  const c = COLORS[node.kind]
  const HEADER_H = 34

  return (
    <g>
      {/* Shadow */}
      <rect x={x + 3} y={y + 3} width={BOX_W} height={h} rx={6} fill="rgba(0,0,0,0.4)" />
      {/* Body */}
      <rect x={x} y={y} width={BOX_W} height={h} rx={6} fill={c.fill} stroke={c.stroke} strokeWidth={1.5} />
      {/* Header bg */}
      <rect x={x} y={y} width={BOX_W} height={HEADER_H} rx={6} fill={c.header} />
      <rect x={x} y={y + HEADER_H - 6} width={BOX_W} height={6} fill={c.header} />

      {/* Stereotype */}
      {node.kind !== 'class' && (
        <text
          x={x + BOX_W / 2}
          y={y + 12}
          textAnchor="middle"
          fontSize={9}
          fill={c.headerText}
          opacity={0.8}
          fontStyle="italic"
        >
          «{node.kind}»
        </text>
      )}

      {/* Class name */}
      <text
        x={x + BOX_W / 2}
        y={y + (node.kind !== 'class' ? 26 : 22)}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill={c.headerText}
        fontStyle={node.kind === 'abstract' ? 'italic' : 'normal'}
      >
        {node.label}
      </text>

      {/* Role label */}
      {node.role && (
        <text
          x={x + BOX_W - 6}
          y={y + h - 6}
          textAnchor="end"
          fontSize={8}
          fill={c.stroke}
          opacity={0.7}
          fontStyle="italic"
        >
          {node.role}
        </text>
      )}

      {/* Methods */}
      {node.kind !== 'class' && node.methods && node.methods.length > 0 && (
        <line x1={x} y1={y + HEADER_H} x2={x + BOX_W} y2={y + HEADER_H} stroke={c.stroke} strokeWidth={0.7} opacity={0.5} />
      )}
      {node.methods?.map((m, i) => (
        <text
          key={i}
          x={x + 10}
          y={y + HEADER_H + 4 + (i + 1) * METHOD_H - 4}
          fontSize={9.5}
          fill={c.text}
          fontFamily="ui-monospace, monospace"
        >
          {m}
        </text>
      ))}
    </g>
  )
}

// ── Edge line ─────────────────────────────────────────────────
function EdgeLine({ edge, nodeMap }: { edge: DiagramEdge; nodeMap: Map<string, DiagramNode> }) {
  const from = nodeMap.get(edge.from)
  const to = nodeMap.get(edge.to)
  if (!from || !to) return null

  const { x1, y1, x2, y2 } = edgePoints(from, to)
  const a = ARROW[edge.kind]
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2

  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#475569"
        strokeWidth={1.5}
        strokeDasharray={a.dash || undefined}
        markerEnd={`url(#${a.end})`}
      />
      {edge.label && (
        <text x={mx} y={my - 5} textAnchor="middle" fontSize={9} fill="#64748b">
          {edge.label}
        </text>
      )}
    </g>
  )
}

// ── Main component ────────────────────────────────────────────
interface Props {
  diagram: Diagram
}

export default function PatternDiagram({ diagram }: Props) {
  const nodeMap = new Map(diagram.nodes.map(n => [n.id, n]))

  const maxX = Math.max(...diagram.nodes.map(n => n.x)) + 1
  const maxY = Math.max(...diagram.nodes.map(n => n.y)) + 1
  const maxH = Math.max(...diagram.nodes.map(n => boxH(n)))

  const svgW = PAD_X * 2 + maxX * COL_W
  const svgH = PAD_Y * 2 + maxY * ROW_H + maxH

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50 bg-slate-950">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        style={{ display: 'block', maxHeight: 320 }}
        aria-label="Pattern UML diagram"
      >
        <Markers />
        {/* Grid hint lines (subtle) */}
        {diagram.edges.map((e, i) => (
          <EdgeLine key={i} edge={e} nodeMap={nodeMap} />
        ))}
        {diagram.nodes.map(n => (
          <NodeBox key={n.id} node={n} />
        ))}
      </svg>
    </div>
  )
}
