import { useEffect } from 'react'
import { projects } from '../../content/projects'

export function useCaseNavigation() {
  useEffect(() => {
    const frames = new Set<number>()
    function open(hash: string) {
      const id = hash.slice(1)
      if (!projects.some((project) => project.id === id)) return
      const element = document.getElementById(id)
      if (!(element instanceof HTMLDetailsElement)) return
      element.open = true
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
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      document.removeEventListener('click', onClick)
      frames.forEach((frame) => cancelAnimationFrame(frame))
    }
  }, [])
}
