"use client"

import { useTheme } from "../Context/theme-context"
import { MdLightMode, MdDarkMode } from "react-icons/md"

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-2 sm:mr-0 mr-10 sm:top-4 right-4 z-40 p-2 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 ${
        isDark
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 shadow-lg shadow-gray-900/50"
          : "bg-white text-gray-700 hover:bg-gray-50 shadow-lg shadow-gray-200/50"
      } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
      aria-label="Toggle theme"
    >
      <div className="relative top-1 -right-1 w-6 h-6">
        <MdLightMode
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <MdDarkMode
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
          }`}
        />
      </div>
    </button>
  )
}

export default ThemeToggle
