import { Link } from 'react-router-dom'
import {
  FileSpreadsheet,
  Cloud,
  Sparkles,
  Palette,
  MessageSquare,
  Shield,
  Code2,
  BarChart3,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { trainingCategories } from '../data/training'

const ICONS = {
  FileSpreadsheet,
  Cloud,
  Sparkles,
  Palette,
  MessageSquare,
  Shield,
  Code2,
  BarChart3,
}

export default function TrainingHub() {
  const { t, lang, user } = useApp()

  const progressFor = (catId) => {
    const completed = (user?.completedTrainings || []).filter((k) =>
      k.startsWith(`${catId}:`),
    ).length
    return Math.round((completed / 3) * 100)
  }

  return (
    <div>
      <header className="page-header">
        <h1>{t.training.title}</h1>
        <p>{t.training.subtitle}</p>
      </header>

      <div className="grid-2">
        {trainingCategories.map((cat) => {
          const Icon = ICONS[cat.icon] || Sparkles
          const pct = progressFor(cat.id)
          return (
            <article key={cat.id} className="card card-hover train-card">
              <div className="icon-wrap" style={{ background: cat.color }}>
                <Icon size={22} />
              </div>
              <h3 style={{ margin: '0 0 0.4rem' }}>{cat.title[lang]}</h3>
              <p style={{ margin: 0, color: 'var(--text-soft)', flex: 1 }}>
                {cat.description[lang]}
              </p>
              <div className="train-meta">
                <span className="badge-pill">
                  {t.training.difficulty}: {t.training[cat.difficulty]}
                </span>
                <span className="badge-pill" style={{ background: 'var(--sage)' }}>
                  {t.training.duration}: {cat.duration} {t.training.min}
                </span>
              </div>
              <div style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    marginBottom: 4,
                  }}
                >
                  <span>{t.training.progress}</span>
                  <span>{pct}%</span>
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${pct}%` }} />
                </div>
              </div>
              <ul style={{ margin: '0 0 1rem', paddingInlineStart: '1.1rem', color: 'var(--text-soft)', fontSize: '0.85rem' }}>
                {cat.objectives[lang].map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <Link to={`/training/${cat.id}`} className="btn btn-primary">
                {pct > 0 ? t.training.continue : t.training.start}
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
