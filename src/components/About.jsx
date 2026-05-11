import { useState } from 'react'
import { MapPin, Calendar, Award, Zap, Battery, Car } from 'lucide-react'

const About = () => {
  const [activeTab, setActiveTab] = useState('story')

  const timeline = [
    { year: '2016-2021', title: 'IISER Mohali', description: 'Focused on Quantum Computational Chemistry, exploring material behavior at a fundamental level.', icon: '🧪' },
    { year: '2021-2022', title: 'IIT Delhi', description: 'Conducted quantum simulations of internal battery chemistry and charge transport.', icon: '⚛️' },
    { year: '2022-2024', title: 'Hyundai Project (CNU, Daejeon)', description: 'Developed Equivalent Circuit Models (ECM) for LFP batteries and algorithms for state estimation.', icon: '🚘' },
    { year: '2024-Present', title: 'Current Research (CNU, Daejeon)', description: 'Working on Physics-Informed Neural Networks (PINN) for battery capacity degradation.', icon: '🧠' }
  ]

  const achievements = [
    { icon: Award, title: 'Certified EV Technician', desc: 'Advanced certification in electric vehicle systems' },
    { icon: Battery, title: 'Battery Expert', desc: 'Specialized in lithium-ion battery management' },
    { icon: Zap, title: 'Power Systems', desc: 'Expert in high-voltage power electronics' },
    { icon: Car, title: 'Vehicle Integration', desc: 'Experience with vehicle control systems' }
  ]

  return (
    // MADE TRANSPARENT: removed bg-gradient-to-br from-black via-gray-900 to-black
    <section id="about" className="min-h-screen py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating a sustainable future through innovative EV technology and clean energy solutions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            {/* Kept as TRANSLUCENT panel */}
            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-lg">
              <img
                src="/assets/myphoto.png"
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Anshul Nagar</h3>
              <p className="text-cyan-400 font-semibold mb-4">Lithium ion batteries,PhD Scholar, CNU</p>

              <div className="space-y-2 text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Daejeon, South Korea</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Available for opportunities</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-black/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyan-400">3+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>
              <div className="text-center bg-black/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">12+</div>
                <div className="text-xs text-gray-400">Projects Done</div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-8">
              {[
                { id: 'story', label: 'My Story', icon: '📖' },
                { id: 'timeline', label: 'Timeline', icon: '⏰' },
                { id: 'achievements', label: 'Achievements', icon: '🏆' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${activeTab === tab.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-black/40 text-gray-300 hover:bg-black/60 hover:text-cyan-400'
                    }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content (kept translucent) */}
            <div className="bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-8">
              {activeTab === 'story' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">My Journey into Battery Technology</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    My journey into the battery field didn’t start there directly—it started with curiosity.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    During my bachelor’s studies, I was working in renewable energy, mainly on solar panels and energy systems. At the same time, I was exploring quantum chemistry, trying to understand how materials behave at a fundamental level. I enjoyed the work, but something felt incomplete. I could see the systems from the outside, yet I wanted to understand what was really happening inside.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    That turning point came when I got the opportunity to work at IIT Delhi with Professor Akhil. There, I worked on quantum simulations of the internal chemistry of batteries. For the first time, I was not just using batteries,I was looking deep into their internal reactions, charge transport, and chemical behavior. It was challenging, abstract, and sometimes frustrating, but that challenge hooked me.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    That experience changed everything. My curiosity turned into a clear direction.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Since then, I have been working continuously in the battery domain, expanding my understanding from internal electrochemistry to electrical components and system-level behavior. Today, my focus is on building neural-network-driven state estimation models, where physics-based understanding meets data-driven intelligence.
                  </p>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">My EV Journey Timeline</h3>
                  <div className="space-y-6">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 group">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                              {item.year}
                            </span>
                            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                          </div>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Certifications & Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="bg-black/30 border border-gray-700/60 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300 group">
                        <achievement.icon className="h-8 w-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
                        <h4 className="text-lg font-semibold text-white mb-2">{achievement.title}</h4>
                        <p className="text-gray-300 text-sm">{achievement.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">Current Focus Areas</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span>Vehicle-to-Grid (V2G) integration systems</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-green-400" />
                        <span>AI-powered battery health monitoring</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-blue-400" />
                        <span>Autonomous charging network optimization</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section >
  )
}

export default About
