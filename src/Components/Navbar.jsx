"use client"

import { useState, useEffect, useRef } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { MdOutlineMenu } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../Context/theme-context"
import ThemeToggle from "./theme-toggle"

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("Home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark } = useTheme()
  const mobileMenuRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  const handleMenuClick = (menu) => {
    setActiveMenu(menu)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-2 py-3 lg:px-12 ${isScrolled
        ? "py-3"
        : "py-6"
        }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-8 py-4 transition-all duration-300 clip-hud ${isScrolled
        ? `glass-effect shadow-lg ${isDark ? "bg-black/40 border-b border-blue-500/20" : "bg-white/40 border-b border-blue-500/10"}`
        : "bg-transparent"
        }`}>
        {/* Logo */}
        <AnchorLink className="anchor-link" offset={50} href={`#Home`}>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold font-mono glitch-hover bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent cursor-pointer tracking-tighter"
          >
            {"<Sahil />"}
          </motion.h1>
        </AnchorLink>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8">
          {["Home", "About Me", "Services", "My Work", "Experiences", "Contact Me"].map((menu) => (
            <AnchorLink key={menu} className="anchor-link" offset={50} href={`#${menu.replace(/\s+/g, "")}`}>
              <li
                onClick={() => handleMenuClick(menu)}
                className={`relative cursor-pointer text-sm font-medium transition-all duration-300 hover:text-blue-500 ${activeMenu === menu
                  ? (isDark ? "text-white" : "text-gray-900")
                  : (isDark ? "text-gray-400" : "text-gray-600")
                  }`}
              >
                {menu}
                {activeMenu === menu && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                  />
                )}
              </li>
            </AnchorLink>
          ))}
        </ul>

        {/* Desktop Connect Button */}
        <div className="hidden lg:flex items-center gap-6">
          <ThemeToggle />
          <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-2.5 font-mono font-bold text-white bg-blue-600/10 border border-blue-500/50 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300 clip-cyber-sm group overflow-hidden"
            >
              <span className="relative z-10 text-neon">Connect</span>
              <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </AnchorLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          ref={menuButtonRef}
          className={`lg:hidden text-2xl cursor-pointer ${isDark ? "text-white" : "text-gray-900"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <IoMdClose /> : <MdOutlineMenu />}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 lg:hidden shadow-2xl p-8 flex flex-col gap-6 ${isDark ? "bg-gray-900" : "bg-white"
                }`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Sahil</h1>
                  <ThemeToggle />
                </div>
                <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
              </div>
              <ul className="flex flex-col gap-4">
                {["Home", "About Me", "Services", "My Work", "Experiences", "Contact Me"].map((menu) => (
                  <AnchorLink key={menu} className="anchor-link" offset={50} href={`#${menu.replace(/\s+/g, "")}`}>
                    <li
                      onClick={() => handleMenuClick(menu)}
                      className={`text-lg font-medium py-2 border-b border-white/5 ${activeMenu === menu ? "text-blue-500" : (isDark ? "text-gray-300" : "text-gray-600")
                        }`}
                    >
                      {menu}
                    </li>
                  </AnchorLink>
                ))}
              </ul>
              <AnchorLink className="anchor-link mt-auto" offset={50} href={`#ContactMe`}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-blue-600/10 border border-blue-500 text-blue-400 font-mono font-bold tracking-widest uppercase clip-cyber-sm hover:bg-blue-600 hover:text-white transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    INIT_CONNECTION
                  </span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

                  {/* Decorative Corners */}
                  <div className="absolute top-0 right-0 p-1">
                    <div className="w-2 h-2 border-t border-r border-blue-400/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-1">
                    <div className="w-2 h-2 border-b border-l border-blue-400/50" />
                  </div>
                </motion.button>

              </AnchorLink>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar