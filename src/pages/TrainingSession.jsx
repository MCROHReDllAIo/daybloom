import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, CalendarDays } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { trainingCategories } from '../data/training'
import { XP_REWARDS } from '../data/badges'

const LEVELS = ['beginner', 'intermediate', 'advanced']
const STEPS = ['intro', 'lessons', 'examples', 'activity', 'quiz']

export default function TrainingSession() {
  const { categoryId } = useParams()
  const {
    t,
    lang,
    user,
    saveTrainingProgress,
    completeTraining,
    awardXp,
  } = useApp()
  const navigate = useNavigate()

  const category = trainingCategories.find((c) => c.id === categoryId)
  const [level, setLevel] = useState('beginner')
  const [stepIdx, setStepIdx] = useState(0)
  const [lessonIdx, setLessonIdx] = useState(0)
  const [activityAnswer, setActivityAnswer] = useState('')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [activityDone, setActivityDone] = useState(false)

  const levelData = category?.levels[level]
  const step = STEPS[stepIdx]
  const doneKey = `${categoryId}:${level}`
  const isCompleted = user?.completedTrainings?.includes(doneKey)

  const quizScore = useMemo(() => {
    if (!levelData || !quizSubmitted) return null
    const quiz = levelData.quiz
    let correct = 0
    quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) correct += 1
    })
    return { correct, total: quiz.length }
  }, [levelData, quizSubmitted, quizAnswers])

  if (!category || !levelData) {
    return (
      <div className="card empty-state">
        <p>Not found</p>
        <Link to="/training" className="btn btn-primary">
          {t.training.back}
        </Link>
      </div>
    )
  }

  const lessons = levelData.lessons[lang]
  const examples = levelData.examples[lang]
  const activity = levelData.activity[lang]

  const onLevelChange = (lv) => {
    setLevel(lv)
    setStepIdx(0)
    setLessonIdx(0)
    setActivityAnswer('')
    setQuizAnswers({})
    setQuizSubmitted(false)
    setActivityDone(false)
  }

  const submitActivity = () => {
    if (!activityAnswer.trim()) return
    setActivityDone(true)
    saveTrainingProgress(categoryId, level, { activityDone: true, activityAnswer })
    awardXp(XP_REWARDS.completeExercise)
  }

  const submitQuiz = () => {
    setQuizSubmitted(true)
    const quiz = levelData.quiz
    let correct = 0
    quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) correct += 1
    })
    saveTrainingProgress(categoryId, level, {
      quizScore: correct,
      quizTotal: quiz.length,
      quizDone: true,
    })
  }

  const markComplete = () => {
    completeTraining(categoryId, level)
  }

  const goToPlan = () => navigate('/plan')

  return (
    <div>
      <Link to="/training" className="btn btn-ghost btn-sm" style={{ marginBottom: 12 }}>
        <ArrowLeft size={16} /> {t.training.back}
      </Link>

      <header className="page-header">
        <h1>{category.title[lang]}</h1>
        <p>{category.description[lang]}</p>
      </header>

      <div className="level-tabs">
        {LEVELS.map((lv) => (
          <button
            key={lv}
            type="button"
            className={`chip${level === lv ? ' active' : ''}`}
            onClick={() => onLevelChange(lv)}
          >
            {t.training[lv]}
            {user?.completedTrainings?.includes(`${categoryId}:${lv}`) && (
              <CheckCircle2 size={14} style={{ marginInlineStart: 4 }} />
            )}
          </button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              className={`badge-pill${stepIdx === i ? '' : ''}`}
              style={{
                background: stepIdx === i ? 'var(--lavender)' : 'var(--cream)',
                cursor: 'pointer',
                border: 'none',
              }}
              onClick={() => setStepIdx(i)}
            >
              {i + 1}. {t.training[s === 'intro' ? 'intro' : s === 'lessons' ? 'lessons' : s === 'examples' ? 'examples' : s === 'activity' ? 'activity' : 'quiz']}
            </button>
          ))}
        </div>

        {step === 'intro' && (
          <div>
            <h3>{t.training.intro}</h3>
            <p>{levelData.intro[lang]}</p>
            <h4>{t.training.objectives}</h4>
            <ul>
              {category.objectives[lang].map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <p style={{ color: 'var(--text-soft)' }}>
              {t.training.duration}: {levelData.duration} {t.training.min}
            </p>
          </div>
        )}

        {step === 'lessons' && (
          <div>
            <h3>
              {t.training.lessons} ({lessonIdx + 1}/{lessons.length})
            </h3>
            <h4>{lessons[lessonIdx].title}</h4>
            <p>{lessons[lessonIdx].content}</p>
            <div className="lesson-nav">
              <button
                type="button"
                className="btn btn-outline btn-sm"
                disabled={lessonIdx === 0}
                onClick={() => setLessonIdx((i) => i - 1)}
              >
                {t.training.prev}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                disabled={lessonIdx >= lessons.length - 1}
                onClick={() => setLessonIdx((i) => i + 1)}
              >
                {t.training.next}
              </button>
            </div>
          </div>
        )}

        {step === 'examples' && (
          <div>
            <h3>{t.training.examples}</h3>
            <ul>
              {examples.map((ex) => (
                <li key={ex} style={{ marginBottom: 8 }}>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 'activity' && (
          <div>
            <h3>{t.training.activity}</h3>
            <p>{activity.prompt}</p>
            <label className="field">
              <textarea
                rows={4}
                value={activityAnswer}
                onChange={(e) => setActivityAnswer(e.target.value)}
                placeholder={activity.placeholder}
                disabled={activityDone}
              />
            </label>
            {!activityDone ? (
              <button type="button" className="btn btn-sage" onClick={submitActivity}>
                {t.common.save}
              </button>
            ) : (
              <p style={{ color: '#3d5c48', fontWeight: 650 }}>
                <CheckCircle2 size={16} style={{ verticalAlign: 'middle' }} /> +
                {XP_REWARDS.completeExercise} XP
              </p>
            )}
          </div>
        )}

        {step === 'quiz' && (
          <div>
            <h3>{t.training.quiz}</h3>
            {levelData.quiz.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 16 }}>
                <p style={{ fontWeight: 650 }}>
                  {qi + 1}. {q.q[lang]}
                </p>
                {q.options[lang].map((opt, oi) => {
                  let cls = 'quiz-option'
                  if (quizAnswers[qi] === oi) cls += ' selected'
                  if (quizSubmitted) {
                    if (oi === q.answer) cls += ' correct'
                    else if (quizAnswers[qi] === oi) cls += ' wrong'
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      className={cls}
                      disabled={quizSubmitted}
                      onClick={() =>
                        setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))
                      }
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            ))}
            {!quizSubmitted ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length < levelData.quiz.length}
              >
                {t.training.submitQuiz}
              </button>
            ) : (
              <p style={{ fontWeight: 700 }}>
                {t.training.quizScore}: {quizScore.correct} {t.common.of} {quizScore.total}
              </p>
            )}
          </div>
        )}

        <div className="lesson-nav">
          <button
            type="button"
            className="btn btn-outline"
            disabled={stepIdx === 0}
            onClick={() => setStepIdx((i) => i - 1)}
          >
            {t.training.prev}
          </button>
          {stepIdx < STEPS.length - 1 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStepIdx((i) => i + 1)}
            >
              {t.training.next}
            </button>
          ) : isCompleted ? (
            <button type="button" className="btn btn-primary" onClick={goToPlan}>
              <CalendarDays size={16} /> {t.nav.plan}
            </button>
          ) : (
            <button type="button" className="btn btn-sage" onClick={markComplete}>
              {t.training.complete}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
