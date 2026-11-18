import type { Point } from './layout'

/**
 * Pure pointer-gesture reducer for the diagram viewer.
 *
 * Rules:
 * - Mouse (primary button) on the background pans; on a box it drags the box.
 * - Touch/pen inline: one finger on the background does nothing, so the page
 *   scrolls; one finger on a box drags it; two fingers pinch and pan.
 * - Touch/pen expanded: one finger on the background pans as well.
 * - A drag or pan only starts after the pointer moves DRAG_THRESHOLD px.
 */

export const DRAG_THRESHOLD = 3

export type HitTarget = { kind: 'background' } | { kind: 'node'; id: string }

export interface GesturePointer {
  x: number
  y: number
  startX: number
  startY: number
  isMouse: boolean
  target: HitTarget
}

export type GestureMode =
  | { type: 'idle' }
  | { type: 'pending'; pointerId: number; intent: 'pan' }
  | { type: 'pending'; pointerId: number; intent: 'dragNode'; nodeId: string }
  | { type: 'pan'; pointerId: number }
  | { type: 'dragNode'; pointerId: number; nodeId: string }
  | { type: 'pinch'; ids: [number, number]; distance: number; center: Point }

export interface GestureState {
  pointers: Readonly<Record<number, GesturePointer>>
  mode: GestureMode
}

export type GestureEvent =
  | { type: 'down'; pointerId: number; pointerType: string; button: number; x: number; y: number; target: HitTarget }
  | { type: 'move'; pointerId: number; x: number; y: number }
  | { type: 'up' | 'cancel'; pointerId: number }

export interface GestureContext {
  expanded: boolean
  /** Current zoom, used to turn screen movement into diagram units for box drags. */
  scale: number
}

export type GestureAction =
  /** Screen px. */
  | { type: 'pan'; dx: number; dy: number }
  /** Zoom by `factor` around `center` (screen px), after panning by dx/dy. */
  | { type: 'pinch'; factor: number; center: Point; dx: number; dy: number }
  /** Diagram units. */
  | { type: 'dragNode'; nodeId: string; dx: number; dy: number }

export interface GestureResult { state: GestureState; action: GestureAction | null }

export const initialGesture: GestureState = { pointers: {}, mode: { type: 'idle' } }

function pinchGeometry(a: GesturePointer, b: GesturePointer): { distance: number; center: Point } {
  return { distance: Math.hypot(a.x - b.x, a.y - b.y), center: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } }
}

function startPinch(pointers: Record<number, GesturePointer>): GestureMode {
  const ids = Object.keys(pointers).map(Number).slice(0, 2) as [number, number]
  return { type: 'pinch', ids, ...pinchGeometry(pointers[ids[0]], pointers[ids[1]]) }
}

function involves(mode: GestureMode, pointerId: number): boolean {
  if (mode.type === 'idle') return false
  if (mode.type === 'pinch') return mode.ids.includes(pointerId)
  return mode.pointerId === pointerId
}

export function reduceGesture(state: GestureState, event: GestureEvent, ctx: GestureContext): GestureResult {
  const none = (s: GestureState): GestureResult => ({ state: s, action: null })

  switch (event.type) {
    case 'down': {
      const isMouse = event.pointerType === 'mouse'
      if (isMouse && event.button !== 0) return none(state)
      const pointer: GesturePointer = {
        x: event.x, y: event.y, startX: event.x, startY: event.y, isMouse, target: event.target,
      }
      const pointers = { ...state.pointers, [event.pointerId]: pointer }
      const count = Object.keys(pointers).length

      if (count >= 2) {
        // A second finger always turns the gesture into a pinch.
        const mode = state.mode.type === 'pinch' ? state.mode : startPinch(pointers)
        return none({ pointers, mode })
      }
      if (event.target.kind === 'node') {
        return none({ pointers, mode: { type: 'pending', pointerId: event.pointerId, intent: 'dragNode', nodeId: event.target.id } })
      }
      if (isMouse || ctx.expanded) {
        return none({ pointers, mode: { type: 'pending', pointerId: event.pointerId, intent: 'pan' } })
      }
      // Inline single touch on the background: leave it to the browser (page scroll).
      return none({ pointers, mode: { type: 'idle' } })
    }

    case 'move': {
      const prev = state.pointers[event.pointerId]
      if (!prev) return none(state)
      const moved: GesturePointer = { ...prev, x: event.x, y: event.y }
      const pointers = { ...state.pointers, [event.pointerId]: moved }
      const mode = state.mode

      if (mode.type === 'pinch') {
        if (!mode.ids.includes(event.pointerId)) return none({ pointers, mode })
        const [a, b] = mode.ids.map(id => pointers[id])
        const next = pinchGeometry(a, b)
        const factor = mode.distance > 0 && next.distance > 0 ? next.distance / mode.distance : 1
        return {
          state: { pointers, mode: { ...mode, ...next } },
          action: { type: 'pinch', factor, center: next.center, dx: next.center.x - mode.center.x, dy: next.center.y - mode.center.y },
        }
      }

      if (!involves(mode, event.pointerId)) return none({ pointers, mode })

      if (mode.type === 'pending') {
        const dx = moved.x - moved.startX
        const dy = moved.y - moved.startY
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return none({ pointers, mode })
        if (mode.intent === 'pan') {
          return { state: { pointers, mode: { type: 'pan', pointerId: mode.pointerId } }, action: { type: 'pan', dx, dy } }
        }
        return {
          state: { pointers, mode: { type: 'dragNode', pointerId: mode.pointerId, nodeId: mode.nodeId } },
          action: { type: 'dragNode', nodeId: mode.nodeId, dx: dx / ctx.scale, dy: dy / ctx.scale },
        }
      }

      const dx = moved.x - prev.x
      const dy = moved.y - prev.y
      if (mode.type === 'pan') return { state: { pointers, mode }, action: { type: 'pan', dx, dy } }
      if (mode.type === 'dragNode') {
        return { state: { pointers, mode }, action: { type: 'dragNode', nodeId: mode.nodeId, dx: dx / ctx.scale, dy: dy / ctx.scale } }
      }
      return none({ pointers, mode })
    }

    case 'up': {
      if (!state.pointers[event.pointerId]) return none(state)
      const pointers = { ...state.pointers }
      delete pointers[event.pointerId]
      // Lifting a finger ends the gesture; the remaining finger waits to be lifted.
      const mode: GestureMode = involves(state.mode, event.pointerId) ? { type: 'idle' } : state.mode
      return none({ pointers, mode })
    }

    case 'cancel':
      // The browser took over (e.g. started scrolling): drop everything.
      return none(initialGesture)
  }
}
