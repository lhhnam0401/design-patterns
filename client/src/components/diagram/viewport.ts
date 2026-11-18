import type { Point, Rect } from './layout'

/** Screen = diagram × scale + (x, y). */
export interface Viewport { x: number; y: number; scale: number }
export interface Size { width: number; height: number }
export interface ScaleLimits { min: number; max: number }

export const MIN_SCALE = 0.25
export const MAX_SCALE = 3
export const FIT_PADDING = 24
/** Fitting never enlarges a small diagram past 100%. */
export const FIT_MAX_SCALE = 1
export const BUTTON_ZOOM_FACTOR = 1.2

export function clampScale(scale: number, limits: ScaleLimits = { min: MIN_SCALE, max: MAX_SCALE }): number {
  return Math.min(limits.max, Math.max(limits.min, scale))
}

/** Scale and offset that centre `bounds` inside `frame`. */
export function fit(bounds: Rect, frame: Size, padding = FIT_PADDING, maxScale = FIT_MAX_SCALE): Viewport {
  const availW = Math.max(1, frame.width - padding * 2)
  const availH = Math.max(1, frame.height - padding * 2)
  const scale = Math.min(
    maxScale,
    bounds.width > 0 ? availW / bounds.width : maxScale,
    bounds.height > 0 ? availH / bounds.height : maxScale,
  )
  return {
    scale,
    x: frame.width / 2 - (bounds.x + bounds.width / 2) * scale,
    y: frame.height / 2 - (bounds.y + bounds.height / 2) * scale,
  }
}

/** Limits for a frame: zooming out may always reach the fitted view, even below MIN_SCALE. */
export function scaleLimits(fitted: Viewport): ScaleLimits {
  return { min: Math.min(MIN_SCALE, fitted.scale), max: MAX_SCALE }
}

/** Zoom by `factor`, keeping the diagram point under `anchor` (screen px) still. */
export function zoomAt(vp: Viewport, factor: number, anchor: Point, limits?: ScaleLimits): Viewport {
  const scale = clampScale(vp.scale * factor, limits)
  const k = scale / vp.scale
  return {
    scale,
    x: anchor.x - (anchor.x - vp.x) * k,
    y: anchor.y - (anchor.y - vp.y) * k,
  }
}

export function panBy(vp: Viewport, dx: number, dy: number): Viewport {
  return { ...vp, x: vp.x + dx, y: vp.y + dy }
}

export function screenToDiagram(vp: Viewport, p: Point): Point {
  return { x: (p.x - vp.x) / vp.scale, y: (p.y - vp.y) / vp.scale }
}

export function diagramToScreen(vp: Viewport, p: Point): Point {
  return { x: p.x * vp.scale + vp.x, y: p.y * vp.scale + vp.y }
}

/** Wheel delta → zoom factor. Pinch and Ctrl+wheel arrive with ctrlKey set and get a finer step. */
export function wheelZoomFactor(deltaY: number, deltaMode: number, ctrlKey: boolean, pageHeight = 800): number {
  const px = deltaMode === 1 ? deltaY * 16 : deltaMode === 2 ? deltaY * pageHeight : deltaY
  const [k, cap] = ctrlKey ? [0.01, 25] : [0.0025, 100]
  const d = Math.max(-cap, Math.min(cap, px))
  return Math.exp(-d * k)
}
