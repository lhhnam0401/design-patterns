import type { Point } from '../types'
import { band, rng, smooth } from './geometry'
import { FAINT_LINE, inkLine } from './ink'
import { GROUND, H, W } from './layout'
import { INK, PAPER_LIGHT, PIGMENT, TINT } from './pigments'

/** The floor band under the stage: a flat tint with a printed edge. */
export function GroundBand({ y = GROUND, color = TINT.ground, edge = TINT.groundEdge }: { y?: number; color?: string; edge?: string }) {
  return (
    <g>
      <rect x={0} y={y} width={W} height={H - y} fill={color} />
      <line x1={0} y1={y + 1.5} x2={W} y2={y + 1.5} stroke={edge} strokeWidth={3} />
    </g>
  )
}

/** A pale full moon with a printed halo, the sign of a night setting. */
export function Moon({ x, y, r = 22 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 1.45} fill="none" stroke={TINT.yellow} strokeWidth={2} strokeDasharray="3 5" />
      <circle cx={x} cy={y} r={r} fill={PAPER_LIGHT} stroke={INK} strokeWidth={2} strokeOpacity={0.6} />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.2} fill={TINT.yellow} />
    </g>
  )
}

/** Small four-point stars in a pale tint, scattered inside a box. */
export function Stars({ seed = 1, count = 12, x0 = 0, x1 = W, y0 = 8, y1 = 90 }: {
  seed?: number; count?: number; x0?: number; x1?: number; y0?: number; y1?: number
}) {
  const r = rng(seed)
  return (
    <g fill={TINT.amber}>
      {Array.from({ length: count }, (_, i) => {
        const x = x0 + r() * (x1 - x0)
        const y = y0 + r() * (y1 - y0)
        const s = 2.5 + r() * 2.5
        return <path key={i} d={`M${x},${y - s} L${x + s * 0.3},${y - s * 0.3} L${x + s},${y} L${x + s * 0.3},${y + s * 0.3} L${x},${y + s} L${x - s * 0.3},${y + s * 0.3} L${x - s},${y} L${x - s * 0.3},${y - s * 0.3} Z`} />
      })}
    </g>
  )
}

/** Tufts of grass along a line, in a pale tint. */
export function Grass({ x0 = 0, x1 = W, y = GROUND + 2, seed = 9, count = 18, color = TINT.green }: {
  x0?: number; x1?: number; y?: number; seed?: number; count?: number; color?: string
}) {
  const r = rng(seed)
  return (
    <g stroke={color} strokeWidth={2.2} strokeLinecap="round" fill="none">
      {Array.from({ length: count }, (_, i) => {
        const x = x0 + r() * (x1 - x0)
        const h = 8 + r() * 8
        return <path key={i} d={`M${x},${y} q-2,-${h / 2} -5,-${h} M${x},${y} q1,-${h / 2} 1,-${h + 2} M${x},${y} q3,-${h / 2} 6,-${h - 1}`} />
      })}
    </g>
  )
}

/** A pale hoa đào branch reaching in from a corner. `x, y` is where it enters; `flip` mirrors it. */
export function BlossomBranch({ x, y, s = 1, flip = false, seed = 21 }: { x: number; y: number; s?: number; flip?: boolean; seed?: number }) {
  const r = rng(seed)
  const tips: [number, number][] = [[70, 24], [118, 46], [150, 30], [96, 70], [40, 52], [128, 84]]
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <path d="M0,10 C40,22 80,30 150,30 M60,26 C80,44 100,60 128,84 M30,20 C36,34 38,44 40,52 M90,30 C100,40 108,46 118,46" stroke={TINT.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
      {tips.flatMap(([tx, ty], i) =>
        Array.from({ length: 3 }, (_, k) => (
          <circle key={`${i}-${k}`} cx={tx + (r() - 0.5) * 18} cy={ty + (r() - 0.5) * 14} r={5} fill={TINT.red} stroke={INK} strokeOpacity={0.35} strokeWidth={1} />
        )),
      )}
    </g>
  )
}

/** A string of pale round lanterns sagging between two points. */
export function LanternString({ x0, x1, y, sag = 18, count = 4 }: { x0: number; x1: number; y: number; sag?: number; count?: number }) {
  return (
    <g>
      <path d={`M${x0},${y} Q${(x0 + x1) / 2},${y + sag * 2} ${x1},${y}`} stroke={TINT.ink} strokeWidth={2} fill="none" />
      {Array.from({ length: count }, (_, i) => {
        const t = (i + 0.5) / count
        const lx = x0 + (x1 - x0) * t
        const ly = y + sag * 4 * t * (1 - t) + 16
        return (
          <g key={i}>
            <line x1={lx} y1={ly - 16} x2={lx} y2={ly - 10} stroke={TINT.ink} strokeWidth={1.5} />
            <ellipse cx={lx} cy={ly} rx={10} ry={9} fill={i % 2 ? TINT.yellow : TINT.red} stroke={INK} strokeOpacity={0.35} strokeWidth={1.2} />
          </g>
        )
      })}
    </g>
  )
}

/** A layer of hills with a smooth, seeded skyline. Always scenery; pass a TINT colour. */
export function Hills({ y, amp = 40, color = TINT.green, seed = 3, step = 120, bottom = H }: {
  y: number; amp?: number; color?: string; seed?: number; step?: number; bottom?: number
}) {
  const r = rng(seed)
  const pts: Point[] = []
  for (let x = -40; x <= W + 40; x += step) pts.push([x, y - r() * amp])
  return (
    <g>
      <path d={band(pts, bottom)} fill={color} />
      <path d={smooth(pts)} fill="none" {...FAINT_LINE} />
    </g>
  )
}

/** A pale sun with printed rays. Always scenery. */
export function Sun({ x, y, r = 34 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 16
        return <line key={i} x1={x + Math.cos(a) * r * 1.2} y1={y + Math.sin(a) * r * 1.2} x2={x + Math.cos(a) * r * 1.55} y2={y + Math.sin(a) * r * 1.55} stroke={TINT.amber} strokeWidth={2} strokeLinecap="round" />
      })}
      <circle cx={x} cy={y} r={r} fill={TINT.yellow} {...FAINT_LINE} />
      <circle cx={x} cy={y} r={r * 0.78} fill="none" stroke={PAPER_LIGHT} strokeWidth={1.6} />
    </g>
  )
}

/** A lacquer-style swirl cloud. Always scenery. */
export function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} fill="none" stroke={TINT.amber} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M-60,0 C-60,-14 -40,-20 -30,-10 C-28,-28 2,-30 6,-12 C14,-26 40,-22 38,-4 C52,-6 60,4 52,10 L-56,10 C-66,8 -66,2 -60,0 Z" fill={TINT.yellow} />
      <path d="M-30,-10 C-24,-2 -14,-4 -16,-10" />
      <path d="M6,-12 C10,-4 20,-6 18,-12" />
    </g>
  )
}

/** Round-canopy tree (banyan or longan). `x, y` is the foot of the trunk; about 130 units tall at s = 1. */
export function Tree({ x, y, s = 1, pale = false }: { x: number; y: number; s?: number; pale?: boolean }) {
  const canopy = pale ? [TINT.green, TINT.green] : [PIGMENT.leaf, PIGMENT.green]
  const trunk = pale ? TINT.amber : PIGMENT.woodDark
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-7,0 C-6,-30 -10,-48 -4,-62 L4,-62 C10,-48 6,-30 8,0 Z" fill={trunk} {...inkLine(pale, 2.6)} />
      <path d="M-4,-50 L-20,-66 M4,-56 L18,-72" stroke={trunk} strokeWidth={4} />
      {[[-26, -78, 26], [0, -98, 32], [26, -80, 26], [-10, -70, 24], [14, -66, 22]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={canopy[i % 2]} {...inkLine(pale, 2.6)} />
      ))}
      {!pale && [[-16, -92], [8, -112], [22, -86], [-30, -74]].map(([cx, cy], i) => (
        <path key={i} d={`M${cx},${cy} q6,-6 12,0`} stroke={TINT.green} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      ))}
    </g>
  )
}

/** A clump of bamboo. `x, y` is the foot of the first stalk; `h` the tallest stalk. */
export function Bamboo({ x, y, h = 180, seed = 2, count = 4, pale = false }: {
  x: number; y: number; h?: number; seed?: number; count?: number; pale?: boolean
}) {
  const r = rng(seed)
  const stalks = Array.from({ length: count }, (_, i) => ({ dx: i * 11 + r() * 6, hh: h * (0.75 + r() * 0.25), lean: (r() - 0.5) * 18 }))
  const stalk = pale ? TINT.green : PIGMENT.leaf
  const lineOpacity = pale ? 0.4 : 1
  return (
    <g>
      {stalks.map((s, i) => {
        const top: Point = [x + s.dx + s.lean, y - s.hh]
        const d = `M${x + s.dx},${y} Q${x + s.dx + s.lean * 0.3},${y - s.hh / 2} ${top[0]},${top[1]}`
        return (
          <g key={i}>
            <path d={d} stroke={INK} strokeOpacity={pale ? 0.4 : 1} strokeWidth={7} fill="none" strokeLinecap="round" />
            <path d={d} stroke={stalk} strokeWidth={4} fill="none" strokeLinecap="round" />
            {[0.25, 0.45, 0.65, 0.82].map(t => (
              <line key={t} x1={x + s.dx + s.lean * t * t - 3} y1={y - s.hh * t} x2={x + s.dx + s.lean * t * t + 3} y2={y - s.hh * t} stroke={INK} strokeOpacity={lineOpacity} strokeWidth={1.5} />
            ))}
            {[0, 1, 2, 3, 4].map(k => {
              const ly = top[1] + k * 14 + r() * 6
              const lx = top[0] - s.lean * (k / 6)
              const dir = k % 2 === 0 ? 1 : -1
              return <path key={k} d={`M${lx},${ly} q${dir * 12},-4 ${dir * 26},4 q${-dir * 14},2 ${-dir * 26},-4 Z`} fill={stalk} stroke={INK} strokeOpacity={lineOpacity} strokeWidth={1.2} />
            })}
          </g>
        )
      })}
    </g>
  )
}

/** Flooded rice paddy with rows of seedlings. `x, y` is the top-left of the water. */
export function Paddy({ x, y, w, h, water, plant, rows = 4, height = 10, gold = false, pale = false }: {
  x: number; y: number; w: number; h: number; water?: string; plant?: string; rows?: number; height?: number; gold?: boolean; pale?: boolean
}) {
  const seedling = plant ?? (pale ? TINT.green : PIGMENT.leaf)
  return (
    <g>
      <path d={`M${x},${y} L${x + w},${y} L${x + w + 14},${y + h} L${x - 14},${y + h} Z`} fill={water ?? (pale ? TINT.blue : PIGMENT.blue)} {...inkLine(pale, 2.6)} strokeLinejoin="round" />
      <path d={`M${x + 4},${y + 3} L${x + w - 4},${y + 3}`} stroke={PAPER_LIGHT} strokeOpacity={0.35} strokeWidth={1.5} />
      {Array.from({ length: rows }, (_, row) => {
        const ry = y + ((row + 1) * h) / (rows + 1)
        const count = Math.round(w / 18)
        return Array.from({ length: count }, (_, i) => {
          const px = x - 6 + ((i + 0.5) * (w + 12)) / count
          return (
            <g key={`${row}-${i}`}>
              <path d={`M${px},${ry} l-3,-${height} M${px},${ry} l0,-${height + 3} M${px},${ry} l3,-${height}`} stroke={seedling} strokeWidth={2} strokeLinecap="round" />
              {gold && <circle cx={px + 2} cy={ry - height - 2} r={2.4} fill={pale ? TINT.yellow : PIGMENT.yellow} />}
            </g>
          )
        })
      })}
    </g>
  )
}

/** A pale footpath along smooth points. Always scenery. */
export function Path({ points, width = 26 }: { points: Point[]; width?: number }) {
  const d = smooth(points)
  return (
    <g>
      <path d={d} stroke={INK} strokeOpacity={0.3} strokeWidth={width + 3} fill="none" strokeLinecap="round" />
      <path d={d} stroke={TINT.amber} strokeWidth={width} fill="none" strokeLinecap="round" />
    </g>
  )
}

/** Tết blossom tree: pink hoa đào (North) or yellow hoa mai (South). `x, y` is the foot of the trunk. */
export function BlossomTree({ x, y, s = 1, flower = 'dao', seed = 21, flip = false, pale = false }: {
  x: number; y: number; s?: number; flower?: 'dao' | 'mai'; seed?: number; flip?: boolean; pale?: boolean
}) {
  const r = rng(seed)
  const branches = ['M0,0 C2,-40 -6,-70 -2,-110', 'M-2,-70 C-20,-84 -34,-96 -44,-120', 'M-1,-88 C14,-100 30,-112 38,-136', 'M-2,-104 C-8,-124 -2,-140 4,-150', 'M-30,-96 C-46,-98 -58,-104 -66,-100', 'M24,-106 C40,-104 52,-110 60,-118']
  const tips: Point[] = [[-2, -110], [-44, -120], [38, -136], [4, -150], [-66, -100], [60, -118], [-20, -84], [14, -100], [-30, -130], [30, -150]]
  const petal = flower === 'mai' ? (pale ? TINT.yellow : PIGMENT.yellow) : (pale ? TINT.red : PIGMENT.pink)
  const bark = pale ? TINT.ink : PIGMENT.woodDark
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      {!pale && branches.map((d, i) => <path key={i} d={d} stroke={INK} strokeWidth={i ? 6 : 10} fill="none" strokeLinecap="round" />)}
      {branches.map((d, i) => <path key={`b${i}`} d={d} stroke={bark} strokeWidth={i ? 3.5 : 6.5} fill="none" strokeLinecap="round" />)}
      {tips.flatMap((t, i) =>
        Array.from({ length: 5 }, (_, k) => {
          const bx = t[0] + (r() - 0.5) * 30
          const by = t[1] + (r() - 0.5) * 22
          return (
            <g key={`${i}-${k}`}>
              <circle cx={bx} cy={by} r={5} fill={petal} stroke={INK} strokeOpacity={pale ? 0.35 : 1} strokeWidth={1} />
              <circle cx={bx} cy={by} r={1.5} fill={PAPER_LIGHT} />
            </g>
          )
        }),
      )}
    </g>
  )
}
