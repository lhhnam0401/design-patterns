import { useEffect, useEffectEvent, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Maximize2, Minimize2, RotateCcw, Scan, ZoomIn, ZoomOut } from 'lucide-react'
import type { Diagram } from '../types/pattern'
import { DiagramContent, Markers } from './diagram/DiagramCanvas'
import { layoutDiagram, type NodeOffsets, type Point } from './diagram/layout'
import type { GestureAction } from './diagram/gestures'
import { useDiagramInput } from './diagram/useDiagramInput'
import {
  BUTTON_ZOOM_FACTOR, fit, panBy, scaleLimits, zoomAt,
  type Size, type Viewport,
} from './diagram/viewport'

/** Used until the frame has been measured (and when rendering on the server). */
const DEFAULT_FRAME: Size = { width: 800, height: 440 }
const KEY_PAN_STEP = 48
const HINT_MS = 1500
const GRID = 24

type Hint = 'ctrl' | 'meta' | null

interface Props {
  diagram: Diagram
}

function ToolButton({ label, onClick, disabled, children, buttonRef }: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
  buttonRef?: Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-300 transition-colors
        hover:bg-slate-800 hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
        disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  )
}

const isApplePlatform = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent)

export default function PatternDiagram({ diagram }: Props) {
  const { t } = useTranslation()
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const frameRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const hintTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const [offsets, setOffsets] = useState<NodeOffsets>({})
  const [frame, setFrame] = useState<Size>(DEFAULT_FRAME)
  /** null = follow the fitted view (refits on resize until the user zooms or pans). */
  const [userViewport, setUserViewport] = useState<Viewport | null>(null)
  const [expanded, setExpanded] = useState(false)
  const [hint, setHint] = useState<Hint>(null)

  const layout = useMemo(() => layoutDiagram(diagram, offsets), [diagram, offsets])
  const fitted = useMemo(() => fit(layout.bounds, frame), [layout.bounds, frame])
  const vp = userViewport ?? fitted
  const limits = scaleLimits(fitted)
  const moved = Object.keys(offsets).length > 0

  const updateViewport = (fn: (v: Viewport) => Viewport) => setUserViewport(prev => fn(prev ?? fitted))
  const frameCenter: Point = { x: frame.width / 2, y: frame.height / 2 }
  const zoomBy = (factor: number, anchor: Point = frameCenter) => updateViewport(v => zoomAt(v, factor, anchor, limits))
  const fitView = () => setUserViewport(null)

  const onGesture = (a: GestureAction) => {
    switch (a.type) {
      case 'pan':
        updateViewport(v => panBy(v, a.dx, a.dy))
        break
      case 'pinch':
        updateViewport(v => zoomAt(panBy(v, a.dx, a.dy), a.factor, a.center, limits))
        break
      case 'dragNode':
        // Freeze the view so the fitted view doesn't shift while the bounds change.
        updateViewport(v => v)
        setOffsets(prev => {
          const o = prev[a.nodeId] ?? { dx: 0, dy: 0 }
          return { ...prev, [a.nodeId]: { dx: o.dx + a.dx, dy: o.dy + a.dy } }
        })
        break
    }
  }

  const showHint = () => {
    setHint(isApplePlatform() ? 'meta' : 'ctrl')
    clearTimeout(hintTimer.current)
    hintTimer.current = setTimeout(() => setHint(null), HINT_MS)
  }

  const { handlers, panning, draggingId } = useDiagramInput({
    frameRef,
    expanded,
    scale: vp.scale,
    onGesture,
    onWheelZoom: zoomBy,
    onPlainWheel: showHint,
  })

  // Track the frame size; the fitted view follows it.
  useEffect(() => {
    const el = frameRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setFrame(f => (f.width === width && f.height === height ? f : { width, height }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => () => clearTimeout(hintTimer.current), [])

  const toggleExpanded = () => {
    setExpanded(e => !e)
    setUserViewport(null) // refit to the new frame
  }

  const closeExpanded = useEffectEvent(() => {
    setExpanded(false)
    setUserViewport(null)
  })

  // Expanded mode: lock page scroll, close on Esc, keep focus inside, restore on close.
  useEffect(() => {
    if (!expanded) return
    const frameEl = frameRef.current
    const toggle = toggleRef.current
    const scrollY = window.scrollY
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    frameEl?.focus()

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); closeExpanded() }
    }
    const onFocusIn = (e: FocusEvent) => {
      if (frameEl && e.target instanceof Node && !frameEl.contains(e.target)) frameEl.focus()
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocusIn)
      document.body.style.overflow = overflow
      window.scrollTo(0, scrollY)
      toggle?.focus()
    }
  }, [expanded])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return // leave browser shortcuts alone
    const actions: Record<string, () => void> = {
      '+': () => zoomBy(BUTTON_ZOOM_FACTOR),
      '=': () => zoomBy(BUTTON_ZOOM_FACTOR),
      '-': () => zoomBy(1 / BUTTON_ZOOM_FACTOR),
      '_': () => zoomBy(1 / BUTTON_ZOOM_FACTOR),
      '0': fitView,
      ArrowLeft: () => updateViewport(v => panBy(v, KEY_PAN_STEP, 0)),
      ArrowRight: () => updateViewport(v => panBy(v, -KEY_PAN_STEP, 0)),
      ArrowUp: () => updateViewport(v => panBy(v, 0, KEY_PAN_STEP)),
      ArrowDown: () => updateViewport(v => panBy(v, 0, -KEY_PAN_STEP)),
    }
    const action = actions[e.key]
    if (!action) return
    e.preventDefault()
    action()
  }

  const transform = `translate(${vp.x} ${vp.y}) scale(${vp.scale})`
  const percent = `${Math.round(vp.scale * 100)}%`
  const descId = `${uid}-desc`

  return (
    // The placeholder keeps its height while the viewer is expanded, so the page doesn't jump.
    <div className="relative h-[clamp(360px,60vh,560px)]">
      <div
        ref={frameRef}
        tabIndex={0}
        role={expanded ? 'dialog' : 'group'}
        aria-modal={expanded ? true : undefined}
        aria-label={t('pattern.diagram.label')}
        aria-describedby={descId}
        aria-keyshortcuts="+ - 0 ArrowLeft ArrowRight ArrowUp ArrowDown"
        onKeyDown={onKeyDown}
        className={`overflow-hidden bg-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          expanded ? 'fixed inset-0 z-[100]' : 'absolute inset-0 rounded-xl border border-slate-700/50'
        }`}
        style={{ touchAction: expanded ? 'none' : 'pan-x pan-y' }}
      >
        <span id={descId} className="sr-only">{t('pattern.diagram.instructions')}</span>

        <svg
          width="100%"
          height="100%"
          className="block select-none"
          role="img"
          aria-label={t('pattern.diagram.label')}
          style={{
            touchAction: expanded ? 'none' : 'pan-x pan-y',
            cursor: draggingId ? 'grabbing' : panning ? 'grabbing' : 'grab',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
          }}
          {...handlers}
        >
          <Markers prefix={uid} />
          <defs>
            <pattern
              id={`${uid}-grid`}
              width={GRID}
              height={GRID}
              patternUnits="userSpaceOnUse"
              patternTransform={transform}
            >
              <circle cx={1} cy={1} r={1} fill="#1e293b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid}-grid)`} />
          <g transform={transform}>
            <DiagramContent layout={layout} markerPrefix={uid} activeNodeId={draggingId} />
          </g>
        </svg>

        {hint && (
          <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-center" aria-hidden="true">
            <span className="rounded-full border border-slate-700 bg-slate-900/90 px-3 py-1.5 text-xs text-slate-200 shadow-lg">
              {t(hint === 'meta' ? 'pattern.diagram.hint_meta' : 'pattern.diagram.hint_ctrl')}
            </span>
          </div>
        )}

        <div
          className="absolute bottom-3 right-3 flex items-center gap-0.5 rounded-lg border border-slate-700
            bg-slate-900/80 p-1 shadow-lg backdrop-blur"
        >
          <ToolButton label={t('pattern.diagram.zoom_out')} onClick={() => zoomBy(1 / BUTTON_ZOOM_FACTOR)} disabled={vp.scale <= limits.min + 1e-6}>
            <ZoomOut className="h-4 w-4" />
          </ToolButton>
          <span className="w-12 text-center text-xs tabular-nums text-slate-300" title={t('pattern.diagram.zoom_level')}>
            <span className="sr-only">{t('pattern.diagram.zoom_level')}: </span>
            {percent}
          </span>
          <ToolButton label={t('pattern.diagram.zoom_in')} onClick={() => zoomBy(BUTTON_ZOOM_FACTOR)} disabled={vp.scale >= limits.max - 1e-6}>
            <ZoomIn className="h-4 w-4" />
          </ToolButton>
          <span className="mx-0.5 h-5 w-px bg-slate-700" aria-hidden="true" />
          <ToolButton label={t('pattern.diagram.fit')} onClick={fitView}>
            <Scan className="h-4 w-4" />
          </ToolButton>
          <ToolButton label={t('pattern.diagram.reset_layout')} onClick={() => setOffsets({})} disabled={!moved}>
            <RotateCcw className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            buttonRef={toggleRef}
            label={t(expanded ? 'pattern.diagram.collapse' : 'pattern.diagram.expand')}
            onClick={toggleExpanded}
          >
            {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </ToolButton>
        </div>
      </div>
    </div>
  )
}
