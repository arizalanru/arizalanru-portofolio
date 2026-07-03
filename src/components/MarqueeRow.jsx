import React from 'react'

export default function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="marquee-wrapper py-2">
      <div className={`marquee-track ${reverse ? 'reverse' : 'forward'}`}>
        {items.map((item, i) => (
          <div
            key={i}
            className="glass-card px-5 py-3 flex items-center gap-3 flex-shrink-0 hover:border-white/20 transition-all group"
          >
            <img
              src={item.icon}
              alt={item.name}
              width={20}
              height={20}
              className="w-5 h-5 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
