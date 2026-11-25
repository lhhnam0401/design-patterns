/// <reference types="node" />
import { describe, expect, it } from 'vitest'
import { allPatterns } from '../data'
import { codeFor } from './codeNames'
import { documentedOutput, runPython, runTypeScript } from './sampleRunner'

// Python needs a local interpreter, so that check is opt-in:
//   RUN_PYTHON_SAMPLES=1 npx vitest run src/test/samples.test.ts
const withPython = process.env.RUN_PYTHON_SAMPLES === '1'

describe.each(allPatterns.map(p => [p.slug, p] as const))('%s code samples', (_slug, pattern) => {
  it('runs the TypeScript sample', () => {
    expect(runTypeScript(codeFor(pattern, 'typescript')).length).toBeGreaterThan(0)
  })

  it.runIf(withPython)('prints exactly the output documented in the Python sample', () => {
    const code = codeFor(pattern, 'python')
    const documented = documentedOutput(code)
    expect(documented, 'the Python sample should end with an # Output: block').not.toBeNull()
    expect(runPython(code)).toEqual(documented)
  })
})
