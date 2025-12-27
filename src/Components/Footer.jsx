"use client"

import AnchorLink from "react-anchor-link-smooth-scroll"
import { useTheme } from "../Context/theme-context"
import { FaTerminal } from "react-icons/fa"

const Footer = () => {
  const { isDark } = useTheme()

  const currentYear = new Date().getFullYear()

  return (
    <div className={`
      relative border-t-2 py-12 overflow-hidden
      ${isDark ? "bg-black border-cyan-900/30 text-gray-400" : "bg-gray-900 border-blue-500/30 text-gray-300"}
    `}>
      {/* Matrix Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">

          {/* Brand Identify */}
          <div className="space-y-4 max-w-md">
            <h2 className="text-3xl font-mono font-bold text-white flex items-center gap-3">
              <FaTerminal className="text-cyan-500 animate-pulse" />
              <span>&lt;Sahil Miyawala /&gt;</span>
            </h2>
            <p className="font-mono text-sm leading-relaxed text-gray-500">
               // SYSTEM_STATUS: ONLINE <br />
               // CURRENT_OBJECTIVE: DEPLOYING_EXCELLENCE
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-wrap gap-8 text-sm font-mono tracking-wider">
            <Navlink href="#Hero" label="HOME_ROOT" />
            <Navlink href="#AboutMe" label="IDENTITY" />
            <Navlink href="#MyWork" label="ARCHIVES" />
            <Navlink href="#ContactMe" label="UPLINK" />
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-900/50 to-transparent mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
          <div>
            <span className="text-cyan-800">/* </span>
            &copy; {currentYear} Sahil Miyawala. SECURED.
            <span className="text-cyan-800"> */</span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">PRIVACY_PROTOCOL</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">TERMS_OF_SERVICE</a>
          </div>
        </div>

      </div>
    </div>
  )
}

const Navlink = ({ href, label }) => (
  <AnchorLink
    href={href}
    className="relative group hover:text-cyan-400 transition-colors cursor-pointer"
  >
    <span className="text-cyan-800 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">&gt;</span>
    {label}
  </AnchorLink>
)

export default Footer
