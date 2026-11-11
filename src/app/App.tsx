import { Header } from '../sections/intro/Header'
import { IntroSection } from '../sections/intro/IntroSection'
import { AboutSection } from '../sections/about/AboutSection'
import { EngineeringSection } from '../sections/engineering/EngineeringSection'
import { ProjectsSection } from '../sections/projects/ProjectsSection'
import { CaseStudiesSection } from '../sections/case-studies/CaseStudiesSection'
import { Footer } from '../sections/intro/Footer'
import styles from './App.module.scss'

export function App() {
  return (
    <div id="top" className={styles.page}>
      <a className={styles.skip} href="#work">
        Skip to projects
      </a>
      <Header />
      <main>
        <IntroSection />
        <AboutSection />
        <EngineeringSection />
        <ProjectsSection />
        <CaseStudiesSection />
      </main>
      <Footer />
    </div>
  )
}
