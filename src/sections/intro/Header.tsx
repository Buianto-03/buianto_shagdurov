import { profile } from '../../content/profile'
import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <a
        href="#top"
        className={styles.brand}
        aria-label={`${profile.name}, home`}
      >
        <span className={styles.mark} aria-hidden="true">
          bs.
        </span>
        <span>{profile.name}</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#reel">Work</a>
        <a href="#profile">About</a>
      </nav>
    </header>
  )
}
