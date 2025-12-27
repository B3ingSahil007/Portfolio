"use client"

import { FaArrowRight, FaExternalLinkAlt, FaGithub, FaCode } from "react-icons/fa"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import mywork_data from "../assets/mywork_data"
import Title from "./Title"
import { useTheme } from "../Context/theme-context"

const ProjectCard = ({ project, index, isDark }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative group flex flex-col h-full bg-black/40 backdrop-blur-sm border clip-cyber-sm transition-all duration-500 hover:z-10 ${isDark ? "border-cyan-500/20" : "border-gray-200"
        }`}
    >
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="corner-bracket top-0 left-0 border-t-2 border-l-2 border-cyan-500/50 w-4 h-4 opacity-50 group-hover:opacity-100 transition-all" />
      <div className="corner-bracket bottom-0 right-0 border-b-2 border-r-2 border-cyan-500/50 w-4 h-4 opacity-50 group-hover:opacity-100 transition-all" />

      {/* Image Container */}
      <div
        className="relative h-48 sm:h-56 overflow-hidden clip-cyber-sm bg-gray-900 border-b border-cyan-500/20"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="absolute inset-0 bg-scan-line z-10 opacity-0 group-hover:opacity-20 animate-scan pointer-events-none" />
        <img
          src={project.w_img}
          alt={project.w_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
          <ActionButton icon={<FaExternalLinkAlt />} label="Live Demo" />
          <ActionButton icon={<FaGithub />} label="Source Code" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col" style={{ transform: "translateZ(30px)" }}>

        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-500 text-xs font-mono tracking-widest uppercase">Project_0{index + 1}</span>
            <div className="h-[1px] flex-1 bg-cyan-900/50" />
          </div>
          <h3 className={`text-2xl font-bold font-mono group-hover:text-cyan-400 transition-colors ${isDark ? "text-white" : "text-gray-900"}`}>
            {project.w_name}
          </h3>
        </div>

        {/* Desc */}
        <p className={`text-sm leading-relaxed mb-6 font-mono flex-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {project.w_desc.slice(0, 120)}...
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags && project.tags.map((tag, i) => (
            <span key={i} className={`
               px-2 py-1 text-[10px] uppercase font-mono tracking-wider border
               ${isDark
                ? "bg-cyan-900/20 text-cyan-300 border-cyan-500/30"
                : "bg-blue-50 text-blue-600 border-blue-200"}
             `}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const ActionButton = ({ icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.1, backgroundColor: "#06b6d4" }} // Cyan-500
    whileTap={{ scale: 0.95 }}
    className="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:text-white transition-colors"
    title={label}
  >
    {icon}
  </motion.button>
)

const MyWork = () => {
  const { isDark } = useTheme()

  return (
    <section id="MyWork" className={`relative py-24 px-4 sm:px-6 lg:px-12 ${isDark ? "bg-[#050b14]" : "bg-gray-50"}`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Title title="Operational Deployments" />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mywork_data.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} isDark={isDark} />
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <motion.a
            href="https://github.com/B3ingSahil007"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative group flex items-center gap-4 px-10 py-4 
              font-mono font-bold uppercase tracking-widest
              border border-cyan-500/50 clip-cyber-sm
              bg-black/50 backdrop-blur-sm
              hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
              transition-all duration-300
              ${isDark ? "text-cyan-400" : "text-blue-600 border-blue-600"}
            `}
          >
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              Access Archives <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export default MyWork
