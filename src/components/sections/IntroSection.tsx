import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          className="text-3xl md:text-5xl font-light mb-16"
        >
          Explore Our<br />Build Process
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.6 }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            From vision to reality — we craft communities that blend thoughtful design with
            modern living. Every phase is intentional, every detail considered.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 leading-relaxed"
          >
            From land acquisition to final handover, our integrated approach delivers
            exceptional living spaces with speed, quality, and care.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
