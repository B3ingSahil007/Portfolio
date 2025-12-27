import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for saved theme preference or default to dark mode
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme) {
            setIsDark(savedTheme === "dark")
        }

        // Simulate loading screen
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        // Save theme preference
        localStorage.setItem("theme", isDark ? "dark" : "light")

        // Update document class for global styling
        if (isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])

    const toggleTheme = () => {
        setIsDark((prev) => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, isLoading }}>
            {children}
        </ThemeContext.Provider>
    )
}
