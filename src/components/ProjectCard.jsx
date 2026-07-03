import React from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Badge from './Badge'

export default function ProjectCard({ project }) {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => navigate(`/projects/${project.slug}`)}
    >
      {/* Background */}
      {project.thumbnail === null ? (
        <div style={{ aspectRatio: '4/3', backgroundColor: '#ffffff' }} />
      ) : project.thumbnail ? (
        <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div
          className={`bg-gradient-to-br ${project.gradient}`}
          style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="heading-xl text-8xl font-bold text-white/8 select-none tracking-tighter">
              {project.title.split(' ').map(w => w[0]).join('')}
            </span>
          </div>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.1) 100%)' }}
      />

      {/* Category badges — top left */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
        {project.categories.map((cat) => (
          <Badge key={cat} text={cat} color="white" />
        ))}
      </div>

      {/* Content — bottom overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="heading-lg text-lg text-white mb-2">{project.title}</h3>
        <p className="text-sm text-white/80 mb-4 leading-relaxed line-clamp-2">{project.description}</p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white/60 border border-white/20"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white/60 border border-white/20"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-white/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={13} /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={13} /> Live
          </a>
          <motion.button
            onClick={(e) => { e.stopPropagation(); navigate(`/projects/${project.slug}`) }}
            className="ml-auto flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/10"
            whileHover={{ x: 2 }}
          >
            Details <ArrowRight size={12} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
