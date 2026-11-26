import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import SceneLegend from '../scenes/SceneLegend'
import SceneView from '../scenes/SceneView'
import { allPatterns } from '../data'
import { scenes } from '../scenes/registry'
import { SCENE_COLORS, TONES } from '../scenes/kit/palette'
import { isPlate, type LegacySceneDefinition, type SceneVariant } from '../scenes/types'

const pattern = allPatterns.find(item => item.slug === 'factory-method')!
const anyDefinition = scenes['factory-method']
if (isPlate(anyDefinition)) throw new Error('factory-method is a plate now: move these checks onto ScenePlate')
const definition: LegacySceneDefinition = anyDefinition

const renderScene = (variant: SceneVariant, lang: 'en' | 'vi' = 'en') => renderToStaticMarkup(
  <SceneView definition={definition} diagram={pattern.diagram} lang={lang} variant={variant} />,
)

describe('scene rendering variants', () => {
  it('renders thumbnails as decorative artwork without annotations or captions', () => {
    const markup = renderScene('thumbnail')
    expect(markup).toContain('data-scene-variant="thumbnail"')
    expect(markup).toContain('aria-hidden="true"')
    expect(markup).toContain('focusable="false"')
    expect(markup).toContain('data-scene-art="true"')
    expect(markup).not.toContain('data-scene-calls="true"')
    expect(markup).not.toContain('data-scene-tags="true"')
    expect(markup).not.toContain('data-scene-caption="true"')
  })

  it('renders feature artwork with unlabeled call lines and no tag panels', () => {
    const markup = renderScene('feature')
    expect(markup).toContain('data-scene-variant="feature"')
    expect(markup).toContain('data-scene-calls="true"')
    expect(markup).not.toContain('data-scene-tags="true"')
    expect(markup).not.toContain('data-scene-call-label="true"')
  })

  it('retains complete annotations in detail mode', () => {
    const markup = renderScene('detail', 'vi')
    expect(markup).toContain('data-scene-variant="detail"')
    expect(markup).toContain('data-scene-calls="true"')
    expect(markup).toContain('data-scene-tags="true"')
    expect(markup).toContain(pattern.diagram.nodes[0].label)
  })

  it('uses the paper-print frame without cinematic filters', () => {
    const markup = renderScene('detail')
    expect(markup).toContain('data-scene-frame="paper-print"')
    expect(markup).not.toMatch(/vignette|feDropShadow|feGaussianBlur/)
    expect(markup).not.toMatch(/#140f2e|#030712|#120a07/)
  })
})

describe('scene legend', () => {
  it('lists every annotated relationship in the selected language', () => {
    const markup = renderToStaticMarkup(
      <SceneLegend definition={definition} diagram={pattern.diagram} lang="vi" />,
    )
    for (const tag of definition.tags) expect(markup).toContain(tag.caption.vi)
    for (const call of definition.calls) expect(markup).toContain(`${call.method}()`)
  })
})

function relativeLuminance(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)!.map(value => Number.parseInt(value, 16) / 255)
  const [red, green, blue] = channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrast(first: string, second: string) {
  const [lighter, darker] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}

describe('archival annotation palette', () => {
  it.each(Object.entries(TONES))('%s tone has at least 3:1 contrast on paper', (_tone, color) => {
    expect(contrast(color, SCENE_COLORS.paperLight)).toBeGreaterThanOrEqual(3)
  })

  it('uses a different printed marker tone for every relationship kind', () => {
    expect(new Set(Object.values(TONES)).size).toBe(Object.keys(TONES).length)
  })
})
