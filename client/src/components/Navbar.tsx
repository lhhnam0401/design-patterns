import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen, Globe } from 'lucide-react'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const toggleLang = () => {
    const next = i18n.language === 'en' ? 'vi' : 'en'
    i18n.changeLanguage(next)
    localStorage.setItem('lang', next)
  }

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/category/creational', label: t('nav.creational') },
    { to: '/category/structural', label: t('nav.structural') },
    { to: '/category/behavioral', label: t('nav.behavioral') },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <span className="hidden sm:block">
              {i18n.language === 'vi' ? 'Mẫu Thiết Kế' : 'Design Patterns'}
            </span>
            <span className="sm:hidden">DP</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.to
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              onClick={toggleLang}
              className="ml-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium
                bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
            >
              <Globe className="w-4 h-4" />
              {i18n.language === 'en' ? 'VI' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
