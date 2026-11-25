import { useTranslation } from 'react-i18next'

export default function PageLoader() {
  const { t } = useTranslation()
  return (
    <div className="mx-auto min-h-[60vh] max-w-[100rem] px-5 py-12 sm:px-8 lg:px-12" aria-busy="true" aria-live="polite">
      <span className="sr-only">{t('common.loading')}</span>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="h-56 animate-pulse bg-surface-shift lg:col-span-7" />
        <div className="h-56 animate-pulse bg-surface-shift lg:col-span-5" />
      </div>
      <div className="mt-16 h-px bg-line" />
    </div>
  )
}
