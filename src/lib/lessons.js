import { CATEGORIES, entriesForVariant } from '../data/index.js'
import { ENTRIES_PER_LESSON } from '../config.js'

// Deterministic-but-shuffled helpers
function shuffle(arr, seedStr = '') {
  // simple seeded shuffle so lesson contents are stable per lesson,
  // but option order still uses Math.random at render time
  let seed = 0
  for (const ch of seedStr) seed = (seed * 31 + ch.charCodeAt(0)) % 2147483647
  const a = [...arr]
  const rnd = () => { seed = (seed * 48271) % 2147483647; return seed / 2147483647 }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor((seedStr ? rnd() : Math.random()) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function randomShuffle(arr) { return shuffle(arr) }

// Build the course path for a language+variant: units per category, lessons of N entries
export function buildPath(lang, variantCode) {
  const entries = entriesForVariant(lang, variantCode)
  const units = []
  for (const cat of CATEGORIES) {
    const catEntries = entries.filter((e) => e.category === cat.id)
    if (!catEntries.length) continue
    const lessons = []
    for (let i = 0; i < catEntries.length; i += ENTRIES_PER_LESSON) {
      const slice = catEntries.slice(i, i + ENTRIES_PER_LESSON)
      if (slice.length >= 3 || lessons.length === 0) lessons.push(slice)
      else lessons[lessons.length - 1].push(...slice) // merge tiny tail lessons
    }
    units.push({ category: cat, lessons })
  }
  return units
}

export function lessonKey(langCode, variantCode, catId, index) {
  return `${langCode}|${variantCode}|${catId}|${index}`
}

// Build the exercise sequence for a lesson:
//  - each entry appears once as multiple choice (mixed directions)
//  - one entry becomes a fill-the-blank instead
//  - the lesson ends with a match-pairs round (up to 4 pairs)
export function buildExercises(lessonEntries, allEntries) {
  const pool = allEntries.length >= 4 ? allEntries : lessonEntries
  const exercises = []
  const blankIdx = Math.floor(Math.random() * lessonEntries.length)

  lessonEntries.forEach((entry, i) => {
    if (i === blankIdx && entry.original.includes(' ')) {
      exercises.push(makeBlank(entry, pool))
    } else if (i === blankIdx) {
      exercises.push(makeChoice(entry, pool, 'toOriginal'))
    } else {
      exercises.push(makeChoice(entry, pool, Math.random() > 0.5 ? 'toTranslation' : 'toOriginal'))
    }
  })

  const pairEntries = shuffle(lessonEntries).slice(0, Math.min(4, lessonEntries.length))
  exercises.push({ type: 'pairs', entries: pairEntries })
  return exercises
}

function distractors(entry, pool, field, n = 3) {
  const others = pool.filter((e) => e.id !== entry.id && e[field] !== entry[field])
  return shuffle(others).slice(0, n).map((e) => e[field])
}

function makeChoice(entry, pool, direction) {
  if (direction === 'toTranslation') {
    return {
      type: 'choice', entry,
      question: entry.original, hint: entry.phonetic,
      prompt: 'What does this mean?',
      answer: entry.translation,
      options: shuffle([entry.translation, ...distractors(entry, pool, 'translation')])
    }
  }
  return {
    type: 'choice', entry,
    question: entry.translation, hint: null,
    prompt: 'How do you say this?',
    answer: entry.original,
    options: shuffle([entry.original, ...distractors(entry, pool, 'original')])
  }
}

function makeBlank(entry, pool) {
  const words = entry.original.split(' ')
  const idx = words.length > 1 ? Math.floor(words.length / 2) : 0
  const missing = words[idx]
  const shown = words.map((w, i) => (i === idx ? '____' : w)).join(' ')
  const wordPool = pool.flatMap((e) => e.original.split(' ')).filter((w) => w !== missing && w.length > 1)
  return {
    type: 'blank', entry,
    question: shown, hint: `"${entry.translation}"`,
    prompt: 'Fill in the missing word',
    answer: missing,
    options: shuffle([missing, ...shuffle([...new Set(wordPool)]).slice(0, 3)])
  }
}
