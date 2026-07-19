import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative z-10 h-screen flex flex-col items-center justify-center">
      <div className="text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
          className="text-6xl md:text-8xl font-light tracking-tight leading-none"
        >
          <span className="block">We Build</span>
          <span className="block">Communities.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
          className="mt-6 text-lg text-gray-400 max-w-md mx-auto"
        >
          Master-planned living designed for the way you want to live.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <div className="w-[11px] h-4 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-[2px] h-2 bg-white rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll to explore</span>
      </motion.div>
    </section>
  )
}
