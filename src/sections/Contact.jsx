import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Instagram, Mail, MapPin, Send, ChevronUp } from 'lucide-react'
import emailjs from '@emailjs/browser'
import SectionLabel from '../components/SectionLabel'
import ScrollReveal from '../components/ScrollReveal'

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/arizalanru' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arizal-anru21' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/arizalanru?igsh=cTZnejJpb2ppcmc1' },
  { icon: Mail, label: 'Email', href: 'mailto:aarizalanru@gmail.com' },
]


export default function Contact() {
  const formRef = useRef()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true
    if (!form.message.trim()) e.message = true
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    setSending(true)
    setError(false)
    try {
      await emailjs.sendForm(
        'service_e65ompc',
        'template_qmhrsmn',
        formRef.current,
        'vY0Ekt9UCdej3uHiq'
      )
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: false }))
  }

  return (
    <section id="contact" className="relative h-screen flex items-center overflow-hidden snap-start px-6">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(83,104,120,0.08) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <SectionLabel label="LET'S COLLABORATE" title="Get In Touch" center />

        <div className="grid lg:grid-cols-2 gap-10 mt-2 items-stretch">

          {/* Left */}
          <ScrollReveal>
            <div className="flex flex-col gap-4">

              {/* Solar system */}
              <div className="flex justify-center">
                <div style={{ position: 'relative', width: 220, height: 220 }}>

                  {/* Center — Mail */}
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 0 30px rgba(83,104,120,0.25)',
                      }}
                    >
                      <Mail size={18} className="text-white/70" />
                    </div>
                  </div>

                  {/* Inner orbit — LinkedIn + Instagram (clockwise 8s) */}
                  <div
                    className="orbit-inner"
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: 120, height: 120,
                      border: '1px solid rgba(255,255,255,0.10)',
                      borderRadius: '50%',
                    }}
                  >
                    <div className="planet" style={{ position: 'absolute', top: -16, left: '50%' }}>
                      <div className="relative group">
                        <a href="https://www.linkedin.com/in/arizal-anru21" target="_blank" rel="noopener noreferrer">
                          <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
                            whileHover={{ scale: 1.2, boxShadow: '0 0 14px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.3)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <Linkedin size={13} className="text-white/60" />
                          </motion.div>
                        </a>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">LinkedIn</span>
                      </div>
                    </div>
                    <div className="planet" style={{ position: 'absolute', bottom: -16, left: '50%' }}>
                      <div className="relative group">
                        <a href="https://www.instagram.com/arizalanru?igsh=cTZnejJpb2ppcmc1" target="_blank" rel="noopener noreferrer">
                          <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
                            whileHover={{ scale: 1.2, boxShadow: '0 0 14px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.3)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <Instagram size={13} className="text-white/60" />
                          </motion.div>
                        </a>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Instagram</span>
                      </div>
                    </div>
                  </div>

                  {/* Outer orbit — GitHub + MapPin (counter-clockwise 14s) */}
                  <div
                    className="orbit-outer"
                    style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: 220, height: 220,
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '50%',
                    }}
                  >
                    <div className="planet" style={{ position: 'absolute', top: -16, left: '50%' }}>
                      <div className="relative group">
                        <a href="https://github.com/arizalanru" target="_blank" rel="noopener noreferrer">
                          <motion.div
                            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
                            whileHover={{ scale: 1.2, boxShadow: '0 0 14px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.3)' }}
                            transition={{ duration: 0.2 }}
                          >
                            <Github size={13} className="text-white/60" />
                          </motion.div>
                        </a>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">GitHub</span>
                      </div>
                    </div>
                    <div className="planet" style={{ position: 'absolute', bottom: -16, left: '50%' }}>
                      <div className="relative group">
                        <motion.div
                          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
                          whileHover={{ scale: 1.2, boxShadow: '0 0 14px rgba(255,255,255,0.2), 0 0 0 1px rgba(255,255,255,0.3)' }}
                          transition={{ duration: 0.2 }}
                        >
                          <MapPin size={13} className="text-white/60" />
                        </motion.div>
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white/70 bg-black/60 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Cikarang</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Location card */}
              <div className="glass-card px-3 py-2 rounded-xl flex items-center gap-3">
                <MapPin size={14} className="text-blue-slate flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-sm text-white/70">Cikarang, West Java, Indonesia</p>
                </div>
              </div>

              {/* Social buttons 2×2 */}
              <div className="flex flex-row gap-2">
                {socials.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 px-2 py-1.5 rounded-xl"
                    style={{ border: '1px solid rgba(255,255,255,0.10)' }}
                    animate={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.5)' }}
                    whileHover={{
                      background: 'rgba(255,255,255,0.08)',
                      color: 'rgba(255,255,255,1)',
                      boxShadow: '0 0 16px rgba(255,255,255,0.06)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={13} />
                    <span className="text-xs font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>

            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal delay={0.2} className="h-full">
            <div className="glass-card p-4 rounded-2xl h-full flex flex-col">
              {sent ? (
                <motion.div
                  className="h-52 flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                    <Send size={18} className="text-emerald-400" />
                  </div>
                  <h3 className="heading-lg text-base text-white mb-1">Message Sent!</h3>
                  <p className="text-sm text-white/40">I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col flex-1 gap-2">
                  <p className="font-mono text-sm text-white/70 mb-1">// send a message</p>

                  <div className="grid sm:grid-cols-2 gap-2">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Your Name *"
                        className={`form-input h-9 !py-1.5 text-sm ${errors.name ? 'error' : ''}`}
                        aria-required="true"
                      />
                      {errors.name && <p className="text-xs text-red-400 mt-0.5">Required</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="Your Email *"
                        className={`form-input h-9 !py-1.5 text-sm ${errors.email ? 'error' : ''}`}
                        aria-required="true"
                      />
                      {errors.email && <p className="text-xs text-red-400 mt-0.5">Valid email required</p>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Subject (optional)"
                    className="form-input h-9 !py-1.5 text-sm"
                  />

                  <div className="flex-1 flex flex-col">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Your message... *"
                      className={`form-input resize-none flex-1 ${errors.message ? 'error' : ''}`}
                      aria-required="true"
                    />
                    {errors.message && <p className="text-xs text-red-400 mt-0.5">Required</p>}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="w-full h-10 flex items-center justify-center gap-2 rounded-xl bg-white text-[#0A0A0A] font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={sending ? {} : { scale: 1.01, opacity: 0.9 }}
                    whileTap={sending ? {} : { scale: 0.99 }}
                  >
                    <Send size={13} />
                    {sending ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  {error && (
                    <p className="text-xs text-red-400 text-center mt-1">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Back to top */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.button
          onClick={() => {
            const el = document.querySelector('.snap-y')
            if (el) el.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/60"
          style={{
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.20)',
          }}
          whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.20)', borderColor: 'rgba(255,255,255,0.30)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ChevronUp size={16} />
        </motion.button>
      </div>
    </section>
  )
}
