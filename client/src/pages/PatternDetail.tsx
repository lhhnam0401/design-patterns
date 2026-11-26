import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import CodeBlock from '../components/CodeBlock'
import PatternCollection from '../components/PatternCollection'
import PatternDiagram from '../components/PatternDiagram'
import { getPattern, patternsByCategory } from '../data'
import SceneExplorer from '../scenes/explorer/SceneExplorer'
import PatternScene from '../scenes/PatternScene'
import SceneLegend from '../scenes/SceneLegend'
import { sceneFor } from '../scenes/registry'
import { isPlate } from '../scenes/types'
import { patternFolio } from '../utils/presentation'
import NotFound from './NotFound'

const complexityLabel = ['', 'Simple', 'Medium', 'Complex']
const complexityLabelVi = ['', 'Đơn giản', 'Trung bình', 'Phức tạp']

function ArticleSection({ id, number, title, children }: { id: string; number: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-7">
      <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
        <span className="eyebrow tabular-nums text-accent" aria-hidden="true">{number}</span>
        <div>
          <h2 className="section-title text-ink">{title}</h2>
          <div className="prose-copy mt-4 text-ink-muted">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default function PatternDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'vi' ? 'vi' : 'en'
  const pattern = getPattern(slug ?? '')

  if (!pattern) return <NotFound />

  const scene = sceneFor(pattern.slug)

  const siblings = patternsByCategory[pattern.category]
    .filter(item => item.slug !== pattern.slug)
    .slice(0, 3)
  const complexityText = lang === 'vi'
    ? complexityLabelVi[pattern.complexity]
    : complexityLabel[pattern.complexity]

  const contents = [
    ['intent', t('pattern.intent')],
    ['problem', t('pattern.problem')],
    ['solution', t('pattern.solution')],
    ['applicability', t('pattern.applicability')],
    ['example', t('pattern.example')],
    ['structure', t('pattern.structure')],
    ['code', t('pattern.code_example')],
  ]

  return (
    <article>
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[100rem] px-5 py-10 sm:px-8 lg:px-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-muted">
            <Link to="/" className="text-link">{t('nav.home')}</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/category/${pattern.category}`} className="text-link">{t(`categories.${pattern.category}`)}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">{pattern.name[lang]}</span>
          </nav>

          <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-12">
            <p className="font-display text-[clamp(3.5rem,9vw,6rem)] leading-none tabular-nums text-accent lg:col-span-3" aria-hidden="true">
              {patternFolio(pattern)}
            </p>
            <div className="lg:col-span-7 lg:col-start-5">
              <p className="eyebrow text-support">{t(`categories.${pattern.category}`)}</p>
              <h1 className="page-title mt-4 text-ink">{pattern.name[lang]}</h1>
              {lang === 'vi' && <p className="mt-2 text-xl text-ink-muted">{pattern.name.en}</p>}
              {pattern.also_known_as && pattern.also_known_as.length > 0 && (
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">{t('pattern.also_known_as')}:</span>{' '}
                  {pattern.also_known_as.map(item => item[lang]).join(', ')}
                </p>
              )}
              <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-4 text-sm">
                <div>
                  <dt className="text-ink-muted">{t('pattern.complexity')}</dt>
                  <dd className="font-semibold text-ink">{complexityText}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">{t('pattern.popularity')}</dt>
                  <dd className="font-semibold tabular-nums text-ink">{pattern.popularity}/3</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-w-0 grid-cols-[minmax(0,1fr)] gap-12 px-5 py-12 sm:px-8 lg:max-w-[100rem] lg:grid-cols-12 lg:px-12 lg:py-20">
        <aside className="lg:col-span-3 lg:col-start-10 lg:row-start-1" aria-label={t('pattern.contents')}>
          <div className="border-t border-line pt-4 lg:sticky lg:top-24">
            <h2 className="eyebrow text-ink-muted">{t('pattern.contents')}</h2>
            <ol className="mt-4">
              {contents.map(([id, label], index) => (
                <li key={id} className="border-b border-line">
                  <a href={`#${id}`} className="flex min-h-11 items-center gap-3 py-2 text-sm text-ink transition-colors duration-200 ease-out hover:text-accent">
                    <span className="text-xs tabular-nums text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
                    <span>{label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <div className="min-w-0 space-y-12 lg:col-span-8 lg:row-start-1">
          <div aria-label={t('pattern.overview')} className="space-y-10">
            <ArticleSection id="intent" number="01" title={t('pattern.intent')}>{pattern.intent[lang]}</ArticleSection>
            <ArticleSection id="problem" number="02" title={t('pattern.problem')}>{pattern.problem[lang]}</ArticleSection>
            <ArticleSection id="solution" number="03" title={t('pattern.solution')}>{pattern.solution[lang]}</ArticleSection>
            <ArticleSection id="applicability" number="04" title={t('pattern.applicability')}>{pattern.applicability[lang]}</ArticleSection>
          </div>

          <section id="example" className="scroll-mt-24 border-t border-line pt-7">
            <p className="eyebrow text-accent">05 / {t('pattern.example')}</p>
            <h2 className="section-title mt-3 text-ink">{pattern.vietnamese_example.title[lang]}</h2>
            {scene && isPlate(scene) ? (
              <SceneExplorer key={pattern.slug} definition={scene} diagram={pattern.diagram} lang={lang} />
            ) : (
              <>
                <figure className="mt-6 w-full max-w-full overflow-hidden rounded-lg border border-line bg-scene-paper">
                  <PatternScene pattern={pattern} lang={lang} variant="detail" />
                </figure>
                {scene && <SceneLegend definition={scene} diagram={pattern.diagram} lang={lang} />}
              </>
            )}
            <p className="prose-copy mt-5 text-ink-muted">{pattern.vietnamese_example.description[lang]}</p>
          </section>

          <section id="structure" className="scroll-mt-24 border-t border-line pt-7">
            <p className="eyebrow text-accent">06</p>
            <h2 className="section-title mt-3 text-ink">{t('pattern.structure')}</h2>
            <div className="mt-6"><PatternDiagram key={pattern.slug} diagram={pattern.diagram} /></div>
            <p className="prose-copy mt-4 text-sm text-ink-muted">{pattern.structure_notes[lang]}</p>
          </section>

          <section id="code" className="scroll-mt-24 border-t border-line pt-7">
            <p className="eyebrow text-accent">07</p>
            <h2 className="section-title mt-3 text-ink">{t('pattern.code_example')}</h2>
            <div className="mt-6"><CodeBlock examples={pattern.code_examples} /></div>
          </section>
        </div>
      </div>

      <section className="border-t border-line bg-surface" aria-labelledby="related-title">
        <div className="mx-auto max-w-[100rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-accent">{t(`categories.${pattern.category}`)}</p>
              <h2 id="related-title" className="section-title mt-3 text-ink">{t('pattern.related')}</h2>
            </div>
            <Link to={`/category/${pattern.category}`} className="text-link min-h-11 py-2 text-sm font-semibold text-ink">{t('pattern.back')}</Link>
          </div>
          <PatternCollection ariaLabel={t('pattern.related')} patterns={siblings} compact />
        </div>
      </section>
    </article>
  )
}
