import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Lightbulb, AlertCircle, CheckCircle2, Zap, GitBranch, ImageIcon } from 'lucide-react'
import { getPattern, patternsByCategory } from '../data'
import CodeBlock from '../components/CodeBlock'
import PatternDiagram from '../components/PatternDiagram'
import PatternCard from '../components/PatternCard'
import PatternScene from '../scenes/PatternScene'

const complexityLabel = ['', 'Simple', 'Medium', 'Complex']
const complexityLabelVi = ['', 'Đơn giản', 'Trung bình', 'Phức tạp']

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-400">{icon}</span>
        <h2 className="text-sm font-semibold text-white uppercase tracking-wide">{title}</h2>
      </div>
      <div className="text-slate-400 text-sm leading-relaxed pl-6">{children}</div>
    </div>
  )
}

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-slate-500">{icon}</span>
      <h2 className="text-sm font-semibold text-white uppercase tracking-wide">{label}</h2>
    </div>
  )
}

export default function PatternDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'vi'

  const pattern = getPattern(slug ?? '')
  if (!pattern) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Pattern not found</p>
      </div>
    )
  }

  const siblings = patternsByCategory[pattern.category]
    .filter(p => p.slug !== pattern.slug)
    .slice(0, 3)

  const complexityText = lang === 'vi'
    ? complexityLabelVi[pattern.complexity]
    : complexityLabel[pattern.complexity]

  const categoryColor = {
    creational: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    structural: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    behavioral: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  }[pattern.category]

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-white transition-colors">
            {lang === 'vi' ? 'Trang chủ' : 'Home'}
          </Link>
          <span>/</span>
          <Link to={`/category/${pattern.category}`} className="hover:text-white transition-colors capitalize">
            {t(`categories.${pattern.category}`)}
          </Link>
          <span>/</span>
          <span className="text-slate-300">{pattern.name[lang]}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-8 min-w-0">

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}>
                  {t(`categories.${pattern.category}`)}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-slate-800 border border-slate-700 text-slate-400">
                  {t('pattern.complexity')}: {complexityText}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-1">{pattern.name[lang]}</h1>
              {lang === 'vi' && <p className="text-slate-500 text-lg">{pattern.name.en}</p>}
              {pattern.also_known_as && pattern.also_known_as.length > 0 && (
                <p className="text-slate-600 text-sm mt-2">
                  {t('pattern.also_known_as')}: {pattern.also_known_as.map(a => a[lang]).join(', ')}
                </p>
              )}
            </div>

            {/* ── Cultural illustration image ── */}
            <div>
              <SectionHeader icon={<ImageIcon className="w-4 h-4" />} label={t('pattern.example')} />
              <div className="rounded-xl overflow-x-auto border border-amber-500/20 bg-slate-950">
                <div className="min-w-[640px]">
                  <PatternScene pattern={pattern} lang={lang} />
                </div>
              </div>
              <div className="mt-3 px-1">
                <p className="text-amber-400 font-semibold text-sm mb-1">
                  {pattern.vietnamese_example.title[lang]}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {pattern.vietnamese_example.description[lang]}
                </p>
              </div>
            </div>

            {/* ── UML Structure Diagram ── */}
            <div>
              <SectionHeader icon={<GitBranch className="w-4 h-4" />} label={t('pattern.structure')} />
              <PatternDiagram diagram={pattern.diagram} />
              <p className="text-slate-500 text-xs mt-2 px-1">{pattern.structure_notes[lang]}</p>
            </div>

            {/* Intent / Problem / Solution / Applicability */}
            <div className="space-y-6 p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <Section icon={<Lightbulb className="w-4 h-4" />} title={t('pattern.intent')}>
                {pattern.intent[lang]}
              </Section>
              <div className="border-t border-slate-800" />
              <Section icon={<AlertCircle className="w-4 h-4" />} title={t('pattern.problem')}>
                {pattern.problem[lang]}
              </Section>
              <div className="border-t border-slate-800" />
              <Section icon={<CheckCircle2 className="w-4 h-4" />} title={t('pattern.solution')}>
                {pattern.solution[lang]}
              </Section>
              <div className="border-t border-slate-800" />
              <Section icon={<Zap className="w-4 h-4" />} title={t('pattern.applicability')}>
                {pattern.applicability[lang]}
              </Section>
            </div>

            {/* Code examples */}
            <div>
              <SectionHeader icon={<span className="text-xs font-mono text-slate-500">{'{}'}</span>} label={t('pattern.code_example')} />
              <CodeBlock examples={pattern.code_examples} />
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">
                {lang === 'vi' ? 'Xem thêm' : 'More Patterns'}
              </h3>
              {siblings.map(p => (
                <PatternCard key={p.id} pattern={p} />
              ))}
              <Link
                to={`/category/${pattern.category}`}
                className="mt-2 flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('pattern.back')}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
