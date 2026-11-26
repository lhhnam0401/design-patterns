import type { DiagramNode } from '../../types/pattern'
import { H, W } from '../print/layout'
import type { SceneDefinition } from '../types'
import type { Highlight } from './highlight'
import { pinLetter, toneOf } from './nodes'
import ToneMark from './ToneMark'

interface Props {
  definition: SceneDefinition
  nodes: Map<string, DiagramNode>
  highlight: Highlight | null
  step: number | null
  onHover: (node: string | null) => void
  onToggle: (node: string) => void
  onStep: (index: number) => void
}

const place = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` })

/**
 * Lettered pins and numbered step badges over the plate. The layer is hidden from
 * assistive technology: the legend and step player below carry the same content.
 * Sizes match pinMetrics.ts (20px badges below 560px, 24px with name chips above).
 */
export default function Pins({ definition, nodes, highlight, step, onHover, onToggle, onStep }: Props) {
  return (
    <div
      aria-hidden="true"
      data-scene-pins="true"
      className="pointer-events-none absolute inset-0 select-none [--pin-half:10px] @min-[560px]:[--pin-half:12px]"
    >
      {definition.pins.map((pin, index) => {
        const node = nodes.get(pin.nodeId)
        const letter = pinLetter(index)
        const lit = highlight?.nodes.has(pin.nodeId)
        const dimmed = highlight && !lit
        const left = pin.side === 'left'
        return (
          <span
            key={`${pin.nodeId}-${index}`}
            data-pin={letter}
            data-pin-node={pin.nodeId}
            data-lit={lit ? 'true' : undefined}
            className={`pointer-events-auto absolute flex cursor-pointer items-center gap-1 transition-opacity duration-200 ease-out ${left ? 'flex-row-reverse' : ''} ${dimmed ? 'opacity-40' : ''}`}
            style={{
              ...place(pin.at[0], pin.at[1]),
              transform: left ? 'translate(calc(-100% + var(--pin-half)), -50%)' : 'translate(calc(-1 * var(--pin-half)), -50%)',
            }}
            onPointerEnter={() => onHover(pin.nodeId)}
            onPointerLeave={() => onHover(null)}
            onClick={() => onToggle(pin.nodeId)}
          >
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-semibold leading-none ring-2 transition-colors duration-200 ease-out @min-[560px]:h-6 @min-[560px]:w-6 @min-[560px]:text-xs ${
                lit ? 'bg-accent text-accent-ink ring-accent-ink' : 'bg-ink text-surface ring-surface'
              }`}
            >
              {letter}
            </span>
            {pin.showName !== false && (
              <span className="hidden h-6 items-center gap-[5px] whitespace-nowrap rounded-sm border border-ink bg-surface px-2 font-mono text-[13px] leading-none text-ink @min-[560px]:inline-flex">
                <ToneMark tone={toneOf(node)} />
                {node?.label ?? pin.nodeId}
              </span>
            )}
          </span>
        )
      })}

      {definition.steps.map((s, index) => {
        const active = step === index
        return (
          <span
            key={`step-${index}`}
            data-step-badge={index + 1}
            data-active={active ? 'true' : undefined}
            className={`pointer-events-auto absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-sm border-2 text-[11px] font-bold leading-none tabular-nums transition-colors duration-200 ease-out @min-[560px]:h-6 @min-[560px]:w-6 @min-[560px]:text-xs ${
              active ? 'grid border-accent-ink bg-accent text-accent-ink' : 'hidden border-accent bg-surface text-accent @min-[560px]:grid'
            }`}
            style={place(s.at[0], s.at[1])}
            onClick={() => onStep(index)}
          >
            {index + 1}
          </span>
        )
      })}
    </div>
  )
}
