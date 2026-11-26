import type { ReactNode } from 'react'
import { rng } from './geometry'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './pigments'

/** Square bánh chưng wrapped in lá dong and tied with bamboo strings. `x, y` is the bottom centre. */
export function SquareCake({ x, y, size = 56 }: { x: number; y: number; size?: number }) {
  const h = size / 2
  return (
    <g>
      <rect x={x - h} y={y - size} width={size} height={size} rx={3} fill={PIGMENT.leaf} stroke={INK} strokeWidth={3} />
      <rect x={x - h + 5} y={y - size + 5} width={size - 10} height={size - 10} fill="none" stroke={PIGMENT.green} strokeWidth={1.6} />
      {[0.33, 0.67].map(t => (
        <line key={t} x1={x - h + size * t} y1={y - size} x2={x - h + size * t} y2={y} stroke={PIGMENT.straw} strokeWidth={2.6} />
      ))}
      {[0.33, 0.67].map(t => (
        <line key={`h${t}`} x1={x - h} y1={y - size * t} x2={x + h} y2={y - size * t} stroke={PIGMENT.straw} strokeWidth={2.6} />
      ))}
    </g>
  )
}

/** Cylindrical bánh tét in banana leaves, lying on its side. `x, y` is the bottom centre. */
export function LogCake({ x, y, w = 96, h = 36 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx={h / 2} fill={PIGMENT.leaf} stroke={INK} strokeWidth={3} />
      <ellipse cx={x + w / 2 - h / 2} cy={y - h / 2} rx={h * 0.3} ry={h / 2 - 2} fill={TINT.green} stroke={INK} strokeWidth={1.8} />
      <circle cx={x + w / 2 - h / 2} cy={y - h / 2} r={h * 0.12} fill={PIGMENT.yellow} />
      {[0.2, 0.4, 0.6].map(t => (
        <line key={t} x1={x - w / 2 + w * t} y1={y - h} x2={x - w / 2 + w * t} y2={y} stroke={PIGMENT.straw} strokeWidth={2.6} />
      ))}
    </g>
  )
}

/** A white plate with a blue rim. `x, y` is the centre of the plate's top. */
export function Plate({ x, y, w = 92 }: { x: number; y: number; w?: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 4} rx={w / 2} ry={w * 0.14} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.6} />
      <ellipse cx={x} cy={y + 3} rx={w / 2 - 8} ry={w * 0.09} fill="none" stroke={PIGMENT.blue} strokeWidth={1.8} />
    </g>
  )
}

/** Thịt đông: a set slab of jellied pork, cut into squares, on a plate. `x, y` is the plate centre. */
export function JelliedPork({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={96} />
      <rect x={x - 32} y={y - 26} width={64} height={28} rx={3} fill={TINT.amber} stroke={INK} strokeWidth={2.6} />
      <line x1={x - 11} y1={y - 26} x2={x - 11} y2={y + 2} stroke={INK} strokeWidth={1.4} opacity={0.6} />
      <line x1={x + 11} y1={y - 26} x2={x + 11} y2={y + 2} stroke={INK} strokeWidth={1.4} opacity={0.6} />
      {[[-24, -16], [-2, -10], [18, -18], [-16, -6], [24, -6]].map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={3} fill={PIGMENT.amber} stroke={INK} strokeWidth={1} />
      ))}
      <path d={`M${x - 26},${y - 21} l12,0`} stroke={PAPER_LIGHT} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

/** Thịt kho tàu: braised pork belly with halved eggs in a bowl. `x, y` is the bowl rim centre. */
export function BraisedPorkBowl({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 44},${y} Q${x - 40},${y + 34} ${x},${y + 36} Q${x + 40},${y + 34} ${x + 44},${y} Z`} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <path d={`M${x - 36},${y + 14} Q${x},${y + 22} ${x + 36},${y + 14}`} stroke={PIGMENT.blue} strokeWidth={2} fill="none" />
      <ellipse cx={x} cy={y} rx={44} ry={9} fill={PIGMENT.amber} stroke={INK} strokeWidth={2.6} />
      {[-26, -6, 16].map(dx => (
        <rect key={dx} x={x + dx - 7} y={y - 14} width={15} height={12} rx={2} fill={PIGMENT.amberDark} stroke={INK} strokeWidth={1.6} />
      ))}
      {[-16, 26].map(dx => (
        <g key={dx}>
          <ellipse cx={x + dx} cy={y - 10} rx={11} ry={8} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.8} />
          <circle cx={x + dx} cy={y - 10} r={4.5} fill={PIGMENT.yellow} />
        </g>
      ))}
    </g>
  )
}

/** Dưa hành: pickled shallots heaped in a shallow bowl. `x, y` is the bowl rim centre. */
export function PickledOnionBowl({ x, y }: { x: number; y: number }) {
  const r = rng(13)
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => {
        const dx = -26 + (i % 5) * 13 + (i > 4 ? 6 : 0)
        const dy = i > 4 ? -20 : -9
        return <ellipse key={i} cx={x + dx + r() * 3} cy={y + dy} rx={8} ry={9} fill={i % 3 ? PAPER_LIGHT : TINT.red} stroke={INK} strokeWidth={1.6} />
      })}
      <path d={`M${x - 40},${y - 2} Q${x - 34},${y + 26} ${x},${y + 28} Q${x + 34},${y + 26} ${x + 40},${y - 2} Z`} fill={PIGMENT.blue} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <path d={`M${x - 30},${y + 9} Q${x},${y + 16} ${x + 30},${y + 9}`} stroke={PAPER_LIGHT} strokeWidth={2} fill="none" />
    </g>
  )
}

/** Dưa kiệu: pickled leek bulbs in a glazed jar. `x, y` is the jar's bottom centre. */
export function PickledLeekJar({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <path d={`M${x - 16},${y - 62} L${x + 16},${y - 62} L${x + 18},${y - 54} Q${x + 34},${y - 42} ${x + 30},${y - 18} Q${x + 26},${y} ${x},${y} Q${x - 26},${y} ${x - 30},${y - 18} Q${x - 34},${y - 42} ${x - 18},${y - 54} Z`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      {[[-12, -34], [4, -40], [14, -26], [-6, -20], [12, -12], [-16, -12]].map(([dx, dy], i) => (
        <ellipse key={i} cx={x + dx} cy={y + dy} rx={6} ry={7.5} fill={PAPER_LIGHT} stroke={INK} strokeWidth={1.4} />
      ))}
      <rect x={x - 19} y={y - 70} width={38} height={9} rx={3} fill={PIGMENT.amberDark} stroke={INK} strokeWidth={2.2} />
    </g>
  )
}

/**
 * A small kitchen: a tiled eave, a paper sign, a clay stove and a steaming pot.
 * `x` is the centre, `y` the floor. Children are drawn on the sign, centred at (x - 16, y - h + 49).
 */
export function Kitchen({ x, y, w = 132, h = 110, tile = PIGMENT.red, children }: {
  x: number; y: number; w?: number; h?: number; tile?: string; children?: ReactNode
}) {
  const left = x - w / 2
  const top = y - h
  return (
    <g>
      <rect x={left + 6} y={top + 22} width={w - 12} height={h - 22} fill={TINT.amber} stroke={INK} strokeWidth={2.6} />
      <path d={`M${left - 10},${top + 26} Q${left - 2},${top + 30} ${left + 8},${top + 24} L${left + 14},${top} L${left + w - 14},${top} L${left + w - 8},${top + 24} Q${left + w + 2},${top + 30} ${left + w + 10},${top + 26} L${left + w - 4},${top + 14} L${left + 4},${top + 14} Z`} fill={tile} stroke={INK} strokeWidth={2.6} strokeLinejoin="round" />
      <line x1={left + 14} y1={top + 7} x2={left + w - 14} y2={top + 7} stroke={INK} strokeWidth={1.4} opacity={0.6} />
      <rect x={left + 6} y={top + 22} width={8} height={h - 22} fill={PIGMENT.wood} stroke={INK} strokeWidth={2} />
      <rect x={left + w - 14} y={top + 22} width={8} height={h - 22} fill={PIGMENT.wood} stroke={INK} strokeWidth={2} />
      {/* Clay stove with a pot */}
      <path d={`M${x + 10},${y} L${x + 14},${y - 26} L${x + 50},${y - 26} L${x + 54},${y} Z`} fill={PIGMENT.amberDark} stroke={INK} strokeWidth={2.4} strokeLinejoin="round" />
      <path d={`M${x + 24},${y} Q${x + 32},${y - 16} ${x + 40},${y}`} fill={PIGMENT.yellow} stroke={INK} strokeWidth={1.4} />
      <path d={`M${x + 12},${y - 26} L${x + 52},${y - 26} Q${x + 50},${y - 46} ${x + 32},${y - 48} Q${x + 14},${y - 46} ${x + 12},${y - 26} Z`} fill={INK} />
      <ellipse cx={x + 32} cy={y - 47} rx={16} ry={4} fill={PIGMENT.woodDark} stroke={INK} strokeWidth={1.6} />
      {[-6, 6].map(dx => (
        <path key={dx} d={`M${x + 32 + dx},${y - 54} q-5,-8 0,-16`} stroke={TINT.ink} strokeWidth={2.4} fill="none" strokeLinecap="round" />
      ))}
      <rect x={x - 62} y={top + 32} width={92} height={26} rx={2} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2} />
      {children}
    </g>
  )
}
