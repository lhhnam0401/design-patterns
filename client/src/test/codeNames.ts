import type { Pattern } from '../types/pattern'

export type CodeLanguage = 'python' | 'typescript'

/** Method name from a diagram entry such as `+ makeRiceCake(): RiceCake`; null for fields. */
export function methodName(entry: string): string | null {
  const match = /^[+#-]\s*(\w+)\s*\(/.exec(entry.trim())
  if (!match || match[1] === 'constructor') return null
  return match[1]
}

/** camelCase → snake_case, the way the Python examples name methods. */
export function toSnake(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase()
}

/** Diagram labels starting with "Client" stand for client code, not a class. */
export function isClientLabel(label: string): boolean {
  return /^Client\b/.test(label)
}

export function codeFor(pattern: Pattern, language: CodeLanguage): string {
  const example = pattern.code_examples.find(c => c.language === language)
  if (!example) throw new Error(`${pattern.slug} has no ${language} example`)
  return example.code
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** True when the code declares a class (or, in TypeScript, an interface/type) with this name. */
export function declaresType(code: string, name: string, language: CodeLanguage): boolean {
  const keyword = language === 'python' ? 'class' : '(?:class|interface|type)'
  return new RegExp(`\\b${keyword}\\s+${escape(name)}\\b`).test(code)
}

/** True when `name(` appears in the code as a definition or a call. */
export function mentionsMethod(code: string, name: string): boolean {
  return new RegExp(`\\b${escape(name)}\\s*\\(`).test(code)
}
