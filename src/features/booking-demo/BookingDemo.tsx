import { useState } from 'react'
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
        <span>
          {step + 1} / {steps.length}
        </span>
        {steps[step]}
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
