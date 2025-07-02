"use client"

import { useState } from "react"
import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa"
import mywork_data from "../assets/mywork_data"
import Title from "./title"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"
import error from "../assets/error.gif"

const MyWork = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({})
  const [imageLoading, setImageLoading] = useState({})
  const [ref, isVisible] = useScrollAnimation(0.2)
  const { isDark } = useTheme()

  const toggleDescription = (index) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const handleImageLoad = (index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }))
  }

  const handleImageError = (index) => {
    setImageLoading((prev) => ({ ...prev, [index]: false }))
  }

  return (
    <div
      id="MyWork"
      className={`work flex flex-col items-center justify-center py-20 transition-all duration-1000 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Title title="My Work" />

      <div
        ref={ref}
        className="work-gallery w-[90%] sm:w-[85%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {mywork_data.map((project, index) => (
          <div
            key={index}
            className={`work-card border p-4 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden cursor-pointer ${
              isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="work-image mb-4 overflow-hidden rounded-xl relative">
              {imageLoading[index] !== false && (
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    isDark ? "bg-gray-700" : "bg-gray-100"
                  }`}
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563eb]"></div>
                </div>
              )}
              <img
                src={project.w_img || error}
                alt={project.w_name}
                className="w-full h-[200px] sm:h-[220px] lg:h-[200px] object-cover transition-all duration-500 group-hover:scale-110"
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
                style={{ display: imageLoading[index] === false ? "block" : "none" }}
              />

              {/* Overlay with links */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                <button className="bg-white text-gray-800 p-2 rounded-full hover:scale-110 transition-all duration-200">
                  <FaExternalLinkAlt />
                </button>
                <button className="bg-white text-gray-800 p-2 rounded-full hover:scale-110 transition-all duration-200">
                  <FaGithub />
                </button>
              </div>
            </div>

            <h3
              className={`text-xl font-semibold mb-3 transition-all duration-300 group-hover:animate-pulse ${
                isDark ? "text-blue-400" : "text-[#2563eb]"
              }`}
            >
              {project.w_no}. {project.w_name}
            </h3>

            <p
              className={`text-base leading-relaxed transition-all duration-300 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {expandedDescriptions[index] ? project.w_desc : `${project.w_desc.slice(0, 100)}...`}
              <span
                onClick={() => toggleDescription(index)}
                className={`font-medium cursor-pointer ml-1 hover:underline transition-all duration-200 ${
                  isDark ? "text-blue-400 hover:text-blue-300" : "text-[#2563eb] hover:text-blue-700"
                }`}
              >
                {expandedDescriptions[index] ? "Read Less" : "Read More"}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Show More Section with Arrow Icon */}
      <a
        href="https://github.com/B3ingSahil007?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12"
      >
        <div
          className={`work-showmore border-2 border-[#2563eb] rounded-full px-8 sm:px-10 py-3 flex items-center justify-center cursor-pointer group transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 ${
            isDark
              ? "bg-gray-800 text-blue-400 hover:bg-blue-400 hover:text-gray-900"
              : "bg-white text-[#2563eb] hover:bg-[#2563eb] hover:text-white"
          }`}
        >
          <p className="mr-3 group-hover:-translate-x-1 transition-all duration-200 font-medium group-hover:animate-pulse">
            Show More
          </p>
          <FaArrowRight className="text-lg group-hover:translate-x-1 transition-all duration-200 group-hover:animate-bounce" />
        </div>
      </a>
    </div>
  )
}

export default MyWork
