import type { ComponentType } from 'react'
import type { LocalizedText } from '../types/pattern'
import type { SkyName } from './kit/palette'

export type Lang = 'en' | 'vi'
export type SceneVariant = 'thumbnail' | 'feature' | 'detail'
export type Point = readonly [number, number]

export interface SceneArtProps {
  lang: Lang
  compact: boolean
}

// ── Plate format (the redesigned scenes) ───────────────────────

/**
 * A lettered pin on one diagram node. The visible name is never written by hand:
 * it is the diagram node's label, and each entry in `methods` is shown as `.method()`.
 */
export interface ScenePin {
  nodeId: string
  methods?: string[]
  caption: LocalizedText
  /** Centre of the pin, on the object it names, in scene coordinates. */
  at: Point
  /** Which way the name chip extends from the pin. Defaults to 'right'. */
  side?: 'left' | 'right'
  /** Set to false to keep a pin letter-only in dense groups. */
  showName?: boolean
}

/** An arrow for one method call (or its return). The plate draws it; the art never does. */
export interface SceneCall {
  /** Unique within the scene; steps refer to it. */
  id: string
  /** The diagram node that owns `method`. */
  nodeId: string
  method: string
  /** SVG path in scene coordinates; the arrowhead sits at its end. */
  d: string
  /** Calls are solid, returns are dashed. Defaults to 'call'. */
  kind?: 'call' | 'return'
}

/** One step of the walkthrough, in the order the TypeScript sample runs. */
export interface SceneStep {
  /** Ids of the arrows this step draws. */
  calls: string[]
  /** Diagram node ids this step lights. */
  nodes: string[]
  /** Centre of the numbered badge, in scene coordinates. */
  at: Point
  caption: LocalizedText
}

export type SceneSetting = 'night' | 'dusk' | 'dawn' | 'interior'

export interface SceneDefinition {
  slug: string
  title: LocalizedText
  setting: SceneSetting
  pins: ScenePin[]
  calls: SceneCall[]
  steps: SceneStep[]
  /** Thumbnail crop as x, y, width, height in scene coordinates. */
  focus: readonly [number, number, number, number]
  /** Diagram nodes deliberately not drawn, with the reason. */
  untagged: { nodeId: string; reason: string }[]
  /** The illustration only: top-level children must be Parts or Backdrops, with no code names. */
  Art: ComponentType<SceneArtProps>
}

// ── Legacy format (removed once every scene is a plate) ────────

/**
 * A label pinned to an object in the scene. The visible name is never written
 * by hand: it is the diagram node's label, plus `.method()` when `method` is set.
 */
export interface LegacySceneTag {
  nodeId: string
  method?: string
  caption: LocalizedText
  /** Centre of the tag. */
  at: Point
  /** The object the leader line points at. */
  to?: Point
}

/** An arrow for a method call. `at` places the `method()` label; omit it for an unlabelled arrow. */
export interface LegacySceneCall {
  nodeId: string
  method: string
  /** SVG path in scene coordinates; the arrowhead sits at its end. */
  d: string
  at?: Point
}

export interface LegacySceneDefinition {
  slug: string
  title: LocalizedText
  sky: SkyName
  tags: LegacySceneTag[]
  calls: LegacySceneCall[]
  /** Diagram nodes deliberately not drawn, with the reason. */
  untagged: { nodeId: string; reason: string }[]
  /** The illustration only. It must not write class or method names itself. */
  Art: ComponentType<SceneArtProps>
}

export type AnySceneDefinition = SceneDefinition | LegacySceneDefinition

export function isPlate(definition: AnySceneDefinition): definition is SceneDefinition {
  return 'pins' in definition
}
