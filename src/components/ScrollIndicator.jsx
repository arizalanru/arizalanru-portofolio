import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTION_COUNT = 7

export default function ScrollIndicator({ containerRef }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      const index = Math.round(el.scrollTop / el.clientHeight)
      setActive(Math.max(0, Math.min(SECTION_COUNT - 1, index)))
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [containerRef])

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-[7px] pointer-events-none">
      {Array.from({ length: SECTION_COUNT }, (_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={{
            width: i === active ? 18 : 6,
            opacity: i === active ? 0.85 : 0.28,
          }}
          style={{ height: 6, backgroundColor: 'white' }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}
