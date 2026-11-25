import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { BADGES } from '../data/badges'
import { trainingCategories } from '../data/training'
import {
  Sparkles,
  Clock,
  Trophy,
  Bot,
  Palette,
  FileSpreadsheet,
} from 'lucide-react'

const BADGE_ICONS = {
  Clock,
  Sparkles,
  FileSpreadsheet,
  Palette,
  Bot,
  Trophy,
}

export default function Profile() {
  const { t, lang, user, updateProfile, setPreferredSkills, updateUser } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.profile?.name || '',
    major: user?.profile?.major || '',
    goals: user?.profile?.goals || '',
    photo: user?.profile?.photo || '',
    weeklyTarget: user?.weeklyTarget || 5,
  })

  const startEdit = () => {
    setForm({
      name: user?.profile?.name || '',
      major: user?.profile?.major || '',
      goals: user?.profile?.goals || '',
      photo: user?.profile?.photo || '',
      weeklyTarget: user?.weeklyTarget || 5,
    })
    setEditing(true)
  }

  const save = (e) => {
    e.preventDefault()
    updateProfile({
      name: form.name,
      major: form.major,
      goals: form.goals,
      photo: form.photo,
    })
    updateUser((u) => ({
      ...u,
      weeklyTarget: Number(form.weeklyTarget) || 5,
    }))
    setEditing(false)
  }

  const preferred = user?.preferredSkills || []
  const earned = new Set(user?.badges || [])
  const completed = user?.completedTrainings || []

  const toggleSkill = (id) => {
    if (preferred.includes(id)) {
      setPreferredSkills(preferred.filter((s) => s !== id))
    } else {
      setPreferredSkills([...preferred, id])
    }
  }

  return (
    <div>
      <header className="page-header">
        <h1>{t.profile.title}</h1>
        <p>{t.profile.subtitle}</p>
      </header>

      <section className="card section-block">
        <div className="profile-header">
          <img
            className="avatar"
            src={user?.profile?.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=daybloom`}
            alt=""
          />
          <div style={{ flex: 1 }}>
            <h2 style={{ margin: '0 0 0.25rem' }}>{user?.profile?.name}</h2>
            <p style={{ margin: 0, color: 'var(--text-soft)' }}>{user?.profile?.email}</p>
            <p style={{ margin: '0.35rem 0 0', fontWeight: 650 }}>
              {user?.profile?.major || '—'}
            </p>
            <div style={{ marginTop: 8 }} className="badge-pill">
              {user?.xp || 0} {t.profile.totalPoints}
            </div>
          </div>
          {!editing && (
            <button type="button" className="btn btn-primary btn-sm" onClick={startEdit}>
              {t.profile.edit}
            </button>
          )}
        </div>

        {editing ? (
          <form className="form-grid" style={{ marginTop: 16 }} onSubmit={save}>
            <label className="field">
              {t.profile.name}
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className="field">
              {t.profile.major}
              <input
                value={form.major}
                onChange={(e) => setForm({ ...form, major: e.target.value })}
              />
            </label>
            <label className="field">
              {t.profile.goals}
              <textarea
                rows={3}
                value={form.goals}
                onChange={(e) => setForm({ ...form, goals: e.target.value })}
              />
            </label>
            <label className="field">
              {t.profile.photo}
              <input
                value={form.photo}
                onChange={(e) => setForm({ ...form, photo: e.target.value })}
              />
            </label>
            <label className="field">
              {t.profile.weeklyTarget}
              <input
                type="number"
                min="1"
                max="40"
                value={form.weeklyTarget}
                onChange={(e) => setForm({ ...form, weeklyTarget: e.target.value })}
              />
            </label>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setEditing(false)}
              >
                {t.profile.cancel}
              </button>
              <button type="submit" className="btn btn-primary">
                {t.profile.save}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ marginTop: 16 }}>
            <h3 style={{ marginBottom: 6 }}>{t.profile.goals}</h3>
            <p style={{ color: 'var(--text-soft)', marginTop: 0 }}>
              {user?.profile?.goals || '—'}
            </p>
          </div>
        )}
      </section>

      <div className="grid-2 section-block">
        <section className="card">
          <h2 className="section-title">{t.profile.preferredSkills}</h2>
          <div className="chip-select">
            {trainingCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip${preferred.includes(c.id) ? ' active' : ''}`}
                onClick={() => toggleSkill(c.id)}
              >
                {c.title[lang]}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 12, color: 'var(--text-soft)' }}>
            {t.profile.weeklyTarget}: <strong>{user?.weeklyTarget || 5}</strong>
          </p>
        </section>

        <section className="card">
          <h2 className="section-title">{t.profile.completedTraining}</h2>
          {!completed.length ? (
            <p style={{ color: 'var(--text-soft)' }}>—</p>
          ) : (
            completed.map((key) => {
              const [cid, lv] = key.split(':')
              const cat = trainingCategories.find((c) => c.id === cid)
              return (
                <div key={key} style={{ marginBottom: 6, fontSize: '0.9rem' }}>
                  {cat?.title[lang]} — {t.training[lv]}
                </div>
              )
            })
          )}
        </section>
      </div>

      <section className="card">
        <h2 className="section-title">{t.profile.achievements}</h2>
        <div className="badge-grid">
          {BADGES.map((b) => {
            const Icon = BADGE_ICONS[b.icon] || Sparkles
            const has = earned.has(b.id)
            return (
              <div key={b.id} className={`badge-item${has ? ' earned' : ''}`}>
                <div className="badge-icon">
                  <Icon size={22} />
                </div>
                <div style={{ fontWeight: 700 }}>{b.title[lang]}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                  {b.description[lang]}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
