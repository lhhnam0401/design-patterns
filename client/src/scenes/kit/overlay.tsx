import type { Point } from '../types'
import { url, useSceneIds } from './ids'
import { monoWidth, tagBox } from './metrics'
import { INK, TONES, type Tone } from './palette'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const SANS = 'Inter, ui-sans-serif, system-ui, "Segoe UI", Roboto, sans-serif'

interface TagProps {
  name: string
  method?: string
  caption: string
  at: Point
  to?: Point
  tone: Tone
}

/** A code-name tag: class name, optional `.method()`, and a caption in the page language. */
export function Tag({ name, method, caption, at, to, tone }: TagProps) {
  const color = TONES[tone]
  const call = method ? `.${method}()` : null
  const { left, top, width: w, height: h } = tagBox(name, method, caption, at)

  let from: Point | null = null
  if (to) {
    const cx = Math.min(Math.max(to[0], left + 8), left + w - 8)
    const cy = Math.min(Math.max(to[1], top + 8), top + h - 8)
    if (to[1] > top + h) from = [cx, top + h]
    else if (to[1] < top) from = [cx, top]
    else from = [to[0] < left ? left : left + w, cy]
  }

  return (
    <g>
      {to && from && (
        <g>
          <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="#05070d" strokeOpacity={0.6} strokeWidth={3.5} />
          <line x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke={color} strokeWidth={1.4} strokeDasharray="3 3" />
          <circle cx={to[0]} cy={to[1]} r={6} fill={color} fillOpacity={0.25} />
          <circle cx={to[0]} cy={to[1]} r={3} fill={color} stroke={INK} strokeWidth={1} />
        </g>
      )}
      <rect x={left} y={top} width={w} height={h} rx={7} fill="#0a0f1d" fillOpacity={0.88} stroke={color} strokeOpacity={0.85} strokeWidth={1.3} />
      <rect x={left + 5} y={top + 7} width={3} height={h - 14} rx={1.5} fill={color} />
      <text x={left + 14} y={top + 17} fontFamily={MONO} fontSize={12.5} fontWeight={700} fill={color}>{name}</text>
      {call && <text x={left + 14} y={top + 31} fontFamily={MONO} fontSize={11} fill="#e2e8f0">{call}</text>}
      <text x={left + 14} y={top + h - 9} fontFamily={SANS} fontSize={10.5} fill="#cbd5e1">{caption}</text>
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

/** A method-call arrow. The `method()` label is hidden in compact mode; the arrow stays. */
export function Call({ d, method, at, tone, compact }: CallProps) {
  const ids = useSceneIds()
  const color = TONES[tone]
  const label = `${method}()`
  const w = monoWidth(label, 11) + 14
  return (
    <g>
      <path d={d} fill="none" stroke="#05070d" strokeOpacity={0.55} strokeWidth={5.5} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={2.2} strokeDasharray="8 5" strokeLinecap="round" markerEnd={url(ids.arrow[tone])} />
      {!compact && at && (
        <g>
          <rect x={at[0] - w / 2} y={at[1] - 10} width={w} height={20} rx={10} fill={color} stroke={INK} strokeWidth={1} />
          <text x={at[0]} y={at[1] + 4} textAnchor="middle" fontFamily={MONO} fontSize={11} fontWeight={700} fill={INK}>{label}</text>
        </g>
      )}
    </g>
  )
}

/** Plain localized text inside the art, e.g. a signboard or a price. */
export function Caption({ x, y, children, size = 12, fill = '#f6ead2', anchor = 'middle', weight = 600 }: {
  x: number; y: number; children: string; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={SANS} fontSize={size} fontWeight={weight} fill={fill}>{children}</text>
  )
}
