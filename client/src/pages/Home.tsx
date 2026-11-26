import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PatternCollection from '../components/PatternCollection'
import { allPatterns, patternsByCategory } from '../data'
import PatternScene from '../scenes/PatternScene'
import { CATEGORY_ORDER, categoryFolio } from '../utils/presentation'

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'vi' ? 'vi' : 'en'
  const featurePattern = patternsByCategory.creational[1] ?? allPatterns[0]

  return (
    <div>
      <section className="paper-texture border-b border-line" aria-labelledby="home-title">
        <div className="mx-auto grid max-w-[100rem] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">{t('home.archive')}</p>
            <h1 id="home-title" className="display-title mt-5 max-w-[10ch] text-ink">{t('site.title')}</h1>
            <p className="mt-7 max-w-[56ch] text-xl leading-[1.6] text-ink-muted">{t('home.intro', { count: allPatterns.length })}</p>
            <p className="mt-5 border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink-muted">{t('home.catalogue_note')}</p>
          </div>

          <figure className="lg:col-span-5">
            <div className="@container overflow-hidden rounded-lg border border-line bg-scene-paper">
              <PatternScene pattern={featurePattern} lang={lang} variant="feature" />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-4 text-xs text-ink-muted">
              <span>{featurePattern.vietnamese_example.title[lang]}</span>
              <span className="shrink-0 tabular-nums">{allPatterns.length} {t('home.patterns')}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-[100rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-20" aria-labelledby="collections-title">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-ink-muted">01—03</p>
            <h2 id="collections-title" className="section-title mt-3 max-w-[12ch] text-ink">{t('home.collections')}</h2>
          </div>
          <ol className="border-t border-line lg:col-span-8">
            {CATEGORY_ORDER.map(category => {
              const patterns = patternsByCategory[category]
              return (
                <li key={category} className="border-b border-line">
                  <Link
                    to={`/category/${category}`}
                    className="group grid min-h-32 gap-4 py-6 transition-colors duration-200 ease-out hover:bg-surface sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:px-4"
                  >
                    <span className="font-display text-[2rem] tabular-nums text-accent">{categoryFolio(category)}</span>
                    <span>
                      <strong className="block font-display text-2xl font-semibold tracking-[-0.02em] text-ink group-hover:text-accent">{t(`categories.${category}`)}</strong>
                      <span className="mt-2 block max-w-[55ch] text-sm leading-relaxed text-ink-muted">{t(`categories.${category}_desc`)}</span>
                    </span>
                    <span className="flex items-center justify-between gap-4 text-sm text-ink-muted sm:block sm:text-right">
                      <span className="block tabular-nums">{patterns.length} {t('home.patterns')}</span>
                      <span className="mt-2 block text-ink underline decoration-line-strong underline-offset-4">{t('home.view_collection')}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {CATEGORY_ORDER.map((category, categoryIndex) => {
        const patterns = patternsByCategory[category]
        return (
          <section key={category} className="border-t border-line bg-surface" aria-labelledby={`${category}-selection`}>
            <div className="mx-auto max-w-[100rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="eyebrow text-accent">{String(categoryIndex + 1).padStart(2, '0')} / {t('home.selected')}</p>
                  <h2 id={`${category}-selection`} className="section-title mt-3 text-ink">{t(`categories.${category}`)}</h2>
                </div>
                <Link to={`/category/${category}`} className="text-link min-h-11 self-start py-2 text-sm font-semibold text-ink sm:self-auto">
                  {t('home.view_all')}
                </Link>
              </div>
              <PatternCollection ariaLabel={t(`categories.${category}`)} patterns={patterns.slice(0, 3)} compact />
            </div>
          </section>
        )
      })}
    </div>
  )
}
