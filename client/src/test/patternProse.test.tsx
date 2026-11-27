// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import PatternProse from '../components/PatternProse'
import type { Prose } from '../types/pattern'
import { flattenProse, invalidProseBlocks, normalizeProse, summarizeProse } from '../utils/prose'

afterEach(cleanup)

const structured: Prose = [
  { type: 'paragraph', text: 'Use it when:' },
  { type: 'list', items: ['<b>one</b>', 'two'] },
]

describe('prose helpers', () => {
  it('normalizes a plain string to one paragraph', () => {
    expect(normalizeProse('Hello')).toEqual([{ type: 'paragraph', text: 'Hello' }])
  })
  it('keeps blocks and drops nothing', () => {
    expect(normalizeProse(structured)).toEqual(structured)
  })
  it('flattens blocks to searchable text', () => {
    expect(flattenProse('Hello')).toBe('Hello')
    expect(flattenProse(structured)).toBe('Use it when:\n<b>one</b>\ntwo')
  })
  it('summarizes to the first paragraph', () => {
    expect(summarizeProse(structured)).toBe('Use it when:')
    expect(summarizeProse([{ type: 'list', items: ['a', 'b'] }])).toBe('a')
    expect(summarizeProse('Plain')).toBe('Plain')
  })
  it('reports empty paragraphs, empty lists and blank items', () => {
    expect(invalidProseBlocks('ok')).toEqual([])
    expect(invalidProseBlocks(structured)).toEqual([])
    expect(invalidProseBlocks([
      { type: 'paragraph', text: '  ' },
      { type: 'list', items: [] },
      { type: 'list', items: ['x', ' '] },
    ])).toEqual([0, 1, 2])
  })
})

describe('PatternProse', () => {
  it('renders a string as one paragraph', () => {
    render(<PatternProse value="Plain text" />)
    expect(screen.getByText('Plain text').tagName).toBe('P')
  })
  it('renders blocks semantically and escapes markup', () => {
    const { container } = render(<PatternProse value={structured} />)
    const list = screen.getByRole('list')
    expect(within(list).getAllByRole('listitem')).toHaveLength(2)
    expect(within(list).getByText('<b>one</b>')).toBeInTheDocument()
    expect(container.querySelector('b')).toBeNull()
  })
})
