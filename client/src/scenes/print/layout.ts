/**
 * The layout grammar every plate follows, in scene units (the canvas is 960×440).
 *
 *   RAIL    y 0–96     interfaces and abstract classes hang here as signboards,
 *                      with a bracket over exactly the objects that implement them
 *   CLIENT  x 0–200    the client stands at the left of the stage
 *   STAGE   y 96–380   participants; the flow runs left to right
 *                      (trees and chains grow away from the client)
 *   GROUND  y 380–440  floor line and tints only
 */
export const W = 960
export const H = 440

export const RAIL = { top: 0, bottom: 96 } as const
export const STAGE = { top: 96, bottom: 380 } as const
export const GROUND = 380
export const CLIENT_ZONE = { left: 0, right: 200 } as const

/** Participants are drawn at least this tall, so they stay the biggest things on the plate. */
export const MIN_PART_HEIGHT = 90

/** Story text inside the art is never smaller than this. */
export const MIN_CAPTION_SIZE = 18

/** Plate width (CSS px) from which pins show class names and in-art captions appear. */
export const NAME_BREAKPOINT = 560
