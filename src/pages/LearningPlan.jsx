import { useApp } from '../context/AppContext'
import { trainingCategories } from '../data/training'
import { formatTime12, todayISO } from '../utils/timetable'
import {
  CalendarPlus,
  Clock,
  Target,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'

export default function LearningPlan() {
  const {
    t,
    lang,
    user,
    setPreferredSkills,
    recommendations,
    addRecommendationToTimetable,
  } = useApp()

  const preferred = user?.preferredSkills || []
  const { recommendations: recs, gaps } = recommendations

  const toggleSkill = (id) => {
    if (preferred.includes(id)) {
      setPreferredSkills(preferred.filter((s) => s !== id))
    } else {
      setPreferredSkills([...preferred, id])
    }
  }

  const upcoming = (user?.activities || [])
    .filter((a) => a.category === 'training' && a.date >= todayISO() && !a.completed)
    .sort((a, b) => a.date.localeCompare(b.date) || a.start.localeCompare(b.start))

  const scheduled = (user?.activities || []).filter((a) => a.category === 'training')
  const completed = user?.completedTrainings || []

  const weeklyGoalHours = user?.weeklyTarget || 5
  const weeklyDone = scheduled.filter((a) => a.completed).length

  return (
    <div>
      <header className="page-header">
        <h1>{t.plan.title}</h1>
        <p>{t.plan.subtitle}</p>
      </header>

      <section className="section-block card">
        <h2 className="section-title">{t.plan.howItWorks}</h2>
        <div className="how-steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          {[t.plan.step1, t.plan.step2, t.plan.step3, t.plan.step4, t.plan.step5, t.plan.step6].map(
            (s, i) => (
              <div key={s} className="how-step" style={{ padding: '0.75rem' }}>
                <div className="num">{i + 1}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{s}</div>
              </div>
            ),
          )}
        </div>
      </section>

      <div className="grid-2 section-block">
        <section className="card">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={18} /> {t.plan.preferred}
          </h2>
          <p style={{ color: 'var(--text-soft)', marginTop: 0 }}>{t.plan.selectSkills}</p>
          <p style={{ fontWeight: 650 }}>{t.plan.wantImprove}</p>
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
        </section>

        <section className="card">
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} /> {t.plan.freePeriods}
          </h2>
          {!gaps.length ? (
            <p className="empty-state" style={{ padding: '1rem 0' }}>
              {t.plan.noFree}
            </p>
          ) : (
            <div className="activity-list">
              {gaps.slice(0, 8).map((g) => (
                <div
                  key={`${g.date}_${g.start}`}
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'var(--cream)',
                    borderRadius: 12,
                    fontSize: '0.88rem',
                  }}
                >
                  <strong>{g.date}</strong> · {formatTime12(g.start, lang)} –{' '}
                  {formatTime12(g.end, lang)} · {g.duration} {t.training.min}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="section-block">
        <div className="toolbar">
          <h2 className="section-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} /> {t.plan.recommendations}
          </h2>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setPreferredSkills([...preferred])}
          >
            <RefreshCw size={14} /> {t.plan.refresh}
          </button>
        </div>

        <div className="grid-2">
          {recs.map((rec) => (
            <article key={rec.id} className="card rec-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <h3 style={{ margin: 0 }}>{rec.title[lang]}</h3>
                <span className="badge-pill" style={{ background: rec.color }}>
                  {t.training[rec.level]}
                </span>
              </div>
              <div style={{ color: 'var(--text-soft)', fontSize: '0.9rem' }}>
                {t.plan.suggestedDuration}: {rec.duration} {t.training.min}
                {rec.type === 'lesson' && ` · ${lang === 'ar' ? 'درس قصير' : 'Short lesson'}`}
                {rec.type === 'exercise' && ` · ${lang === 'ar' ? 'تمرين' : 'Exercise'}`}
                {rec.type === 'project' && ` · ${lang === 'ar' ? 'مشروع عملي' : 'Practical project'}`}
              </div>
              {rec.noFit ? (
                <p style={{ margin: 0, color: '#6b2f38' }}>{t.plan.noFit}</p>
              ) : (
                <p style={{ margin: 0 }}>
                  {t.plan.fits}: <strong>{rec.date}</strong> ·{' '}
                  {formatTime12(rec.start, lang)} – {formatTime12(rec.end, lang)}
                  <br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
                    {t.plan.minGap}: {rec.gapDuration} {t.training.min}
                  </span>
                </p>
              )}
              <button
                type="button"
                className="btn btn-primary"
                disabled={!!rec.noFit}
                onClick={() => addRecommendationToTimetable(rec)}
              >
                <CalendarPlus size={16} /> {t.plan.addToTimetable}
              </button>
            </article>
          ))}
          {!recs.length && (
            <div className="card empty-state">{t.plan.noFree}</div>
          )}
        </div>
      </section>

      <div className="grid-3 section-block">
        <section className="card">
          <h2 className="section-title">{t.plan.upcoming}</h2>
          {!upcoming.length ? (
            <p style={{ color: 'var(--text-soft)' }}>—</p>
          ) : (
            upcoming.slice(0, 5).map((a) => (
              <div key={a.id} style={{ marginBottom: 8, fontSize: '0.9rem' }}>
                <strong>{lang === 'ar' && a.nameAr ? a.nameAr : a.name}</strong>
                <div style={{ color: 'var(--text-soft)' }}>
                  {a.date} · {formatTime12(a.start, lang)}
                </div>
              </div>
            ))
          )}
        </section>

        <section className="card">
          <h2 className="section-title">{t.plan.scheduled}</h2>
          <p style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>{scheduled.length}</p>
          <p style={{ color: 'var(--text-soft)', margin: 0 }}>
            {lang === 'ar' ? 'جلسات مجدولة' : 'sessions on timetable'}
          </p>
        </section>

        <section className="card">
          <h2 className="section-title">{t.plan.completed}</h2>
          {completed.length === 0 ? (
            <p style={{ color: 'var(--text-soft)' }}>—</p>
          ) : (
            completed.map((key) => {
              const [cid, lv] = key.split(':')
              const cat = trainingCategories.find((c) => c.id === cid)
              return (
                <div key={key} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                  <CheckCircle2 size={16} color="#5a9a6e" />
                  <span style={{ fontSize: '0.88rem' }}>
                    {cat?.title[lang]} ({t.training[lv]})
                  </span>
                </div>
              )
            })
          )}
        </section>
      </div>

      <section className="card">
        <h2 className="section-title">{t.plan.weeklyGoals}</h2>
        <p>
          {lang === 'ar'
            ? `الهدف: ${weeklyGoalHours} ساعات تعلّم / الأسبوع`
            : `Goal: ${weeklyGoalHours} learning hours / week`}
        </p>
        <div className="progress-bar" style={{ height: 14 }}>
          <span
            style={{
              width: `${Math.min(100, Math.round((weeklyDone / Math.max(1, weeklyGoalHours)) * 100))}%`,
            }}
          />
        </div>
        <p style={{ marginTop: 8, color: 'var(--text-soft)' }}>
          {weeklyDone} {lang === 'ar' ? 'جلسات مكتملة هذا الأسبوع' : 'sessions completed toward weekly rhythm'}
        </p>
      </section>
    </div>
  )
}
