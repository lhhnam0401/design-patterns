import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'
import type { CodeExample } from '../types/pattern'

interface Props {
  examples: CodeExample[]
}

export default function CodeBlock({ examples }: Props) {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(examples[active].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/50">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-2 border-b border-slate-700/50">
        <div className="flex gap-1">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-1 rounded text-sm font-mono font-medium transition-colors ${
                active === i
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {ex.label ?? ex.language}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-slate-400
            hover:text-white hover:bg-slate-700 transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={examples[active].language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          fontSize: '0.8rem',
          lineHeight: '1.6',
          background: '#0d1117',
          padding: '1.25rem',
          maxHeight: '480px',
          overflow: 'auto',
        }}
        showLineNumbers
        wrapLines
      >
        {examples[active].code}
      </SyntaxHighlighter>
    </div>
  )
}
