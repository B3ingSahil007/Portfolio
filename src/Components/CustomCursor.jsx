"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)

    const ringX = useSpring(0, { stiffness: 150, damping: 20 })
    const ringY = useSpring(0, { stiffness: 150, damping: 20 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            ringX.set(e.clientX - 16)
            ringY.set(e.clientY - 16)
        }

        const handleMouseOver = (e) => {
            const target = e.target
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest(".anchor-link") ||
                target.classList.contains("cursor-pointer")
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseover", handleMouseOver)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseover", handleMouseOver)
        }
    }, [ringX, ringY])

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[10000]">
            {/* Main Dot */}
            <motion.div
                className="fixed w-2 h-2 bg-blue-600 rounded-full"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />
            {/* Outer Ring */}
            <motion.div
                className="fixed w-8 h-8 border border-blue-600/50 rounded-full"
                style={{
                    x: ringX,
                    y: ringY,
                }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    backgroundColor: isHovering ? "rgba(37, 99, 235, 0.1)" : "transparent",
                }}
            />
        </div>
    )
}

export default CustomCursor
