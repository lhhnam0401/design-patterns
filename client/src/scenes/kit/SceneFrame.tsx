import { useId, type ReactNode } from 'react'
import { SceneIdsContext, url, type SceneIds } from './ids'
import { H, SKIES, TONES, W, type SkyName, type Tone } from './palette'

interface Props {
  title: string
  sky: SkyName
  compact: boolean
  /** The illustration, drawn under the paper grain and vignette. */
  art: ReactNode
  /** Tags and call arrows, drawn on top of everything. */
  overlay?: ReactNode
}

/** The 960×440 canvas shared by every scene: sky, lighting, paper grain and vignette. */
export default function SceneFrame({ title, sky, compact, art, overlay }: Props) {
  const p = 's' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids: SceneIds = {
    sky: `${p}-sky`,
    lamp: `${p}-lamp`,
    glow: `${p}-glow`,
    shadow: `${p}-shadow`,
    grain: `${p}-grain`,
    vignette: `${p}-vignette`,
    water: `${p}-water`,
    arrow: Object.fromEntries(
      (Object.keys(TONES) as Tone[]).map(t => [t, `${p}-arrow-${t}`]),
    ) as Record<Tone, string>,
  }
  const stops = SKIES[sky]

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={compact ? '100%' : undefined}
      preserveAspectRatio={compact ? 'xMidYMid slice' : 'xMidYMid meet'}
      role="img"
      aria-label={title}
      style={{ display: 'block' }}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={ids.sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.45" stopColor={stops[1]} />
          <stop offset="0.78" stopColor={stops[2]} />
          <stop offset="1" stopColor={stops[3]} />
        </linearGradient>
        <radialGradient id={ids.lamp}>
          <stop offset="0" stopColor="#ffe3a3" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#ffb054" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff8a3c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.water} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24406e" />
          <stop offset="1" stopColor="#081227" />
        </linearGradient>
        <radialGradient id={ids.vignette} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.6" />
        </radialGradient>
        <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
        {!compact && (
          <filter id={ids.grain} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.96  0 0 0 0 0.88  0 0 0 0 0.72  0 0 0 0.55 -0.12" />
          </filter>
        )}
        {(Object.keys(TONES) as Tone[]).map(t => (
          <marker
            key={t}
            id={ids.arrow[t]}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="11"
            markerHeight="11"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill={TONES[t]} />
          </marker>
        ))}
      </defs>

      <SceneIdsContext.Provider value={ids}>
        <rect width={W} height={H} fill={url(ids.sky)} />
        {art}
        {!compact && <rect width={W} height={H} filter={url(ids.grain)} opacity={0.22} style={{ mixBlendMode: 'soft-light' }} />}
        <rect width={W} height={H} fill={url(ids.vignette)} />
        {overlay}
      </SceneIdsContext.Provider>
    </svg>
  )
}
