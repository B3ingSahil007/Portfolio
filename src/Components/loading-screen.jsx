"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../Context/theme-context"

const LoadingScreen = () => {
  const { isDark } = useTheme()
  const [progress, setProgress] = useState(0)
  const [text, setText] = useState("")
  const [status, setStatus] = useState("INITIALIZING...")

  const fullText = "Sahil Miyawala"
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"

  useEffect(() => {
    // Scramble Text Effect
    let iteration = 0
    let interval = null

    const startScramble = () => {
      interval = setInterval(() => {
        setText(
          fullText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return fullText[index]
              }
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join("")
        )

        if (iteration >= fullText.length) {
          clearInterval(interval)
        }

        iteration += 1 / 3
      }, 30)
    }

    startScramble()

    // Progress Bar Simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Random increment for realistic "loading" feel
        return prev + Math.random() * 5
      })
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  // Update Status Text based on progress
  useEffect(() => {
    if (progress < 30) setStatus("LOADING_CORE_ASSETS...")
    else if (progress < 60) setStatus("ESTABLISHING_SECURE_CONNECTION...")
    else if (progress < 90) setStatus("DECRYPTING_USER_DATA...")
    else setStatus("ACCESS_GRANTED")
  }, [progress])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 font-mono ${isDark ? "bg-[#050b14]" : "bg-gray-50"
        }`}
    >
      {/* Tech Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg px-8">

        {/* Name Glitch */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wider mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            {text}
          </h1>
          {/* <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full opacity-50" /> */}
        </div>

        {/* Terminal Status */}
        <div className="flex justify-between items-end mb-2 text-xs uppercase tracking-widest">
          <span className={isDark ? "text-cyan-500" : "text-blue-600"}>
            &gt; {status}
          </span>
          <span className={isDark ? "text-white" : "text-gray-900"}>
            {Math.min(100, Math.floor(progress))}%
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className={`h-2 w-full rounded-sm overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
          {/* Animated Fill */}
          <div
            className="h-full bg-cyan-500 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse" />
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white]" />
          </div>
        </div>

        {/* Decorative Details */}
        <div className="mt-4 flex justify-between text-[10px] text-gray-500">
          <span>RAM: 64TB OK</span>
          <span>SYS: ONLINE</span>
        </div>

      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/30" />

    </div>
  )
}

export default LoadingScreen
