import { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { t, login, continueAsGuest, isLoggedIn } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || '/'} replace />
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError(t.auth.required)
      return
    }
    const res = login({ email, password })
    if (!res.ok) {
      setError(t.auth.error)
      return
    }
    navigate(location.state?.from || '/')
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>{t.auth.loginTitle}</h1>
        <p className="sub">{t.sloganSecondary}</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <label className="field">
            {t.auth.email}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label className="field">
            {t.auth.password}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          {error && (
            <div style={{ color: '#6b2f38', fontSize: '0.9rem' }}>{error}</div>
          )}
          <button type="submit" className="btn btn-primary">
            {t.auth.loginBtn}
          </button>
        </form>
        <div className="auth-switch">
          {t.auth.noAccount} <Link to="/signup">{t.nav.signup}</Link>
        </div>
        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>{t.auth.demo}</p>
          <button
            type="button"
            className="btn btn-sage btn-sm"
            onClick={() => {
              continueAsGuest()
              navigate('/')
            }}
          >
            {t.auth.guest}
          </button>
        </div>
      </div>
    </div>
  )
}
