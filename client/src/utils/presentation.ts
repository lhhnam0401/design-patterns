import { patternsByCategory } from '../data'
import type { Category, Pattern } from '../types/pattern'

export const CATEGORY_ORDER: Category[] = ['creational', 'structural', 'behavioral']

export const CATEGORY_PREFIX: Record<Category, string> = {
  creational: 'C',
  structural: 'S',
  behavioral: 'B',
}

export function isCategory(value: string | undefined): value is Category {
  return value !== undefined && CATEGORY_ORDER.includes(value as Category)
}

export function categoryFolio(category: Category): string {
  return String(CATEGORY_ORDER.indexOf(category) + 1).padStart(2, '0')
}

export function patternFolio(pattern: Pattern): string {
  const index = patternsByCategory[pattern.category].findIndex(item => item.slug === pattern.slug)
  const ordinal = index >= 0 ? index + 1 : 0
  return `${CATEGORY_PREFIX[pattern.category]}–${String(ordinal).padStart(2, '0')}`
}
