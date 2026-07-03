import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'

const Home = lazy(() => import('../pages/Home'))
const AllProjects = lazy(() => import('../pages/AllProjects'))
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-blue-slate border-t-transparent animate-spin" />
    </div>
  )
}

export default function AppRoutes({ theme, toggleTheme }) {
  return (
    <MainLayout theme={theme} toggleTheme={toggleTheme}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Routes>
      </Suspense>
    </MainLayout>
  )
}
