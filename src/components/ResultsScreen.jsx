import { useEffect, useState } from 'react'
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
  // Interstitial-style ad screen: short countdown before Continue unlocks,
  // exactly like the between-lesson ad break in mobile games.
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
      <h1 className="h1">{perfect ? 'Flawless!' : 'Lesson complete!'}</h1>
      <p className="sub">{perfect ? 'Not a single miss. Terrifying.' : 'Practice makes profane.'}</p>

      <div className="statbox">
        <div className="card"><div className="val">+{xpGained}</div><div className="sub">XP</div></div>
        <div className="card"><div className="val">{result.correct}/{result.total}</div><div className="sub">correct</div></div>
      </div>

      {freshBadges.length > 0 && (
        <div className="card">
          <b>New badge{freshBadges.length > 1 ? 's' : ''}!</b>
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
        {wait > 0 ? `Continue in ${wait}…` : 'Continue'}
      </button>
    </div>
  )
}
