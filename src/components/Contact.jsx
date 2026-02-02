import { Mail, Linkedin, Github, Instagram, MapPin, MessageCircle } from 'lucide-react'

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-transparent py-20"
    >
      <div className="text-center bg-black/60 backdrop-blur-sm rounded-2xl p-10 border border-cyan-400/20 shadow-xl max-w-2xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          Let’s Connect
        </h2>
        <p className="text-gray-300 mb-10 max-w-lg mx-auto">
          Feel free to reach out for collaborations, research discussions, or creative projects.
        </p>

        {/* Contact Info */}
        <div className="space-y-3 text-gray-300 mb-10">
          <div className="flex items-center justify-center space-x-3">
            <Mail className="h-5 w-5 text-cyan-400" />
            <a
              href="mailto:yourname@email.com"
              className="hover:text-cyan-400 transition-colors duration-300"
            >
              yourname@email.com
            </a>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <MapPin className="h-5 w-5 text-cyan-400" />
            <span>Daejeon, South Korea</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <Linkedin className="h-8 w-8" />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <Github className="h-8 w-8" />
          </a>
          <a
            href="https://www.instagram.com/yourhandle"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <Instagram className="h-8 w-8" />
          </a>
          <a
            href="https://wa.me/yourwhatsapplink"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
          >
            <MessageCircle className="h-8 w-8" />
          </a>
        </div>

        {/* Optional direct message short link */}
        <div className="mt-10">
          <a
            href="https://wa.me/yourwhatsapplink" // or Instagram DM / Telegram link
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-2 text-cyan-400 border border-cyan-400 px-6 py-2 rounded-lg font-semibold hover:bg-cyan-400 hover:text-black transition-all duration-300"
          >
            Send me a quick message →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
