import { useTranslation } from 'react-i18next'
import type { Pattern } from '../types/pattern'
import PatternCard from './PatternCard'

interface Props {
  patterns: Pattern[]
  ariaLabel: string
  compact?: boolean
}

export default function PatternCollection({ patterns, ariaLabel, compact = false }: Props) {
  const { t } = useTranslation()

  if (patterns.length === 0) {
    return (
      <div className="border-y border-line bg-surface px-6 py-12" role="status">
        <p className="section-title text-ink">{t('common.empty_title')}</p>
        <p className="prose-copy mt-3 text-ink-muted">{t('common.empty_body')}</p>
      </div>
    )
  }

  return (
    <ul
      aria-label={ariaLabel}
      className={`grid list-none border-t border-line p-0 ${
        compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-3'
      }`}
    >
      {patterns.map(pattern => (
        <li key={pattern.id} className="border-b border-line md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(3n)]:border-r-0">
          <PatternCard pattern={pattern} compact={compact} />
        </li>
      ))}
    </ul>
  )
}
