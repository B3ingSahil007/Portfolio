"use client"

import { memo, useState, useEffect } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { Typewriter } from "react-simple-typewriter"
import { useTheme } from "../Context/theme-context"
import { useParallax } from "../hooks/use-scroll-animation"

// Separate Typewriter Component to prevent unnecessary re-renders
const TypewriterEffect = memo(() => (
  <Typewriter
    words={["Frontend Developer", "MERN Stack Developer", "Software Developer", "Web Designer"]}
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
  const [isLoaded, setIsLoaded] = useState(false)
//   const offset = useParallax()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      id="Home"
      className={`hero flex flex-col items-center gap-8 py-32 sm:py-48 sm:pb-32 px-4 sm:px-8 lg:px-16 xl:px-24 min-h-screen relative overflow-hidden transition-all duration-1000 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    //   style={{ transform: `translateY(${offset * 0.5}px)` }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-10 -right-40 w-80 h-80 rounded-full opacity-20 animate-pulse ${
            isDark ? "bg-blue-500" : "bg-blue-500"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 animate-pulse delay-1000 ${
            isDark ? "bg-purple-500" : "bg-purple-500"
          }`}
        ></div>
      </div>

      {/* Main Heading */}
      <h1
        className={`text-center w-full sm:w-3/4 lg:w-[70%] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${isDark ? "text-gray-100" : "text-gray-800"}`}
      >
        I'm{" "}
        <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent animate-pulse">
          Sahil Miyawala
        </span>
        ,{" "}
        <span className={`${isDark ? "text-blue-400" : "text-[#2563eb]"}`}>
          <TypewriterEffect />
        </span>{" "}
        based in India.
      </h1>

      {/* Description Paragraph */}
      <p
        className={`text-base sm:text-lg lg:text-xl w-full sm:w-3/4 lg:w-2/3 text-center leading-relaxed z-10 transition-all duration-1000 delay-300 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${isDark ? "text-gray-300" : "text-gray-600"}`}
      >
        I am a frontend developer from Ahmedabad, Gujarat, India, and have completed my BE degree in Information
        Technology (IT). I specialize in creating seamless, dynamic web experiences and am passionate about learning new
        technologies to deliver impactful, user-friendly solutions. My goal is to continuously grow as a developer and
        bring cutting-edge technologies to life.
      </p>

      {/* Hero Action Buttons */}
      <div
        className={`hero-action mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 z-10 transition-all duration-1000 delay-500 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
          <button className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-3 px-8 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-2xl font-medium hover:from-[#1d4ed8] hover:to-[#2563eb] group">
            <span className="group-hover:animate-pulse">Connect With Me</span>
          </button>
        </AnchorLink>
        <a
          href="/sahil_resume.pdf"
          download="sahil_resume.pdf"
          className={`py-3 px-8 border-2 border-[#2563eb] rounded-full cursor-pointer transition-all duration-300 font-medium hover:scale-110 active:scale-95 hover:shadow-lg group ${
            isDark
              ? "text-blue-400 hover:bg-blue-400 hover:text-gray-900"
              : "text-[#2563eb] hover:bg-[#2563eb] hover:text-white"
          }`}
        >
          <span className="group-hover:animate-pulse">My Resume</span>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
          <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
