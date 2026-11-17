/** Scene canvas size. Every scene draws in this coordinate space. */
export const W = 960
export const H = 440

/** Woodblock outline colour. */
export const INK = '#1a110d'

/** Tag colours, matching the UML diagram's colour for each node kind. */
export const TONES = {
  client: '#fbbf24',
  class: '#60a5fa',
  abstract: '#c084fc',
  interface: '#4ade80',
} as const
export type Tone = keyof typeof TONES

/** Sky gradients, top to horizon. */
export const SKIES = {
  dusk: ['#140f2e', '#3b1a5a', '#8a2b4f', '#e0853a'],
  night: ['#030712', '#0b1533', '#1a2a5e', '#3a3470'],
  dawn: ['#111827', '#3b3f6b', '#b65a4a', '#f2b45a'],
  interior: ['#120a07', '#22110a', '#341a0e', '#4a2412'],
} as const
export type SkyName = keyof typeof SKIES

export const SKIN = '#e9b98c'
export const HAIR = '#1f1410'

/** Lacquer and woodblock colours shared by the scenes. */
export const C = {
  lacquer: '#9f1d1d',
  lacquerDark: '#6b1414',
  wood: '#5a2a14',
  woodDark: '#3a1a0c',
  tile: '#6e2a17',
  tileDark: '#4a1a0e',
  gold: '#f2b84b',
  goldDark: '#b7791f',
  paper: '#f3e3c3',
  paperDark: '#d9c39a',
  stone: '#6b625b',
  stoneDark: '#45403b',
  jade: '#2f7d5b',
  leaf: '#2c6a3f',
  leafDark: '#1b4529',
  rice: '#7fae3c',
  water: '#1d3557',
  bronze: '#8a5a1e',
  indigo: '#2b3a7a',
  cream: '#f6ead2',
} as const
