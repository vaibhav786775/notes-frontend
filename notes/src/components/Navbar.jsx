import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-linear-to-r from-emerald-600 to-indigo-700 text-white shadow-lg rounded-b-2xl">
      <div className="max-w-full mx-auto px-8 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-3xl font-bold tracking-wide text-white">
          Notes
        </NavLink>

        <nav className="flex items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-6 py-2 rounded-lg text-base font-semibold transition-colors duration-150 ${isActive ? 'bg-white/30 text-white' : 'text-white hover:bg-white/15'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-6 py-2 rounded-lg text-base font-semibold transition-colors duration-150 ${isActive ? 'bg-white/30 text-white' : 'text-white hover:bg-white/15'}`
            }
          >
            Pastes
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar