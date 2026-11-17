import type { Point } from '../types'

/** Deterministic pseudo-random numbers, so server and client renders match. */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const f = (n: number) => Math.round(n * 10) / 10

/** Smooth curve through the points (Catmull-Rom converted to cubic Béziers). */
export function smooth(points: readonly Point[]): string {
  if (points.length < 2) return ''
  let d = `M${f(points[0][0])},${f(points[0][1])}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`
  }
  return d
}

/** A filled band: a smooth top edge through the points, closed down to `bottom`. */
export function band(points: readonly Point[], bottom: number): string {
  const first = points[0]
  const last = points[points.length - 1]
  return `${smooth(points)} L${f(last[0])},${bottom} L${f(first[0])},${bottom} Z`
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
