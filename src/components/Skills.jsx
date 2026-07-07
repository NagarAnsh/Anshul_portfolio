import { motion } from 'framer-motion'
import { Battery, Brain, Atom, Code } from 'lucide-react'

const categories = [
  {
    title: 'Battery Systems',
    icon: Battery,
    accent: 'cyan',
    blurb: 'From cell models to production-style BMS.',
    skills: [
      { name: 'Battery Management Systems', core: true },
      { name: 'SoC / SoH Estimation', core: true },
      { name: 'Equivalent Circuit Models', core: true },
      { name: 'EIS / Impedance Analysis' },
      { name: 'Capacity Fade & Aging' }
    ]
  },
  {
    title: 'Machine Learning',
    icon: Brain,
    accent: 'purple',
    blurb: 'Physics-constrained models, not black boxes.',
    skills: [
      { name: 'Physics-Informed NNs', core: true },
      { name: 'PyTorch', core: true },
      { name: 'Neural State Estimation' },
      { name: 'Time-Series Modeling' }
    ]
  },
  {
    title: 'Simulation & Chemistry',
    icon: Atom,
    accent: 'green',
    blurb: 'Atomistic insight into what batteries do inside.',
    skills: [
      { name: 'Molecular Dynamics (AMS)', core: true },
      { name: 'ReaxFF / UFF', core: true },
      { name: 'DFT (Gaussian)' },
      { name: 'Quantum Chemistry' }
    ]
  },
  {
    title: 'Programming & Tools',
    icon: Code,
    accent: 'yellow',
    blurb: 'The daily drivers.',
    skills: [
      { name: 'Python', core: true },
      { name: 'MATLAB', core: true },
      { name: 'LaTeX' },
      { name: 'Jupyter' },
      { name: 'Git' },
      { name: 'React' }
    ]
  }
]

const accents = {
  cyan: {
    icon: 'text-cyan-400',
    border: 'hover:border-cyan-400/60',
    shadow: 'hover:shadow-cyan-500/10',
    chip: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40'
  },
  purple: {
    icon: 'text-purple-400',
    border: 'hover:border-purple-400/60',
    shadow: 'hover:shadow-purple-500/10',
    chip: 'bg-purple-500/15 text-purple-300 border-purple-400/40'
  },
  green: {
    icon: 'text-green-400',
    border: 'hover:border-green-400/60',
    shadow: 'hover:shadow-green-500/10',
    chip: 'bg-green-500/15 text-green-300 border-green-400/40'
  },
  yellow: {
    icon: 'text-yellow-400',
    border: 'hover:border-yellow-400/60',
    shadow: 'hover:shadow-yellow-500/10',
    chip: 'bg-yellow-500/15 text-yellow-300 border-yellow-400/40'
  }
}

function CategoryCard({ category, index }) {
  const { icon: Icon } = category
  const accent = accents[category.accent]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`group bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${accent.border} ${accent.shadow}`}
    >
      <div className="flex items-center gap-3 mb-1.5">
        <Icon className={`h-7 w-7 ${accent.icon} group-hover:scale-110 transition-transform`} />
        <h3 className="text-xl font-bold text-white">{category.title}</h3>
      </div>
      <p className="text-sm text-gray-400 mb-5">{category.blurb}</p>

      <div className="flex flex-wrap gap-2">
        {category.skills.map(skill => (
          <span
            key={skill.name}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors duration-300 ${
              skill.core
                ? accent.chip
                : 'bg-white/5 text-gray-300 border-white/10'
            }`}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Skills & Toolbox
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Four years across chemistry, simulation, and machine learning — everything in service of
            understanding how batteries age, and predicting it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-gray-500 mt-10"
        >
          Highlighted chips are the tools I work with every day.
        </motion.p>
      </div>
    </section>
  )
}

export default Skills
