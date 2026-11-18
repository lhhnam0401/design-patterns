import { renderToStaticMarkup } from 'react-dom/server'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { describe, expect, it } from 'vitest'
import PatternDiagram from '../components/PatternDiagram'
import { allPatterns } from '../data'
import en from '../locales/en/translation.json'
import vi from '../locales/vi/translation.json'

/** A synchronous i18next instance per language (the app's i18n.ts needs localStorage). */
function makeI18n(lng: 'en' | 'vi') {
  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    lng,
    initAsync: false,
    resources: { en: { translation: en }, vi: { translation: vi } },
    interpolation: { escapeValue: false },
  })
  return instance
}

const i18n = { en: makeI18n('en'), vi: makeI18n('vi') }

const decode = (s: string) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

function render(slug: string, lang: 'en' | 'vi' = 'en'): string {
  const pattern = allPatterns.find(p => p.slug === slug)!
  return renderToStaticMarkup(
    <I18nextProvider i18n={i18n[lang]}>
      <PatternDiagram diagram={pattern.diagram} />
    </I18nextProvider>,
  )
}

const textOf = (markup: string) => (markup.match(/>([^<]+)</g) ?? []).map(s => decode(s.slice(1, -1)))

describe.each(allPatterns.map(p => [p.slug, p] as const))('%s diagram markup', (slug, pattern) => {
  const markup = render(slug)
  const text = textOf(markup)

  it('shows every class name, method and edge label', () => {
    const expected = [
      ...pattern.diagram.nodes.flatMap(n => [n.label, ...(n.methods ?? []), ...(n.role ? [n.role] : [])]),
      ...pattern.diagram.edges.flatMap(e => (e.label ? [e.label] : [])),
    ]
    expect(expected.filter(s => !text.includes(s))).toEqual([])
  })

  it('contains no NaN or Infinity', () => {
    expect(markup).not.toMatch(/NaN|Infinity/)
  })

  it('marks every box as draggable by node id', () => {
    for (const n of pattern.diagram.nodes) expect(markup).toContain(`data-node-id="${n.id}"`)
  })
})

describe('diagram controls', () => {
  const buttonsOf = (markup: string) => markup.match(/<button[^>]*>/g) ?? []

  it('labels every control button in English and Vietnamese', () => {
    for (const lang of ['en', 'vi'] as const) {
      const buttons = buttonsOf(render('singleton', lang))
      expect(buttons.length).toBeGreaterThanOrEqual(5)
      for (const b of buttons) {
        const label = /aria-label="([^"]+)"/.exec(b)?.[1]
        expect(label, b).toBeTruthy()
        expect(label).not.toMatch(/^pattern\./) // a real translation, not the raw key
        expect(b).toContain(`title="${label}"`)
      }
    }
  })

  it('disables Reset layout until a box has moved', () => {
    const reset = buttonsOf(render('singleton')).find(b => b.includes('aria-label="Reset layout"'))
    expect(reset).toContain('disabled')
  })

  it('has the same diagram keys in both languages', () => {
    expect(Object.keys(vi.pattern.diagram).sort()).toEqual(Object.keys(en.pattern.diagram).sort())
  })
})
