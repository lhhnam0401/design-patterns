import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <section className="mx-auto grid min-h-[65vh] max-w-[100rem] items-center gap-8 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12">
      <p className="font-display text-[clamp(5.5rem,18vw,11rem)] leading-none text-accent lg:col-span-4" aria-hidden="true">404</p>
      <div className="border-t border-line pt-6 lg:col-span-6 lg:col-start-7">
        <p className="eyebrow text-ink-muted">{t('common.archive')}</p>
        <h1 className="page-title mt-4 text-ink">{t('not_found.title')}</h1>
        <p className="prose-copy mt-5 text-ink-muted">{t('not_found.body')}</p>
        <Link to="/" className="mt-8 inline-flex min-h-11 items-center border border-ink px-5 py-2 font-semibold text-ink transition-colors duration-200 ease-out hover:bg-ink hover:text-surface">
          {t('not_found.back')}
        </Link>
      </div>
    </section>
  )
}
