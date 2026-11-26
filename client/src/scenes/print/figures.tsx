import type { ReactNode } from 'react'
import { INK, PIGMENT } from './pigments'

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
  /** Extra drawing in the figure's own coordinates (feet at 0,0, head centre at 0,-86). */
  children?: ReactNode
}

const HANDS: Record<Pose, [[number, number], [number, number]]> = {
  stand: [[-17, -40], [17, -40]],
  wave: [[-17, -40], [24, -102]],
  hold: [[-8, -56], [8, -56]],
  point: [[-17, -40], [38, -70]],
  reach: [[-8, -56], [32, -60]],
  work: [[-4, -48], [24, -52]],
}

const LINE = 2.6

/**
 * A Đông Hồ-style figure: bold ink outline, flat pigment, round face with rosy cheeks.
 * `x, y` is the point between the feet; the figure is about 100 units tall at s = 1.
 */
export function Person({
  x, y, s = 1, robe = PIGMENT.blue, pants = PIGMENT.woodDark, sash = PIGMENT.yellow, hat = 'none', hatColor,
  pose = 'stand', long = true, armor = false, flip = false, children,
}: PersonProps) {
  const [lh, rh] = HANDS[pose]
  const hem = long ? -12 : -38
  const front = pose === 'stand' || pose === 'wave' || pose === 'point'
  const arm = (hand: [number, number], side: 1 | -1) => {
    const sx = 12 * side
    const d = `M${sx},-67 Q${(sx + hand[0]) / 2 + side * 3},${(-67 + hand[1]) / 2 + 4} ${hand[0]},${hand[1]}`
    return (
      <g key={side}>
        <path d={d} stroke={INK} strokeWidth={12} fill="none" strokeLinecap="round" />
        <path d={d} stroke={robe} strokeWidth={7} fill="none" strokeLinecap="round" />
        <circle cx={hand[0]} cy={hand[1]} r={4} fill={PIGMENT.skin} stroke={INK} strokeWidth={1.8} />
      </g>
    )
  }

  return (
    <g transform={`translate(${x},${y}) scale(${flip ? -s : s},${s})`}>
      <ellipse cx={0} cy={2} rx={20} ry={3.4} fill={INK} opacity={0.18} />
      <rect x={-9} y={hem - 2} width={8} height={-hem} fill={pants} stroke={INK} strokeWidth={2.2} />
      <rect x={1} y={hem - 2} width={8} height={-hem} fill={pants} stroke={INK} strokeWidth={2.2} />
      <ellipse cx={-5.5} cy={0} rx={6} ry={3} fill={INK} />
      <ellipse cx={5.5} cy={0} rx={6} ry={3} fill={INK} />
      {front ? arm(lh, -1) : null}
      <path
        d={`M-13,-70 C-15,-60 ${long ? '-19,-30 -22,-12' : '-16,-46 -17,-38'} L${long ? 22 : 17},${hem} C${long ? '19,-30' : '16,-46'} 15,-60 13,-70 Q0,-75 -13,-70 Z`}
        fill={robe}
        stroke={INK}
        strokeWidth={LINE}
        strokeLinejoin="round"
      />
      {long && <path d="M0,-50 L0,-12" stroke={INK} strokeWidth={1.4} opacity={0.55} />}
      {armor && (
        <g>
          <rect x={-11} y={-68} width={22} height={21} rx={3} fill={PIGMENT.bronze} stroke={INK} strokeWidth={2} />
          <path d="M-11,-61 L11,-61 M-11,-54 L11,-54" stroke={INK} strokeWidth={1.3} />
          <ellipse cx={-14} cy={-67} rx={6.5} ry={4.5} fill={PIGMENT.bronze} stroke={INK} strokeWidth={2} />
          <ellipse cx={14} cy={-67} rx={6.5} ry={4.5} fill={PIGMENT.bronze} stroke={INK} strokeWidth={2} />
        </g>
      )}
      <rect x={-13.5} y={-49} width={27} height={5} fill={sash} stroke={INK} strokeWidth={1.5} />
      <path d="M-5,-72 L0,-64 L5,-72" stroke={INK} strokeWidth={1.8} fill="none" strokeLinejoin="round" />
      {front ? arm(rh, 1) : [arm(lh, -1), arm(rh, 1)]}
      <rect x={-3} y={-78} width={6} height={8} fill={PIGMENT.skin} stroke={INK} strokeWidth={1.4} />
      <circle cx={0} cy={-86} r={11} fill={PIGMENT.skin} stroke={INK} strokeWidth={LINE} />
      <path d="M-11,-87 A11,11 0 0 1 11,-87 Q0,-92 -11,-87 Z" fill={INK} />
      <circle cx={-6.2} cy={-81.5} r={2.3} fill={PIGMENT.cheek} opacity={0.75} />
      <circle cx={6.2} cy={-81.5} r={2.3} fill={PIGMENT.cheek} opacity={0.75} />
      <path d="M-5.2,-85 Q-3.6,-86.4 -2,-85 M2,-85 Q3.6,-86.4 5.2,-85" stroke={INK} strokeWidth={1.4} fill="none" strokeLinecap="round" />
      <path d="M-2,-80.6 Q0,-79 2,-80.6" stroke={INK} strokeWidth={1.2} fill="none" strokeLinecap="round" />
      <g transform="translate(0,-86) scale(1.22) translate(0,84)">
        <HatShape hat={hat} color={hatColor} />
      </g>
      {children}
    </g>
  )
}

/** Hats, drawn for a head of radius 9 centred at (0, -84); Person scales them to its larger head. */
function HatShape({ hat, color }: { hat: Hat; color?: string }) {
  switch (hat) {
    case 'nonLa':
      return (
        <g>
          <path d="M-25,-86 Q0,-116 25,-86 Q0,-80 -25,-86 Z" fill={color ?? PIGMENT.straw} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
          <path d="M-15,-90 Q0,-92 15,-90 M-8,-99 Q0,-100 8,-99" stroke={PIGMENT.strawDark} strokeWidth={1.2} fill="none" />
        </g>
      )
    case 'khanXep':
      return (
        <g>
          <ellipse cx={0} cy={-91} rx={10.5} ry={5.4} fill={color ?? INK} stroke={INK} strokeWidth={1.6} />
          <path d="M-9,-92 Q0,-95 9,-92 M-10,-89 Q0,-92 10,-89" stroke={PIGMENT.steel} strokeWidth={0.9} fill="none" opacity={0.6} />
        </g>
      )
    case 'official':
      return (
        <g>
          <ellipse cx={-17} cy={-92} rx={8} ry={3} fill={color ?? INK} stroke={PIGMENT.yellow} strokeWidth={1.2} />
          <ellipse cx={17} cy={-92} rx={8} ry={3} fill={color ?? INK} stroke={PIGMENT.yellow} strokeWidth={1.2} />
          <path d="M-9.5,-87 Q0,-106 9.5,-87 Z" fill={color ?? INK} stroke={INK} strokeWidth={1.6} />
          <rect x={-9.5} y={-90} width={19} height={3} fill={PIGMENT.yellow} />
        </g>
      )
    case 'crown':
      return (
        <g>
          <path d="M-10,-88 L-11,-101 L-5,-95 L0,-106 L5,-95 L11,-101 L10,-88 Z" fill={color ?? PIGMENT.yellow} stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
          <circle cx={0} cy={-95} r={2} fill={PIGMENT.red} />
        </g>
      )
    case 'helmet':
      return (
        <g>
          <path d="M3,-100 Q10,-112 16,-108 Q10,-104 6,-98 Z" fill={PIGMENT.red} stroke={INK} strokeWidth={1.2} />
          <path d="M-10.5,-85 Q0,-106 10.5,-85 Z" fill={color ?? PIGMENT.bronze} stroke={INK} strokeWidth={1.8} />
          <rect x={-11} y={-87} width={22} height={3} fill={PIGMENT.bronzeDark} />
        </g>
      )
    case 'bun':
      return (
        <g>
          <circle cx={0} cy={-95} r={5.2} fill={INK} />
          <line x1={-7} y1={-97} x2={7} y2={-93} stroke={color ?? PIGMENT.yellow} strokeWidth={1.6} />
        </g>
      )
    case 'topknot':
      return <circle cx={0} cy={-95} r={3.6} fill={INK} />
    default:
      return null
  }
}
