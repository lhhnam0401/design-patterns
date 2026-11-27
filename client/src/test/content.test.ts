import { describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import type { LocalizedProse, LocalizedText, Pattern } from '../types/pattern'
import { flattenProse, invalidProseBlocks } from '../utils/prose'

/** Every localized prose field of a pattern, labelled for readable failures. */
function proseOf(pattern: Pattern): [string, string][] {
  const fields: [string, LocalizedText | LocalizedProse][] = [
    ['name', pattern.name],
    ['intent', pattern.intent],
    ['problem', pattern.problem],
    ['solution', pattern.solution],
    ['applicability', pattern.applicability],
    ['structure_notes', pattern.structure_notes],
    ['example title', pattern.vietnamese_example.title],
    ['example description', pattern.vietnamese_example.description],
    ...(pattern.also_known_as ?? []).map((alias, i): [string, LocalizedText | LocalizedProse] => [`also_known_as ${i}`, alias]),
  ]
  return fields.flatMap(([label, text]) => [[`${label} (en)`, flattenProse(text.en)], [`${label} (vi)`, flattenProse(text.vi)]] as [string, string][])
}

const OUTSIDE_REFERENCES = [/\bthe page\b/i, /trang gốc/i, /refactoring\.guru/i]

describe.each(allPatterns.map(p => [p.slug, p] as const))('%s content', (_slug, pattern) => {
  it('never refers to an outside page', () => {
    const hits = proseOf(pattern).flatMap(([label, text]) =>
      OUTSIDE_REFERENCES.filter(re => re.test(text)).map(re => `${label}: ${re}`))
    expect(hits).toEqual([])
  })
})

describe.each(allPatterns.map(p => [p.slug, p] as const))('%s prose blocks', (_slug, pattern) => {
  it('has no empty paragraphs, lists or list items', () => {
    const fields: [string, LocalizedProse][] = [
      ['intent', pattern.intent], ['problem', pattern.problem], ['solution', pattern.solution],
      ['applicability', pattern.applicability], ['structure_notes', pattern.structure_notes],
      ['example description', pattern.vietnamese_example.description],
    ]
    const bad = fields.flatMap(([label, text]) => (['en', 'vi'] as const).flatMap(lang =>
      invalidProseBlocks(text[lang]).map(i => `${label} (${lang}) block ${i}`)))
    expect(bad).toEqual([])
  })
})

const labelsOf = (slug: string) => allPatterns.find(p => p.slug === slug)!.diagram.nodes.map(n => n.label)

describe('creational examples', () => {
  it('names the Factory Method creators after households, not factories', () => {
    expect(labelsOf('factory-method').filter(label => /Factory$/.test(label))).toEqual([])
  })

  it('fills the Abstract Factory tray with dishes that really differ by region', () => {
    expect(labelsOf('abstract-factory').filter(label => /PorkRoll|Rakkyo/.test(label))).toEqual([])
  })

  it('keeps master prints, not woodblocks, in the Prototype registry', () => {
    expect(labelsOf('prototype')).toContain('MasterPrintRegistry')
  })
})
