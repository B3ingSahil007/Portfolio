"use client"

// import { useEffect } from "react"
import { ThemeProvider, useTheme } from "./Context/theme-context"
import LoadingScreen from "./Components/loading-screen"
import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import About from "./Components/About"
import Services from "./Components/Services"
import MyWork from "./Components/MyWork"
import Experiences from "./Components/Experiences"
import Contact from "./Components/Contact"
import Footer from "./Components/Footer"
import CustomCursor from "./Components/CustomCursor"

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { useEffect } from "react"
import AdminLayout from "./Admin/AdminLayout"
import Login from "./Admin/Login"
import Dashboard from "./Admin/Dashboard"
import GeneralForm from "./Admin/Forms/GeneralForm"
import AboutForm from "./Admin/Forms/AboutForm"
import TechStackForm from "./Admin/Forms/TechStackForm"
import ServicesForm from "./Admin/Forms/ServicesForm"
import ProjectsForm from "./Admin/Forms/ProjectsForm"
import ExperienceForm from "./Admin/Forms/ExperienceForm"
import ContactForm from "./Admin/Forms/ContactForm"
import MessageForm from "./Admin/Forms/MessageForm"

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <MyWork />
        <Experiences />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

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
    <div className={`min-h-screen transition-all duration-1000 bg-tech-grid ${isDark ? "bg-gray-950" : "bg-white text-gray-900"}`}>
      <div className="noise-overlay" />
      <CustomCursor />
      <Routes>
        <Route path="/" element={<MainLayout />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero" element={<GeneralForm />} />
          <Route path="identity" element={<AboutForm />} />
          <Route path="tech-stack" element={<TechStackForm />} />
          <Route path="services" element={<ServicesForm />} />
          <Route path="deployments" element={<ProjectsForm />} />
          <Route path="experience" element={<ExperienceForm />} />
          <Route path="connection" element={<ContactForm />} />
          <Route path="mail" element={<MessageForm />} />
        </Route>
      </Routes>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
