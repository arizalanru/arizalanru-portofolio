import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNavClick = (href) => {
    if (isHome) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="heading-lg text-xl text-white">
            AA<span className="text-blue-slate">.</span>
          </Link>

          {/* Nav */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) =>
              isHome ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-1.5 text-xs text-white/30 hover:text-white/70 transition-colors rounded-full hover:bg-white/5"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  to="/"
                  className="px-3 py-1.5 text-xs text-white/30 hover:text-white/70 transition-colors rounded-full hover:bg-white/5"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/25">
              Designed &amp; Built by Arizal Anru · 2025
            </p>
            <motion.button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-white transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
