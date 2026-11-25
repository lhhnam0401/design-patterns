/** Scene canvas size. Every scene draws in this coordinate space. */
export const W = 960
export const H = 440

/** The limited archival print palette shared by every scene. */
export const SCENE_COLORS = {
  paper: '#efe5d2',
  paperLight: '#f8f1e4',
  paperShade: '#d7c9af',
  ink: '#29251f',
  inkMuted: '#6c6459',
  vermilion: '#a93c31',
  jade: '#356659',
  ochre: '#7c5728',
  water: '#9fb8ae',
} as const

/** Woodblock outline colour. */
export const INK = SCENE_COLORS.ink

/** Annotation tones pair colour with shape and line style in the overlay. */
export const TONES = {
  client: SCENE_COLORS.ink,
  class: SCENE_COLORS.vermilion,
  abstract: SCENE_COLORS.jade,
  interface: SCENE_COLORS.ochre,
} as const
export type Tone = keyof typeof TONES

/** Flat paper fields preserve setting without cinematic skies. */
export const SKIES = {
  dusk: '#e8d6c5',
  night: '#d9dfd7',
  dawn: '#f0e2ca',
  interior: '#e7dccb',
} as const
export type SkyName = keyof typeof SKIES

export const SKIN = '#c99570'
export const HAIR = SCENE_COLORS.ink

/** Muted material colours for archival plate illustrations. */
export const C = {
  lacquer: SCENE_COLORS.vermilion,
  lacquerDark: '#7f2f29',
  wood: '#8a6043',
  woodDark: '#634632',
  tile: '#9d5544',
  tileDark: '#754237',
  gold: '#a87934',
  goldDark: SCENE_COLORS.ochre,
  paper: SCENE_COLORS.paperLight,
  paperDark: SCENE_COLORS.paperShade,
  stone: '#a89e8e',
  stoneDark: '#746d63',
  jade: SCENE_COLORS.jade,
  leaf: '#527760',
  leafDark: '#365846',
  rice: '#78904d',
  water: SCENE_COLORS.water,
  bronze: '#87652f',
  indigo: '#596b68',
  cream: SCENE_COLORS.paperLight,
} as const
