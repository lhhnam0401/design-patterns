import { describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import { codeFor, declaresType, isClientLabel, mentionsMethod, methodName, toSnake } from './codeNames'

describe.each(allPatterns.map(p => [p.slug, p] as const))('%s: diagram matches code', (_slug, pattern) => {
  const ts = codeFor(pattern, 'typescript')
  const py = codeFor(pattern, 'python')
  const classNodes = pattern.diagram.nodes.filter(n => !isClientLabel(n.label))

  it('declares every diagram class in TypeScript and Python', () => {
    const missingTs = classNodes.filter(n => !declaresType(ts, n.label, 'typescript')).map(n => n.label)
    const missingPy = classNodes.filter(n => !declaresType(py, n.label, 'python')).map(n => n.label)
    expect({ missingTs, missingPy }).toEqual({ missingTs: [], missingPy: [] })
  })

  it('uses every diagram method in TypeScript (camelCase) and Python (snake_case)', () => {
    const missingTs: string[] = []
    const missingPy: string[] = []
    for (const node of pattern.diagram.nodes) {
      for (const entry of node.methods ?? []) {
        const name = methodName(entry)
        if (!name) continue
        if (!mentionsMethod(ts, name)) missingTs.push(`${node.label}.${name}`)
        if (!mentionsMethod(py, toSnake(name))) missingPy.push(`${node.label}.${toSnake(name)}`)
      }
    }
    expect({ missingTs, missingPy }).toEqual({ missingTs: [], missingPy: [] })
  })

  it('only connects nodes that exist', () => {
    const ids = new Set(pattern.diagram.nodes.map(n => n.id))
    const dangling = pattern.diagram.edges.filter(e => !ids.has(e.from) || !ids.has(e.to))
    expect(dangling).toEqual([])
  })
})
