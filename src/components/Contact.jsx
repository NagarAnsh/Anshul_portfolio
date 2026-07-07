import { Mail, Linkedin, Github, Instagram, MapPin, Phone } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/anshulnagar06'
const GITHUB_URL = 'https://github.com/NagarAnsh'
const INSTAGRAM_URL = 'https://www.instagram.com/anshulnagar123'

const EMAIL = 'nagaranshul04@gmail.com'
const PHONE_DISPLAY = '+82 010-7341-2730'
const PHONE_E164 = '821073412730'

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-transparent py-20 px-4"
    >
      <div className="text-center bg-black/60 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border border-cyan-400/20 shadow-xl max-w-2xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Let's Connect
        </h2>
        <p className="text-gray-300 mb-10 max-w-lg mx-auto">
          Open to research collaborations, BMS / battery-AI roles, and conversations about physics-informed ML.
        </p>

        <div className="space-y-3 text-gray-300 mb-10">
          <div className="flex items-center justify-center space-x-3">
            <Mail className="h-5 w-5 text-cyan-400" />
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-cyan-400 transition-colors duration-300 break-all"
            >
              {EMAIL}
            </a>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Phone className="h-5 w-5 text-cyan-400" />
            <a
              href={`tel:+${PHONE_E164}`}
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <MapPin className="h-5 w-5 text-cyan-400" />
            <span>Daejeon, South Korea</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <Linkedin className="h-8 w-8" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <Instagram className="h-8 w-8" />
          </a>
        </div>

        <div className="mt-10">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block mt-2 text-cyan-400 border border-cyan-400 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            Send me an email →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
