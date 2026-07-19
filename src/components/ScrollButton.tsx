import { useState, useRef, useCallback, useEffect } from 'react'

interface ScrollButtonProps {
  label: string
  onComplete: () => void
  isActive: boolean
}

export default function ScrollButton({ label, onComplete, isActive }: ScrollButtonProps) {
  const [progress, setProgress] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const progressRef = useRef(0)
  const decayRef = useRef<number | null>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Decay progress over time when not actively scrolling
  useEffect(() => {
    if (!isActive) return

    function decay() {
      if (progressRef.current > 0 && !triggered) {
        progressRef.current = Math.max(0, progressRef.current - 0.005)
        setProgress(progressRef.current)
      }
      decayRef.current = requestAnimationFrame(decay)
    }

    decayRef.current = requestAnimationFrame(decay)
    return () => {
      if (decayRef.current) cancelAnimationFrame(decayRef.current)
    }
  }, [isActive, triggered])

  const handleProgress = useCallback((delta: number) => {
    if (triggered || !isActive) return

    const increment = Math.abs(delta) * 0.002
    progressRef.current = Math.min(1, progressRef.current + increment)
    setProgress(progressRef.current)

    if (progressRef.current >= 1) {
      setTriggered(true)
      onComplete()
    }
  }, [onComplete, triggered, isActive])

  // Expose progress handler via wheel event
  useEffect(() => {
    if (!isActive) return

    function onWheel(e: WheelEvent) {
      if (e.deltaY > 0) {
        handleProgress(e.deltaY)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [isActive, handleProgress])

  // Reset when deactivated
  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      setTriggered(false)
      progressRef.current = 0
    }
  }, [isActive])

  const progressWidth = triggered
    ? 'calc(100% - 0.4rem)'
    : `${Math.max(3.6, progress * 100)}%`

  return (
    <div
      className={`scrollButton ${triggered ? 'triggered' : ''}`}
      ref={buttonRef}
      tabIndex={0}
      role="button"
      aria-label={label}
    >
      <div
        className="scrollButton__progress"
        style={{ width: progressWidth }}
      />
      <div className="scrollButton__icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="var(--color-dark-green)" strokeWidth="1.5" />
          <path d="M10 6V14M10 14L7 11M10 14L13 11" stroke="var(--color-dark-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="scrollButton__label">{label}</span>
    </div>
  )
}
