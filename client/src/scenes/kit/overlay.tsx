import type { ReactNode } from 'react'
import type { Point } from '../types'
import { useSceneIds, url } from './ids'
import { tagBox, monoWidth } from './metrics'
import { useSceneVariant } from './mode'
import { INK, SCENE_COLORS, TONES, type Tone } from './palette'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const SANS = '"IBM Plex Sans Variable", "Segoe UI", sans-serif'

const DASH: Record<Tone, string | undefined> = {
  client: undefined,
  class: undefined,
  abstract: '7 4',
  interface: '2 3',
}

function ToneMark({ tone, x, y, color }: { tone: Tone; x: number; y: number; color: string }) {
  if (tone === 'client') return <circle cx={x} cy={y} r={3.5} fill={color} />
  if (tone === 'class') return <rect x={x - 3.5} y={y - 3.5} width={7} height={7} fill={color} />
  if (tone === 'abstract') return <path d={`M${x},${y - 5} L${x + 5},${y} L${x},${y + 5} L${x - 5},${y} Z`} fill={color} />
  return <path d={`M${x},${y - 5} L${x + 5},${y + 4} L${x - 5},${y + 4} Z`} fill={color} />
}

interface TagProps {
  name: string
  method?: string
  caption: string
  at: Point
  to?: Point
  tone: Tone
}

/** A paper technical note pinned to an object in the illustration. */
export function Tag({ name, method, caption, at, to, tone }: TagProps) {
  const color = TONES[tone]
  const call = method ? `.${method}()` : null
  const { left, top, width, height } = tagBox(name, method, caption, at)

  let from: Point | null = null
  if (to) {
    const x = Math.min(Math.max(to[0], left + 8), left + width - 8)
    const y = Math.min(Math.max(to[1], top + 8), top + height - 8)
    if (to[1] > top + height) from = [x, top + height]
    else if (to[1] < top) from = [x, top]
    else from = [to[0] < left ? left : left + width, y]
  }

  return (
    <g data-scene-tag="true">
      {to && from && (
        <g>
          <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={SCENE_COLORS.paperLight} strokeWidth={4} />
          <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={1.8} strokeDasharray={DASH[tone]} />
          <circle cx={to[0]} cy={to[1]} r={6} fill={SCENE_COLORS.paperLight} stroke={color} strokeWidth={1.5} />
          <ToneMark tone={tone} x={to[0]} y={to[1]} color={color} />
        </g>
      )}
      <rect x={left} y={top} width={width} height={height} rx={2} fill={SCENE_COLORS.paperLight} fillOpacity={0.97} stroke={INK} strokeWidth={1.2} />
      <rect x={left} y={top} width={5} height={height} fill={color} />
      <ToneMark tone={tone} x={left + 10} y={top + 13} color={color} />
      <text x={left + 18} y={top + 17} fontFamily={MONO} fontSize={12.5} fontWeight={700} fill={INK}>{name}</text>
      {call && <text x={left + 14} y={top + 31} fontFamily={MONO} fontSize={11} fill={color}>{call}</text>}
      <text x={left + 14} y={top + height - 9} fontFamily={SANS} fontSize={10.5} fontWeight={550} fill={SCENE_COLORS.inkMuted}>{caption}</text>
    </g>
  )
}

interface CallProps {
  d: string
  method: string
  at?: Point
  tone: Tone
  compact: boolean
}

/** A printed method-flow line. Labels appear only on the detailed plate. */
export function Call({ d, method, at, tone, compact }: CallProps) {
  const ids = useSceneIds()
  const color = TONES[tone]
  const label = `${method}()`
  const width = monoWidth(label, 11) + 14
  return (
    <g data-scene-call="true">
      <path d={d} fill="none" stroke={SCENE_COLORS.paperLight} strokeWidth={4.5} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeDasharray={DASH[tone] ?? '9 5'} strokeLinecap="round" markerEnd={url(ids.arrow[tone])} />
      {!compact && at && (
        <g data-scene-call-label="true">
          <rect x={at[0] - width / 2} y={at[1] - 10} width={width} height={20} rx={1} fill={SCENE_COLORS.paperLight} stroke={color} strokeWidth={1.2} />
          <text x={at[0]} y={at[1] + 4} textAnchor="middle" fontFamily={MONO} fontSize={11} fontWeight={700} fill={INK}>{label}</text>
        </g>
      )}
    </g>
  )
}

/** Localized text inside the art, hidden from quiet card thumbnails. */
export function Caption({ x, y, children, size = 12, fill = INK, anchor = 'middle', weight = 600 }: {
  x: number
  y: number
  children: ReactNode
  size?: number
  fill?: string
  anchor?: 'start' | 'middle' | 'end'
  weight?: number
}) {
  const variant = useSceneVariant()
  if (variant === 'thumbnail') return null
  return (
    <text data-scene-caption="true" x={x} y={y} textAnchor={anchor} fontFamily={SANS} fontSize={size} fontWeight={weight} fill={fill}>
      {children}
    </text>
  )
}
