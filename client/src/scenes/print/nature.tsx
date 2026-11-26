import { rng } from './geometry'
import { GROUND, H, W } from './layout'
import { INK, PAPER_LIGHT, TINT } from './pigments'

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
