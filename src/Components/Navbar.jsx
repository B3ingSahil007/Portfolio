"use client"

import { useState, useEffect } from "react"
import AnchorLink from "react-anchor-link-smooth-scroll"
import { MdOutlineMenu } from "react-icons/md"
import { IoMdClose } from "react-icons/io"
import { useTheme } from "../Context/theme-context"

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState("Home")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDark } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuClick = (menu) => {
    setActiveMenu(menu)
    setIsMobileMenuOpen(false)
  }

  return (
    <div
      className={`navbar fixed-top transition-all duration-500 flex items-center justify-between py-[20px] px-[20px] lg:px-[140px] z-40 ${
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

      {/* Navigation Menu */}
      <ul
        className={`nav-menu fixed lg:static top-0 left-0 h-full w-full lg:w-auto lg:flex flex-col lg:flex-row items-center gap-[30px] text-sm font-medium transition-all duration-500 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:transform-none ${
          isDark ? "bg-gray-900/95 text-gray-300 lg:bg-transparent" : "bg-white/95 text-gray-600 lg:bg-transparent"
        } backdrop-blur-md lg:backdrop-blur-none shadow-2xl lg:shadow-none`}
      >
        {/* Header (Name + Close Button) - Mobile Only */}
        {isMobileMenuOpen && (
          <div
            className={`flex items-center justify-between w-full px-6 py-3 lg:hidden ${
              isDark ? "border-gray-800" : "border-gray-200"
            } border-b`}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">
              Sahil Miyawala
            </h1>
            <IoMdClose
              className={`text-2xl cursor-pointer transition-all duration-300 hover:scale-125 active:scale-95 ${
                isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-[#2563eb]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}

        {["Home", "About Me", "Services", "My Work", "Experiences", "Contact Me"].map((menu, index) => (
          <AnchorLink key={menu} className="anchor-link" offset={50} href={`#${menu.replace(/\s+/g, "")}`}>
            <li
              className={`cursor-pointer text-[#2563eb]/70 px-6 py-1 lg:py-0 lg:px-0 transition-all duration-300 hover:scale-110 active:scale-95 relative group ${
                activeMenu === menu
                  ? `${isDark ? "text-blue-400" : "text-[#2563eb]"} font-semibold`
                  : `${isDark ? "hover:text-blue-400" : "hover:text-[#2563eb]"}`
              }`}
              onClick={() => handleMenuClick(menu)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {menu}
              {/* Animated underline */}
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
