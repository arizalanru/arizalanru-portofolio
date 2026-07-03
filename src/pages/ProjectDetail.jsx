import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Check } from 'lucide-react'
import { getProjectBySlug } from '../data/projects'
import Badge from '../components/Badge'
import ScrollReveal from '../components/ScrollReveal'

function SectionImg({ image, caption }) {
  return (
    <div className="mt-4">
      <img src={image} alt={caption} className="rounded-xl" style={{ width: '100%', height: 'auto' }} />
      <p className="text-sm text-white/50 text-center mt-2">{caption}</p>
    </div>
  )
}

function FreshScanSections({ project: p }) {
  const divider = <div className="mt-12 h-px bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
  return (
    <div className="space-y-20">

      {/* 00 — Overview */}
      <ScrollReveal delay={0.05}>
        <div className="relative">
          <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">00</span>
          <p className="section-label mb-3">00 — Overview</p>
          <h2 className="heading-lg text-2xl text-white mb-6">Overview</h2>
          <p className="text-white/55 leading-relaxed text-[15px]">{p.overview}</p>
          {divider}
        </div>
      </ScrollReveal>

      {/* 01 — Introduction */}
      <ScrollReveal delay={0.05}>
        <div className="relative">
          <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">01</span>
          <p className="section-label mb-3">01 — Introduction</p>
          <h2 className="heading-lg text-2xl text-white mb-6">Introduction</h2>
          <p className="text-white/55 leading-relaxed text-[15px]">{p.problem}</p>
          {divider}
        </div>
      </ScrollReveal>

      {/* 02 — Tools & Technologies */}
      <ScrollReveal delay={0.05}>
        <div className="relative">
          <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">02</span>
          <p className="section-label mb-3">02 — Tools & Technologies</p>
          <h2 className="heading-lg text-2xl text-white mb-6">Tools & Technologies</h2>
          <p className="text-white/55 leading-relaxed text-[15px] mb-5">{p.architecture}</p>
          <div className="flex flex-wrap gap-2">
            {p.architectureTags.map((tag, i) => (
              <motion.span
                key={i}
                className="text-xs text-white/60 px-3 py-1 rounded-full border border-white/10 bg-white/5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          {divider}
        </div>
      </ScrollReveal>

      {/* 03 — Dataset */}
      {p.datasetSection && (
        <ScrollReveal delay={0.05}>
          <div className="relative">
            <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">03</span>
            <p className="section-label mb-3">03 — Dataset</p>
            <h2 className="heading-lg text-2xl text-white mb-6">Dataset</h2>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {p.datasetSection.classes.map((cls, i) => (
                <div key={i} className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-white/70 font-medium mb-2">{cls.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cls.items.map((item) => (
                      <span key={item} className="text-xs text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mb-2">
              {p.datasetSection.splits.map((s, i) => (
                <div key={i} className="flex-1 glass-card p-3 rounded-xl text-center">
                  <p className="text-lg text-white font-semibold">{s.value}</p>
                  <p className="text-xs text-white/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            {p.datasetSection.figures.map((fig, i) => <SectionImg key={i} {...fig} />)}
            {divider}
          </div>
        </ScrollReveal>
      )}

      {/* 04 — System Workflow & Training */}
      {p.trainingFigure && (
        <ScrollReveal delay={0.05}>
          <div className="relative">
            <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">04</span>
            <p className="section-label mb-3">04 — System Workflow & Training</p>
            <h2 className="heading-lg text-2xl text-white mb-6">System Workflow & Training</h2>
            <SectionImg {...p.trainingFigure} />
            {divider}
          </div>
        </ScrollReveal>
      )}

      {/* 05 — Model Evaluation */}
      {p.evaluationFigures && (
        <ScrollReveal delay={0.05}>
          <div className="relative">
            <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">05</span>
            <p className="section-label mb-3">05 — Model Evaluation</p>
            <h2 className="heading-lg text-2xl text-white mb-6">Model Evaluation</h2>
            {p.evaluationFigures.map((fig, i) => <SectionImg key={i} {...fig} />)}
            {divider}
          </div>
        </ScrollReveal>
      )}

      {/* 06 — Model Comparison & Selection */}
      {p.modelComparison && (
        <ScrollReveal delay={0.05}>
          <div className="relative">
            <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">06</span>
            <p className="section-label mb-3">06 — Model Comparison & Selection</p>
            <h2 className="heading-lg text-2xl text-white mb-6">Model Comparison & Selection</h2>
            <div className="overflow-x-auto mb-2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-white/40 font-medium">Model</th>
                    <th className="text-right py-2 px-4 text-white/40 font-medium">Train Acc</th>
                    <th className="text-right py-2 px-4 text-white/40 font-medium">Val Acc</th>
                    <th className="text-right py-2 px-4 text-white/40 font-medium">Test Acc</th>
                  </tr>
                </thead>
                <tbody>
                  {p.modelComparison.map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 ${row.best ? 'text-white' : 'text-white/55'}`}>
                      <td className="py-2 pr-4 font-medium">
                        {row.name}{row.best && <span className="text-xs text-emerald-400 ml-2">★ Best</span>}
                      </td>
                      <td className="text-right py-2 px-4">{row.trainAcc}</td>
                      <td className="text-right py-2 px-4">{row.valAcc}</td>
                      <td className="text-right py-2 px-4">{row.testAcc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {p.comparisonFigure && <SectionImg {...p.comparisonFigure} />}
            {divider}
          </div>
        </ScrollReveal>
      )}

      {/* 07 — Web Application */}
      {p.webAppFigures && (
        <ScrollReveal delay={0.05}>
          <div className="relative">
            <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">07</span>
            <p className="section-label mb-3">07 — Web Application</p>
            <h2 className="heading-lg text-2xl text-white mb-6">Web Application</h2>
            {p.solutionCards && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {p.solutionCards.map((card, i) => (
                  <motion.div
                    key={i}
                    className="glass-card p-4 rounded-xl"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <p className="text-sm text-white/80 font-medium mb-1">{card.title}</p>
                    <p className="text-xs text-white/50 leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}
            {p.webAppFigures.map((fig, i) => <SectionImg key={i} {...fig} />)}
            {divider}
          </div>
        </ScrollReveal>
      )}

      {/* 08 — Limitations */}
      {p.limitations && (
        <ScrollReveal delay={0.05}>
          <div className="relative">
            <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">08</span>
            <p className="section-label mb-3">08 — Limitations</p>
            <h2 className="heading-lg text-2xl text-white mb-6">Limitations</h2>
            <div className="space-y-4">
              {p.limitations.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/40 font-mono mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">{item.title}</p>
                    <p className="text-white/50 text-[14px] leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

    </div>
  )
}

function renderKeyImplementations(items) {
  if (!items || items.length === 0) return null
  const isObjects = typeof items[0] === 'object'

  if (isObjects) {
    return (
      <div className="space-y-5">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex items-start gap-4"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/40 font-mono mt-0.5">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">{item.title}</p>
              <p className="text-white/50 text-[14px] leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <motion.li
          key={idx}
          className="flex items-start gap-3 text-white/60 text-[15px]"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.08 }}
        >
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-slate/20 border border-blue-slate/30 flex items-center justify-center mt-0.5">
            <Check size={10} className="text-blue-slate" />
          </span>
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

function renderRoadmap(items) {
  if (!items || items.length === 0) return null
  const isObjects = typeof items[0] === 'object'

  return (
    <div className="relative pl-8">
      <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-slate/40 to-transparent" />
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="relative mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-blue-slate/50 border border-blue-slate/30" />
          <div className="glass-card px-4 py-3">
            {isObjects ? (
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs text-blue-slate font-mono">v{i + 2}.0</span>
                  <p className="text-sm text-white/80 font-medium">{item.title}</p>
                </div>
                <p className="text-xs text-white/50 ml-12 leading-relaxed">{item.desc}</p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-blue-slate font-mono">v{i + 2}.0</span>
                <p className="text-sm text-white/70">{item}</p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-white/30 mb-4">Project not found</p>
          <Link to="/projects" className="text-sm text-white/60 hover:text-white underline">
            Back to projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6" style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, #536878 50%, #E5E4E2 100%)', backgroundAttachment: 'fixed' }}>
      <div className="max-w-4xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/projects">
            <motion.div
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
              whileHover={{ x: -3 }}
            >
              <ArrowLeft size={14} /> All Projects
            </motion.div>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white/40 hover:text-white/80 px-3 py-2 rounded-full glass-card transition-all"
            >
              <Github size={13} /> GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-white px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
            >
              <ExternalLink size={13} /> Visit Project
            </a>
          </div>
        </div>

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {project.categories.map((cat) => (
              <Badge key={cat} text={cat} color="slate" />
            ))}
          </div>
          <h1 className="heading-xl text-6xl md:text-7xl text-white mb-2 leading-none">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-lg text-white/35 mb-4">{project.subtitle}</p>
          )}
          <p className="text-xl text-white/50 leading-relaxed max-w-2xl mb-8">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </div>
        </motion.div>

        {/* Hero visual */}
        <ScrollReveal>
          <div className={`relative rounded-2xl mb-20 overflow-hidden ${!project.thumbnail ? `bg-gradient-to-br ${project.gradient}` : ''}`}>
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="heading-xl text-9xl font-bold text-white/5 select-none">
                    {project.title.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
              </>
            )}
          </div>
        </ScrollReveal>

        {/* FreshScan AI — custom sections */}
        {project.slug === 'freshscan-ai' && <FreshScanSections project={project} />}

        {/* Generic sections 00–03 */}
        {project.slug !== 'freshscan-ai' && <div className="space-y-20">

          {/* 00 — Overview */}
          {project.overview && (
            <ScrollReveal delay={0.05}>
              <div className="relative">
                <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">00</span>
                <p className="section-label mb-3">00 — Overview</p>
                <h2 className="heading-lg text-2xl text-white mb-6">Overview</h2>
                <p className="text-white/55 leading-relaxed text-[15px]">{project.overview}</p>
                <div className="mt-12 h-px bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
              </div>
            </ScrollReveal>
          )}

          {/* 01 — The Problem */}
          {project.problem && (
            <ScrollReveal delay={0.05}>
              <div className="relative">
                <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">01</span>
                <p className="section-label mb-3">01 — The Problem</p>
                <h2 className="heading-lg text-2xl text-white mb-6">The Problem</h2>
                <p className="text-white/55 leading-relaxed text-[15px]">{project.problem}</p>
                <div className="mt-12 h-px bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
              </div>
            </ScrollReveal>
          )}

          {/* 02 — Solution + solutionCards */}
          {project.solution && (
            <ScrollReveal delay={0.05}>
              <div className="relative">
                <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">02</span>
                <p className="section-label mb-3">02 — Solution Approach</p>
                <h2 className="heading-lg text-2xl text-white mb-6">Solution Approach</h2>
                <p className="text-white/55 leading-relaxed text-[15px]">{project.solution}</p>
                {project.solutionCards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    {project.solutionCards.map((card, i) => (
                      <motion.div
                        key={i}
                        className="glass-card p-4 rounded-xl"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <p className="text-sm text-white/80 font-medium mb-1">{card.title}</p>
                        <p className="text-xs text-white/50 leading-relaxed">{card.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
                {project.interfacePreviews?.[0] && project.slug !== 'fintrack' && (
                  <div className="mt-6">
                    <img
                      src={project.interfacePreviews[0].image}
                      alt={project.interfacePreviews[0].title}
                      className="rounded-xl"
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <p className="text-xs text-white/40 mt-2 text-center">{project.interfacePreviews[0].caption}</p>
                  </div>
                )}
                <div className="mt-12 h-px bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
              </div>
            </ScrollReveal>
          )}

          {/* 03 — Architecture + architectureTags */}
          {project.architecture && (
            <ScrollReveal delay={0.05}>
              <div className="relative">
                <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">03</span>
                <p className="section-label mb-3">03 — Technical Architecture</p>
                <h2 className="heading-lg text-2xl text-white mb-6">Technical Architecture</h2>
                <p className="text-white/55 leading-relaxed text-[15px]">{project.architecture}</p>
                {project.architectureTags && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {project.architectureTags.map((tag, i) => (
                      <motion.span
                        key={i}
                        className="text-xs text-white/60 px-3 py-1 rounded-full border border-white/10 bg-white/5"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                )}
                {project.interfacePreviews?.[1] && project.slug !== 'fintrack' && (
                  <div className="mt-6">
                    <img
                      src={project.interfacePreviews[1].image}
                      alt={project.interfacePreviews[1].title}
                      className="rounded-xl"
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <p className="text-xs text-white/40 mt-2 text-center">{project.interfacePreviews[1].caption}</p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          )}

          {/* 04 — Interface Preview (FinTrack only) */}
          {project.slug === 'fintrack' && project.interfacePreviews && (
            <ScrollReveal delay={0.05}>
              <div className="relative">
                <span className="heading-xl absolute -top-8 -left-2 text-8xl font-bold text-white/[0.03] select-none pointer-events-none">04</span>
                <p className="section-label mb-3">04 — Interface Preview</p>
                <h2 className="heading-lg text-2xl text-white mb-6">Interface Preview</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {project.interfacePreviews.map((preview, i) => (
                    <div key={i}>
                      <img
                        src={preview.image}
                        alt={preview.caption}
                        style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
                      />
                      <p className="text-sm text-white/50 text-center mt-2">{preview.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>}

        {/* 05 + 06 — Generic only */}
        {project.slug !== 'freshscan-ai' && project.keyImplementations && (
          <ScrollReveal>
            <div className="mt-20">
              <p className="section-label mb-3">05 — Key Technical Implementations</p>
              <h2 className="heading-lg text-2xl text-white mb-6">Key Technical Implementations</h2>
              {renderKeyImplementations(project.keyImplementations)}
              {project.slug !== 'fintrack' && (project.interfacePreviews?.[2] || project.interfacePreviews?.[3]) && (
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {project.interfacePreviews[2] && (
                    <div>
                      <img
                        src={project.interfacePreviews[2].image}
                        alt={project.interfacePreviews[2].title}
                        className="rounded-xl"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p className="text-xs text-white/40 mt-2 text-center">{project.interfacePreviews[2].caption}</p>
                    </div>
                  )}
                  {project.interfacePreviews[3] && (
                    <div>
                      <img
                        src={project.interfacePreviews[3].image}
                        alt={project.interfacePreviews[3].title}
                        className="rounded-xl"
                        style={{ width: '100%', height: 'auto' }}
                      />
                      <p className="text-xs text-white/40 mt-2 text-center">{project.interfacePreviews[3].caption}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* 06 — Roadmap */}
        {project.slug !== 'freshscan-ai' && project.roadmap && (
          <ScrollReveal>
            <div className="mt-20">
              <p className="section-label mb-3">06 — Future Roadmap</p>
              <h2 className="heading-lg text-2xl text-white mb-8">Future Roadmap</h2>
              {renderRoadmap(project.roadmap)}
              {project.interfacePreviews?.[4] && (
                <div className="mt-6">
                  <img
                    src={project.interfacePreviews[4].image}
                    alt={project.interfacePreviews[4].title}
                    className="rounded-xl"
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="text-xs text-white/40 mt-2 text-center">{project.interfacePreviews[4].caption}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* 07 — Conclusion */}
        <ScrollReveal>
          <div className="mt-20 glass-card p-8 rounded-2xl text-center">
            <p className="section-label mb-4 justify-center flex">{project.slug === 'freshscan-ai' ? '09' : '07'} — Conclusion</p>
            <h2 className="heading-lg text-2xl text-white mb-4">Conclusion</h2>
            <p className="text-white/50 leading-relaxed max-w-xl mx-auto">
              {project.conclusion || `${project.title} represents my commitment to building practical, impactful solutions at the intersection of AI and software engineering. Every design decision was made with real-world usability and scalability in mind.`}
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/60 hover:text-white glass-card px-4 py-2 rounded-full transition-all">
                <Github size={14} /> View Source
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all">
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
