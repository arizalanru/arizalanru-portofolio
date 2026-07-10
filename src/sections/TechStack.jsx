import React from 'react'
import { motion } from 'framer-motion'
import { Eye, MessageSquare } from 'lucide-react'
import SectionLabel from '../components/SectionLabel'
import { techStack } from '../data/techstack'

const fallbackIcons = {
  'Computer Vision': Eye,
  'NLP': MessageSquare,
}

const ease = [0.25, 0.46, 0.45, 0.94]
const maxItems = Math.max(...techStack.map((c) => c.items.length))
const COL = techStack.length // 5

export default function TechStack() {
  return (
    <section id="techstack" className="relative min-h-screen lg:h-screen flex flex-col justify-center overflow-x-hidden lg:overflow-hidden snap-start px-6 py-20 lg:py-0">
      <div className="max-w-5xl mx-auto w-full">
        <SectionLabel label="WHAT I USE" title="Tech Stack & Tools" center />

        {/* ── Mobile & tablet: per-category blocks, 2/3 columns ── */}
        <div className="techstack-grid grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 lg:hidden">
          {techStack.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.06, ease }}
            >
              <div className="flex items-center justify-center h-8 border-b border-white/10 mb-2">
                <span className="text-[9px] tracking-widest uppercase text-white/45 text-center leading-tight">
                  {group.category}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <Pill key={item.name} item={item} compact />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Desktop: original row-synced 5-column grid ── */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: `repeat(${COL}, 1fr)`,
            columnGap: 16,
            rowGap: 6,
          }}
        >
          {/* ── Row 0: category titles ── */}
          {techStack.map((group, gi) => (
            <motion.div
              key={group.category}
              className="flex items-center justify-center h-8 border-b border-white/10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.06, ease }}
            >
              <span className="text-[9px] tracking-widest uppercase text-white/45 text-center leading-tight">
                {group.category}
              </span>
            </motion.div>
          ))}

          {/* ── Rows 1…maxItems: one pill per cell ── */}
          {Array.from({ length: maxItems }, (_, rowIndex) =>
            techStack.map((group, colIndex) => {
              const item = group.items[rowIndex]
              const delay = 0.15 + rowIndex * 0.04 + colIndex * 0.03
              return (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  style={{ height: 36 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: item ? 1 : 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay, ease }}
                >
                  {item && <Pill item={item} />}
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

function Pill({ item, compact = false }) {
  const Fallback = fallbackIcons[item.name]

  return (
    <motion.div
      className={
        compact
          ? 'w-full flex items-center justify-center gap-1.5 rounded-full cursor-default select-none px-2 py-1'
          : 'w-full h-full flex items-center justify-center gap-1.5 rounded-full cursor-default select-none'
      }
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
      whileHover={{
        scale: 1.03,
        backgroundColor: 'rgba(255,255,255,0.10)',
        borderColor: 'rgba(255,255,255,0.22)',
        boxShadow: '0 0 12px rgba(83,104,120,0.22)',
      }}
      transition={{ duration: 0.15 }}
    >
      {item.icon ? (
        <img
          src={item.icon}
          alt={item.name}
          width={14}
          height={14}
          className={compact ? 'w-4 h-4 flex-shrink-0' : 'w-3.5 h-3.5 flex-shrink-0'}
          style={{ filter: 'brightness(0) invert(1)', opacity: 0.70 }}
        />
      ) : Fallback ? (
        <Fallback size={compact ? 15 : 13} strokeWidth={1.5} className="text-white/55 flex-shrink-0" />
      ) : null}
      <span className="text-xs text-white/65 whitespace-nowrap font-medium">
        {item.name}
      </span>
    </motion.div>
  )
}
