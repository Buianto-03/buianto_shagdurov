import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import styles from './ReportCalculator.module.scss'

const minutesBefore = 120
const minutesAfter = 15
const minutesSaved = minutesBefore - minutesAfter

function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  if (!hours) return `${remainder}m`
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`
}

export function ReportCalculator() {
  const [count, setCount] = useState(5)
  const id = useId()
  const timeline = useRef<HTMLDivElement>(null)
  const revealed = useRef(false)
  const saved = formatMinutes(count * minutesSaved)

  useEffect(() => {
    const bar = timeline.current
    if (!bar || revealed.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.9) return
      revealed.current = true
      bar.dataset.motion = 'revealed'
      observer.disconnect()
    }, { threshold: 0.9 })
    bar.dataset.motion = 'waiting'
    observer.observe(bar)
    return () => {
      observer.disconnect()
      delete bar.dataset.motion
    }
  }, [])

  return (
    <div className={styles.calculator}>
      <label htmlFor={id}>
        Reports in batch <output htmlFor={id}>{count}</output>
      </label>
      <input
        id={id}
        type="range"
        min="1"
        max="20"
        value={count}
        onChange={(event) => setCount(Number(event.target.value))}
        aria-valuetext={`${count} reports, ${saved} saved`}
      />
      <div className={styles.bounds} aria-hidden="true">
        <span>1 report</span>
        <span>20 reports</span>
      </div>
      <p className={styles.saving}>
        <output htmlFor={id} aria-label="Time saved">
          {saved}
        </output>
        <span>saved per batch</span>
      </p>
      <div className={styles.comparison}>
        <span>
          Before <strong>{formatMinutes(count * minutesBefore)}</strong>
        </span>
        <span>
          After <strong>{formatMinutes(count * minutesAfter)}</strong>
        </span>
      </div>
      <div
        ref={timeline}
        className={styles.timeline}
        style={{ '--remaining-share': minutesAfter / minutesBefore } as CSSProperties}
      >
        <span className={styles.remaining} aria-hidden="true" />
        <span className={styles.perReport}>{formatMinutes(minutesSaved)} saved per report</span>
      </div>
      <p className={styles.note}>
        Preparation time per report fell from {minutesBefore} to {minutesAfter} minutes.
      </p>
    </div>
  )
}
