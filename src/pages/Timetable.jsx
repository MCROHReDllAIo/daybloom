import { useMemo, useState } from 'react'
import { Plus, Wand2, Pencil, Trash2, CheckCircle2, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORY_COLORS } from '../data/training'
import {
  todayISO,
  formatTime12,
  addDaysISO,
  getDayName,
} from '../utils/timetable'

const CATEGORIES = ['university', 'work', 'studying', 'personal', 'training', 'sleep', 'free']

const emptyForm = () => ({
  name: '',
  category: 'university',
  date: todayISO(),
  start: '09:00',
  end: '10:00',
  priority: 'medium',
})

export default function Timetable() {
  const {
    t,
    lang,
    user,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityComplete,
    generateTimetable,
  } = useApp()

  const [view, setView] = useState('day')
  const [selectedDate, setSelectedDate] = useState(todayISO())
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm())

  const activities = user?.activities || []

  const dayActivities = useMemo(
    () =>
      activities
        .filter((a) => a.date === selectedDate)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [activities, selectedDate],
  )

  const weekDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDaysISO(selectedDate, i - new Date(selectedDate + 'T12:00:00').getDay())),
    [selectedDate],
  )

  const openAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm(), date: selectedDate })
    setModalOpen(true)
  }

  const openEdit = (act) => {
    setEditingId(act.id)
    setForm({
      name: act.name,
      category: act.category,
      date: act.date,
      start: act.start,
      end: act.end,
      priority: act.priority || 'medium',
    })
    setModalOpen(true)
  }

  const onSave = (e) => {
    e.preventDefault()
    if (!form.name || !form.start || !form.end) return
    if (form.start >= form.end) return

    if (editingId) {
      const ok = updateActivity(editingId, {
        ...form,
        nameAr: form.name,
        generated: false,
      })
      if (ok.ok) setModalOpen(false)
    } else {
      const ok = addActivity({
        id: `act_${Date.now()}`,
        ...form,
        nameAr: form.name,
        completed: false,
        generated: false,
      })
      if (ok.ok) setModalOpen(false)
    }
  }

  const catLabel = (c) => t.timetable.categories[c] || c

  return (
    <div>
      <header className="page-header">
        <h1>{t.timetable.title}</h1>
        <p>{t.timetable.subtitle}</p>
      </header>

      <div className="toolbar">
        <button type="button" className="btn btn-primary" onClick={openAdd}>
          <Plus size={18} /> {t.timetable.addActivity}
        </button>
        <button type="button" className="btn btn-sage" onClick={generateTimetable}>
          <Wand2 size={18} /> {t.timetable.generate}
        </button>
        <div className="view-toggle">
          <button
            type="button"
            className={view === 'day' ? 'active' : ''}
            onClick={() => setView('day')}
          >
            {t.timetable.dayView}
          </button>
          <button
            type="button"
            className={view === 'week' ? 'active' : ''}
            onClick={() => setView('week')}
          >
            {t.timetable.weekView}
          </button>
        </div>
        <label className="field" style={{ margin: 0, minWidth: 160 }}>
          {t.timetable.date}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {CATEGORIES.map((c) => (
          <span key={c} className="badge-pill" style={{ background: CATEGORY_COLORS[c] }}>
            {catLabel(c)}
          </span>
        ))}
      </div>

      {view === 'day' ? (
        <div className="activity-list">
          {!dayActivities.length ? (
            <div className="card empty-state">{t.timetable.empty}</div>
          ) : (
            dayActivities.map((a) => (
              <div key={a.id} className={`activity-item${a.completed ? ' done' : ''}`}>
                <div
                  className="act-bar"
                  style={{ background: CATEGORY_COLORS[a.category] || '#eee' }}
                />
                <div>
                  <p className="act-name">
                    {lang === 'ar' && a.nameAr ? a.nameAr : a.name}
                  </p>
                  <div className="act-meta">
                    <span>{catLabel(a.category)}</span>
                    <span>
                      {formatTime12(a.start, lang)} – {formatTime12(a.end, lang)}
                    </span>
                    <span>{t.timetable.priorities[a.priority] || a.priority}</span>
                    {a.completed && <span className="badge-pill">{t.timetable.completed}</span>}
                  </div>
                </div>
                <div className="act-actions">
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => toggleActivityComplete(a.id)}
                    title={a.completed ? t.timetable.incomplete : t.timetable.complete}
                  >
                    {a.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>
                  <button
                    type="button"
                    className="btn btn-cream btn-sm"
                    onClick={() => openEdit(a)}
                  >
                    <Pencil size={14} /> {t.timetable.edit}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteActivity(a.id)}
                  >
                    <Trash2 size={14} /> {t.timetable.delete}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="week-grid">
          {weekDates.map((date) => {
            const items = activities
              .filter((a) => a.date === date)
              .sort((a, b) => a.start.localeCompare(b.start))
            return (
              <div
                key={date}
                className="day-col"
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedDate(date)
                  setView('day')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedDate(date)
                    setView('day')
                  }
                }}
              >
                <h4>
                  {getDayName(date, lang)}
                  <br />
                  <span style={{ fontWeight: 500, color: 'var(--text-soft)' }}>{date.slice(5)}</span>
                </h4>
                {items.map((a) => (
                  <div
                    key={a.id}
                    className="day-chip"
                    style={{ background: CATEGORY_COLORS[a.category] }}
                  >
                    {formatTime12(a.start, lang)}
                    <br />
                    {lang === 'ar' && a.nameAr ? a.nameAr : a.name}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? t.timetable.update : t.timetable.addActivity}</h2>
            <form className="form-grid" onSubmit={onSave}>
              <label className="field">
                {t.timetable.name}
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <div className="form-row">
                <label className="field">
                  {t.timetable.category}
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {catLabel(c)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  {t.timetable.priority}
                  <select
                    value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  >
                    {['low', 'medium', 'high'].map((p) => (
                      <option key={p} value={p}>
                        {t.timetable.priorities[p]}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="field">
                {t.timetable.date}
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </label>
              <div className="form-row">
                <label className="field">
                  {t.timetable.start}
                  <input
                    type="time"
                    value={form.start}
                    onChange={(e) => setForm({ ...form, start: e.target.value })}
                    required
                  />
                </label>
                <label className="field">
                  {t.timetable.end}
                  <input
                    type="time"
                    value={form.end}
                    onChange={(e) => setForm({ ...form, end: e.target.value })}
                    required
                  />
                </label>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  {t.timetable.cancel}
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingId ? t.timetable.update : t.timetable.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
