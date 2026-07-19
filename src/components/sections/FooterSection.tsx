import { motion } from 'framer-motion'

export default function FooterSection() {
  return (
    <section className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-light"
      >
        Start Building<br />With Us
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-lg text-gray-400 max-w-md"
      >
        See our strategy come together in five simple phases.
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 px-8 py-3 border border-white text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
      >
        Get in Touch
      </motion.button>
    </section>
  )
}
