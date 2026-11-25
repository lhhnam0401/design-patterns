import type { Point } from '../types'
import { band, rng, smooth } from './geometry'
import { C, INK, SCENE_COLORS, W } from './palette'

export function Stars({ seed = 1, count = 40, maxY = 180 }: { seed?: number; count?: number; maxY?: number }) {
  const r = rng(seed)
  return (
    <g>
      {Array.from({ length: count }, (_, i) => {
        const x = r() * W
        const y = r() * maxY
        const big = r() > 0.85
        return <circle key={i} cx={x} cy={y} r={big ? 1.7 : 1} fill={big ? SCENE_COLORS.ochre : INK} opacity={0.38 + r() * 0.36} />
      })}
    </g>
  )
}

export function Moon({ x, y, r = 26 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r * 1.35} fill="none" stroke={SCENE_COLORS.ochre} strokeWidth={1.2} strokeDasharray="2 4" opacity={0.65} />
      <circle cx={x} cy={y} r={r} fill={SCENE_COLORS.paperLight} stroke={INK} strokeWidth={1.5} />
      <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.18} fill={SCENE_COLORS.paperShade} opacity={0.7} />
      <circle cx={x + r * 0.35} cy={y + r * 0.3} r={r * 0.12} fill={SCENE_COLORS.paperShade} opacity={0.6} />
    </g>
  )
}

export function Sun({ x, y, r = 34 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: 16 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 16
        return <line key={index} x1={x + Math.cos(angle) * r * 1.2} y1={y + Math.sin(angle) * r * 1.2} x2={x + Math.cos(angle) * r * 1.55} y2={y + Math.sin(angle) * r * 1.55} stroke={SCENE_COLORS.ochre} strokeWidth={1.4} />
      })}
      <circle cx={x} cy={y} r={r} fill="#d6a854" stroke={INK} strokeWidth={1.5} />
      <circle cx={x} cy={y} r={r * 0.78} fill="none" stroke={SCENE_COLORS.paperLight} strokeWidth={1.2} />
    </g>
  )
}

/** Lacquer-style swirl cloud. */
export function Cloud({ x, y, s = 1, color = C.gold, opacity = 0.35 }: { x: number; y: number; s?: number; color?: string; opacity?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} opacity={opacity} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
      <path d="M-60,0 C-60,-14 -40,-20 -30,-10 C-28,-28 2,-30 6,-12 C14,-26 40,-22 38,-4 C52,-6 60,4 52,10 L-56,10 C-66,8 -66,2 -60,0 Z" fill={color} fillOpacity={0.12} />
      <path d="M-30,-10 C-24,-2 -14,-4 -16,-10" />
      <path d="M6,-12 C10,-4 20,-6 18,-12" />
    </g>
  )
}

/** A layer of hills with a smooth, seeded skyline. */
export function Hills({ y, amp = 40, color, seed = 3, step = 120, bottom = 440 }: {
  y: number; amp?: number; color: string; seed?: number; step?: number; bottom?: number
}) {
  const r = rng(seed)
  const pts: Point[] = []
  for (let x = -40; x <= W + 40; x += step) pts.push([x, y - r() * amp])
  return <path d={band(pts, bottom)} fill={color} />
}

export function Ground({ y, color = '#b9a58d', edge = '#7b6855' }: { y: number; color?: string; edge?: string }) {
  return (
    <g>
      <rect x={0} y={y} width={W} height={440 - y} fill={color} />
      <rect x={0} y={y} width={W} height={4} fill={edge} />
    </g>
  )
}

/** River or lake surface with ripple lines and optional light reflections. */
export function Water({ y, h = 440 - y, x = 0, w = W, seed = 5, reflections = [] }: {
  y: number; h?: number; x?: number; w?: number; seed?: number; reflections?: { x: number; color: string }[]
}) {
  const r = rng(seed)
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={SCENE_COLORS.water} />
      {reflections.map((rf, i) => (
        <g key={`rf${i}`} opacity={0.55}>
          {[0, 1, 2, 3, 4].map(k => (
            <rect key={k} x={rf.x - 10 + k * 1.5} y={y + 8 + k * 9} width={20 - k * 3} height={2.5} rx={1.2} fill={rf.color} opacity={1 - k * 0.18} />
          ))}
        </g>
      ))}
      {Array.from({ length: Math.round(w / 34) }, (_, i) => {
        const rx = x + r() * w
        const ry = y + 6 + r() * (h - 10)
        const len = 14 + r() * 26
        return <path key={i} d={`M${rx},${ry} q${len / 2},-3 ${len},0`} stroke={SCENE_COLORS.jade} strokeOpacity={0.28 + r() * 0.24} strokeWidth={1.2} fill="none" />
      })}
    </g>
  )
}

export function Grass({ x0 = 0, x1 = W, y, seed = 9, count = 30, color = C.leafDark }: {
  x0?: number; x1?: number; y: number; seed?: number; count?: number; color?: string
}) {
  const r = rng(seed)
  return (
    <g stroke={color} strokeWidth={1.6} strokeLinecap="round" fill="none">
      {Array.from({ length: count }, (_, i) => {
        const x = x0 + r() * (x1 - x0)
        const h = 6 + r() * 10
        return <path key={i} d={`M${x},${y} q-2,-${h / 2} -4,-${h} M${x},${y} q1,-${h / 2} 1,-${h + 2} M${x},${y} q3,-${h / 2} 5,-${h - 1}`} />
      })}
    </g>
  )
}

export function Bamboo({ x, y, h = 180, seed = 2, color = '#3f7a3a', count = 4 }: {
  x: number; y: number; h?: number; seed?: number; color?: string; count?: number
}) {
  const r = rng(seed)
  const stalks = Array.from({ length: count }, (_, i) => ({ dx: i * 11 + r() * 6, hh: h * (0.75 + r() * 0.25), lean: (r() - 0.5) * 18 }))
  return (
    <g>
      {stalks.map((s, i) => {
        const top: Point = [x + s.dx + s.lean, y - s.hh]
        return (
          <g key={i}>
            <path d={`M${x + s.dx},${y} Q${x + s.dx + s.lean * 0.3},${y - s.hh / 2} ${top[0]},${top[1]}`} stroke={INK} strokeWidth={6} fill="none" />
            <path d={`M${x + s.dx},${y} Q${x + s.dx + s.lean * 0.3},${y - s.hh / 2} ${top[0]},${top[1]}`} stroke={color} strokeWidth={4} fill="none" />
            {[0.25, 0.45, 0.65, 0.82].map(t => (
              <line key={t} x1={x + s.dx + s.lean * t * t - 3} y1={y - s.hh * t} x2={x + s.dx + s.lean * t * t + 3} y2={y - s.hh * t} stroke={INK} strokeWidth={1.5} />
            ))}
            {[0, 1, 2, 3, 4].map(k => {
              const ly = top[1] + k * 14 + r() * 6
              const lx = top[0] - s.lean * (k / 6)
              const dir = k % 2 === 0 ? 1 : -1
              return <path key={k} d={`M${lx},${ly} q${dir * 12},-4 ${dir * 26},4 q${-dir * 14},2 ${-dir * 26},-4 Z`} fill={C.leaf} stroke={INK} strokeWidth={1} />
            })}
          </g>
        )
      })}
    </g>
  )
}

/** Round-canopy tree (banyan / longan). */
export function Tree({ x, y, s = 1, color = C.leaf, dark = C.leafDark }: { x: number; y: number; s?: number; color?: string; dark?: string }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`}>
      <path d="M-7,0 C-6,-30 -10,-48 -4,-62 L4,-62 C10,-48 6,-30 8,0 Z" fill={C.woodDark} stroke={INK} strokeWidth={2} />
      <path d="M-4,-50 L-20,-66 M4,-56 L18,-72" stroke={C.woodDark} strokeWidth={4} />
      {[[-26, -78, 26], [0, -98, 32], [26, -80, 26], [-10, -70, 24], [14, -66, 22]].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={i % 2 ? dark : color} stroke={INK} strokeWidth={2} />
      ))}
      {[[-16, -92], [8, -112], [22, -86], [-30, -74]].map(([cx, cy], i) => (
        <path key={i} d={`M${cx},${cy} q6,-6 12,0`} stroke="#8bc48a" strokeOpacity={0.5} strokeWidth={2} fill="none" />
      ))}
    </g>
  )
}

export function Palm({ x, y, h = 150, flip = false }: { x: number; y: number; h?: number; flip?: boolean }) {
  const lean = flip ? -24 : 24
  const top: Point = [x + lean, y - h]
  return (
    <g>
      <path d={`M${x - 5},${y} Q${x + lean * 0.2},${y - h / 2} ${top[0] - 3},${top[1]} L${top[0] + 3},${top[1]} Q${x + lean * 0.2 + 8},${y - h / 2} ${x + 5},${y} Z`} fill="#6b4a2b" stroke={INK} strokeWidth={2} />
      {[-150, -110, -60, -20, 20, 60].map((a, i) => {
        const rad = (a * Math.PI) / 180
        const ex = top[0] + Math.cos(rad) * 60
        const ey = top[1] + Math.sin(rad) * 30 + 22
        return <path key={i} d={`M${top[0]},${top[1]} Q${(top[0] + ex) / 2},${Math.min(top[1], ey) - 18} ${ex},${ey}`} stroke={C.leaf} strokeWidth={7} fill="none" strokeLinecap="round" />
      })}
      <circle cx={top[0] - 4} cy={top[1] + 6} r={5} fill="#8a6a2a" stroke={INK} />
      <circle cx={top[0] + 5} cy={top[1] + 7} r={5} fill="#8a6a2a" stroke={INK} />
    </g>
  )
}

/** Flooded rice paddy with rows of seedlings. */
export function Paddy({ x, y, w, h, water = '#2d4a5e', plant = C.rice, rows = 4, height = 10, gold = false }: {
  x: number; y: number; w: number; h: number; water?: string; plant?: string; rows?: number; height?: number; gold?: boolean
}) {
  return (
    <g>
      <path d={`M${x},${y} L${x + w},${y} L${x + w + 14},${y + h} L${x - 14},${y + h} Z`} fill={water} stroke={INK} strokeWidth={2} />
      <path d={`M${x + 4},${y + 3} L${x + w - 4},${y + 3}`} stroke="#9cc3ff" strokeOpacity={0.25} strokeWidth={1.5} />
      {Array.from({ length: rows }, (_, row) => {
        const ry = y + ((row + 1) * h) / (rows + 1)
        const count = Math.round(w / 18)
        return Array.from({ length: count }, (_, i) => {
          const px = x - 6 + ((i + 0.5) * (w + 12)) / count
          return (
            <g key={`${row}-${i}`}>
              <path d={`M${px},${ry} l-3,-${height} M${px},${ry} l0,-${height + 3} M${px},${ry} l3,-${height}`} stroke={plant} strokeWidth={1.8} strokeLinecap="round" />
              {gold && <circle cx={px + 2} cy={ry - height - 2} r={2.2} fill={C.gold} />}
            </g>
          )
        })
      })}
    </g>
  )
}

/** A gentle path for figures to walk on. */
export function Path({ points, width = 26, color = '#a89175' }: { points: Point[]; width?: number; color?: string }) {
  const d = smooth(points)
  return (
    <g>
      <path d={d} stroke={INK} strokeWidth={width + 3} fill="none" strokeLinecap="round" opacity={0.7} />
      <path d={d} stroke={color} strokeWidth={width} fill="none" strokeLinecap="round" />
    </g>
  )
}

/** Tết blossom tree: pink for hoa đào (North), yellow for hoa mai (South). */
export function BlossomTree({ x, y, s = 1, color = '#f9a8d4', seed = 21, flip = false }: {
  x: number; y: number; s?: number; color?: string; seed?: number; flip?: boolean
}) {
  const r = rng(seed)
  const branches = ['M0,0 C2,-40 -6,-70 -2,-110', 'M-2,-70 C-20,-84 -34,-96 -44,-120', 'M-1,-88 C14,-100 30,-112 38,-136', 'M-2,-104 C-8,-124 -2,-140 4,-150', 'M-30,-96 C-46,-98 -58,-104 -66,-100', 'M24,-106 C40,-104 52,-110 60,-118']
  const tips: Point[] = [[-2, -110], [-44, -120], [38, -136], [4, -150], [-66, -100], [60, -118], [-20, -84], [14, -100], [-30, -130], [30, -150]]
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      {branches.map((d, i) => <path key={i} d={d} stroke={INK} strokeWidth={i ? 5 : 9} fill="none" strokeLinecap="round" />)}
      {branches.map((d, i) => <path key={`b${i}`} d={d} stroke="#4a2c1e" strokeWidth={i ? 3 : 6} fill="none" strokeLinecap="round" />)}
      {tips.flatMap((t, i) =>
        Array.from({ length: 5 }, (_, k) => {
          const bx = t[0] + (r() - 0.5) * 30
          const by = t[1] + (r() - 0.5) * 22
          return (
            <g key={`${i}-${k}`}>
              <circle cx={bx} cy={by} r={4.5} fill={color} stroke={INK} strokeWidth={0.8} />
              <circle cx={bx} cy={by} r={1.4} fill="#fff7d6" />
            </g>
          )
        }),
      )}
    </g>
  )
}

/** A firework burst. */
export function Firework({ x, y, r = 34, color = '#a87934' }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g opacity={0.82}>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (Math.PI * 2 * i) / 16
        const x1 = x + Math.cos(a) * r * 0.35
        const y1 = y + Math.sin(a) * r * 0.35
        const x2 = x + Math.cos(a) * r
        const y2 = y + Math.sin(a) * r
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.6} strokeLinecap="round" />
            <circle cx={x2} cy={y2} r={1.8} fill="#fff7d6" />
          </g>
        )
      })}
    </g>
  )
}
