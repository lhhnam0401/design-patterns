import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { DiagramNode } from '../../types/pattern'
import type { Lang, SceneDefinition } from '../types'
import { stepChips } from './nodes'

interface Props {
  definition: SceneDefinition
  nodes: Map<string, DiagramNode>
  lang: Lang
  step: number | null
  onStep: (index: number | null) => void
}

const OUTLINE = 'inline-flex min-h-11 items-center rounded-sm border border-line-strong px-4 text-sm font-semibold text-ink transition-colors duration-200 ease-out hover:border-ink aria-disabled:cursor-not-allowed aria-disabled:opacity-45 aria-disabled:hover:border-line-strong'
const PRIMARY = 'inline-flex min-h-11 items-center rounded-sm bg-ink px-4 text-sm font-semibold text-surface transition-colors duration-200 ease-out hover:bg-accent aria-disabled:cursor-not-allowed aria-disabled:opacity-45 aria-disabled:hover:bg-ink'

/**
 * Walks through the scene's calls in the order the code runs. The main button
 * stays in place (Start, then Next) so keyboard focus never jumps; on the last
 * step it is marked aria-disabled rather than disabled, which would drop focus.
 */
export default function StepPlayer({ definition, nodes, lang, step, onStep }: Props) {
  const { t } = useTranslation()
  const mainRef = useRef<HTMLButtonElement>(null)
  const returning = useRef(false)
  const total = definition.steps.length
  const last = step === total - 1
  const current = step === null ? null : definition.steps[step]

  // Leaving the walkthrough removes Previous and Overview; put focus back on the main button.
  useEffect(() => {
    if (step === null && returning.current) {
      returning.current = false
      mainRef.current?.focus()
    }
  }, [step])

  const overview = () => {
    returning.current = true
    onStep(null)
  }
  const previous = () => {
    if (step === null) return
    if (step === 0) overview()
    else onStep(step - 1)
  }
  const next = () => {
    if (step === null) onStep(0)
    else if (!last) onStep(step + 1)
  }

  return (
    <div data-scene-steps="true" className="mt-4 border-y border-line bg-surface px-4 py-4 sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="eyebrow text-ink-muted">{t('pattern.scene.walkthrough')}</p>
        <div role="group" aria-label={t('pattern.scene.steps_label')} className="flex flex-wrap gap-2">
          {step !== null && (
            <button type="button" className={OUTLINE} onClick={previous}>{t('pattern.scene.previous')}</button>
          )}
          <button
            ref={mainRef}
            type="button"
            className={PRIMARY}
            aria-disabled={last ? true : undefined}
            onClick={next}
          >
            {step === null ? t('pattern.scene.start') : t('pattern.scene.next')}
          </button>
          {step !== null && (
            <button type="button" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-200 ease-out hover:text-accent" onClick={overview}>
              {t('pattern.scene.overview')}
            </button>
          )}
        </div>
      </div>

      <div aria-live="polite" className="mt-3 min-h-[4.5rem]" data-step-status="true">
        {current && step !== null ? (
          <>
            <p className="text-sm font-semibold tabular-nums text-accent">{t('pattern.scene.step_of', { n: step + 1, total })}</p>
            <p className="mt-2 flex flex-wrap gap-1.5">
              {stepChips(definition, step, nodes).map(chip => (
                <code key={chip} className="rounded-sm border border-line bg-bg px-1.5 py-0.5 font-mono text-[13px] text-ink">{chip}</code>
              ))}
            </p>
            <p lang={lang} className="mt-2 max-w-[65ch] text-sm leading-relaxed text-ink">{current.caption[lang]}</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-ink">{t('pattern.scene.overview')}</p>
            <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-ink-muted">{t('pattern.scene.overview_hint', { total })}</p>
          </>
        )}
      </div>
    </div>
  )
}
