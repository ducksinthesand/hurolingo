import { useState } from 'react'
import { APP_NAME, XP_PER_CORRECT, XP_PERFECT_BONUS } from './config.js'
import { loadProgress, saveProgress, evaluateBadges, levelProgress, BADGES } from './lib/store.js'
import { lessonKey } from './lib/lessons.js'
import LanguagePicker from './components/LanguagePicker.jsx'
import PathScreen from './components/PathScreen.jsx'
import LessonScreen from './components/LessonScreen.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import ProfileScreen from './components/ProfileScreen.jsx'

export default function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [view, setView] = useState('home')       // home | path | lesson | results | profile
  const [lang, setLang] = useState(null)
  const [session, setSession] = useState(null)   // { lang, variant, unit, lessonIndex, lesson, key }
  const [lastResult, setLastResult] = useState(null)

  function update(p) { setProgress(p); saveProgress(p) }

  function finishLesson(result) {
    const xpGained = result.correct * XP_PER_CORRECT + (result.wrong === 0 ? XP_PERFECT_BONUS : 0)
    const p = { ...progress, lessonsDone: { ...progress.lessonsDone } }
    p.xp += xpGained
    p.lessonsDone[session.key] = true
    if (result.wrong === 0) p.perfectCount += 1
    if (!p.languagesTried.includes(session.lang.code)) {
      p.languagesTried = [...p.languagesTried, session.lang.code]
    }
    // category complete?
    const allDone = session.unit.lessons.every((_, i) =>
      p.lessonsDone[lessonKey(session.lang.code, session.variant, session.unit.category.id, i)])
    const catKey = `${session.lang.code}|${session.variant}|${session.unit.category.id}`
    if (allDone && !p.categoriesFinished.includes(catKey)) {
      p.categoriesFinished = [...p.categoriesFinished, catKey]
    }
    const { badges, fresh } = evaluateBadges(p)
    p.badges = badges
    update(p)
    setLastResult({ result, xpGained, freshBadges: fresh })
    setView('results')
  }

  const { level } = levelProgress(progress.xp)

  return (
    <div className="app">
      {view !== 'lesson' && (
        <div className="topbar">
          <span className="logo">{APP_NAME}</span>
          <div className="pills">
            <span className="pill">⚡ {progress.xp}</span>
            <span className="pill">🏅 Lv {level}</span>
          </div>
        </div>
      )}

      {view === 'home' && (
        <LanguagePicker onPick={(l) => { setLang(l); setView('path') }} />
      )}

      {view === 'path' && lang && (
        <PathScreen lang={lang} progress={progress}
          onStartLesson={(s) => { setSession(s); setView('lesson') }}
          onBack={() => setView('home')} />
      )}

      {view === 'lesson' && session && (
        <LessonScreen session={session}
          onFinish={finishLesson}
          onQuit={() => setView('path')} />
      )}

      {view === 'results' && lastResult && (
        <ResultsScreen {...lastResult} badgeDefs={BADGES}
          onContinue={() => setView('path')} />
      )}

      {view === 'profile' && <ProfileScreen progress={progress} />}

      {view !== 'lesson' && view !== 'results' && (
        <nav className="bottomnav">
          <button className={`navbtn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
            🌍<span>Languages</span>
          </button>
          <button className={`navbtn ${view === 'path' ? 'active' : ''}`}
            onClick={() => lang && setView('path')} disabled={!lang}>
            🗺️<span>Path</span>
          </button>
          <button className={`navbtn ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}>
            🏅<span>Profile</span>
          </button>
        </nav>
      )}
    </div>
  )
}
