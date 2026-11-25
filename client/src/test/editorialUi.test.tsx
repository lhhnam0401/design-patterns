// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CodeBlock from '../components/CodeBlock'
import Navbar from '../components/Navbar'
import PatternCollection from '../components/PatternCollection'
import { allPatterns } from '../data'
import en from '../locales/en/translation.json'
import viLocale from '../locales/vi/translation.json'

function makeI18n(lng: 'en' | 'vi' = 'en') {
  const instance = i18next.createInstance()
  instance.use(initReactI18next).init({
    lng,
    initAsync: false,
    resources: { en: { translation: en }, vi: { translation: viLocale } },
    interpolation: { escapeValue: false },
  })
  return instance
}

function renderWithApp(ui: React.ReactNode, language: 'en' | 'vi' = 'en') {
  return render(
    <I18nextProvider i18n={makeI18n(language)}>
      <MemoryRouter>{ui}</MemoryRouter>
    </I18nextProvider>,
  )
}

afterEach(cleanup)

describe('editorial navigation', () => {
  beforeEach(() => localStorage.clear())

  it('opens and closes the mobile collection menu with Escape', async () => {
    const user = userEvent.setup()
    renderWithApp(<Navbar />)
    const trigger = screen.getByRole('button', { name: /open navigation/i })

    await user.click(trigger)
    expect(screen.getByRole('navigation', { name: /mobile collection/i })).toBeVisible()

    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('navigation', { name: /mobile collection/i })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('switches language and persists the choice', async () => {
    const user = userEvent.setup()
    renderWithApp(<Navbar />)
    await user.click(screen.getByRole('button', { name: /switch language/i }))
    expect(localStorage.getItem('lang')).toBe('vi')
  })
})

describe('pattern collection', () => {
  it('uses list semantics and keeps long content available', () => {
    renderWithApp(
      <PatternCollection
        ariaLabel="Creational patterns"
        patterns={[{
          ...allPatterns[0],
          name: { ...allPatterns[0].name, en: 'A deliberately long pattern name that must remain readable' },
          intent: { ...allPatterns[0].intent, en: 'Long explanatory content '.repeat(20) },
        }]}
      />,
    )
    expect(screen.getByRole('list', { name: 'Creational patterns' })).toBeInTheDocument()
    expect(screen.getByText(/deliberately long pattern name/i)).toBeVisible()
    expect(screen.getByText(/Long explanatory content/i)).toBeVisible()
  })

  it('renders a localized empty state', () => {
    renderWithApp(<PatternCollection ariaLabel="Empty collection" patterns={[]} />, 'vi')
    expect(screen.getByText('Chưa có mẫu thiết kế')).toBeVisible()
  })

  it('can render a large reference collection', () => {
    const patterns = Array.from({ length: 500 }, (_, index) => ({
      ...allPatterns[index % allPatterns.length],
      id: `fixture-${index}`,
      slug: `fixture-${index}`,
    }))
    renderWithApp(<PatternCollection ariaLabel="Large collection" patterns={patterns} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(500)
  })
})

describe('code example feedback', () => {
  it('announces successful and failed copy attempts', async () => {
    const user = userEvent.setup()
    const writeText = vi.fn().mockResolvedValueOnce(undefined).mockRejectedValueOnce(new Error('blocked'))
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    renderWithApp(<CodeBlock examples={[{ language: 'typescript', code: 'const pattern = true' }]} />)

    await user.click(screen.getByRole('button', { name: /copy code/i }))
    expect(screen.getByRole('status')).toHaveTextContent('Code copied')

    await user.click(screen.getByRole('button', { name: /copy code/i }))
    expect(screen.getByRole('status')).toHaveTextContent('Unable to copy code')
  })
})
