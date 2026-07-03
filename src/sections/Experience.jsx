import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, GraduationCap, Briefcase } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import ScrollReveal from '../components/ScrollReveal'
import { experiences } from '../data/experience'
import puLogo from '../assets/images/President_University_Logo.png'
import bemLogo from '../assets/images/Logo-PUFA-Compsci.PNG'
import novotechLogo from '../assets/images/Novotech.jpeg'

export default function Experience() {
  const [openId, setOpenId] = useState(experiences[experiences.length - 1].id)

  return (
    <section id="experience" className="relative h-screen flex items-center overflow-hidden snap-start px-6">
      <div className="max-w-4xl mx-auto w-full">
        <SectionLabel label="MY JOURNEY" title="Experience" center />

        <div className="relative">
          <div className="space-y-3">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.id} delay={i * 0.08} direction="left">
                <ExperienceItem
                  exp={exp}
                  isOpen={openId === exp.id}
                  onToggle={() => setOpenId(openId === exp.id ? null : exp.id)}
                  isFirst={i === 0}
                  isLast={i === experiences.length - 1}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({ exp, isOpen, onToggle, isFirst, isLast }) {
  const Icon = exp.type === 'education' ? GraduationCap : Briefcase
  const logoSrc = exp.type === 'education' ? puLogo : exp.type === 'work' ? novotechLogo : bemLogo

  return (
    <div className="relative pl-14">
      {!isFirst && (
        <div className="absolute left-5 -translate-x-1/2 w-0.5 bg-white/20 -top-1.5 bottom-1/2" />
      )}
      {!isLast && (
        <div className="absolute left-5 -translate-x-1/2 w-0.5 bg-white/20 top-1/2 -bottom-1.5" />
      )}
      <div className="absolute left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 flex items-center justify-center">
        <Icon size={20} strokeWidth={1.5} className="text-white/70" />
      </div>

      <motion.div
        className={`glass-card overflow-hidden transition-all duration-300 ${isOpen ? 'border-white/15' : ''}`}
        layout
      >
        <button
          className="w-full p-4 flex items-center gap-4 text-left"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl border border-white/15 p-1 overflow-hidden flex items-center justify-center ${exp.type === 'organization' ? 'bg-neutral-900' : 'bg-white'}`}>
            <img src={logoSrc} alt={exp.institution} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{exp.institution}</p>
            <p className="text-xs text-white/50 mt-0.5 truncate">{exp.role}</p>
            <span className="text-xs text-blue-slate font-medium">{exp.period}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-white/30"
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="px-4 pb-4 border-t border-white/5 pt-3">
                <ul className="space-y-1.5">
                  {exp.details.map((detail, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-[13px] text-white/55"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-slate/60 flex-shrink-0" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
