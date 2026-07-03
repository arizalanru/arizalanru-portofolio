import React from 'react'
import { HashRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppRoutes from './routes/index.jsx'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        <AppRoutes theme={theme} toggleTheme={toggleTheme} />
      </AnimatePresence>
    </HashRouter>
  )
}
