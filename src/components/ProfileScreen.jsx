import { levelProgress, BADGES } from '../lib/store.js'
import { LANGUAGES } from '../data/index.js'
import { t } from '../i18n/index.js'
import AdSlot from './AdSlot.jsx'

const LANG_NAME_KEY = {
  de: 'lang_de', en: 'lang_en', fr: 'lang_fr', es: 'lang_es',
  pt: 'lang_pt', tr: 'lang_tr', nl: 'lang_nl', ru: 'lang_ru',
}

function langDisplayName(lang) {
  const key = LANG_NAME_KEY[lang.code]
  return key && t[key] ? t[key] : lang.name
}

export default function ProfileScreen({ progress, currentLang, onChangeLang }) {
  const { level, pct, toNext } = levelProgress(progress.xp)
  const lessons = Object.keys(progress.lessonsDone).length

  const activeName = currentLang
    ? `${currentLang.flag} ${langDisplayName(currentLang)}`
    : '—'

  return (
    <div>
      <h1 className="h1">{t.profile_heading}</h1>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <b style={{ fontSize: 20 }}>Level {level}</b>
          <span className="sub">{progress.xp} XP · {t.profile_xp_to_next(toNext)}</span>
        </div>
        <div className="xpbar" style={{ marginTop: 8 }}><div style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="statbox">
        <div className="card"><div className="val">{lessons}</div><div className="sub">{t.profile_lessons}</div></div>
        <div className="card"><div className="val">{progress.perfectCount}</div><div className="sub">{t.profile_perfects}</div></div>
        <div className="card"><div className="val">{progress.languagesTried.length}</div><div className="sub">{t.profile_languages}</div></div>
      </div>

      <h2 className="h2">{t.profile_active_lang}</h2>
      <div className="card">
        <p className="sub" style={{ marginBottom: 10 }}>
          {t.profile_active_lang_sub(activeName)}
        </p>
        <div className="lang-switcher">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-chip ${currentLang && l.code === currentLang.code ? 'active' : ''}`}
              onClick={() => onChangeLang(l)}
            >
              <span style={{ fontSize: 22 }}>{l.flag}</span>
              <span style={{ fontSize: 12, marginTop: 2 }}>{langDisplayName(l)}</span>
            </button>
          ))}
        </div>
      </div>

      <h2 className="h2">{t.profile_badges}</h2>
      <div className="badge-grid">
        {BADGES.map((b) => (
          <div key={b.id} className={`badge ${progress.badges.includes(b.id) ? 'earned' : ''}`}>
            <span className="icon">{b.icon}</span>
            <span className="label">{b.label}</span>
          </div>
        ))}
      </div>

      <h2 className="h2">{t.profile_langs_tried}</h2>
      <div className="card">
        {progress.languagesTried.length === 0
          ? <span className="sub">{t.profile_no_langs}</span>
          : progress.languagesTried.map((code) => {
              const l = LANGUAGES.find((x) => x.code === code)
              return l ? <span key={code} style={{ fontSize: 28, marginRight: 8 }} title={langDisplayName(l)}>{l.flag}</span> : null
            })}
      </div>

      <AdSlot kind="banner" />

      <div className="legal-footer">
        <button onClick={onImpressum}>Impressum &amp; Datenschutz</button>
      </div>
    </div>
  )
}
