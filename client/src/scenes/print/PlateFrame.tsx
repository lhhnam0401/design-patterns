import { useId, type ReactNode } from 'react'
import type { SceneSetting, SceneVariant } from '../types'
import { ArrowMarkers } from './arrows'
import { PlateIdsContext, PlateVariantContext, url, type PlateIds } from './context'
import { rng } from './geometry'
import { H, W } from './layout'
import { FLECK, PAPER_SHADE, SETTINGS, TONES, type Tone } from './pigments'

interface Props {
  title: string
  setting: SceneSetting
  variant: SceneVariant
  /** Visible area as x, y, width, height; thumbnails pass the scene's focus crop. */
  view?: readonly [number, number, number, number]
  art: ReactNode
  calls?: ReactNode
}

const FLECK_TILE = 64

/** Crushed shell in điệp paper: a few fixed specks per tile, no filters. */
function FleckPattern({ id }: { id: string }) {
  const r = rng(29)
  return (
    <pattern id={id} width={FLECK_TILE} height={FLECK_TILE} patternUnits="userSpaceOnUse">
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={r() * FLECK_TILE} cy={r() * FLECK_TILE} r={0.7 + r() * 0.9} fill={i % 3 ? FLECK : PAPER_SHADE} opacity={0.75} />
      ))}
    </pattern>
  )
}

/** The flat điệp-paper canvas every plate is printed on. No filters, gradients or blend modes. */
export default function PlateFrame({ title, setting, variant, view, art, calls }: Props) {
  const prefix = 'p' + useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const tones = Object.keys(TONES) as Tone[]
  const ids: PlateIds = {
    fleck: `${prefix}-fleck`,
    call: Object.fromEntries(tones.map(tone => [tone, `${prefix}-call-${tone}`])) as Record<Tone, string>,
    ret: Object.fromEntries(tones.map(tone => [tone, `${prefix}-ret-${tone}`])) as Record<Tone, string>,
  }
  const thumbnail = variant === 'thumbnail'
  const [vx, vy, vw, vh] = view ?? [0, 0, W, H]

  return (
    <svg
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      width="100%"
      height={thumbnail ? '100%' : undefined}
      preserveAspectRatio={thumbnail ? 'xMidYMid slice' : 'xMidYMid meet'}
      role={thumbnail ? undefined : 'img'}
      aria-label={thumbnail ? undefined : title}
      aria-hidden={thumbnail ? true : undefined}
      focusable="false"
      data-scene-frame="dong-ho-plate"
      data-scene-variant={variant}
      style={{ display: 'block', maxWidth: '100%' }}
    >
      {!thumbnail && <title>{title}</title>}
      <defs>
        <ArrowMarkers ids={ids} />
        {!thumbnail && <FleckPattern id={ids.fleck} />}
      </defs>
      <PlateIdsContext.Provider value={ids}>
        <PlateVariantContext.Provider value={variant}>
          <rect width={W} height={H} fill={SETTINGS[setting]} />
          {!thumbnail && <rect width={W} height={H} fill={url(ids.fleck)} pointerEvents="none" />}
          <g data-scene-art="true">{art}</g>
          {calls && <g data-scene-calls="true">{calls}</g>}
        </PlateVariantContext.Provider>
      </PlateIdsContext.Provider>
    </svg>
  )
}
