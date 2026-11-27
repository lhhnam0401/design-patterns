import type { Prose, ProseBlock } from '../types/pattern'

export function normalizeProse(prose: Prose): ProseBlock[] {
  return typeof prose === 'string' ? [{ type: 'paragraph', text: prose }] : prose
}

/** Plain text, one line per paragraph or list item. */
export function flattenProse(prose: Prose): string {
  return normalizeProse(prose)
    .flatMap(block => (block.type === 'paragraph' ? [block.text] : block.items))
    .join('\n')
}

/** First paragraph, or first list item when no paragraph comes first. */
export function summarizeProse(prose: Prose): string {
  const first = normalizeProse(prose)[0]
  if (!first) return ''
  return first.type === 'paragraph' ? first.text : (first.items[0] ?? '')
}

/** Indexes of blocks that are empty: blank paragraph, empty list, or any blank item. */
export function invalidProseBlocks(prose: Prose): number[] {
  return normalizeProse(prose).flatMap((block, index) => {
    const bad = block.type === 'paragraph'
      ? !block.text.trim()
      : block.items.length === 0 || block.items.some(item => !item.trim())
    return bad ? [index] : []
  })
}
