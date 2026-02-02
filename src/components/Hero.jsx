import { useState, useEffect } from 'react'
import { ChevronDown, Zap, Car } from 'lucide-react'

const NAME = 'Ion energy systems'
const TITLE = 'Battery AI & EV Systems'
const SUMMARY =
  'Focused on lithium-ion battery degradation modeling, battery management systems, and energy storage optimization. Experience with EIS, physics-informed ML, and EV system analytics.'
const projectsHref = '#projects'
const resumeUrl = '/assets/Resume.pdf'

const Hero = () => {
  const [batteryLevel, setBatteryLevel] = useState(0)
  const [typedText, setTypedText] = useState('')
  const fullText = TITLE

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [fullText])

  return (
    // MADE TRANSPARENT: removed bg-gradient-to-br from-gray-900 via-black to-gray-900
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-transparent">
      {/* Remove opaque overlays. Keep subtle blobs but very light so honeycomb shows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
              {NAME}
            </span>
          </h1>

          <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span className="border-r-2 border-cyan-400 pr-2 animate-pulse">
              {typedText}
            </span>
          </div>

          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {SUMMARY}
          </p>
        </div>

        {/* Battery display panel kept translucent */}
        <div className="mb-12">
          <div className="relative inline-block">
            <div className="bg-black/50 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Car className="h-8 w-8 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-xl">EV SYSTEM STATUS</span>
                <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>

              <div className="relative w-80 h-20 border-3 border-gray-600 rounded-lg overflow-hidden bg-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-100 ease-out relative"
                  style={{ width: `${batteryLevel}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    {batteryLevel}%
                  </span>
                </div>
              </div>

              <div className="mt-4 text-gray-300">
                <div className="flex justify-between text-sm">
                  <span>Power: {(batteryLevel * 0.85).toFixed(1)} kW</span>
                  <span>Range: {(batteryLevel * 4.2).toFixed(0)} km</span>
                  <span>Temp: {(20 + batteryLevel * 0.1).toFixed(1)}°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href={projectsHref}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href={resumeUrl}
              download="Resume.pdf"
              className="group px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105"
            >
              Download Resume
            </a>
          </div>


        <div className="animate-bounce">
          <ChevronDown className="h-8 w-8 text-cyan-400 mx-auto cursor-pointer" />
        </div>
      </div>
    </section>
  )
}

export default Hero
