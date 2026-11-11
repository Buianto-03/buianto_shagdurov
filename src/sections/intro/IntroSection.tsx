import { profile } from '../../content/profile'
import styles from './IntroSection.module.scss'

export function IntroSection() {
  return (
    <section className={styles.intro} aria-labelledby="intro-name">
      <p className={styles.location}>
        <span aria-hidden="true" />
        Based in {profile.location}
      </p>
      <h1 id="intro-name">
        <span>{profile.firstName}</span>
        <span>
          {profile.lastName}
          <span className={styles.dot}>.</span>
        </span>
      </h1>
      <div className={styles.bottom}>
        <div>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.stack}>
            {profile.stackLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
        <a className={styles.explore} href="#reel">
          <span aria-hidden="true">↓</span>Explore my work
        </a>
      </div>
    </section>
  )
}
