/// <reference types="node" />
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { allPatterns, patternsByCategory } from '../data'
import { categoryFolio, isCategory, patternFolio } from '../utils/presentation'

describe('editorial folios', () => {
  it('numbers the three collections in their published order', () => {
    expect(categoryFolio('creational')).toBe('01')
    expect(categoryFolio('structural')).toBe('02')
    expect(categoryFolio('behavioral')).toBe('03')
  })

  it('creates stable category-prefixed pattern numbers', () => {
    expect(patternFolio(allPatterns[0])).toBe('C–01')
    expect(patternFolio(allPatterns.at(-1)!)).toMatch(/^B–\d{2}$/)
  })

  it('covers all 23 Gang of Four patterns, with Interpreter right after Command', () => {
    expect(allPatterns).toHaveLength(23)
    expect(patternsByCategory.behavioral).toHaveLength(11)
    const behavioral = patternsByCategory.behavioral.map(p => p.slug)
    expect(behavioral.indexOf('interpreter')).toBe(behavioral.indexOf('command') + 1)
    expect(patternFolio(allPatterns.find(p => p.slug === 'visitor')!)).toBe('B–11')
  })

  it('validates route category parameters at runtime', () => {
    expect(isCategory('structural')).toBe(true)
    expect(isCategory('not-a-category')).toBe(false)
    expect(isCategory(undefined)).toBe(false)
  })
})

describe('editorial CSS contract', () => {
  const css = readFileSync(new URL('../index.css', import.meta.url), 'utf8')

  it.each(['--bg', '--surface', '--ink', '--ink-muted', '--line', '--accent', '--accent-ink', '--support', '--scene-paper', '--radius-sm', '--radius-lg'])(
    'defines %s as a semantic token',
    token => expect(css).toContain(`${token}:`),
  )

  it('honors the reduced-motion preference', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
  })

  it('ships Vietnamese-capable display and body fonts', () => {
    expect(css).toContain('@fontsource-variable/fraunces/wght.css')
    expect(css).toContain('@fontsource-variable/ibm-plex-sans/wght.css')
  })
})
