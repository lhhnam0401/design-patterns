import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { Gate, Hall, Roof, Wall } from '../scenes/print/architecture'
import { Bamboo, BlossomTree, Cloud, Hills, Paddy, Path, Sun, Tree } from '../scenes/print/nature'
import PlateFrame from '../scenes/print/PlateFrame'
import { Banner, Jar, Lantern, Pot, RolledScroll, Scroll, Shelf, Table } from '../scenes/print/props'

/** Drawings that can be a participant or, with `pale`, scenery. */
const drawings: Record<string, (pale: boolean) => ReactNode> = {
  'Roof': pale => <Roof cx={480} y={200} w={300} h={60} pale={pale} />,
  'Hall, one tier': pale => <Hall cx={480} y={360} w={240} h={80} pale={pale} />,
  'Hall, two tiers': pale => <Hall cx={480} y={360} w={240} h={80} tiers={2} doors={2} glow={false} pale={pale} />,
  'Gate': pale => <Gate cx={480} y={360} pale={pale} />,
  'Wall': pale => <Wall x={100} y={360} w={300} pale={pale} />,
  'Tree': pale => <Tree x={480} y={360} pale={pale} />,
  'Bamboo': pale => <Bamboo x={480} y={360} pale={pale} />,
  'Paddy': pale => <Paddy x={300} y={300} w={300} h={60} gold pale={pale} />,
  'BlossomTree, đào': pale => <BlossomTree x={480} y={360} pale={pale} />,
  'BlossomTree, mai': pale => <BlossomTree x={480} y={360} flower="mai" flip pale={pale} />,
  'Table': pale => <Table x={300} y={360} w={200} pale={pale} />,
  'Lantern, round': pale => <Lantern x={480} y={120} cord={30} pale={pale} />,
  'Lantern, tall': pale => <Lantern x={480} y={120} shape="tall" pale={pale} />,
  'Lantern, star': pale => <Lantern x={480} y={120} shape="star" pale={pale} />,
  'Scroll': pale => <Scroll x={400} y={200} rotate={-6} pale={pale} />,
  'RolledScroll': pale => <RolledScroll x={400} y={200} pale={pale} />,
  'Banner': pale => <Banner x={480} y={360} pale={pale} />,
  'Pot': pale => <Pot x={480} y={360} pale={pale} />,
  'Jar': pale => <Jar x={480} y={360} s={1.5} pale={pale} />,
  'Shelf': pale => <Shelf x={300} y={360} w={200} h={180} pale={pale} />,
}

/** Drawings that are always scenery. */
const scenery: Record<string, () => ReactNode> = {
  'Hills': () => <Hills y={300} />,
  'Sun': () => <Sun x={480} y={120} />,
  'Cloud': () => <Cloud x={480} y={120} s={1.2} />,
  'Path': () => <Path points={[[0, 440], [200, 400], [480, 380]]} />,
}

const render = (art: ReactNode) => renderToStaticMarkup(<PlateFrame title="kit" setting="dawn" variant="detail" art={art} />)

function problems(markup: string): string[] {
  const found: string[] = []
  if (/<filter|Gradient|mix-blend-mode/.test(markup)) found.push('uses a filter, gradient or blend mode')
  if (/="[^"]*(NaN|undefined|Infinity)[^"]*"/.test(markup)) found.push('has an attribute with NaN, undefined or Infinity')
  return found
}

describe('print kit drawings', () => {
  it.each(Object.entries(drawings))('%s renders flat as a participant and as pale scenery', (_name, draw) => {
    const full = render(draw(false))
    const pale = render(draw(true))
    expect(problems(full)).toEqual([])
    expect(problems(pale)).toEqual([])
    expect(pale).not.toEqual(full)
  })

  it.each(Object.entries(scenery))('%s renders flat', (_name, draw) => {
    expect(problems(render(draw()))).toEqual([])
  })
})
