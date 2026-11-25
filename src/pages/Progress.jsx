import { useApp } from '../context/AppContext'
import { BADGES } from '../data/badges'
import {
  Clock,
  CheckSquare,
  GraduationCap,
  Award,
  Sparkles,
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

export default function Progress() {
  const { t, lang, user, stats, toggleGoal } = useApp()
  const motiv = t.motiv[Math.floor(Date.now() / 86400000) % t.motiv.length]
  const earned = new Set(user?.badges || [])

  return (
    <div>
      <header className="page-header">
        <h1>{t.progress.title}</h1>
        <p>{t.progress.subtitle}</p>
      </header>

      <div className="motiv-banner">{motiv}</div>

      <div className="grid-4 section-block">
        <div className="card stat-card">
          <Clock size={22} />
          <div className="stat-value">{stats.studyHours}</div>
          <div className="stat-label">{t.progress.studyHours}</div>
        </div>
        <div className="card stat-card">
          <CheckSquare size={22} />
          <div className="stat-value">
            {stats.completedTasks}/{stats.totalTasks}
          </div>
          <div className="stat-label">{t.progress.completedTasks}</div>
        </div>
        <div className="card stat-card">
          <GraduationCap size={22} />
          <div className="stat-value">{stats.trainingHours}</div>
          <div className="stat-label">{t.progress.trainingHours}</div>
        </div>
        <div className="card stat-card">
          <Award size={22} />
          <div className="stat-value">{stats.xp}</div>
          <div className="stat-label">{t.progress.xp}</div>
        </div>
      </div>

      <div className="grid-2 section-block">
        <section className="card">
          <h2 className="section-title">{t.progress.timetablePct}</h2>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
            {stats.timetablePct}%
          </div>
          <div className="progress-bar" style={{ height: 14 }}>
            <span style={{ width: `${stats.timetablePct}%` }} />
          </div>
          <p style={{ color: 'var(--text-soft)', marginTop: 12 }}>
            {t.progress.completedTasks}: {stats.completedTasks} / {stats.totalTasks}
          </p>
        </section>

        <section className="card">
          <h2 className="section-title">{t.progress.trainingPct}</h2>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
            {stats.trainingPct}%
          </div>
          <div className="progress-bar" style={{ height: 14 }}>
            <span style={{ width: `${stats.trainingPct}%` }} />
          </div>
          <p style={{ color: 'var(--text-soft)', marginTop: 12 }}>
            {t.progress.completedCourses}: {stats.completedCourses} ·{' '}
            {t.progress.skillsDeveloped}: {stats.skillsDeveloped}
          </p>
        </section>
      </div>

      <div className="grid-2 section-block">
        <section className="card">
          <h2 className="section-title">{t.progress.weeklyLearning}</h2>
          <SimpleBars
            labels={
              lang === 'ar'
                ? ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت']
                : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            }
            values={weekTrainingMinutes(user?.activities || [])}
          />
        </section>

        <section className="card">
          <h2 className="section-title">{t.progress.dailyGoals}</h2>
          {(user?.dailyGoals || []).map((g) => (
            <label key={g.id} className="goal-item">
              <input
                type="checkbox"
                checked={!!g.completed}
                onChange={() => toggleGoal(g.id)}
              />
              <span style={{ textDecoration: g.completed ? 'line-through' : 'none' }}>
                {t.goals[g.key]}
              </span>
            </label>
          ))}
        </section>
      </div>

      <section className="card">
        <h2 className="section-title">{t.progress.badges}</h2>
        <div className="badge-grid">
          {BADGES.map((b) => {
            const Icon = BADGE_ICONS[b.icon] || Sparkles
            const has = earned.has(b.id)
            return (
              <div key={b.id} className={`badge-item${has ? ' earned' : ''}`}>
                <div className="badge-icon">
                  <Icon size={22} />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{b.title[lang]}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)', marginTop: 4 }}>
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

function weekTrainingMinutes(activities) {
  const mins = [0, 0, 0, 0, 0, 0, 0]
  for (const a of activities) {
    if (a.category !== 'training') continue
    const day = new Date(a.date + 'T12:00:00').getDay()
    const [sh, sm] = a.start.split(':').map(Number)
    const [eh, em] = a.end.split(':').map(Number)
    mins[day] += eh * 60 + em - (sh * 60 + sm)
  }
  return mins
}

function SimpleBars({ labels, values }) {
  const max = Math.max(30, ...values)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        height: 140,
        paddingTop: 8,
      }}
    >
      {values.map((v, i) => (
        <div key={labels[i]} style={{ flex: 1, textAlign: 'center' }}>
          <div
            style={{
              height: `${Math.round((v / max) * 100)}%`,
              minHeight: v ? 8 : 2,
              background: 'linear-gradient(180deg, #dcccf3, #d9ebdd)',
              borderRadius: '10px 10px 4px 4px',
              transition: 'height 0.4s ease',
            }}
            title={`${v} min`}
          />
          <div style={{ fontSize: '0.7rem', marginTop: 6, color: 'var(--text-soft)' }}>
            {labels[i]}
          </div>
        </div>
      ))}
    </div>
  )
}
