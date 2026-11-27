import type { SceneDefinition } from './types'
import abstractFactory from './abstract-factory'
import adapter from './adapter'
import bridge from './bridge'
import builder from './builder'
import chain from './chain-of-responsibility'
import command from './command'
import composite from './composite'
import decorator from './decorator'
import facade from './facade'
import factoryMethod from './factory-method'
import flyweight from './flyweight'
import interpreter from './interpreter'
import iterator from './iterator'
import mediator from './mediator'
import memento from './memento'
import observer from './observer'
import prototype from './prototype'
import proxy from './proxy'
import singleton from './singleton'
import state from './state'
import strategy from './strategy'
import templateMethod from './template-method'
import visitor from './visitor'

const definitions: SceneDefinition[] = [
  factoryMethod,
  abstractFactory,
  builder,
  prototype,
  singleton,
  adapter,
  bridge,
  composite,
  decorator,
  facade,
  flyweight,
  proxy,
  chain,
  command,
  interpreter,
  iterator,
  mediator,
  memento,
  observer,
  state,
  strategy,
  templateMethod,
  visitor,
]

export const scenes: Record<string, SceneDefinition> = Object.fromEntries(definitions.map(d => [d.slug, d]))

export function sceneFor(slug: string): SceneDefinition | undefined {
  return scenes[slug]
}
