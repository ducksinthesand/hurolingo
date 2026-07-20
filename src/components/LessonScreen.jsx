import { useMemo, useState } from 'react'
import { buildExercises } from '../lib/lessons.js'
import { entriesForVariant } from '../data/index.js'

export default function LessonScreen({ session, onFinish, onQuit }) {
  const { lang, variant, lesson } = session
  const exercises = useMemo(
    () => buildExercises(lesson, entriesForVariant(lang, variant)),
    [lang, variant, lesson]
  )
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [wrong, setWrong] = useState(0)

  const ex = exercises[index]
  const pct = Math.round((index / exercises.length) * 100)

  function next(wasCorrect, mistakes = 0) {
    const c = correct + (wasCorrect ? 1 : 0)
    const w = wrong + (wasCorrect ? 0 : 1) + mistakes
    if (index + 1 >= exercises.length) {
      onFinish({ correct: c + (wasCorrect ? 0 : 0), total: exercises.length, wrong: w })
    } else {
      setCorrect(c); setWrong(w); setIndex(index + 1)
    }
  }

  return (
    <div>
      <button className="backlink" onClick={onQuit}>✕ Quit lesson</button>
      <div className="progressbar"><div style={{ width: `${pct}%` }} /></div>
      {ex.type === 'pairs'
        ? <PairsExercise key={index} exercise={ex} onDone={next} />
        : <ChoiceExercise key={index} exercise={ex} onDone={next} />}
    </div>
  )
}

function ChoiceExercise({ exercise, onDone }) {
  const [picked, setPicked] = useState(null)
  const isCorrect = picked !== null && picked === exercise.answer

  return (
    <div>
      <p className="sub">{exercise.prompt}</p>
      <div className="prompt-word">{exercise.question}</div>
      {exercise.hint && <div className="phonetic">{exercise.hint}</div>}
      <div className="choices">
        {exercise.options.map((opt) => (
          <button key={opt}
            className={`choice ${picked !== null && opt === exercise.answer ? 'correct' : ''} ${picked === opt && opt !== exercise.answer ? 'wrong' : ''}`}
            disabled={picked !== null}
            onClick={() => setPicked(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {picked !== null && (
        <>
          <div className={`feedback ${isCorrect ? 'good' : 'bad'}`}>
            {isCorrect ? 'Nice one! 🎉' : `Oof. It's "${exercise.answer}".`}
            <span className="note">
              <b>{exercise.entry.original}</b> — {exercise.entry.translation}
              {exercise.entry.literal && exercise.entry.literal !== exercise.entry.translation &&
                <> (literally: {exercise.entry.literal})</>}
              <br />{exercise.entry.note}
            </span>
          </div>
          <button className="btn green" style={{ marginTop: 12 }} onClick={() => onDone(isCorrect)}>
            Continue
          </button>
        </>
      )}
    </div>
  )
}

function PairsExercise({ exercise, onDone }) {
  const cards = useMemo(() => {
    const left = exercise.entries.map((e) => ({ id: e.id, side: 'L', text: e.original }))
    const right = exercise.entries.map((e) => ({ id: e.id, side: 'R', text: e.translation }))
    return [...left, ...right].sort(() => Math.random() - 0.5)
  }, [exercise])
  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState([])
  const [errorCard, setErrorCard] = useState(null)
  const [mistakes, setMistakes] = useState(0)

  function tap(card) {
    if (matched.includes(card.id) && matched.filter((m) => m === card.id).length >= 1) {
      // allow tapping matched? no-op below via disabled
    }
    if (!selected) { setSelected(card); return }
    if (selected.side === card.side) { setSelected(card); return }
    if (selected.id === card.id) {
      const m = [...matched, card.id]
      setMatched(m); setSelected(null)
      if (m.length === exercise.entries.length) {
        setTimeout(() => onDone(mistakes === 0, mistakes), 350)
      }
    } else {
      setMistakes(mistakes + 1)
      setErrorCard(card)
      setSelected(null)
      setTimeout(() => setErrorCard(null), 350)
    }
  }

  return (
    <div>
      <p className="sub">Match the pairs</p>
      <div className="pairs-grid">
        {cards.map((card, i) => (
          <button key={i}
            className={`pair-btn ${matched.includes(card.id) ? 'matched' : ''} ${selected === card ? 'selected' : ''} ${errorCard === card ? 'error' : ''}`}
            disabled={matched.includes(card.id)}
            onClick={() => tap(card)}>
            {card.text}
          </button>
        ))}
      </div>
    </div>
  )
}
