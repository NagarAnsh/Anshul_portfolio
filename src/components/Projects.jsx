import { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, FileText, Calendar, MapPin, BookOpen } from 'lucide-react'

const publications = [
  {
    year: '2026',
    type: 'Journal',
    title: 'Voltage Prediction in Lithium-Ion Batteries: Integrating Physics-based Models with Neural Networks for Enhanced Accuracy',
    authors: ['A. Nagar', 'A. Garg', 'J. Kim'],
    venue: 'Journal of Industrial and Engineering Chemistry',
    href: 'https://doi.org/10.1016/j.jiec.2026.02.024',
    firstAuthor: true
  },
  {
    year: '2025',
    type: 'Conference',
    title: 'Minimal-Data Battery Lifetime Prediction Using a Physics-Constrained Neural Network for Lithium-Ion Batteries',
    authors: ['A. Nagar', 'J. Kim'],
    venue: 'ICEMS 2025 · 28th Int. Conf. on Electrical Machines and Systems',
    href: 'https://doi.org/10.23919/ICEMS66262.2025.11317520',
    firstAuthor: true,
    award: 'Best Paper Award'
  },
  {
    year: '2025',
    type: 'Journal',
    title: 'Robust circuit parameter estimator in noise-outlier environments based on RANSAC merged with RLS for reliable LiFePO₄ state-of-charge',
    authors: ['E. Kang', 'S. Cho', 'M. Lee', 'A. Nagar', 'J. Kim'],
    venue: 'Journal of Energy Storage',
    href: 'https://doi.org/10.1016/j.est.2025.116416'
  },
  {
    year: '2025',
    type: 'Conference',
    title: 'Machine Learning Approach for Accurate Lithium-Ion Battery Temperature Prediction Using Electrochemical Features Independent of Battery SOC and SOH',
    authors: ['V. M. Tingbari', 'O. I. Ekuewa', 'A. Nagar', 'A. Abbas', 'J. Umar', 'Y. Zhang', 'W. Na', 'J. Kim'],
    venue: 'APEC 2025 · IEEE Applied Power Electronics Conference',
    href: 'https://doi.org/10.1109/APEC48143.2025.10977233'
  },
  {
    year: '2023',
    type: 'Journal',
    title: 'Reactive Force Field Molecular Dynamics Simulation of SEI Components',
    authors: ['A. Nagar', 'A. Garg', 'S. Singh', 'L. Gao', 'J. Kim', 'K. Wei'],
    venue: 'ASME Journal of Electrochemical Energy Conversion and Storage',
    href: 'https://doi.org/10.1115/1.4062992',
    firstAuthor: true
  },
  {
    year: '2023',
    type: 'Journal',
    title: 'Impedance-based Health Indicators for Lithium-Ion Batteries',
    authors: ['P.-Y. Lee', 'A. Nagar', 'K. Yoo', 'J. Kim'],
    venue: 'Journal of Electroanalytical Chemistry',
    href: 'https://doi.org/10.1016/j.jelechem.2023.117572'
  }
]

const projects = [
  {
    id: 'pinn',
    title: 'Physics-Informed Neural Networks for Battery Degradation',
    period: 'Jul 2024 – Present',
    org: 'Chungnam National University, Daejeon',
    image: '/projects/pinn.webp',
    gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
    short: 'Fusing physics-based fade models with neural networks for accurate Li-ion capacity prediction.',
    long: 'Integrating physics-based battery degradation equations with neural networks using Physics-Informed Neural Networks (PINNs) to predict capacity fade across operating conditions. The hybrid model enforces electrochemical constraints during training, improving generalization beyond purely data-driven approaches.',
    tags: ['PINN', 'PyTorch', 'Li-ion', 'Capacity Fade', 'SOH'],
    links: [
      { label: 'Voltage prediction paper (JIEC 2026)', href: 'https://doi.org/10.1016/j.jiec.2026.02.024', icon: FileText },
      { label: 'Lifetime prediction paper (ICEMS 2025)', href: 'https://doi.org/10.23919/ICEMS66262.2025.11317520', icon: FileText }
    ]
  },
  {
    id: 'bms-hyundai',
    title: 'SoX Estimation for Battery Management Systems',
    period: 'Sep 2022 – Jun 2024',
    org: 'Chungnam National University · Collaboration with Hyundai',
    image: '/projects/sox-estimation.webp',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
    short: 'Model-based (ECM + Kalman family) and AI-based estimation of SoC, SoH, SoP and beyond on LFP cells.',
    long: 'Two estimation pipelines feeding a production-style BMS. Model-based: SOC–OCV modeling, RLS parameter identification of an equivalent circuit model, and Kalman-filter state estimation across the EKF / AEKF / UKF / AUKF family. AI-based: feature extraction from historical cell and pack voltage, current, and capacity data, correlation analysis to select health features, and algorithm selection for SoX estimation. The payoff: better accuracy, extended lifespan, enhanced safety, and lower cost for LFP packs.',
    tags: ['BMS', 'ECM', 'EKF / UKF', 'SOC-OCV', 'LFP', 'SoC · SoH · SoP'],
    links: [
      { label: 'RANSAC-RLS SoC paper (2025)', href: 'https://doi.org/10.1016/j.est.2025.116416', icon: FileText }
    ]
  },
  {
    id: 'eis-diagnostics',
    title: 'EIS-Based Diagnostics & Fault Detection',
    period: '2022 – 2025',
    org: 'Chungnam National University · Battery Lab',
    image: '/projects/eis-diagnosis.webp',
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    short: 'Impedance as a health window: multi-indicator SOH, LSTM prediction, and EIS-pattern fault diagnosis.',
    long: 'Electrochemical impedance spectroscopy read through an equivalent-circuit lens — ohmic, SEI, charge-transfer, and Warburg elements mapped to aging modes (conductivity loss, lithium inventory loss, active material loss). DC signals from BMS sensors are processed into AC patterns via time- and frequency-domain feature fusion for advanced SOH estimation, safety and imbalance diagnosis. Includes multi-health-indicator correlation analysis, LSTM/RNN SOH prediction, and an EIS-pattern fault database that recognizes high-temperature and vibration aging for preemptive maintenance.',
    tags: ['EIS', 'SOH', 'LSTM', 'Fault Diagnosis', 'Health Indicators'],
    links: [
      { label: 'EIS health indicators paper (2023)', href: 'https://doi.org/10.1016/j.jelechem.2023.117572', icon: FileText }
    ]
  },
  {
    id: 'cloud-bms',
    title: 'Cloud BMS & Battery Digital Twin',
    period: '2023 – Present',
    org: 'Chungnam National University · Battery Lab',
    image: '/projects/cloud-bms.webp',
    gradient: 'from-emerald-500 via-cyan-500 to-blue-500',
    short: 'AWS-connected virtual BMS mirroring real packs — SoX, RUL, thermal analysis, V2G economics, second-life reuse.',
    long: 'A cloud battery-management architecture: cell monitoring and battery-management units stream voltage, current, and temperature over MQTT through an IoT gateway to AWS, where a virtual BMS mirrors the physical pack in real time — validated on a Raspberry Pi master–slave BMS testbed with EKF estimation served through an API. The digital-twin layer adds SoX estimation, RUL prediction, thermal analysis, fault diagnosis, and balanced management, extending to vehicle-to-grid economic analysis and a spent-battery reuse pipeline that grades second-life packs by SOC, SOH, SOP, and SOB.',
    tags: ['Cloud BMS', 'Digital Twin', 'MQTT / AWS', 'RUL', 'V2G', 'Second-life'],
    links: []
  },
  {
    id: 'sei-md',
    title: 'Molecular Dynamics of SEI Components',
    period: 'May 2021 – Dec 2021',
    org: 'IIT Delhi · Supervisor: Dr. Akhil Garg',
    image: '/projects/sei-md.jpg',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    short: 'ReaxFF / UFF simulations of Li-ion diffusion through inorganic SEI with alkali doping.',
    long: 'ReaxFF and UFF molecular dynamics simulations of lithium-ion diffusion through inorganic SEI components at varied temperatures and densities. Explored alkali doping strategies to enhance ionic conductivity. Workflows built in AMS (AMSjobs) with DFT post-processing.',
    tags: ['ReaxFF', 'UFF', 'AMS', 'DFT', 'MD'],
    links: [
      { label: 'ReaxFF SEI paper (ASME 2023)', href: 'https://doi.org/10.1115/1.4062992', icon: FileText }
    ]
  },
  {
    id: 'perovskite',
    title: 'Perovskite Solar Cell Synthesis',
    period: 'May 2018 – Jul 2018',
    org: 'IISER Mohali · Supervisor: Dr. Arijit Kumar De',
    image: '/projects/perovskite.png',
    gradient: 'from-yellow-500 via-lime-500 to-green-500',
    short: 'Synthesis and characterization of perovskite photovoltaic cells.',
    long: 'Synthesized and characterized perovskite solar cells in a wet-lab setting. Surveyed approaches in the literature for improving photovoltaic efficiency, including compositional engineering and interface modification.',
    tags: ['Perovskite', 'Photovoltaics', 'Synthesis']
  }
]

function ProjectCard({ project, onOpen }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [8, -8])
  const rotateY = useTransform(x, [-100, 100], [-8, 8])
  const [imgOk, setImgOk] = useState(true)

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="group relative text-left bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-2xl overflow-hidden hover:border-cyan-400/60 transition-colors duration-300 shadow-lg hover:shadow-cyan-500/20 cursor-pointer w-full"
    >
      <div className={`relative h-44 w-full bg-gradient-to-br ${project.gradient} overflow-hidden`}>
        {imgOk && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-cyan-300 border border-cyan-400/30 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {project.period.split('–')[0].trim()}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-2">{project.short}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/20"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/30 text-gray-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
        <div className="pt-2 text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          View details <ExternalLink className="h-3 w-3" />
        </div>
      </div>
    </motion.button>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="relative bg-gray-900 border border-cyan-400/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${project.gradient}`}>
            <img
              src={project.image}
              alt={project.title}
              onError={e => { e.currentTarget.style.display = 'none' }}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 rounded-full p-2 transition"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  {project.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  {project.org}
                </span>
              </div>
            </div>

            <p className="text-gray-200 leading-relaxed">{project.long}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-400/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.links.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-semibold"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function PublicationRow({ pub, index }) {
  return (
    <motion.a
      href={pub.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group block bg-black/50 backdrop-blur-sm border border-gray-700/60 rounded-xl p-5 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
    >
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
          {pub.year}
        </span>
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
            pub.type === 'Journal'
              ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/40'
              : 'bg-purple-500/15 text-purple-300 border-purple-400/40'
          }`}
        >
          {pub.type}
        </span>
        {pub.firstAuthor && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-300 border border-green-400/40">
            First author
          </span>
        )}
        {pub.award && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/40">
            🏆 {pub.award}
          </span>
        )}
        <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-cyan-400 transition-colors ml-auto" />
      </div>

      <h4 className="text-white font-semibold leading-snug mb-1.5 group-hover:text-cyan-300 transition-colors">
        {pub.title}
      </h4>

      <p className="text-sm text-gray-400">
        {pub.authors.map((author, i) => (
          <span key={author + i}>
            {author === 'A. Nagar'
              ? <span className="text-cyan-300 font-semibold">{author}</span>
              : author}
            {i < pub.authors.length - 1 && ', '}
          </span>
        ))}
      </p>
      <p className="text-sm text-gray-500 italic mt-0.5">{pub.venue}</p>
    </motion.a>
  )
}

const Projects = () => {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="min-h-screen py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Research Projects
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            From quantum chemistry to physics-informed neural networks — selected work across IISER, IIT Delhi, and CNU.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} onOpen={setSelected} />
          ))}
        </div>

        {/* Publications */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <BookOpen className="h-7 w-7 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Publications
              </span>
            </h3>
            <p className="text-gray-400 text-sm">
              6 peer-reviewed papers · 3 as first author · click any to read
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto">
            {publications.map((pub, i) => (
              <PublicationRow key={pub.href + pub.title} pub={pub} index={i} />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default Projects
