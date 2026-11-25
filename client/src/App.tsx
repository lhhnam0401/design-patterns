import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './i18n'
import PageLoader from './components/PageLoader'
import SiteShell from './components/SiteShell'

const Home = lazy(() => import('./pages/Home'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const PatternDetail = lazy(() => import('./pages/PatternDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <SiteShell>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/pattern/:slug" element={<PatternDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </SiteShell>
    </BrowserRouter>
  )
}
