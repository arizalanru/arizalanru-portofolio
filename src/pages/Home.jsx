import React, { useRef, useEffect } from 'react'
import Hero from '../sections/Hero'
import About from '../sections/About'
import TechStack from '../sections/TechStack'
import Projects from '../sections/Projects'
import Experience from '../sections/Experience'
import Certifications from '../sections/Certifications'
import Contact from '../sections/Contact'
import ScrollIndicator from '../components/ScrollIndicator'

export default function Home() {
  const containerRef = useRef(null)

  // Lock body scroll — snap container owns all scrolling on this page
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
    >
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <ScrollIndicator containerRef={containerRef} />
    </div>
  )
}
