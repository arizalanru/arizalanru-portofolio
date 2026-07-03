import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const categories = ['All', 'Artificial Intelligence', 'Web Development', 'Mobile Development', 'Machine Learning', 'Data Science']

export default function AllProjects() {
  const [active, setActive] = useState('All')
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/')
    setTimeout(() => {
      const projectsSection = document.getElementById('projects')
      if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(active))

  return (
    <div className="min-h-screen pt-8 pb-20 px-6" style={{ background: 'linear-gradient(to bottom, #0A0A0A 0%, #536878 50%, #E5E4E2 100%)', backgroundAttachment: 'fixed' }}>
      <div className="max-w-6xl mx-auto">
        {/* Back */}
        <motion.button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 mt-8 mb-2 transition-colors"
          whileHover={{ x: -3 }}
        >
          <ArrowLeft size={14} /> Back
        </motion.button>

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="heading-xl text-5xl md:text-6xl text-white">Projects</h1>
          <p className="text-white/40 mt-1 max-w-lg">
            A showcase of my work, and my personal projects.
          </p>

          {/* Filter tabs */}
          <p className="text-xs tracking-widest uppercase text-white/50 mt-4 mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${active === cat
                  ? 'bg-white text-onyx font-semibold'
                  : 'glass-card text-white/50 hover:text-white'
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid md:grid-cols-2 gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">
            No projects in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}
