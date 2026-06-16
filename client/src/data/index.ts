import { creationalPatterns } from './creational'
import { structuralPatterns } from './structural'
import { behavioralPatterns } from './behavioral'
import type { Pattern, Category } from '../types/pattern'

export const allPatterns: Pattern[] = [
  ...creationalPatterns,
  ...structuralPatterns,
  ...behavioralPatterns,
]

export const patternsByCategory: Record<Category, Pattern[]> = {
  creational: creationalPatterns,
  structural: structuralPatterns,
  behavioral: behavioralPatterns,
}

export function getPattern(slug: string): Pattern | undefined {
  return allPatterns.find(p => p.slug === slug)
}

export { creationalPatterns, structuralPatterns, behavioralPatterns }
