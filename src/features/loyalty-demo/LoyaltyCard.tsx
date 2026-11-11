import { frontendCopy } from '../../content/projects'
import { useLoyaltyDemo } from './useLoyaltyDemo'
import styles from './LoyaltyCard.module.scss'

const steps = ['Complete deal', 'Check rules', 'Credit reward']
const progress = {
  idle: 0,
  'deal-completed': 1,
  'rules-checked': 2,
  'reward-credited': 3,
}
const messages = {
  idle: 'Ready for a demo deal.',
  'deal-completed': 'Demo deal completed.',
  'rules-checked': 'Reward conditions met.',
  'reward-credited': 'Demo reward credited.',
}

export function LoyaltyCard() {
  const { stage, running, run } = useLoyaltyDemo()
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span>Frontend · React</span>
        <span aria-hidden="true">↗</span>
      </div>
      <h3>
        Loyalty <span>pass.</span>
      </h3>
      <p className={styles.copy}>{frontendCopy}</p>
      <ol className={styles.steps} aria-label="Simplified loyalty workflow">
        {steps.map((step, index) => (
          <li key={step} data-done={index < progress[stage] ? '' : undefined}>
            <span className={styles.node} aria-hidden="true" />
            {step}
            <span className={styles.srOnly}>
              {index < progress[stage] ? ' — completed' : ' — pending'}
            </span>
          </li>
        ))}
      </ol>
      <button type="button" onClick={run} disabled={running}>
        {running
          ? 'Running demo…'
          : stage === 'reward-credited'
            ? 'Replay demo ↻'
            : 'Run demo deal ↗'}
      </button>
      <p className={styles.status} role="status">
        {messages[stage]}
      </p>
    </div>
  )
}
