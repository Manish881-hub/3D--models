import { createContext, useContext, useRef, useState, ReactNode } from 'react'
import { useLenis } from 'lenis/react'

interface ScrollState {
  progress: number
  scroll: number
  limit: number
  phase: number
}

const ScrollContext = createContext<ScrollState>({
  progress: 0,
  scroll: 0,
  limit: 0,
  phase: 0,
})

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollState>({ progress: 0, scroll: 0, limit: 0, phase: 0 })
  const phaseRef = useRef(0)

  useLenis((data) => {
    const progress = data.progress
    const scroll = data.animatedScroll ?? data.scroll
    const limit = data.limit
    const phase = Math.min(5, Math.floor(progress * 6))
    if (phase !== phaseRef.current) {
      phaseRef.current = phase
    }
    setState({ progress, scroll, limit, phase })
  })

  return (
    <ScrollContext.Provider value={state}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useScrollState() {
  return useContext(ScrollContext)
}
