import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
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
                <Projects />
                <Contact />
              </>
            }
          />

          {/* ---------------- GALLERY PAGE ---------------- */}
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
