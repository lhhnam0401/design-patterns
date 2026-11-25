import type { ReactNode } from 'react'
import { C, HAIR, INK, SKIN } from './palette'

export type Hat = 'none' | 'nonLa' | 'khanXep' | 'official' | 'crown' | 'helmet' | 'bun' | 'topknot'
export type Pose = 'stand' | 'wave' | 'hold' | 'point' | 'reach' | 'work'

interface PersonProps {
  x: number
  y: number
  s?: number
  robe?: string
  pants?: string
  sash?: string
  hat?: Hat
  hatColor?: string
  pose?: Pose
  long?: boolean
  armor?: boolean
  flip?: boolean
  dim?: boolean
  /** Extra drawing in the figure's own coordinates (feet at 0,0, head near y = -84). */
  children?: ReactNode
}

const HANDS: Record<Pose, [[number, number], [number, number]]> = {
  stand: [[-16, -42], [16, -42]],
  wave: [[-16, -42], [22, -100]],
  hold: [[-7, -56], [7, -56]],
  point: [[-16, -42], [36, -70]],
  reach: [[-7, -56], [30, -58]],
  work: [[-4, -48], [22, -52]],
}

/** A woodblock-style figure. `x, y` is the point between the feet. */
export function Person({
  x, y, s = 1, robe = '#8d5038', pants = '#5d5549', sash = C.gold, hat = 'none', hatColor,
  pose = 'stand', long = true, armor = false, flip = false, dim = false, children,
}: PersonProps) {
  const [lh, rh] = HANDS[pose]
  const hem = long ? -12 : -38
  const arm = (hand: [number, number], side: 1 | -1) => {
    const sx = 12 * side
    const d = `M${sx},-67 Q${(sx + hand[0]) / 2 + side * 3},${(-67 + hand[1]) / 2 + 4} ${hand[0]},${hand[1]}`
    return (
      <g key={side}>
        <path d={d} stroke={INK} strokeWidth={9.5} fill="none" strokeLinecap="round" />
        <path d={d} stroke={robe} strokeWidth={6.5} fill="none" strokeLinecap="round" />
        <circle cx={hand[0]} cy={hand[1]} r={3.4} fill={SKIN} stroke={INK} strokeWidth={1.2} />
      </g>
    )
  }

  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`} opacity={dim ? 0.38 : 1}>
      <ellipse cx={0} cy={2} rx={18} ry={3} fill={INK} opacity={0.16} />
      <rect x={-8} y={hem - 2} width={7} height={-hem} fill={pants} stroke={INK} strokeWidth={1.5} />
      <rect x={1} y={hem - 2} width={7} height={-hem} fill={pants} stroke={INK} strokeWidth={1.5} />
      <ellipse cx={-5} cy={0} rx={5} ry={2.6} fill={INK} />
      <ellipse cx={5} cy={0} rx={5} ry={2.6} fill={INK} />
      {pose === 'stand' || pose === 'wave' || pose === 'point' ? arm(lh, -1) : null}
      <path
        d={`M-12,-70 C-14,-60 ${long ? '-18,-30 -21,-12' : '-15,-46 -16,-38'} L${long ? 21 : 16},${hem} C${long ? '18,-30' : '15,-46'} 14,-60 12,-70 Q0,-74 -12,-70 Z`}
        fill={robe}
        stroke={INK}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {long && <path d="M0,-50 L0,-12" stroke={INK} strokeWidth={1.2} opacity={0.5} />}
      {armor && (
        <g>
          <rect x={-10} y={-68} width={20} height={20} rx={3} fill={C.bronze} stroke={INK} strokeWidth={1.5} />
          <path d="M-10,-61 L10,-61 M-10,-55 L10,-55" stroke={INK} strokeWidth={1} />
          <ellipse cx={-13} cy={-67} rx={6} ry={4} fill={C.bronze} stroke={INK} strokeWidth={1.5} />
          <ellipse cx={13} cy={-67} rx={6} ry={4} fill={C.bronze} stroke={INK} strokeWidth={1.5} />
        </g>
      )}
      <rect x={-12.5} y={-49} width={25} height={4} fill={sash} stroke={INK} strokeWidth={1} />
      <path d="M-5,-71 L0,-64 L5,-71" stroke={INK} strokeWidth={1.4} fill="none" />
      {pose === 'stand' || pose === 'wave' || pose === 'point' ? arm(rh, 1) : [arm(lh, -1), arm(rh, 1)]}
      <rect x={-2.5} y={-77} width={5} height={7} fill={SKIN} />
      <circle cx={0} cy={-84} r={9} fill={SKIN} stroke={INK} strokeWidth={1.8} />
      <path d="M-9,-85 A9,9 0 0 1 9,-85 Q0,-89 -9,-85 Z" fill={HAIR} />
      <circle cx={-3} cy={-83.5} r={0.95} fill={INK} />
      <circle cx={3} cy={-83.5} r={0.95} fill={INK} />
      <path d="M-1.6,-79.6 Q0,-78.6 1.6,-79.6" stroke={INK} strokeWidth={0.8} fill="none" />
      <HatShape hat={hat} color={hatColor} />
      {children}
    </g>
  )
}

function HatShape({ hat, color }: { hat: Hat; color?: string }) {
  switch (hat) {
    case 'nonLa':
      return (
        <g>
          <path d="M-24,-86 Q0,-114 24,-86 Q0,-81 -24,-86 Z" fill={color ?? '#e6cf98'} stroke={INK} strokeWidth={1.8} />
          <path d="M-14,-90 Q0,-92 14,-90 M-7,-98 Q0,-99 7,-98" stroke="#a88a52" strokeWidth={1} fill="none" />
        </g>
      )
    case 'khanXep':
      return (
        <g>
          <ellipse cx={0} cy={-91} rx={10.5} ry={5.2} fill={color ?? '#151515'} stroke={INK} strokeWidth={1.5} />
          <path d="M-9,-92 Q0,-95 9,-92 M-10,-89 Q0,-92 10,-89" stroke="#555" strokeWidth={0.9} fill="none" />
        </g>
      )
    case 'official':
      return (
        <g>
          <ellipse cx={-17} cy={-92} rx={8} ry={3} fill={color ?? '#111'} stroke={C.gold} strokeWidth={1} />
          <ellipse cx={17} cy={-92} rx={8} ry={3} fill={color ?? '#111'} stroke={C.gold} strokeWidth={1} />
          <path d="M-9.5,-87 Q0,-106 9.5,-87 Z" fill={color ?? '#111'} stroke={INK} strokeWidth={1.5} />
          <rect x={-9.5} y={-90} width={19} height={3} fill={C.gold} />
        </g>
      )
    case 'crown':
      return (
        <g>
          <path d="M-10,-88 L-11,-101 L-5,-95 L0,-106 L5,-95 L11,-101 L10,-88 Z" fill={color ?? C.gold} stroke={INK} strokeWidth={1.5} />
          <circle cx={0} cy={-95} r={2} fill="#dc2626" />
        </g>
      )
    case 'helmet':
      return (
        <g>
          <path d="M3,-100 Q10,-112 16,-108 Q10,-104 6,-98 Z" fill="#b91c1c" stroke={INK} strokeWidth={1} />
          <path d="M-10.5,-85 Q0,-106 10.5,-85 Z" fill={color ?? C.bronze} stroke={INK} strokeWidth={1.6} />
          <rect x={-11} y={-87} width={22} height={3} fill={C.goldDark} />
        </g>
      )
    case 'bun':
      return (
        <g>
          <circle cx={0} cy={-95} r={5.2} fill={HAIR} />
          <line x1={-7} y1={-97} x2={7} y2={-93} stroke={color ?? C.gold} strokeWidth={1.4} />
        </g>
      )
    case 'topknot':
      return <circle cx={0} cy={-95} r={3.6} fill={HAIR} />
    default:
      return null
  }
}

/** Side-view horse, facing right. `x, y` is the point between the hooves. */
export function Horse({ x, y, s = 1, color = '#6b3a1f', mane = '#1c1210', flip = false }: {
  x: number; y: number; s?: number; color?: string; mane?: string; flip?: boolean
}) {
  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <ellipse cx={0} cy={2} rx={42} ry={5} fill="#000" opacity={0.3} />
      {[[-26, -6], [-16, 4], [18, -4], [28, 6]].map(([lx, sway], i) => (
        <path key={i} d={`M${lx},-36 L${lx + sway * 0.4},-14 L${lx + sway * 0.2},0`} stroke={INK} strokeWidth={7} strokeLinecap="round" fill="none" />
      ))}
      {[[-26, -6], [-16, 4], [18, -4], [28, 6]].map(([lx, sway], i) => (
        <path key={`c${i}`} d={`M${lx},-36 L${lx + sway * 0.4},-14 L${lx + sway * 0.2},0`} stroke={color} strokeWidth={4.5} strokeLinecap="round" fill="none" />
      ))}
      <path d="M-36,-50 Q-50,-44 -52,-24 Q-44,-36 -36,-38 Z" fill={mane} stroke={INK} strokeWidth={1.5} />
      <ellipse cx={0} cy={-44} rx={38} ry={16} fill={color} stroke={INK} strokeWidth={2} />
      <path d="M26,-52 Q34,-74 46,-80 L58,-70 Q50,-66 46,-60 Q40,-48 34,-38 Z" fill={color} stroke={INK} strokeWidth={2} />
      <path d="M28,-56 Q34,-76 46,-82 Q40,-70 36,-52 Z" fill={mane} />
      <ellipse cx={54} cy={-72} rx={9} ry={6} fill={color} stroke={INK} strokeWidth={2} transform="rotate(30 54 -72)" />
      <circle cx={50} cy={-76} r={1.4} fill={INK} />
      <path d="M-14,-58 L10,-58 L12,-40 L-12,-40 Z" fill={C.lacquer} stroke={INK} strokeWidth={1.5} />
      <path d="M-14,-58 L10,-58" stroke={C.gold} strokeWidth={2} />
    </g>
  )
}
