import { TONES, type Tone } from '../print/pigments'

const SHAPES: Record<Tone, string> = {
  client: 'M4.5,0.5 A4,4 0 1 1 4.49,0.5 Z',
  class: 'M0.75,0.75 H8.25 V8.25 H0.75 Z',
  abstract: 'M4.5,0 L9,4.5 L4.5,9 L0,4.5 Z',
  interface: 'M4.5,0.5 L9,8.5 H0 Z',
}

/** The shape and colour that mark a node's kind: ● client, ■ class, ◆ abstract class, ▲ interface. */
export default function ToneMark({ tone, className = '' }: { tone: Tone; className?: string }) {
  return (
    <svg viewBox="0 0 9 9" width="9" height="9" aria-hidden="true" focusable="false" className={`shrink-0 ${className}`} data-tone={tone}>
      <path d={SHAPES[tone]} fill={TONES[tone]} />
    </svg>
  )
}
