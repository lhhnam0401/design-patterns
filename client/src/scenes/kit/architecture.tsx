import { url, useSceneIds } from './ids'
import { C, INK } from './palette'

/** Curved Vietnamese roof with upturned eaves. `y` is the eave line, `w` the eave width. */
export function Roof({ cx, y, w, h, color = C.tile, dark = C.tileDark, ornaments = true }: {
  cx: number; y: number; w: number; h: number; color?: string; dark?: string; ornaments?: boolean
}) {
  const half = w / 2
  const tip = Math.min(22, w * 0.09)
  const rl = cx - half * 0.62
  const rr = cx + half * 0.62
  const top = y - h
  const d = `M${cx - half - tip},${y - tip * 0.9}
    Q${cx - half + 4},${y + 2} ${cx - half + tip},${y}
    L${cx + half - tip},${y}
    Q${cx + half - 4},${y + 2} ${cx + half + tip},${y - tip * 0.9}
    Q${cx + half * 0.8},${y - h * 0.35} ${rr},${top}
    L${rl},${top}
    Q${cx - half * 0.8},${y - h * 0.35} ${cx - half - tip},${y - tip * 0.9} Z`
  return (
    <g>
      <path d={d} fill={color} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      {[0.3, 0.55, 0.8].map(t => (
        <path key={t} d={`M${cx - half * (1 - t * 0.38)},${y - h * t * 0.95} L${cx + half * (1 - t * 0.38)},${y - h * t * 0.95}`} stroke={dark} strokeWidth={2} />
      ))}
      <rect x={rl - 4} y={top - 6} width={rr - rl + 8} height={7} rx={2} fill={dark} stroke={INK} strokeWidth={2} />
      {ornaments && (
        <g fill={dark} stroke={INK} strokeWidth={2}>
          <path d={`M${rl - 4},${top - 3} q-10,-4 -12,-18 q8,6 14,8 Z`} />
          <path d={`M${rr + 4},${top - 3} q10,-4 12,-18 q-8,6 -14,8 Z`} />
          <circle cx={cx} cy={top - 10} r={5} fill={C.gold} />
        </g>
      )}
    </g>
  )
}

/**
 * A hall: stone base, lacquered columns, glowing doors and one or two roof tiers.
 * `y` is the ground line; `h` the wall height.
 */
export function Hall({ cx, y, w, h, roofH = h * 0.75, tiers = 1, wall = '#7a2f1c', doors = 3, glow = true, dim = false }: {
  cx: number; y: number; w: number; h: number; roofH?: number; tiers?: 1 | 2; wall?: string; doors?: number; glow?: boolean; dim?: boolean
}) {
  const ids = useSceneIds()
  const left = cx - w / 2
  const base = 10
  const wallTop = y - base - h
  const cols = doors + 1
  const doorW = (w - 20) / doors - 14
  return (
    <g opacity={dim ? 0.35 : 1}>
      <rect x={left - 10} y={y - base} width={w + 20} height={base} fill={C.stone} stroke={INK} strokeWidth={2} />
      <rect x={left - 18} y={y - 4} width={w + 36} height={6} fill={C.stoneDark} stroke={INK} strokeWidth={1.5} />
      <rect x={left} y={wallTop} width={w} height={h} fill={wall} stroke={INK} strokeWidth={2.5} />
      {Array.from({ length: doors }, (_, i) => {
        const dx = left + 10 + 7 + i * ((w - 20) / doors)
        return (
          <g key={i}>
            <rect x={dx} y={wallTop + h * 0.22} width={doorW} height={h * 0.78} fill={glow ? '#f4b44a' : '#2a1208'} stroke={INK} strokeWidth={2} />
            {glow && <rect x={dx} y={wallTop + h * 0.22} width={doorW} height={h * 0.78} fill={url(ids.lamp)} opacity={0.8} />}
            <line x1={dx + doorW / 2} y1={wallTop + h * 0.22} x2={dx + doorW / 2} y2={y - base} stroke={INK} strokeWidth={1.5} />
            {[0.4, 0.62].map(t => <line key={t} x1={dx} y1={wallTop + h * t} x2={dx + doorW} y2={wallTop + h * t} stroke={INK} strokeWidth={1} opacity={0.6} />)}
          </g>
        )
      })}
      {Array.from({ length: cols }, (_, i) => {
        const x = left + 4 + i * ((w - 8) / doors)
        return <rect key={i} x={x - 4} y={wallTop} width={8} height={h} fill={C.lacquer} stroke={INK} strokeWidth={2} />
      })}
      <rect x={left - 6} y={wallTop - 6} width={w + 12} height={8} fill={C.woodDark} stroke={INK} strokeWidth={2} />
      <Roof cx={cx} y={wallTop - 2} w={w + 46} h={roofH} />
      {tiers === 2 && <Roof cx={cx} y={wallTop - roofH * 0.82} w={w * 0.72} h={roofH * 0.7} />}
    </g>
  )
}

/** Three-entrance gate (tam quan). `y` is the ground line. */
export function Gate({ cx, y, w = 170, h = 90 }: { cx: number; y: number; w?: number; h?: number }) {
  const side = w * 0.26
  const mid = w - side * 2
  return (
    <g>
      {[-1, 1].map(s => {
        const x = cx + s * (mid / 2 + side / 2)
        return (
          <g key={s}>
            <rect x={x - side / 2} y={y - h * 0.62} width={side} height={h * 0.62} fill="#8a3a22" stroke={INK} strokeWidth={2} />
            <path d={`M${x - side / 2 + 8},${y} L${x - side / 2 + 8},${y - h * 0.38} Q${x},${y - h * 0.52} ${x + side / 2 - 8},${y - h * 0.38} L${x + side / 2 - 8},${y} Z`} fill="#1a0d08" stroke={INK} strokeWidth={1.5} />
            <Roof cx={x} y={y - h * 0.62} w={side + 16} h={h * 0.2} ornaments={false} />
          </g>
        )
      })}
      <rect x={cx - mid / 2} y={y - h} width={mid} height={h} fill="#9a4126" stroke={INK} strokeWidth={2.5} />
      <path d={`M${cx - mid / 2 + 10},${y} L${cx - mid / 2 + 10},${y - h * 0.55} Q${cx},${y - h * 0.78} ${cx + mid / 2 - 10},${y - h * 0.55} L${cx + mid / 2 - 10},${y} Z`} fill="#1a0d08" stroke={INK} strokeWidth={2} />
      <rect x={cx - mid / 2 + 6} y={y - h + 8} width={mid - 12} height={14} rx={2} fill={C.lacquerDark} stroke={C.gold} strokeWidth={1.2} />
      <Roof cx={cx} y={y - h} w={mid + 30} h={h * 0.3} />
    </g>
  )
}

/** Low brick wall with a tiled cap. */
export function Wall({ x, y, w, h = 34 }: { x: number; y: number; w: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y - h} width={w} height={h} fill="#7d4a2e" stroke={INK} strokeWidth={2} />
      {Array.from({ length: Math.floor(h / 9) }, (_, row) => (
        <line key={row} x1={x} y1={y - 9 * (row + 1)} x2={x + w} y2={y - 9 * (row + 1)} stroke={INK} strokeOpacity={0.35} />
      ))}
      <path d={`M${x - 6},${y - h} L${x + w + 6},${y - h} L${x + w},${y - h - 8} L${x},${y - h - 8} Z`} fill={C.tile} stroke={INK} strokeWidth={2} />
    </g>
  )
}

/** Stepped stone terrace that buildings stand on. `y` is its top surface. */
export function Terrace({ cx, y, w, steps = 3, h = 9 }: { cx: number; y: number; w: number; steps?: number; h?: number }) {
  return (
    <g>
      {Array.from({ length: steps }, (_, i) => (
        <rect key={i} x={cx - w / 2 - i * 14} y={y + i * h} width={w + i * 28} height={h} fill={i % 2 ? C.stoneDark : C.stone} stroke={INK} strokeWidth={1.5} />
      ))}
    </g>
  )
}
