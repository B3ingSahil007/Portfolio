"use client"

import { memo } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { Typewriter } from "react-simple-typewriter"
import { motion } from "framer-motion"
import { useTheme } from "../Context/theme-context"

// Separate Typewriter Component to prevent unnecessary re-renders
const TypewriterEffect = memo(() => (
  <Typewriter
    words={["Frontend Developer", "MERN Stack Developer", "React Native Developer", "Software Developer", "Web Designer"]}
    loop={true}
    cursor
    cursorStyle="|"
    typeSpeed={100}
    deleteSpeed={50}
    delaySpeed={1000}
  />
))

const Hero = () => {
  const { isDark } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <div
      id="Home"
      className={`hero flex flex-col items-center gap-8 py-32 sm:py-36 sm:pb-32 px-4 sm:px-8 lg:px-16 xl:px-24 min-h-screen relative overflow-hidden transition-all duration-1000 ${isDark ? "bg-[#030712]" : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
        }`}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 ${isDark ? "bg-blue-600" : "bg-blue-400"
            }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full blur-[120px] opacity-10 ${isDark ? "bg-purple-600" : "bg-purple-400"
            }`}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-8 z-10 w-full"
      >
        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className={`text-center w-full mt-2 sm:w-3/4 lg:w-[80%] text-2xl sm:text-5xl lg:text-6xl font-bold leading-tight ${isDark ? "text-white" : "text-gray-900"
            }`}
        >
          I'm{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Sahil Miyawala
          </span>
          ,<br />
          <span className={`${isDark ? "text-blue-400" : "text-blue-600"}`}>
            <TypewriterEffect />
          </span>{" "}
          <span className="text-xl sm:text-xl lg:text-2xl block mt-4 font-medium opacity-80">
            based in Ahmedabad, Gujarat, India.
          </span>
        </motion.h1>

        {/* Description Cyber-Module */}
        <motion.div
          variants={itemVariants}
          className={`relative p-4 clip-cyber-sm glass-card max-w-4xl mx-auto group hover:scale-[1.02] transition-all duration-500 ${isDark ? "bg-white/5 border-white/10" : "bg-white/40 border-black/5"}`}
        >
          {/* Neon Borders */}
          <div className="corner-bracket top-0 left-0 border-t-2 border-l-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300 text-blue-500" />
          <div className="corner-bracket bottom-0 right-0 border-b-2 border-r-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300 text-blue-500" />

          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none animate-scan" style={{ backgroundSize: '100% 3px' }} />

          <p className={`text-lg sm:text-xl font-mono leading-relaxed text-center relative z-10 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            "Specializing in building exceptional digital experiences. From high-performance web applications to cross-platform mobile solutions, I bring technical expertise and creative vision to every project."
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
            <button className="relative px-8 py-4 font-mono font-bold text-white bg-blue-600/20 border border-blue-500/50 hover:bg-blue-600/30 transition-all duration-300 clip-cyber group overflow-hidden">
              {/* Neon Border */}
              <div className="absolute inset-0 border border-blue-400 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <span className="relative z-10 text-neon flex items-center gap-2">
                Connect With Me <span className="text-xl">_</span>
              </span>
              <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </AnchorLink>
          <a
            href="/sahil_resume.pdf"
            download="sahil_resume.pdf"
            className={`relative px-8 py-4 font-mono font-bold border border-white/20 hover:bg-white/5 transition-all duration-300 clip-cyber group overflow-hidden ${isDark ? "text-white" : "text-gray-900"
              }`}
          >
            {/* Neon Border */}
            <div className="absolute inset-0 border border-white/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span className="relative z-10 flex items-center gap-2">
              [ My Resume ]
            </span>
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 ${isDark ? "border-white/20" : "border-gray-300"}`}>
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`w-1 h-3 rounded-full ${isDark ? "bg-white/40" : "bg-gray-400"}`}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Hero
