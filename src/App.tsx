import { ReactLenis } from 'lenis/react'
import { ScrollProvider } from './context/ScrollContext'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import ProgressRing from './components/ProgressRing'
import SceneManager from './components/3d/SceneManager'
import HeroSection from './components/sections/HeroSection'
import IntroSection from './components/sections/IntroSection'
import PhaseSection from './components/sections/PhaseSection'
import FooterSection from './components/sections/FooterSection'

const PHASES = [
  {
    phase: 1,
    title: 'Land',
    subtitle: 'Site Selection & Acquisition',
    description: 'We identify and secure prime locations that align with our vision for community-centric development. Every site is evaluated for accessibility, infrastructure, and long-term value.',
    details: ['Site feasibility studies', 'Environmental impact assessment', 'Zoning & permit navigation', 'Infrastructure readiness evaluation'],
    isLeft: true,
  },
  {
    phase: 2,
    title: 'Design',
    subtitle: 'Architecture & Planning',
    description: 'Our design team creates master plans that balance aesthetics with functionality. Every community is thoughtfully laid out to maximize green space, natural light, and flow.',
    details: ['Master planning & layout design', 'Sustainable architecture', 'Green space integration', 'Community amenity planning'],
    isLeft: false,
  },
  {
    phase: 3,
    title: 'Construction',
    subtitle: 'Building the Foundation',
    description: 'With permits secured and designs finalized, we break ground. Our construction team brings the vision to life with precision, quality craftsmanship, and strict timelines.',
    details: ['Groundbreaking & site prep', 'Structural framing & infrastructure', 'Quality control inspections', 'Timeline management'],
    isLeft: true,
  },
  {
    phase: 4,
    title: 'Amenities',
    subtitle: 'Pools, Parks & Community Spaces',
    description: 'We build the spaces that bring communities together — swimming pools, walking trails, playgrounds, and water features that become the heart of the neighborhood.',
    details: ['Resort-style swimming pools', 'Landscaped parks & gardens', 'Walking & biking trails', 'Community clubhouses'],
    isLeft: false,
  },
  {
    phase: 5,
    title: 'Handover',
    subtitle: 'Your Community, Ready',
    description: 'The final phase — a complete, thriving community ready for its residents. From tree-lined streets to welcoming front doors, every detail is in place.',
    details: ['Final walkthrough & inspection', 'Landscaping & finishing touches', 'Community opening event', 'Ongoing management support'],
    isLeft: true,
  },
]

function App() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <ScrollProvider>
        <div className="relative bg-black text-white">
          <LoadingScreen />
          <Navbar />
          <ProgressRing />
          <SceneManager />
          <HeroSection />
          <IntroSection />
          {PHASES.map((p) => (
            <PhaseSection key={p.phase} {...p} />
          ))}
          <FooterSection />
        </div>
      </ScrollProvider>
    </ReactLenis>
  )
}

export default App
