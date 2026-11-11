import { useId } from 'react'
import { LoyaltyCard } from './LoyaltyCard'
import { LoyaltyLayers } from './LoyaltyLayers'
import { useLayerReveal } from './useLayerReveal'
import styles from './LoyaltyDemo.module.scss'

export function LoyaltyDemo() {
  const { ref, expanded, toggle } = useLayerReveal()
  const id = useId()
  return (
    <figure className={styles.lab} id="plate" aria-labelledby={`${id}-title`}>
      <div className={styles.head}>
        <span id={`${id}-title`}>Domclick / Agent rewards</span>
        <span className={styles.badge}>Demo</span>
      </div>
      <div className={styles.scene} ref={ref}>
        <div className={styles.stack} id={`${id}-layers`}>
          <LoyaltyLayers />
          <LoyaltyCard />
        </div>
      </div>
      <figcaption className={styles.foot}>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={`${id}-layers`}
        >
          {expanded ? 'Reassemble' : 'Inspect layers'}{' '}
          <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
        <span>UI / API / Logic / Data</span>
      </figcaption>
      <p className={styles.disclaimer}>
        Illustrative interaction · simplified loyalty workflow
      </p>
    </figure>
  )
}
