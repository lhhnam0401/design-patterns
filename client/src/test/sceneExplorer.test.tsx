// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { afterEach, describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import en from '../locales/en/translation.json'
import viLocale from '../locales/vi/translation.json'
import { highlightFor, OVERVIEW } from '../scenes/explorer/highlight'
import { nodeMap, pinLetter, stepChips } from '../scenes/explorer/nodes'
import SceneExplorer from '../scenes/explorer/SceneExplorer'
import { scenes } from '../scenes/registry'
import ScenePlate from '../scenes/ScenePlate'
import type { Lang, SceneDefinition } from '../scenes/types'

function makeI18n(lng: Lang) {
  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    lng,
    initAsync: false,
    resources: { en: { translation: en }, vi: { translation: viLocale } },
    interpolation: { escapeValue: false },
  })
  return instance
}

const plates = Object.values(scenes)
const patternOf = (slug: string) => allPatterns.find(p => p.slug === slug)!

function renderExplorer(definition: SceneDefinition, lang: Lang = 'en') {
  const pattern = patternOf(definition.slug)
  return render(
    <I18nextProvider i18n={makeI18n(lang)}>
      <SceneExplorer definition={definition} diagram={pattern.diagram} lang={lang} />
    </I18nextProvider>,
  )
}

afterEach(cleanup)

if (plates.length > 0) describe.each(plates.map(p => [p.slug, p] as const))('%s plate structure', (slug, definition) => {
  const pattern = patternOf(slug)
  const nodes = nodeMap(pattern.diagram)

  it('builds its art only from Parts and Backdrops, with a Part for every pinned node', () => {
    const { container } = render(<ScenePlate definition={definition} diagram={pattern.diagram} lang="en" />)
    const art = container.querySelector('[data-scene-art]')!
    const problems: string[] = []
    const parts = new Set<string>()
    Array.from(art.children).forEach((child, index) => {
      const part = child.getAttribute('data-part')
      if (part) {
        if (!nodes.has(part)) problems.push(`Part ${part} is not a diagram node`)
        parts.add(part)
      } else if (child.getAttribute('data-backdrop') !== 'true') {
        problems.push(`top-level element ${index} (<${child.tagName}>) is neither a Part nor a Backdrop`)
      }
    })
    for (const pin of definition.pins) if (!parts.has(pin.nodeId)) problems.push(`no Part draws ${pin.nodeId}`)
    expect(problems).toEqual([])
  })

  it.each(['en', 'vi'] as const)('lists every pin with its class name and caption in the %s legend', lang => {
    renderExplorer(definition, lang)
    const legend = document.querySelector('[data-scene-legend]') as HTMLElement
    const rows = Array.from(legend.querySelectorAll('[data-legend-row]'))
    expect(rows).toHaveLength(definition.pins.length)
    definition.pins.forEach((pin, index) => {
      expect(rows[index]).toHaveTextContent(nodes.get(pin.nodeId)!.label)
      expect(rows[index]).toHaveTextContent(pin.caption[lang])
      for (const method of pin.methods ?? []) expect(rows[index]).toHaveTextContent(`.${method}()`)
    })
  })

  it('letters the pins on the plate the same way as the legend', () => {
    renderExplorer(definition)
    const pinLetters = Array.from(document.querySelectorAll('[data-pin]')).map(el => el.getAttribute('data-pin'))
    const rowLetters = Array.from(document.querySelectorAll('[data-legend-row]')).map(el => el.getAttribute('data-legend-row'))
    expect(pinLetters).toEqual(definition.pins.map((_, i) => pinLetter(i)))
    expect(rowLetters).toEqual(pinLetters)
  })
})

describe('highlight rules', () => {
  const definition = scenes.observer

  it('shows the overview with nothing lit', () => {
    expect(highlightFor(definition, OVERVIEW)).toBeNull()
  })

  it('lights an object and the calls to its own methods', () => {
    const lit = highlightFor(definition, { ...OVERVIEW, hovered: 'o3' })!
    expect([...lit.nodes]).toEqual(['o3'])
    expect([...lit.calls]).toEqual(['react-o3'])
  })

  it('prefers the hovered object over the pressed row, and the pressed row over the step', () => {
    expect([...highlightFor(definition, { hovered: 'o1', pressed: 'o2', step: 0 })!.nodes]).toEqual(['o1'])
    expect([...highlightFor(definition, { hovered: null, pressed: 'o2', step: 0 })!.nodes]).toEqual(['o2'])
    const step = highlightFor(definition, { hovered: null, pressed: null, step: 1 })!
    expect([...step.calls]).toEqual(definition.steps[1].calls)
  })
})

describe('observer explorer', () => {
  const definition = scenes.observer

  it('lights the pressed object and its arrows, dims the rest, and clears on Escape', async () => {
    const user = userEvent.setup()
    renderExplorer(definition)
    const legend = screen.getByRole('region', { name: 'Technical annotations' })
    const trader = within(legend).getByRole('button', { name: /Trader/ })

    await user.click(trader)
    expect(trader).toHaveAttribute('aria-pressed', 'true')
    expect(document.querySelector('[data-part="o3"]')).toHaveAttribute('data-lit', 'true')
    expect(document.querySelector('[data-part="pub"]')).toHaveAttribute('data-dimmed', 'true')
    expect(document.querySelector('[data-backdrop]')).toHaveAttribute('data-dimmed', 'true')
    expect(document.querySelector('[data-call="react-o3"]')).toHaveAttribute('data-lit', 'true')
    expect(document.querySelector('[data-call="strike"]')).toHaveAttribute('data-dimmed', 'true')

    trader.blur()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(trader).toHaveAttribute('aria-pressed', 'false')
    expect(document.querySelector('[data-part="o3"]')).not.toHaveAttribute('data-lit')
    expect(document.querySelector('[data-part="pub"]')).not.toHaveAttribute('data-dimmed')
  })

  it('steps through the calls in order and announces each caption', async () => {
    const user = userEvent.setup()
    renderExplorer(definition)
    const status = document.querySelector('[data-step-status]') as HTMLElement
    expect(status).toHaveAttribute('aria-live', 'polite')

    await user.click(screen.getByRole('button', { name: 'Start' }))
    expect(status).toHaveTextContent('Step 1 of 4')
    expect(status).toHaveTextContent(definition.steps[0].caption.en)
    expect(document.querySelector('[data-step-badge="1"]')).toHaveAttribute('data-active', 'true')

    await user.click(screen.getByRole('button', { name: 'Previous' }))
    expect(status).toHaveTextContent('Overview')
    expect(screen.getByRole('button', { name: 'Start' })).toHaveFocus()

    await user.click(screen.getByRole('button', { name: 'Start' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(status).toHaveTextContent('Step 2 of 4')
    expect(within(status).getByText('BronzeDrum.strike()')).toBeInTheDocument()
    expect(document.querySelector('[data-call="react-o3"]')).toHaveAttribute('data-lit', 'true')

    await user.click(screen.getByRole('button', { name: 'Next' }))
    await user.click(screen.getByRole('button', { name: 'Next' }))
    expect(status).toHaveTextContent('Step 4 of 4')
    expect(screen.getByRole('button', { name: 'Next' })).toHaveAttribute('aria-disabled', 'true')
    expect(document.querySelector('[data-part="o3"]')).toHaveAttribute('data-dimmed', 'true')

    await user.click(screen.getByRole('button', { name: 'Overview' }))
    expect(status).toHaveTextContent('Overview')
    expect(document.querySelector('[data-part="o3"]')).not.toHaveAttribute('data-dimmed')
  })

  it('shows Vietnamese captions and controls on the Vietnamese page', async () => {
    const user = userEvent.setup()
    renderExplorer(definition, 'vi')
    await user.click(screen.getByRole('button', { name: 'Bắt đầu' }))
    const status = document.querySelector('[data-step-status]') as HTMLElement
    expect(status).toHaveTextContent('Bước 1/4')
    expect(within(status).getByText(definition.steps[0].caption.vi)).toHaveAttribute('lang', 'vi')
    expect(screen.getByRole('region', { name: 'Chú giải kỹ thuật' })).toBeInTheDocument()
  })

  it('builds code chips from diagram labels, without return arrows', () => {
    const nodes = nodeMap(patternOf('observer').diagram)
    expect(stepChips(definition, 1, nodes)).toEqual(['BronzeDrum.strike()', 'Farmer.react()', 'Soldier.react()', 'Trader.react()'])
  })
})
