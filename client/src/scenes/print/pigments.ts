/**
 * The Đông Hồ print palette. This is the only file under scenes/ allowed to hold
 * colour literals: every plate and drawing takes its colours from here.
 *
 * Đông Hồ printers press a black outline block, then one block per flat colour,
 * using a handful of natural pigments on shell-coated điệp paper.
 */

/** The outline block: charcoal of burnt bamboo leaves. */
export const INK = '#1d1914'

/** Điệp paper and its shades. */
export const PAPER = '#f2e9d4'
export const PAPER_LIGHT = '#fbf6ea'
export const PAPER_SHADE = '#ded1b4'
/** The sparkle of crushed seashell in the paper. */
export const FLECK = '#fffdf6'

/** Full-strength pigments, for participants. Red and green match --accent and --support. */
export const PIGMENT = {
  red: '#b4382e',
  redDark: '#84261f',
  yellow: '#e0a52b',
  yellowDark: '#a97a14',
  green: '#2f6655',
  greenDark: '#1f4a3c',
  leaf: '#4c8558',
  blue: '#33627f',
  blueDark: '#22465c',
  amber: '#9a6324',
  amberDark: '#6c4416',
  bronze: '#b07f34',
  bronzeDark: '#7a5320',
  wood: '#8a5a33',
  woodDark: '#5c3b21',
  skin: '#e8bb90',
  cheek: '#d9826b',
  white: '#fbf6ea',
  steel: '#c9cbc4',
  straw: '#e8cd8c',
  strawDark: '#a7823f',
  /** Terracotta roof tiles. */
  tile: '#a4553a',
  tileDark: '#723826',
  stone: '#a39a8a',
  stoneDark: '#6f685d',
  /** Cast-iron pots. */
  iron: '#3f3a34',
  ironLight: '#6b635a',
  /** Hoa đào blossom; hoa mai uses yellow. */
  pink: '#d9858c',
} as const

/** Pale tints (pigment mixed toward paper), for scenery that must not compete with participants. */
export const TINT = {
  red: '#e9c6b7',
  yellow: '#efdcab',
  green: '#c4d6c6',
  blue: '#c7d6da',
  amber: '#e2cca7',
  ink: '#cdc1a8',
  ground: '#e4d6b8',
  groundEdge: '#c9b690',
} as const

/** Annotation tones: one colour per kind of diagram node, shared by arrows, pins and the legend. */
export const TONES = {
  client: INK,
  class: PIGMENT.red,
  abstract: PIGMENT.green,
  interface: PIGMENT.amber,
} as const
export type Tone = keyof typeof TONES

/** Paper tints per setting. Night is shown with a moon and stars, never with a dark sky. */
export const SETTINGS = {
  night: '#e9e6d6',
  dusk: '#f1e3cf',
  dawn: '#f4ead2',
  interior: '#f0e5cf',
} as const
