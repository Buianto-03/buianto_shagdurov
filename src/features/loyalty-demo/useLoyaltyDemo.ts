import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../shared/hooks/useReducedMotion'
import type { LoyaltyStage } from './types'

export function useLoyaltyDemo() {
  const [stage, setStage] = useState<LoyaltyStage>('idle')
  const lock = useRef(false)
  const reduced = useReducedMotion()
  const running = stage === 'deal-completed' || stage === 'rules-checked'

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(
      () => {
        const next =
          reduced || stage === 'rules-checked'
            ? 'reward-credited'
            : 'rules-checked'
        if (next === 'reward-credited') lock.current = false
        setStage(next)
      },
      reduced ? 0 : 750,
    )
    return () => window.clearTimeout(timer)
  }, [stage, reduced, running])

  function run() {
    if (lock.current) return
    lock.current = !reduced
    setStage(reduced ? 'reward-credited' : 'deal-completed')
  }
  return { stage, running, run }
}
