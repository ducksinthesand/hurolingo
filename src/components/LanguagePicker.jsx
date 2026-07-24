import { LANGUAGES } from '../data/index.js'
import { t, UI_LANG_CODE } from '../i18n/index.js'
import AdSlot from './AdSlot.jsx'

// Map language codes to their i18n key so names show in the UI language
const LANG_NAME_KEY = {
  de: 'lang_de', en: 'lang_en', fr: 'lang_fr', es: 'lang_es',
  pt: 'lang_pt', tr: 'lang_tr', nl: 'lang_nl', ru: 'lang_ru',
}

export default function LanguagePicker({ onPick }) {
  // Hide the language pack that matches the current UI language —
  // no point learning insults in the language you already speak.
  const visible = LANGUAGES.filter((l) => l.code !== UI_LANG_CODE)

  return (
    <div>
      <h1 className="h1">{t.picker_heading}</h1>
      <p className="sub">{t.picker_tagline}</p>
      <div className="lang-grid" style={{ marginTop: 16 }}>
        {visible.map((lang) => {
          const nameKey = LANG_NAME_KEY[lang.code]
          const displayName = nameKey && t[nameKey] ? t[nameKey] : lang.name
          return (
            <button key={lang.code} className="lang-card" onClick={() => onPick(lang)}>
              <span className="flag">{lang.flag}</span>
              <span className="name">{displayName}</span>
              <span className="count">{t.insults_count(lang.entries.length)}</span>
              {lang.status === 'starter' && <span className="starter-tag">{t.starter_tag}</span>}
            </button>
          )
        })}
      </div>
      <AdSlot kind="banner" />
    </div>
  )
}
