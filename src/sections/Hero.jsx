import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, MapPin, Download } from 'lucide-react'
import TypeWriter from '../components/TypeWriter'
import arizalPhoto from '../assets/images/arizal-photo-hero.jpeg'

const roles = [
  'AI/ML Engineer',
  'Computer Science Student',
  'AI for Healthcare Specialist',
  'Software Engineer',
  'Backend Developer',
  'Data Scientist',
]

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/arizalanru' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arizal-anru21' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/arizalanru?igsh=cTZnejJpb2ppcmc1' },
  { icon: Mail, label: 'Email', href: 'mailto:aarizalanru@gmail.com' },
]

const ease = [0.25, 0.46, 0.45, 0.94]

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden snap-start px-6">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <motion.div
        className="absolute top-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-blue-slate/15 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-white/4 blur-3xl pointer-events-none"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 lg:gap-16">

          {/* LEFT: text content */}
          <div className="order-2 md:order-1 flex-1 min-w-0">
            <motion.h1
              className="heading-xl text-[clamp(2.6rem,6vw,5.5rem)] text-white leading-[1.05] mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
            >
              Arizal Anru
            </motion.h1>

            <motion.div
              className="mb-5 h-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <TypeWriter
                texts={roles}
                className="text-base md:text-lg text-blue-slate font-medium tracking-wide"
              />
            </motion.div>

            <motion.p
              className="text-white/50 text-[15px] leading-relaxed max-w-[480px] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
            >
              I have been programming for over a year, building innovative software projects
              and exploring the evolving landscape of Artificial Intelligence.
            </motion.p>

            <motion.div
              className="flex items-center gap-2 text-xs text-white/35 mb-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.62, ease }}
            >
              <MapPin size={12} className="text-blue-slate flex-shrink-0" />
              Cikarang, West Java
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-2 mb-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72, ease }}
            >
              {socials.map(({ icon: Icon, label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-white/45 hover:text-white text-xs font-medium transition-all"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.07, ease }}
                >
                  <Icon size={13} />
                  {label}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05, ease }}
            >
              <motion.a
                href="https://drive.google.com/file/d/1za-WFod7-xgHIHHZFtNBAPo57qQyI6zh/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-onyx text-sm font-semibold hover:bg-alabaster transition-colors shadow-lg"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={14} />
                Get My CV
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: profile card (photo shows on mobile too, above text) */}
          <div className="order-1 md:order-2 self-center md:self-auto flex md:flex-[0_0_38%] items-center justify-center">
            <ProfileCard />
          </div>

        </div>
      </div>
    </section>
  )
}

function ProfileCard() {
  return (
    <motion.div
      className="w-[100px] md:w-full"
      initial={{ opacity: 0, x: 50, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="w-full rounded-full overflow-hidden"
        style={{
          aspectRatio: '1 / 1',
          background: 'rgba(8, 10, 15, 0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 0 60px rgba(83,104,120,0.2), 0 20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <img
          src={arizalPhoto}
          alt="Arizal Anru"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </motion.div>
  )
}
