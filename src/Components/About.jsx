"use client"

import Skills from "./Skills"
import Title from "./Title"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const { isDark } = useTheme()

  return (
    <>
      <div
        id="AboutMe"
        className={`about flex flex-col items-center justify-center gap-8 py-20 sm:py-40 pt-0 sm:pt-20 px-4 sm:px-8 lg:px-16 transition-all duration-1000 ${
          isDark ? "bg-gray-800" : "bg-gray-50"
        }`}
      >
        {/* Title Section */}
        <Title title="About Me" />

        {/* Paragraph Section */}
        <div ref={ref} className="about-sections w-full sm:w-[80%] lg:w-[70%]">
          <div
            className={`about-para text-center text-base sm:text-lg leading-relaxed space-y-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div
              className={`p-8 rounded-2xl shadow-xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                isDark ? "bg-gray-900 border-gray-700 text-gray-300" : "bg-white border-gray-100 text-gray-600"
              }`}
            >
              <p className="mb-4 leading-relaxed">
                I am a dedicated Frontend Developer from Ahmedabad, Gujarat, with a BE in Information Technology and
                practical experience through internships and diverse projects. Skilled in HTML, CSS, JavaScript,
                ReactJS, Bootstrap, Material-UI, Git, and the MERN stack, I specialize in building responsive,
                user-friendly web applications.
              </p>
              <p className="leading-relaxed">
                I've worked on e-commerce platforms, news apps, and personal portfolios, showcasing my ability to create
                scalable and impactful solutions. With a passion for problem-solving and continuous learning, I strive
                to craft innovative digital experiences that bring ideas to life.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div
        className={`skills px-4 sm:px-8 lg:px-16 transition-all duration-1000 ${isDark ? "bg-gray-900" : "bg-white"}`}
      >
        <Skills />
      </div>
    </>
  )
}

export default About
