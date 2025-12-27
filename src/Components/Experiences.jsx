"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Experience_Data from "../assets/experience_data"
import Title from "./Title"
import { useTheme } from "../Context/theme-context"

const Experiences = () => {
  const { isDark } = useTheme()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section id="Experiences" className={`py-24 px-6 lg:px-12 ${isDark ? "bg-[#030712]" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <Title title="Experience" />

        <div ref={containerRef} className="mt-20 relative">
          {/* Animated Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-blue-600/10 hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-blue-600 origin-top shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {Experience_Data.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full z-10 border-4 border-[#030712] hidden md:block" />

                  {/* Content Card */}
                  <div className="w-full md:w-[45%]">
                    <div className={`p-8 clip-hud glass-card transition-all duration-500 hover:scale-[1.02] border relative group ${isDark ? "bg-white/5 border-white/10" : "bg-white border-black/5 shadow-xl"
                      }`}>
                      {/* Neon Border */}
                      <div className="neon-border clip-hud text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                          <h3 className={`text-2xl font-bold font-mono ${isDark ? "text-white" : "text-gray-900"}`}>
                            {exp.e_name}
                          </h3>
                          <p className="text-blue-600 font-medium font-mono">{exp.e_company}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 clip-cyber-sm uppercase tracking-wider ${isDark ? "bg-blue-600/10 text-blue-400" : "bg-blue-50 text-blue-600"
                          }`}>
                          {exp.e_time}
                        </span>
                      </div>
                      <p className={`text-base leading-relaxed relative z-10 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                        {exp.s_desc || "Lead developer focusing on architectural design and high-performance frontend implementation."}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for empty side */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experiences
