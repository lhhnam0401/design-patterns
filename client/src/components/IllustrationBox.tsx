import { useTranslation } from 'react-i18next'
import type { Pattern } from '../types/pattern'

interface Props {
  pattern: Pattern
}

export default function IllustrationBox({ pattern }: Props) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'en' | 'vi'

  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 overflow-hidden">
      <div className="px-5 py-3 border-b border-amber-500/20 flex items-center gap-2">
        <span className="text-lg">🇻🇳</span>
        <h3 className="text-amber-400 font-semibold text-sm">{t('pattern.example')}</h3>
      </div>

      <div className="p-5">
        <h4 className="text-white font-bold text-base mb-2">
          {pattern.vietnamese_example.title[lang]}
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          {pattern.vietnamese_example.description[lang]}
        </p>

        <pre className="font-mono text-xs text-emerald-300/80 bg-slate-900/60 rounded-lg p-4
          border border-slate-700/50 overflow-x-auto leading-relaxed whitespace-pre">
          {pattern.vietnamese_example.illustration}
        </pre>
      </div>
    </div>
  )
}
