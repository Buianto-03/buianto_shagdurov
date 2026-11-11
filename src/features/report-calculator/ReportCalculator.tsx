import { useId, useState } from 'react'
import styles from './ReportCalculator.module.scss'

function formatMinutes(minutes: number) {
  const remainder = minutes % 60
  return `${Math.floor(minutes / 60)}h${remainder ? ` ${remainder}m` : ''}`
}

export function ReportCalculator() {
  const [count, setCount] = useState(5)
  const id = useId()
  const saved = formatMinutes(count * (120 - 15))
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
          Before <strong>{formatMinutes(count * 120)}</strong>
        </span>
        <span>
          After <strong>{formatMinutes(count * 15)}</strong>
        </span>
      </div>
      <p className={styles.note}>Based on 120 → 15 minutes per report.</p>
    </div>
  )
}
