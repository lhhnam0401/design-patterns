import { useTranslation } from 'react-i18next'
import type { DiagramNode } from '../../types/pattern'
import type { Tone } from '../print/pigments'
import type { Lang, SceneDefinition } from '../types'
import type { Highlight } from './highlight'
import { pinLetter, toneOf } from './nodes'
import ToneMark from './ToneMark'

interface Props {
  definition: SceneDefinition
  nodes: Map<string, DiagramNode>
  lang: Lang
  highlight: Highlight | null
  pressed: string | null
  onHover: (node: string | null) => void
  onToggle: (node: string) => void
}

const KEY: Tone[] = ['client', 'class', 'abstract', 'interface']

/** The accessible key to the plate: one row per pin, with the same letter, in the page language. */
export default function Legend({ definition, nodes, lang, highlight, pressed, onHover, onToggle }: Props) {
  const { t } = useTranslation()
  const heading = t('pattern.scene.legend')

  return (
    <section aria-label={heading} data-scene-legend="true" className="mt-6 min-w-0">
      <h3 className="eyebrow text-ink-muted">{heading}</h3>
      <ol className="mt-3 grid list-none gap-x-8 border-t border-line p-0 @min-[560px]:grid-cols-2">
        {definition.pins.map((pin, index) => {
          const node = nodes.get(pin.nodeId)
          const tone = toneOf(node)
          const letter = pinLetter(index)
          const isPressed = pressed === pin.nodeId
          const lit = highlight?.nodes.has(pin.nodeId)
          return (
            <li key={`${pin.nodeId}-${index}`} className="border-b border-line">
              <button
                type="button"
                aria-pressed={isPressed}
                data-legend-row={letter}
                data-lit={lit ? 'true' : undefined}
                onClick={() => onToggle(pin.nodeId)}
                onPointerEnter={() => onHover(pin.nodeId)}
                onPointerLeave={() => onHover(null)}
                onFocus={() => onHover(pin.nodeId)}
                onBlur={() => onHover(null)}
                className={`grid min-h-11 w-full grid-cols-[1.5rem_minmax(0,1fr)] items-start gap-3 px-2 py-3 text-left transition-colors duration-200 ease-out hover:bg-surface-shift ${
                  isPressed ? 'bg-surface-shift' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-6 w-6 place-items-center rounded-full text-xs font-semibold leading-none transition-colors duration-200 ease-out ${
                    lit ? 'bg-accent text-accent-ink' : 'bg-ink text-surface'
                  }`}
                >
                  {letter}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <ToneMark tone={tone} />
                    <span className="sr-only">{letter}: {t(`pattern.scene.kind.${tone}`)}, </span>
                    <code className="break-all font-mono text-sm font-semibold text-ink">{node?.label ?? pin.nodeId}</code>
                    {pin.methods?.map(method => (
                      <code key={method} className="font-mono text-[13px] text-ink-muted">.{method}()</code>
                    ))}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{pin.caption[lang]}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-muted">
        <span className="font-semibold text-ink">{t('pattern.scene.key')}</span>
        {KEY.map(tone => (
          <span key={tone} className="inline-flex items-center gap-1.5">
            <ToneMark tone={tone} />
            {t(`pattern.scene.kind.${tone}`)}
          </span>
        ))}
      </p>
    </section>
  )
}
