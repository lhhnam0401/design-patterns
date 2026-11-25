import { useId, type ReactNode } from 'react'
import type { SceneVariant } from '../types'
import { SceneIdsContext, url, type SceneIds } from './ids'
import { SceneVariantProvider } from './mode'
import { H, SCENE_COLORS, SKIES, TONES, W, type SkyName, type Tone } from './palette'

interface Props {
  title: string
  sky: SkyName
  variant: SceneVariant
  art: ReactNode
  overlay?: ReactNode
}

/** The shared 960×440 archival paper canvas used by every cultural scene. */
export default function SceneFrame({ title, sky, variant, art, overlay }: Props) {
  const prefix = 's' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const ids: SceneIds = {
    grain: `${prefix}-grain`,
    print: `${prefix}-print`,
    arrow: Object.fromEntries(
      (Object.keys(TONES) as Tone[]).map(tone => [tone, `${prefix}-arrow-${tone}`]),
    ) as Record<Tone, string>,
  }
  const thumbnail = variant === 'thumbnail'

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height={thumbnail ? '100%' : undefined}
      preserveAspectRatio={thumbnail ? 'xMidYMid slice' : 'xMidYMid meet'}
      role={thumbnail ? undefined : 'img'}
      aria-label={thumbnail ? undefined : title}
      aria-hidden={thumbnail ? true : undefined}
      focusable="false"
      data-scene-frame="paper-print"
      data-scene-variant={variant}
      style={{ display: 'block', maxWidth: '100%' }}
    >
      {!thumbnail && <title>{title}</title>}
      <defs>
        <filter id={ids.print} colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0.72" />
          <feComponentTransfer>
            <feFuncR type="gamma" amplitude="0.92" exponent="0.52" offset="0.04" />
            <feFuncG type="gamma" amplitude="0.92" exponent="0.52" offset="0.04" />
            <feFuncB type="gamma" amplitude="0.88" exponent="0.55" offset="0.04" />
          </feComponentTransfer>
        </filter>
        {!thumbnail && (
          <filter id={ids.grain} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.14  0 0 0 0 0.11  0 0 0 0.18 0" />
          </filter>
        )}
        {(Object.keys(TONES) as Tone[]).map(tone => (
          <marker
            key={tone}
            id={ids.arrow[tone]}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="10"
            markerHeight="10"
            markerUnits="userSpaceOnUse"
            orient="auto-start-reverse"
          >
            <path d="M0,1 L9,5 L0,9 Z" fill={TONES[tone]} stroke={SCENE_COLORS.paperLight} strokeWidth="0.8" />
          </marker>
        ))}
      </defs>

      <SceneIdsContext.Provider value={ids}>
        <SceneVariantProvider value={variant}>
          <rect width={W} height={H} fill={SKIES[sky]} />
          <g data-scene-art="true" filter={url(ids.print)}>{art}</g>
          <rect
            width={W}
            height={H}
            fill={SCENE_COLORS.paperLight}
            opacity={thumbnail ? 0.16 : 0.1}
            style={{ mixBlendMode: 'screen' }}
            pointerEvents="none"
            data-scene-wash="true"
          />
          {!thumbnail && <rect width={W} height={H} filter={url(ids.grain)} opacity="0.12" pointerEvents="none" />}
          {overlay}
        </SceneVariantProvider>
      </SceneIdsContext.Provider>
    </svg>
  )
}
