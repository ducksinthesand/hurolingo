import { useMemo, useState } from 'react'
import { buildPath, lessonKey } from '../lib/lessons.js'
import AdSlot from './AdSlot.jsx'

export default function PathScreen({ lang, progress, onStartLesson, onBack }) {
  const [variant, setVariant] = useState(lang.variants[0].code)
  const [openCat, setOpenCat] = useState(null) // category id currently expanded
  const units = useMemo(() => buildPath(lang, variant), [lang, variant])

  function toggleCat(catId) {
    setOpenCat((prev) => (prev === catId ? null : catId))
  }

  return (
    <div>
      <button className="backlink" onClick={onBack}>← All languages</button>
      <h1 className="h1">{lang.flag} {lang.name}</h1>
      {lang.note && <p className="sub" style={{ marginBottom: 6 }}>{lang.note}</p>}

      {lang.variants.length > 1 && (
        <div className="variant-row">
          {lang.variants.map((v) => (
            <button key={v.code}
              className={`variant-chip ${v.code === variant ? 'active' : ''}`}
              onClick={() => setVariant(v.code)}>
              {v.flag} {v.name}
            </button>
          ))}
        </div>
      )}

      <div className="topic-list">
        {units.map((unit) => {
          const totalLessons = unit.lessons.length
          const doneLessons = unit.lessons.filter((_, i) =>
            progress.lessonsDone[lessonKey(lang.code, variant, unit.category.id, i)]
          ).length
          const allDone = doneLessons === totalLessons
          const isOpen = openCat === unit.category.id

          return (
            <div key={unit.category.id} className={`topic-card ${isOpen ? 'open' : ''}`}>
              {/* Category header — always visible, always tappable */}
              <button
                className="topic-header"
                onClick={() => toggleCat(unit.category.id)}
                style={{ background: unit.category.color }}
              >
                <span className="topic-emoji">{unit.category.emoji}</span>
                <span className="topic-info">
                  <span className="topic-name">{unit.category.name}</span>
                  <span className="topic-desc">{unit.category.desc}</span>
                </span>
                <span className="topic-progress">
                  {allDone ? '✅' : `${doneLessons}/${totalLessons}`}
                  <span className="topic-chevron">{isOpen ? '▲' : '▼'}</span>
                </span>
              </button>

              {/* Mini-path — shown only when expanded */}
              {isOpen && (
                <div className="mini-path">
                  {unit.lessons.map((lesson, i) => {
                    const key = lessonKey(lang.code, variant, unit.category.id, i)
                    const done = !!progress.lessonsDone[key]
                    // within a category, lessons unlock sequentially
                    const unlocked = i === 0 || !!progress.lessonsDone[
                      lessonKey(lang.code, variant, unit.category.id, i - 1)
                    ]
                    return (
                      <div className="mini-node-row" key={key}
                        style={{ transform: `translateX(${[0, 28, 0, -28][i % 4]}px)` }}>
                        <button
                          className={`node ${done ? 'done' : unlocked ? 'next' : 'locked'}`}
                          disabled={!done && !unlocked}
                          onClick={() => onStartLesson({ lang, variant, unit, lessonIndex: i, lesson, key })}
                        >
                          {done ? '⭐' : unlocked ? '▶' : '🔒'}
                        </button>
                        <span className="mini-node-label">Lesson {i + 1}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AdSlot kind="banner" />
    </div>
  )
}
