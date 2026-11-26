import type { DiagramNode } from '../../types/pattern'
import { NAME_BREAKPOINT, W } from '../print/layout'
import type { SceneDefinition } from '../types'
import { pinLetter } from './nodes'

/**
 * Pin and badge sizes in CSS px. Pins.tsx uses the same numbers through Tailwind
 * classes, and the overlap tests use them to check every scene at real widths.
 */
export const PIN = {
  /** Letter circles: 24px (20px below 560px) plus a 2px ring on each side. */
  badge: 28,
  badgeSmall: 24,
  /** Numbered step squares have no ring. */
  step: 24,
  stepSmall: 20,
  gap: 4,
  chipFont: 13,
  /** Monospace advance per character, as a share of the font size (conservative). */
  charWidth: 0.61,
  chipPadX: 8,
  markSize: 9,
  markGap: 5,
  chipHeight: 24,
} as const

export interface PxBox {
  id: string
  left: number
  top: number
  width: number
  height: number
}

export const chipWidth = (label: string) =>
  PIN.chipPadX * 2 + PIN.markSize + PIN.markGap + label.length * PIN.chipFont * PIN.charWidth

const badgeSize = (plateWidth: number) => (plateWidth >= NAME_BREAKPOINT ? PIN.badge : PIN.badgeSmall)

/** Whether a pin shows its name chip on a plate of this width. */
export const showsName = (pin: SceneDefinition['pins'][number], plateWidth: number) =>
  plateWidth >= NAME_BREAKPOINT && pin.showName !== false

/** The pixel box each pin (badge plus optional name chip) covers on a plate `plateWidth` px wide. */
export function pinBoxes(definition: SceneDefinition, nodes: Map<string, DiagramNode>, plateWidth: number): PxBox[] {
  const scale = plateWidth / W
  const badge = badgeSize(plateWidth)
  return definition.pins.map((pin, index) => {
    const cx = pin.at[0] * scale
    const cy = pin.at[1] * scale
    const label = nodes.get(pin.nodeId)?.label ?? pin.nodeId
    const chip = showsName(pin, plateWidth)
    const width = chip ? badge + PIN.gap + chipWidth(label) : badge
    const height = chip ? Math.max(badge, PIN.chipHeight) : badge
    const left = chip && pin.side === 'left' ? cx + badge / 2 - width : cx - badge / 2
    return { id: pinLetter(index), left, top: cy - height / 2, width, height }
  })
}

/** The pixel box of each step badge on a plate `plateWidth` px wide. */
export function badgeBoxes(definition: SceneDefinition, plateWidth: number): PxBox[] {
  const scale = plateWidth / W
  const badge = plateWidth >= NAME_BREAKPOINT ? PIN.step : PIN.stepSmall
  return definition.steps.map((step, index) => ({
    id: String(index + 1),
    left: step.at[0] * scale - badge / 2,
    top: step.at[1] * scale - badge / 2,
    width: badge,
    height: badge,
  }))
}

export const overlaps = (a: PxBox, b: PxBox) =>
  a.left < b.left + b.width && b.left < a.left + a.width && a.top < b.top + b.height && b.top < a.top + a.height
