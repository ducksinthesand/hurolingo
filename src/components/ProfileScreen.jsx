import { levelProgress, BADGES } from '../lib/store.js'
import { LANGUAGES } from '../data/index.js'
import AdSlot from './AdSlot.jsx'

export default function ProfileScreen({ progress, currentLang, onChangeLang }) {
  const { level, pct, toNext } = levelProgress(progress.xp)
  const lessons = Object.keys(progress.lessonsDone).length

  return (
    <div>
      <h1 className="h1">Your trash-talk résumé 📜</h1>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <b style={{ fontSize: 20 }}>Level {level}</b>
          <span className="sub">{progress.xp} XP · {toNext} to next</span>
        </div>
        <div className="xpbar" style={{ marginTop: 8 }}><div style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="statbox">
        <div className="card"><div className="val">{lessons}</div><div className="sub">lessons</div></div>
        <div className="card"><div className="val">{progress.perfectCount}</div><div className="sub">perfects</div></div>
        <div className="card"><div className="val">{progress.languagesTried.length}</div><div className="sub">languages</div></div>
      </div>

      <h2 className="h2">Active language</h2>
      <div className="card">
        <p className="sub" style={{ marginBottom: 10 }}>
          Currently learning: <strong>{currentLang ? `${currentLang.flag} ${currentLang.name}` : '—'}</strong>
        </p>
        <div className="lang-switcher">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-chip ${currentLang && l.code === currentLang.code ? 'active' : ''}`}
              onClick={() => onChangeLang(l)}
            >
              <span style={{ fontSize: 22 }}>{l.flag}</span>
              <span style={{ fontSize: 12, marginTop: 2 }}>{l.name}</span>
            </button>
          ))}
        </div>
      </div>

      <h2 className="h2">Badges</h2>
      <div className="badge-grid">
        {BADGES.map((b) => (
          <div key={b.id} className={`badge ${progress.badges.includes(b.id) ? 'earned' : ''}`}>
            <span className="icon">{b.icon}</span>
            <span className="label">{b.label}</span>
          </div>
        ))}
      </div>

      <h2 className="h2">Languages tried</h2>
      <div className="card">
        {progress.languagesTried.length === 0
          ? <span className="sub">None yet. Go offend a dictionary.</span>
          : progress.languagesTried.map((code) => {
              const l = LANGUAGES.find((x) => x.code === code)
              return l ? <span key={code} style={{ fontSize: 28, marginRight: 8 }} title={l.name}>{l.flag}</span> : null
            })}
      </div>

      <AdSlot kind="banner" />
    </div>
  )
}
