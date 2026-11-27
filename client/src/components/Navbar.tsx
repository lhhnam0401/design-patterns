import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, X } from 'lucide-react'
import { CATEGORY_ORDER, categoryFolio } from '../utils/presentation'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const menuOpen = menuPath === location.pathname
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const languageTarget = i18n.language === 'en' ? 'vi' : 'en'
  const languageCode = t(`language.code_${languageTarget}`)

  const toggleLang = () => {
    void i18n.changeLanguage(languageTarget)
    localStorage.setItem('lang', languageTarget)
  }

  useEffect(() => {
    document.documentElement.lang = i18n.language === 'vi' ? 'vi' : 'en'
  }, [i18n.language])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      setMenuPath(null)
      menuButtonRef.current?.focus()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const navItems = CATEGORY_ORDER.map(category => ({
    to: `/category/${category}`,
    label: t(`nav.${category}`),
    folio: categoryFolio(category),
  }))

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-16 max-w-[100rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined} className="flex min-h-11 items-center gap-3 text-ink">
          <span className="font-display text-xl font-semibold leading-none tracking-[-0.03em] sm:text-2xl">{t('site.title')}</span>
          <span className="hidden border-l border-line pl-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.12em] text-ink-muted sm:block">
            {t('site.brand_top')}<br />{t('site.brand_bottom')}
          </span>
        </Link>

        <nav className="hidden items-stretch self-stretch md:flex" aria-label={t('nav.primary')}>
          {navItems.map(item => {
            const active = location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`flex min-w-28 items-center gap-2 border-x border-transparent px-4 text-sm transition-colors duration-200 ease-out hover:border-line hover:bg-surface ${
                  active ? 'border-line bg-surface text-accent' : 'text-ink-muted hover:text-ink'
                }`}
              >
                <span className="text-xs tabular-nums">{item.folio}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={t('nav.switch_to', { language: t(`language.${languageTarget}`), code: languageCode })}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 text-sm font-semibold text-ink transition-colors duration-200 ease-out hover:bg-surface hover:text-accent"
          >
            <Globe className="h-4 w-4" aria-hidden="true" />
            <span>{languageCode}</span>
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={t(menuOpen ? 'nav.close' : 'nav.open')}
            onClick={() => setMenuPath(path => path === location.pathname ? null : location.pathname)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-ink transition-colors duration-200 ease-out hover:bg-surface hover:text-accent md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-navigation" className="border-t border-line bg-surface px-5 py-3 md:hidden" aria-label={t('nav.mobile')}>
          <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined} className="flex min-h-12 items-center justify-between border-b border-line py-2 text-ink">
            <span className="text-xs tabular-nums text-ink-muted">00</span>
            <span>{t('nav.home')}</span>
          </Link>
          {navItems.map(item => (
            <Link key={item.to} to={item.to} aria-current={location.pathname.startsWith(item.to) ? 'page' : undefined} className="flex min-h-12 items-center justify-between border-b border-line py-2 text-ink">
              <span className="text-xs tabular-nums text-ink-muted">{item.folio}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
