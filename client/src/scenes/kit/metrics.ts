import type { Point } from '../types'

/** Rough text widths; SVG has no layout engine, so pills are sized from character counts. */
export const monoWidth = (text: string, size: number) => text.length * size * 0.61
export const sansWidth = (text: string, size: number) => text.length * size * 0.56

export interface Box { left: number; top: number; width: number; height: number }

/** The rectangle a code-name tag occupies, centred on `at`. */
export function tagBox(name: string, method: string | undefined, caption: string, at: Point): Box {
  const call = method ? `.${method}()` : null
  const width = Math.max(monoWidth(name, 12.5), call ? monoWidth(call, 11) : 0, sansWidth(caption, 10.5)) + 24
  const height = call ? 52 : 39
  return { left: at[0] - width / 2, top: at[1] - height / 2, width, height }
}
