import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, BrainCircuit, FolderGit2 } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'

const cards = [
  {
    icon: GraduationCap,
    title: 'President University',
    subtitle: 'CS Student — AI Specialization',
  },
  {
    icon: Award,
    title: 'Academic Scholarship',
    subtitle: '75% Tuition Subsidy, Rank 2',
  },
  {
    icon: BrainCircuit,
    title: 'Focus Areas',
    subtitle: 'Artificial Intelligence, Machine Learning, NLP, Computer Vision, Data Science',
  },
  {
    icon: FolderGit2,
    title: '10+',
    subtitle: 'Projects',
  },
]

const ease = [0.25, 0.46, 0.45, 0.94]

export default function About() {
  return (
    <section id="about" className="relative min-h-screen md:h-screen flex items-center overflow-x-hidden md:overflow-hidden snap-start px-6 py-20 md:py-0">
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-8">

        {/* 1. Header */}
        <SectionLabel label="WHO I AM" title="About Me" center />

        {/* 2. Paragraph */}
        <motion.p
          className="text-white/60 text-sm md:text-[15px] leading-relaxed text-left md:text-center px-4 md:px-0"
          style={{ maxWidth: '65ch' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          I'm Arizal, a Computer Science student at{' '}
          <span className="text-white/85">President University</span>{' '}
          specializing in Artificial Intelligence. What draws me to AI is
          the rare combination of mathematics, logic, and creativity — a
          field where algorithms can solve problems that were once impossible
          to tackle manually, from computer vision and NLP to recommendation
          systems and predictive analytics.{' '}
          <br /><br />
          I'm deeply passionate about the rapid pace of innovation in this
          space, and I actively explore Data Science alongside machine
          learning and software engineering. I'm building toward a career
          as a Software Developer, AI/ML Engineer, or Data Scientist.
          I was awarded an{' '}
          <span className="text-white/85">Academic Scholarship with a 75% tuition fee
          subsidy (Rank 2)</span>, which reflects my dedication to excellence
          in both theory and practice.
        </motion.p>

        {/* 3. Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full px-4 md:px-0">
          {cards.map(({ icon: Icon, title, subtitle }, i) => (
            <motion.div
              key={title}
              className="flex flex-col gap-3 p-3 md:px-5 md:py-4 rounded-xl cursor-default overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}
              whileHover={{
                scale: 1.02,
                borderColor: 'rgba(255,255,255,0.20)',
                boxShadow: '0 0 24px rgba(83,104,120,0.18)',
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-slate/15 border border-blue-slate/20 flex items-center justify-center flex-shrink-0">
                <Icon size={16} strokeWidth={1.5} className="text-white/70" />
              </div>
              <div>
                <p className="text-[13px] md:text-sm font-medium text-white leading-tight">{title}</p>
                <p className="text-[11px] md:text-xs text-white/50 mt-0.5 leading-snug">{subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
