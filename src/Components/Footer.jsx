"use client"

import AnchorLink from "react-anchor-link-smooth-scroll"
import { useTheme } from "../Context/theme-context"

const Footer = () => {
  const { isDark } = useTheme()

  return (
    <div
      className={`footer py-12 transition-all duration-1000 ${
        isDark
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300"
          : "bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#3b82f6] text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="footer-top flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 mb-8">
          {/* Left Section */}
          <div className="footer-top-left flex flex-col md:flex-row gap-6 items-center md:items-start">
            <h2 className="text-3xl font-bold text-center hover:scale-110 transition-all duration-300 cursor-pointer animate-pulse hover:animate-none">
              Sahil Miyawala
            </h2>
            <p
              className={`text-sm md:w-[60%] text-center md:text-left leading-relaxed transition-all duration-300 ${
                isDark ? "text-gray-400" : "text-blue-100"
              }`}
            >
              I am a frontend developer from Ahmedabad, Gujarat, India, with experience in building modern web
              applications. Skilled in React.js, JavaScript, and the MERN stack, I have worked on projects like Invoxify
              and Fashion Frenzy, delivering seamless user experiences.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div
          className={`footer-bottom flex flex-col md:flex-row justify-between items-center border-t pt-6 ${
            isDark ? "border-gray-700" : "border-blue-400"
          }`}
        >
          {/* Left Section: Copyright */}
          <div
            className={`footer-bottom-left text-sm text-center md:text-left mb-4 md:mb-0 transition-all duration-300 ${
              isDark ? "text-gray-400" : "text-blue-100"
            }`}
          >
            &copy; {new Date().getFullYear()} Sahil Miyawala. All Rights Reserved.
          </div>

          {/* Center Section: Links */}
          <ul
            className={`footer-bottom-middle flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm font-medium transition-all duration-300 ${
              isDark ? "text-gray-400" : "text-blue-100"
            }`}
          >
            {["Terms Of Services", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
              >
                {item}
              </li>
            ))}
            <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
              <li className="cursor-pointer hover:text-white transition-all duration-200 hover:scale-110 active:scale-95">
                Connect With Me
              </li>
            </AnchorLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
