import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import SiteFooter from './SiteFooter'

export default function SiteShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <a href="#main-content" className="fixed left-4 top-3 z-[200] -translate-y-24 bg-accent px-4 py-3 font-semibold text-accent-ink transition-transform focus:translate-y-0">
        {t('common.skip')}
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
