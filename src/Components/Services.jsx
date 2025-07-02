"use client";

import { FaDesktop, FaLaptopCode, FaPen, FaShoppingCart, FaCode, FaCloud, FaMobileAlt } from "react-icons/fa";
import Services_Data from "../assets/services_data";
import Title from "./Title";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { useTheme } from "../Context/theme-context";

const Services = () => {
    const [ref, isVisible] = useScrollAnimation(0.2);
    const { isDark } = useTheme();

    const getServiceIcon = (serviceName) => {
        const iconMap = {
            "Web Design": FaDesktop,
            "Web Development (MERN Stack)": FaLaptopCode,
            "Content Writing": FaPen,
            "UI/UX Design": FaMobileAlt,
            "E-commerce Development": FaShoppingCart,
            "API Integration": FaCode,
            "Cloud Solutions": FaCloud,
        };
        return iconMap[serviceName] || FaCode;
    };

    return (
        <div id="Services" className={`services flex flex-col items-center justify-center py-20 transition-all duration-1000 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
            <Title title="Services" />

            <div ref={ref} className="services-container w-[90%] sm:w-[80%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Services_Data.map((service, index) => {
                    const IconComponent = getServiceIcon(service.s_name);
                    return (
                        <div
                            key={index}
                            className={`service-card border p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${isDark ? "bg-gray-900 border-gray-700 hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#3b82f6]" : "bg-white border-gray-200 hover:bg-gradient-to-br hover:from-[#2563eb] hover:to-[#3bf683]"
                                } hover:text-white ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                            style={{ transitionDelay: `${index * 100}ms` }}>
                            <div className="flex items-center mb-4 justify-center gap-3">
                                <div className={`icon text-3xl transition-all duration-300 group-hover:text-white group-hover:animate-bounce ${isDark ? "text-blue-400" : "text-[#2563eb]"}`}>
                                    <IconComponent />
                                </div>
                            </div>
                            <h2 className={`text-lg font-semibold transition-all duration-300 mb-3 text-center group-hover:text-white group-hover:animate-pulse ${isDark ? "text-blue-400" : "text-[#2563eb]"}`}>
                                {service.s_no} : {service.s_name}
                            </h2>
                            <p className={`text-center leading-relaxed transition-all duration-300 group-hover:text-gray-100 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{service.s_desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Services;
