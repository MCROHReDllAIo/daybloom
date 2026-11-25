import { Link } from 'react-router-dom'
import {
  CalendarDays,
  GraduationCap,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import StudentIllustration from '../components/StudentIllustration'
import { CATEGORY_COLORS, trainingCategories } from '../data/training'
import { formatTime12, todayISO } from '../utils/timetable'

export default function Home() {
  const { t, lang, user, isLoggedIn, stats, recommendations } = useApp()
  const today = todayISO()
  const todayActs = (user?.activities || [])
    .filter((a) => a.date === today)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 4)

  const recs = recommendations.recommendations.slice(0, 3)
  const motiv = t.motiv[new Date().getDay() % t.motiv.length]

  return (
    <div>
      <section className="hero">
        <div>
          <h1>{t.home.welcome}</h1>
          <p className="lead">{t.home.subtitle}</p>
          <p className="slogan">{t.slogan}</p>
          <div className="hero-actions">
            <Link to={isLoggedIn ? '/timetable' : '/signup'} className="btn btn-primary">
              {t.home.card1Btn}
            </Link>
            <Link to={isLoggedIn ? '/training' : '/signup'} className="btn btn-cream">
              {t.home.card2Btn}
            </Link>
          </div>
        </div>
        <div className="hero-art">
          <StudentIllustration />
        </div>
      </section>

      <div className="motiv-banner">{motiv}</div>

      <section className="feature-cards">
        <article className="card card-hover feature-card">
          <div className="icon-wrap" style={{ background: 'var(--lavender)' }}>
            <CalendarDays size={24} />
          </div>
          <h3>{t.home.card1Title}</h3>
          <p>{t.home.card1Desc}</p>
          <Link to={isLoggedIn ? '/timetable' : '/login'} className="btn btn-primary btn-sm">
            {t.home.card1Btn} <ArrowRight size={16} />
          </Link>
        </article>
        <article className="card card-hover feature-card">
          <div className="icon-wrap" style={{ background: 'var(--pink)' }}>
            <GraduationCap size={24} />
          </div>
          <h3>{t.home.card2Title}</h3>
          <p>{t.home.card2Desc}</p>
          <Link to={isLoggedIn ? '/training' : '/login'} className="btn btn-secondary btn-sm">
            {t.home.card2Btn} <ArrowRight size={16} />
          </Link>
        </article>
      </section>

      <section className="section-block card">
        <h2 className="section-title">{t.home.introTitle}</h2>
        <p style={{ margin: 0, color: 'var(--text-soft)' }}>{t.home.intro}</p>
        <p style={{ marginTop: '0.75rem', fontWeight: 650 }}>{t.sloganSecondary}</p>
      </section>

      <section className="section-block">
        <h2 className="section-title">{t.home.howTitle}</h2>
        <div className="how-steps">
          {[t.home.how1, t.home.how2, t.home.how3, t.home.how4].map((step, i) => (
            <div key={step} className="card how-step">
              <div className="num">{i + 1}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{step}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid-3 section-block">
        <section className="card">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} /> {t.home.todayPreview}
          </h2>
          {!isLoggedIn || !todayActs.length ? (
            <p className="empty-state" style={{ padding: '1rem 0' }}>
              {t.home.noActivities}
            </p>
          ) : (
            <div className="activity-list">
              {todayActs.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 36,
                      borderRadius: 6,
                      background: CATEGORY_COLORS[a.category] || '#eee',
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 650, fontSize: '0.9rem' }}>
                      {lang === 'ar' && a.nameAr ? a.nameAr : a.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                      {formatTime12(a.start, lang)} – {formatTime12(a.end, lang)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/timetable" className="btn btn-ghost btn-sm" style={{ marginTop: 8 }}>
            {t.home.viewAll}
          </Link>
        </section>

        <section className="card">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} /> {t.home.recommended}
          </h2>
          {!recs.length ? (
            <p className="empty-state" style={{ padding: '1rem 0' }}>
              {t.home.noActivities}
            </p>
          ) : (
            recs.map((r) => (
              <div key={r.id} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 650 }}>
                  {r.title[lang]} · {r.duration} {t.training.min}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>
                  {r.noFit
                    ? t.plan.noFit
                    : `${r.date} · ${formatTime12(r.start, lang)}`}
                </div>
              </div>
            ))
          )}
          <Link to="/plan" className="btn btn-ghost btn-sm">
            {t.home.viewAll}
          </Link>
        </section>

        <section className="card">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} /> {t.home.progressPreview}
          </h2>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>{t.progress.timetablePct}</span>
              <span>{stats.timetablePct}%</span>
            </div>
            <div className="progress-bar" style={{ marginTop: 6 }}>
              <span style={{ width: `${stats.timetablePct}%` }} />
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>{t.progress.trainingPct}</span>
              <span>{stats.trainingPct}%</span>
            </div>
            <div className="progress-bar" style={{ marginTop: 6 }}>
              <span style={{ width: `${stats.trainingPct}%` }} />
            </div>
          </div>
          <div style={{ fontWeight: 700 }}>{stats.xp} XP</div>
          <Link to="/progress" className="btn btn-ghost btn-sm">
            {t.home.viewAll}
          </Link>
        </section>
      </div>

      <section className="section-block">
        <h2 className="section-title">{t.training.title}</h2>
        <div className="grid-4">
          {trainingCategories.slice(0, 4).map((c) => (
            <Link key={c.id} to={`/training/${c.id}`} className="card card-hover" style={{ padding: '1rem' }}>
              <div
                className="icon-wrap"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: c.color,
                  display: 'grid',
                  placeItems: 'center',
                  marginBottom: 8,
                }}
              >
                <GraduationCap size={18} />
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{c.title[lang]}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-soft)', marginTop: 4 }}>
                {c.duration} {t.training.min}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
