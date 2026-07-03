import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

export default function CertCard({ cert }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <>
      {/* Card */}
      <motion.div
        onClick={() => setOpen(true)}
        className="relative overflow-hidden rounded-2xl cursor-pointer flex-shrink-0"
        style={{ width: 320, height: 226 }}
        whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          {cert.image ? (
            <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${cert.gradient}`} />
          )}
        </div>

        {/* Year pill */}
        <div className="absolute top-3 right-3 z-20">
          <span
            className="text-xs text-white/80 font-medium px-2.5 py-1 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {cert.year}
          </span>
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          }}
        />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-white/70 flex-shrink-0" />
            <span className="font-bold text-white text-sm leading-tight">{cert.name}</span>
          </div>
          <p className="text-white/50 text-xs mt-1 ml-5">{cert.issuer}</p>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal panel */}
            <motion.div
              className="relative z-10 w-full max-w-[700px] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                background: 'rgba(8, 10, 15, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* X button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              {/* Certificate image */}
              <div className="relative w-full aspect-[297/210]">
                {cert.image ? (
                  <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}>
                    <CheckCircle size={48} className="text-white/20" />
                  </div>
                )}
              </div>

              {/* Info rows */}
              <div className="p-6">
                <div className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-3">
                  <span className="text-xs text-white/40 self-center">Issued By</span>
                  <span className="text-sm text-white">{cert.issuer}</span>

                  <span className="text-xs text-white/40 self-center">Year</span>
                  <span className="text-sm text-white">{cert.year}</span>

                  <span className="text-xs text-white/40 self-center">Credential</span>
                  <span className="text-sm text-white">{cert.credential}</span>

                  <span className="text-xs text-white/40 self-start pt-1">Skills</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="tech-chip text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
