import { trainingCategories } from '../data/training'
import {
  findFreePeriodsWeek,
  pickRecommendationDuration,
  hasOverlap,
  minutesToTime,
  timeToMinutes,
  todayISO,
  startOfWeekISO,
} from './timetable'

/**
 * Recommend training sessions that fit free gaps, prioritizing preferred skills.
 * Skips gaps that already have training booked.
 */
export function getRecommendations(activities, preferredSkills = [], weekStart = todayISO()) {
  const from = startOfWeekISO(weekStart)
  const gaps = findFreePeriodsWeek(activities, from)
    .filter((g) => g.duration >= 15)
    .sort((a, b) => {
      // sooner dates first, then longer gaps
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return b.duration - a.duration
    })

  const preferred = preferredSkills.length
    ? [
        ...trainingCategories.filter((c) => preferredSkills.includes(c.id)),
        ...trainingCategories.filter((c) => !preferredSkills.includes(c.id)),
      ]
    : [...trainingCategories]

  const recommendations = []
  const usedGaps = new Set()
  const usedCategories = new Set()

  for (const gap of gaps) {
    if (recommendations.length >= 8) break
    const pick = pickRecommendationDuration(gap.duration)
    if (!pick) continue

    const gapKey = `${gap.date}_${gap.start}`
    if (usedGaps.has(gapKey)) continue

    // Skip if training already occupies this gap window
    const alreadyBooked = activities.some(
      (a) =>
        a.category === 'training' &&
        a.date === gap.date &&
        timeToMinutes(a.start) < timeToMinutes(gap.end) &&
        timeToMinutes(a.end) > timeToMinutes(gap.start),
    )
    if (alreadyBooked) continue

    for (const cat of preferred) {
      // Prefer variety unless skill is explicitly preferred
      if (
        usedCategories.has(cat.id) &&
        !preferredSkills.includes(cat.id) &&
        recommendations.length < preferredSkills.length + 2
      ) {
        continue
      }

      let level = 'beginner'
      if (pick.duration >= 50 && cat.levels.advanced) level = 'advanced'
      else if (pick.duration >= 25 && cat.levels.intermediate) level = 'intermediate'

      let finalDuration = Math.min(
        gap.duration,
        cat.levels[level]?.duration || pick.duration,
      )
      if (finalDuration > gap.duration) {
        if (gap.duration >= 15 && cat.levels.beginner) {
          level = 'beginner'
          finalDuration = Math.min(gap.duration, cat.levels.beginner.duration || 15)
        } else continue
      }

      // Snap to 15/30/60 style suggestions based on gap
      if (gap.duration >= 60) finalDuration = Math.min(finalDuration, 60)
      else if (gap.duration >= 30) finalDuration = Math.min(finalDuration, 30)
      else finalDuration = Math.min(finalDuration, 15)

      const endMins = timeToMinutes(gap.start) + finalDuration
      if (endMins > timeToMinutes(gap.end)) continue
      const end = minutesToTime(endMins)

      const type =
        finalDuration >= 55 ? 'project' : finalDuration >= 25 ? 'exercise' : 'lesson'

      recommendations.push({
        id: `rec_${cat.id}_${level}_${gap.date}_${gap.start}`,
        categoryId: cat.id,
        level,
        type,
        date: gap.date,
        start: gap.start,
        end,
        duration: finalDuration,
        gapDuration: gap.duration,
        title: cat.title,
        color: cat.color,
      })
      usedGaps.add(gapKey)
      usedCategories.add(cat.id)
      break
    }
  }

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
  return !hasOverlap(activities, candidate)
}
