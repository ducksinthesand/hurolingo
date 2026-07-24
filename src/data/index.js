import de from './de.json'
import en from './en.json'
import fr from './fr.json'
import es from './es.json'
import pt from './pt.json'
import tr from './tr.json'
import nl from './nl.json'
import ru from './ru.json'

export const LANGUAGES = [de, en, fr, es, pt, tr, nl, ru]

// The 5 categories, in path order (mild → nuclear)
export const CATEGORIES = [
  { id: 'playful', name: 'Playful & Silly', emoji: '🎈', color: 'linear-gradient(90deg,#38bdf8,#2dd4bf)', desc: 'Harmless teasing — safe for almost anyone' },
  { id: 'public', name: 'Safe in Public', emoji: '😌', color: 'linear-gradient(90deg,#4ade80,#2dd4bf)', desc: 'Mild enough for the office and grandma' },
  { id: 'banter', name: 'Best-Friend Banter', emoji: '🤝', color: 'linear-gradient(90deg,#facc15,#fb923c)', desc: 'For people who will laugh, not sue' },
  { id: 'frustration', name: 'Everyday Frustration', emoji: '🤦', color: 'linear-gradient(90deg,#fb923c,#fb7185)', desc: 'Traffic, stubbed toes, Mondays' },
  { id: 'nuclear', name: 'Full Send', emoji: '💥', color: 'linear-gradient(90deg,#ec4899,#ef4444)', desc: 'Explicit. Know them — think twice before throwing them' }
]

export const getLanguage = (code) => LANGUAGES.find((l) => l.code === code)

// Entries relevant to a chosen variant (entries with variants:null apply to all)
export const entriesForVariant = (lang, variantCode) =>
  lang.entries.filter((e) => !e.variants || e.variants.includes(variantCode))
