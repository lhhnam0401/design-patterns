import { describe, expect, it } from 'vitest'
import en from '../locales/en/translation.json'
import vi from '../locales/vi/translation.json'

type Tree = { [key: string]: string | Tree }

function flatten(tree: Tree, prefix = ''): Record<string, string> {
  return Object.entries(tree).reduce<Record<string, string>>((out, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'string' ? { ...out, [path]: value } : { ...out, ...flatten(value, path) }
  }, {})
}

const placeholders = (text: string) => (text.match(/{{\s*\w+\s*}}/g) ?? []).sort()
const enFlat = flatten(en as Tree)
const viFlat = flatten(vi as Tree)

describe('locale contract', () => {
  it('has the same keys in English and Vietnamese', () => {
    expect(Object.keys(viFlat).sort()).toEqual(Object.keys(enFlat).sort())
  })

  it('uses the same interpolation placeholders for every key', () => {
    for (const key of Object.keys(enFlat)) {
      expect(placeholders(viFlat[key] ?? ''), key).toEqual(placeholders(enFlat[key]))
    }
  })

  it('has no empty values', () => {
    for (const [locale, flat] of [['en', enFlat], ['vi', viFlat]] as const) {
      for (const [key, value] of Object.entries(flat)) {
        expect(value.trim(), `${locale}:${key}`).not.toBe('')
      }
    }
  })
})
