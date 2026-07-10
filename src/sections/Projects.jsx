import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, Github, ExternalLink } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import SectionLabel from '../components/SectionLabel'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

import 'swiper/css'

const infiniteProjects = [
  ...projects, ...projects, ...projects, ...projects, ...projects,
] // 60 items (12 × 5)
const INITIAL_SLIDE = 24 // index 24 = Blibli Nexus AI (copy 3, position 0)

// Mobile chunks are built from the same infinite (5×) array as the desktop
// carousel so the horizontal scroller can loop seamlessly too.
const mobileChunkCount = Math.ceil(projects.length / 2)
const chunks = []
for (let i = 0; i < infiniteProjects.length; i += 2) {
  chunks.push(infiniteProjects.slice(i, i + 2))
}

export default function Projects() {
  const swiperRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(INITIAL_SLIDE % projects.length)

  const scrollRef = useRef(null)
  const [activeChunk, setActiveChunk] = useState(0)

  // Jump into the middle copy of the infinite chunk list so the user can
  // swipe either direction immediately, mirroring the desktop Swiper setup.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const middleIndex = Math.floor(chunks.length / 2)
    el.scrollLeft = middleIndex * window.innerWidth
    setActiveChunk(middleIndex % mobileChunkCount)
  }, [])

  const handleMobileScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const slideWidth = window.innerWidth
    const maxScroll = el.scrollWidth - slideWidth
    const middleIndex = Math.floor(chunks.length / 2)

    // Near either edge of the duplicated array — snap back to the middle
    // copy instantly (no smooth animation) so the loop feels seamless.
    if (el.scrollLeft <= slideWidth) {
      el.scrollLeft = middleIndex * slideWidth
      setActiveChunk(middleIndex % mobileChunkCount)
      return
    }
    if (el.scrollLeft >= maxScroll - slideWidth) {
      el.scrollLeft = middleIndex * slideWidth
      setActiveChunk(middleIndex % mobileChunkCount)
      return
    }

    const index = Math.round(el.scrollLeft / slideWidth)
    setActiveChunk(index % mobileChunkCount)
  }

  const scrollToChunk = (i) => {
    const el = scrollRef.current
    if (!el) return
    const slideWidth = window.innerWidth
    const currentIndex = Math.round(el.scrollLeft / slideWidth)
    const currentMod = ((currentIndex % mobileChunkCount) + mobileChunkCount) % mobileChunkCount
    const targetIndex = currentIndex - currentMod + i
    el.scrollTo({ left: targetIndex * slideWidth, behavior: 'smooth' })
  }

  const scrollByChunk = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * window.innerWidth, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="relative w-full min-h-screen md:h-screen flex flex-col justify-center overflow-x-hidden md:overflow-hidden snap-start px-6 pt-12 pb-12 md:pb-0">
      <div className="max-w-6xl mx-auto w-full">

        {/* Header row (desktop/tablet): label+title left, View All right */}
        <div className="hidden md:flex justify-between items-end mb-4">
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

        {/* Header (mobile): centered, View All moved below the carousel */}
        <div className="md:hidden mb-4">
          <SectionLabel label="WHAT I'VE BUILT" title="Projects" center />
        </div>

        {/* ── Desktop & tablet: Swiper carousel ── */}
        <div className="hidden md:block">
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
                      <ProjectCard project={project} fixedHeight />
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

        {/* ── Mobile: 2-up stacked chunks, horizontal snap scroll ── */}
        <div className="md:hidden w-full">
          <div
            ref={scrollRef}
            onScroll={handleMobileScroll}
            className="flex overflow-x-auto scrollbar-hide w-screen"
            style={{
              marginLeft: 'calc(-50vw + 50%)',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {chunks.map((chunk, i) => (
              <div
                key={i}
                className="flex flex-col gap-3 box-border"
                style={{ flex: '0 0 100vw', scrollSnapAlign: 'start', padding: '0 16px' }}
              >
                {chunk.map((project, pi) => (
                  <div key={`${project.slug}-${i}-${pi}`} className="w-full">
                    <MobileProjectCard project={project} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Navigation: ← dots → + View All Projects */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="flex items-center justify-center gap-3">
              <MobileNavBtn onClick={() => scrollByChunk(-1)} label="Previous">
                <ChevronLeft size={14} />
              </MobileNavBtn>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: mobileChunkCount }, (_, i) => (
                  <motion.div
                    key={i}
                    className="rounded-full bg-white cursor-pointer"
                    style={{ height: 6 }}
                    animate={{
                      width: i === activeChunk ? 18 : 6,
                      opacity: i === activeChunk ? 0.88 : 0.28,
                    }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    onClick={() => scrollToChunk(i)}
                  />
                ))}
              </div>

              <MobileNavBtn onClick={() => scrollByChunk(1)} label="Next">
                <ChevronRight size={14} />
              </MobileNavBtn>
            </div>

            <Link to="/projects" className="mt-1">
              <motion.span
                className="inline-flex items-center gap-1.5 text-[13px] rounded-full"
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  color: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.10)',
                  borderColor: 'rgba(255,255,255,0.20)',
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                View All Projects <ArrowUpRight size={13} />
              </motion.span>
            </Link>
          </div>
        </div>

      </div>


    </section>
  )
}

function MobileProjectCard({ project }) {
  const navigate = useNavigate()
  const shortDesc = project.description.length > 60
    ? `${project.description.slice(0, 60)}...`
    : project.description

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ height: 200 }}
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {project.thumbnail === null ? (
          <div className="w-full h-full" style={{ backgroundColor: '#ffffff' }} />
        ) : project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className={`w-full h-full relative bg-gradient-to-br ${project.gradient}`}>
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="heading-xl text-6xl font-bold text-white/10 select-none">
                {project.title.split(' ').map((w) => w[0]).join('')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* Category badges — top left */}
      <div
        className="absolute flex flex-wrap"
        style={{ top: 8, left: 8, zIndex: 2, gap: 4 }}
      >
        {project.categories.map((cat) => (
          <span
            key={cat}
            style={{
              fontSize: '10px',
              padding: '2px 8px',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: '999px',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Content — pinned to the bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col"
        style={{ padding: '10px 12px', gap: 4 }}
      >
        <h3 className="heading-lg text-sm font-bold text-white">{project.title}</h3>
        <p className="text-[11px] text-white/70 leading-relaxed">{shortDesc}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {project.tech.slice(0, 2).map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white/60 border border-white/20"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 2 && (
            <span className="text-xs text-white/50">+{project.tech.length - 2}</span>
          )}
        </div>
        <div className="flex items-center justify-between" style={{ marginTop: 4 }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            {!project.isPrivate && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                style={{ fontSize: 12 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={12} /> GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                style={{ fontSize: 12 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} /> Live
              </a>
            )}
          </div>
          <span
            className="inline-flex items-center gap-1 text-white hover:text-white/80 transition-colors"
            style={{ fontSize: 12 }}
            onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.slug}`) }}
          >
            Details <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </div>
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

function MobileNavBtn({ onClick, label, children }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
      style={{
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.20)',
      }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.20)' }}
      whileTap={{ scale: 0.92 }}
    >
      {children}
    </motion.button>
  )
}
