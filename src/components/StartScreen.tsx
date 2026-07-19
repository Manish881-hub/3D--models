import { useEffect, useRef, useState } from 'react'
import { HERO_CONTENT } from '../data/content'

interface StartScreenProps {
  onScrollComplete: () => void
  isActive: boolean
}

export default function StartScreen({ onScrollComplete, isActive }: StartScreenProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const [introVisible, setIntroVisible] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)

  // Track scroll for video parallax and intro reveal
  useEffect(() => {
    if (!isActive) return

    function handleScroll() {
      if (!sectionRef.current || !videoWrapRef.current) return

      const rect = videoWrapRef.current.getBoundingClientRect()
      const wh = window.innerHeight
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - wh)))
      setVideoProgress(progress)

      // Reveal intro text at certain scroll position
      if (progress > 0.3) {
        setIntroVisible(true)
      }

      // Complete when fully scrolled
      if (progress >= 0.95) {
        onScrollComplete()
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isActive, onScrollComplete])

  return (
    <div className={`startScreen ${!isActive ? 'out' : ''}`} ref={sectionRef}>
      {/* Hero top section */}
      <div className="startScreen__hero">
        <div className="startScreen__title">
          <h1 className="phaseTitle phaseTitle--light in settled" style={{ color: 'var(--color-dark)' }}>
            {HERO_CONTENT.title.map((line, i) => (
              <span className="line" key={i}>
                <span className="inner" style={{
                  WebkitTextFillColor: 'var(--color-dark)',
                  background: 'none',
                  backgroundClip: 'border-box',
                  WebkitBackgroundClip: 'border-box',
                }}>
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="startScreen__paragraph" style={{ maxWidth: '36rem' }}>
          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.8rem)', lineHeight: 1.3, color: 'var(--color-dark)' }}>
            {HERO_CONTENT.paragraph}
          </p>
        </div>

        <div className="startScreen__scrollMessage" style={{ marginTop: '1.5rem' }}>
          <div className="scrollMessage">
            <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
              <rect x="1" y="1" width="10" height="16" rx="5" stroke="var(--color-dark)" strokeWidth="1.5" />
              <circle cx="6" cy="6" r="1.5" fill="var(--color-dark)">
                <animate attributeName="cy" values="5;10;5" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
            <span style={{ color: 'var(--color-dark)' }}>Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Video section */}
      <div className="startScreen__videoWrap" ref={videoWrapRef}>
        <div className="startScreen__video">
          {/* Phase images as placeholder - will be replaced by actual video */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '1.2rem',
              fontWeight: 500,
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🏗️</div>
              Video placeholder — add scroll video here
            </div>
          </div>

          {/* Overlay content */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 4rem',
            background: 'rgba(38, 29, 38, 0.7)',
          }}>
            <div className="startScreen__lowerContent">
              <div className={`startScreen__intro ${introVisible ? 'show' : ''}`}>
                {HERO_CONTENT.introLines.map((line, i) => (
                  <span className="line" key={i}>
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with explore button */}
      <div style={{
        position: 'relative',
        padding: '8rem 3.5rem',
        background: 'var(--color-off-white)',
        color: 'var(--color-dark)',
      }}>
        <div style={{ maxWidth: '44rem' }}>
          <h2 className="phaseTitle anim in settled" style={{
            marginBottom: '2rem',
            fontSize: 'clamp(2.5rem, 6vw, 8rem)',
          }}>
            <span className="line">
              <span className="inner" style={{
                WebkitTextFillColor: 'var(--color-dark)',
                background: 'none',
                backgroundClip: 'border-box',
                WebkitBackgroundClip: 'border-box',
              }}>
                Speed to Power
              </span>
            </span>
          </h2>
          <p className="paragraph--large" style={{ color: 'var(--color-dark)' }}>
            From site evaluation to completion — delivering scalable, reliable and future-proof solutions for AI and cloud data center infrastructure.
          </p>
        </div>
      </div>
    </div>
  )
}
