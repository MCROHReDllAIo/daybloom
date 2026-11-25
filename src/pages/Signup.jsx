import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Signup() {
  const { t, signup, continueAsGuest, isLoggedIn } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError(t.auth.required)
      return
    }
    const res = signup({ name, email, password })
    if (!res.ok) {
      setError(t.auth.exists)
      return
    }
    navigate('/')
  }

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h1>{t.auth.signupTitle}</h1>
        <p className="sub">{t.slogan}</p>
        <form className="form-grid" onSubmit={onSubmit}>
          <label className="field">
            {t.auth.name}
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </label>
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
              autoComplete="new-password"
            />
          </label>
          {error && (
            <div style={{ color: '#6b2f38', fontSize: '0.9rem' }}>{error}</div>
          )}
          <button type="submit" className="btn btn-primary">
            {t.auth.signupBtn}
          </button>
        </form>
        <div className="auth-switch">
          {t.auth.hasAccount} <Link to="/login">{t.nav.login}</Link>
        </div>
        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
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
