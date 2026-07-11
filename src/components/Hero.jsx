import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Battery, HeartPulse, Zap, Thermometer, Activity, ShieldCheck } from 'lucide-react'

const NAME = 'Anshul Nagar'
const TITLE = 'Battery AI · PhD Scholar, CNU'
const SUMMARY =
  'PhD researcher in Electrical Engineering working on lithium-ion battery degradation, physics-informed neural networks, and battery management systems.'
const resumeUrl = '/assets/Resume.pdf'

/* ------------------------------------------------------------------ */
/* Scene 1 — EV + charger (vector, zooms into the under-floor pack)   */
/* ------------------------------------------------------------------ */
function Wheel({ cx }) {
  return (
    <g>
      {/* tire */}
      <circle cx={cx} cy="352" r="50" fill="url(#tireG)" stroke="#0b1220" strokeWidth="2" />
      {/* brake caliper peeking behind the rim */}
      <rect x={cx + 20} y="322" width="12" height="22" rx="4" fill="#0891b2" transform={`rotate(28 ${cx} 352)`} />
      {/* rim */}
      <circle cx={cx} cy="352" r="33" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
      {[0, 72, 144, 216, 288].map(a => (
        <g key={a} transform={`rotate(${a} ${cx} 352)`}>
          <path
            d={`M ${cx - 4} 352 L ${cx - 7} ${352 - 30} L ${cx + 7} ${352 - 30} L ${cx + 4} 352 Z`}
            fill="url(#wheelMetal)"
          />
        </g>
      ))}
      <circle cx={cx} cy="352" r="8" fill="#0ea5e9" />
      <circle cx={cx} cy="352" r="3.5" fill="#e0f2fe" />
    </g>
  )
}

function CarScene({ carScale, carOpacity }) {
  return (
    <motion.div
      style={{ opacity: carOpacity }}
      className="absolute inset-0 flex items-end justify-center pb-[4vh] pointer-events-none"
    >
      {/* transform origin = center of the battery pack */}
      <motion.div
        style={{ scale: carScale, transformOrigin: '52% 82%' }}
        className="relative w-[min(94vw,980px)]"
      >
        <svg viewBox="0 0 1000 440" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bodyPaint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7cb9f8" />
              <stop offset="28%" stopColor="#2563eb" />
              <stop offset="65%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0a1730" />
            </linearGradient>
            <linearGradient id="glassG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="roofLight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
              <stop offset="45%" stopColor="#a5f3fc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="packGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <radialGradient id="tireG" cx="0.5" cy="0.5" r="0.5">
              <stop offset="60%" stopColor="#0a0f1a" />
              <stop offset="88%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0a0f1a" />
            </radialGradient>
            <linearGradient id="wheelMetal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="60%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <radialGradient id="underGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
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
          <ellipse cx="520" cy="404" rx="360" ry="13" fill="#000" opacity="0.55" />
          <ellipse cx="520" cy="392" rx="340" ry="26" fill="url(#underGlow)" />

          {/* ---- charging station ---- */}
          <g>
            <rect x="42" y="212" width="66" height="160" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <rect x="42" y="212" width="66" height="160" rx="10" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />
            <rect x="52" y="228" width="46" height="30" rx="4" fill="#020617" stroke="#22d3ee" strokeWidth="1" />
            <text x="75" y="248" textAnchor="middle" fill="#a5f3fc" fontSize="13" fontFamily="monospace" fontWeight="bold">
              DC
              <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
            </text>
            <circle cx="75" cy="286" r="7" fill="#22d3ee" opacity="0.9" filter="url(#soft)">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <rect x="36" y="372" width="78" height="10" rx="4" fill="#1e293b" />
          </g>

          {/* cable + energy pulse into the front charge port */}
          <path
            d="M 100 310 C 150 378 198 318 248 302"
            fill="none" stroke="#164e63" strokeWidth="5" strokeLinecap="round"
          />
          <path
            d="M 100 310 C 150 378 198 318 248 302"
            fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 10"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="0.9s" repeatCount="indefinite" />
          </path>
          <circle r="5" fill="#a5f3fc" filter="url(#soft)">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 100 310 C 150 378 198 318 248 302" />
          </circle>

          {/* ---- the car (hand-drawn EV fastback) ---- */}
          {/* wheel-arch cutout shadows */}
          <circle cx="320" cy="352" r="59" fill="#05060a" />
          <circle cx="716" cy="352" r="59" fill="#05060a" />

          {/* body */}
          <path
            d="M 190 302
               C 246 290 292 284 336 278
               C 372 232 436 206 516 203
               C 588 201 654 214 700 240
               C 742 262 792 271 832 277
               C 860 282 872 296 871 315
               C 870 332 860 344 842 349
               L 773 349
               A 57 57 0 0 0 659 349
               L 377 349
               A 57 57 0 0 0 263 349
               L 206 349
               C 190 349 180 342 177 328
               C 174 314 179 306 190 302 Z"
            fill="url(#bodyPaint)"
          />
          {/* upper-body sheen */}
          <path
            d="M 210 296 C 260 288 300 283 340 277 C 376 234 438 209 516 206 C 586 204 648 217 694 242 L 688 250 C 640 227 584 215 516 217 C 444 220 388 244 354 284 L 214 302 Z"
            fill="#e0f2fe" opacity="0.07"
          />
          {/* roofline rim light */}
          <path
            d="M 336 278 C 372 232 436 206 516 203 C 588 201 654 214 700 240"
            fill="none" stroke="url(#roofLight)" strokeWidth="3" strokeLinecap="round"
          />

          {/* glass canopy */}
          <path
            d="M 358 277 C 392 236 448 214 516 211 C 582 209 642 222 684 247 L 666 256 L 382 280 Z"
            fill="url(#glassG)"
          />
          {/* glass reflections */}
          <line x1="424" y1="242" x2="472" y2="222" stroke="#e0f2fe" strokeWidth="5" opacity="0.18" strokeLinecap="round" />
          <line x1="450" y1="250" x2="512" y2="226" stroke="#e0f2fe" strokeWidth="2.5" opacity="0.22" strokeLinecap="round" />
          {/* pillars */}
          <line x1="452" y1="226" x2="434" y2="274" stroke="#0a1428" strokeWidth="4" opacity="0.85" />
          <line x1="584" y1="216" x2="580" y2="262" stroke="#0a1428" strokeWidth="4" opacity="0.85" />

          {/* door seams + flush lit handles */}
          <path d="M 470 268 C 468 300 467 324 466 349" stroke="#0a1428" strokeWidth="2" opacity="0.75" fill="none" />
          <path d="M 612 258 C 611 292 610 322 609 349" stroke="#0a1428" strokeWidth="2" opacity="0.75" fill="none" />
          <rect x="428" y="292" width="26" height="4" rx="2" fill="#93c5fd" opacity="0.55" />
          <rect x="560" y="288" width="26" height="4" rx="2" fill="#93c5fd" opacity="0.55" />

          {/* character line */}
          <path d="M 238 312 C 420 301 640 294 838 287" stroke="#93c5fd" strokeWidth="1.5" opacity="0.22" fill="none" />

          {/* rocker panel */}
          <rect x="388" y="338" width="262" height="11" rx="4" fill="#060b16" />

          {/* full-width DRL + headlight */}
          <path d="M 187 301 L 250 292" stroke="#e0f2fe" strokeWidth="3" strokeLinecap="round" filter="url(#soft)" opacity="0.95" />
          <path d="M 178 312 L 206 308 L 208 318 L 181 322 Z" fill="#bae6fd" filter="url(#soft)" opacity="0.85" />

          {/* taillight bar */}
          <rect x="856" y="288" width="13" height="28" rx="5" fill="#f43f5e" filter="url(#soft)" opacity="0.95" />
          <rect x="859" y="292" width="6" height="20" rx="3" fill="#fecdd3" opacity="0.9" />

          {/* side mirror */}
          <path d="M 372 262 L 358 250 Q 352 245 359 243 L 370 243 Q 376 248 376 255 Z" fill="#12203c" stroke="#2c4a7c" strokeWidth="1" />

          {/* charge port + pulse on the front fender */}
          <circle cx="252" cy="300" r="6" fill="#020617" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="252" cy="300" r="10" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="8;14" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* wheels */}
          <Wheel cx={320} />
          <Wheel cx={716} />

          {/* ---- battery pack under the floor (zoom target) ---- */}
          <g filter="url(#soft)">
            <rect x="388" y="350" width="264" height="22" rx="7" fill="url(#packGrad)" stroke="#93c5fd" strokeWidth="2" />
            {[1, 2, 3, 4, 5, 6].map(i => (
              <line
                key={i}
                x1={388 + i * 37.7} y1="353"
                x2={388 + i * 37.7} y2="369"
                stroke="#bfdbfe" strokeWidth="1.5" opacity="0.45"
              />
            ))}
            <rect x="388" y="350" width="264" height="22" rx="7" fill="#bfdbfe" opacity="0.12">
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
  { icon: Thermometer, label: 'Temp', value: '23 °C', color: 'text-blue-400', dot: 'bg-blue-400' },
  { icon: Activity, label: 'Balancing', value: 'Active', color: 'text-green-400', dot: 'bg-green-400' },
  { icon: ShieldCheck, label: 'Faults', value: '0', color: 'text-emerald-400', dot: 'bg-emerald-400' }
]

const bmsModules = [
  { x: 80, y: 60, cells: ['3.66', '3.67', '3.65', '3.66'], temp: 23, sense: 'M 290 106 L 360 106 L 360 216 L 430 216' },
  { x: 80, y: 350, cells: ['3.64', '3.66', '3.63', '3.65'], temp: 24, sense: 'M 290 396 L 360 396 L 360 284 L 430 284' },
  { x: 710, y: 60, cells: ['3.67', '3.68', '3.66', '3.67'], temp: 23, sense: 'M 710 106 L 640 106 L 640 216 L 570 216' },
  { x: 710, y: 350, cells: ['3.65', '3.66', '3.64', '3.66'], temp: 25, sense: 'M 710 396 L 640 396 L 640 284 L 570 284' }
]

function BmsModule({ m, i }) {
  return (
    <g>
      <rect x={m.x} y={m.y} width="210" height="92" rx="10" fill="#0b1220" stroke="#334155" strokeWidth="2" />
      <text x={m.x + 12} y={m.y + 19} fill="#94a3b8" fontSize="12" fontFamily="monospace">MODULE {i + 1}</text>
      {/* temp sensor dot */}
      <circle cx={m.x + 158} cy={m.y + 14} r="4" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" begin={`${-i * 0.5}s`} repeatCount="indefinite" />
      </circle>
      <text x={m.x + 198} y={m.y + 19} textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">{m.temp}°C</text>
      {/* four cells with balancing animation */}
      {m.cells.map((v, c) => (
        <g key={c}>
          <rect x={m.x + 12 + c * 48} y={m.y + 27} width="42" height="30" rx="4" fill="#122032" stroke="#1e3a4f" strokeWidth="1" />
          <rect x={m.x + 12 + c * 48} y={m.y + 27} width="42" height="30" rx="4" fill="#4ade80" opacity="0.3">
            <animate
              attributeName="opacity"
              values={`0.25;${0.35 + c * 0.08};0.25`}
              dur={`${2.4 + c * 0.5}s`}
              begin={`${-c * 0.6}s`}
              repeatCount="indefinite"
            />
          </rect>
          <text x={m.x + 33 + c * 48} y={m.y + 46} textAnchor="middle" fill="#a7f3d0" fontSize="10" fontFamily="monospace">{v}</text>
        </g>
      ))}
      <text x={m.x + 12} y={m.y + 78} fill="#4ade80" fontSize="11" fontFamily="monospace">14.62 V · balanced ✓</text>
    </g>
  )
}

function BmsScene({ bmsOpacity, bmsScale }) {
  return (
    <motion.div
      style={{ opacity: bmsOpacity, scale: bmsScale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
    >
      <div className="w-[min(92vw,860px)]">
        <svg viewBox="0 0 1000 540" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="bmsGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ---- HV power bus (series string through contactor + shunt) ---- */}
          <path d="M 185 60 L 185 39 L 440 39" fill="none" stroke="#b45309" strokeWidth="4" opacity="0.9" />
          <path d="M 560 39 L 815 39 L 815 60" fill="none" stroke="#b45309" strokeWidth="4" opacity="0.9" />
          <path d="M 185 442 L 185 501 L 440 501" fill="none" stroke="#b45309" strokeWidth="4" opacity="0.9" />
          <path d="M 560 501 L 815 501 L 815 442" fill="none" stroke="#b45309" strokeWidth="4" opacity="0.9" />
          {/* energy flow on the bus */}
          {[
            'M 185 60 L 185 39 L 440 39', 'M 560 39 L 815 39 L 815 60',
            'M 185 442 L 185 501 L 440 501', 'M 560 501 L 815 501 L 815 442'
          ].map((p, i) => (
            <circle key={p} r="4" fill="#fbbf24" filter="url(#bmsGlow)">
              <animateMotion dur="2.2s" begin={`${-i * 0.55}s`} repeatCount="indefinite" path={p} />
            </circle>
          ))}

          {/* ---- main contactor (top) ---- */}
          <rect x="440" y="14" width="120" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="500" y="32" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">MAIN CONTACTOR</text>
          <line x1="472" y1="52" x2="500" y2="40" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="470" cy="52" r="3" fill="#fbbf24" />
          <circle cx="528" cy="52" r="3" fill="#fbbf24" />
          <text x="540" y="56" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">ON</text>
          {/* contactor control line from chip */}
          <path d="M 500 196 L 500 64" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
          </path>

          {/* ---- current sensor (bottom) ---- */}
          <rect x="440" y="476" width="120" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="500" y="494" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">CURRENT SENSE</text>
          <text x="500" y="514" textAnchor="middle" fill="#fde68a" fontSize="12" fontFamily="monospace">
            I = 12.4 A
            <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
          </text>
          <path d="M 500 308 L 500 476" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.2s" repeatCount="indefinite" />
          </path>

          {/* ---- cell balancing block (left) ---- */}
          <rect x="80" y="222" width="190" height="62" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="94" y="242" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">CELL BALANCING</text>
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x={100 + i * 22} y="252" width="12" height="20" rx="2" fill="#4ade80" opacity="0.8">
              <animate attributeName="height" values="10;20;10" dur={`${1.2 + i * 0.3}s`} begin={`${-i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="y" values="262;252;262" dur={`${1.2 + i * 0.3}s`} begin={`${-i * 0.4}s`} repeatCount="indefinite" />
            </rect>
          ))}
          <text x="256" y="266" textAnchor="end" fill="#4ade80" fontSize="10" fontFamily="monospace">ΔV 12mV</text>
          <path d="M 270 253 L 430 253" fill="none" stroke="#1e3a4f" strokeWidth="2.5" />
          <circle r="4" fill="#22d3ee" filter="url(#bmsGlow)">
            <animateMotion dur="1.6s" repeatCount="indefinite" path="M 430 253 L 270 253" />
          </circle>

          {/* ---- CAN / telemetry block (right) ---- */}
          <rect x="730" y="222" width="190" height="62" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <text x="744" y="242" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">CAN · TELEMETRY</text>
          <text x="744" y="264" fill="#67e8f9" fontSize="11" fontFamily="monospace">500 kbit/s → VCU · ☁ cloud</text>
          <path d="M 570 253 L 730 253" fill="none" stroke="#1e3a4f" strokeWidth="2.5" strokeDasharray="6 5" />
          {[0, -0.7].map(b => (
            <rect key={b} x="-5" y="-3.5" width="10" height="7" rx="2" fill="#67e8f9" filter="url(#bmsGlow)">
              <animateMotion dur="1.4s" begin={`${b}s`} repeatCount="indefinite" path="M 570 253 L 730 253" />
            </rect>
          ))}

          {/* ---- V/T sense traces + data pulses ---- */}
          {bmsModules.map((m, i) => (
            <g key={i}>
              <path d={m.sense} fill="none" stroke="#1e3a4f" strokeWidth="3" />
              <circle r="4.5" fill="#22d3ee" filter="url(#bmsGlow)">
                <animateMotion dur="1.8s" begin={`${-i * 0.45}s`} repeatCount="indefinite" path={m.sense} />
              </circle>
            </g>
          ))}

          {/* ---- battery modules ---- */}
          {bmsModules.map((m, i) => (
            <BmsModule key={`mod${i}`} m={m} i={i} />
          ))}

          {/* ---- central BMS MCU ---- */}
          <g filter="url(#bmsGlow)">
            <rect x="430" y="196" width="140" height="112" rx="14" fill="#0f172a" stroke="#22d3ee" strokeWidth="2.5" />
          </g>
          {[210, 232, 254, 276, 294].map(y => (
            <g key={y}>
              <rect x="420" y={y} width="10" height="7" rx="2" fill="#475569" />
              <rect x="570" y={y} width="10" height="7" rx="2" fill="#475569" />
            </g>
          ))}
          <text x="500" y="238" textAnchor="middle" fill="#67e8f9" fontSize="27" fontWeight="bold" fontFamily="monospace">BMS</text>
          <text x="500" y="256" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">AFE · SoC/SoH · PROTECT</text>
          <polyline
            points="450,284 464,284 470,272 478,294 486,278 492,284 550,284"
            fill="none" stroke="#4ade80" strokeWidth="2"
          >
            <animate attributeName="opacity" values="1;0.25;1" dur="1.3s" repeatCount="indefinite" />
          </polyline>
        </svg>

        {/* live status chips */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-4">
          {bmsStats.map(s => (
            <div
              key={s.label}
              className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-gray-700/70 rounded-full px-3.5 py-1.5"
            >
              <s.icon className={`h-4 w-4 ${s.color}`} />
              <span className="text-xs text-gray-400">{s.label}</span>
              <span className={`text-sm font-bold font-mono ${s.color}`}>{s.value}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot} animate-pulse`} />
            </div>
          ))}
        </div>

        <p className="text-center text-sm sm:text-base text-gray-200 mt-5 max-w-2xl mx-auto">
          The <span className="text-cyan-400 font-semibold">BMS</span> senses every cell voltage and temperature,
          balances the pack, measures current, commands the contactor, and streams telemetry —
          <span className="text-gray-400"> the layer my Hyundai-project SoC / SoH algorithms live in.</span>
        </p>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Scene 3 — inside the cell: electrodes, separator, SEI, moving ions */
/* ------------------------------------------------------------------ */
const ionTracks = [
  { d: 'M 352 210 C 420 198 460 226 500 218 C 545 210 590 230 622 224', dur: 5.2, begin: 0 },
  { d: 'M 352 260 C 415 250 465 276 502 266 C 548 256 588 280 622 272', dur: 5.8, begin: -1.4 },
  { d: 'M 352 320 C 418 310 462 336 500 326 C 544 318 592 340 622 332', dur: 5.0, begin: -2.6 },
  { d: 'M 352 390 C 420 380 460 404 502 396 C 546 388 590 412 622 402', dur: 6.2, begin: -3.4 },
  { d: 'M 352 235 C 430 228 455 250 501 242 C 550 234 585 256 622 248', dur: 6.6, begin: -4.5 },
  { d: 'M 352 355 C 425 346 458 370 500 362 C 548 354 590 376 622 368', dur: 5.5, begin: -5.1 }
]

// electrolyte molecules: EC ring, DMC chain, PF6- anion
const molecules = [
  { type: 'EC', x: 398, y: 218 }, { type: 'DMC', x: 452, y: 262 },
  { type: 'PF6', x: 416, y: 318 }, { type: 'EC', x: 465, y: 392 },
  { type: 'DMC', x: 442, y: 430 }, { type: 'PF6', x: 585, y: 330 },
  { type: 'EC', x: 555, y: 425 }, { type: 'DMC', x: 605, y: 250 },
  { type: 'PF6', x: 545, y: 210 }
]

function MoleculeGlyph({ type }) {
  if (type === 'EC') {
    return <path d="M0 -6 L5.7 -1.8 L3.5 5 L-3.5 5 L-5.7 -1.8 Z" fill="none" stroke="#f0abfc" strokeWidth="1.5" />
  }
  if (type === 'DMC') {
    return <polyline points="-8,3 -4,-3 0,3 4,-3 8,3" fill="none" stroke="#f9a8d4" strokeWidth="1.5" />
  }
  return <path d="M0 -6 L0 6 M-5.2 -3 L5.2 3 M-5.2 3 L5.2 -3" stroke="#e879f9" strokeWidth="1.5" />
}

// intercalated Li+ sitting between graphite layers (fills during charge)
const anodeLi = [
  { x: 668, y: 165 }, { x: 706, y: 165 }, { x: 744, y: 165 },
  { x: 686, y: 207 }, { x: 724, y: 207 },
  { x: 668, y: 249 }, { x: 744, y: 249 },
  { x: 706, y: 291 }, { x: 686, y: 333 }, { x: 724, y: 375 }
]

function CellScene({ cellOpacity, cellScale, researchOpacity }) {
  return (
    <motion.div
      style={{ opacity: cellOpacity, scale: cellScale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none"
    >
      <div className="w-[min(94vw,860px)]">
        <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cathSlab" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="100%" stopColor="#0b1220" />
            </linearGradient>
            <linearGradient id="alG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="cuG" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <radialGradient id="ionGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ede9fe" />
              <stop offset="60%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6d28d9" />
            </radialGradient>
            <filter id="cellGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#4ade80" />
            </marker>
            <marker id="arrowRose" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#fb7185" />
            </marker>
          </defs>

          {/* ------- external circuit + charger ------- */}
          <path d="M 300 122 L 300 62 L 700 62 L 700 122" fill="none" stroke="#475569" strokeWidth="4" />
          {[0, -1, -2].map(b => (
            <circle key={b} r="4.5" fill="#fde047" filter="url(#cellGlow)">
              <animateMotion dur="3s" begin={`${b}s`} repeatCount="indefinite" path="M 300 122 L 300 62 L 700 62 L 700 122" />
            </circle>
          ))}
          <text x="368" y="50" fill="#fde047" fontSize="15" fontFamily="monospace">e⁻</text>

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

          {/* ------- current collectors ------- */}
          <rect x="214" y="124" width="14" height="336" rx="2" fill="url(#alG)" />
          <text x="221" y="116" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Al</text>
          <rect x="772" y="124" width="14" height="336" rx="2" fill="url(#cuG)" />
          <text x="779" y="116" textAnchor="middle" fill="#fdba74" fontSize="11" fontFamily="monospace">Cu</text>

          {/* ------- electrolyte ------- */}
          <rect x="360" y="124" width="280" height="336" fill="#22d3ee" opacity="0.06" />

          {/* electrolyte molecules (EC / DMC / PF6-) gently drifting */}
          {molecules.map((mol, i) => (
            <g key={i} transform={`translate(${mol.x} ${mol.y})`} opacity="0.8">
              <MoleculeGlyph type={mol.type} />
              <animateTransform
                attributeName="transform" type="translate" additive="sum"
                values="0 0; 0 -7; 0 0" dur={`${3.4 + (i % 4) * 0.7}s`} begin={`${-i * 0.5}s`} repeatCount="indefinite"
              />
            </g>
          ))}

          {/* ------- cathode: layered LiTMO2 sheets ------- */}
          <rect x="228" y="124" width="132" height="336" rx="6" fill="#04170c" stroke="#22c55e" strokeWidth="1.5" />
          {[140, 182, 224, 266, 308, 350, 392].map(y => (
            <g key={y}>
              <rect x="238" y={y} width="112" height="24" rx="3" fill="url(#cathSlab)" opacity="0.9" />
              {[0, 1, 2, 3].map(d => (
                <circle key={d} cx={254 + d * 27} cy={y + 12} r="2.2" fill="#bbf7d0" opacity="0.85" />
              ))}
            </g>
          ))}
          {/* Li+ leaving the cathode during charge */}
          {[200, 285, 370].map((y, i) => (
            <circle key={y} cx="352" cy={y} r="4.5" fill="#a78bfa">
              <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin={`${-i * 0.8}s`} repeatCount="indefinite" />
              <animate attributeName="cx" values="344;362" dur="2.4s" begin={`${-i * 0.8}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* ------- anode: graphite + SiOx with intercalated Li ------- */}
          <rect x="640" y="124" width="132" height="336" rx="6" fill="url(#anodeGrad)" stroke="#64748b" strokeWidth="1.5" />
          {[152, 194, 236, 278, 320, 362, 404].map(y => (
            <line key={y} x1="650" y1={y} x2="762" y2={y} stroke="#475569" strokeWidth="2.5" opacity="0.55" />
          ))}
          {anodeLi.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#a78bfa" opacity="0.9">
              {i % 3 === 0 && (
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" begin={`${-i * 0.4}s`} repeatCount="indefinite" />
              )}
            </circle>
          ))}

          {/* ------- SEI layer growing on the anode surface ------- */}
          <rect x="622" y="124" width="18" height="336" fill="#f59e0b" opacity="0.4">
            <animate attributeName="opacity" values="0.3;0.55;0.3" dur="2.6s" repeatCount="indefinite" />
          </rect>
          {[150, 195, 245, 290, 335, 385, 430].map((y, i) => (
            <circle key={y} cx={627 + (i % 3) * 4} cy={y} r={2.4 + (i % 3) * 0.7} fill="#fbbf24" opacity="0.85">
              {i % 2 === 0 && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" begin={`${-i * 0.6}s`} repeatCount="indefinite" />
              )}
            </circle>
          ))}

          {/* ------- separator ------- */}
          <rect x="492" y="124" width="16" height="336" fill="#e2e8f0" opacity="0.18" />
          <line x1="500" y1="124" x2="500" y2="460" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="7 9" opacity="0.7" />

          {/* charge / discharge direction arrows */}
          <line x1="418" y1="146" x2="582" y2="146" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" opacity="0.9" />
          <text x="500" y="138" textAnchor="middle" fill="#4ade80" fontSize="12" fontFamily="monospace">Li⁺ · charge</text>
          <line x1="582" y1="170" x2="418" y2="170" stroke="#fb7185" strokeWidth="2" markerEnd="url(#arrowRose)" opacity="0.5" />
          <text x="500" y="186" textAnchor="middle" fill="#fb7185" fontSize="11" fontFamily="monospace" opacity="0.65">Li⁺ · discharge</text>

          {/* ------- moving Li+ ions ------- */}
          {ionTracks.map((t, i) => (
            <g key={i} filter="url(#cellGlow)">
              <circle r="9" fill="url(#ionGrad)" />
              <text y="3.5" textAnchor="middle" fill="#2e1065" fontSize="9" fontWeight="bold">Li⁺</text>
              <animateMotion dur={`${t.dur}s`} begin={`${t.begin}s`} repeatCount="indefinite" path={t.d} />
            </g>
          ))}

          {/* ------- labels ------- */}
          <text x="294" y="498" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="600">Cathode</text>
          <text x="294" y="516" textAnchor="middle" fill="#64748b" fontSize="11">LiTMO₂ · NMC / LFP</text>

          <text x="500" y="498" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="600">Separator</text>
          <text x="500" y="516" textAnchor="middle" fill="#64748b" fontSize="11">porous membrane</text>

          <line x1="631" y1="460" x2="600" y2="484" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          <text x="592" y="498" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="600">SEI layer</text>
          <text x="592" y="514" textAnchor="middle" fill="#92702a" fontSize="10">grows with age</text>

          <text x="712" y="498" textAnchor="middle" fill="#cbd5e1" fontSize="16" fontWeight="600">Anode</text>
          <text x="712" y="516" textAnchor="middle" fill="#64748b" fontSize="11">Graphite + SiOₓ</text>

          <text x="410" y="475" textAnchor="middle" fill="#67e8f9" fontSize="12" opacity="0.8">electrolyte</text>

          {/* ------- legend ------- */}
          <g fontFamily="monospace" fontSize="11">
            <circle cx="270" cy="556" r="5" fill="url(#ionGrad)" />
            <text x="282" y="560" fill="#94a3b8">Li⁺</text>
            <g transform="translate(345 556)"><MoleculeGlyph type="PF6" /></g>
            <text x="357" y="560" fill="#94a3b8">PF₆⁻</text>
            <g transform="translate(435 556)"><MoleculeGlyph type="EC" /></g>
            <text x="447" y="560" fill="#94a3b8">Ethylene carbonate</text>
            <g transform="translate(615 556)"><MoleculeGlyph type="DMC" /></g>
            <text x="630" y="560" fill="#94a3b8">Dimethyl carbonate</text>
          </g>
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
