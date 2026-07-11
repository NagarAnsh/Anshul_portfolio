import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', to: '/' },             // React Router route
    { name: 'About', to: '#about' },       // Section scroll
    { name: 'Skills', to: '#skills' },
    { name: 'Projects', to: '#projects' },
    { name: 'Gallery', to: '/gallery' },   // Separate page route
  ]

  const scrollToSection = (to) => {
    const section = document.querySelector(to)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 60,
        behavior: 'smooth',
      })
    }
  }

  // Smooth scroll handler for in-page anchors — works from any route
  const handleNavClick = (to) => {
    if (to.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => scrollToSection(to), 100)
      } else {
        scrollToSection(to)
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 44 44"
              className="h-9 w-9 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="navLogoG" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
              {/* badge */}
              <rect x="2" y="2" width="40" height="40" rx="13" fill="#0b1220" stroke="url(#navLogoG)" strokeWidth="2" />
              {/* charge pips */}
              <rect x="11" y="33" width="6" height="3" rx="1.5" fill="url(#navLogoG)" opacity="0.9" />
              <rect x="19" y="33" width="6" height="3" rx="1.5" fill="url(#navLogoG)" opacity="0.55" />
              <rect x="27" y="33" width="6" height="3" rx="1.5" fill="url(#navLogoG)" opacity="0.25" />
              {/* bolt */}
              <path
                d="M 25.5 7 L 14.5 22.5 L 21 22.5 L 18.5 31.5 L 29.5 16.5 L 23 16.5 Z"
                fill="url(#navLogoG)"
                stroke="#0b1220"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Anshul Nagar
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) =>
                item.to.startsWith('#') ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.to)}
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-cyan-500/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) =>
              item.to.startsWith('#') ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.to)}
                  className="w-full text-left text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar



