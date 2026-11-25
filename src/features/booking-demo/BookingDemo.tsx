import { useLayoutEffect, useRef, useState } from 'react'
import styles from './BookingDemo.module.scss'

const flows = {
  before: [
    'Pick a tour',
    'Select a departure',
    'Review the booking',
    'Booking confirmed',
  ],
  after: [
    'Pick a tour and departure',
    'Review the booking',
    'Booking confirmed',
  ],
}
type Flow = keyof typeof flows

export function BookingDemo() {
  const [flow, setFlow] = useState<Flow>('before')
  const [step, setStep] = useState(0)
  const variants = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const group = variants.current
    if (!group) return
    const update = () => {
      const button = group.querySelector<HTMLButtonElement>('[aria-pressed="true"]')
      if (!button) return
      group.style.setProperty('--indicator-x', `${button.offsetLeft}px`)
      group.style.setProperty('--indicator-width', String(button.offsetWidth))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(group)
    group.querySelectorAll('button').forEach((button) => observer.observe(button))
    return () => observer.disconnect()
  }, [flow])
  const steps = flows[flow]
  const finished = step === steps.length - 1
  function select(value: Flow) {
    setFlow(value)
    setStep(0)
  }
  return (
    <div className={styles.demo}>
      <p className={styles.caption}>
        Illustrative interaction · simplified booking flow
      </p>
      <div
        className={styles.variants}
        ref={variants}
        role="group"
        aria-label="Choose booking flow"
      >
        <button
          type="button"
          aria-pressed={flow === 'before'}
          onClick={() => select('before')}
        >
          Before
        </button>
        <button
          type="button"
          aria-pressed={flow === 'after'}
          onClick={() => select('after')}
        >
          After
        </button>
      </div>
      <div className={styles.progress} aria-hidden="true">
        {steps.map((label, index) => (
          <span key={label} data-done={index <= step ? '' : undefined} />
        ))}
      </div>
      <p className={styles.step} aria-live="polite" aria-atomic="true">
        <span key={`${flow}-${step}`} className={styles.stepContent}>
          <span>{step + 1} / {steps.length}</span>
          {steps[step]}
        </span>
      </p>
      <button
        className={styles.advance}
        type="button"
        onClick={() => setStep(finished ? 0 : step + 1)}
      >
        {finished ? 'Replay ↻' : 'Next step →'}
      </button>
    </div>
  )
}
