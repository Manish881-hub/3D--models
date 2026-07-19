import { useScrollState } from '../context/ScrollContext'

const PHASE_LABELS = ['Start', 'Land', 'Design', 'Construction', 'Amenities', 'Handover']

export default function Navbar() {
  const { phase } = useScrollState()

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 mix-blend-difference">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 53 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-auto">
          <path d="M24.7691 35.0714L25.6968 32.1613C26.5949 32.5405 27.8362 32.9794 29.3951 32.9794C31.4836 32.9794 33.4916 32.0803 33.4916 29.4173V29.021C32.5977 29.4982 31.5133 29.8519 29.9162 29.8519C25.663 29.8519 23.333 27.0695 23.333 23.1282C23.333 19.187 26.0951 16.0723 30.6067 16.0723C33.1654 16.0723 35.1607 16.8563 36.7662 17.8959V28.4288C36.7662 30.18 36.5756 31.16 36.1859 32.1059C35.1734 34.5772 32.7545 36.0003 29.2214 36.0003C27.8404 36.0003 26.0612 35.6722 24.7649 35.0714H24.7691Z" fill="white"/>
          <path d="M0 16.3834H3.13484L3.21533 17.7682C4.2744 16.6561 5.79946 16.1064 7.29486 16.1064C10.2984 16.1064 12.2894 17.8832 12.2894 21.2962V29.5068H9.01479V21.6967C9.01479 19.8049 8.03621 18.9655 6.5408 18.9655C5.0454 18.9655 3.68556 19.9284 3.2704 21.1385V29.5068H0V16.3877V16.3834Z" fill="white"/>
          <path d="M14.9714 16.3827H18.0723L18.1528 18.0657C19.1399 16.8216 20.4446 16.1611 22.1307 16.1611C22.7026 16.1611 23.4312 16.289 24.0031 16.5403L22.9652 19.5102C22.4992 19.327 21.7663 19.229 21.2368 19.229C19.8727 19.229 18.6612 20.1152 18.2375 21.2912V29.4976H14.9629V16.3784L14.9714 16.3827Z" fill="white"/>
          <path d="M49.1703 6.4043H46.959V9.96211H49.1703V6.4043Z" fill="#FFD200"/>
          <path d="M49.1703 12.8086H46.959V16.3707H49.1703V12.8086Z" fill="#FFD200"/>
          <path d="M46.6496 10.2686H43.125V12.5012H46.6496V10.2686Z" fill="#439539"/>
          <path d="M52.9998 10.2686H49.4668V12.5012H52.9998V10.2686Z" fill="#FFD200"/>
          <path d="M42.8246 6.4043H40.6133V9.96211H42.8246V6.4043Z" fill="#333092"/>
          <path d="M42.8246 12.8086H40.6133V16.3707H42.8246V12.8086Z" fill="#00AEEF"/>
          <path d="M40.3042 10.2686H36.7754V12.5012H40.3042V10.2686Z" fill="#00AEEF"/>
          <path d="M42.8246 0H40.6133V3.55782H42.8246V0Z" fill="#EC008C"/>
          <path d="M40.3042 3.86035H36.7754V6.09304H40.3042V3.86035Z" fill="#EC008C"/>
          <path d="M46.6541 3.86035H43.1211V6.09304H46.6541V3.86035Z" fill="#EC008C"/>
        </svg>
        <span className="text-white text-xs font-medium uppercase tracking-widest hidden sm:block">
          Build Your Community
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full border border-white text-white text-xs flex items-center justify-center font-mono">
            {phase}
          </span>
          <span className="text-white text-xs font-medium uppercase tracking-wider hidden sm:block">
            {PHASE_LABELS[phase]}
          </span>
        </div>
        <div className="flex flex-col gap-1 cursor-pointer">
          <span className="w-5 h-px bg-white" />
          <span className="w-5 h-px bg-white" />
        </div>
      </div>
    </nav>
  )
}
