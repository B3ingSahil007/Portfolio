"use client"

import { motion } from "framer-motion"
import Skills from "./Skills"
import Title from "./Title"
import { useTheme } from "../Context/theme-context"
import { Cpu, Code, Zap, Globe } from "lucide-react"

const About = () => {
  const { isDark } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <section id="AboutMe" className={`relative overflow-hidden py-24 px-4 sm:px-6 lg:px-12 ${isDark ? "bg-[#030712]" : "bg-gray-50"}`}>

      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Title title="System Identity" className="mb-12" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
        >
          {/* LEFT: Cyber Identity Module */}
          <div className="lg:col-span-5 relative">
            <div className="relative group perspective-1000">

              {/* Main Card Container */}
              <div className={`
                relative clip-cyber p-1 
                bg-gradient-to-b from-cyan-500/20 to-blue-600/20 
                backdrop-blur-sm transition-all duration-500
                group-hover:translate-x-2 group-hover:-translate-y-2
              `}>
                <div className={`
                  relative clip-cyber bg-black/90 aspect-[4/5] 
                  border border-cyan-500/30 overflow-hidden
                  flex flex-col items-center justify-center p-6
                `}>

                  {/* Holographic scanner effect */}
                  <div className="absolute inset-0 bg-scan-line opacity-10 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan" />

                  {/* Avatar / Icon */}
                  <div className="relative w-40 h-40 mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow-once border-dashed" />
                    <div className="absolute inset-2 rounded-full border border-blue-500/50 animate-reverse-spin opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-float-slow">🚀</span>
                    </div>
                  </div>

                  {/* Identity Data */}
                  <div className="w-full space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-cyan-500/70 text-sm font-mono tracking-wider">CLASS</span>
                      <span className="text-white font-mono text-lg">DEV_S-TIER</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-cyan-500/70 text-sm font-mono tracking-wider">LOC</span>
                      <span className="text-white font-mono text-lg">AHMEDABAD, IN</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="text-cyan-500/70 text-sm font-mono tracking-wider">STATUS</span>
                      <span className="text-green-400 font-mono text-lg flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        ONLINE
                      </span>
                    </div>
                  </div>

                  {/* Decorative Footer */}
                  <div className="absolute bottom-0 left-0 w-full bg-cyan-900/20 h-8 flex items-center justify-between px-4">
                    <span className="text-[10px] text-cyan-400/50 font-mono">SYS.ID: 8X-92</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                      <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                      <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Background Ghost Card */}
              <div className="absolute inset-0 bg-blue-600/10 clip-cyber translate-x-4 -translate-y-4 -z-10 group-hover:translate-x-6 group-hover:-translate-y-6 transition-all duration-500 border border-blue-500/20" />
            </div>
          </div>

          {/* RIGHT: Data Readout */}
          <div className="lg:col-span-7 space-y-10">

            {/* Main Statement */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              className="relative"
            >
              <Cpu className="text-cyan-500 w-12 h-12 mb-4 animate-pulse-slow-once" />
              <h3 className={`text-4xl lg:text-5xl font-bold font-mono leading-tight mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 glitch-hover">Digital Realities</span>
              </h3>
              <p className={`text-lg font-mono leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Execute protocol: <span className="text-cyan-500">Create</span>. Target: <span className="text-blue-500">Excellence</span>.
                <br /><br />
                As an operative in the realm of Frontend Development, I specialize in constructing high-fidelity web interfaces. My directive is to merge visual precision with algorithmic efficiency, ensuring every pixel serves a purpose.
              </p>
            </motion.div>

            {/* Stats Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatModule
                icon={<Code className="w-6 h-6 text-cyan-400" />}
                value="2+"
                label="YEARS_EXP"
                sub="Continuous Deployment"
                isDark={isDark}
              />
              <StatModule
                icon={<Globe className="w-6 h-6 text-blue-400" />}
                value="15+"
                label="PROJECTS_INIT"
                sub="Successfully Compiled"
                isDark={isDark}
              />
            </div>

            {/* Tech Philosophy */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={`p-6 border-l-4 border-cyan-500/50 bg-gradient-to-r from-cyan-900/10 to-transparent ${isDark ? "" : "bg-blue-50/50"}`}
            >
              <h4 className="text-cyan-400 font-mono font-bold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" /> RE: MISSION_STATEMENT
              </h4>
              <p className={`font-mono text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                "To optimize the user latency to zero and maximize visual throughput. The browser is the engine; code is the fuel."
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      <div className="mt-32 relative z-10">
        <Skills />
      </div>
    </section>
  )
}

const StatModule = ({ icon, value, label, sub, isDark }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`
      relative overflow-hidden p-6 clip-cyber-sm
      border border-cyan-500/20 bg-black/40 backdrop-blur-sm
      group hover:border-cyan-500/60 transition-colors
    `}
  >
    {/* Corner Brackets */}
    <div className="absolute top-0 right-0 p-1">
      <div className="w-2 h-2 border-t border-r border-cyan-500/50" />
    </div>
    <div className="absolute bottom-0 left-0 p-1">
      <div className="w-2 h-2 border-b border-l border-cyan-500/50" />
    </div>

    <div className="flex items-start justify-between mb-4">
      {icon}
      <div className="w-12 h-1 bg-cyan-900/30 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-500/50 w-2/3 animate-pulse" />
      </div>
    </div>

    <div className="relative z-10">
      <h4 className="text-4xl font-mono font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{value}</h4>
      <p className="text-xs font-mono text-cyan-500/70 tracking-widest uppercase mb-1">{label}</p>
      <p className="text-xs text-gray-500 font-mono">{sub}</p>
    </div>

    {/* Hover Glow */}
    <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-500/20 transition-all" />
  </motion.div>
)

export default About
