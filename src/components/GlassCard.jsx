import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', onClick, hoverable = true }) {
  return (
    <motion.div
      className={`glass-card ${hoverable ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={hoverable ? { y: -4, scale: 1.005 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
