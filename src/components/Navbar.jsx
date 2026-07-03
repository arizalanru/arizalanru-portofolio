import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const leftLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
]

const rightLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const wrapRef = useRef(null)

  useEffect(() => { setIsOpen(false) }, [location])

  useEffect(() => {
    if (!isOpen) return
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [isOpen])

  const handleNavClick = (href) => {
    setIsOpen(false)
    if (isHome) {
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 350)
    }
  }

  return (
    <div
      className="fixed top-5 left-0 right-0 z-50 flex justify-center"
      style={{ pointerEvents: 'none' }}
    >
      {/*
        wrapRef covers icon + absolute link containers for outside-click detection.
        pointerEvents: auto so clicks register on children.
      */}
      <div
        ref={wrapRef}
        className="relative flex items-center"
        style={{ pointerEvents: 'auto' }}
      >

        {/* Left links — absolutely anchored to the left edge of the icon wrapper */}
        <div
          className="absolute flex items-center"
          style={{ right: '100%', top: '50%', transform: 'translateY(-50%)' }}
        >
          <AnimatePresence>
            {isOpen && leftLinks.map((link, i) => {
              // i=0 Home (farthest), i=1 About, i=2 Projects (closest to icon)
              const xStart   = (leftLinks.length - i) * 72   // Home:216 About:144 Projects:72
              const delayIn  = (leftLinks.length - 1 - i) * 0.05  // Projects:0 About:0.05 Home:0.10
              const delayOut = i * 0.05                       // Home:0 About:0.05 Projects:0.10
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: xStart }}
                  animate={{ opacity: 1, x: 0, transition: { ease: 'easeOut', duration: 0.4, delay: delayIn } }}
                  exit={{ opacity: 0, x: xStart, transition: { ease: 'easeIn', duration: 0.3, delay: delayOut } }}
                >
                  <NavLink link={link} isHome={isHome} onClick={handleNavClick} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Center icon — always visible, always ≡, never transforms */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          className="flex flex-col items-center justify-center gap-[5px] p-3"
          style={{ filter: 'drop-shadow(0 0 6px rgba(210,222,230,0.30))' }}
        >
          <span className="block rounded-full bg-white" style={{ width: 22, height: 1.5 }} />
          <span className="block rounded-full bg-white" style={{ width: 22, height: 1.5 }} />
          <span className="block rounded-full bg-white" style={{ width: 22, height: 1.5 }} />
        </button>

        {/* Right links — absolutely anchored to the right edge of the icon wrapper */}
        <div
          className="absolute flex items-center"
          style={{ left: '100%', top: '50%', transform: 'translateY(-50%)' }}
        >
          <AnimatePresence>
            {isOpen && rightLinks.map((link, i) => {
              // i=0 Experience (closest), i=1 Certifications, i=2 Contact (farthest)
              const xStart   = -(i + 1) * 72                      // Exp:-72 Cert:-144 Contact:-216
              const delayIn  = i * 0.05                            // Exp:0 Cert:0.05 Contact:0.10
              const delayOut = (rightLinks.length - 1 - i) * 0.05  // Contact:0 Cert:0.05 Exp:0.10
              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: xStart }}
                  animate={{ opacity: 1, x: 0, transition: { ease: 'easeOut', duration: 0.4, delay: delayIn } }}
                  exit={{ opacity: 0, x: xStart, transition: { ease: 'easeIn', duration: 0.3, delay: delayOut } }}
                >
                  <NavLink link={link} isHome={isHome} onClick={handleNavClick} />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

function NavLink({ link, isHome, onClick }) {
  const cls =
    'px-3 py-2 text-sm font-medium text-white tracking-wide whitespace-nowrap hover:opacity-60 transition-opacity duration-150 block'

  return isHome ? (
    <button onClick={() => onClick(link.href)} className={cls}>
      {link.label}
    </button>
  ) : (
    <Link to="/" onClick={() => onClick(link.href)} className={cls}>
      {link.label}
    </Link>
  )
}
