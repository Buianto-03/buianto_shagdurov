import { LoyaltyDemo } from '../../features/loyalty-demo/LoyaltyDemo'
import styles from './EngineeringSection.module.scss'

export function EngineeringSection() {
  return (
    <section className={styles.section} aria-labelledby="engineering-title">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>02 / Selected engineering study</p>
        <h2 id="engineering-title">
          From interface
          <br />
          to <span>data.</span>
        </h2>
        <p>
          An agent loyalty program, built end to end. Explore the frontend, API,
          reward rules and data model.
        </p>
        <a href="#domclick">Read the case notes ↗</a>
      </div>
      <LoyaltyDemo />
    </section>
  )
}
