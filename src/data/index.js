import de from './de.json'
import en from './en.json'
import fr from './fr.json'
import es from './es.json'
import pt from './pt.json'
import tr from './tr.json'
import nl from './nl.json'
import ru from './ru.json'
import { t } from '../i18n/index.js'

export const LANGUAGES = [de, en, fr, es, pt, tr, nl, ru]

// The 5 categories, in path order (mild → nuclear).
// Names and descriptions are pulled from the active UI language (i18n) so they
// display in the interface language rather than always in English.
export const CATEGORIES = [
  { id: 'playful',     emoji: '🎈', color: 'linear-gradient(90deg,#38bdf8,#2dd4bf)',  get name() { return t.categories.playful.name },     get desc() { return t.categories.playful.desc } },
  { id: 'public',      emoji: '😌', color: 'linear-gradient(90deg,#4ade80,#2dd4bf)',  get name() { return t.categories.public.name },      get desc() { return t.categories.public.desc } },
  { id: 'banter',      emoji: '🤝', color: 'linear-gradient(90deg,#facc15,#fb923c)', get name() { return t.categories.banter.name },      get desc() { return t.categories.banter.desc } },
  { id: 'frustration', emoji: '🤦', color: 'linear-gradient(90deg,#fb923c,#fb7185)', get name() { return t.categories.frustration.name }, get desc() { return t.categories.frustration.desc } },
  { id: 'nuclear',     emoji: '💥', color: 'linear-gradient(90deg,#ec4899,#ef4444)', get name() { return t.categories.nuclear.name },     get desc() { return t.categories.nuclear.desc } },
]

export const getLanguage = (code) => LANGUAGES.find((l) => l.code === code)

// Entries relevant to a chosen variant (entries with variants:null apply to all)
export const entriesForVariant = (lang, variantCode) =>
  lang.entries.filter((e) => !e.variants || e.variants.includes(variantCode))
