"use client"

import { ThemeProvider, useTheme } from "./Context/theme-context"
import LoadingScreen from "./Components/loading-screen"
import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import Footer from "./Components/Footer"
import CustomCursor from "./Components/CustomCursor"

import SEO from "./seo/SEO"
import StructuredData from "./seo/StructuredData"

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import React, { useEffect, Suspense } from "react"

const About = React.lazy(() => import("./Components/About"))
const Services = React.lazy(() => import("./Components/Services"))
const MyWork = React.lazy(() => import("./Components/MyWork"))
const Experiences = React.lazy(() => import("./Components/Experiences"))
const Contact = React.lazy(() => import("./Components/Contact"))
const AdminLayout = React.lazy(() => import("./Admin/AdminLayout"))
const Login = React.lazy(() => import("./Admin/Login"))
const Dashboard = React.lazy(() => import("./Admin/Dashboard"))
const GeneralForm = React.lazy(() => import("./Admin/Forms/GeneralForm"))
const AboutForm = React.lazy(() => import("./Admin/Forms/AboutForm"))
const TechStackForm = React.lazy(() => import("./Admin/Forms/TechStackForm"))
const ServicesForm = React.lazy(() => import("./Admin/Forms/ServicesForm"))
const ProjectsForm = React.lazy(() => import("./Admin/Forms/ProjectsForm"))
const ExperienceForm = React.lazy(() => import("./Admin/Forms/ExperienceForm"))
const ContactForm = React.lazy(() => import("./Admin/Forms/ContactForm"))
const MessageForm = React.lazy(() => import("./Admin/Forms/MessageForm"))

const MainLayout = () => {
  return (
    <>
      <SEO 
        title="My Portfolio | Sahil Miyawala"
        description="Portfolio of Sahil Miyawala, a Full Stack Developer specializing in React and MERN stack."
        keywords="Full Stack Developer, MERN Stack Developer, React Developer, Node.js, MongoDB"
        canonicalUrl="https://sahilmiyawala.vercel.app"
        ogTitle="My Portfolio | Sahil Miyawala"
        ogDescription="Portfolio of Sahil Miyawala, a Full Stack Developer specializing in React and MERN stack."
        ogUrl="https://sahilmiyawala.vercel.app"
        ogImage="https://sahilmiyawala.vercel.app/preview.webp"
        twitterTitle="My Portfolio | Sahil Miyawala"
        twitterImage="https://sahilmiyawala.vercel.app/preview.webp"
        twitterDescription="Portfolio of Sahil Miyawala, a Full Stack Developer specializing in React and MERN stack."
      />
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Services />
          <MyWork />
          <Experiences />
          <Contact />
        </Suspense>
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

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className={`min-h-screen transition-all duration-1000 bg-tech-grid ${isDark ? "bg-gray-950" : "bg-white text-gray-900"}`}>
        <div className="noise-overlay" />
        <CustomCursor />
        <Suspense fallback={<LoadingScreen />}>
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
        </Suspense>
      </div>
    </>
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
