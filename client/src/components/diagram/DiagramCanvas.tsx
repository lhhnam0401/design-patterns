import type { EdgeKind, NodeKind } from '../../types/pattern'
import {
  BOX_PAD_X, FONT, METHOD_H, METHODS_PAD_TOP,
  hasStereotype, stereotypeText,
  type DiagramLayout, type PlacedEdge, type PlacedNode,
} from './layout'

const COLORS: Record<NodeKind, { fill: string; stroke: string; header: string; headerText: string; text: string }> = {
  class: { fill: 'var(--diagram-raised)', stroke: 'var(--diagram-class)', header: 'var(--diagram-class)', headerText: 'var(--accent-ink)', text: 'var(--diagram-label)' },
  abstract: { fill: 'var(--diagram-raised)', stroke: 'var(--diagram-abstract)', header: 'var(--diagram-abstract)', headerText: 'var(--support-ink)', text: 'var(--diagram-label)' },
  interface: { fill: 'var(--diagram-raised)', stroke: 'var(--diagram-interface)', header: 'var(--diagram-interface)', headerText: 'var(--support-ink)', text: 'var(--diagram-label)' },
}

type MarkerName = 'tri-open' | 'diamond-filled' | 'diamond-open' | 'arrow'

const ARROW: Record<EdgeKind, { dash: string; end: MarkerName }> = {
  inherits: { dash: '', end: 'tri-open' },
  implements: { dash: '6,3', end: 'tri-open' },
  composes: { dash: '', end: 'diamond-filled' },
  aggregates: { dash: '', end: 'diamond-open' },
  associates: { dash: '', end: 'arrow' },
  depends: { dash: '6,3', end: 'arrow' },
}

const EDGE_COLOR = 'var(--diagram-line)'
const EDGE_LABEL_COLOR = 'var(--diagram-label)'
const LABEL_BG = 'var(--diagram-surface)'
const RADIUS = 4

const markerId = (prefix: string, name: MarkerName) => `${prefix}-${name}`

export function Markers({ prefix }: { prefix: string }) {
  return (
    <defs>
      <marker id={markerId(prefix, 'tri-open')} markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
        <path d="M0,0 L9,4 L0,8 Z" fill={LABEL_BG} stroke={EDGE_COLOR} strokeWidth="1.2" />
      </marker>
      <marker id={markerId(prefix, 'diamond-filled')} markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
        <path d="M0,4 L5,0 L10,4 L5,8 Z" fill={EDGE_COLOR} />
      </marker>
      <marker id={markerId(prefix, 'diamond-open')} markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
        <path d="M0,4 L5,0 L10,4 L5,8 Z" fill={LABEL_BG} stroke={EDGE_COLOR} strokeWidth="1" />
      </marker>
      <marker id={markerId(prefix, 'arrow')} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
        <path d="M0,0 L7,3 L0,6" fill="none" stroke={EDGE_COLOR} strokeWidth="1.2" />
      </marker>
    </defs>
  )
}

export function NodeBox({ placed, active = false }: { placed: PlacedNode; active?: boolean }) {
  const { node, rect, metrics } = placed
  const { x, y, width: w, height: h } = rect
  const color = COLORS[node.kind]
  const centerX = x + w / 2
  const stereo = hasStereotype(node)
  const methodsTop = y + metrics.headerH

  return (
    <g data-node-id={node.id} style={{ cursor: active ? 'grabbing' : 'move', touchAction: 'none' }}>
      <rect
        x={x} y={y} width={w} height={h} rx={RADIUS}
        fill={color.fill} stroke={color.stroke} strokeWidth={active ? 2.5 : 1.5}
      />
      <rect x={x} y={y} width={w} height={metrics.headerH} rx={RADIUS} fill={color.header} />
      <rect x={x} y={y + metrics.headerH - RADIUS} width={w} height={RADIUS} fill={color.header} />

      {stereo && (
        <text x={centerX} y={y + 15} textAnchor="middle" fontSize={FONT.stereotype} fill={color.headerText} opacity={0.84} fontStyle="italic">
          {stereotypeText(node)}
        </text>
      )}
      <text
        x={centerX}
        y={y + (stereo ? 32 : 21)}
        textAnchor="middle"
        fontSize={FONT.name}
        fontWeight="bold"
        fill={color.headerText}
        fontStyle={node.kind === 'abstract' ? 'italic' : 'normal'}
      >
        {node.label}
      </text>

      {node.methods?.map((method, index) => (
        <text
          key={index}
          x={x + BOX_PAD_X}
          y={methodsTop + METHODS_PAD_TOP + index * METHOD_H + 12}
          fontSize={FONT.method}
          fill={color.text}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        >
          {method}
        </text>
      ))}

      {node.role && (
        <>
          {metrics.methodsH > 0 && (
            <line
              x1={x} y1={y + h - metrics.footerH} x2={x + w} y2={y + h - metrics.footerH}
              stroke={color.stroke} strokeWidth={0.7} opacity={0.55}
            />
          )}
          <text
            x={x + w - BOX_PAD_X}
            y={y + h - 6}
            textAnchor="end"
            fontSize={FONT.role}
            fill={color.stroke}
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
  const arrow = ARROW[edge.kind]
  return (
    <g>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={EDGE_COLOR}
        strokeWidth={1.5}
        strokeDasharray={arrow.dash || undefined}
        markerEnd={`url(#${markerId(markerPrefix, arrow.end)})`}
      />
      {label && edge.label && (
        <>
          <rect x={label.x} y={label.y} width={label.width} height={label.height} rx={2} fill={LABEL_BG} opacity={0.96} />
          <text x={label.x + label.width / 2} y={label.y + label.height / 2 + 3.5} textAnchor="middle" fontSize={FONT.edgeLabel} fill={EDGE_LABEL_COLOR}>
            {edge.label}
          </text>
        </>
      )}
    </g>
  )
}

export function DiagramContent({ layout, markerPrefix, activeNodeId }: {
  layout: DiagramLayout
  markerPrefix: string
  activeNodeId?: string | null
}) {
  const nodes = activeNodeId
    ? [...layout.nodes.filter(node => node.node.id !== activeNodeId), ...layout.nodes.filter(node => node.node.id === activeNodeId)]
    : layout.nodes
  return (
    <>
      {layout.edges.map((edge, index) => <EdgeLine key={index} placed={edge} markerPrefix={markerPrefix} />)}
      {nodes.map(node => <NodeBox key={node.node.id} placed={node} active={node.node.id === activeNodeId} />)}
    </>
  )
}
