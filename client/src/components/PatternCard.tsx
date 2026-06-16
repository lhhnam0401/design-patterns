import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Pattern } from '../types/pattern'

const categoryColors = {
  creational: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
  structural: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
  behavioral: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
}

const categoryBadge = {
  creational: 'bg-emerald-500/20 text-emerald-400',
  structural: 'bg-blue-500/20 text-blue-400',
  behavioral: 'bg-purple-500/20 text-purple-400',
}

function Stars({ count, max = 3, color }: { count: number; max?: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i < count ? color : 'bg-slate-700'}`}
        />
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

  return (
    <Link
      to={`/pattern/${pattern.slug}`}
      className={`block p-5 rounded-xl border bg-gradient-to-br ${colorClass}
        hover:scale-[1.02] transition-all duration-200 hover:shadow-lg hover:shadow-black/30 group`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
          {pattern.category}
        </span>
        <span className="text-2xl">{pattern.vietnamese_example.illustration.split('\n')[0]}</span>
      </div>

      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">
        {pattern.name[lang]}
      </h3>
      {lang === 'vi' && (
        <p className="text-slate-500 text-xs mb-2">{pattern.name.en}</p>
      )}

      <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
        {pattern.intent[lang]}
      </p>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>{t('pattern.complexity')}</span>
          <Stars
            count={pattern.complexity}
            color={pattern.category === 'creational' ? 'bg-emerald-400' :
                   pattern.category === 'structural' ? 'bg-blue-400' : 'bg-purple-400'}
          />
        </div>
        <div className="flex items-center gap-1.5">
          <span>{t('pattern.popularity')}</span>
          <Stars
            count={pattern.popularity}
            color="bg-amber-400"
          />
        </div>
      </div>
    </Link>
  )
}
