"use client"

import { useEffect } from "react"
import { ThemeProvider, useTheme } from "./Context/theme-context"
import LoadingScreen from "./Components/loading-screen"
import ThemeToggle from "./Components/theme-toggle"
import Navbar from "./components/navbar"
import Hero from "./Components/Hero"
import About from "./components/about"
import Services from "./components/services"
import MyWork from "./components/mywork"
import Experiences from "./components/experiences"
import Contact from "./components/contact"
import Footer from "./components/footer"

const AppContent = () => {
  const { isLoading, isDark } = useTheme()

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
      if (e.target.closest(".anchor-link")) {
        e.preventDefault()
        const href = e.target.closest(".anchor-link").getAttribute("href")
        if (href.startsWith("#")) {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }

    document.addEventListener("click", handleSmoothScroll)
    return () => document.removeEventListener("click", handleSmoothScroll)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <Navbar />
      <ThemeToggle />
      <main>
        <Hero />
        <About />
        <Services />
        <MyWork />
        <Experiences />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
