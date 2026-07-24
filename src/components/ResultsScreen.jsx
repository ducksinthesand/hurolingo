import { useEffect, useState } from 'react'
import { t } from '../i18n/index.js'
import AdSlot from './AdSlot.jsx'

const CONFETTI_COLORS = ['#7c3aed', '#ec4899', '#facc15', '#2dd4bf', '#fb923c', '#38bdf8']

export function Confetti() {
  return (
    <div className="confetti">
      {Array.from({ length: 60 }).map((_, i) => (
        <i key={i} style={{
          left: `${Math.random() * 100}%`,
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animationDuration: `${1.6 + Math.random() * 1.6}s`,
          animationDelay: `${Math.random() * 0.6}s`
        }} />
      ))}
    </div>
  )
}

export default function ResultsScreen({ result, xpGained, freshBadges, badgeDefs, onContinue }) {
  const [wait, setWait] = useState(3)
  useEffect(() => {
    if (wait <= 0) return
    const t = setTimeout(() => setWait(wait - 1), 1000)
    return () => clearTimeout(t)
  }, [wait])

  const perfect = result.wrong === 0

  return (
    <div className="results">
      {perfect && <Confetti />}
      <div className="big">{perfect ? '🏆' : result.correct / result.total >= 0.6 ? '🎉' : '😅'}</div>
      <h1 className="h1">{perfect ? t.result_flawless : t.result_complete}</h1>
      <p className="sub">{perfect ? t.result_sub_flawless : t.result_sub_ok}</p>

      <div className="statbox">
        <div className="card"><div className="val">+{xpGained}</div><div className="sub">XP</div></div>
        <div className="card"><div className="val">{result.correct}/{result.total}</div><div className="sub">{t.result_correct}</div></div>
      </div>

      {freshBadges.length > 0 && (
        <div className="card">
          <b>{freshBadges.length > 1 ? t.result_new_badges : t.result_new_badge}</b>
          <div style={{ fontSize: 34, marginTop: 6 }}>
            {freshBadges.map((id) => {
              const b = badgeDefs.find((x) => x.id === id)
              return <span key={id} title={b.label} style={{ marginRight: 8 }}>{b.icon}</span>
            })}
          </div>
        </div>
      )}

      <AdSlot kind="interstitial" />

      <button className="btn" disabled={wait > 0} onClick={onContinue}>
        {wait > 0 ? t.btn_continue_wait(wait) : t.btn_continue}
      </button>
    </div>
  )
}
