"use client"

import { FaDesktop, FaLaptopCode, FaPen, FaShoppingCart, FaCode, FaCloud, FaMobileAlt } from "react-icons/fa"
import Services_Data from "../assets/services_data"
import Title from "./Title"
import { motion } from "framer-motion"
import { useTheme } from "../Context/theme-context"

const Services = () => {
    const { isDark } = useTheme()

    const getServiceIcon = (serviceName) => {
        const iconMap = {
            "Web Design": FaDesktop,
            "Web Development (MERN Stack)": FaLaptopCode,
            "Content Writing": FaPen,
            "UI/UX Design": FaMobileAlt,
            "E-commerce Development": FaShoppingCart,
            "API Integration": FaCode,
            "Cloud Solutions": FaCloud,
        }
        return iconMap[serviceName] || FaCode
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }

    return (
        <div
            id="Services"
            className={`services flex flex-col items-center justify-center py-0 px-6 transition-all duration-1000 ${isDark ? "bg-[#030712]" : "bg-gray-50"
                }`}
        >
            <Title title="Services" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mt-12"
            >
                {Services_Data.map((service, index) => {
                    const IconComponent = getServiceIcon(service.s_name)
                    // Define grid spans based on index for bento look
                    const gridSpans = [
                        "md:col-span-3 lg:col-span-4", // 1
                        "md:col-span-3 lg:col-span-4", // 2
                        "md:col-span-6 lg:col-span-4", // 3
                        "md:col-span-4 lg:col-span-6", // 4
                        "md:col-span-2 lg:col-span-6", // 5
                        "md:col-span-3 lg:col-span-4", // 6
                        "md:col-span-3 lg:col-span-8", // 7
                    ]

                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className={`group relative overflow-hidden p-6 clip-cyber-sm glass-card transition-slow cursor-pointer flex flex-col justify-between ${gridSpans[index % gridSpans.length]
                                } ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-gray-50 hover:bg-white"}`}
                        >
                            {/* Neon Border */}
                            <div className="neon-border clip-cyber-sm text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Holographic Sheen */}
                            <div className="holographic-sheen opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 clip-cyber-sm flex items-center justify-center mb-6 transition-slow group-hover:scale-110 ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"
                                    }`}>
                                    <IconComponent size={24} />
                                </div>
                                <h3 className={`text-xl font-bold mb-3 font-mono ${isDark ? "text-white" : "text-gray-900"}`}>
                                    {service.s_name}
                                </h3>
                                <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                                    {service.s_desc}
                                </p>
                            </div>

                            {/* Decorative background number */}
                            <span className={`absolute -bottom-4 -right-2 text-8xl font-black opacity-5 pointer-events-none transition-slow group-hover:opacity-10 ${isDark ? "text-white" : "text-blue-900"
                                }`}>
                                {service.s_no}
                            </span>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}

export default Services
