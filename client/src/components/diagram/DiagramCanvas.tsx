import type { EdgeKind, NodeKind } from '../../types/pattern'
import {
  BOX_PAD_X, FONT, METHOD_H, METHODS_PAD_TOP,
  hasStereotype, stereotypeText,
  type DiagramLayout, type PlacedEdge, type PlacedNode,
} from './layout'

const COLORS: Record<NodeKind, { fill: string; stroke: string; header: string; headerText: string; text: string }> = {
  class:     { fill: '#1e293b', stroke: '#3b82f6', header: '#1d4ed8', headerText: '#eff6ff', text: '#94a3b8' },
  abstract:  { fill: '#1e293b', stroke: '#a855f7', header: '#7e22ce', headerText: '#faf5ff', text: '#94a3b8' },
  interface: { fill: '#1e2a1e', stroke: '#22c55e', header: '#15803d', headerText: '#f0fdf4', text: '#86efac' },
}

type MarkerName = 'tri-open' | 'diamond-filled' | 'diamond-open' | 'arrow'

const ARROW: Record<EdgeKind, { dash: string; end: MarkerName }> = {
  inherits:   { dash: '',    end: 'tri-open' },
  implements: { dash: '6,3', end: 'tri-open' },
  composes:   { dash: '',    end: 'diamond-filled' },
  aggregates: { dash: '',    end: 'diamond-open' },
  associates: { dash: '',    end: 'arrow' },
  depends:    { dash: '6,3', end: 'arrow' },
}

const EDGE_COLOR = '#64748b'
const EDGE_LABEL_COLOR = '#94a3b8'
const LABEL_BG = '#0f172a'
const RADIUS = 6

const markerId = (prefix: string, name: MarkerName) => `${prefix}-${name}`

/** UML arrowheads. Ids are prefixed so several diagrams can share a page. */
export function Markers({ prefix }: { prefix: string }) {
  return (
    <defs>
      {/* Open triangle (inherit/implement) */}
      <marker id={markerId(prefix, 'tri-open')} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
        <path d="M0,0 L9,4 L0,8 Z" fill={LABEL_BG} stroke={EDGE_COLOR} strokeWidth="1.2" />
      </marker>
      {/* Filled diamond (compose); tip touches the box border */}
      <marker id={markerId(prefix, 'diamond-filled')} markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
        <path d="M0,4 L5,0 L10,4 L5,8 Z" fill={EDGE_COLOR} />
      </marker>
      {/* Open diamond (aggregate) */}
      <marker id={markerId(prefix, 'diamond-open')} markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
        <path d="M0,4 L5,0 L10,4 L5,8 Z" fill={LABEL_BG} stroke={EDGE_COLOR} strokeWidth="1" />
      </marker>
      {/* Plain arrow */}
      <marker id={markerId(prefix, 'arrow')} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6" fill="none" stroke={EDGE_COLOR} strokeWidth="1.2" />
      </marker>
    </defs>
  )
}

export function NodeBox({ placed, active = false }: { placed: PlacedNode; active?: boolean }) {
  const { node, rect, metrics } = placed
  const { x, y, width: w, height: h } = rect
  const c = COLORS[node.kind]
  const cx = x + w / 2
  const stereo = hasStereotype(node)
  const methodsTop = y + metrics.headerH

  return (
    <g data-node-id={node.id} style={{ cursor: active ? 'grabbing' : 'move', touchAction: 'none' }}>
      <rect x={x + 3} y={y + 3} width={w} height={h} rx={RADIUS} fill="rgba(0,0,0,0.4)" />
      <rect
        x={x} y={y} width={w} height={h} rx={RADIUS}
        fill={c.fill} stroke={c.stroke} strokeWidth={active ? 2.5 : 1.5}
      />
      {/* Header: rounded top, square bottom */}
      <rect x={x} y={y} width={w} height={metrics.headerH} rx={RADIUS} fill={c.header} />
      <rect x={x} y={y + metrics.headerH - RADIUS} width={w} height={RADIUS} fill={c.header} />

      {stereo && (
        <text x={cx} y={y + 15} textAnchor="middle" fontSize={FONT.stereotype} fill={c.headerText} opacity={0.8} fontStyle="italic">
          {stereotypeText(node)}
        </text>
      )}
      <text
        x={cx}
        y={y + (stereo ? 32 : 21)}
        textAnchor="middle"
        fontSize={FONT.name}
        fontWeight="bold"
        fill={c.headerText}
        fontStyle={node.kind === 'abstract' ? 'italic' : 'normal'}
      >
        {node.label}
      </text>

      {node.methods?.map((m, i) => (
        <text
          key={i}
          x={x + BOX_PAD_X}
          y={methodsTop + METHODS_PAD_TOP + i * METHOD_H + 12}
          fontSize={FONT.method}
          fill={c.text}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        >
          {m}
        </text>
      ))}

      {node.role && (
        <>
          {metrics.methodsH > 0 && (
            <line
              x1={x} y1={y + h - metrics.footerH} x2={x + w} y2={y + h - metrics.footerH}
              stroke={c.stroke} strokeWidth={0.7} opacity={0.35}
            />
          )}
          <text
            x={x + w - BOX_PAD_X}
            y={y + h - 6}
            textAnchor="end"
            fontSize={FONT.role}
            fill={c.stroke}
            fontStyle="italic"
          >
            {node.role}
          </text>
        </>
      )}
    </g>
  )
}

export function EdgeLine({ placed, markerPrefix }: { placed: PlacedEdge; markerPrefix: string }) {
  const { edge, x1, y1, x2, y2, label } = placed
  const a = ARROW[edge.kind]
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={EDGE_COLOR}
        strokeWidth={1.5}
        strokeDasharray={a.dash || undefined}
        markerEnd={`url(#${markerId(markerPrefix, a.end)})`}
      />
      {label && edge.label && (
        <>
          <rect x={label.x} y={label.y} width={label.width} height={label.height} rx={3} fill={LABEL_BG} opacity={0.92} />
          <text x={label.x + label.width / 2} y={label.y + label.height / 2 + 3.5} textAnchor="middle" fontSize={FONT.edgeLabel} fill={EDGE_LABEL_COLOR}>
            {edge.label}
          </text>
        </>
      )}
    </g>
  )
}

/** Everything drawn in diagram coordinates. The node being dragged is drawn last (on top). */
export function DiagramContent({ layout, markerPrefix, activeNodeId }: {
  layout: DiagramLayout
  markerPrefix: string
  activeNodeId?: string | null
}) {
  const nodes = activeNodeId
    ? [...layout.nodes.filter(n => n.node.id !== activeNodeId), ...layout.nodes.filter(n => n.node.id === activeNodeId)]
    : layout.nodes
  return (
    <>
      {layout.edges.map((e, i) => <EdgeLine key={i} placed={e} markerPrefix={markerPrefix} />)}
      {nodes.map(n => <NodeBox key={n.node.id} placed={n} active={n.node.id === activeNodeId} />)}
    </>
  )
}
