import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Battery, HeartPulse, Zap, Thermometer, Activity, ShieldCheck } from 'lucide-react'

const NAME = 'Anshul Nagar'
const TITLE = 'Battery AI · PhD Scholar, CNU'
const SUMMARY =
  'PhD researcher in Electrical Engineering working on lithium-ion battery degradation, physics-informed neural networks, and battery management systems.'
const resumeUrl = '/assets/Resume.pdf'

/* ------------------------------------------------------------------ */
/* Scene 1 — EV cutaway photo + charger (zooms into the floor pack)   */
/* ------------------------------------------------------------------ */
function CarScene({ carScale, carOpacity }) {
  return (
    <motion.div
      style={{ opacity: carOpacity }}
      className="absolute inset-0 flex items-end justify-center pb-[4vh] pointer-events-none"
    >
      {/* transform origin = center of the battery pack in the photo */}
      <motion.div
        style={{ scale: carScale, transformOrigin: '61% 75%' }}
        className="relative w-[min(96vw,1080px)]"
      >
        <svg viewBox="0 0 1000 440" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="underGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="chargerBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="45%" stopColor="#cbd5e1" />
              <stop offset="80%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <linearGradient id="chargerSide" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="chargerTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ground + shadow + glow */}
          <line x1="10" y1="408" x2="990" y2="408" stroke="#1f2937" strokeWidth="2" />
          <ellipse cx="610" cy="408" rx="385" ry="13" fill="#000" opacity="0.5" />
          <ellipse cx="610" cy="396" rx="355" ry="26" fill="url(#underGlow)" />

          {/* ---- DC fast-charge station (metallic, matches the photo) ---- */}
          <g>
            {/* shadow */}
            <ellipse cx="64" cy="406" rx="62" ry="8" fill="#000" opacity="0.45" />
            {/* dark side face for depth */}
            <path d="M 104 158 L 122 170 L 122 392 L 104 402 Z" fill="url(#chargerSide)" />
            {/* main body */}
            <rect x="14" y="152" width="92" height="252" rx="14" fill="url(#chargerBody)" stroke="#334155" strokeWidth="1.5" />
            {/* rounded top cap */}
            <path d="M 14 172 Q 14 148 38 148 L 82 148 Q 106 148 106 172 L 106 178 L 14 178 Z" fill="url(#chargerTop)" stroke="#334155" strokeWidth="1" />
            {/* screen bezel + display */}
            <rect x="26" y="188" width="68" height="86" rx="8" fill="#0b1220" stroke="#1e293b" strokeWidth="2" />
            <rect x="31" y="194" width="58" height="74" rx="5" fill="#020617" />
            <text x="60" y="222" textAnchor="middle" fill="#a5f3fc" fontSize="16" fontFamily="monospace" fontWeight="bold">
              DC
              <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" />
            </text>
            <text x="60" y="242" textAnchor="middle" fill="#4ade80" fontSize="11" fontFamily="monospace">
              250 kW
              <animate attributeName="opacity" values="1;0.55;1" dur="2s" repeatCount="indefinite" />
            </text>
            {/* charge progress bar on screen */}
            <rect x="38" y="252" width="44" height="6" rx="3" fill="#0f172a" stroke="#164e63" strokeWidth="0.8" />
            <rect x="38" y="252" width="30" height="6" rx="3" fill="#22d3ee">
              <animate attributeName="width" values="8;44;8" dur="4s" repeatCount="indefinite" />
            </rect>
            {/* status LED */}
            <circle cx="60" cy="296" r="8" fill="#22d3ee" opacity="0.9" filter="url(#soft)">
              <animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite" />
            </circle>
            {/* accent stripe */}
            <rect x="22" y="316" width="76" height="4" rx="2" fill="#0ea5e9" opacity="0.75" />
            {/* cable holster */}
            <rect x="88" y="330" width="22" height="34" rx="6" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            {/* base plinth */}
            <rect x="6" y="398" width="116" height="12" rx="5" fill="#1e293b" />
          </g>

          {/* ---- the car (cutaway photo) ---- */}
          <image
            href="/hero/ev-cutaway.png"
            x="225" y="115" width="770" height="293"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* cable + energy pulse into the front charge port (drawn over the car) */}
          <path
            d="M 100 350 C 175 412 285 336 376 272"
            fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round"
          />
          <path
            d="M 100 350 C 175 412 285 336 376 272"
            fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 10"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="0.9s" repeatCount="indefinite" />
          </path>
          <circle r="5" fill="#a5f3fc" filter="url(#soft)">
            <animateMotion dur="1.4s" repeatCount="indefinite" path="M 100 350 C 175 412 285 336 376 272" />
          </circle>

          {/* charge port + pulse on the front fender */}
          <circle cx="378" cy="270" r="6" fill="#020617" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="378" cy="270" r="10" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="8;16" dur="1.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* subtle pulse over the real battery pack in the photo (zoom target) */}
          <rect x="435" y="298" width="355" height="66" rx="10" fill="#38bdf8" opacity="0.05">
            <animate attributeName="opacity" values="0.03;0.12;0.03" dur="2.2s" repeatCount="indefinite" />
          </rect>
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
      {/* metal casing */}
      <g filter="url(#bmsShadow)">
        <rect x={m.x} y={m.y} width="210" height="92" rx="10" fill="url(#modCase)" stroke="#0b1220" strokeWidth="1.5" />
      </g>
      <rect x={m.x + 3} y={m.y + 3} width="204" height="6" rx="3" fill="#e2e8f0" opacity="0.14" />
      {/* label plate + temp sensor */}
      <rect x={m.x + 8} y={m.y + 6} width="96" height="15" rx="3" fill="#0b1220" opacity="0.85" />
      <text x={m.x + 14} y={m.y + 17} fill="#94a3b8" fontSize="10" fontFamily="monospace">MODULE {i + 1}</text>
      <rect x={m.x + 138} y={m.y + 6} width="64" height="15" rx="3" fill="#0b1220" opacity="0.85" />
      <circle cx={m.x + 147} cy={m.y + 13.5} r="3.5" fill="#3b82f6">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" begin={`${-i * 0.5}s`} repeatCount="indefinite" />
      </circle>
      <text x={m.x + 196} y={m.y + 17} textAnchor="end" fill="#93c5fd" fontSize="10" fontFamily="monospace">{m.temp}°C</text>
      {/* series busbar strap across the cell terminals */}
      <rect x={m.x + 14} y={m.y + 23} width="182" height="5" rx="2.5" fill="url(#copperHV)" opacity="0.95" />
      {/* four prismatic cells */}
      {m.cells.map((v, c) => (
        <g key={c}>
          {/* metal can */}
          <rect x={m.x + 12 + c * 48} y={m.y + 25} width="42" height="36" rx="3" fill="url(#cellCanG)" stroke="#334155" strokeWidth="1" />
          {/* terminals */}
          <circle cx={m.x + 20 + c * 48} cy={m.y + 25.5} r="2.4" fill="url(#copperHV)" stroke="#78350f" strokeWidth="0.6" />
          <circle cx={m.x + 46 + c * 48} cy={m.y + 25.5} r="2.4" fill="#e2e8f0" stroke="#475569" strokeWidth="0.6" />
          {/* voltage window */}
          <rect x={m.x + 16 + c * 48} y={m.y + 36} width="34" height="13" rx="2" fill="#0b1220" />
          <text x={m.x + 33 + c * 48} y={m.y + 46} textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">{v}</text>
          {/* balancing glow strip */}
          <rect x={m.x + 16 + c * 48} y={m.y + 53} width="34" height="4" rx="2" fill="#4ade80" opacity="0.3">
            <animate
              attributeName="opacity"
              values={`0.2;${0.5 + c * 0.1};0.2`}
              dur={`${2.4 + c * 0.5}s`}
              begin={`${-c * 0.6}s`}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
      {/* status plate */}
      <rect x={m.x + 10} y={m.y + 66} width="190" height="18" rx="4" fill="#0b1220" opacity="0.85" />
      <text x={m.x + 18} y={m.y + 79} fill="#4ade80" fontSize="11" fontFamily="monospace">14.62 V · balanced ✓</text>
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
            <filter id="bmsShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
            </filter>
            <linearGradient id="modCase" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="45%" stopColor="#293548" />
              <stop offset="100%" stopColor="#141c2b" />
            </linearGradient>
            <linearGradient id="cellCanG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="55%" stopColor="#8ea0b5" />
              <stop offset="100%" stopColor="#5b6b80" />
            </linearGradient>
            <linearGradient id="copperHV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="steelG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#5c6b80" />
              <stop offset="100%" stopColor="#2b3648" />
            </linearGradient>
            <linearGradient id="pcbBoard" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10412c" />
              <stop offset="100%" stopColor="#072116" />
            </linearGradient>
          </defs>

          {/* ---- pack enclosure tray ---- */}
          <rect x="16" y="4" width="968" height="532" rx="18" fill="#0a0f16" stroke="#263242" strokeWidth="2" />
          <rect x="24" y="12" width="952" height="516" rx="14" fill="none" stroke="#1a2434" strokeWidth="1" />
          {[[38, 26], [962, 26], [38, 514], [962, 514]].map(([bx, by]) => (
            <g key={`${bx}-${by}`}>
              <circle cx={bx} cy={by} r="6" fill="url(#steelG)" stroke="#0b1220" strokeWidth="1" />
              <line x1={bx - 3} y1={by} x2={bx + 3} y2={by} stroke="#0b1220" strokeWidth="1.2" />
              <line x1={bx} y1={by - 3} x2={bx} y2={by + 3} stroke="#0b1220" strokeWidth="1.2" />
            </g>
          ))}
          <text x="60" y="30" fill="#3b4a61" fontSize="10" fontFamily="monospace" letterSpacing="2">EV PACK · BMS</text>

          {/* ---- HV power bus (copper busbars through contactor + shunt) ---- */}
          <path d="M 185 60 L 185 39 L 440 39" fill="none" stroke="url(#copperHV)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 560 39 L 815 39 L 815 60" fill="none" stroke="url(#copperHV)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 185 442 L 185 501 L 440 501" fill="none" stroke="url(#copperHV)" strokeWidth="6" strokeLinecap="round" />
          <path d="M 560 501 L 815 501 L 815 442" fill="none" stroke="url(#copperHV)" strokeWidth="6" strokeLinecap="round" />
          {/* bolted lugs where the bus meets the modules */}
          {[[185, 58], [815, 58], [185, 444], [815, 444]].map(([lx, ly]) => (
            <circle key={`${lx}-${ly}`} cx={lx} cy={ly} r="5" fill="url(#copperHV)" stroke="#78350f" strokeWidth="1.2" />
          ))}
          {/* energy flow on the bus */}
          {[
            'M 185 60 L 185 39 L 440 39', 'M 560 39 L 815 39 L 815 60',
            'M 185 442 L 185 501 L 440 501', 'M 560 501 L 815 501 L 815 442'
          ].map((p, i) => (
            <circle key={p} r="4" fill="#fbbf24" filter="url(#bmsGlow)">
              <animateMotion dur="2.2s" begin={`${-i * 0.55}s`} repeatCount="indefinite" path={p} />
            </circle>
          ))}

          {/* ---- main contactor (top): sealed HV relay ---- */}
          <g filter="url(#bmsShadow)">
            <rect x="440" y="14" width="120" height="50" rx="8" fill="url(#steelG)" stroke="#0b1220" strokeWidth="1.5" />
          </g>
          <rect x="446" y="19" width="108" height="15" rx="4" fill="#0b1220" opacity="0.9" />
          <text x="500" y="30" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">MAIN CONTACTOR</text>
          {/* copper terminal studs + switch arm */}
          <circle cx="458" cy="52" r="4.5" fill="url(#copperHV)" stroke="#78350f" strokeWidth="1" />
          <circle cx="510" cy="52" r="4.5" fill="url(#copperHV)" stroke="#78350f" strokeWidth="1" />
          <line x1="461" y1="50" x2="506" y2="42" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <circle cx="534" cy="51" r="3.5" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="552" y="55" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="monospace">ON</text>
          {/* contactor control line from chip */}
          <path d="M 500 186 L 500 64" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1s" repeatCount="indefinite" />
          </path>

          {/* ---- current sensor (bottom): busbar shunt ---- */}
          <g filter="url(#bmsShadow)">
            <rect x="440" y="476" width="120" height="50" rx="8" fill="url(#steelG)" stroke="#0b1220" strokeWidth="1.5" />
          </g>
          <rect x="446" y="481" width="108" height="14" rx="4" fill="#0b1220" opacity="0.9" />
          <text x="500" y="492" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">CURRENT SENSE</text>
          {/* shunt bar with bolted ends */}
          <rect x="455" y="499" width="90" height="8" rx="3" fill="url(#copperHV)" stroke="#78350f" strokeWidth="0.8" />
          <circle cx="461" cy="503" r="3" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />
          <circle cx="539" cy="503" r="3" fill="#e2e8f0" stroke="#475569" strokeWidth="0.8" />
          <text x="500" y="521" textAnchor="middle" fill="#fde68a" fontSize="11" fontFamily="monospace">
            I = 12.4 A
            <animate attributeName="opacity" values="1;0.5;1" dur="1.8s" repeatCount="indefinite" />
          </text>
          <path d="M 500 318 L 500 476" fill="none" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.7">
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.2s" repeatCount="indefinite" />
          </path>

          {/* ---- cell balancing block (left) ---- */}
          <rect x="80" y="222" width="190" height="62" rx="8" fill="#0d1420" stroke="#475569" strokeWidth="1.5" filter="url(#bmsShadow)" />
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
          <rect x="730" y="222" width="190" height="62" rx="8" fill="#0d1420" stroke="#475569" strokeWidth="1.5" filter="url(#bmsShadow)" />
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

          {/* ---- central BMS controller: green PCB + QFP chip ---- */}
          <g filter="url(#bmsShadow)">
            <rect x="418" y="186" width="164" height="132" rx="10" fill="url(#pcbBoard)" stroke="#14532d" strokeWidth="2" />
          </g>
          {/* copper traces on the board */}
          <g stroke="#1c7a44" strokeWidth="1.2" fill="none" opacity="0.65">
            <path d="M 432 206 L 452 206 L 452 222" />
            <path d="M 568 206 L 548 206 L 548 222" />
            <path d="M 432 298 L 452 298 L 452 284" />
            <path d="M 568 298 L 548 298 L 548 284" />
            <path d="M 500 186 L 500 214" />
            <path d="M 500 290 L 500 318" />
          </g>
          {/* mounting holes */}
          {[[430, 198], [570, 198], [430, 306], [570, 306]].map(([hx, hy]) => (
            <circle key={`${hx}-${hy}`} cx={hx} cy={hy} r="4" fill="#020617" stroke="#a16207" strokeWidth="1.5" />
          ))}
          {/* gold edge pads */}
          {[210, 232, 254, 276, 294].map(y => (
            <g key={y}>
              <rect x="410" y={y} width="10" height="7" rx="1.5" fill="url(#copperHV)" />
              <rect x="580" y={y} width="10" height="7" rx="1.5" fill="url(#copperHV)" />
            </g>
          ))}
          {/* SMD passives */}
          {[[462, 210], [530, 210], [448, 250], [552, 250], [470, 296], [524, 296]].map(([sx, sy]) => (
            <rect key={`${sx}-${sy}`} x={sx} y={sy} width="7" height="4" rx="1" fill="#8a6d1e" stroke="#3f2d08" strokeWidth="0.5" />
          ))}
          {/* the MCU chip */}
          <rect x="456" y="216" width="88" height="70" rx="5" fill="#0b0f14" stroke="#1f2937" strokeWidth="1.5" filter="url(#bmsGlow)" />
          {/* chip pins */}
          {[224, 236, 248, 260, 272].map(y => (
            <g key={y}>
              <rect x="450" y={y} width="6" height="3.5" fill="#d4b45a" />
              <rect x="544" y={y} width="6" height="3.5" fill="#d4b45a" />
            </g>
          ))}
          {[470, 486, 502, 518, 532].map(x => (
            <g key={x}>
              <rect x={x} y="210" width="3.5" height="6" fill="#d4b45a" />
              <rect x={x} y="286" width="3.5" height="6" fill="#d4b45a" />
            </g>
          ))}
          <circle cx="466" cy="226" r="2.5" fill="#1f2937" />
          <text x="500" y="248" textAnchor="middle" fill="#67e8f9" fontSize="22" fontWeight="bold" fontFamily="monospace">BMS</text>
          <text x="500" y="263" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">AFE · SoC/SoH · PROTECT</text>
          <polyline
            points="466,276 476,276 481,267 487,283 493,271 497,276 534,276"
            fill="none" stroke="#4ade80" strokeWidth="1.8"
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
  { type: 'DMC', x: 470, y: 438 }, { type: 'PF6', x: 585, y: 330 },
  { type: 'EC', x: 555, y: 425 }, { type: 'DMC', x: 605, y: 250 },
  { type: 'PF6', x: 545, y: 210 }, { type: 'EC', x: 380, y: 442 },
  { type: 'DMC', x: 475, y: 198 }, { type: 'PF6', x: 442, y: 240 },
  { type: 'EC', x: 610, y: 300 }, { type: 'DMC', x: 572, y: 372 },
  { type: 'PF6', x: 390, y: 368 }
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
  { x: 668, y: 165 }, { x: 706, y: 165 }, { x: 744, y: 165 }, { x: 788, y: 165 },
  { x: 686, y: 207 }, { x: 724, y: 207 }, { x: 768, y: 207 },
  { x: 668, y: 249 }, { x: 744, y: 249 }, { x: 796, y: 249 },
  { x: 706, y: 291 }, { x: 762, y: 291 },
  { x: 686, y: 333 }, { x: 778, y: 333 },
  { x: 724, y: 375 }, { x: 756, y: 417 }, { x: 694, y: 417 }
]

// SiOx secondary particles blended into the graphite anode
const sioxParticles = [
  { x: 676, y: 186, r: 6 }, { x: 742, y: 228, r: 5 }, { x: 700, y: 312, r: 7 },
  { x: 788, y: 270, r: 5.5 }, { x: 668, y: 396, r: 6 }, { x: 800, y: 354, r: 6.5 },
  { x: 730, y: 438, r: 5 }
]

// C-rate presets for the interactive cell playground (≈3.4 Ah cell)
const cRates = [
  { label: '0.5C', amps: 1.7, durMul: 1.7 },
  { label: '1C', amps: 3.4, durMul: 1 },
  { label: '2C', amps: 6.8, durMul: 0.55 }
]

function CellScene({ cellOpacity, cellScale, researchOpacity }) {
  const [mode, setMode] = useState('charge')
  const [rateIdx, setRateIdx] = useState(1)
  const [aged, setAged] = useState(false)
  const [runaway, setRunaway] = useState(false)
  const [temp, setTemp] = useState(25)

  // thermal runaway: temperature climbs exponentially, resets when disarmed
  useEffect(() => {
    if (!runaway) {
      setTemp(25)
      return
    }
    const t = setInterval(() => {
      setTemp(prev => (prev < 760 ? Math.min(800, Math.round(prev * 1.22 + 6)) : 800))
    }, 240)
    return () => clearInterval(t)
  }, [runaway])

  // controls only clickable while the scene is actually visible
  const controlsPE = useTransform(cellOpacity, v => (v > 0.4 ? 'auto' : 'none'))

  const discharging = mode === 'discharge'
  const { amps, durMul, label: rateLabel } = cRates[rateIdx]
  const volts = runaway ? 4.92 : discharging ? [3.62, 3.48, 3.21][rateIdx] : [3.92, 4.05, 4.2][rateIdx]
  const soh = aged ? 78 : 100

  const btnCls = (active, activeCls) =>
    `px-3.5 py-1.5 rounded-full text-xs font-mono border transition-all duration-200 ${
      active
        ? `bg-white/10 ${activeCls}`
        : 'text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
    }`

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
            <radialGradient id="cathParticle" cx="0.35" cy="0.35" r="0.75">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="55%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14532d" />
            </radialGradient>
            <radialGradient id="sioxG" cx="0.35" cy="0.35" r="0.75">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="60%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </radialGradient>
            <radialGradient id="heatGrad" cx="0.5" cy="0.5" r="0.65">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#ef4444" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
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
          {!runaway && [0, -1, -2].map(b => (
            <circle key={`${b}-${mode}-${rateIdx}`} r="4.5" fill="#fde047" filter="url(#cellGlow)">
              <animateMotion
                dur={`${3 * durMul}s`}
                begin={`${b * durMul}s`}
                repeatCount="indefinite"
                path="M 300 122 L 300 62 L 700 62 L 700 122"
                calcMode="linear"
                keyPoints={discharging ? '1;0' : '0;1'}
                keyTimes="0;1"
              />
            </circle>
          ))}
          <text x="368" y="50" fill="#fde047" fontSize="15" fontFamily="monospace">e⁻</text>

          <g filter="url(#cellGlow)">
            <rect x="436" y="30" width="128" height="60" rx="10" fill="#0f172a" stroke={runaway ? '#ef4444' : '#22d3ee'} strokeWidth="2" />
          </g>
          <text x="500" y="56" textAnchor="middle" fill={runaway ? '#f87171' : '#facc15'} fontSize="18">⚡</text>
          <text x="500" y="78" textAnchor="middle" fill={runaway ? '#f87171' : '#67e8f9'} fontSize="13" fontFamily="monospace" fontWeight="bold">
            {runaway ? 'FAULT' : discharging ? 'DISCHARGING' : 'CHARGING'}
          </text>

          {/* terminals */}
          <rect x="290" y="108" width="20" height="16" rx="3" fill="#166534" />
          <rect x="690" y="108" width="20" height="16" rx="3" fill="#334155" />
          <text x="272" y="122" fill="#4ade80" fontSize="17" fontWeight="bold">+</text>
          <text x="722" y="122" fill="#94a3b8" fontSize="19" fontWeight="bold">−</text>

          {/* ------- current collectors ------- */}
          <rect x="150" y="124" width="14" height="336" rx="2" fill="url(#alG)" />
          <text x="157" y="116" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Al</text>
          <rect x="822" y="124" width="14" height="336" rx="2" fill="url(#cuG)" />
          <text x="829" y="116" textAnchor="middle" fill="#fdba74" fontSize="11" fontFamily="monospace">Cu</text>

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

          {/* ------- cathode: layered LiTMO2 with secondary particles ------- */}
          <rect x="164" y="124" width="196" height="336" rx="6" fill="#04170c" stroke="#22c55e" strokeWidth="1.5" />
          {[140, 182, 224, 266, 308, 350, 392].map((y, row) => (
            <g key={y}>
              <rect x="174" y={y} width="176" height="24" rx="3" fill="url(#cathSlab)" opacity="0.55" />
              {[0, 1, 2, 3, 4].map(d => (
                <circle
                  key={d}
                  cx={192 + d * 36 + (row % 2) * 14}
                  cy={y + 12}
                  r="8.5"
                  fill="url(#cathParticle)"
                  stroke="#052e16"
                  strokeWidth="0.8"
                />
              ))}
            </g>
          ))}
          {/* one cracked particle — degradation in the making */}
          <polyline points="240,270 246,277 243,283 249,289" fill="none" stroke="#04170c" strokeWidth="1.6" opacity="0.9" />
          {aged && (
            <g>
              <polyline points="203,182 209,189 206,195 212,201" fill="none" stroke="#04170c" strokeWidth="1.6" opacity="0.9" />
              <polyline points="294,354 300,361 297,367 303,373" fill="none" stroke="#04170c" strokeWidth="1.6" opacity="0.9" />
              <polyline points="315,144 321,151 318,157 324,163" fill="none" stroke="#04170c" strokeWidth="1.6" opacity="0.9" />
            </g>
          )}
          <line x1="212" y1="440" x2="238" y2="452" stroke="#22c55e" strokeWidth="1" opacity="0.5" />
          <text x="252" y="456" fill="#4ade80" fontSize="9" fontFamily="monospace" opacity="0.75">
            {aged ? 'particle cracks ↑' : 'particle crack'}
          </text>
          {/* Li+ crossing the cathode surface */}
          {!runaway && [200, 285, 370].map((y, i) => (
            <circle key={`${y}-${mode}`} cx="352" cy={y} r="4.5" fill="#a78bfa">
              <animate attributeName="opacity" values="0;1;0" dur={`${2.4 * durMul}s`} begin={`${-i * 0.8 * durMul}s`} repeatCount="indefinite" />
              <animate
                attributeName="cx"
                values={discharging ? '362;344' : '344;362'}
                dur={`${2.4 * durMul}s`}
                begin={`${-i * 0.8 * durMul}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* ------- anode: graphite + SiOx with intercalated Li ------- */}
          <rect x="640" y="124" width="182" height="336" rx="6" fill="url(#anodeGrad)" stroke="#64748b" strokeWidth="1.5" />
          {[152, 194, 236, 278, 320, 362, 404, 446].map(y => (
            <line key={y} x1="650" y1={y} x2="812" y2={y} stroke="#475569" strokeWidth="2.5" opacity="0.55" />
          ))}
          {sioxParticles.map((p, i) => (
            <circle key={`s${i}`} cx={p.x} cy={p.y} r={p.r} fill="url(#sioxG)" stroke="#1e293b" strokeWidth="0.8" opacity="0.95" />
          ))}
          {/* aged cell loses cyclable lithium */}
          {anodeLi.filter((_, i) => !aged || i % 4 !== 3).map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#a78bfa" opacity="0.9">
              {i % 3 === 0 && (
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" begin={`${-i * 0.4}s`} repeatCount="indefinite" />
              )}
            </circle>
          ))}

          {/* ------- SEI: double layer growing on the anode surface ------- */}
          {/* outer organic layer (porous polymers) — thickens with age */}
          <rect x={aged ? 602 : 614} y="124" width={aged ? 26 : 14} height="336" fill="#f59e0b" opacity="0.28">
            <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2.6s" repeatCount="indefinite" />
          </rect>
          {/* inner inorganic layer (dense LiF / Li2CO3) */}
          <rect x={aged ? 624 : 628} y="124" width={aged ? 16 : 12} height="336" fill="#fbbf24" opacity="0.5">
            <animate attributeName="opacity" values="0.4;0.62;0.4" dur="2.6s" repeatCount="indefinite" />
          </rect>
          {/* inorganic micro-grains */}
          {[138, 168, 198, 228, 258, 288, 318, 348, 378, 408, 438].map((y, i) => (
            <rect
              key={`g${y}`}
              x={(aged ? 626 : 629) + (i % 2) * 5}
              y={y}
              width="4.5"
              height="6"
              rx="1"
              fill="#fcd34d"
              opacity="0.8"
            />
          ))}
          {/* bumpy organic blobs on the electrolyte side */}
          {[150, 195, 245, 290, 335, 385, 430].map((y, i) => (
            <circle key={y} cx={(aged ? 600 : 612) + (i % 3) * 4} cy={y} r={2.6 + (i % 3) * 0.8} fill="#f59e0b" opacity="0.75">
              {i % 2 === 0 && (
                <animate attributeName="opacity" values="0.35;0.95;0.35" dur="3s" begin={`${-i * 0.6}s`} repeatCount="indefinite" />
              )}
            </circle>
          ))}
          {/* dead lithium stranded outside the SEI */}
          {(aged
            ? [148, 176, 220, 262, 306, 356, 394, 414, 442]
            : [176, 262, 356, 414]
          ).map((y, i) => (
            <circle key={`dl${y}`} cx={(aged ? 592 : 600) + (i % 3) * 5} cy={y} r="2.2" fill="#c4b5fd" opacity="0.65" />
          ))}
          {/* gas bubbles from electrolyte decomposition */}
          <circle cx="596" cy="150" r="4" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.5">
            <animate attributeName="cy" values="150;134" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="588" cy="205" r="2.6" fill="none" stroke="#94a3b8" strokeWidth="1" opacity="0.4">
            <animate attributeName="cy" values="205;186" dur="5s" begin="-2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0" dur="5s" begin="-2s" repeatCount="indefinite" />
          </circle>
          {/* SEI sublayer tags */}
          <text x="621" y="168" fill="#f59e0b" fontSize="8" fontFamily="monospace" opacity="0.85" transform="rotate(-90 621 168)">organic</text>
          <text x="637" y="182" fill="#fcd34d" fontSize="8" fontFamily="monospace" opacity="0.9" transform="rotate(-90 637 182)">inorganic</text>

          {/* ------- separator (porous membrane) ------- */}
          <rect x="492" y="124" width="16" height="336" fill="#e2e8f0" opacity="0.18" />
          <line x1="500" y1="124" x2="500" y2="460" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="7 9" opacity="0.7" />
          {[158, 205, 252, 299, 346, 393, 440].map((y, i) => (
            <ellipse key={`p${y}`} cx={i % 2 === 0 ? 496.5 : 503.5} cy={y} rx="2.4" ry="4" fill="#020617" opacity="0.55" />
          ))}

          {/* ------- solvated Li+ with its EC shell ------- */}
          <g opacity="0.9">
            <circle cx="412" cy="412" r="17" fill="none" stroke="#a78bfa" strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
            <circle cx="412" cy="412" r="5.5" fill="url(#ionGrad)" />
            {[30, 150, 270].map(a => (
              <g key={a} transform={`rotate(${a} 412 412) translate(412 399)`}>
                <path d="M0 -4.5 L4.3 -1.3 L2.6 3.7 L-2.6 3.7 L-4.3 -1.3 Z" fill="none" stroke="#f0abfc" strokeWidth="1.2" />
              </g>
            ))}
            <text x="412" y="444" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontFamily="monospace" opacity="0.8">solvated Li⁺</text>
          </g>

          {/* charge / discharge direction arrows */}
          <line x1="418" y1="146" x2="582" y2="146" stroke="#4ade80" strokeWidth="2" markerEnd="url(#arrowGreen)" opacity={discharging ? 0.25 : 0.9} />
          <text x="500" y="138" textAnchor="middle" fill="#4ade80" fontSize="12" fontFamily="monospace" opacity={discharging ? 0.4 : 1}>Li⁺ · charge</text>
          <line x1="582" y1="170" x2="418" y2="170" stroke="#fb7185" strokeWidth="2" markerEnd="url(#arrowRose)" opacity={discharging ? 0.9 : 0.35} />
          <text x="500" y="186" textAnchor="middle" fill="#fb7185" fontSize="11" fontFamily="monospace" opacity={discharging ? 1 : 0.55}>Li⁺ · discharge</text>

          {/* ------- moving Li+ ions ------- */}
          {ionTracks.map((t, i) => (
            <g key={`${i}-${mode}-${rateIdx}`} filter="url(#cellGlow)">
              <circle r="9" fill="url(#ionGrad)" />
              <text y="3.5" textAnchor="middle" fill="#2e1065" fontSize="9" fontWeight="bold">Li⁺</text>
              <animateMotion
                dur={`${t.dur * durMul}s`}
                begin={`${t.begin * durMul}s`}
                repeatCount="indefinite"
                path={t.d}
                calcMode="linear"
                keyPoints={discharging ? '1;0' : '0;1'}
                keyTimes="0;1"
              />
            </g>
          ))}

          {/* ------- thermal runaway overlay ------- */}
          {runaway && (
            <g>
              <rect x="150" y="124" width="686" height="336" fill="url(#heatGrad)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="0.9s" repeatCount="indefinite" />
              </rect>
              {/* dendrite bridging the separator — internal short */}
              <polyline
                points="640,282 588,290 548,280 512,292 496,284 470,289"
                fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinejoin="round" filter="url(#cellGlow)"
              >
                <animate attributeName="opacity" values="1;0.25;1" dur="0.5s" repeatCount="indefinite" />
              </polyline>
              {/* venting gas */}
              {[512, 540, 568].map((x, i) => (
                <circle key={x} cx={x} cy="145" r={3.5 + i * 1.5} fill="none" stroke="#fca5a5" strokeWidth="1.2">
                  <animate attributeName="cy" values="150;98" dur={`${1.6 + i * 0.4}s`} begin={`${-i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur={`${1.6 + i * 0.4}s`} begin={`${-i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}
              <text x="500" y="110" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold" fontFamily="monospace">
                ⚠ THERMAL RUNAWAY — SEPARATOR BREACH
                <animate attributeName="opacity" values="1;0.35;1" dur="0.8s" repeatCount="indefinite" />
              </text>
            </g>
          )}

          {/* ------- labels ------- */}
          <text x="262" y="498" textAnchor="middle" fill="#4ade80" fontSize="16" fontWeight="600">Cathode</text>
          <text x="262" y="516" textAnchor="middle" fill="#64748b" fontSize="11">LiTMO₂ · NMC / LFP</text>

          <text x="500" y="498" textAnchor="middle" fill="#e2e8f0" fontSize="16" fontWeight="600">Separator</text>
          <text x="500" y="516" textAnchor="middle" fill="#64748b" fontSize="11">porous membrane</text>

          <line x1="627" y1="460" x2="600" y2="484" stroke="#f59e0b" strokeWidth="1.5" opacity="0.7" />
          <text x="592" y="498" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="600">SEI layer</text>
          <text x="592" y="514" textAnchor="middle" fill="#92702a" fontSize="10">LiF · Li₂CO₃ · polymers — grows with age</text>

          <text x="731" y="498" textAnchor="middle" fill="#cbd5e1" fontSize="16" fontWeight="600">Anode</text>
          <text x="731" y="516" textAnchor="middle" fill="#64748b" fontSize="11">Graphite + SiOₓ</text>

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
            <circle cx="790" cy="556" r="3.5" fill="#c4b5fd" opacity="0.75" />
            <text x="800" y="560" fill="#94a3b8">dead Li</text>
          </g>
        </svg>

        {/* ---- interactive cell playground ---- */}
        <motion.div style={{ pointerEvents: controlsPE }} className="mt-4 space-y-3">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => { setMode('charge'); setRunaway(false) }}
              className={btnCls(mode === 'charge' && !runaway, 'text-cyan-300 border-cyan-400/70')}
            >
              ⚡ Charge
            </button>
            <button
              onClick={() => { setMode('discharge'); setRunaway(false) }}
              className={btnCls(mode === 'discharge' && !runaway, 'text-green-300 border-green-400/70')}
            >
              🔋 Discharge
            </button>
            <span className="w-px self-stretch bg-gray-700/70 mx-1 hidden sm:block" />
            {cRates.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setRateIdx(i)}
                className={btnCls(rateIdx === i, 'text-yellow-300 border-yellow-400/70')}
              >
                {c.label}
              </button>
            ))}
            <span className="w-px self-stretch bg-gray-700/70 mx-1 hidden sm:block" />
            <button
              onClick={() => setAged(a => !a)}
              className={btnCls(aged, 'text-amber-300 border-amber-400/70')}
            >
              {aged ? '🕰 Aged cell' : '✨ Fresh cell'}
            </button>
            <button
              onClick={() => setRunaway(r => !r)}
              className={btnCls(runaway, 'text-red-300 border-red-400/80 animate-pulse')}
            >
              {runaway ? '🔥 Runaway! — tap to reset' : '⚠ Thermal runaway'}
            </button>
          </div>

          {/* live readouts */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-mono text-gray-300">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">V</span>
              <span className={runaway ? 'text-red-400 font-bold' : 'text-cyan-300'}>{volts.toFixed(2)} V</span>
              <div className="relative w-24 h-1.5 bg-gray-800 rounded-full">
                <div className="absolute inset-y-0 bg-green-500/40 rounded-full" style={{ left: '20%', width: '48%' }} />
                <div
                  className={`absolute -top-[3px] w-1 h-3 rounded transition-all duration-300 ${runaway ? 'bg-red-400' : 'bg-white'}`}
                  style={{ left: `${Math.min(((volts - 2.5) / 2.5) * 100, 97)}%` }}
                />
              </div>
              <span className="text-gray-600">3.0–4.2 V safe</span>
            </div>
            <div>
              <span className="text-gray-500">I </span>
              <span className="text-yellow-300">{runaway ? '···' : `${discharging ? '−' : '+'}${amps.toFixed(1)} A · ${rateLabel}`}</span>
            </div>
            <div>
              <span className="text-gray-500">T </span>
              <span className={temp > 60 ? 'text-red-400 font-bold' : 'text-blue-300'}>{temp} °C</span>
            </div>
            <div>
              <span className="text-gray-500">SoH </span>
              <span className={aged ? 'text-amber-300' : 'text-green-400'}>{soh}%</span>
            </div>
          </div>
        </motion.div>

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
