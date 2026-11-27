import type { Prose } from '../types/pattern'
import { normalizeProse } from '../utils/prose'

export default function PatternProse({ value, className = '' }: { value: Prose; className?: string }) {
  return (
    <div className={`pattern-prose ${className}`.trim()}>
      {normalizeProse(value).map((block, index) => block.type === 'paragraph'
        ? <p key={index}>{block.text}</p>
        : <ul key={index}>{block.items.map((item, i) => <li key={i}>{item}</li>)}</ul>)}
    </div>
  )
}
