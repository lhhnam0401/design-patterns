import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Check, Copy, TriangleAlert } from 'lucide-react'
import type { CodeExample } from '../types/pattern'

interface Props {
  examples: CodeExample[]
}

type CopyStatus = 'success' | 'error' | null

export default function CodeBlock({ examples }: Props) {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState<CopyStatus>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  if (examples.length === 0) return null
  const example = examples[active] ?? examples[0]

  const copy = async () => {
    clearTimeout(timerRef.current)
    try {
      await navigator.clipboard.writeText(example.code)
      setStatus('success')
    } catch {
      setStatus('error')
    }
    timerRef.current = setTimeout(() => setStatus(null), 2500)
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line-strong bg-inverse-surface text-inverse-ink">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-inverse-raised bg-inverse-raised px-3 py-2 sm:px-4">
        <div className="flex flex-wrap gap-1" role="tablist" aria-label={t('pattern.code_example')}>
          {examples.map((item, index) => (
            <button
              key={`${item.language}-${index}`}
              type="button"
              role="tab"
              id={`code-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`code-panel-${index}`}
              onClick={() => { setActive(index); setStatus(null) }}
              className={`min-h-10 border-b-2 px-3 py-2 font-mono text-sm transition-colors duration-200 ease-out ${
                active === index
                  ? 'border-accent text-inverse-ink'
                  : 'border-transparent text-inverse-muted hover:text-inverse-ink'
              }`}
            >
              {item.label ?? item.language}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={t('pattern.copy')}
          className="inline-flex min-h-10 items-center gap-2 border border-inverse-muted px-3 py-2 text-xs font-semibold text-inverse-ink transition-colors duration-200 ease-out hover:bg-inverse-surface"
        >
          {status === 'success' ? <Check className="h-4 w-4" aria-hidden="true" /> : status === 'error' ? <TriangleAlert className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {status === 'success' ? t('pattern.copied') : status === 'error' ? t('pattern.copy_error') : t('pattern.copy')}
        </button>
      </div>
      <div
        role="tabpanel"
        id={`code-panel-${active}`}
        aria-labelledby={`code-tab-${active}`}
      >
        <SyntaxHighlighter
          language={example.language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '0.8rem',
            lineHeight: '1.6',
            background: 'var(--inverse-surface)',
            padding: '1.25rem',
            maxHeight: '34rem',
            overflow: 'auto',
          }}
          showLineNumbers
          wrapLines
          // The code scrolls in both directions, so keyboard users need to be able to focus it.
          tabIndex={0}
          role="region"
          aria-label={`${t('pattern.code_example')}: ${example.label ?? example.language}`}
        >
          {example.code}
        </SyntaxHighlighter>
      </div>
      {status && <p className="sr-only" role="status" aria-live="polite">{status === 'success' ? t('pattern.copied') : t('pattern.copy_error')}</p>}
    </div>
  )
}
