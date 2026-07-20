import { LANGUAGES } from '../data/index.js'
import { APP_TAGLINE } from '../config.js'
import AdSlot from './AdSlot.jsx'

export default function LanguagePicker({ onPick }) {
  return (
    <div>
      <h1 className="h1">Pick your poison 🌍</h1>
      <p className="sub">{APP_TAGLINE}</p>
      <div className="lang-grid" style={{ marginTop: 16 }}>
        {LANGUAGES.map((lang) => (
          <button key={lang.code} className="lang-card" onClick={() => onPick(lang)}>
            <span className="flag">{lang.flag}</span>
            <span className="name">{lang.name}</span>
            <span className="count">{lang.entries.length} insults</span>
            {lang.status === 'starter' && <span className="starter-tag">STARTER PACK</span>}
          </button>
        ))}
      </div>
      <AdSlot kind="banner" />
    </div>
  )
}
