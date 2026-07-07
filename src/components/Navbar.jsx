import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Zap, Battery } from 'lucide-react'

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
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Battery className="h-8 w-8 text-cyan-400" />
              <div className="absolute inset-0 h-8 w-8 text-cyan-400 animate-pulse">
                <Zap className="h-4 w-4 absolute top-1 left-1" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
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



