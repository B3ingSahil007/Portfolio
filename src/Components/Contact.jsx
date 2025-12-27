"use client"

import { useState } from "react"
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaWifi } from "react-icons/fa"
import { toast } from "react-toastify"
import Title from "./Title"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ref, isVisible] = useScrollAnimation(0.2)
  const { isDark } = useTheme()

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.target)
    formData.append("access_key", "a24cea49-66c8-46b1-81ad-586acd6af1d1")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json())

      if (res.success) {
        toast.success("E-Mail Sent Successfully")
        event.target.reset()
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/B3ingSahil007", label: "GitHub" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/sahil-miyawala-268852252/", label: "LinkedIn" },
    { icon: FaInstagram, url: "https://www.instagram.com/b3ing_sahil_007/", label: "Instagram" },
    { icon: FaFacebook, url: "https://www.facebook.com/B3ingsahil007", label: "Facebook" },
  ]

  return (
    <div
      id="ContactMe"
      className={`relative py-24 px-4 sm:px-6 lg:px-12 overflow-hidden ${isDark ? "bg-[#030712]" : "bg-gray-50"}`}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />

      <Title title="Establish Connection" />

      <div ref={ref} className="mt-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Left: Signal Station */}
        <div className={`space-y-8 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"} transition-all duration-1000`}>
          <div className="relative">
            <h2 className={`text-4xl lg:text-5xl font-mono font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Let's <span className="text-cyan-500 glitch-hover">Talk</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mb-8" />

            <p className={`font-mono text-lg leading-relaxed mb-8 border-l-2 border-cyan-500/30 pl-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Ready to initiate protocol: COLLABORATION. <br />
              Signal strength is strong. Transmit your project parameters or just send a ping.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: MdEmail, label: "Quantum Mail", value: "chhipasahil163@gmail.com" },
              { icon: MdPhone, label: "Secure Line", value: "+91 9638473047" },
              { icon: MdLocationOn, label: "Base Station", value: "Gujarat, India" },
            ].map((contact, index) => (
              <div
                key={contact.label}
                className={`group flex items-center gap-6 p-4 border border-transparent hover:border-cyan-500/30 bg-black/5 clip-cyber-sm transition-all duration-300 hover:translate-x-2 ${isDark ? "bg-white/5" : "bg-white"}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-cyan-500/10 text-cyan-400 clipped-box group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  <contact.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-mono text-cyan-600 uppercase tracking-widest mb-1">{contact.label}</p>
                  <p className={`font-medium font-mono ${isDark ? "text-gray-300" : "text-gray-800"}`}>{contact.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <p className="text-sm font-mono text-cyan-500/60 mb-4 flex items-center gap-2">
              <FaWifi className="animate-pulse" /> NETWORK NODES
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-cyan-500/30 text-cyan-500 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 clip-cyber-sm hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Transmission Terminal */}
        <div className={`relative ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} transition-all duration-1000 delay-300`}>

          <div className={`
             relative p-8 clip-hud border 
             ${isDark ? "bg-black/40 border-cyan-500/30" : "bg-white border-gray-200"}
          `}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <h3 className="text-xl font-mono font-bold text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                TRANSMISSION_UPLINK
              </h3>
              <span className="text-xs font-mono text-gray-500">SECURE_V.2.0</span>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-500/70 ml-2">AGENT_ID (NAME)</label>
                <input
                  type="text"
                  name="name"
                  required
                  className={`
                      w-full bg-black/20 border-b-2 border-white/10 px-4 py-3 font-mono
                      focus:border-cyan-500 focus:bg-cyan-500/5 transition-all outline-none
                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  placeholder="ENTER IDENTIFIER_"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-500/70 ml-2">COMMS_CHANNEL (EMAIL)</label>
                <input
                  type="email"
                  name="email"
                  required
                  className={`
                      w-full bg-black/20 border-b-2 border-white/10 px-4 py-3 font-mono
                      focus:border-cyan-500 focus:bg-cyan-500/5 transition-all outline-none
                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  placeholder="ENTER FREQUENCY_"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-cyan-500/70 ml-2">DATA_PACKET (MESSAGE)</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className={`
                      w-full bg-black/20 border-b-2 border-white/10 px-4 py-3 font-mono
                      focus:border-cyan-500 focus:bg-cyan-500/5 transition-all outline-none resize-none
                      ${isDark ? "text-white" : "text-gray-900"}
                    `}
                  placeholder="INPUT PARAMETERS_..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                      w-full py-4 bg-cyan-600/10 border border-cyan-500 text-cyan-400 
                      font-mono font-bold tracking-widest uppercase clip-cyber-sm
                      hover:bg-cyan-500 hover:text-black transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed
                      group relative overflow-hidden
                    `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? "UPLOADING..." : "INITIATE_TYPE_SEND >"}
                  </span>
                  <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </form>

            {/* Terminal Decor */}
            <div className="absolute top-0 right-0 p-2">
              <div className="w-3 h-3 border-t-2 border-r-2 border-cyan-500" />
            </div>
            <div className="absolute bottom-0 left-0 p-2">
              <div className="w-3 h-3 border-b-2 border-l-2 border-cyan-500" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
