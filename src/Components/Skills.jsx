"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaPython } from "react-icons/fa"
import { SiExpress, SiMongodb, SiTailwindcss, SiFirebase, SiFigma, SiVercel, SiBootstrap, SiMui, SiHeroku, SiRender, SiHostinger } from "react-icons/si"
import { TbBrandReactNative } from "react-icons/tb"
import { VscCode as VscVscode } from "react-icons/vsc"
import Title from "./Title"
import { useTheme } from "../Context/theme-context"

const SkillCard = ({ skill, isDark }) => {
  const IconComponent = skill.icon

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative group p-3 transition-all duration-500 flex flex-col items-center justify-center gap-4 clip-cyber ${isDark ? "bg-white/5" : "bg-white shadow-xl border border-black/5"
        }`}
    >
      {/* Neon Data Ribbon */}
      <div className="neon-border clip-cyber" style={{ color: skill.color }} />

      {/* Holographic Sheen */}
      <motion.div
        className="holographic-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Power Core Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: skill.color }}
      />

      <div className="relative z-10">
        <IconComponent
          className="text-5xl transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          style={{ color: skill.color }}
        />
      </div>

      <span className={`text-[10px] font-mono tracking-tighter transition-all duration-300 ${isDark ? "text-gray-500 group-hover:text-white" : "text-gray-400 group-hover:text-gray-900"
        }`}>
        {`> ${skill.name.toUpperCase()}`}
      </span>
    </motion.div>
  )
}

const Skills = () => {
  const { isDark } = useTheme()
  const sectionRef = useRef(null)

  // Global Perspective Tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  const rotateX = useTransform(springY, [-500, 500], [4, -4])
  const rotateY = useTransform(springX, [-500, 500], [-4, 4])

  // Spotlight Logic
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      sectionRef.current.style.setProperty("--x", `${x}px`)
      sectionRef.current.style.setProperty("--y", `${y}px`)

      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
  }, [mouseX, mouseY])

  const skillCategories = [
    {
      title: "Core Frontend",
      classes: "lg:col-span-6", // Changed from 12 to 6 for side-by-side
      delay: 0,
      skills: [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
        { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        { name: "ReactNative", icon: TbBrandReactNative, color: "#61DAFB" },
        { name: "MUI", icon: SiMui, color: "#007FFF" },
      ],
    },
    {
      title: "Backend",
      classes: "lg:col-span-6", // Changed from 12 to 6 for side-by-side
      delay: 0.2,
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#8CC84B" },
        { name: "Express", icon: SiExpress, color: isDark ? "#fff" : "#000" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Python", icon: FaPython, color: "#3776AB" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCB2B" },
      ],
    },
    {
      title: "Ecosystem & Design",
      classes: "lg:col-span-6", // This remains full width at bottom
      delay: 0.4,
      skills: [
        { name: "Git", icon: FaGitAlt, color: "#F1502F" },
        { name: "GitHub", icon: FaGithub, color: isDark ? "#fff" : "#181717" },
        { name: "VS Code", icon: VscVscode, color: "#0066B8" },
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Vercel", icon: SiVercel, color: isDark ? "#fff" : "#000" },
        { name: "Heroku", icon: SiHeroku, color: "#430098" },
        { name: "Render", icon: SiRender, color: "#000000" },
        { name: "Hostinger", icon: SiHostinger, color: "#673DE6" },
      ],
    },
  ]

  return (
    <section
      id="Skills"
      ref={sectionRef}
      className="relative overflow-hidden perspective-1000"
    >
      <div className="max-w-8xl mx-auto px-2 relative z-10">
        <Title title="Technology Stack" />

        <motion.div
          style={{ rotateX, rotateY }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: category.delay }}
              className={`${category.classes} p-4 relative group/cat clip-cyber-lg ${isDark ? "bg-white/[0.02]" : "bg-gray-50 shadow-inner"
                }`}
            >
              {/* Corner Brackets */}
              <div className="corner-bracket top-0 left-0 border-t-2 border-l-2 opacity-20 group-hover/cat:opacity-100 transition-opacity duration-500" />
              <div className="corner-bracket top-0 right-0 border-t-2 border-r-2 opacity-20 group-hover/cat:opacity-100 transition-opacity duration-500" />
              <div className="corner-bracket bottom-0 left-0 border-b-2 border-l-2 opacity-20 group-hover/cat:opacity-100 transition-opacity duration-500" />
              <div className="corner-bracket bottom-0 right-0 border-b-2 border-r-2 opacity-20 group-hover/cat:opacity-100 transition-opacity duration-500" />

              <h3 className={`text-xl font-mono mb-12 relative z-10 flex items-center gap-4 ${isDark ? "text-white/80" : "text-gray-900"
                }`}>
                <span className="w-8 h-[1px] bg-blue-500" />
                {category.title.toUpperCase()}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 relative z-10">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} isDark={isDark} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills