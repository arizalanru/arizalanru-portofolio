import React from 'react'
import { useTyping } from '../hooks/useTyping'

export default function TypeWriter({ texts, className = '' }) {
  const displayText = useTyping(texts)

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-blue-slate">|</span>
    </span>
  )
}
