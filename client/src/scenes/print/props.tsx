import { INK, PAPER_LIGHT, PIGMENT } from './pigments'

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
