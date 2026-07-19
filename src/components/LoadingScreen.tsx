import { useState, useEffect, useCallback } from 'react'
import { FOOTER_LINKS } from '../data/content'

interface LoadingScreenProps {
  onEnter: () => void
}

export default function LoadingScreen({ onEnter }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Simulate loading progress
  useEffect(() => {
    let frame: number
    let start = Date.now()
    const duration = 2000 // 2 second fake load

    function tick() {
      const elapsed = Date.now() - start
      const p = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(p)

      if (p >= 100) {
        setLoaded(true)
      } else {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleEnter = useCallback(() => {
    setHidden(true)
    setTimeout(() => {
      onEnter()
    }, 500)
  }, [onEnter])

  if (hidden) {
    return null
  }

  return (
    <div className={`loadingScreen ${loaded ? 'loaded' : ''}`} id="loading">
      {/* NRG Logo */}
      <div className="loadingScreen__logo">
        <svg viewBox="0 0 53 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: '3rem' }}>
          <g clipPath="url(#ls-clip)">
            <mask id="ls-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="53" height="36">
              <path d="M53 0H0V36H53V0Z" fill="white" />
            </mask>
            <g mask="url(#ls-mask)">
              <path d="M24.7691 35.0714L25.6968 32.1613C26.5949 32.5405 27.8362 32.9794 29.3951 32.9794C31.4836 32.9794 33.4916 32.0803 33.4916 29.4173V29.021C32.5977 29.4982 31.5133 29.8519 29.9162 29.8519C25.663 29.8519 23.333 27.0695 23.333 23.128C23.333 19.1865 25.7816 16.2337 30.035 16.2337C31.8228 16.2337 33.0725 16.7109 33.9664 17.2308V16.5447H37.0724V29.1232C37.0724 33.7825 33.6822 35.9994 29.3529 35.9994C27.2559 35.9994 25.7393 35.5349 24.7691 35.0714ZM33.5339 21.4267C33.0302 20.5704 31.946 19.5089 30.3489 19.5089C28.1332 19.5089 26.7268 21.0908 26.7268 23.1707C26.7268 25.2506 28.2602 26.7474 30.3912 26.7474C32.0222 26.7474 33.1064 25.8483 33.5339 25.1196V21.4267Z" fill="white" />
              <path d="M0 16.5447H3.52561V17.5636C4.37639 16.879 5.62873 16.2337 7.49879 16.2337C8.89982 16.2337 10.5562 16.7536 11.407 18.4206C12.5504 16.9238 14.1645 16.2337 15.8632 16.2337C18.8505 16.2337 20.5914 18.2325 20.5914 21.4694V29.5536H17.0658V22.1951C17.0658 20.0301 16.2151 19.3013 14.7887 19.3013C13.4892 19.3013 12.1491 20.2431 12.1491 22.3657V29.5536H8.62354V22.1951C8.62354 20.0301 7.77276 19.3013 6.34636 19.3013C5.04687 19.3013 3.52561 20.2431 3.52561 22.3657V29.5536H0V16.5447Z" fill="white" />
              <path d="M39.3678 7.39834V0.0398438H42.6352L47.0579 5.27188V0.0398438H50.2062V7.39834H47.0579L42.5759 2.04067V7.39834H39.3678Z" fill="white" />
              <path d="M39.3678 14.9399V7.58142H42.4484V9.4146C43.0457 8.22174 44.2388 7.36639 45.9628 7.36639C46.6831 7.36639 47.2805 7.49541 47.6929 7.65303L47.0194 10.6059C46.6408 10.4356 46.1371 10.3066 45.5567 10.3066C43.8835 10.3066 42.8923 11.3254 42.8923 13.6615V14.9399H39.3678Z" fill="white" />
            </g>
          </g>
          <defs>
            <clipPath id="ls-clip">
              <rect width="53" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Progress */}
      <div className="loadingScreen__progress" id="loading-progress">
        {progress}%
      </div>

      {/* Enter button */}
      <button
        className={`loadingScreen__enter ${loaded ? 'show' : ''}`}
        onClick={handleEnter}
        id="enter-button"
        tabIndex={loaded ? 0 : -1}
      >
        Explore Bridge Power Solution
      </button>

      {/* Footer */}
      <div className="loadingScreen__footer">
        <div className="loadingScreen__footerLinks">
          {FOOTER_LINKS.map((link, i) => (
            <a
              key={i}
              className="loadingScreen__footerLink"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={0}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="loadingScreen__footerCopy">
          <span>©{new Date().getFullYear()} NRG Energy, Inc. All Rights Reserved</span>
        </div>
      </div>
    </div>
  )
}
