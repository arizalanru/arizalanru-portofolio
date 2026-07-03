import React from 'react'
import { motion } from 'framer-motion'

export default function SectionLabel({ label, title, subtitle, center = false, light = false }) {
  return (
    <div className={`mb-5 ${center ? 'text-center' : ''}`}>
      <motion.p
        className={`section-label mb-2 ${center ? 'justify-center' : ''}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        — {label}
      </motion.p>
      <motion.h2
        className={`heading-xl text-4xl md:text-5xl ${light ? 'text-onyx' : 'text-white'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`mt-4 text-base max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-onyx/60' : 'text-white/40'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
