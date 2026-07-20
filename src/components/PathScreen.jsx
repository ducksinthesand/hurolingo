import { useMemo, useState } from 'react'
import { buildPath, lessonKey } from '../lib/lessons.js'
import AdSlot from './AdSlot.jsx'

export default function PathScreen({ lang, progress, onStartLesson, onBack }) {
  const [variant, setVariant] = useState(lang.variants[0].code)
  const units = useMemo(() => buildPath(lang, variant), [lang, variant])

  // find the first not-yet-done lesson => "next"
  let nextFound = false

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

      <div className="path">
        {units.map((unit) => (
          <div key={unit.category.id}>
            <div className="unit-label" style={{ background: unit.category.color }}>
              {unit.category.emoji} {unit.category.name}
              <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.9 }}>{unit.category.desc}</div>
            </div>
            {unit.lessons.map((lesson, i) => {
              const key = lessonKey(lang.code, variant, unit.category.id, i)
              const done = !!progress.lessonsDone[key]
              const isNext = !done && !nextFound
              if (isNext) nextFound = true
              const locked = !done && !isNext
              return (
                <div className="node-row" key={key}
                  style={{ transform: `translateX(${[0, 34, 0, -34][i % 4]}px)` }}>
                  <button
                    className={`node ${done ? 'done' : isNext ? 'next' : 'locked'}`}
                    disabled={locked}
                    onClick={() => onStartLesson({ lang, variant, unit, lessonIndex: i, lesson, key })}>
                    {done ? '⭐' : isNext ? '▶' : '🔒'}
                  </button>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <AdSlot kind="banner" />
    </div>
  )
}
