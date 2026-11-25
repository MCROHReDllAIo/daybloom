import { trainingCategories } from '../data/training'
import {
  findFreePeriodsWeek,
  pickRecommendationDuration,
  hasOverlap,
  minutesToTime,
  timeToMinutes,
  todayISO,
} from './timetable'

/**
 * Recommend training sessions that fit free gaps, prioritizing preferred skills.
 */
export function getRecommendations(activities, preferredSkills = [], weekStart = todayISO()) {
  const gaps = findFreePeriodsWeek(activities, weekStart)
    .filter((g) => g.duration >= 15)
    .sort((a, b) => b.duration - a.duration)

  const preferred = preferredSkills.length
    ? [
        ...trainingCategories.filter((c) => preferredSkills.includes(c.id)),
        ...trainingCategories.filter((c) => !preferredSkills.includes(c.id)),
      ]
    : trainingCategories

  const recommendations = []
  const usedGaps = new Set()

  for (const gap of gaps) {
    if (recommendations.length >= 8) break
    const pick = pickRecommendationDuration(gap.duration)
    if (!pick) continue

    const gapKey = `${gap.date}_${gap.start}`
    if (usedGaps.has(gapKey)) continue

    // Match training whose level duration fits
    for (const cat of preferred) {
      const levels = Object.keys(cat.levels)
      let level = 'beginner'
      if (pick.duration >= 50 && cat.levels.advanced) level = 'advanced'
      else if (pick.duration >= 25 && cat.levels.intermediate) level = 'intermediate'

      const levelData = cat.levels[level]
      const needed = levelData.duration || pick.duration
      if (needed > gap.duration) {
        // try shorter
        if (gap.duration >= 15 && cat.levels.beginner) {
          level = 'beginner'
        } else continue
      }

      const finalDuration = Math.min(
        gap.duration,
        cat.levels[level].duration || pick.duration,
      )
      const endMins = timeToMinutes(gap.start) + finalDuration
      const end = minutesToTime(endMins)

      // Ensure we don't overflow the gap
      if (endMins > timeToMinutes(gap.end)) continue

      recommendations.push({
        id: `rec_${cat.id}_${level}_${gap.date}_${gap.start}`,
        categoryId: cat.id,
        level,
        type: pick.type,
        date: gap.date,
        start: gap.start,
        end,
        duration: finalDuration,
        gapDuration: gap.duration,
        title: cat.title,
        color: cat.color,
      })
      usedGaps.add(gapKey)
      break
    }
  }

  // If no gaps fit preferred, suggest shorter lessons on other days
  if (!recommendations.length && preferred.length) {
    const cat = preferred[0]
    recommendations.push({
      id: `rec_fallback_${cat.id}`,
      categoryId: cat.id,
      level: 'beginner',
      type: 'lesson',
      date: null,
      start: null,
      end: null,
      duration: 15,
      gapDuration: 0,
      title: cat.title,
      color: cat.color,
      noFit: true,
    })
  }

  return { recommendations, gaps }
}

export function recommendationToActivity(rec, lang = 'en') {
  const cat = trainingCategories.find((c) => c.id === rec.categoryId)
  const title = cat ? cat.title[lang] : 'Digital Training'
  const levelLabel = rec.level
  return {
    id: `act_train_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: `${title} (${levelLabel})`,
    nameAr: cat ? `${cat.title.ar} (${levelLabel})` : 'تدريب رقمي',
    category: 'training',
    date: rec.date,
    start: rec.start,
    end: rec.end,
    priority: 'medium',
    completed: false,
    trainingId: rec.categoryId,
    trainingLevel: rec.level,
    fromRecommendation: true,
  }
}

export function canAddRecommendation(activities, rec) {
  if (!rec.date || !rec.start || !rec.end || rec.noFit) return false
  const candidate = { date: rec.date, start: rec.start, end: rec.end }
  // Allow replacing free slots — check overlap only with non-free
  const blocking = activities.filter((a) => a.category !== 'free')
  return !hasOverlap(blocking, candidate)
}

/** When adding training, remove/trim overlapping free slots */
export function applyTrainingToSchedule(activities, trainingActivity) {
  const withoutOverlappingFree = activities.filter((a) => {
    if (a.category !== 'free') return true
    const sameDay = a.date === trainingActivity.date
    if (!sameDay) return true
    const aStart = timeToMinutes(a.start)
    const aEnd = timeToMinutes(a.end)
    const tStart = timeToMinutes(trainingActivity.start)
    const tEnd = timeToMinutes(trainingActivity.end)
    // Remove free slot if it fully contains or overlaps the training
    return !(aStart < tEnd && tStart < aEnd)
  })
  return [...withoutOverlappingFree, trainingActivity]
}
