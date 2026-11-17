import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { patternsByCategory } from '../data'
import PatternCard from '../components/PatternCard'
import type { Category } from '../types/pattern'

const categoryEmoji: Record<Category, string> = {
  creational: '🏗️',
  structural: '🔗',
  behavioral: '⚡',
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'vi'

  const cat = category as Category
  const patterns = patternsByCategory[cat] ?? []

  if (!patterns.length) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Category not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('pattern.back')}
        </Link>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{categoryEmoji[cat]}</span>
            <h1 className="text-3xl font-bold text-white">{t(`categories.${cat}`)}</h1>
          </div>
          <p className="text-slate-400">{t(`categories.${cat}_desc`)}</p>
          <p className="text-slate-600 text-sm mt-1">
            {patterns.length} {lang === 'vi' ? 'mẫu thiết kế' : 'patterns'}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {patterns.map(p => (
            <PatternCard key={p.id} pattern={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
