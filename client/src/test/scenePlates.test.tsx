import { readdirSync, readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import { flattenProse } from '../utils/prose'
import { nodeMap } from '../scenes/explorer/nodes'
import { badgeBoxes, overlaps, pinBoxes, type PxBox } from '../scenes/explorer/pinMetrics'
import { H, MIN_CAPTION_SIZE, NAME_BREAKPOINT, W } from '../scenes/print/layout'
import { PAPER, PIGMENT, SETTINGS, TONES } from '../scenes/print/pigments'
import { scenes } from '../scenes/registry'
import ScenePlate from '../scenes/ScenePlate'
import type { Lang, SceneDefinition, SceneVariant } from '../scenes/types'
import { codeFor, isClientLabel, mentionsMethod, methodName } from './codeNames'

const decode = (s: string) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const hasWord = (text: string, word: string) => new RegExp(`(^|[^\\w])${escape(word)}($|[^\\w])`).test(text)

const plates = Object.values(scenes)
const patternOf = (slug: string) => {
  const pattern = allPatterns.find(p => p.slug === slug)
  if (!pattern) throw new Error(`No pattern for scene ${slug}`)
  return pattern
}

function markup(definition: SceneDefinition, lang: Lang, variant: SceneVariant = 'detail') {
  return renderToStaticMarkup(
    <ScenePlate definition={definition} diagram={patternOf(definition.slug).diagram} lang={lang} variant={variant} />,
  )
}

/** Visible text of a rendered plate, without the accessible <title>. */
function visibleText(html: string): string {
  const body = html.replace(/<title>[\s\S]*?<\/title>/g, '')
  return (body.match(/>([^<]+)</g) ?? []).map(s => decode(s.slice(1, -1))).join('\n')
}

const inside = (box: PxBox, width: number) =>
  box.left >= 0 && box.top >= 0 && box.left + box.width <= width && box.top + box.height <= width * (H / W)

function collisions(boxes: PxBox[]): string[] {
  const problems: string[] = []
  boxes.forEach((a, i) => boxes.slice(i + 1).forEach(b => {
    if (overlaps(a, b)) problems.push(`${a.id} overlaps ${b.id}`)
  }))
  return problems
}

/** Narrowest plate (320px page minus padding) and the width where name chips first appear. */
const SMALL = 280
const NAMED = NAME_BREAKPOINT

if (plates.length > 0) describe.each(plates.map(p => [p.slug, p] as const))('%s plate', (slug, definition) => {
  const pattern = patternOf(slug)
  const nodes = nodeMap(pattern.diagram)
  const ts = codeFor(pattern, 'typescript')
  const methodsOf = (nodeId: string) =>
    (nodes.get(nodeId)?.methods ?? []).map(methodName).filter((m): m is string => m !== null)

  it('pins each diagram node once, naming only methods it has in the diagram and the code', () => {
    const problems: string[] = []
    const seen = new Set<string>()
    for (const pin of definition.pins) {
      if (!nodes.has(pin.nodeId)) { problems.push(`unknown node ${pin.nodeId}`); continue }
      if (seen.has(pin.nodeId)) problems.push(`${pin.nodeId} is pinned twice`)
      seen.add(pin.nodeId)
      for (const method of pin.methods ?? []) {
        if (!methodsOf(pin.nodeId).includes(method)) problems.push(`${pin.nodeId} has no method ${method} in the diagram`)
        if (!mentionsMethod(ts, method)) problems.push(`${method} is not in the TypeScript code`)
      }
      if (!pin.caption.en.trim() || !pin.caption.vi.trim()) problems.push(`${pin.nodeId} needs captions in both languages`)
    }
    expect(problems).toEqual([])
  })

  it('draws each call for a method its node has in the diagram and the code', () => {
    const problems: string[] = []
    const ids = new Set<string>()
    for (const call of definition.calls) {
      if (ids.has(call.id)) problems.push(`duplicate call id ${call.id}`)
      ids.add(call.id)
      if (!nodes.has(call.nodeId)) { problems.push(`unknown node ${call.nodeId}`); continue }
      if (!methodsOf(call.nodeId).includes(call.method)) problems.push(`${call.nodeId} has no method ${call.method} in the diagram`)
      if (!mentionsMethod(ts, call.method)) problems.push(`${call.method} is not in the TypeScript code`)
    }
    expect(problems).toEqual([])
  })

  it('pins every diagram node or says why not', () => {
    const pinned = new Set(definition.pins.map(p => p.nodeId))
    const skipped = new Set(definition.untagged.map(u => u.nodeId))
    const missing = pattern.diagram.nodes.filter(n => !pinned.has(n.id) && !skipped.has(n.id)).map(n => n.id)
    const bogus = definition.untagged.filter(u => !nodes.has(u.nodeId) || pinned.has(u.nodeId)).map(u => u.nodeId)
    expect({ missing, bogus }).toEqual({ missing: [], bogus: [] })
  })

  it('names every pinned class in both descriptions', () => {
    const missing: string[] = []
    for (const pin of definition.pins) {
      const label = nodes.get(pin.nodeId)?.label ?? pin.nodeId
      if (isClientLabel(label)) continue
      for (const lang of ['en', 'vi'] as const) {
        if (!hasWord(flattenProse(pattern.vietnamese_example.description[lang]), label)) missing.push(`${lang}: ${label}`)
      }
    }
    expect(missing).toEqual([])
  })

  it('never writes class or method names in the art', () => {
    const art = (['en', 'vi'] as const).map(lang => visibleText(markup(definition, lang))).join('\n')
    const leaks: string[] = []
    for (const node of pattern.diagram.nodes) {
      if (!isClientLabel(node.label) && hasWord(art, node.label)) leaks.push(node.label)
      for (const m of methodsOf(node.id)) if (mentionsMethod(art, m)) leaks.push(`${m}()`)
    }
    expect(leaks).toEqual([])
  })

  it('prints flat: no filters, blend modes or gradients, and captions of at least 18 units', () => {
    const html = markup(definition, 'vi')
    expect(html).not.toMatch(/<filter|mix-blend-mode|Gradient/)
    const sizes = [...html.matchAll(/data-scene-caption="true"[^>]*font-size="([\d.]+)"/g)].map(m => Number(m[1]))
    expect(sizes.filter(size => size < MIN_CAPTION_SIZE)).toEqual([])
  })

  it('keeps pins inside the plate and apart, with names at 560px and as letters at 280px', () => {
    const problems: string[] = []
    for (const width of [NAMED, SMALL]) {
      const boxes = pinBoxes(definition, nodes, width)
      for (const box of boxes) if (!inside(box, width)) problems.push(`${width}px: pin ${box.id} leaves the plate`)
      problems.push(...collisions(boxes).map(p => `${width}px: pin ${p}`))
    }
    expect(problems).toEqual([])
  })

  it('walks through 2 to 6 steps that use every call and only known nodes', () => {
    const problems: string[] = []
    const callIds = new Set(definition.calls.map(c => c.id))
    const used = new Set(definition.steps.flatMap(s => s.calls))
    if (definition.steps.length < 2 || definition.steps.length > 6) problems.push(`${definition.steps.length} steps`)
    for (const id of callIds) if (!used.has(id)) problems.push(`call ${id} is in no step`)
    definition.steps.forEach((step, index) => {
      for (const id of step.calls) if (!callIds.has(id)) problems.push(`step ${index + 1}: unknown call ${id}`)
      for (const node of step.nodes) if (!nodes.has(node)) problems.push(`step ${index + 1}: unknown node ${node}`)
      for (const lang of ['en', 'vi'] as const) {
        const caption = step.caption[lang].trim()
        if (!caption) problems.push(`step ${index + 1}: no ${lang} caption`)
        if (caption.length > 160) problems.push(`step ${index + 1}: ${lang} caption is ${caption.length} characters`)
      }
    })
    expect(problems).toEqual([])
  })

  it('keeps step badges inside the plate and clear of pins and of each other', () => {
    const problems: string[] = []
    const pins = pinBoxes(definition, nodes, NAMED)
    const badges = badgeBoxes(definition, NAMED)
    for (const badge of badges) {
      if (!inside(badge, NAMED)) problems.push(`badge ${badge.id} leaves the plate`)
      for (const pin of pins) if (overlaps(badge, pin)) problems.push(`badge ${badge.id} covers pin ${pin.id}`)
    }
    problems.push(...collisions(badges).map(p => `badge ${p}`))
    // On small plates only the current badge shows, so it only has to clear the pins.
    const smallPins = pinBoxes(definition, nodes, SMALL)
    for (const badge of badgeBoxes(definition, SMALL)) {
      for (const pin of smallPins) if (overlaps(badge, pin)) problems.push(`${SMALL}px: badge ${badge.id} covers pin ${pin.id}`)
    }
    expect(problems).toEqual([])
  })

  it('crops the thumbnail to a focus inside the canvas with a card-shaped ratio', () => {
    const [x, y, w, h] = definition.focus
    expect(x >= 0 && y >= 0 && x + w <= W && y + h <= H).toBe(true)
    expect(w).toBeGreaterThanOrEqual(400)
    expect(w / h).toBeGreaterThanOrEqual(2.2)
    expect(w / h).toBeLessThanOrEqual(2.5)
  })

  it('renders thumbnails without arrows, captions or paper flecks, hidden from assistive technology', () => {
    const html = markup(definition, 'en', 'thumbnail')
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain(`viewBox="${definition.focus.join(' ')}"`)
    expect(html).not.toContain('data-scene-calls')
    expect(html).not.toContain('data-scene-caption')
    expect(html).not.toContain('fleck')
  })

  it('renders the feature variant with arrows and nothing to read', () => {
    const html = markup(definition, 'en', 'feature')
    expect(html).toContain('data-scene-calls="true"')
    expect(html).not.toMatch(/data-pin|data-step-badge/)
  })
})

describe('scene registry', () => {
  it('only registers scenes for existing patterns', () => {
    const slugs = new Set(allPatterns.map(p => p.slug))
    expect(Object.keys(scenes).filter(s => !slugs.has(s))).toEqual([])
  })

  it('has a plate for every pattern', () => {
    expect(allPatterns.filter(p => !scenes[p.slug]).map(p => p.slug)).toEqual([])
  })

  it('registers each plate under its own slug', () => {
    expect(Object.entries(scenes).filter(([slug, d]) => d.slug !== slug).map(([slug]) => slug)).toEqual([])
  })
})

describe('Đông Hồ pigments', () => {
  const scenesDir = new URL('../scenes/', import.meta.url)
  const printDir = new URL('../scenes/print/', import.meta.url)
  const sources = [
    ...plates.map(p => new URL(`${p.slug}.tsx`, scenesDir)),
    ...readdirSync(printDir).filter(f => f !== 'pigments.ts').map(f => new URL(f, printDir)),
    new URL('ScenePlate.tsx', scenesDir),
  ]

  it.each(sources.map(u => [u.pathname.split('/').slice(-2).join('/'), u] as const))('%s takes every colour from pigments.ts', (_name, url) => {
    const source = readFileSync(url, 'utf8')
    expect(source.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []).toEqual([])
  })

  function luminance(hex: string) {
    const channels = hex.slice(1).match(/.{2}/g)!.map(v => Number.parseInt(v, 16) / 255)
    const [r, g, b] = channels.map(v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
  }

  it.each(Object.entries(TONES))('%s tone has at least 3:1 contrast on every paper', (_tone, color) => {
    for (const paper of [PAPER, ...Object.values(SETTINGS)]) expect(contrast(color, paper)).toBeGreaterThanOrEqual(3)
  })

  it('gives every kind of node its own tone', () => {
    expect(new Set(Object.values(TONES)).size).toBe(Object.keys(TONES).length)
  })

  it('matches the site accent and support tokens', () => {
    const css = readFileSync(new URL('../index.css', import.meta.url), 'utf8')
    expect(css).toMatch(new RegExp(`--accent:\\s*${PIGMENT.red};`, 'i'))
    expect(css).toMatch(new RegExp(`--support:\\s*${PIGMENT.green};`, 'i'))
  })
})
