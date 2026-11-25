/// <reference types="node" />
import { spawnSync } from 'node:child_process'
import { format } from 'node:util'
import { createContext, runInContext } from 'node:vm'
import ts from 'typescript'

/** Transpiles a TypeScript sample and runs it in a fresh context. Returns the lines it logs. */
export function runTypeScript(code: string): string[] {
  const { outputText } = ts.transpileModule(code, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  })
  const lines: string[] = []
  const log = (...args: unknown[]) => { lines.push(...format(...args).split('\n')) }
  const context = createContext({
    console: { log, info: log, warn: log, error: log },
    exports: {},
    module: { exports: {} },
  })
  runInContext(outputText, context, { timeout: 5000 })
  return lines
}

/** Runs a Python sample with the local interpreter. Returns null when Python is not installed. */
export function runPython(code: string): string[] | null {
  const result = spawnSync('python', ['-X', 'utf8', '-'], {
    input: code,
    encoding: 'utf8',
    timeout: 30000,
    env: { ...process.env, PYTHONIOENCODING: 'utf-8' },
  })
  if (result.error) return null
  if (result.status !== 0) throw new Error(result.stderr)
  return result.stdout.replace(/\r\n/g, '\n').replace(/\s+$/, '').split('\n')
}

/** The lines of the trailing `# Output:` comment block, without the `# ` prefix. */
export function documentedOutput(code: string): string[] | null {
  const lines = code.split('\n')
  const start = lines.findIndex(line => /^# Output:\s*$/.test(line))
  if (start === -1) return null
  return lines.slice(start + 1)
    .filter(line => line.startsWith('#'))
    .map(line => line.replace(/^# ?/, ''))
}
