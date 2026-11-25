type Motion = { target: boolean; animation: Animation; observer?: ResizeObserver; finish: () => void }
const motions = new WeakMap<HTMLDetailsElement, Motion>()

export function caseTarget(element: HTMLDetailsElement) {
  return motions.get(element)?.target ?? element.open
}

export function cancelCaseMotion(element: HTMLDetailsElement) {
  const motion = motions.get(element)
  if (motion) motion.finish()
}

export function setCaseOpen(element: HTMLDetailsElement, target: boolean, immediate = false, onFinish?: () => void) {
  const current = motions.get(element)
  if (current?.target === target && !immediate) return
  if (!current && element.open === target) { onFinish?.(); return }
  const height = element.getBoundingClientRect().height
  if (current) {
    motions.delete(element)
    current.observer?.disconnect()
    current.animation.cancel()
  }
  const summary = element.querySelector('summary')
  if (!target && element.contains(document.activeElement) && document.activeElement !== summary) summary?.focus()
  if (immediate || matchMedia('(prefers-reduced-motion: reduce)').matches || typeof element.animate !== 'function') {
    element.open = target
    element.style.height = ''
    element.style.overflow = ''
    onFinish?.()
    return
  }
  element.open = true
  element.style.overflow = 'hidden'
  element.style.height = 'auto'
  const fullHeight = element.getBoundingClientRect().height
  const end = target ? fullHeight : (summary?.getBoundingClientRect().height ?? 0)
  element.style.height = `${height}px`
  const animation = element.animate([{ height: `${height}px` }, { height: `${end}px` }], {
    duration: target ? 280 : 220, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards',
  })
  const motion: Motion = { target, animation, finish: () => {
    if (motions.get(element) !== motion) return
    motions.delete(element)
    motion.observer?.disconnect()
    animation.cancel()
    element.open = target
    element.style.height = ''
    element.style.overflow = ''
    onFinish?.()
  } }
  motions.set(element, motion)
  animation.onfinish = motion.finish
  if (target && typeof ResizeObserver !== 'undefined') {
    const content = summary?.nextElementSibling
    if (content) {
      let previous = content.getBoundingClientRect().height
      motion.observer = new ResizeObserver(() => {
        const next = content.getBoundingClientRect().height
        if (Math.abs(next - previous) < 1) return
        previous = next
        const keyframes = animation.effect as KeyframeEffect | null
        keyframes?.setKeyframes([{ height: `${height}px` }, { height: `${(summary?.getBoundingClientRect().height ?? 0) + next}px` }])
      })
      motion.observer.observe(content)
    }
  }
}
