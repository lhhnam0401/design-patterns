import { describe, expect, it } from 'vitest'
import {
  DRAG_THRESHOLD, initialGesture, reduceGesture,
  type GestureAction, type GestureContext, type GestureEvent, type GestureState, type HitTarget,
} from '../components/diagram/gestures'

const inline: GestureContext = { expanded: false, scale: 1 }
const background: HitTarget = { kind: 'background' }
const node = (id: string): HitTarget => ({ kind: 'node', id })

const down = (pointerId: number, x: number, y: number, pointerType = 'mouse', target: HitTarget = background, button = 0): GestureEvent =>
  ({ type: 'down', pointerId, pointerType, button, x, y, target })
const move = (pointerId: number, x: number, y: number): GestureEvent => ({ type: 'move', pointerId, x, y })

/** Feed events through the reducer and collect the actions. */
function run(events: GestureEvent[], ctx = inline, start: GestureState = initialGesture) {
  let state = start
  const actions: (GestureAction | null)[] = []
  for (const e of events) {
    const r = reduceGesture(state, e, ctx)
    state = r.state
    actions.push(r.action)
  }
  return { state, actions }
}

describe('mouse', () => {
  it('pans when dragging the background', () => {
    const { actions, state } = run([down(1, 10, 10), move(1, 20, 15), move(1, 25, 15)])
    expect(actions).toEqual([null, { type: 'pan', dx: 10, dy: 5 }, { type: 'pan', dx: 5, dy: 0 }])
    expect(state.mode.type).toBe('pan')
  })

  it('ignores the right and middle buttons', () => {
    const { state } = run([down(1, 0, 0, 'mouse', background, 2), move(1, 50, 50)])
    expect(state).toEqual(initialGesture)
  })

  it('stays idle below the drag threshold', () => {
    const { actions, state } = run([down(1, 0, 0, 'mouse', node('a')), move(1, DRAG_THRESHOLD - 1, 0)])
    expect(actions).toEqual([null, null])
    expect(state.mode.type).toBe('pending')
  })

  it('drags a box, scaling screen movement by the zoom level', () => {
    const { actions, state } = run(
      [down(1, 0, 0, 'mouse', node('a')), move(1, 10, 4), move(1, 20, 4)],
      { expanded: false, scale: 2 },
    )
    expect(actions.slice(1)).toEqual([
      { type: 'dragNode', nodeId: 'a', dx: 5, dy: 2 },
      { type: 'dragNode', nodeId: 'a', dx: 5, dy: 0 },
    ])
    expect(state.mode).toMatchObject({ type: 'dragNode', nodeId: 'a' })
  })

  it('ends the gesture on pointer up', () => {
    const { state } = run([down(1, 0, 0), move(1, 10, 0), { type: 'up', pointerId: 1 }])
    expect(state).toEqual(initialGesture)
  })
})

describe('touch, inline', () => {
  it('leaves a single touch on the background to the browser (page scroll)', () => {
    const { actions, state } = run([down(1, 0, 0, 'touch'), move(1, 0, 40), move(1, 0, 80)])
    expect(actions).toEqual([null, null, null])
    expect(state.mode.type).toBe('idle')
  })

  it('drags a box with one finger', () => {
    const { actions } = run([down(1, 0, 0, 'touch', node('b')), move(1, 0, 10)])
    expect(actions[1]).toEqual({ type: 'dragNode', nodeId: 'b', dx: 0, dy: 10 })
  })

  it('pinches with two fingers, reporting scale and centre', () => {
    const { actions, state } = run([
      down(1, 100, 100, 'touch'),
      down(2, 200, 100, 'touch'),
      move(2, 300, 100),
    ])
    expect(state.mode.type).toBe('pinch')
    const pinch = actions[2]
    expect(pinch).toMatchObject({ type: 'pinch', center: { x: 200, y: 100 }, dx: 50, dy: 0 })
    expect(pinch?.type === 'pinch' && pinch.factor).toBeCloseTo(2)
  })

  it('switches a box drag into a pinch when a second finger lands', () => {
    const { state } = run([down(1, 0, 0, 'touch', node('a')), move(1, 10, 0), down(2, 100, 0, 'touch')])
    expect(state.mode.type).toBe('pinch')
  })

  it('resets the gesture on pointer cancel', () => {
    const { state } = run([down(1, 0, 0, 'touch'), down(2, 50, 0, 'touch'), { type: 'cancel', pointerId: 1 }])
    expect(state).toEqual(initialGesture)
  })

  it('stops pinching when a finger lifts and ignores the remaining one', () => {
    const { state, actions } = run([
      down(1, 0, 0, 'touch'), down(2, 100, 0, 'touch'), { type: 'up', pointerId: 2 }, move(1, 30, 30),
    ])
    expect(state.mode.type).toBe('idle')
    expect(actions[3]).toBeNull()
  })
})

describe('touch, expanded', () => {
  it('pans with one finger on the background', () => {
    const { actions } = run([down(1, 0, 0, 'touch'), move(1, 0, 20)], { expanded: true, scale: 1 })
    expect(actions[1]).toEqual({ type: 'pan', dx: 0, dy: 20 })
  })
})
