import { useLayoutEffect, useRef, useState } from 'react'
import styles from './BookingDemo.module.scss'

const stages = {
  tour: { label: 'Tour', instruction: 'Pick a tour' },
  departure: { label: 'Departure', instruction: 'Select a departure' },
  review: { label: 'Review', instruction: 'Review the booking' },
  confirmed: { label: 'Confirmed', instruction: 'Booking confirmed' },
} as const

type Stage = keyof typeof stages
const flows = {
  before: ['tour', 'departure', 'review', 'confirmed'],
  after: ['tour', 'review', 'confirmed'],
} as const satisfies Record<string, readonly Stage[]>
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
  const steps: readonly Stage[] = flows[flow]
  const current = steps[step]
  const combined = flow === 'after'
  const instruction = combined && current === 'tour'
    ? 'Pick a tour and departure'
    : stages[current].instruction
  const finished = step === steps.length - 1
  function select(value: Flow) {
    setFlow(value)
    setStep(0)
  }
  return (
    <div className={styles.demo} data-flow={flow}>
      <p className={styles.caption}>
        Illustrative comparison of booking flows
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
      <ol className={styles.route} role="list" aria-label="Booking steps">
        {flows.before.map((id) => {
          const index = steps.indexOf(id)
          const merged = index === -1
          return (
            <li
              key={id}
              className={styles.routeStep}
              data-stage={id}
              data-merged={merged ? '' : undefined}
              data-reached={index >= 0 && index <= step ? '' : undefined}
              aria-hidden={merged || undefined}
              aria-current={id === current ? 'step' : undefined}
            >
              <span className={styles.marker} aria-hidden="true" />
              <span className={styles.routeLabel}>
                {stages[id].label}
                {id === 'tour' && (
                  <span className={styles.combined} aria-hidden={!combined}>
                    {' + departure'}
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ol>
      <p className={styles.step} aria-live="polite" aria-atomic="true">
        <span className={styles.stepCount}>Step {step + 1} of {steps.length}</span>
        <span key={`${flow}-${step}`} className={styles.stepContent}>
          {instruction}
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
