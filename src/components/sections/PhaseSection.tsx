import { motion } from 'framer-motion'

interface PhaseSectionProps {
  phase: number
  title: string
  subtitle: string
  description: string
  details: string[]
  isLeft?: boolean
}

export default function PhaseSection({ phase, title, subtitle, description, details, isLeft = true }: PhaseSectionProps) {
  return (
    <section className="relative z-10 min-h-screen flex items-center px-6 md:px-16 py-24">
      <div className={`max-w-2xl w-full ${isLeft ? '' : 'md:ml-auto md:text-right'}`}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          className="text-yellow-400 text-sm font-mono tracking-wider"
        >
          Phase {phase}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-light mt-2 leading-tight"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-300 mt-4"
        >
          {subtitle}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base text-gray-400 mt-6 leading-relaxed"
        >
          {description}
        </motion.p>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-8 space-y-2 ${isLeft ? '' : 'md:flex md:flex-col md:items-end'}`}
        >
          {details.map((d, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
              <span className="text-yellow-400 mt-0.5 shrink-0">&#8594;</span>
              <span>{d}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
