import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Pattern } from '../types/pattern'
import PatternScene from '../scenes/PatternScene'
import { patternFolio } from '../utils/presentation'
import { summarizeProse } from '../utils/prose'

interface Props {
  pattern: Pattern
  compact?: boolean
}

export default function PatternCard({ pattern, compact = false }: Props) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language === 'vi' ? 'vi' : 'en'

  return (
    <article className="group h-full bg-surface transition-colors duration-200 ease-out hover:bg-surface-shift">
      <Link to={`/pattern/${pattern.slug}`} className="flex h-full flex-col text-ink">
        <div className={`${compact ? 'aspect-[12/5]' : 'aspect-[16/7]'} overflow-hidden border-b border-line bg-scene-paper`}>
          <PatternScene pattern={pattern} lang={lang} variant="thumbnail" />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <span className="eyebrow tabular-nums text-accent">{patternFolio(pattern)}</span>
            <span className="text-right text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
              {t(`categories.${pattern.category}`)}
            </span>
          </div>

          <h3 className="font-display text-[2rem] font-semibold leading-[1.05] tracking-[-0.025em] text-ink transition-colors duration-200 ease-out group-hover:text-accent">
            {pattern.name[lang]}
          </h3>
          {lang === 'vi' && <p className="mt-1 text-sm text-ink-muted">{pattern.name.en}</p>}

          <p className="mt-4 flex-1 text-sm leading-[1.65] text-ink-muted">{summarizeProse(pattern.intent[lang])}</p>

          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-4 text-xs">
            <div>
              <dt className="text-ink-muted">{t('pattern.complexity')}</dt>
              <dd className="mt-1 font-semibold tabular-nums text-ink">{pattern.complexity}/3</dd>
            </div>
            <div>
              <dt className="text-ink-muted">{t('pattern.popularity')}</dt>
              <dd className="mt-1 font-semibold tabular-nums text-ink">{pattern.popularity}/3</dd>
            </div>
          </dl>
        </div>
      </Link>
    </article>
  )
}
