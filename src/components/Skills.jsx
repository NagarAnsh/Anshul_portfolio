import { useState, useEffect } from 'react'
import { Battery, Zap, Code, Database, Cpu, Car } from 'lucide-react'

const BatteryGauge = ({ skill, level, icon: Icon, color }) => {
  const [currentLevel, setCurrentLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentLevel(prev => {
          if (prev >= level) {
            clearInterval(interval)
            return level
          }
          return prev + 1
        })
      }, 20)
      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [level])

  const getBatteryColor = (lvl) => {
    if (lvl >= 80) return 'from-green-500 to-green-400'
    if (lvl >= 60) return 'from-yellow-500 to-yellow-400'
    if (lvl >= 40) return 'from-orange-500 to-orange-400'
    return 'from-red-500 to-red-400'
  }

  return (
    <div className="group relative">
      {/* translucent card so background shows */}
      <div className="bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
        {/* Icon and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon className={`h-6 w-6 ${color}`} />
            <h3 className="text-lg font-semibold text-white">{skill}</h3>
          </div>
          <span className="text-2xl font-bold text-cyan-400">{currentLevel}%</span>
        </div>

        {/* Battery Visual */}
        <div className="relative">
          {/* Battery Outline */}
          <div className="w-full h-8 bg-gray-800 border-2 border-gray-600 rounded-lg overflow-hidden relative">
            {/* Battery Fill */}
            <div
              className={`h-full bg-gradient-to-r ${getBatteryColor(currentLevel)} transition-all duration-500 ease-out relative`}
              style={{ width: `${currentLevel}%` }}
            >
              {/* Animated Glow Effect */}
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>

              {/* Charging Animation */}
              {currentLevel < level && (
                <div className="absolute right-0 top-0 h-full w-1 bg-white animate-ping"></div>
              )}
            </div>

            {/* Battery Segments */}
            <div className="absolute inset-0 flex">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-1 border-r border-gray-700/50 last:border-r-0" />
              ))}
            </div>
          </div>

          {/* Battery Terminal */}
          <div className="absolute -right-1 top-1 w-2 h-6 bg-gray-600 rounded-r border border-gray-500"></div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-gray-400">
            {currentLevel >= 90 ? '🟢 Expert'
              : currentLevel >= 70 ? '🟡 Advanced'
              : currentLevel >= 50 ? '🟠 Intermediate'
              : '🔴 Learning'}
          </span>
          <span className="text-gray-500">
            {currentLevel < level ? '⚡ Charging...' : '✅ Fully Charged'}
          </span>
        </div>
      </div>
    </div>
  )
}

const Skills = () => {
  const techSkills = [
    { skill: 'React.js',     level: 90, icon: Code,     color: 'text-cyan-400' },
    { skill: 'Node.js',      level: 85, icon: Database, color: 'text-green-400' },
    { skill: 'Python',       level: 80, icon: Cpu,      color: 'text-yellow-400' },
    { skill: 'JavaScript',   level: 95, icon: Code,     color: 'text-orange-400' },
    { skill: 'MongoDB',      level: 75, icon: Database, color: 'text-green-500' },
    { skill: 'TypeScript',   level: 70, icon: Code,     color: 'text-blue-400' }
  ]

  const evSkills = [
    { skill: 'Battery Management',  level: 88, icon: Battery, color: 'text-green-400' },
    { skill: 'EV Charging Systems', level: 82, icon: Zap,     color: 'text-yellow-400' },
    { skill: 'Energy Storage',      level: 85, icon: Battery, color: 'text-cyan-400' },
    { skill: 'Vehicle Diagnostics', level: 78, icon: Car,     color: 'text-purple-400' },
    { skill: 'Power Electronics',   level: 80, icon: Cpu,     color: 'text-red-400' },
    { skill: 'Grid Integration',    level: 75, icon: Zap,     color: 'text-blue-400' }
  ]

  return (
    // MADE TRANSPARENT: removed bg-gradient-to-br from-gray-900 via-black to-gray-900
    <section id="skills" className="min-h-screen py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Power & Skills
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My technical expertise spans both software development and EV technology.
            Each skill is charged and ready to power your next project.
          </p>

          {/* Overall System Status */}
          <div className="mt-8 inline-flex items-center space-x-4 bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-3">
            <Battery className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-semibold">System: Fully Operational</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-cyan-400 mb-8 flex items-center">
            <Code className="h-6 w-6 mr-3" />
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSkills.map((skill, index) => (
              <BatteryGauge key={index} {...skill} />
            ))}
          </div>
        </div>

        {/* EV & Energy Skills */}
        <div>
          <h3 className="text-2xl font-bold text-green-400 mb-8 flex items-center">
            <Zap className="h-6 w-6 mr-3" />
            EV & Energy Systems
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {evSkills.map((skill, index) => (
              <BatteryGauge key={index} {...skill} />
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Projects Completed', value: '25+', icon: '🚀' },
            { label: 'Years Experience',   value: '3+',  icon: '⚡' },
            { label: 'Happy Clients',      value: '15+', icon: '😊' },
            { label: 'Code Commits',       value: '1000+', icon: '💻' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
