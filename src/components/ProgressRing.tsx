import { useScrollState } from '../context/ScrollContext'

export default function ProgressRing() {
  const { progress } = useScrollState()
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - progress * circumference

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <svg width="48" height="48" viewBox="0 0 48 48" className="transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-200 ease-linear"
        />
      </svg>
    </div>
  )
}
