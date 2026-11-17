import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Code2, Globe2, BookMarked } from 'lucide-react'
import { patternsByCategory } from '../data'
import PatternCard from '../components/PatternCard'
import type { Category, Pattern } from '../types/pattern'

const categoryEntries = Object.entries(patternsByCategory) as [Category, Pattern[]][]

const categoryConfig = {
  creational: {
    emoji: '🏗️',
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
  },
  structural: {
    emoji: '🔗',
    color: 'from-blue-600 to-cyan-600',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  behavioral: {
    emoji: '⚡',
    color: 'from-purple-600 to-pink-600',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
  },
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'vi'

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-slate-900 to-purple-900/20" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%)`
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10
              border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
              <span>🇻🇳</span>
              <span>{lang === 'vi' ? 'Văn Hóa Truyền Thống Việt Nam' : 'Vietnamese Cultural Examples'}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {lang === 'vi' ? (
                <>Mẫu <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Thiết Kế</span></>
              ) : (
                <>Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Patterns</span></>
              )}
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t('site.description')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                <BookMarked className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300 text-sm">{t('home.total_patterns')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 text-sm">{t('home.categories')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                <Globe2 className="w-4 h-4 text-green-400" />
                <span className="text-slate-300 text-sm">{t('home.languages')}</span>
              </div>
            </div>
          </div>

          {/* Category overview cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {categoryEntries.map(
              ([cat, patterns]) => {
                const cfg = categoryConfig[cat]
                return (
                  <Link
                    key={cat}
                    to={`/category/${cat}`}
                    className={`group p-6 rounded-2xl border ${cfg.border} ${cfg.bg}
                      hover:scale-[1.02] transition-all duration-200`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.color}
                      flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                      {cfg.emoji}
                    </div>
                    <h2 className={`text-lg font-bold ${cfg.text} mb-1`}>
                      {t(`categories.${cat}`)}
                    </h2>
                    <p className="text-slate-500 text-sm mb-3">
                      {t(`categories.${cat}_desc`)}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 text-xs">
                        {patterns.length} {lang === 'vi' ? 'mẫu' : 'patterns'}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${cfg.text} group-hover:translate-x-1 transition-transform`} />
                    </div>
                  </Link>
                )
              }
            )}
          </div>
        </div>
      </section>

      {/* Patterns preview - first 3 of each */}
      {categoryEntries.map(
        ([cat, patterns]) => {
          const cfg = categoryConfig[cat]
          return (
            <section key={cat} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/50">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cfg.emoji}</span>
                  <div>
                    <h2 className="text-xl font-bold text-white">{t(`categories.${cat}`)}</h2>
                    <p className="text-slate-500 text-sm">{t(`categories.${cat}_desc`)}</p>
                  </div>
                </div>
                <Link
                  to={`/category/${cat}`}
                  className={`flex items-center gap-1.5 text-sm ${cfg.text} hover:underline`}
                >
                  {lang === 'vi' ? 'Xem tất cả' : 'View all'} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {patterns.slice(0, 3).map(p => (
                  <PatternCard key={p.id} pattern={p} />
                ))}
              </div>
            </section>
          )
        }
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-600 text-sm">
          <p>🇻🇳 {lang === 'vi' ? 'Được truyền cảm hứng từ văn hóa truyền thống Việt Nam' : 'Inspired by Vietnamese traditional culture'} &nbsp;·&nbsp; Gang of Four Design Patterns</p>
        </div>
      </footer>
    </div>
  )
}
