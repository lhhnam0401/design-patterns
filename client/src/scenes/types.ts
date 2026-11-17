import type { ComponentType } from 'react'
import type { LocalizedText } from '../types/pattern'
import type { SkyName } from './kit/palette'

export type Lang = 'en' | 'vi'
export type Point = readonly [number, number]

/**
 * A label pinned to an object in the scene. The visible name is never written
 * by hand: it is the diagram node's label, plus `.method()` when `method` is set.
 */
export interface SceneTag {
  nodeId: string
  method?: string
  caption: LocalizedText
  /** Centre of the tag. */
  at: Point
  /** The object the leader line points at. */
  to?: Point
}

/** An arrow for a method call. `at` places the `method()` label; omit it for an unlabelled arrow. */
export interface SceneCall {
  nodeId: string
  method: string
  /** SVG path in scene coordinates; the arrowhead sits at its end. */
  d: string
  at?: Point
}

export interface SceneArtProps {
  lang: Lang
  compact: boolean
}

export interface SceneDefinition {
  slug: string
  title: LocalizedText
  sky: SkyName
  tags: SceneTag[]
  calls: SceneCall[]
  /** Diagram nodes deliberately not drawn, with the reason. */
  untagged: { nodeId: string; reason: string }[]
  /** The illustration only. It must not write class or method names itself. */
  Art: ComponentType<SceneArtProps>
}
