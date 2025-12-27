"use client"

import { useTheme } from "../Context/theme-context"

const LoadingScreen = () => {
  const { isDark } = useTheme()

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${isDark ? "bg-gray-900" : "bg-white"
        }`}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent animate-pulse`}
          >
            Sahil Miyawala
          </h1>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-3 h-3 bg-[#2563eb] rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-[#3b82f6] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-[#60a5fa] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        {/* Loading Text */}
        <p className={`mt-4 text-sm ${isDark ? "text-gray-400" : "text-gray-600"} animate-pulse`}>
          Loading Portfolio...
        </p>

        {/* Progress Bar */}
        <div className={`w-64 h-1 ${isDark ? "bg-gray-800" : "bg-gray-200"} rounded-full mt-4 mx-auto overflow-hidden`}>
          <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
