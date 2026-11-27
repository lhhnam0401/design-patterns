import { inkLine } from './ink'
import { INK, PAPER_LIGHT, PAPER_SHADE, PIGMENT, TINT } from './pigments'

/**
 * Buildings. Each takes `pale`: without it the drawing is a participant (full pigment,
 * heavy outline); with it the drawing is scenery (tints, light outline).
 */

/** Curved Vietnamese roof with upturned eaves. `y` is the eave line, `w` the eave width, `h` the height. */
export function Roof({ cx, y, w, h, tile, ornaments = true, pale = false }: {
  cx: number; y: number; w: number; h: number; tile?: string; ornaments?: boolean; pale?: boolean
}) {
  const color = tile ?? (pale ? TINT.red : PIGMENT.tile)
  const dark = pale ? TINT.ink : PIGMENT.tileDark
  const half = w / 2
  const tip = Math.min(22, w * 0.09)
  const rl = cx - half * 0.62
  const rr = cx + half * 0.62
  const top = y - h
  const d = `M${cx - half - tip},${y - tip * 0.9} Q${cx - half + 4},${y + 2} ${cx - half + tip},${y} L${cx + half - tip},${y} Q${cx + half - 4},${y + 2} ${cx + half + tip},${y - tip * 0.9} Q${cx + half * 0.8},${y - h * 0.35} ${rr},${top} L${rl},${top} Q${cx - half * 0.8},${y - h * 0.35} ${cx - half - tip},${y - tip * 0.9} Z`
  return (
    <g>
      <path d={d} fill={color} {...inkLine(pale, 3)} strokeLinejoin="round" />
      {[0.3, 0.55, 0.8].map(t => (
        <line key={t} x1={cx - half * (1 - t * 0.38)} y1={y - h * t * 0.95} x2={cx + half * (1 - t * 0.38)} y2={y - h * t * 0.95} stroke={dark} strokeWidth={2} />
      ))}
      <rect x={rl - 4} y={top - 6} width={rr - rl + 8} height={7} rx={2} fill={dark} {...inkLine(pale, 2.2)} />
      {ornaments && (
        <g fill={dark} {...inkLine(pale, 2.2)} strokeLinejoin="round">
          <path d={`M${rl - 4},${top - 3} q-10,-4 -12,-18 q8,6 14,8 Z`} />
          <path d={`M${rr + 4},${top - 3} q10,-4 12,-18 q-8,6 -14,8 Z`} />
          <circle cx={cx} cy={top - 10} r={5} fill={pale ? TINT.yellow : PIGMENT.yellow} />
        </g>
      )}
    </g>
  )
}

/**
 * A hall: stone base, lacquered columns, paper doors and one or two roof tiers.
 * `y` is the ground line; `h` the wall height; `wall` and `tile` override the wall and roof colours.
 */
export function Hall({ cx, y, w, h, roofH = h * 0.75, tiers = 1, wall, tile, doors = 3, glow = true, pale = false }: {
  cx: number; y: number; w: number; h: number; roofH?: number; tiers?: 1 | 2; wall?: string; tile?: string
  doors?: number; glow?: boolean; pale?: boolean
}) {
  const left = cx - w / 2
  const base = 10
  const wallTop = y - base - h
  const pitch = (w - 20) / doors
  const doorW = pitch - 14
  const column = pale ? TINT.red : PIGMENT.red
  return (
    <g>
      <rect x={left - 10} y={y - base} width={w + 20} height={base} fill={pale ? TINT.ink : PIGMENT.stone} {...inkLine(pale, 2.2)} />
      <rect x={left - 18} y={y - 4} width={w + 36} height={6} fill={pale ? TINT.groundEdge : PIGMENT.stoneDark} {...inkLine(pale, 1.8)} />
      <rect x={left} y={wallTop} width={w} height={h} fill={wall ?? (pale ? TINT.red : PIGMENT.redDark)} {...inkLine(pale, 3)} />
      {Array.from({ length: doors }, (_, i) => {
        const dx = left + 17 + i * pitch
        const doorTop = wallTop + h * 0.22
        return (
          <g key={i}>
            <rect x={dx} y={doorTop} width={doorW} height={h * 0.78} fill={glow ? PAPER_LIGHT : PAPER_SHADE} {...inkLine(pale, 2)} />
            {glow && !pale && [0, 1, 2, 3].map(k => (
              <line key={k} x1={dx + 3} y1={wallTop + h * (0.34 + k * 0.15)} x2={dx + doorW - 3} y2={wallTop + h * (0.28 + k * 0.15)} stroke={PIGMENT.yellow} strokeOpacity={0.55} strokeWidth={1.4} />
            ))}
            <line x1={dx + doorW / 2} y1={doorTop} x2={dx + doorW / 2} y2={y - base} {...inkLine(pale, 1.6)} />
            {[0.4, 0.62].map(t => (
              <line key={t} x1={dx} y1={wallTop + h * t} x2={dx + doorW} y2={wallTop + h * t} stroke={INK} strokeWidth={1} strokeOpacity={pale ? 0.3 : 0.6} />
            ))}
          </g>
        )
      })}
      {Array.from({ length: doors + 1 }, (_, i) => {
        const x = left + 4 + i * ((w - 8) / doors)
        return <rect key={i} x={x - 4} y={wallTop} width={8} height={h} fill={column} {...inkLine(pale, 2)} />
      })}
      <rect x={left - 6} y={wallTop - 6} width={w + 12} height={8} fill={pale ? TINT.amber : PIGMENT.woodDark} {...inkLine(pale, 2.2)} />
      <Roof cx={cx} y={wallTop - 2} w={w + 46} h={roofH} tile={tile} pale={pale} />
      {tiers === 2 && <Roof cx={cx} y={wallTop - roofH * 0.82} w={w * 0.72} h={roofH * 0.7} tile={tile} pale={pale} />}
    </g>
  )
}

/** Three-entrance gate (tam quan). `y` is the ground line. */
export function Gate({ cx, y, w = 170, h = 90, pale = false }: { cx: number; y: number; w?: number; h?: number; pale?: boolean }) {
  const side = w * 0.26
  const mid = w - side * 2
  const opening = pale ? TINT.ink : PIGMENT.woodDark
  return (
    <g>
      {[-1, 1].map(s => {
        const x = cx + s * (mid / 2 + side / 2)
        return (
          <g key={s}>
            <rect x={x - side / 2} y={y - h * 0.62} width={side} height={h * 0.62} fill={pale ? TINT.red : PIGMENT.redDark} {...inkLine(pale, 2.4)} />
            <path d={`M${x - side / 2 + 8},${y} L${x - side / 2 + 8},${y - h * 0.38} Q${x},${y - h * 0.52} ${x + side / 2 - 8},${y - h * 0.38} L${x + side / 2 - 8},${y} Z`} fill={opening} {...inkLine(pale, 1.8)} />
            <Roof cx={x} y={y - h * 0.62} w={side + 16} h={h * 0.2} ornaments={false} pale={pale} />
          </g>
        )
      })}
      <rect x={cx - mid / 2} y={y - h} width={mid} height={h} fill={pale ? TINT.red : PIGMENT.red} {...inkLine(pale, 3)} />
      <path d={`M${cx - mid / 2 + 10},${y} L${cx - mid / 2 + 10},${y - h * 0.55} Q${cx},${y - h * 0.78} ${cx + mid / 2 - 10},${y - h * 0.55} L${cx + mid / 2 - 10},${y} Z`} fill={opening} {...inkLine(pale, 2.2)} />
      <rect x={cx - mid / 2 + 6} y={y - h + 8} width={mid - 12} height={14} rx={2} fill={pale ? TINT.amber : PIGMENT.redDark} stroke={pale ? TINT.yellow : PIGMENT.yellow} strokeWidth={1.6} />
      <Roof cx={cx} y={y - h} w={mid + 30} h={h * 0.3} pale={pale} />
    </g>
  )
}

/** Low brick wall with a tiled cap. `x` is its left end, `y` the ground line. */
export function Wall({ x, y, w, h = 34, pale = false }: { x: number; y: number; w: number; h?: number; pale?: boolean }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill={pale ? TINT.amber : PIGMENT.amber} {...inkLine(pale, 2.4)} />
      {Array.from({ length: Math.floor(h / 9) }, (_, row) => (
        <line key={row} x1={x} y1={y - 9 * (row + 1)} x2={x + w} y2={y - 9 * (row + 1)} stroke={INK} strokeOpacity={pale ? 0.2 : 0.35} />
      ))}
      <path d={`M${x - 6},${y - h} L${x + w + 6},${y - h} L${x + w},${y - h - 8} L${x},${y - h - 8} Z`} fill={pale ? TINT.red : PIGMENT.tile} {...inkLine(pale, 2.4)} strokeLinejoin="round" />
    </g>
  )
}
