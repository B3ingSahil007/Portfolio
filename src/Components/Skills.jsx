"use client"

import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaPython } from "react-icons/fa"
import { SiMui, SiExpress, SiMongodb, SiTailwindcss, SiFirebase, SiFigma, SiVercel, SiHeroku } from "react-icons/si"
import { VscCode as VscVscode } from "react-icons/vsc"
import Title from "./title"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const { isDark } = useTheme()

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
        { name: "ReactJS", icon: FaReact, color: "#61DAFB" },
        { name: "Bootstrap", icon: FaBootstrap, color: "#7952B3" },
        { name: "Material-UI", icon: SiMui, color: "#007FFF" },
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      ],
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", icon: FaNodeJs, color: "#8CC84B" },
        { name: "Express.js", icon: SiExpress, color: "#000000" },
        { name: "Python", icon: FaPython, color: "#306998" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCB2B" },
      ],
    },
    {
      title: "Tools & Version Control",
      skills: [
        { name: "Git", icon: FaGitAlt, color: "#F1502F" },
        { name: "GitHub", icon: FaGithub, color: "#181717" },
        { name: "VS Code", icon: VscVscode, color: "#0066B8" },
      ],
    },
    {
      title: "Other Tools / Technologies",
      skills: [
        { name: "Figma", icon: SiFigma, color: "#F24E1E" },
        { name: "Vercel", icon: SiVercel, color: "#000000" },
        { name: "Heroku", icon: SiHeroku, color: "#6762A6" },
      ],
    },
  ]

  return (
    <div className="skills py-20">
      <Title title="My Skills" />

      <div ref={ref} className="skills-categories flex flex-wrap justify-center gap-16">
        {skillCategories.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`skills-category text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${categoryIndex * 200}ms` }}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${isDark ? "text-blue-400" : "text-[#2563eb]"}`}>
              {category.title}
            </h2>
            <div className="skills-list grid grid-cols-2 sm:grid-cols-3 gap-6">
              {category.skills.map((skill, skillIndex) => {
                const IconComponent = skill.icon
                return (
                  <div
                    key={skill.name}
                    className={`skill border p-4 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-xl group cursor-pointer ${
                      isDark
                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#3b82f6]"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#3b82f6]"
                    } hover:text-white`}
                    style={{
                      animationDelay: `${categoryIndex * 200 + skillIndex * 100}ms`,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    <IconComponent
                      className="text-4xl mb-3 mx-auto group-hover:text-white transition-all duration-300 group-hover:animate-bounce"
                      style={{ color: skill.color }}
                    />
                    <span className="font-medium group-hover:animate-pulse">{skill.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
