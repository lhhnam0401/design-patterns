import type { ReactNode } from 'react'
import { litProps, useBackdropLit, useNodeLit } from '../explorer/HighlightContext'
import { usePlateVariant } from './context'
import { MIN_CAPTION_SIZE, RAIL } from './layout'
import { INK, PAPER_LIGHT, TONES } from './pigments'

const SANS = '"IBM Plex Sans Variable", "Segoe UI", sans-serif'

/** One participant: everything drawn for a diagram node. A node may have several Parts. */
export function Part({ node, children }: { node: string; children: ReactNode }) {
  const state = useNodeLit(node)
  return <g data-part={node} {...litProps(state)}>{children}</g>
}

/** Scenery that sets the place but plays no part in the pattern. It fades whenever anything is lit. */
export function Backdrop({ children }: { children: ReactNode }) {
  const state = useBackdropLit()
  return <g data-backdrop="true" {...litProps(state)}>{children}</g>
}

/**
 * Localized story text inside the art. Never a class or method name. Hidden on
 * thumbnails and on plates narrower than 560px, where it would be too small to read.
 */
export function Caption({ x, y, children, size = MIN_CAPTION_SIZE, fill = INK, anchor = 'middle', weight = 600 }: {
  x: number
  y: number
  children: ReactNode
  size?: number
  fill?: string
  anchor?: 'start' | 'middle' | 'end'
  weight?: number
}) {
  const variant = usePlateVariant()
  if (variant === 'thumbnail') return null
  return (
    <text
      data-scene-caption="true"
      className="@max-[560px]:hidden"
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={SANS}
      fontSize={Math.max(size, MIN_CAPTION_SIZE)}
      fontWeight={weight}
      fill={fill}
    >
      {children}
    </text>
  )
}

/**
 * A board hanging on the rail for an interface or abstract class, with a dashed
 * bracket over exactly the objects that implement it (UML realization is dashed too).
 * `x` is the board's centre; `span` the bracket's ends; `ticks` drop a line to each implementer.
 */
export function Signboard({ x, w, y = 14, h = 50, tone, span, ticks = [], children }: {
  x: number
  w: number
  y?: number
  h?: number
  tone: 'interface' | 'abstract'
  span?: readonly [number, number]
  ticks?: number[]
  children?: ReactNode
}) {
  const color = TONES[tone]
  const left = x - w / 2
  const bottom = y + h
  const bracketY = RAIL.bottom
  return (
    <g>
      {[left + w * 0.18, left + w * 0.82].map(cx => (
        <line key={cx} x1={cx} y1={0} x2={cx} y2={y} stroke={INK} strokeWidth={2.5} />
      ))}
      {span && (
        <g fill="none" stroke={color} strokeWidth={3} strokeLinecap="round">
          <line x1={x} y1={bottom} x2={x} y2={bracketY} strokeDasharray="8 6" />
          <line x1={span[0]} y1={bracketY} x2={span[1]} y2={bracketY} strokeDasharray="8 6" />
          {(ticks.length ? ticks : [...span]).map(tx => (
            <path key={tx} d={`M${tx},${bracketY} L${tx},${bracketY + 14} M${tx - 6},${bracketY + 8} L${tx},${bracketY + 14} L${tx + 6},${bracketY + 8}`} />
          ))}
        </g>
      )}
      <rect x={left} y={y} width={w} height={h} rx={4} fill={PAPER_LIGHT} stroke={INK} strokeWidth={3} />
      <rect x={left + 1.5} y={y + 1.5} width={w - 3} height={9} rx={2.5} fill={color} />
      <line x1={left + 8} y1={y + h - 7} x2={left + w - 8} y2={y + h - 7} stroke={color} strokeWidth={1.5} />
      {children}
    </g>
  )
}
