import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <NavLink to="/" className="text-2xl font-bold tracking-tight text-white hover:text-blue-500 transition-colors duration-200 flex items-center gap-2">
            <span>📝</span>
            <span className="hidden sm:inline">NotesApp</span>
          </NavLink>

          <nav className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`
              }
            >
              Create Paste
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`
              }
            >
              All Pastes
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
