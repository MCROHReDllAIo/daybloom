import { useEffect } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Flower2 } from 'lucide-react'
import Navbar from './Navbar'
import { useApp } from '../context/AppContext'

export default function Layout() {
  const { toast, t } = useApp()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="footer-inner">
          <Link to="/" className="brand" style={{ fontSize: '1rem' }}>
            <span className="brand-mark" style={{ width: 32, height: 32 }}>
              <Flower2 size={16} />
            </span>
            <span>{t.brand}</span>
          </Link>
          <p className="footer-slogan">{t.slogan}</p>
          <p className="footer-copy">© {new Date().getFullYear()} DAYBLOOM</p>
        </div>
      </footer>
      {toast && (
        <div key={toast.id} className={`toast ${toast.type || 'success'}`} role="status">
          {toast.message}
        </div>
      )}
    </div>
  )
}
