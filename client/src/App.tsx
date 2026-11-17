import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PatternDetail from './pages/PatternDetail'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/pattern/:slug" element={<PatternDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
