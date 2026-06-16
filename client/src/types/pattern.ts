export type Category = 'creational' | 'structural' | 'behavioral'

export interface LocalizedText {
  en: string
  vi: string
}

export interface CodeExample {
  language: string
  code: string
  label?: string
}

export interface Pattern {
  id: string
  name: LocalizedText
  category: Category
  slug: string
  complexity: 1 | 2 | 3
  popularity: 1 | 2 | 3
  also_known_as?: LocalizedText[]
  intent: LocalizedText
  problem: LocalizedText
  solution: LocalizedText
  applicability: LocalizedText
  vietnamese_example: {
    title: LocalizedText
    description: LocalizedText
    illustration: string  // emoji/unicode art or ASCII
  }
  code_examples: CodeExample[]
  structure_notes: LocalizedText
}
