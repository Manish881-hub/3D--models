import { useState, useCallback, useEffect, useRef } from 'react'
import { BOARD_IMAGES } from '../data/content'
import type { PhaseData } from '../data/types'
import ScrollButton from './ScrollButton'

interface ExploreScreenProps {
  phase: PhaseData
  isActive: boolean
  onNextPhase: () => void
  onOpenDeepDive: (id: string) => void
}

export default function ExploreScreen({ phase, isActive, onNextPhase, onOpenDeepDive }: ExploreScreenProps) {
  const [currentStep, setCurrentStep] = useState(0) // 0 = intro, 1..n = nodes, last = exit
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [animState, setAnimState] = useState<'entering' | 'visible' | 'exiting'>('entering')
  const containerRef = useRef<HTMLDivElement>(null)

  const totalSteps = phase.boardImages.length + 2 // intro + nodes + exit

  // Reset when phase changes
  useEffect(() => {
    if (isActive) {
      setCurrentStep(0)
      setActiveNode(null)
      setAnimState('entering')
      setTimeout(() => setAnimState('visible'), 100)
    }
  }, [isActive, phase.phase])

  // Handle scroll/wheel to advance steps
  useEffect(() => {
    if (!isActive || animState !== 'visible') return
    let scrollCooldown = false

    function handleWheel(e: WheelEvent) {
      if (scrollCooldown) return
      scrollCooldown = true
      setTimeout(() => { scrollCooldown = false }, 600)

      if (e.deltaY > 0 && currentStep < totalSteps - 1) {
        // Last step (exit) handled by ScrollButton
        if (currentStep < totalSteps - 2) {
          setCurrentStep(prev => prev + 1)
          setActiveNode(null)
        }
      } else if (e.deltaY < 0 && currentStep > 0) {
        setCurrentStep(prev => prev - 1)
        setActiveNode(null)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isActive, currentStep, totalSteps, animState])

  const handleNodeClick = useCallback((nodeId: string) => {
    setActiveNode(prev => prev === nodeId ? null : nodeId)
  }, [])

  const isIntro = currentStep === 0
  const isExit = currentStep === totalSteps - 1
  const nodeIndex = currentStep - 1

  if (!isActive) return null

  return (
    <div
      className={`exploreScreen ${animState}`}
      ref={containerRef}
      style={{ zIndex: 5 }}
    >
      {/* Background - phase imagery */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${phase.color} 0%, ${phase.color}dd 50%, ${phase.color}88 100%)`,
        zIndex: 0,
        transition: 'background 0.5s ease-in-out',
      }} />

      {/* Phase Intro */}
      {isIntro && (
        <div className="introScreen" style={{ zIndex: 2 }}>
          <div className="introScreen__cover">
            <div className="badge anim fadeUp in" style={{ animationDelay: '0.2s' }}>
              Phase {phase.phase}
            </div>
            <h2 className="phaseTitle phaseTitle--light anim in" style={{ marginTop: '1rem' }}>
              <span className="line">
                <span className="inner">{phase.title}</span>
              </span>
            </h2>
          </div>
          <div className="introScreen__explain" style={{ padding: '3rem 3.5rem' }}>
            <p className="paragraph--large anim fadeUp in" style={{ color: 'var(--color-off-white)', maxWidth: '40rem' }}>
              {phase.description}
            </p>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'fixed',
            bottom: '3rem',
            left: '3.5rem',
            zIndex: 10,
          }}>
            <div className="scrollMessage anim fadeUp in" style={{ cursor: 'pointer' }} onClick={() => setCurrentStep(1)}>
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                <rect x="1" y="1" width="10" height="16" rx="5" stroke="white" strokeWidth="1.5" />
                <circle cx="6" cy="6" r="1.5" fill="white">
                  <animate attributeName="cy" values="5;10;5" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <span style={{ color: 'var(--color-white)' }}>Scroll to explore</span>
            </div>
          </div>
        </div>
      )}

      {/* Node screens */}
      {!isIntro && !isExit && nodeIndex >= 0 && nodeIndex < phase.boardImages.length && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
        }}>
          {/* Board image display */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            maxWidth: '800px',
            transition: 'opacity 0.5s ease-in-out',
          }}>
            <img
              src={`/src/assets/images/boards/${phase.boardImages[nodeIndex]?.filename}`}
              alt={phase.boardImages[nodeIndex]?.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '1rem',
                opacity: 0.9,
              }}
              onError={(e) => {
                // Fallback if image doesn't exist
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>

          {/* Node info overlay */}
          <div style={{
            position: 'fixed',
            bottom: '6rem',
            left: '3.5rem',
            zIndex: 7,
            maxWidth: '30rem',
          }}>
            <span className="exploreScreen__stepHeading anim fadeUp in" style={{ color: 'var(--color-white)' }}>
              Step {String(nodeIndex + 1).padStart(2, '0')}
            </span>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 2.5vw, 2.4rem)',
              fontWeight: 700,
              color: 'var(--color-white)',
              marginBottom: '0.75rem',
              marginTop: '0.5rem',
            }}>
              {phase.boardImages[nodeIndex]?.name.replace(/_/g, ' ')}
            </h3>
            <p style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.4,
            }}>
              {phase.boardImages[nodeIndex]?.description}
            </p>

            {/* Deep dive button */}
            <div
              className="arrowButton"
              style={{
                marginTop: '1.5rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              onClick={() => onOpenDeepDive(phase.boardImages[nodeIndex]?.id)}
              tabIndex={0}
              role="button"
            >
              <span className="button__inner" style={{ color: 'var(--color-white)' }}>
                Learn more
              </span>
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '3.5rem',
            zIndex: 10,
          }}>
            <div className="scrollMessage">
              <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
                <rect x="1" y="1" width="10" height="16" rx="5" stroke="white" strokeWidth="1.5" />
                <circle cx="6" cy="6" r="1.5" fill="white">
                  <animate attributeName="cy" values="5;10;5" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Scroll to continue</span>
            </div>
          </div>
        </div>
      )}

      {/* Exit screen - scroll button to next phase */}
      {isExit && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                fontWeight: 700,
                color: 'var(--color-white)',
                marginBottom: '1rem',
              }}>
                Phase {phase.phase} Complete
              </h3>
              <p style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '30rem',
                margin: '0 auto',
                lineHeight: 1.4,
              }}>
                {phase.subtitle}
              </p>
            </div>
            <ScrollButton
              label={`Scroll to Phase ${phase.phase + 1}`}
              onComplete={onNextPhase}
              isActive={isExit}
            />
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div className="progress" style={{ opacity: 1 }}>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`progress__dot ${i === currentStep ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}
