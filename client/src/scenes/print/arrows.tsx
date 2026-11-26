import { litProps, useCallLit } from '../explorer/HighlightContext'
import { url, usePlateIds, type PlateIds } from './context'
import { PAPER_LIGHT, TONES, type Tone } from './pigments'

const TONE_KEYS = Object.keys(TONES) as Tone[]

/** Arrowheads for every tone: filled for calls, open for returns (as in UML sequence diagrams). */
export function ArrowMarkers({ ids }: { ids: PlateIds }) {
  return (
    <>
      {TONE_KEYS.map(tone => (
        <marker key={`c-${tone}`} id={ids.call[tone]} viewBox="0 0 12 12" refX="9" refY="6" markerWidth="16" markerHeight="16" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M0,1 L11,6 L0,11 Z" fill={TONES[tone]} stroke={PAPER_LIGHT} strokeWidth="1" strokeLinejoin="round" />
        </marker>
      ))}
      {TONE_KEYS.map(tone => (
        <marker key={`r-${tone}`} id={ids.ret[tone]} viewBox="0 0 12 12" refX="10" refY="6" markerWidth="16" markerHeight="16" markerUnits="userSpaceOnUse" orient="auto-start-reverse">
          <path d="M1,1 L10,6 L1,11" fill="none" stroke={TONES[tone]} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      ))}
    </>
  )
}

/** One method-call arrow. A paper casing keeps it readable over the art. */
export function CallPath({ id, d, tone, kind = 'call' }: { id: string; d: string; tone: Tone; kind?: 'call' | 'return' }) {
  const ids = usePlateIds()
  const state = useCallLit(id)
  const ret = kind === 'return'
  return (
    <g data-call={id} data-call-kind={kind} {...litProps(state)}>
      <path d={d} fill="none" stroke={PAPER_LIGHT} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        fill="none"
        stroke={TONES[tone]}
        strokeWidth={4.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={ret ? '10 8' : undefined}
        markerEnd={url(ret ? ids.ret[tone] : ids.call[tone])}
      />
    </g>
  )
}
