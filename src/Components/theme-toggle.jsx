import { useTheme } from "../Context/theme-context"
import { Sun, Moon, Zap } from "lucide-react"

const ThemeToggle = ({ className = "" }) => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative group w-12 h-12 flex items-center justify-center
                bg-black/80 backdrop-blur-md
                border border-cyan-500/30
                clip-cyber-sm
                transition-all duration-300
                hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]
                active:scale-95
                ${className}
            `}
            aria-label="Toggle theme"
        >
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Scanning Line */}
            <div className="absolute inset-0 overflow-hidden rounded-none clip-cyber-sm">
                <div className="w-full h-[2px] bg-cyan-400/50 absolute top-0 -translate-y-full group-hover:animate-[scan_1.5s_linear_infinite]" />
            </div>

            {/* Corner Brackets */}
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-cyan-500/70" />
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-cyan-500/70" />
            <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-cyan-500/70" />
            <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-cyan-500/70" />

            {/* Icon Container */}
            <div className="relative z-10 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                {isDark ? (
                    <div className="relative">
                        <Moon className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
                        <Zap className="w-2.5 h-2.5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                ) : (
                    <div className="relative">
                        <Sun className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                        <div className="absolute inset-0 bg-amber-400/30 blur-[2px] -z-10" />
                    </div>
                )}
            </div>
        </button>
    )
}

export default ThemeToggle
