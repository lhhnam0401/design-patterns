import type { ReactNode } from 'react'
import { inkLine } from './ink'
import { INK, PAPER_LIGHT, PAPER_SHADE, PIGMENT, TINT } from './pigments'

/** Đông Sơn bronze drum seen from the front. `y` is the ground line under it. */
export function BronzeDrum({ cx, y, w = 140, h = 96 }: { cx: number; y: number; w?: number; h?: number }) {
  const top = y - h
  return (
    <g>
      <path
        d={`M${cx - w / 2},${top} Q${cx - w / 2 - 10},${top + h * 0.35} ${cx - w * 0.38},${top + h * 0.55} L${cx - w * 0.42},${y} L${cx + w * 0.42},${y} L${cx + w * 0.38},${top + h * 0.55} Q${cx + w / 2 + 10},${top + h * 0.35} ${cx + w / 2},${top} Z`}
        fill={PIGMENT.bronze}
        stroke={INK}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {[0.24, 0.42, 0.76].map(t => (
        <path key={t} d={`M${cx - w * 0.46},${top + h * t} Q${cx},${top + h * t + 6} ${cx + w * 0.46},${top + h * t}`} stroke={PIGMENT.bronzeDark} strokeWidth={2.4} fill="none" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${cx - w * 0.36 + i * w * 0.12},${top + h * 0.28} l5,8 l5,-8`} stroke={PIGMENT.yellow} strokeWidth={1.8} fill="none" />
      ))}
      <ellipse cx={cx} cy={top} rx={w / 2} ry={w * 0.12} fill={PIGMENT.yellow} stroke={INK} strokeWidth={3} />
      <ellipse cx={cx} cy={top} rx={w * 0.34} ry={w * 0.08} fill="none" stroke={PIGMENT.bronzeDark} strokeWidth={1.8} />
      <path
        d={Array.from({ length: 12 }, (_, i) => {
          const a = (Math.PI * 2 * i) / 12
          const r = i % 2 ? w * 0.04 : w * 0.12
          return `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)},${(top + Math.sin(a) * r * 0.42).toFixed(1)}`
        }).join(' ') + ' Z'}
        fill={PIGMENT.red}
        stroke={INK}
        strokeWidth={1}
      />
    </g>
  )
}

/** A hanging paper scroll with ruled lines. `struck` crosses out one line, by index. */
export function HangingScroll({ x, y, w = 64, h = 62, lines = 3, struck }: {
  x: number; y: number; w?: number; h?: number; lines?: number; struck?: number
}) {
  const gap = (h - 18) / lines
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.5} />
      <rect x={x - 5} y={y - 4} width={w + 10} height={7} rx={3.5} fill={PIGMENT.wood} stroke={INK} strokeWidth={2} />
      <rect x={x - 5} y={y + h - 3} width={w + 10} height={7} rx={3.5} fill={PIGMENT.wood} stroke={INK} strokeWidth={2} />
      {Array.from({ length: lines }, (_, i) => {
        const ly = y + 13 + i * gap
        return (
          <g key={i}>
            <circle cx={x + 10} cy={ly} r={2.4} fill={INK} />
            <line x1={x + 17} y1={ly} x2={x + w - 9} y2={ly} stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
            {struck === i && <line x1={x + 6} y1={ly + 3} x2={x + w - 5} y2={ly - 3} stroke={PIGMENT.red} strokeWidth={3} strokeLinecap="round" />}
          </g>
        )
      })}
    </g>
  )
}

/*
 * The props below take `pale`: without it they are participants (full pigment, heavy
 * outline); with it they are scenery (tints, light outline).
 */

/** Low lacquered table. `x` is its left end, `y` the floor line, `h` the leg height. */
export function Table({ x, y, w, h = 30, color, pale = false }: { x: number; y: number; w: number; h?: number; color?: string; pale?: boolean }) {
  const legs = pale ? TINT.ink : PIGMENT.woodDark
  return (
    <g>
      <rect x={x + 6} y={y - h} width={8} height={h} fill={legs} {...inkLine(pale, 2)} />
      <rect x={x + w - 14} y={y - h} width={8} height={h} fill={legs} {...inkLine(pale, 2)} />
      <rect x={x} y={y - h - 9} width={w} height={10} rx={2} fill={color ?? (pale ? TINT.amber : PIGMENT.redDark)} {...inkLine(pale, 2.6)} />
      {!pale && <line x1={x + 5} y1={y - h - 5.5} x2={x + w - 5} y2={y - h - 5.5} stroke={PIGMENT.yellow} strokeOpacity={0.7} strokeWidth={1.4} />}
    </g>
  )
}

/** Silk lantern. `x, y` is the lantern's centre; `cord` hangs it from a line above. */
export function Lantern({ x, y, r = 14, color, cord = 0, glow = true, shape = 'round', pale = false }: {
  x: number; y: number; r?: number; color?: string; cord?: number; glow?: boolean; shape?: 'round' | 'tall' | 'star'; pale?: boolean
}) {
  const body = color ?? (pale ? TINT.red : PIGMENT.red)
  const gold = pale ? TINT.yellow : PIGMENT.yellow
  const rx = shape === 'tall' ? r * 0.75 : r
  const ry = shape === 'tall' ? r * 1.3 : r * 0.95
  return (
    <g>
      {cord > 0 && <line x1={x} y1={y - ry - cord} x2={x} y2={y - ry} stroke={pale ? TINT.ink : INK} strokeWidth={1.4} />}
      {glow && !pale && <circle cx={x} cy={y} r={r * 1.45} fill="none" stroke={PIGMENT.yellow} strokeOpacity={0.6} strokeWidth={1.2} strokeDasharray="2 3" />}
      {shape === 'star' ? (
        <path
          d={Array.from({ length: 10 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 10 - Math.PI / 2
            const rr = i % 2 ? r * 0.5 : r * 1.15
            return `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`
          }).join(' ') + ' Z'}
          fill={body}
          {...inkLine(pale, 2)}
          strokeLinejoin="round"
        />
      ) : (
        <g>
          <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={body} {...inkLine(pale, 2)} />
          <ellipse cx={x} cy={y} rx={rx * 0.55} ry={ry} fill="none" stroke={INK} strokeOpacity={pale ? 0.25 : 0.45} strokeWidth={1} />
          {!pale && <ellipse cx={x - rx * 0.3} cy={y - ry * 0.25} rx={rx * 0.25} ry={ry * 0.35} fill={PAPER_LIGHT} opacity={0.3} />}
        </g>
      )}
      <rect x={x - rx * 0.45} y={y - ry - 3} width={rx * 0.9} height={4} rx={1} fill={gold} {...inkLine(pale, 1.2)} />
      <rect x={x - rx * 0.45} y={y + ry - 1} width={rx * 0.9} height={4} rx={1} fill={gold} {...inkLine(pale, 1.2)} />
      <path d={`M${x},${y + ry + 3} l-2,${r * 0.8} M${x},${y + ry + 3} l0,${r * 0.9} M${x},${y + ry + 3} l2,${r * 0.8}`} stroke={gold} strokeWidth={1.4} />
    </g>
  )
}

/** An open scroll with ruled lines and an optional red seal. `x, y` is its top-left corner. */
export function Scroll({ x, y, w = 60, h = 40, seal = true, lines = 3, color = PAPER_LIGHT, rotate = 0, pale = false }: {
  x: number; y: number; w?: number; h?: number; seal?: boolean; lines?: number; color?: string; rotate?: number; pale?: boolean
}) {
  const roller = pale ? TINT.amber : PIGMENT.wood
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x} y={y} width={w} height={h} fill={color} {...inkLine(pale, 2.2)} />
      <rect x={x - 4} y={y - 3} width={w + 8} height={6} rx={3} fill={roller} {...inkLine(pale, 1.6)} />
      <rect x={x - 4} y={y + h - 3} width={w + 8} height={6} rx={3} fill={roller} {...inkLine(pale, 1.6)} />
      {Array.from({ length: lines }, (_, i) => {
        const ly = y + 9 + i * ((h - 14) / Math.max(lines, 1))
        return <line key={i} x1={x + 7} y1={ly} x2={x + w - (seal ? 18 : 7)} y2={ly} stroke={pale ? TINT.ink : PIGMENT.woodDark} strokeWidth={1.8} strokeLinecap="round" />
      })}
      {seal && <rect x={x + w - 14} y={y + h - 15} width={9} height={9} fill={pale ? TINT.red : PIGMENT.red} {...inkLine(pale, 1)} />}
    </g>
  )
}

/** A rolled scroll lying sideways, tied with a ribbon. `x` is its left end, `y` its centre line. */
export function RolledScroll({ x, y, w = 40, ribbon, pale = false }: { x: number; y: number; w?: number; ribbon?: string; pale?: boolean }) {
  return (
    <g>
      <rect x={x} y={y - 7} width={w} height={14} rx={7} fill={PAPER_LIGHT} {...inkLine(pale, 2)} />
      <ellipse cx={x + w} cy={y} rx={3.5} ry={7} fill={PAPER_SHADE} {...inkLine(pale, 1.4)} />
      <rect x={x + w / 2 - 3.5} y={y - 8} width={7} height={16} fill={ribbon ?? (pale ? TINT.red : PIGMENT.red)} {...inkLine(pale, 1.2)} />
    </g>
  )
}

/** A flag on a pole. `x, y` is the foot of the pole; children draw on the flag. */
export function Banner({ x, y, h = 120, w = 34, color, trim, pale = false, children }: {
  x: number; y: number; h?: number; w?: number; color?: string; trim?: string; pale?: boolean; children?: ReactNode
}) {
  return (
    <g>
      {!pale && <line x1={x} y1={y} x2={x} y2={y - h} stroke={INK} strokeWidth={6} />}
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={pale ? TINT.ink : PIGMENT.wood} strokeWidth={pale ? 3 : 3.4} />
      <circle cx={x} cy={y - h - 3} r={4.5} fill={pale ? TINT.yellow : PIGMENT.yellow} {...inkLine(pale, 1.4)} />
      <path d={`M${x + 2},${y - h + 4} L${x + w},${y - h + 4} L${x + w},${y - h * 0.38} L${x + w / 2 + 1},${y - h * 0.3} L${x + 2},${y - h * 0.38} Z`} fill={color ?? (pale ? TINT.red : PIGMENT.red)} {...inkLine(pale, 2.4)} strokeLinejoin="round" />
      <line x1={x + 6} y1={y - h + 9} x2={x + w - 4} y2={y - h + 9} stroke={trim ?? (pale ? TINT.yellow : PIGMENT.yellow)} strokeWidth={1.8} />
      {children}
    </g>
  )
}

/** A cooking pot, optionally over a fire. `x` is its centre, `y` the ground line; `broth` colours the soup. */
export function Pot({ x, y, w = 70, color, broth, fire = true, steam = true, pale = false }: {
  x: number; y: number; w?: number; color?: string; broth?: string; fire?: boolean; steam?: boolean; pale?: boolean
}) {
  const h = w * 0.55
  const top = y - 18 - h
  return (
    <g>
      {fire && (
        <g>
          <path d={`M${x - 18},${y} Q${x - 14},${y - 22} ${x - 6},${y - 14} Q${x - 2},${y - 30} ${x + 4},${y - 14} Q${x + 12},${y - 24} ${x + 18},${y} Z`} fill={pale ? TINT.red : PIGMENT.red} {...inkLine(pale, 1.6)} strokeLinejoin="round" />
          <path d={`M${x - 8},${y} Q${x - 4},${y - 12} ${x},${y - 8} Q${x + 4},${y - 14} ${x + 8},${y} Z`} fill={pale ? TINT.yellow : PIGMENT.yellow} {...inkLine(pale, 1)} />
          <rect x={x - 24} y={y - 4} width={48} height={5} rx={2} fill={pale ? TINT.amber : PIGMENT.woodDark} {...inkLine(pale, 1.4)} />
        </g>
      )}
      <path d={`M${x - w / 2},${top} L${x + w / 2},${top} Q${x + w / 2 + 4},${top + h} ${x},${top + h + 4} Q${x - w / 2 - 4},${top + h} ${x - w / 2},${top} Z`} fill={color ?? (pale ? TINT.ink : PIGMENT.iron)} {...inkLine(pale, 2.6)} strokeLinejoin="round" />
      <ellipse cx={x} cy={top} rx={w / 2 + 3} ry={6} fill={pale ? TINT.groundEdge : PIGMENT.ironLight} {...inkLine(pale, 2.4)} />
      <ellipse cx={x} cy={top} rx={w / 2 - 3} ry={3.5} fill={broth ?? (pale ? TINT.amber : PIGMENT.amber)} />
      {steam && [-0.2, 0, 0.2].map(t => (
        <path key={t} d={`M${x + w * t},${top - 6} q-8,-12 0,-24 q8,-12 0,-24`} stroke={TINT.ink} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      ))}
    </g>
  )
}

/** A ceramic jar. `x` is its centre, `y` the ground line; about 44 units tall at s = 1. */
export function Jar({ x, y, s = 1, color, glaze, pale = false }: { x: number; y: number; s?: number; color?: string; glaze?: string; pale?: boolean }) {
  const body = color ?? (pale ? TINT.amber : PIGMENT.amber)
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-8,-40 L8,-40 L10,-34 Q24,-26 22,-12 Q20,0 0,0 Q-20,0 -22,-12 Q-24,-26 -10,-34 Z" fill={body} {...inkLine(pale, 2.4)} strokeLinejoin="round" />
      <path d="M-19,-22 Q0,-16 19,-22" stroke={glaze ?? (pale ? TINT.yellow : PIGMENT.yellow)} strokeWidth={3} fill="none" />
      <rect x={-10} y={-44} width={20} height={5} rx={2} fill={body} {...inkLine(pale, 1.8)} />
    </g>
  )
}

/** A wooden shelf with `rows` planks. `x` is its left side, `y` the floor line. */
export function Shelf({ x, y, w, h, rows = 3, pale = false }: { x: number; y: number; w: number; h: number; rows?: number; pale?: boolean }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={pale ? TINT.amber : PIGMENT.woodDark} {...inkLine(pale, 2.6)} />
      <rect x={x + 6} y={y - h + 6} width={w - 12} height={h - 12} fill={pale ? TINT.ground : TINT.amber} />
      {Array.from({ length: rows }, (_, i) => (
        <rect key={i} x={x + 4} y={y - h + ((i + 1) * h) / (rows + 1)} width={w - 8} height={6} fill={pale ? TINT.groundEdge : PIGMENT.wood} {...inkLine(pale, 1.4)} />
      ))}
    </g>
  )
}
