import { useEffect } from 'react'
import { projects } from '../../content/projects'
import { cancelCaseMotion, setCaseOpen } from './caseDisclosure'

export function useCaseNavigation() {
  useEffect(() => {
    const frames = new Set<number>()
    function open(hash: string, immediate = false) {
      const id = hash.slice(1)
      if (!projects.some((project) => project.id === id)) return
      const element = document.getElementById(id)
      if (!(element instanceof HTMLDetailsElement)) return
      setCaseOpen(element, true, immediate, () => {
        if (!immediate) element.scrollIntoView({ block: 'start', behavior: 'instant' })
      })
      const frame = requestAnimationFrame(() => {
        frames.delete(frame)
        element.scrollIntoView({
          block: 'start',
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
            ? 'instant'
            : 'smooth',
        })
      })
      frames.add(frame)
    }
    const onHashChange = () => open(window.location.hash)
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const anchor =
        event.target instanceof Element ? event.target.closest('a') : null
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      )
        return
      const url = new URL(anchor.href)
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.search === location.search
      )
        open(url.hash)
    }
    open(window.location.hash, true)
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => {
      if (media.matches) document.querySelectorAll('details').forEach(cancelCaseMotion)
    }
    media.addEventListener('change', onMotionChange)
    window.addEventListener('hashchange', onHashChange)
    document.addEventListener('click', onClick)
    return () => {
      media.removeEventListener('change', onMotionChange)
      document.querySelectorAll('details').forEach(cancelCaseMotion)
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick)
      frames.forEach((frame) => cancelAnimationFrame(frame))
    }
  }, [])
}
