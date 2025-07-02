"use client"

import Experience_Data from "../assets/experience_data"
import Title from "./title"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"

const Experiences = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const { isDark } = useTheme()

  return (
    <div
      id="Experiences"
      className={`experience-section flex flex-col items-center justify-center py-20 transition-all duration-1000 ${
        isDark ? "bg-gray-800" : "bg-gray-50"
      }`}
    >
      <Title title="My Experience" />

      <div
        ref={ref}
        className="experience-list w-[90%] sm:w-[85%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {Experience_Data.map((experience, index) => (
          <div
            key={index}
            className={`experience-card border p-6 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
              isDark
                ? "bg-gray-900 border-gray-700 hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#3b82f6]"
                : "bg-white border-gray-200 hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#3b82f6]"
            } hover:text-white ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <h3
              className={`text-xl sm:text-2xl font-semibold transition-all duration-300 mb-3 group-hover:text-white group-hover:animate-pulse ${
                isDark ? "text-blue-400" : "text-[#2563eb]"
              }`}
            >
              {experience.e_name}
            </h3>

            <div className="mb-4 flex flex-wrap gap-2">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                  isDark
                    ? "text-gray-400 bg-gray-800 group-hover:bg-white/20 group-hover:text-gray-200"
                    : "text-gray-500 bg-gray-100 group-hover:bg-white/20 group-hover:text-gray-200"
                }`}
              >
                {experience.e_time}
              </span>
              {experience.e_company && (
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
                    isDark
                      ? "text-gray-400 bg-gray-800 group-hover:bg-white/20 group-hover:text-gray-200"
                      : "text-gray-500 bg-gray-100 group-hover:bg-white/20 group-hover:text-gray-200"
                  }`}
                >
                  <strong>Company:</strong> {experience.e_company}
                </span>
              )}
            </div>

            <p
              className={`text-base leading-relaxed transition-all duration-300 group-hover:text-gray-100 ${
                isDark ? "text-gray-400" : "text-gray-700"
              }`}
            >
              {experience.s_desc || "Description coming soon..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experiences
