import { INK } from './pigments'

/** The outline block's weight for participants, in scene units. */
export const LINE = 3

/** The lighter pass for drawings used as pale scenery. */
export const PALE_LINE = { stroke: INK, strokeWidth: 1.5, strokeOpacity: 0.6 } as const

/** The faintest pass, for large shapes that are always scenery: hills, clouds, the sun, paths. */
export const FAINT_LINE = { stroke: INK, strokeWidth: 1.5, strokeOpacity: 0.4 } as const

/** Stroke props for an outline: `width` units of ink for a participant, or the pale pass for scenery. */
export function inkLine(pale: boolean | undefined, width: number = LINE) {
  return pale ? PALE_LINE : { stroke: INK, strokeWidth: width }
}
