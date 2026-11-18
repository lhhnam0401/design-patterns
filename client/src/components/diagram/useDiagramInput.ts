import { useEffect, useEffectEvent, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import { initialGesture, reduceGesture, type GestureAction, type GestureEvent, type GestureState, type HitTarget } from './gestures'
import type { Point } from './layout'
import { wheelZoomFactor } from './viewport'

interface Options {
  /** The viewer frame: receives wheel and touch listeners. */
  frameRef: RefObject<HTMLElement | null>
  expanded: boolean
  scale: number
  onGesture: (action: GestureAction) => void
  onWheelZoom: (factor: number, anchor: Point) => void
  /** A plain wheel over the inline viewer: the page scrolls, the viewer shows a hint. */
  onPlainWheel: () => void
}

function localPoint(el: Element, clientX: number, clientY: number): Point {
  const r = el.getBoundingClientRect()
  return { x: clientX - r.left, y: clientY - r.top }
}

function nodeIdAt(target: EventTarget | null): string | null {
  const el = target instanceof Element ? target.closest('[data-node-id]') : null
  return el?.getAttribute('data-node-id') ?? null
}

/** Pointer, wheel and touch handling for the diagram viewer. */
export function useDiagramInput({ frameRef, expanded, scale, onGesture, onWheelZoom, onPlainWheel }: Options) {
  const gesture = useRef<GestureState>(initialGesture)
  const [mode, setMode] = useState<GestureState['mode']['type']>('idle')
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const dispatch = (event: GestureEvent): GestureState => {
    const { state, action } = reduceGesture(gesture.current, event, { expanded, scale })
    gesture.current = state
    setMode(state.mode.type)
    setDraggingId(state.mode.type === 'dragNode' ? state.mode.nodeId : null)
    if (action) onGesture(action)
    return state
  }

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    const id = nodeIdAt(e.target)
    const target: HitTarget = id ? { kind: 'node', id } : { kind: 'background' }
    const p = localPoint(e.currentTarget, e.clientX, e.clientY)
    const state = dispatch({ type: 'down', pointerId: e.pointerId, pointerType: e.pointerType, button: e.button, ...p, target })
    if (state.mode.type !== 'idle' && state.pointers[e.pointerId]) {
      try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* pointer already gone */ }
      if (e.pointerType === 'mouse') e.preventDefault() // no text selection while dragging
    }
  }

  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!gesture.current.pointers[e.pointerId]) return
    dispatch({ type: 'move', pointerId: e.pointerId, ...localPoint(e.currentTarget, e.clientX, e.clientY) })
  }

  const onPointerUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (gesture.current.pointers[e.pointerId]) dispatch({ type: 'up', pointerId: e.pointerId })
  }

  const onPointerCancel = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (gesture.current.pointers[e.pointerId]) dispatch({ type: 'cancel', pointerId: e.pointerId })
  }

  // Touch pointers start out implicitly captured by the element under the finger; moving
  // capture to the <svg> fires lostpointercapture on that child, which bubbles up here.
  // Only the svg itself losing capture ends the pointer.
  const onLostPointerCapture = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.target === e.currentTarget) onPointerUp(e)
  }

  // ── Native listeners: React's wheel/touch handlers are passive and can't preventDefault ──
  const handleWheel = useEffectEvent((e: WheelEvent) => {
    const el = frameRef.current
    if (!el) return
    if (!expanded && !e.ctrlKey && !e.metaKey) {
      onPlainWheel()
      return
    }
    e.preventDefault()
    onWheelZoom(wheelZoomFactor(e.deltaY, e.deltaMode, e.ctrlKey, el.clientHeight), localPoint(el, e.clientX, e.clientY))
  })

  const handleTouchStart = useEffectEvent((e: TouchEvent) => {
    if (expanded || !e.cancelable) return // expanded uses touch-action: none
    // Inline: keep the page from scrolling when a finger lands on a box or a second finger lands.
    if (nodeIdAt(e.target) || e.touches.length > 1) e.preventDefault()
  })

  const handleTouchMove = useEffectEvent((e: TouchEvent) => {
    if (!e.cancelable) return
    const m = gesture.current.mode
    const busy = m.type === 'pinch' || m.type === 'dragNode' || m.type === 'pan' || (m.type === 'pending' && m.intent === 'dragNode')
    if (expanded || busy || e.touches.length > 1) e.preventDefault()
  })

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const wheel = (e: WheelEvent) => handleWheel(e)
    const touchStart = (e: TouchEvent) => handleTouchStart(e)
    const touchMove = (e: TouchEvent) => handleTouchMove(e)
    // Safari fires its own gesture events for pinches; stop them zooming the page.
    const preventGesture = (e: Event) => e.preventDefault()
    el.addEventListener('wheel', wheel, { passive: false })
    el.addEventListener('touchstart', touchStart, { passive: false })
    el.addEventListener('touchmove', touchMove, { passive: false })
    el.addEventListener('gesturestart', preventGesture)
    el.addEventListener('gesturechange', preventGesture)
    return () => {
      el.removeEventListener('wheel', wheel)
      el.removeEventListener('touchstart', touchStart)
      el.removeEventListener('touchmove', touchMove)
      el.removeEventListener('gesturestart', preventGesture)
      el.removeEventListener('gesturechange', preventGesture)
    }
  }, [frameRef])

  return {
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onLostPointerCapture },
    panning: mode === 'pan' || mode === 'pinch',
    draggingId,
  }
}
