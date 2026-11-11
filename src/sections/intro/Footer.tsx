import { profile } from '../../content/profile'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>{profile.name} · Product Atlas</span>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
