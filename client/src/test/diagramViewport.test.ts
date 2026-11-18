import { describe, expect, it } from 'vitest'
import {
  MAX_SCALE, MIN_SCALE, clampScale, diagramToScreen, fit, panBy, scaleLimits, screenToDiagram, wheelZoomFactor, zoomAt,
  type Viewport,
} from '../components/diagram/viewport'

describe('fit', () => {
  it('centres the bounds inside the padded frame', () => {
    const bounds = { x: 100, y: 50, width: 400, height: 200 }
    const frame = { width: 300, height: 300 }
    const vp = fit(bounds, frame, 20, 1)
    expect(vp.scale).toBeCloseTo(260 / 400)
    const topLeft = diagramToScreen(vp, { x: bounds.x, y: bounds.y })
    const bottomRight = diagramToScreen(vp, { x: bounds.x + bounds.width, y: bounds.y + bounds.height })
    expect(topLeft.x).toBeCloseTo(20)
    expect(bottomRight.x).toBeCloseTo(280)
    expect((topLeft.y + bottomRight.y) / 2).toBeCloseTo(150)
  })

  it('does not enlarge small diagrams past the max scale', () => {
    expect(fit({ x: 0, y: 0, width: 50, height: 50 }, { width: 800, height: 600 }, 20, 1).scale).toBe(1)
  })
})

describe('zoomAt', () => {
  it('keeps the anchor point at the same screen position', () => {
    const vp: Viewport = { x: 30, y: -40, scale: 0.8 }
    const anchor = { x: 210, y: 145 }
    const before = screenToDiagram(vp, anchor)
    const zoomed = zoomAt(vp, 1.5, anchor)
    expect(zoomed.scale).toBeCloseTo(1.2)
    const after = diagramToScreen(zoomed, before)
    expect(after.x).toBeCloseTo(anchor.x)
    expect(after.y).toBeCloseTo(anchor.y)
  })

  it('respects the scale limits', () => {
    expect(zoomAt({ x: 0, y: 0, scale: 2.9 }, 2, { x: 0, y: 0 }).scale).toBe(MAX_SCALE)
    expect(zoomAt({ x: 0, y: 0, scale: 0.3 }, 0.1, { x: 0, y: 0 }).scale).toBe(MIN_SCALE)
  })
})

describe('clampScale', () => {
  it('keeps the scale between 0.25 and 3', () => {
    expect(clampScale(0.01)).toBe(0.25)
    expect(clampScale(10)).toBe(3)
    expect(clampScale(1.3)).toBe(1.3)
  })

  it('lets a very wide diagram zoom out to its fitted size', () => {
    expect(scaleLimits({ x: 0, y: 0, scale: 0.18 })).toEqual({ min: 0.18, max: MAX_SCALE })
    expect(scaleLimits({ x: 0, y: 0, scale: 0.9 })).toEqual({ min: MIN_SCALE, max: MAX_SCALE })
  })
})

describe('screenToDiagram', () => {
  it('reverses the viewport transform', () => {
    const vp: Viewport = { x: 12.5, y: -7, scale: 1.75 }
    const p = { x: 123.4, y: -56.7 }
    const back = screenToDiagram(vp, diagramToScreen(vp, p))
    expect(back.x).toBeCloseTo(p.x)
    expect(back.y).toBeCloseTo(p.y)
  })
})

describe('panBy', () => {
  it('moves the view without changing the scale', () => {
    expect(panBy({ x: 1, y: 2, scale: 1.5 }, 10, -5)).toEqual({ x: 11, y: -3, scale: 1.5 })
  })
})

describe('wheelZoomFactor', () => {
  it('zooms in when scrolling up and out when scrolling down', () => {
    expect(wheelZoomFactor(-100, 0, true)).toBeGreaterThan(1)
    expect(wheelZoomFactor(100, 0, true)).toBeLessThan(1)
  })

  it('caps one mouse-wheel notch to a step similar to the buttons', () => {
    expect(wheelZoomFactor(-100, 0, true)).toBeLessThan(1.35)
    expect(wheelZoomFactor(-3, 1, false)).toBeLessThan(1.35)
  })
})
