import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORY_ORDER, categoryFolio } from '../utils/presentation'

export default function SiteFooter() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'vi' ? 'vi' : 'en'

  return (
    <footer className="mt-auto border-t border-line bg-surface" aria-label={t('footer.label')}>
      <div className="mx-auto grid max-w-[100rem] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <Link to="/" className="font-display text-[2rem] font-semibold leading-none tracking-[-0.03em] text-ink">
            {t('site.title')}
          </Link>
          <p className="prose-copy mt-4 text-sm text-ink-muted">{t('footer.note')}</p>
        </div>
        <nav className="lg:col-span-5 lg:col-start-8" aria-label={t('footer.collections')}>
          <p className="eyebrow mb-3 text-ink-muted">{t('footer.collections')}</p>
          <ul className="border-t border-line">
            {CATEGORY_ORDER.map(category => (
              <li key={category} className="border-b border-line">
                <Link className="flex min-h-11 items-center gap-4 py-2 text-sm text-ink transition-colors duration-200 ease-out hover:text-accent" to={`/category/${category}`}>
                  <span className="tabular-nums text-ink-muted">{categoryFolio(category)}</span>
                  <span>{t(`categories.${category}`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line px-5 py-4 text-center text-xs text-ink-muted sm:px-8">
        {lang === 'vi' ? 'Lấy cảm hứng từ văn hóa truyền thống Việt Nam' : 'Inspired by Vietnamese traditional culture'} · Gang of Four
      </div>
    </footer>
  )
}
