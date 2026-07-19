import { useState, useRef, useEffect, useCallback } from 'react'
import { MENU_ITEMS } from '../data/content'

interface NavProps {
  currentPhase: number
  onPhaseSelect: (phase: number) => void
  isDark?: boolean
}

export default function Nav({ currentPhase, onPhaseSelect, isDark = false }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev)
  }, [])

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [menuOpen])

  // Resize menu BG when open
  useEffect(() => {
    if (bgRef.current) {
      if (menuOpen) {
        const contentEl = menuRef.current?.querySelector('.nav__menuContent') as HTMLElement
        if (contentEl) {
          bgRef.current.style.width = contentEl.offsetWidth + 'px'
          bgRef.current.style.height = contentEl.offsetHeight + 'px'
        }
      } else {
        bgRef.current.style.width = ''
        bgRef.current.style.height = ''
      }
    }
  }, [menuOpen])

  const handlePhaseClick = (phase: number) => {
    onPhaseSelect(phase)
    setMenuOpen(false)
  }

  return (
    <nav className={`nav ${isDark ? '' : 'menu-dark'}`} id="nav">
      {/* Logo */}
      <div className="nav__logo" id="nav-logo" onClick={() => onPhaseSelect(0)} tabIndex={0}>
        <svg viewBox="0 0 53 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#nrg-clip)">
            <mask id="nrg-mask" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="53" height="36">
              <path d="M53 0H0V36H53V0Z" fill="white" />
            </mask>
            <g mask="url(#nrg-mask)">
              <path d="M24.7691 35.0714L25.6968 32.1613C26.5949 32.5405 27.8362 32.9794 29.3951 32.9794C31.4836 32.9794 33.4916 32.0803 33.4916 29.4173V29.021C32.5977 29.4982 31.5133 29.8519 29.9162 29.8519C25.663 29.8519 23.333 27.0695 23.333 23.128C23.333 19.1865 25.7816 16.2337 30.035 16.2337C31.8228 16.2337 33.0725 16.7109 33.9664 17.2308V16.5447H37.0724V29.1232C37.0724 33.7825 33.6822 35.9994 29.3529 35.9994C27.2559 35.9994 25.7393 35.5349 24.7691 35.0714ZM33.5339 21.4267C33.0302 20.5704 31.946 19.5089 30.3489 19.5089C28.1332 19.5089 26.7268 21.0908 26.7268 23.1707C26.7268 25.2506 28.2602 26.7474 30.3912 26.7474C32.0222 26.7474 33.1064 25.8483 33.5339 25.1196V21.4267Z" fill="white" className="flip" />
              <path d="M0 16.5447H3.52561V17.5636C4.37639 16.879 5.62873 16.2337 7.49879 16.2337C8.89982 16.2337 10.5562 16.7536 11.407 18.4206C12.5504 16.9238 14.1645 16.2337 15.8632 16.2337C18.8505 16.2337 20.5914 18.2325 20.5914 21.4694V29.5536H17.0658V22.1951C17.0658 20.0301 16.2151 19.3013 14.7887 19.3013C13.4892 19.3013 12.1491 20.2431 12.1491 22.3657V29.5536H8.62354V22.1951C8.62354 20.0301 7.77276 19.3013 6.34636 19.3013C5.04687 19.3013 3.52561 20.2431 3.52561 22.3657V29.5536H0V16.5447Z" fill="white" className="flip" />
              <path d="M39.3678 7.39834V0.0398438H42.6352L47.0579 5.27188V0.0398438H50.2062V7.39834H47.0579L42.5759 2.04067V7.39834H39.3678Z" fill="white" className="flip" />
              <path d="M39.3678 14.9399V7.58142H42.4484V9.4146C43.0457 8.22174 44.2388 7.36639 45.9628 7.36639C46.6831 7.36639 47.2805 7.49541 47.6929 7.65303L47.0194 10.6059C46.6408 10.4356 46.1371 10.3066 45.5567 10.3066C43.8835 10.3066 42.8923 11.3254 42.8923 13.6615V14.9399H39.3678Z" fill="white" className="flip" />
            </g>
          </g>
          <defs>
            <clipPath id="nrg-clip">
              <rect width="53" height="36" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Right side menu */}
      <div className="nav__right">
        <div
          className={`nav__menu ${menuOpen ? '' : ''}`}
          ref={menuRef}
        >
          <div className="nav__menuBG" ref={bgRef} />

          {/* Phase circle indicator */}
          {currentPhase > 0 && (
            <div className="nav__phaseCircle show">
              {currentPhase}
            </div>
          )}

          {/* Menu label */}
          <div
            className={`nav__menuLabel ${menuOpen ? 'hide' : ''}`}
            onClick={toggleMenu}
          >
            {currentPhase > 0 && (
              <span className="nav__phaseLabel" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                {MENU_ITEMS[currentPhase - 1]?.label}
              </span>
            )}
          </div>

          {/* Hamburger icon */}
          <div
            className="nav__menuIcon"
            onClick={toggleMenu}
            tabIndex={0}
            role="button"
            aria-label="Toggle menu"
            id="menu-icon"
          >
            <span />
            <span />
          </div>

          {/* Menu content dropdown */}
          <div className="nav__menuContent">
            <div className="nav__menuLinks">
              {MENU_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`nav__menuLink ${currentPhase === item.phase ? 'active' : ''}`}
                  onClick={() => handlePhaseClick(item.phase)}
                  tabIndex={0}
                  role="button"
                >
                  <a>{item.label}</a>
                </div>
              ))}
            </div>
            <div className="nav__menuContact">
              <button className="nav__menuContactButton" tabIndex={0}>
                <span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12.6 9.8C11.76 9.8 10.94 9.66 10.18 9.4C9.94 9.32 9.68 9.38 9.48 9.56L8.2 11.12C6.08 10.08 3.92 7.98 2.92 5.8L4.46 4.54C4.66 4.34 4.72 4.06 4.64 3.82C4.36 3.06 4.24 2.24 4.24 1.4C4.24 1.02 3.92 0.7 3.54 0.7H1.4C1.02 0.7 0.7 1.02 0.7 1.4C0.7 8.02 5.98 13.3 12.6 13.3C12.98 13.3 13.3 12.98 13.3 12.6V10.5C13.3 10.12 12.98 9.8 12.6 9.8Z" fill="white" className="stroke" />
                  </svg>
                </span>
                <span>Get In Touch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
