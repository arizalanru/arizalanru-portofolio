import React from 'react'
import Navbar from '../components/Navbar'

export default function MainLayout({ children, theme, toggleTheme }) {
  return (
    <div className="min-h-screen relative">
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />
      <main>{children}</main>
    </div>
  )
}
