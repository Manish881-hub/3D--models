import { useState, useCallback } from 'react'
import { ReactLenis } from 'lenis/react'
import Nav from './components/Nav'
import LoadingScreen from './components/LoadingScreen'
import StartScreen from './components/StartScreen'
import ExploreScreen from './components/ExploreScreen'
import DeepDive from './components/DeepDive'
import { PHASES } from './data/content'

type AppState = 'loading' | 'start' | 'exploring'

function App() {
  const [appState, setAppState] = useState<AppState>('loading')
  const [currentPhase, setCurrentPhase] = useState(0)
  const [deepDiveId, setDeepDiveId] = useState<string | null>(null)

  const handleEnter = useCallback(() => {
    setAppState('start')
  }, [])

  const handleStartComplete = useCallback(() => {
    setAppState('exploring')
    setCurrentPhase(1)
  }, [])

  const handleNextPhase = useCallback(() => {
    if (currentPhase < PHASES.length) {
      setCurrentPhase(prev => prev + 1)
    } else {
      // Loop back or show completion
      setCurrentPhase(1)
    }
  }, [currentPhase])

  const handlePhaseSelect = useCallback((phase: number) => {
    if (phase === 0) {
      // Go to start
      setAppState('start')
      setCurrentPhase(0)
    } else {
      setAppState('exploring')
      setCurrentPhase(phase)
    }
  }, [])

  const handleOpenDeepDive = useCallback((id: string) => {
    setDeepDiveId(id)
  }, [])

  const handleCloseDeepDive = useCallback(() => {
    setDeepDiveId(null)
  }, [])

  const activePhase = currentPhase > 0 && currentPhase <= PHASES.length
    ? PHASES[currentPhase - 1]
    : null

  return (
    <ReactLenis root options={{ autoRaf: true, smoothWheel: appState === 'start' }}>
      <div style={{ position: 'relative', background: 'var(--color-off-white)' }}>
        {/* Loading Screen */}
        {appState === 'loading' && (
          <LoadingScreen onEnter={handleEnter} />
        )}

        {/* Navigation - hidden during loading */}
        {appState !== 'loading' && (
          <Nav
            currentPhase={currentPhase}
            onPhaseSelect={handlePhaseSelect}
            isDark={appState === 'start'}
          />
        )}

        {/* Start / Hero Screen */}
        {appState === 'start' && (
          <StartScreen
            onScrollComplete={handleStartComplete}
            isActive={appState === 'start'}
          />
        )}

        {/* Phase Explore Screens */}
        {appState === 'exploring' && activePhase && (
          <ExploreScreen
            phase={activePhase}
            isActive={true}
            onNextPhase={handleNextPhase}
            onOpenDeepDive={handleOpenDeepDive}
          />
        )}

        {/* Deep Dive Overlay */}
        <DeepDive
          id={deepDiveId}
          onClose={handleCloseDeepDive}
        />

        {/* Scroll container for Lenis - only active during start */}
        {appState === 'start' && (
          <div id="explore-scroll" style={{ height: '500vh' }} />
        )}
      </div>
    </ReactLenis>
  )
}

export default App
