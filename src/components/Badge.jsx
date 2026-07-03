import React from 'react'

export default function Badge({ text, color = 'slate' }) {
  const colors = {
    slate: 'bg-blue-slate/20 text-blue-slate border-blue-slate/30',
    white: 'bg-white/10 text-white/80 border-white/20',
    green: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {text}
    </span>
  )
}
