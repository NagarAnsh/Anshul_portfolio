import { useState, useMemo, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ArrowLeft, Music, Mountain, Dumbbell, Mic, Goal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const photos = [
  {
    src: '/gallery/life-3.jpg',
    category: 'Adventure',
    title: 'First carves on the Korean slopes',
    blurb: 'Trading the lab bench for a snowboard whenever winter hits Korea.'
  },
  {
    src: '/gallery/life-4.jpg',
    category: 'Music',
    title: 'Six strings after a long day',
    blurb: 'Unwinding with the guitar — the best way to reset after hours of simulations.'
  },
  {
    src: '/gallery/life-6.jpg',
    category: 'Football',
    title: 'Friday night football',
    blurb: 'Weekly matches under the floodlights with the crew in Korea.'
  },
  {
    src: '/gallery/life-1.jpg',
    category: 'On Stage',
    title: 'Presenting battery SoH research',
    blurb: 'On stage at a KICS conference, walking through state-of-health estimation.'
  },
  {
    src: '/gallery/life-5.jpg',
    category: 'Fitness',
    title: 'Discipline outside the lab',
    blurb: 'Gym days keep the mind sharp and the research marathon going.'
  },
  {
    src: '/gallery/life-2.jpg',
    category: 'On Stage',
    title: 'Poster session · Power Electronics 2024',
    blurb: 'Sharing my hybrid current-profile model at the Annual Conference in Korea.'
  }
]

const categoryIcons = {
  Adventure: Mountain,
  Music: Music,
  Football: Goal,
  Fitness: Dumbbell,
  'On Stage': Mic
}

const filters = ['All', 'Adventure', 'Music', 'Football', 'Fitness', 'On Stage']

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null) // index within visible[]

  const visible = useMemo(
    () => (active === 'All' ? photos : photos.filter(p => p.category === active)),
    [active]
  )

  const close = useCallback(() => setLightbox(null), [])
  const next = useCallback(
    () => setLightbox(i => (i === null ? i : (i + 1) % visible.length)),
    [visible.length]
  )
  const prev = useCallback(
    () => setLightbox(i => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length]
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = e => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, close, next, prev])

  return (
    <section className="min-h-screen py-24 px-4 sm:px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-purple-400 bg-clip-text text-transparent">
              Beyond the Lab
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl">
            Snowboarding, six strings, the gym, and the odd conference stage —
            the person behind the batteries and the equations.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => {
            const Icon = categoryIcons[f]
            const isOn = active === f
            return (
              <button
                key={f}
                onClick={() => { setActive(f); setLightbox(null) }}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  isOn
                    ? 'bg-cyan-400 text-black border-cyan-400'
                    : 'bg-black/40 text-gray-300 border-gray-700 hover:border-cyan-400/60 hover:text-cyan-300'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {f}
              </button>
            )
          })}
        </div>

        {/* Masonry photo wall */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:balance]">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const Icon = categoryIcons[p.category]
              return (
                <motion.button
                  key={p.src}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setLightbox(i)}
                  className="group relative mb-5 block w-full overflow-hidden rounded-2xl border border-gray-700/60 hover:border-cyan-400/60 transition-colors duration-300 break-inside-avoid"
                >
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* category chip */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full border border-cyan-400/30">
                    {Icon && <Icon className="h-3.5 w-3.5" />}
                    {p.category}
                  </span>
                  {/* caption on hover */}
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-4 text-left">
                      <h3 className="text-white font-semibold text-sm">{p.title}</h3>
                      <p className="text-gray-300 text-xs mt-0.5">{p.blurb}</p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && visible[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-5 right-5 bg-white/15 hover:bg-white/30 rounded-full p-2 transition"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {visible.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); prev() }}
                  aria-label="Previous"
                  className="absolute left-3 sm:left-8 bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); next() }}
                  aria-label="Next"
                  className="absolute right-3 sm:right-8 bg-white/10 hover:bg-white/25 rounded-full p-2.5 transition"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </>
            )}

            <motion.div
              key={visible[lightbox].src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={e => e.stopPropagation()}
              className="max-w-3xl w-full flex flex-col items-center"
            >
              <img
                src={visible[lightbox].src}
                alt={visible[lightbox].title}
                className="max-h-[75vh] w-auto rounded-xl shadow-2xl"
              />
              <div className="text-center mt-4">
                <h3 className="text-white font-semibold">{visible[lightbox].title}</h3>
                <p className="text-gray-400 text-sm mt-1">{visible[lightbox].blurb}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
