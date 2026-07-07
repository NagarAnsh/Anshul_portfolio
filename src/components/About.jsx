import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  MapPin, Calendar, Award, Zap, Battery, Car,
  GraduationCap, Atom, Brain, Trophy, Sparkles
} from 'lucide-react'

const milestones = [
  {
    year: '2016 – 2021',
    title: 'IISER Mohali',
    role: 'BS-MS, Chemistry',
    desc: 'Quantum computational chemistry; master’s thesis on conical intersections in triatomic systems. DST-INSPIRE-SHE scholar.',
    charge: 25,
    icon: GraduationCap,
    tags: ['Quantum Chemistry', 'DST-INSPIRE']
  },
  {
    year: '2021 – 2022',
    title: 'IIT Delhi',
    role: 'Research · Molecular Dynamics',
    desc: 'ReaxFF / UFF simulations of SEI components and Li-ion charge transport with Dr. Akhil Garg — first dive inside the battery.',
    charge: 50,
    icon: Atom,
    tags: ['ReaxFF', 'SEI', 'Publication']
  },
  {
    year: '2022 – 2024',
    title: 'CNU × Hyundai',
    role: 'BMS Research',
    desc: 'Equivalent-circuit modeling and SoC / SoH estimation for LFP cells on a production-style battery management system.',
    charge: 75,
    icon: Battery,
    tags: ['ECM', 'SoC/SoH', 'EIS']
  },
  {
    year: '2024 – Now',
    title: 'PhD · CNU',
    role: 'Physics-Informed ML',
    desc: 'Physics-Informed Neural Networks for capacity-fade prediction — electrochemical constraints baked into the network.',
    charge: 99,
    charging: true,
    icon: Brain,
    tags: ['PINN', 'PyTorch']
  }
]

const achievements = [
  { icon: Trophy, title: 'Best Paper Award · ICEMS 2025', desc: 'Physics-constrained NN for battery lifetime · Busan, Korea' },
  { icon: Trophy, title: 'Samsung Humantech Award', desc: '32nd Paper Awards · Energy & Environment · 2026' },
  { icon: Award, title: 'DST-INSPIRE-SHE Scholar', desc: '2016–2021 · Government of India fellowship' },
  { icon: Battery, title: '6 Publications', desc: '3 first-author · JIEC, J. Energy Storage, ASME, IEEE' },
  { icon: Zap, title: 'BMS Specialization', desc: 'Gregory Plett · CU Boulder · Coursera' },
  { icon: Car, title: 'DFT Specialization', desc: 'École Polytechnique · Coursera' }
]

const awards = [
  {
    img: '/awards/icems-best-paper.jpg',
    title: 'Best Paper Award',
    sub: 'ICEMS 2025 · Busan, Korea',
    desc: '“Minimal-Data Battery Lifetime Prediction Using a Physics-Constrained Neural Network” — 28th Int. Conf. on Electrical Machines and Systems.'
  },
  {
    img: '/awards/samsung-humantech.jpg',
    title: 'Samsung Humantech Paper Award',
    sub: '32nd Humantech Awards · Energy & Environment · Feb 2026',
    desc: 'Awarded by Samsung Electronics for battery research in the Energy & Environment section.'
  }
]

function ChargeNode({ milestone, side }) {
  const chargeColor =
    milestone.charge >= 90 ? 'text-green-400 border-green-400/60 shadow-green-500/40'
    : milestone.charge >= 70 ? 'text-lime-400 border-lime-400/60 shadow-lime-500/40'
    : milestone.charge >= 45 ? 'text-yellow-400 border-yellow-400/60 shadow-yellow-500/40'
    : 'text-orange-400 border-orange-400/60 shadow-orange-500/40'

  return (
    <div
      className={`absolute top-4 left-6 -translate-x-1/2 z-10 ${
        side === 'left' ? 'md:left-full' : 'md:left-0'
      }`}
    >
      <div className={`w-14 h-14 rounded-full bg-gray-950 border-2 ${chargeColor} shadow-lg flex items-center justify-center ${milestone.charging ? 'animate-pulse' : ''}`}>
        <span className="text-xs font-bold">{milestone.charge}%</span>
      </div>
    </div>
  )
}

function Milestone({ milestone, index }) {
  const side = index % 2 === 0 ? 'left' : 'right'
  const { icon: Icon } = milestone

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className={`relative pl-16 md:pl-0 ${
        side === 'left'
          ? 'md:w-1/2 md:pr-14'
          : 'md:w-1/2 md:ml-auto md:pl-14'
      }`}
    >
      <ChargeNode milestone={milestone} side={side} />

      <div className="group bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-5 sm:p-6 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
        <div className="flex items-center gap-3 mb-2">
          <Icon className="h-6 w-6 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 px-2.5 py-0.5 rounded-full text-xs font-bold">
            {milestone.year}
          </span>
          {milestone.charging && (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <Zap className="h-3 w-3 animate-pulse" /> charging…
            </span>
          )}
        </div>
        <h4 className="text-xl font-bold text-white">{milestone.title}</h4>
        <p className="text-sm text-cyan-400/90 font-semibold mb-2">{milestone.role}</p>
        <p className="text-gray-300 text-sm leading-relaxed mb-3">{milestone.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {milestone.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ChargeTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'end 55%']
  })
  const fill = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  // Reveal the full-height gradient top-down so its colors stay pinned to the track
  const clip = useTransform(fill, v => `inset(0 0 ${(1 - v) * 100}% 0)`)

  return (
    <div className="mb-20">
      <h3 className="text-2xl sm:text-3xl font-bold text-center mb-2">
        <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
          The Charge Curve
        </span>
      </h3>
      <p className="text-center text-gray-400 text-sm mb-12">
        My journey, plotted like a battery charging — scroll to charge.
      </p>

      <div ref={ref} className="relative">
        {/* Charging track */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1.5 -translate-x-1/2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            style={{ clipPath: clip }}
            className="absolute inset-0 bg-gradient-to-b from-orange-500 via-yellow-400 to-green-400"
          />
        </div>

        <div className="space-y-12">
          {milestones.map((m, i) => (
            <Milestone key={m.title} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Achievements() {
  return (
    <div>
      <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">
        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Achievements & Focus
        </span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-5 hover:border-cyan-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <a.icon className="h-8 w-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="font-semibold text-white text-sm mb-1">{a.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Award certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {awards.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="group bg-black/50 backdrop-blur-sm border border-amber-400/25 rounded-2xl overflow-hidden hover:border-amber-400/60 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
          >
            <div className="relative h-44 overflow-hidden bg-white/5">
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Trophy className="absolute top-3 right-3 h-6 w-6 text-amber-400 drop-shadow" />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-white text-sm mb-0.5">{a.title}</h4>
              <p className="text-amber-300/90 text-xs mb-2">{a.sub}</p>
              <p className="text-gray-400 text-xs leading-relaxed">{a.desc}</p>
            </div>
          </motion.div>
        ))}

        {/* reserved slot for the next award */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-600/60 rounded-2xl p-6 min-h-[280px] hover:border-cyan-400/50 transition-colors duration-300"
        >
          <Sparkles className="h-8 w-8 text-cyan-400/70 mb-3 animate-pulse" />
          <h4 className="font-semibold text-gray-300 text-sm mb-1">Next award loading…</h4>
          <p className="text-gray-500 text-xs">Announcement coming soon — this spot is reserved.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-6"
      >
        <h4 className="font-semibold text-cyan-400 mb-3 text-sm uppercase tracking-widest">Current Focus</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-gray-200 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400 flex-shrink-0" />
            <span>Physics-Informed NN for capacity fade</span>
          </div>
          <div className="flex items-center gap-2">
            <Battery className="h-4 w-4 text-green-400 flex-shrink-0" />
            <span>EIS-based health diagnostics</span>
          </div>
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-blue-400 flex-shrink-0" />
            <span>SoC / SoH estimation for LFP cells</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating a sustainable future through battery science, physics-informed ML, and energy storage research.
          </p>
        </div>

        {/* Profile Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center">
          <div className="lg:col-span-1 flex flex-col items-center text-center">
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-cyan-400/50 shadow-lg mb-4">
              <img
                src="/assets/myphoto.png"
                alt="Anshul Nagar"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-2xl font-bold text-white">Anshul Nagar</h3>
            <p className="text-cyan-400 font-semibold mb-3">Lithium-ion Batteries · PhD Scholar, CNU</p>
            <div className="space-y-1 text-gray-300 text-sm">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Daejeon, South Korea</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
            <p className="text-gray-200 leading-relaxed mb-4">
              I am a PhD researcher in Electrical Engineering at Chungnam National University, working at
              the intersection of <span className="text-cyan-400 font-semibold">battery science</span> and
              <span className="text-purple-400 font-semibold"> machine learning</span>.
            </p>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              My work spans quantum chemistry, molecular dynamics of SEI components, equivalent-circuit
              modeling for LFP cells, and Physics-Informed Neural Networks for capacity fade prediction.
              Scroll the charge curve below to trace the journey.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center bg-black/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyan-400">4+</div>
                <div className="text-xs text-gray-400">Yrs in Battery R&amp;D</div>
              </div>
              <div className="text-center bg-black/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">6</div>
                <div className="text-xs text-gray-400">Publications</div>
              </div>
              <div className="text-center bg-black/30 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">3</div>
                <div className="text-xs text-gray-400">Institutes</div>
              </div>
            </div>
          </div>
        </div>

        <ChargeTimeline />
        <Achievements />
      </div>
    </section>
  )
}

export default About
