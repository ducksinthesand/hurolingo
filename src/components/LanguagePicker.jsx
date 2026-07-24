import { LANGUAGES } from '../data/index.js'
import { t } from '../i18n/index.js'
import AdSlot from './AdSlot.jsx'

export default function LanguagePicker({ onPick }) {
  return (
    <div>
      <h1 className="h1">{t.picker_heading}</h1>
      <p className="sub">{t.picker_tagline}</p>
      <div className="lang-grid" style={{ marginTop: 16 }}>
        {LANGUAGES.map((lang) => (
          <button key={lang.code} className="lang-card" onClick={() => onPick(lang)}>
            <span className="flag">{lang.flag}</span>
            <span className="name">{lang.name}</span>
            <span className="count">{t.insults_count(lang.entries.length)}</span>
            {lang.status === 'starter' && <span className="starter-tag">{t.starter_tag}</span>}
          </button>
        ))}
      </div>
      <AdSlot kind="banner" />
    </div>
  )
}
