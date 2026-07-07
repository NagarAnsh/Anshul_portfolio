import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Battery, HeartPulse, Zap, Thermometer } from 'lucide-react'

const NAME = 'Anshul Nagar'
const TITLE = 'Battery AI · PhD Scholar, CNU'
const SUMMARY =
  'PhD researcher in Electrical Engineering working on lithium-ion battery degradation, physics-informed neural networks, and battery management systems.'
const resumeUrl = '/assets/Resume.pdf'

/* ------------------------------------------------------------------ */
/* Scene 1 — EV + charger (vector, zooms into the under-floor pack)   */
/* ------------------------------------------------------------------ */
function CarScene({ carScale, carOpacity }) {
  return (
    <motion.div
      style={{ opacity: carOpacity }}
      className="absolute inset-0 flex items-end justify-center pb-[4vh] pointer-events-none"
    >
      {/* transform origin = center of the battery pack */}
      <motion.div
        style={{ scale: carScale, transformOrigin: '57% 86%' }}
        className="relative w-[min(94vw,980px)]"
      >
        <svg viewBox="0 0 1000 440" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="packGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <radialGradient id="underGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ground + shadow + glow */}
          <line x1="30" y1="404" x2="970" y2="404" stroke="#1f2937" strokeWidth="2" />
          <ellipse cx="570" cy="404" rx="360" ry="13" fill="#000" opacity="0.55" />
          <ellipse cx="570" cy="392" rx="340" ry="26" fill="url(#underGlow)" />

          {/* ---- charging station (matched to the car's blue) ---- */}
          <g>
            <rect x="42" y="212" width="66" height="160" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <rect x="42" y="212" width="66" height="160" rx="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6" />
            <rect x="52" y="228" width="46" height="30" rx="4" fill="#020617" stroke="#3b82f6" strokeWidth="1" />
            <text x="75" y="248" textAnchor="middle" fill="#93c5fd" fontSize="13" fontFamily="monospace" fontWeight="bold">
              DC
              <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
            </text>
            <circle cx="75" cy="286" r="7" fill="#3b82f6" opacity="0.9" filter="url(#soft)">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <rect x="36" y="372" width="78" height="10" rx="4" fill="#1e293b" />
          </g>

          {/* cable + energy pulse into the front charge port */}
          <path
            d="M 100 310 C 145 372 180 310 226 300"
            fill="none" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round"
          />
          <path
            d="M 100 310 C 145 372 180 310 226 300"
            fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 10"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="0.9s" repeatCount="indefinite" />
          </path>
          <circle r="5" fill="#bfdbfe" filter="url(#soft)">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 100 310 C 145 372 180 310 226 300" />
          </circle>

          {/* ---- the car ---- */}
          <image
            href="/assets/car-blue.webp"
            x="200" y="196" width="760" height="208"
            preserveAspectRatio="xMidYMax meet"
          />

          {/* charge port pulse on the nose */}
          <circle cx="230" cy="298" r="6" fill="#020617" stroke="#60a5fa" strokeWidth="2" />
          <circle cx="230" cy="298" r="10" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="8;14" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* ---- battery pack under the floor (zoom target) ---- */}
          <g filter="url(#soft)">
            <rect x="430" y="368" width="280" height="20" rx="7" fill="url(#packGrad)" stroke="#93c5fd" strokeWidth="2" />
            {[1, 2, 3, 4, 5, 6].map(i => (
              <line
                key={i}
                x1={430 + i * 40} y1="371"
                x2={430 + i * 40} y2="385"
                stroke="#bfdbfe" strokeWidth="1.5" opacity="0.45"
              />
            ))}
            <rect x="430" y="368" width="280" height="20" rx="7" fill="#bfdbfe" opacity="0.12">
              <animate attributeName="opacity" values="0.06;0.22;0.06" dur="2.2s" repeatCount="indefinite" />
            </rect>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Scene 2 — BMS: the guardian controlling health & status            */
/* ------------------------------------------------------------------ */
const bmsStats = [
  { icon: Battery, label: 'SoC', value: '78%', color: 'text-green-400', dot: 'bg-green-400' },
  { icon: HeartPulse, label: 'SoH', value: '96%', color: 'text-cyan-400', dot: 'bg-cyan-400' },
  { icon: Zap, label: 'Pack', value: '352 V', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  { icon: Thermometer, label: 'Temp', value: '23 °C', color: 'text-blue-400', dot: 'bg-blue-400' }
]

const bmsModules = [
  { x: 100, y: 66, fill: 72, path: 'M 300 106 L 380 106 L 380 216 L 430 216' },
  { x: 100, y: 330, fill: 69, path: 'M 300 370 L 380 370 L 380 264 L 430 264' },
  { x: 700, y: 66, fill: 74, path: 'M 700 106 L 620 106 L 620 216 L 570 216' },
  { x: 700, y: 330, fill: 71, path: 'M 700 370 L 620 370 L 620 264 L 570 264' }
]

function BmsScene({ bmsOpacity, bmsScale }) {
  return (
    <motion.div
      style={{ opacity: bmsOpacity, scale: bmsScale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
    >
      <div className="w-[min(92vw,820px)]">
        <svg viewBox="0 0 1000 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="bmsGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* traces + data pulses */}
          {bmsModules.map((m, i) => (
            <g key={i}>
              <path d={m.path} fill="none" stroke="#1e3a4f" strokeWidth="3" />
              <circle r="4.5" fill="#22d3ee" filter="url(#bmsGlow)">
                <animateMotion dur="1.8s" begin={`${-i * 0.45}s`} repeatCount="indefinite" path={m.path} />
              </circle>
            </g>
          ))}

          {/* battery modules with balancing charge bars */}
          {bmsModules.map((m, i) => (
            <g key={`mod${i}`}>
              <rect x={m.x} y={m.y} width="200" height="80" rx="10" fill="#0b1220" stroke="#334155" strokeWidth="2" />
              <text x={m.x + 14} y={m.y + 24} fill="#94a3b8" fontSize="14" fontFamily="monospace">
                MODULE {i + 1}
              </text>
              <rect x={m.x + 14} y={m.y + 38} width="172" height="18" rx="5" fill="#1e293b" />
              <rect x={m.x + 14} y={m.y + 38} height="18" rx="5" fill="#4ade80" opacity="0.85">
                <animate
                  attributeName="width"
                  values={`${m.fill * 1.72};${(m.fill + 4) * 1.72};${m.fill * 1.72}`}
                  dur={`${3 + i * 0.6}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <text x={m.x + 186} y={m.y + 72} textAnchor="end" fill="#4ade80" fontSize="13" fontFamily="monospace">
                {m.fill}% · OK
              </text>
            </g>
          ))}

          {/* central BMS chip */}
          <g filter="url(#bmsGlow)">
            <rect x="430" y="176" width="140" height="128" rx="14" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
          </g>
          {/* pins */}
          {[196, 226, 256, 286].map(y => (
            <g key={y}>
              <rect x="420" y={y} width="10" height="8" rx="2" fill="#475569" />
              <rect x="570" y={y} width="10" height="8" rx="2" fill="#475569" />
            </g>
          ))}
          <text x="500" y="230" textAnchor="middle" fill="#67e8f9" fontSize="30" fontWeight="bold" fontFamily="monospace">
            BMS
          </text>
          <text x="500" y="258" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">
            SoC · SoH · BAL
          </text>
          {/* heartbeat line inside chip */}
          <polyline
            points="448,282 462,282 468,270 476,292 484,276 490,282 552,282"
            fill="none" stroke="#4ade80" strokeWidth="2"
          >
            <animate attributeName="opacity" values="1;0.25;1" dur="1.3s" repeatCount="indefinite" />
          </polyline>
        </svg>

        {/* live status chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {bmsStats.map(s => (
            <div
              key={s.label}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-gray-700/70 rounded-full px-4 py-2"
            >
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs text-gray-400">{s.label}</span>
              <span className={`text-sm font-bold font-mono ${s.color}`}>{s.value}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
            </div>
          ))}
        </div>

        <p className="text-center text-base sm:text-lg text-gray-200 mt-6 max-w-2xl mx-auto">
          Meet the <span className="text-cyan-400 font-semibold">BMS</span> — it balances every cell, watches temperature,
          and estimates state-of-charge and health in real time.
          <span className="text-gray-400"> This is the layer my Hyundai-project algorithms live in.</span>
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Scene 3 — inside the cell: electrodes, separator, SEI, moving ions */
/* ------------------------------------------------------------------ */
const ionTracks = [
  { d: 'M 352 180 C 420 168 460 196 500 188 C 545 180 590 204 626 196', dur: 5.2, begin: 0 },
  { d: 'M 352 250 C 415 240 465 266 502 256 C 548 246 588 270 626 262', dur: 5.8, begin: -1.4 },
  { d: 'M 352 320 C 418 310 462 336 500 326 C 544 318 592 340 626 332', dur: 5.0, begin: -2.6 },
  { d: 'M 352 390 C 420 380 460 404 502 396 C 546 388 590 412 626 402', dur: 6.2, begin: -3.4 },
  { d: 'M 352 215 C 430 208 455 230 501 222 C 550 214 585 236 626 228', dur: 6.6, begin: -4.5 },
  { d: 'M 352 355 C 425 346 458 370 500 362 C 548 354 590 376 626 368', dur: 5.5, begin: -5.1 }
]

function CellScene({ cellOpacity, cellScale, researchOpacity }) {
  return (
    <motion.div
      style={{ opacity: cellOpacity, scale: cellScale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
    >
      <div className="w-[min(94vw,860px)]">
        <svg viewBox="0 0 1000 560" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#14532d" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#0b1220" />
            </linearGradient>
            <radialGradient id="ionGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#cffafe" />
              <stop offset="60%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0e7490" />
            </radialGradient>
            <filter id="cellGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#67e8f9" />
            </marker>
          </defs>

          {/* ------- external circuit + charger ------- */}
          <path d="M 300 122 L 300 62 L 700 62 L 700 122" fill="none" stroke="#475569" strokeWidth="4" />
          {/* electrons flowing cathode → anode (charging) */}
          {[0, -1, -2].map(b => (
            <circle key={b} r="4.5" fill="#fde047" filter="url(#cellGlow)">
              <animateMotion dur="3s" begin={`${b}s`} repeatCount="indefinite" path="M 300 122 L 300 62 L 700 62 L 700 122" />
            </circle>
          ))}
          <text x="368" y="50" fill="#fde047" fontSize="15" fontFamily="monospace">e⁻</text>

          {/* charger box */}
          <g filter="url(#cellGlow)">
            <rect x="436" y="30" width="128" height="60" rx="10" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" />
          </g>
          <text x="500" y="56" textAnchor="middle" fill="#facc15" fontSize="18">⚡</text>
          <text x="500" y="78" textAnchor="middle" fill="#67e8f9" fontSize="13" fontFamily="monospace" fontWeight="bold">
            CHARGING
          </text>

          {/* terminals */}
          <rect x="290" y="108" width="20" height="16" rx="3" fill="#166534" />
          <rect x="690" y="108" width="20" height="16" rx="3" fill="#334155" />
          <text x="272" y="122" fill="#4ade80" fontSize="17" fontWeight="bold">+</text>
          <text x="722" y="122" fill="#94a3b8" fontSize="19" fontWeight="bold">−</text>

          {/* ------- electrolyte ------- */}
          <rect x="360" y="124" width="280" height="336" fill="#22d3ee" opacity="0.07" />

          {/* ------- cathode ------- */}
          <rect x="228" y="124" width="132" height="336" rx="6" fill="url(#cathGrad)" stroke="#22c55e" strokeWidth="1.5" />
          {[152, 194, 236, 278, 320, 362, 404].map(y => (
            <line key={y} x1="238" y1={y} x2="350" y2={y} stroke="#052e16" strokeWidth="2" opacity="0.5" />
          ))}

          {/* ------- anode ------- */}
          <rect x="640" y="124" width="132" height="336" rx="6" fill="url(#anodeGrad)" stroke="#64748b" strokeWidth="1.5" />
          {[152, 194, 236, 278, 320, 362, 404].map(y => (
            <line key={y} x1="650" y1={y} x2="762" y2={y} stroke="#475569" strokeWidth="2" opacity="0.4" />
          ))}

          {/* ------- SEI layer on the anode surface ------- */}
          <rect x="626" y="124" width="14" height="336" fill="#f59e0b" opacity="0.55">
            <animate attributeName="opacity" values="0.35;0.7;0.35" dur="2.6s" repeatCount="indefinite" />
          </rect>

          {/* ------- separator ------- */}
          <rect x="492" y="124" width="16" height="336" fill="#e2e8f0" opacity="0.18" />
          <line x1="500" y1="124" x2="500" y2="460" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="7 9" opacity="0.7" />

          {/* ion direction arrow */}
          <line x1="420" y1="148" x2="580" y2="148" stroke="#67e8f9" strokeWidth="2" markerEnd="url(#arrow)" opacity="0.8" />
          <text x="500" y="140" textAnchor="middle" fill="#67e8f9" fontSize="13" fontFamily="monospace">
            Li⁺ · charging
          </text>

          {/* ------- moving Li+ ions ------- */}
          {ionTracks.map((t, i) => (
            <g key={i} filter="url(#cellGlow)">
              <circle r="10" fill="url(#ionGrad)" />
              <text y="4" textAnchor="middle" fill="#083344" fontSize="10" fontWeight="bold">Li⁺</text>
              <animateMotion dur={`${t.dur}s`} begin={`${t.begin}s`} repeatCount="indefinite" path={t.d} />
            </g>
          ))}

          {/* ------- labels ------- */}
          <text x="294" y="498" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="600">Cathode</text>
          <text x="294" y="518" textAnchor="middle" fill="#64748b" fontSize="12">NMC / LFP</text>

          <text x="500" y="498" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="600">Separator</text>
          <text x="500" y="518" textAnchor="middle" fill="#64748b" fontSize="12">porous membrane</text>

          <text x="706" y="498" textAnchor="middle" fill="#cbd5e1" fontSize="16" fontWeight="600">Anode</text>
          <text x="706" y="518" textAnchor="middle" fill="#64748b" fontSize="12">graphite</text>

          {/* SEI label with leader line */}
          <line x1="633" y1="460" x2="600" y2="536" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          <text x="594" y="552" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="600">SEI layer</text>

          <text x="410" y="475" textAnchor="middle" fill="#67e8f9" fontSize="12" opacity="0.8">electrolyte</text>
        </svg>

        <div className="text-center mt-5 space-y-2">
          <p className="text-base sm:text-lg text-gray-200">
            Inside every cell: Li⁺ ions shuttle from <span className="text-green-400 font-semibold">cathode</span> to{' '}
            <span className="text-gray-100 font-semibold">anode</span> while electrons take the long way through the charger.
          </p>
          <motion.p style={{ opacity: researchOpacity }} className="text-base sm:text-lg text-gray-300">
            The <span className="text-amber-400 font-semibold">SEI layer</span> grows, capacity fades —{' '}
            <span className="text-cyan-400 font-semibold">my research predicts exactly how</span>, with physics-informed AI.
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero — pinned scroll: car → zoom → BMS → cell chemistry            */
/* ------------------------------------------------------------------ */
const Hero = () => {
  const ref = useRef(null)
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < TITLE.length) {
        setTypedText(TITLE.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  })

  const textOpacity = useTransform(p, [0, 0.08], [1, 0])
  const textY = useTransform(p, [0, 0.08], [0, -60])
  const cueOpacity = useTransform(p, [0, 0.06], [1, 0])

  const carScale = useTransform(p, [0.06, 0.26], [1, 6])
  const carOpacity = useTransform(p, [0.2, 0.27], [1, 0])

  const bmsOpacity = useTransform(p, [0.27, 0.33, 0.5, 0.56], [0, 1, 1, 0])
  const bmsScale = useTransform(p, [0.27, 0.33], [0.92, 1])

  const cellOpacity = useTransform(p, [0.56, 0.63], [0, 1])
  const cellScale = useTransform(p, [0.56, 0.63], [0.9, 1])
  const researchOpacity = useTransform(p, [0.76, 0.86], [0, 1])

  return (
    <section id="home" ref={ref} className="relative h-[500vh] bg-transparent">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* soft glow blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        </div>

        {/* intro text — fades out as the dive begins */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-x-0 top-[10vh] z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <div className="text-[11px] sm:text-xs tracking-[0.4em] text-cyan-400/80 font-mono uppercase mb-3">
            Battery · AI · Research
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]">
              {NAME}
            </span>
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
            className="mx-auto mb-5 h-px w-48 sm:w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />

          <div className="text-xl sm:text-2xl text-gray-300 mb-5 h-9 flex items-center justify-center">
            <span className="border-r-2 border-cyan-400 pr-2 animate-pulse">
              {typedText}
            </span>
          </div>

          <p className="text-base sm:text-lg text-gray-300 mb-7 max-w-2xl mx-auto leading-relaxed">
            {SUMMARY}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <a
              href="#projects"
              className="group relative px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            >
              <span className="relative z-10">View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href={resumeUrl}
              download="Resume.pdf"
              className="px-7 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* scene 1: car + charger */}
        <CarScene carScale={carScale} carOpacity={carOpacity} />

        {/* scene 2: BMS */}
        <BmsScene bmsOpacity={bmsOpacity} bmsScale={bmsScale} />

        {/* scene 3: cell chemistry */}
        <CellScene cellOpacity={cellOpacity} cellScale={cellScale} researchOpacity={researchOpacity} />

        {/* scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-1 text-cyan-400"
        >
          <span className="text-xs uppercase tracking-widest text-gray-400">Scroll to look inside</span>
          <ChevronDown className="h-7 w-7 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
