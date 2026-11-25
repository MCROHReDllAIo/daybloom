import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Flower2 } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { t, lang, setLang, isLoggedIn, logout, user } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/timetable', label: t.nav.timetable },
    { to: '/training', label: t.nav.training },
    { to: '/plan', label: t.nav.plan },
    { to: '/progress', label: t.nav.progress },
    { to: '/profile', label: t.nav.profile },
  ]

  const onLogout = () => {
    logout()
    navigate('/login')
    setOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <Flower2 size={22} />
          </span>
          <span>{t.brand}</span>
        </Link>

        <nav className="nav-links">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="lang-btn"
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label="Switch language"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>

          {isLoggedIn ? (
            <>
              <span className="badge-pill" title="XP">
                {user?.xp || 0} XP
              </span>
              <button type="button" className="btn btn-outline btn-sm" onClick={onLogout}>
                {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                {t.nav.login}
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                {t.nav.signup}
              </Link>
            </>
          )}

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          {isLoggedIn ? (
            <button type="button" className="btn btn-outline" onClick={onLogout}>
              {t.nav.logout} · {user?.xp || 0} XP
            </button>
          ) : (
            <div style={{ display: 'flex', gap: 8, padding: '0.5rem 0.85rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
                {t.nav.login}
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>
                {t.nav.signup}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
