"use client"

import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"

const Title = ({ title }) => {
  const [ref, isVisible] = useScrollAnimation(0.3)
  const { isDark } = useTheme()

  return (
    <div ref={ref} className="contact-title text-center mb-12">
      <h1
        className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent mb-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {title}
      </h1>
      <div
        className={`w-24 h-1 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] mx-auto rounded-full transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      ></div>
      <div
        className={`w-16 h-1 bg-gradient-to-r from-[#60a5fa] to-[#93c5fd] mx-auto mt-2 rounded-full transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      ></div>
    </div>
  )
}

export default Title
