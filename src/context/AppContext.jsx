import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { translations } from '../i18n/translations'
import { XP_REWARDS } from '../data/badges'
import {
  generateSmartTimetable,
  hasOverlap,
  todayISO,
  durationHours,
} from '../utils/timetable'
import {
  getRecommendations,
  recommendationToActivity,
  canAddRecommendation,
  applyTrainingToSchedule,
} from '../utils/recommendations'

const AppContext = createContext(null)
const STORAGE_KEY = 'daybloom_data_v1'

const defaultGoals = () => [
  { id: 'g1', key: 'study', completed: false },
  { id: 'g2', key: 'classes', completed: false },
  { id: 'g3', key: 'training', completed: false },
  { id: 'g4', key: 'excel', completed: false },
  { id: 'g5', key: 'learn', completed: false },
]

const emptyUserData = () => ({
  activities: [],
  preferredSkills: [],
  trainingProgress: {}, // { [categoryId]: { beginner: {done, quizScore, activityDone}, ... } }
  completedTrainings: [],
  badges: [],
  xp: 0,
  dailyGoals: defaultGoals(),
  weeklyTarget: 5,
  profile: {
    name: '',
    email: '',
    major: '',
    goals: '',
    photo: '',
  },
})

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { users: {}, currentUserId: null, lang: 'en' }
    }
    return JSON.parse(raw)
  } catch {
    return { users: {}, currentUserId: null, lang: 'en' }
  }
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function AppProvider({ children }) {
  const [store, setStore] = useState(loadStore)
  const [toast, setToast] = useState(null)

  const lang = store.lang || 'en'
  const t = translations[lang] || translations.en
  const userId = store.currentUserId
  const user = userId ? store.users[userId] : null

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.body.style.fontFamily =
      lang === 'ar' ? "'Cairo', sans-serif" : "'Poppins', sans-serif"
  }, [lang])

  useEffect(() => {
    saveStore(store)
  }, [store])

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2800)
  }, [])

  const setLang = (next) => {
    setStore((s) => ({ ...s, lang: next }))
  }

  const updateUser = useCallback(
    (updater) => {
      if (!userId) return
      setStore((s) => {
        const current = s.users[userId] || { ...emptyUserData(), id: userId }
        const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater }
        return {
          ...s,
          users: { ...s.users, [userId]: next },
        }
      })
    },
    [userId],
  )

  const awardXp = useCallback(
    (amount, badgeId = null) => {
      updateUser((u) => {
        const badges = badgeId && !u.badges.includes(badgeId) ? [...u.badges, badgeId] : u.badges
        return { ...u, xp: (u.xp || 0) + amount, badges }
      })
    },
    [updateUser],
  )

  const signup = ({ name, email, password }) => {
    const id = email.toLowerCase().trim()
    if (store.users[id]) return { ok: false, error: 'exists' }
    const data = {
      ...emptyUserData(),
      id,
      password,
      profile: {
        name,
        email: id,
        major: '',
        goals: '',
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      },
    }
    setStore((s) => ({
      ...s,
      users: { ...s.users, [id]: data },
      currentUserId: id,
    }))
    return { ok: true }
  }

  const login = ({ email, password }) => {
    const id = email.toLowerCase().trim()
    const u = store.users[id]
    if (!u || u.password !== password) return { ok: false, error: 'error' }
    setStore((s) => ({ ...s, currentUserId: id }))
    return { ok: true }
  }

  const continueAsGuest = () => {
    const id = 'guest@daybloom.app'
    setStore((s) => {
      if (s.users[id]) {
        return { ...s, currentUserId: id }
      }
      return {
        ...s,
        currentUserId: id,
        users: {
          ...s.users,
          [id]: {
            ...emptyUserData(),
            id,
            password: 'guest',
            profile: {
              name: lang === 'ar' ? 'طالب تجريبي' : 'Demo Student',
              email: id,
              major: lang === 'ar' ? 'علوم الحاسوب' : 'Computer Science',
              goals: lang === 'ar' ? 'تحسين إدارة الوقت والمهارات الرقمية' : 'Improve time management and digital skills',
              photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DaybloomDemo',
            },
            preferredSkills: ['office', 'ai', 'design'],
          },
        },
      }
    })
  }

  const logout = () => {
    setStore((s) => ({ ...s, currentUserId: null }))
  }

  const addActivity = (activity) => {
    if (!user) return { ok: false }
    if (hasOverlap(user.activities, activity)) {
      showToast(t.timetable.overlap, 'error')
      return { ok: false }
    }
    updateUser((u) => ({ ...u, activities: [...u.activities, activity] }))
    return { ok: true }
  }

  const updateActivity = (id, patch) => {
    if (!user) return { ok: false }
    const candidate = { ...user.activities.find((a) => a.id === id), ...patch }
    if (hasOverlap(user.activities, candidate, id)) {
      showToast(t.timetable.overlap, 'error')
      return { ok: false }
    }
    updateUser((u) => ({
      ...u,
      activities: u.activities.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }))
    return { ok: true }
  }

  const deleteActivity = (id) => {
    updateUser((u) => ({ ...u, activities: u.activities.filter((a) => a.id !== id) }))
  }

  const toggleActivityComplete = (id) => {
    updateUser((u) => {
      const act = u.activities.find((a) => a.id === id)
      if (!act) return u
      const completed = !act.completed
      let xp = u.xp
      if (completed) xp += XP_REWARDS.completeActivity
      return {
        ...u,
        xp,
        activities: u.activities.map((a) => (a.id === id ? { ...a, completed } : a)),
      }
    })
  }

  const generateTimetable = () => {
    if (!user) return
    const weekStart = todayISO()
    // Keep user-entered non-generated activities; regenerate generated ones
    const keep = user.activities.filter((a) => !a.generated)
    const next = generateSmartTimetable(keep, weekStart)
    updateUser((u) => {
      const badges = u.badges.includes('time_master') ? u.badges : [...u.badges, 'time_master']
      return {
        ...u,
        activities: next,
        xp: u.xp + XP_REWARDS.generateTimetable,
        badges,
      }
    })
    showToast(t.timetable.generated)
  }

  const setPreferredSkills = (skills) => {
    updateUser((u) => ({ ...u, preferredSkills: skills }))
  }

  const addRecommendationToTimetable = (rec) => {
    if (!user) return { ok: false }
    if (!canAddRecommendation(user.activities, rec)) {
      showToast(t.plan.noFit, 'error')
      return { ok: false }
    }
    const activity = recommendationToActivity(rec, lang)
    updateUser((u) => ({
      ...u,
      activities: applyTrainingToSchedule(u.activities, activity),
      xp: u.xp + XP_REWARDS.addTrainingToPlan,
    }))
    showToast(t.plan.added)
    return { ok: true }
  }

  const saveTrainingProgress = (categoryId, level, data) => {
    updateUser((u) => {
      const prev = u.trainingProgress[categoryId] || {}
      return {
        ...u,
        trainingProgress: {
          ...u.trainingProgress,
          [categoryId]: {
            ...prev,
            [level]: { ...(prev[level] || {}), ...data },
          },
        },
      }
    })
  }

  const completeTraining = (categoryId, level) => {
    updateUser((u) => {
      const key = `${categoryId}:${level}`
      const already = u.completedTrainings.includes(key)
      if (already) return u

      const completedTrainings = [...u.completedTrainings, key]
      let badges = [...u.badges]
      let xp = u.xp + XP_REWARDS.completeTraining

      if (!badges.includes('digital_beginner')) badges.push('digital_beginner')
      if (categoryId === 'office' && !badges.includes('excel_explorer')) badges.push('excel_explorer')
      if (categoryId === 'design' && !badges.includes('creative_designer')) badges.push('creative_designer')
      if (categoryId === 'ai' && !badges.includes('ai_explorer')) badges.push('ai_explorer')

      // Weekly goal: if training hours this week >= target
      const trainingActs = u.activities.filter((a) => a.category === 'training' && a.completed)
      const hours = durationHours(trainingActs) + (u.trainingProgress[categoryId]?.[level]?.duration || 0.5) / 60
      if (hours >= (u.weeklyTarget || 5) && !badges.includes('learning_champion')) {
        badges.push('learning_champion')
        xp += XP_REWARDS.weeklyGoal
      }

      const prev = u.trainingProgress[categoryId] || {}
      return {
        ...u,
        completedTrainings,
        badges,
        xp,
        trainingProgress: {
          ...u.trainingProgress,
          [categoryId]: {
            ...prev,
            [level]: { ...(prev[level] || {}), done: true, completedAt: new Date().toISOString() },
          },
        },
      }
    })
    showToast(t.training.completed)
  }

  const toggleGoal = (goalId) => {
    updateUser((u) => {
      const goals = u.dailyGoals.map((g) =>
        g.id === goalId ? { ...g, completed: !g.completed } : g,
      )
      const justCompleted = goals.find((g) => g.id === goalId)?.completed
      return {
        ...u,
        dailyGoals: goals,
        xp: justCompleted ? u.xp + 5 : u.xp,
      }
    })
  }

  const updateProfile = (profile) => {
    updateUser((u) => ({ ...u, profile: { ...u.profile, ...profile } }))
    showToast(lang === 'ar' ? 'تم حفظ الملف' : 'Profile saved')
  }

  const recommendations = useMemo(() => {
    if (!user) return { recommendations: [], gaps: [] }
    return getRecommendations(user.activities, user.preferredSkills)
  }, [user])

  const stats = useMemo(() => {
    if (!user) {
      return {
        studyHours: 0,
        completedTasks: 0,
        totalTasks: 0,
        trainingHours: 0,
        completedCourses: 0,
        skillsDeveloped: 0,
        timetablePct: 0,
        trainingPct: 0,
        xp: 0,
      }
    }
    const acts = user.activities
    const studyHours = durationHours(acts.filter((a) => a.category === 'studying'))
    const trainingHours = durationHours(acts.filter((a) => a.category === 'training'))
    const completable = acts.filter((a) => a.category !== 'free' && a.category !== 'sleep')
    const completedTasks = completable.filter((a) => a.completed).length
    const totalTasks = completable.length
    const completedCourses = user.completedTrainings.length
    const skillsDeveloped = new Set(user.completedTrainings.map((k) => k.split(':')[0])).size
    const timetablePct = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
    const trainingPct = Math.min(100, Math.round((completedCourses / 24) * 100)) // 8 cats × 3 levels
    return {
      studyHours: Math.round(studyHours * 10) / 10,
      completedTasks,
      totalTasks,
      trainingHours: Math.round(trainingHours * 10) / 10,
      completedCourses,
      skillsDeveloped,
      timetablePct,
      trainingPct,
      xp: user.xp || 0,
    }
  }, [user])

  const value = {
    lang,
    setLang,
    t,
    user,
    isLoggedIn: !!user,
    toast,
    showToast,
    signup,
    login,
    logout,
    continueAsGuest,
    addActivity,
    updateActivity,
    deleteActivity,
    toggleActivityComplete,
    generateTimetable,
    setPreferredSkills,
    recommendations,
    addRecommendationToTimetable,
    saveTrainingProgress,
    completeTraining,
    toggleGoal,
    updateProfile,
    updateUser,
    stats,
    awardXp,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
