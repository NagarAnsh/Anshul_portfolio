import { useState } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const images = [
  { src: '/gallery/Anshul.JPG', caption: 'Anshul' },
  { src: '/gallery/Battery ECM models.png', caption: 'Battery ECM models' },
  { src: '/gallery/korea.JPG', caption: 'Exploring Jeju Island' },
  { src: '/gallery/Lab.png', caption: 'Lab research' },
  { src: '/gallery/SOH.png', caption: 'State-of-health analysis' },
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="min-h-screen py-20 bg-black text-center">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center px-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          My Gallery
        </h1>
        <Link
          to="/"
          className="text-cyan-400 border border-cyan-400 rounded-lg px-4 py-2 hover:bg-cyan-400 hover:text-black transition"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelected(img)}
            className="relative group overflow-hidden rounded-2xl border border-gray-700 hover:border-cyan-400 cursor-pointer transition-all"
          >
            <img
              src={img.src}
              alt={img.caption}
              className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-end justify-center transition-opacity duration-300">
              <p className="text-white text-sm mb-3">{img.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <button
            onClick={() => setSelected(null)}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <img
            src={selected.src}
            alt={selected.caption}
            className="max-h-[80vh] rounded-xl shadow-2xl"
          />
          <p className="text-gray-300 mt-4">{selected.caption}</p>
        </div>
      )}
    </section>
  )
}
