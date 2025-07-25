"use client"

import { useState, useEffect, useRef } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { MdOutlineMenu } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { useTheme } from "../Context/theme-context"

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("Home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark } = useTheme()
  const mobileMenuRef = useRef(null)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if clicked outside of both menu and button
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

    // Add event listener when menu is open
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleMenuClick = (menu) => {
    setActiveMenu(menu)
    setIsMobileMenuOpen(false)
  }

  return (
    <div
      className={`navbar fixed top-0 left-0 right-0 transition-all duration-500 flex items-center justify-between py-[20px] px-[20px] lg:px-[140px] z-40 ${
        isScrolled
          ? `${isDark ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-md shadow-xl ${isDark ? "border-gray-800" : "border-gray-200"} border-b`
          : `${isDark ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-sm`
      }`}
    >
      {/* Logo */}
      <AnchorLink className="anchor-link" offset={50} href={`#Home`}>
        <h1
          className={`text-xl font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent cursor-pointer hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none`}
        >
          Sahil Miyawala
        </h1>
      </AnchorLink>

      {/* Mobile Menu Icon */}
      <div
        ref={menuButtonRef}
        className={`menu-icon text-2xl lg:hidden cursor-pointer hover:scale-125 active:scale-95 transition-all duration-300 ${
          isDark ? "text-blue-400" : "text-[#2563eb]"
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div className="relative w-6 h-6">
          <MdOutlineMenu
            className={`absolute inset-0 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <IoMdClose
            className={`absolute inset-0 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
            }`}
          />
        </div>
      </div>

      {/* Overlay for outside clicks - Mobile Only */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Navigation Menu */}
      <ul
        ref={mobileMenuRef}
        className={`nav-menu fixed top-0 left-0 h-screen w-3/4 lg:w-auto lg:h-auto lg:static lg:flex flex-col lg:flex-row items-start lg:items-center gap-[30px] text-sm font-medium transition-all duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:transform-none ${
          isDark ? "bg-gray-900 text-gray-300 lg:bg-transparent" : "bg-white text-gray-600 lg:bg-transparent"
        } pt-20 lg:pt-0 px-6 lg:px-0 shadow-2xl lg:shadow-none`}
      >
        {["Home", "About Me", "Services", "My Work", "Experiences", "Contact Me"].map((menu, index) => (
          <AnchorLink key={menu} className="anchor-link w-full" offset={50} href={`#${menu.replace(/\s+/g, "")}`}>
            <li
              className={`cursor-pointer text-[#2563eb]/70 py-3 lg:py-0 transition-all duration-300 hover:scale-110 active:scale-95 relative group w-full ${
                activeMenu === menu
                  ? `${isDark ? "text-blue-400" : "text-[#2563eb]"} font-semibold`
                  : `${isDark ? "hover:text-blue-400" : "hover:text-[#2563eb]"}`
              }`}
              onClick={() => handleMenuClick(menu)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {menu}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2563eb] to-[#3b82f6] transition-all duration-300 group-hover:w-full ${
                  activeMenu === menu ? "w-full" : ""
                }`}
              ></span>
            </li>
          </AnchorLink>
        ))}
      </ul>

      {/* Connect Button */}
      <div className="nav-connect hidden lg:block">
        <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
          <button className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white py-[10px] px-[20px] rounded-full cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 hover:shadow-xl font-medium hover:from-[#1d4ed8] hover:to-[#2563eb]">
            Connect With Me
          </button>
        </AnchorLink>
      </div>
    </div>
  )
}

export default Navbar