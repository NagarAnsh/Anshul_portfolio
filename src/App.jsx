import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import InteractiveCard from './components/InactiveCard'
import MouseFollower from './components/MouseFollower'
import Contact from './components/Contact'
import Gallery from './components/Gallery'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white">
        {/* Global cursor animation */}
        <MouseFollower />

        {/* Always visible Navbar */}
        <Navbar />

        <Routes>
          {/* ---------------- MAIN PAGE ---------------- */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Skills />

                {/* Projects Section */}
                <section
                  id="projects"
                  className="min-h-screen relative flex items-center justify-center"
                >
                  <div className="text-center space-y-8 bg-black/60 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                    <div>
                      <h2 className="text-4xl font-bold text-blue-400 mb-4">
                        Projects Section
                      </h2>
                      <p className="text-gray-200">EV projects showcase...</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <InteractiveCard />
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <Contact />
              </>
            }
          />

          {/* ---------------- GALLERY PAGE ---------------- */}
          <Route path="/gallery" element={<Gallery />} />

          {/* Optional standalone pages (if you ever want them routed) */}
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
