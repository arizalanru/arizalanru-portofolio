import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

// Apply initial theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark'
document.documentElement.classList.add(savedTheme)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
