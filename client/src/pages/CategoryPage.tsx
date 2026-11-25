import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PatternCollection from '../components/PatternCollection'
import { patternsByCategory } from '../data'
import { categoryFolio, isCategory } from '../utils/presentation'
import NotFound from './NotFound'

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'vi' ? 'vi' : 'en'

  if (!isCategory(category)) return <NotFound />

  const patterns = patternsByCategory[category]

  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[100rem] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
          <Link to="/" className="text-link inline-flex min-h-11 items-center text-sm font-semibold text-ink">
            {t('pattern.back')}
          </Link>
          <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-12">
            <p className="font-display text-[clamp(4rem,10vw,7rem)] leading-none tabular-nums text-accent lg:col-span-3" aria-hidden="true">
              {categoryFolio(category)}
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <p className="eyebrow text-ink-muted">{t('common.archive')}</p>
              <h1 className="page-title mt-4 text-ink">{t(`categories.${category}`)}</h1>
              <p className="prose-copy mt-5 text-ink-muted">{t(`categories.${category}_desc`)}</p>
              <p className="mt-5 text-sm font-semibold tabular-nums text-support">
                {patterns.length} {lang === 'vi' ? 'mẫu thiết kế' : patterns.length === 1 ? 'pattern' : 'patterns'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[100rem] px-5 py-12 sm:px-8 lg:px-12 lg:py-16" aria-label={t(`categories.${category}`)}>
        <PatternCollection ariaLabel={t(`categories.${category}`)} patterns={patterns} />
      </section>
    </div>
  )
}
