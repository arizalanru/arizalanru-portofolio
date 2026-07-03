import React from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-white text-onyx hover:bg-alabaster font-semibold shadow-lg hover:shadow-xl',
  ghost: 'bg-transparent text-alabaster border border-white/20 hover:border-white/40 hover:bg-white/5',
  outline: 'bg-transparent border border-blue-slate text-blue-slate hover:bg-blue-slate/10',
}

export default function Button({ variant = 'primary', children, className = '', onClick, href, target, rel, type = 'button', disabled }) {
  const baseClasses = `inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-200 cursor-pointer ${variants[variant]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
