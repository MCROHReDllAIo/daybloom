/** Convert "HH:MM" to minutes from midnight */
export function timeToMinutes(time) {
  if (!time) return 0
  const [h, m] = time.split(':').map(Number)
  return h * 60 + (m || 0)
}

/** Convert minutes to "HH:MM" */
export function minutesToTime(mins) {
  const clamped = Math.max(0, Math.min(mins, 23 * 60 + 59))
  const h = Math.floor(clamped / 60) % 24
  const m = clamped % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function formatTime12(time, lang = 'en') {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? (lang === 'ar' ? 'م' : 'PM') : lang === 'ar' ? 'ص' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

export function getDayName(dateStr, lang = 'en') {
  const days = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  }
  const d = parseLocalDate(dateStr)
  return days[lang]?.[d.getDay()] || days.en[d.getDay()]
}

export function getDayIndex(dateStr) {
  return parseLocalDate(dateStr).getDay()
}

/** Local timezone date as YYYY-MM-DD (avoids UTC day shift) */
export function todayISO() {
  const d = new Date()
  return toISODate(d)
}

export function toISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function parseLocalDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d, 12, 0, 0)
}

export function addDaysISO(dateStr, days) {
  const d = parseLocalDate(dateStr)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}

export function startOfWeekISO(dateStr = todayISO()) {
  const d = parseLocalDate(dateStr)
  d.setDate(d.getDate() - d.getDay())
  return toISODate(d)
}

/** Check if two time ranges overlap on the same day */
export function overlaps(a, b) {
  if (a.date !== b.date) return false
  const aStart = timeToMinutes(a.start)
  const aEnd = timeToMinutes(a.end)
  const bStart = timeToMinutes(b.start)
  const bEnd = timeToMinutes(b.end)
  return aStart < bEnd && bStart < aEnd
}

/** Overlap only against real (non-free) activities */
export function hasOverlap(activities, candidate, excludeId = null) {
  return activities.some(
    (a) =>
      a.id !== excludeId &&
      a.category !== 'free' &&
      overlaps(a, candidate),
  )
}

/**
 * Find free gaps for a given date between dayStart and dayEnd (minutes).
 * Occupied = non-free categories.
 */
export function findFreePeriods(activities, date, dayStart = 7 * 60, dayEnd = 22 * 60) {
  const busy = activities
    .filter((a) => a.date === date && a.category !== 'free')
    .map((a) => ({
      start: timeToMinutes(a.start),
      end: timeToMinutes(a.end),
    }))
    .sort((x, y) => x.start - y.start)

  const merged = []
  for (const slot of busy) {
    if (!merged.length || slot.start > merged[merged.length - 1].end) {
      merged.push({ ...slot })
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, slot.end)
    }
  }

  const gaps = []
  let cursor = dayStart
  for (const slot of merged) {
    if (slot.start > cursor) {
      gaps.push({
        date,
        start: minutesToTime(cursor),
        end: minutesToTime(slot.start),
        duration: slot.start - cursor,
      })
    }
    cursor = Math.max(cursor, slot.end)
  }
  if (cursor < dayEnd) {
    gaps.push({
      date,
      start: minutesToTime(cursor),
      end: minutesToTime(dayEnd),
      duration: dayEnd - cursor,
    })
  }
  return gaps.filter((g) => g.duration >= 15)
}

export function findFreePeriodsWeek(activities, startDate = todayISO()) {
  const all = []
  for (let i = 0; i < 7; i++) {
    const date = addDaysISO(startDate, i)
    all.push(...findFreePeriods(activities, date))
  }
  return all
}

function uid() {
  return `act_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

/**
 * Generate a sample weekly timetable from seed preferences,
 * then fill free gaps. Respects existing fixed activities.
 */
export function generateSmartTimetable(existing = [], weekStart = todayISO()) {
  const generated = [...existing.filter((a) => !a.generated)]
  const weekdayTemplate = [
    { category: 'university', name: { en: 'University Classes', ar: 'محاضرات جامعية' }, start: '08:00', end: '14:00', priority: 'high' },
    { category: 'personal', name: { en: 'Lunch & Rest', ar: 'غداء وراحة' }, start: '14:00', end: '15:00', priority: 'medium' },
    { category: 'work', name: { en: 'Work Hours', ar: 'ساعات العمل' }, start: '15:00', end: '17:00', priority: 'high' },
    { category: 'studying', name: { en: 'Study Session', ar: 'جلسة دراسة' }, start: '18:00', end: '20:00', priority: 'high' },
    { category: 'personal', name: { en: 'Personal Time', ar: 'وقت شخصي' }, start: '20:00', end: '21:00', priority: 'low' },
  ]
  const weekendTemplate = [
    { category: 'studying', name: { en: 'Weekend Study', ar: 'دراسة نهاية الأسبوع' }, start: '10:00', end: '12:00', priority: 'medium' },
    { category: 'personal', name: { en: 'Personal Activities', ar: 'أنشطة شخصية' }, start: '14:00', end: '16:00', priority: 'low' },
    { category: 'studying', name: { en: 'Assignment Work', ar: 'عمل الواجبات' }, start: '17:00', end: '19:00', priority: 'high' },
  ]

  for (let i = 0; i < 7; i++) {
    const date = addDaysISO(weekStart, i)
    const dayOfWeek = getDayIndex(date)
    const hasFixed = generated.some(
      (a) => a.date === date && (a.category === 'university' || a.category === 'work' || a.category === 'studying'),
    )
    if (hasFixed) {
      // Still detect free gaps for days that already have user activities
      addFreeSlots(generated, date)
      continue
    }

    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6
    const items = isWeekend ? weekendTemplate : weekdayTemplate

    for (const item of items) {
      const candidate = {
        id: uid(),
        name: item.name.en,
        nameAr: item.name.ar,
        category: item.category,
        date,
        start: item.start,
        end: item.end,
        priority: item.priority,
        completed: false,
        generated: true,
      }
      if (!hasOverlap(generated, candidate)) {
        generated.push(candidate)
      }
    }

    addFreeSlots(generated, date)
  }

  return generated
}

function addFreeSlots(generated, date) {
  const gaps = findFreePeriods(generated, date)
  for (const gap of gaps) {
    if (gap.duration < 30) continue
    const freeAct = {
      id: uid(),
      name: 'Free Time',
      nameAr: 'وقت فراغ',
      category: 'free',
      date: gap.date,
      start: gap.start,
      end: gap.end,
      priority: 'low',
      completed: false,
      generated: true,
      isFreeSlot: true,
    }
    if (!hasOverlap(generated, freeAct)) {
      // also avoid stacking duplicate free labels
      const alreadyFree = generated.some(
        (a) => a.category === 'free' && a.date === freeAct.date && a.start === freeAct.start,
      )
      if (!alreadyFree) generated.push(freeAct)
    }
  }
}

/** When placing a real activity, trim/remove overlapping free slots */
export function placeActivity(activities, activity) {
  const withoutOverlappingFree = activities.filter((a) => {
    if (a.category !== 'free') return true
    if (a.date !== activity.date) return true
    return !overlaps(a, activity)
  })
  // Rebuild leftover free gaps after placing
  const next = [...withoutOverlappingFree, activity]
  const gaps = findFreePeriods(next, activity.date)
  const withoutOldFree = next.filter(
    (a) => !(a.category === 'free' && a.date === activity.date),
  )
  for (const gap of gaps) {
    if (gap.duration < 20) continue
    withoutOldFree.push({
      id: uid(),
      name: 'Free Time',
      nameAr: 'وقت فراغ',
      category: 'free',
      date: gap.date,
      start: gap.start,
      end: gap.end,
      priority: 'low',
      completed: false,
      generated: true,
      isFreeSlot: true,
    })
  }
  return withoutOldFree
}

export function durationHours(activities, categoryFilter = null) {
  return activities
    .filter((a) => !categoryFilter || a.category === categoryFilter)
    .reduce((sum, a) => {
      const mins = timeToMinutes(a.end) - timeToMinutes(a.start)
      return sum + Math.max(0, mins) / 60
    }, 0)
}

export function pickRecommendationDuration(gapMinutes) {
  if (gapMinutes >= 60) return { duration: 60, type: 'project' }
  if (gapMinutes >= 30) return { duration: 30, type: 'exercise' }
  if (gapMinutes >= 15) return { duration: 15, type: 'lesson' }
  return null
}
