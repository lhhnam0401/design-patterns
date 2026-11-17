import type { ReactNode } from 'react'
import { lerp } from './geometry'
import { url, useSceneIds } from './ids'
import { C, INK } from './palette'

/** Round silk lantern with a warm glow. `x, y` is the lantern's centre. */
export function Lantern({ x, y, r = 14, color = '#d62828', cord = 0, glow = true, shape = 'round' }: {
  x: number; y: number; r?: number; color?: string; cord?: number; glow?: boolean; shape?: 'round' | 'tall' | 'star'
}) {
  const ids = useSceneIds()
  const rx = shape === 'tall' ? r * 0.75 : r
  const ry = shape === 'tall' ? r * 1.3 : r * 0.95
  return (
    <g>
      {cord > 0 && <line x1={x} y1={y - ry - cord} x2={x} y2={y - ry} stroke={INK} strokeWidth={1.2} />}
      {glow && <circle cx={x} cy={y} r={r * 3} fill={url(ids.lamp)} opacity={0.75} />}
      {shape === 'star' ? (
        <path
          d={Array.from({ length: 10 }, (_, i) => {
            const a = (Math.PI * 2 * i) / 10 - Math.PI / 2
            const rr = i % 2 ? r * 0.5 : r * 1.15
            return `${i ? 'L' : 'M'}${(x + Math.cos(a) * rr).toFixed(1)},${(y + Math.sin(a) * rr).toFixed(1)}`
          }).join(' ') + ' Z'}
          fill={color}
          stroke={INK}
          strokeWidth={1.6}
        />
      ) : (
        <g>
          <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={color} stroke={INK} strokeWidth={1.6} />
          <ellipse cx={x} cy={y} rx={rx * 0.55} ry={ry} fill="none" stroke={INK} strokeOpacity={0.45} strokeWidth={1} />
          <ellipse cx={x - rx * 0.3} cy={y - ry * 0.25} rx={rx * 0.25} ry={ry * 0.35} fill="#fff" opacity={0.25} />
        </g>
      )}
      <rect x={x - rx * 0.45} y={y - ry - 3} width={rx * 0.9} height={4} rx={1} fill={C.gold} stroke={INK} strokeWidth={1} />
      <rect x={x - rx * 0.45} y={y + ry - 1} width={rx * 0.9} height={4} rx={1} fill={C.gold} stroke={INK} strokeWidth={1} />
      <path d={`M${x},${y + ry + 3} l-2,${r * 0.8} M${x},${y + ry + 3} l0,${r * 0.9} M${x},${y + ry + 3} l2,${r * 0.8}`} stroke={C.gold} strokeWidth={1.2} />
    </g>
  )
}

/** Lanterns hung along a sagging cord between two points. */
export function LanternString({ x0, x1, y, sag = 26, count = 6, colors = ['#d62828', '#f2a03b'], r = 11 }: {
  x0: number; x1: number; y: number; sag?: number; count?: number; colors?: string[]; r?: number
}) {
  const mid = (x0 + x1) / 2
  const at = (t: number) => {
    const x = lerp(x0, x1, t)
    const yy = y + sag * 4 * t * (1 - t)
    return [x, yy] as const
  }
  return (
    <g>
      <path d={`M${x0},${y} Q${mid},${y + sag * 2} ${x1},${y}`} stroke={INK} strokeWidth={1.5} fill="none" />
      {Array.from({ length: count }, (_, i) => {
        const [lx, ly] = at((i + 0.5) / count)
        return <Lantern key={i} x={lx} y={ly + 12 + r} r={r} cord={10} color={colors[i % colors.length]} />
      })}
    </g>
  )
}

/** An open scroll with ruled lines and an optional red seal. */
export function Scroll({ x, y, w = 60, h = 40, seal = true, lines = 3, color = C.paper, rotate = 0 }: {
  x: number; y: number; w?: number; h?: number; seal?: boolean; lines?: number; color?: string; rotate?: number
}) {
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x} y={y} width={w} height={h} fill={color} stroke={INK} strokeWidth={1.6} />
      <rect x={x - 4} y={y - 3} width={w + 8} height={5} rx={2.5} fill={C.wood} stroke={INK} strokeWidth={1.2} />
      <rect x={x - 4} y={y + h - 2} width={w + 8} height={5} rx={2.5} fill={C.wood} stroke={INK} strokeWidth={1.2} />
      {Array.from({ length: lines }, (_, i) => (
        <line key={i} x1={x + 7} y1={y + 9 + i * ((h - 14) / Math.max(lines, 1))} x2={x + w - (seal ? 18 : 7)} y2={y + 9 + i * ((h - 14) / Math.max(lines, 1))} stroke="#6b4a2b" strokeWidth={1.4} />
      ))}
      {seal && <rect x={x + w - 14} y={y + h - 15} width={9} height={9} fill="#c81e1e" stroke={INK} strokeWidth={0.8} />}
    </g>
  )
}

/** Rolled scroll lying sideways, sealed with a cord. */
export function RolledScroll({ x, y, w = 40, color = C.paper, ribbon = '#c81e1e' }: { x: number; y: number; w?: number; color?: string; ribbon?: string }) {
  return (
    <g>
      <rect x={x} y={y - 6} width={w} height={12} rx={6} fill={color} stroke={INK} strokeWidth={1.5} />
      <ellipse cx={x + w} cy={y} rx={3} ry={6} fill={C.paperDark} stroke={INK} strokeWidth={1.2} />
      <rect x={x + w / 2 - 3} y={y - 7} width={6} height={14} fill={ribbon} stroke={INK} strokeWidth={1} />
    </g>
  )
}

/** Low lacquered table. `y` is the floor line. */
export function Table({ x, y, w, h = 30, color = C.lacquerDark }: { x: number; y: number; w: number; h?: number; color?: string }) {
  return (
    <g>
      <rect x={x + 6} y={y - h} width={7} height={h} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
      <rect x={x + w - 13} y={y - h} width={7} height={h} fill={C.woodDark} stroke={INK} strokeWidth={1.5} />
      <rect x={x} y={y - h - 8} width={w} height={9} rx={2} fill={color} stroke={INK} strokeWidth={2} />
      <line x1={x + 4} y1={y - h - 5} x2={x + w - 4} y2={y - h - 5} stroke={C.gold} strokeOpacity={0.6} strokeWidth={1} />
    </g>
  )
}

/** Đông Sơn bronze drum seen from the front. `y` is the ground line. */
export function BronzeDrum({ cx, y, w = 120, h = 80 }: { cx: number; y: number; w?: number; h?: number }) {
  const top = y - h
  return (
    <g>
      <path d={`M${cx - w / 2},${top} Q${cx - w / 2 - 10},${top + h * 0.35} ${cx - w * 0.38},${top + h * 0.55} L${cx - w * 0.42},${y} L${cx + w * 0.42},${y} L${cx + w * 0.38},${top + h * 0.55} Q${cx + w / 2 + 10},${top + h * 0.35} ${cx + w / 2},${top} Z`} fill={C.bronze} stroke={INK} strokeWidth={2.5} />
      {[0.22, 0.4, 0.75].map(t => (
        <path key={t} d={`M${cx - w * 0.46},${top + h * t} Q${cx},${top + h * t + 6} ${cx + w * 0.46},${top + h * t}`} stroke={C.goldDark} strokeWidth={2} fill="none" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i} d={`M${cx - w * 0.36 + i * w * 0.12},${top + h * 0.26} l5,8 l5,-8`} stroke={C.gold} strokeWidth={1.2} fill="none" />
      ))}
      <ellipse cx={cx} cy={top} rx={w / 2} ry={w * 0.12} fill="#a36d27" stroke={INK} strokeWidth={2.5} />
      <ellipse cx={cx} cy={top} rx={w * 0.34} ry={w * 0.08} fill="none" stroke={C.gold} strokeWidth={1.4} />
      <ellipse cx={cx} cy={top} rx={w * 0.18} ry={w * 0.045} fill="none" stroke={C.gold} strokeWidth={1.4} />
      <path d={Array.from({ length: 12 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 12
        const r = i % 2 ? w * 0.04 : w * 0.11
        return `${i ? 'L' : 'M'}${(cx + Math.cos(a) * r).toFixed(1)},${(top + Math.sin(a) * r * 0.42).toFixed(1)}`
      }).join(' ') + ' Z'} fill={C.gold} />
    </g>
  )
}

/** Flag on a pole. `x, y` is the foot of the pole. */
export function Banner({ x, y, h = 120, w = 34, color = C.lacquer, trim = C.gold, children }: {
  x: number; y: number; h?: number; w?: number; color?: string; trim?: string; children?: ReactNode
}) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={INK} strokeWidth={5} />
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={C.wood} strokeWidth={3} />
      <circle cx={x} cy={y - h - 3} r={4} fill={C.gold} stroke={INK} />
      <path d={`M${x + 2},${y - h + 4} L${x + w},${y - h + 4} L${x + w},${y - h * 0.38} L${x + w / 2 + 1},${y - h * 0.3} L${x + 2},${y - h * 0.38} Z`} fill={color} stroke={INK} strokeWidth={2} />
      <path d={`M${x + 6},${y - h + 9} L${x + w - 4},${y - h + 9}`} stroke={trim} strokeWidth={1.5} />
      {children}
    </g>
  )
}

/** Ceramic jar. `y` is the ground line. */
export function Jar({ x, y, s = 1, color = '#a0623a', glaze = '#d7b98a' }: { x: number; y: number; s?: number; color?: string; glaze?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-8,-40 L8,-40 L10,-34 Q24,-26 22,-12 Q20,0 0,0 Q-20,0 -22,-12 Q-24,-26 -10,-34 Z" fill={color} stroke={INK} strokeWidth={2} />
      <path d="M-19,-22 Q0,-16 19,-22" stroke={glaze} strokeWidth={2.5} fill="none" />
      <rect x={-10} y={-44} width={20} height={5} rx={2} fill={color} stroke={INK} strokeWidth={1.5} />
    </g>
  )
}

/** Cooking pot over a small fire. `y` is the ground line. */
export function Pot({ x, y, w = 70, color = '#2f2a28', fire = true, steam = true }: { x: number; y: number; w?: number; color?: string; fire?: boolean; steam?: boolean }) {
  const ids = useSceneIds()
  const h = w * 0.55
  const top = y - 18 - h
  return (
    <g>
      {fire && (
        <g>
          <circle cx={x} cy={y - 10} r={w * 0.6} fill={url(ids.lamp)} opacity={0.8} />
          <path d={`M${x - 18},${y} Q${x - 14},${y - 22} ${x - 6},${y - 14} Q${x - 2},${y - 30} ${x + 4},${y - 14} Q${x + 12},${y - 24} ${x + 18},${y} Z`} fill="#f97316" stroke={INK} strokeWidth={1.2} />
          <path d={`M${x - 8},${y} Q${x - 4},${y - 12} ${x},${y - 8} Q${x + 4},${y - 14} ${x + 8},${y} Z`} fill="#fde047" />
          <rect x={x - 24} y={y - 4} width={48} height={5} rx={2} fill={C.woodDark} stroke={INK} />
        </g>
      )}
      <path d={`M${x - w / 2},${top} L${x + w / 2},${top} Q${x + w / 2 + 4},${top + h} ${x},${top + h + 4} Q${x - w / 2 - 4},${top + h} ${x - w / 2},${top} Z`} fill={color} stroke={INK} strokeWidth={2} />
      <ellipse cx={x} cy={top} rx={w / 2 + 3} ry={6} fill="#4a403b" stroke={INK} strokeWidth={2} />
      <ellipse cx={x} cy={top} rx={w / 2 - 3} ry={3.5} fill="#7a5a2a" />
      {steam && [-14, 0, 14].map(dx => (
        <path key={dx} d={`M${x + dx},${top - 6} q-8,-12 0,-24 q8,-12 0,-24`} stroke="#f6ead2" strokeOpacity={0.35} strokeWidth={3} fill="none" strokeLinecap="round" />
      ))}
    </g>
  )
}

/** Hanging horizontal board (hoành phi) with localized text drawn by the caller. */
export function Board({ x, y, w, h = 26, color = C.lacquerDark, children }: { x: number; y: number; w: number; h?: number; color?: string; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={color} stroke={INK} strokeWidth={2} />
      <rect x={x + 3} y={y + 3} width={w - 6} height={h - 6} rx={2} fill="none" stroke={C.gold} strokeWidth={1.2} />
      {children}
    </g>
  )
}

/** Wooden shelf with `rows` planks. `y` is the floor line. */
export function Shelf({ x, y, w, h, rows = 3 }: { x: number; y: number; w: number; h: number; rows?: number }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={C.woodDark} stroke={INK} strokeWidth={2} />
      <rect x={x + 6} y={y - h + 6} width={w - 12} height={h - 12} fill="#23120a" />
      {Array.from({ length: rows }, (_, i) => (
        <rect key={i} x={x + 4} y={y - h + ((i + 1) * h) / (rows + 1)} width={w - 8} height={5} fill={C.wood} stroke={INK} strokeWidth={1} />
      ))}
    </g>
  )
}

/** Square bánh chưng wrapped in lá dong and tied with bamboo strings. `x, y` is the bottom centre. */
export function SquareCake({ x, y, size = 26 }: { x: number; y: number; size?: number }) {
  const h = size / 2
  return (
    <g>
      <rect x={x - h} y={y - size} width={size} height={size} rx={2} fill="#3d7a35" stroke={INK} strokeWidth={1.6} />
      <rect x={x - h + 3} y={y - size + 3} width={size - 6} height={size - 6} fill="none" stroke="#5d9a4a" strokeWidth={1} />
      <line x1={x - h + size * 0.33} y1={y - size} x2={x - h + size * 0.33} y2={y} stroke="#e8d9a8" strokeWidth={1.4} />
      <line x1={x - h + size * 0.67} y1={y - size} x2={x - h + size * 0.67} y2={y} stroke="#e8d9a8" strokeWidth={1.4} />
      <line x1={x - h} y1={y - size * 0.5} x2={x + h} y2={y - size * 0.5} stroke="#e8d9a8" strokeWidth={1.4} />
    </g>
  )
}

/** Cylindrical bánh tét wrapped in banana leaves, lying on its side. `x, y` is the bottom centre. */
export function LogCake({ x, y, w = 54, h = 20 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={h / 2} fill="#4f8a3a" stroke={INK} strokeWidth={1.6} />
      <ellipse cx={x + w / 2 - h / 2} cy={y - h / 2} rx={h * 0.3} ry={h / 2 - 1} fill="#7fae5a" stroke={INK} strokeWidth={1} />
      {[0.22, 0.42, 0.62].map(t => (
        <line key={t} x1={x - w / 2 + w * t} y1={y - h} x2={x - w / 2 + w * t} y2={y} stroke="#e8d9a8" strokeWidth={1.4} />
      ))}
    </g>
  )
}

/** A dish on a plate. `x, y` is the plate's centre. */
export function Dish({ x, y, w = 46, food = '#e7c79b', kind = 'mound' }: {
  x: number; y: number; w?: number; food?: string; kind?: 'mound' | 'slices' | 'pickles' | 'roll'
}) {
  return (
    <g>
      <ellipse cx={x} cy={y + 3} rx={w / 2} ry={w * 0.15} fill="#e8e2d0" stroke={INK} strokeWidth={1.5} />
      <ellipse cx={x} cy={y + 2} rx={w / 2 - 6} ry={w * 0.1} fill="none" stroke="#3b82f6" strokeOpacity={0.6} strokeWidth={1.2} />
      {kind === 'mound' && <path d={`M${x - w * 0.32},${y} Q${x},${y - w * 0.42} ${x + w * 0.32},${y} Z`} fill={food} stroke={INK} strokeWidth={1.3} />}
      {kind === 'roll' && (
        <g>
          <rect x={x - w * 0.32} y={y - w * 0.26} width={w * 0.64} height={w * 0.26} rx={w * 0.13} fill={food} stroke={INK} strokeWidth={1.3} />
          <line x1={x - w * 0.1} y1={y - w * 0.26} x2={x - w * 0.1} y2={y} stroke={INK} strokeOpacity={0.5} />
          <line x1={x + w * 0.12} y1={y - w * 0.26} x2={x + w * 0.12} y2={y} stroke={INK} strokeOpacity={0.5} />
        </g>
      )}
      {kind === 'slices' && [-0.22, 0, 0.22].map(t => (
        <ellipse key={t} cx={x + w * t} cy={y - 3} rx={w * 0.12} ry={w * 0.09} fill={food} stroke={INK} strokeWidth={1.2} />
      ))}
      {kind === 'pickles' && [-0.2, -0.07, 0.06, 0.19, -0.13, 0.12].map((t, i) => (
        <ellipse key={i} cx={x + w * t} cy={y - (i > 3 ? 7 : 2)} rx={4} ry={3} fill={food} stroke={INK} strokeWidth={1} />
      ))}
    </g>
  )
}
