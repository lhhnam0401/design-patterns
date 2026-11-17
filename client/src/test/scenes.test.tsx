import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import { scenes } from '../scenes/registry'
import SceneView from '../scenes/SceneView'
import { tagBox } from '../scenes/kit/metrics'
import { H, W } from '../scenes/kit/palette'
import type { Lang, SceneDefinition } from '../scenes/types'
import type { Pattern } from '../types/pattern'
import { codeFor, isClientLabel, mentionsMethod, methodName } from './codeNames'

const decode = (s: string) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

/** Visible text of a rendered scene, without the accessible <title>. */
function visibleText(markup: string): string {
  const body = markup.replace(/<title>[\s\S]*?<\/title>/g, '')
  return (body.match(/>([^<]+)</g) ?? []).map(s => decode(s.slice(1, -1))).join('\n')
}

function render(definition: SceneDefinition, pattern: Pattern, lang: Lang, compact = false): string {
  return visibleText(renderToStaticMarkup(
    <SceneView definition={definition} diagram={pattern.diagram} lang={lang} compact={compact} />,
  ))
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const hasWord = (text: string, word: string) => new RegExp(`(^|[^\\w])${escape(word)}($|[^\\w])`).test(text)

const entries = Object.values(scenes).map(d => [d.slug, d] as const)

describe.each(entries)('%s scene', (slug, definition) => {
  const pattern = allPatterns.find(p => p.slug === slug)
  if (!pattern) throw new Error(`No pattern for scene ${slug}`)
  const nodes = new Map(pattern.diagram.nodes.map(n => [n.id, n]))
  const ts = codeFor(pattern, 'typescript')
  const methodsOf = (nodeId: string) =>
    (nodes.get(nodeId)?.methods ?? []).map(methodName).filter((m): m is string => m !== null)

  it('points tags and calls at diagram nodes and their methods', () => {
    const problems: string[] = []
    for (const ref of [...definition.tags, ...definition.calls]) {
      if (!nodes.has(ref.nodeId)) { problems.push(`unknown node ${ref.nodeId}`); continue }
      if (!ref.method) continue
      if (!methodsOf(ref.nodeId).includes(ref.method)) problems.push(`${ref.nodeId} has no method ${ref.method} in the diagram`)
      if (!mentionsMethod(ts, ref.method)) problems.push(`${ref.method} is not in the TypeScript code`)
    }
    expect(problems).toEqual([])
  })

  it('tags every diagram node or says why not', () => {
    const tagged = new Set(definition.tags.map(t => t.nodeId))
    const skipped = new Set(definition.untagged.map(u => u.nodeId))
    const missing = pattern.diagram.nodes.filter(n => !tagged.has(n.id) && !skipped.has(n.id)).map(n => n.id)
    const bogus = definition.untagged.filter(u => !nodes.has(u.nodeId) || tagged.has(u.nodeId)).map(u => u.nodeId)
    expect({ missing, bogus }).toEqual({ missing: [], bogus: [] })
  })

  it('names every tagged class in both descriptions', () => {
    const missing: string[] = []
    for (const id of new Set(definition.tags.map(t => t.nodeId))) {
      const label = nodes.get(id)?.label ?? id
      if (isClientLabel(label)) continue
      for (const lang of ['en', 'vi'] as const) {
        if (!hasWord(pattern.vietnamese_example.description[lang], label)) missing.push(`${lang}: ${label}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('shows the same code names in EN and VI, with captions in the page language', () => {
    const en = render(definition, pattern, 'en')
    const vi = render(definition, pattern, 'vi')
    for (const tag of definition.tags) {
      const label = nodes.get(tag.nodeId)!.label
      for (const text of [en, vi]) {
        expect(text).toContain(label)
        if (tag.method) expect(text).toContain(`.${tag.method}()`)
      }
      expect(en).toContain(tag.caption.en)
      expect(vi).toContain(tag.caption.vi)
    }
    for (const call of definition.calls.filter(c => c.at)) {
      expect(en).toContain(`${call.method}()`)
      expect(vi).toContain(`${call.method}()`)
    }
  })

  it('keeps tags inside the canvas and apart from each other, in both languages', () => {
    const problems: string[] = []
    for (const lang of ['en', 'vi'] as const) {
      const boxes = definition.tags.map(t => {
        const label = nodes.get(t.nodeId)?.label ?? t.nodeId
        return { id: `${label}${t.method ? '.' + t.method : ''}`, ...tagBox(label, t.method, t.caption[lang], t.at) }
      })
      for (const b of boxes) {
        if (b.left < 0 || b.top < 0 || b.left + b.width > W || b.top + b.height > H) problems.push(`${lang}: ${b.id} leaves the canvas`)
      }
      boxes.forEach((a, i) => boxes.slice(i + 1).forEach(b => {
        const apart = a.left + a.width <= b.left || b.left + b.width <= a.left || a.top + a.height <= b.top || b.top + b.height <= a.top
        if (!apart) problems.push(`${lang}: ${a.id} overlaps ${b.id}`)
      }))
    }
    expect(problems).toEqual([])
  })

  it('hides tags and call labels in the compact thumbnail', () => {
    const compact = render(definition, pattern, 'en', true)
    for (const tag of definition.tags) expect(compact).not.toContain(tag.caption.en)
    for (const call of definition.calls) expect(compact).not.toContain(`${call.method}()`)
  })

  it('never writes code names in the art itself', () => {
    const art = [render(definition, pattern, 'en', true), render(definition, pattern, 'vi', true)].join('\n')
    const leaks: string[] = []
    for (const node of pattern.diagram.nodes) {
      if (!isClientLabel(node.label) && hasWord(art, node.label)) leaks.push(node.label)
      for (const m of methodsOf(node.id)) if (mentionsMethod(art, m)) leaks.push(`${m}()`)
    }
    expect(leaks).toEqual([])
  })
})

describe('scene registry', () => {
  it('only registers scenes for existing patterns', () => {
    const slugs = new Set(allPatterns.map(p => p.slug))
    expect(Object.keys(scenes).filter(s => !slugs.has(s))).toEqual([])
  })

  it('has a scene for every pattern', () => {
    expect(allPatterns.filter(p => !scenes[p.slug]).map(p => p.slug)).toEqual([])
  })
})
