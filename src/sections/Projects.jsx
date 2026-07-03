import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

import 'swiper/css'

const infiniteProjects = [
  ...projects, ...projects, ...projects, ...projects, ...projects,
] // 60 items (12 × 5)
const INITIAL_SLIDE = 24 // index 24 = Blibli Nexus AI (copy 3, position 0)

export default function Projects() {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(INITIAL_SLIDE % projects.length)

  return (
    <section id="projects" className="relative h-screen flex flex-col justify-center overflow-hidden snap-start px-6 pt-12">
      <div className="max-w-6xl mx-auto w-full">

        {/* Header row: label+title left, View All right */}
        <div className="flex justify-between items-end mb-4">
          <SectionLabel label="WHAT I'VE BUILT" title="Projects" />
          <Link to="/projects" className="mb-5">
            <motion.span
              className="inline-flex items-center gap-1.5 text-xs text-white/60 px-4 py-2 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(255,255,255,0.10)',
                borderColor: 'rgba(255,255,255,0.20)',
                boxShadow: '0 0 16px rgba(255,255,255,0.06)',
              }}
              transition={{ duration: 0.2 }}
            >
              View All Projects <ArrowUpRight size={12} />
            </motion.span>
          </Link>
        </div>

        {/* Carousel */}
        <div className="px-16">
          <Swiper
            modules={[A11y]}
            onSwiper={(s) => {
              swiperRef.current = s
              s.on('reachBeginning', () => s.slideTo(infiniteProjects.length - 4, 0))
              s.on('reachEnd', () => s.slideTo(3, 0))
            }}
            onSlideChange={(s) => setActiveIndex(s.activeIndex % projects.length)}
            centeredSlides
            grabCursor
            initialSlide={INITIAL_SLIDE}
            spaceBetween={4}
            slidesPerView={1.5}
            className="!overflow-visible"
          >
            {infiniteProjects.map((project, i) => (
              <SwiperSlide key={i} className="h-auto">
                {({ isActive }) => (
                  <div
                    style={{
                      maxWidth: 600,
                      margin: '0 auto',
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'scale(1)' : 'scale(0.95)',
                      transition: 'opacity 0.4s ease, transform 0.4s ease',
                      pointerEvents: isActive ? 'auto' : 'none',
                      boxShadow: isActive ? '0 0 30px rgba(255,255,255,0.05)' : 'none',
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation: ← dots → */}
        <div className="flex items-center justify-center gap-4 mt-3 mb-4">
          <NavBtn onClick={() => swiperRef.current?.slidePrev()} label="Previous">
            <ChevronLeft size={15} />
          </NavBtn>

          <div className="flex items-center gap-1.5">
            {projects.map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full bg-white cursor-pointer"
                style={{ height: 6 }}
                animate={{
                  width: i === activeIndex ? 18 : 6,
                  opacity: i === activeIndex ? 0.88 : 0.28,
                }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                onClick={() => swiperRef.current?.slideTo(projects.length * 2 + i)}
              />
            ))}
          </div>

          <NavBtn onClick={() => swiperRef.current?.slideNext()} label="Next">
            <ChevronRight size={15} />
          </NavBtn>
        </div>

      </div>


    </section>
  )
}

function NavBtn({ onClick, label, children }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      className="w-8 h-8 rounded-full flex items-center justify-center text-white/55 hover:text-white transition-colors"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
      whileHover={{ scale: 1.08, boxShadow: '0 0 12px rgba(255,255,255,0.08)' }}
      whileTap={{ scale: 0.92 }}
    >
      {children}
    </motion.button>
  )
}
