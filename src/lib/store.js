// localStorage-backed progress store. No accounts, no backend — v1 keeps
// everything on-device (matches the offline PWA requirement).
import { t } from '../i18n/index.js'

const KEY = 'hurolingo-progress-v1'

const DEFAULT = {
  xp: 0,
  lessonsDone: {},      // { 'de|de-DE|playful|0': true }
  perfectCount: 0,
  languagesTried: [],   // ['de', 'fr']
  categoriesFinished: [], // ['de|de-DE|playful']
  badges: []            // badge ids
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT }
  } catch {
    return { ...DEFAULT }
  }
}

export function saveProgress(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* private mode */ }
}

// Level curve: level n needs 100 * n * (n + 1) / 2 total XP (100, 300, 600 …)
export function levelFromXp(xp) {
  let level = 1
  while (xp >= xpForLevel(level + 1)) level++
  return level
}
export function xpForLevel(level) {
  return 100 * (level - 1) * level / 2
}
export function levelProgress(xp) {
  const level = levelFromXp(xp)
  const cur = xpForLevel(level)
  const next = xpForLevel(level + 1)
  return { level, pct: Math.min(100, Math.round(((xp - cur) / (next - cur)) * 100)), toNext: next - xp }
}

export const BADGES = [
  { id: 'first-lesson', icon: '🐣', get label() { return t.badges['first-lesson'] }, test: (p) => Object.keys(p.lessonsDone).length >= 1 },
  { id: 'ten-lessons',  icon: '📚', get label() { return t.badges['ten-lessons'] },  test: (p) => Object.keys(p.lessonsDone).length >= 10 },
  { id: 'xp-500',       icon: '⚡', get label() { return t.badges['xp-500'] },       test: (p) => p.xp >= 500 },
  { id: 'xp-2000',      icon: '🔥', get label() { return t.badges['xp-2000'] },      test: (p) => p.xp >= 2000 },
  { id: 'perfect',      icon: '🎯', get label() { return t.badges['perfect'] },      test: (p) => p.perfectCount >= 1 },
  { id: 'perfect-10',   icon: '💎', get label() { return t.badges['perfect-10'] },   test: (p) => p.perfectCount >= 10 },
  { id: 'trilingual',   icon: '🌍', get label() { return t.badges['trilingual'] },   test: (p) => p.languagesTried.length >= 3 },
  { id: 'polyglot',     icon: '🧠', get label() { return t.badges['polyglot'] },     test: (p) => p.languagesTried.length >= 6 },
  { id: 'nuclear',      icon: '☢️', get label() { return t.badges['nuclear'] },      test: (p) => p.categoriesFinished.some((c) => c.endsWith('|nuclear')) }
]

export function evaluateBadges(p) {
  const earned = BADGES.filter((b) => b.test(p)).map((b) => b.id)
  const fresh = earned.filter((id) => !p.badges.includes(id))
  return { badges: earned, fresh }
}
