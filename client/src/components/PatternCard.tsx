import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Pattern } from '../types/pattern'
import PatternScene from '../scenes/PatternScene'

const categoryColors = {
  creational: 'border-emerald-500/30 hover:border-emerald-400/60',
  structural: 'border-blue-500/30 hover:border-blue-400/60',
  behavioral: 'border-purple-500/30 hover:border-purple-400/60',
}

const categoryBadge = {
  creational: 'bg-emerald-500/20 text-emerald-400',
  structural: 'bg-blue-500/20 text-blue-400',
  behavioral: 'bg-purple-500/20 text-purple-400',
}

const dotColor = {
  creational: 'bg-emerald-400',
  structural: 'bg-blue-400',
  behavioral: 'bg-purple-400',
}

function Stars({ count, max = 3, color }: { count: number; max?: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`w-2 h-2 rounded-full ${i < count ? color : 'bg-slate-700'}`} />
      ))}
    </div>
  )
}

interface Props {
  pattern: Pattern
}

export default function PatternCard({ pattern }: Props) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'vi'
  const colorClass = categoryColors[pattern.category]
  const badgeClass = categoryBadge[pattern.category]
  const dotClass = dotColor[pattern.category]

  return (
    <Link
      to={`/pattern/${pattern.slug}`}
      className={`block rounded-xl border bg-slate-900 ${colorClass}
        hover:scale-[1.02] transition-all duration-200 hover:shadow-xl hover:shadow-black/40
        overflow-hidden group`}
    >
      {/* Cultural image thumbnail */}
      <div className="h-28 overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity">
        <PatternScene pattern={pattern} lang={lang} compact />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
            {pattern.category}
          </span>
        </div>

        <h3 className="text-white font-bold text-base mb-0.5 group-hover:text-amber-400 transition-colors line-clamp-1">
          {pattern.name[lang]}
        </h3>
        {lang === 'vi' && (
          <p className="text-slate-600 text-xs mb-1">{pattern.name.en}</p>
        )}

        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
          {pattern.intent[lang]}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>{t('pattern.complexity')}</span>
            <Stars count={pattern.complexity} color={dotClass} />
          </div>
          <div className="flex items-center gap-1.5">
            <span>{t('pattern.popularity')}</span>
            <Stars count={pattern.popularity} color="bg-amber-400" />
          </div>
        </div>
      </div>
    </Link>
  )
}
