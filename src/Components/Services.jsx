import React from 'react';
import { FaDesktop, FaLaptopCode, FaPen, FaShoppingCart, FaCode, FaCloud, FaMobileAlt } from 'react-icons/fa'; // Adding new icons
import Services_Data from '../assets/services_data';
import Title from './Title';

const Services = () => {
    return (
        <div id='Services' className="services flex flex-col items-center justify-center py-20">
            {/* Title Section */}
            <Title title="Services" />

            {/* Services Section */}
            <div className="services-container w-[90%] sm:w-[80%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Services_Data.map((service, index) => (
                    <div key={index} className="service-card border border-[#2c5364] p-6 rounded-lg shadow-lg transition ease-linear hover:scale-105 hover:bg-gradient-to-r hover:from-[#0f2027] hover:via-[#203a43] hover:to-[#2c5364] hover:text-white duration-400" >
                        {/* Service Icons */}
                        <div className="flex items-center mb-3 justify-center gap-2">
                            <div className="icon text-2xl sm:text-2xl text-[#2c5364]">
                                {service.s_name === "Web Design" && <FaDesktop />}
                                {service.s_name === "Web Development (MERN Stack)" && <FaLaptopCode />}
                                {service.s_name === "Content Writing" && <FaPen />}
                                {service.s_name === "UI/UX Design" && <FaMobileAlt />}
                                {service.s_name === "E-commerce Development" && <FaShoppingCart />}
                                {service.s_name === "API Integration" && <FaCode />}
                                {service.s_name === "Cloud Solutions" && <FaCloud />}
                            </div>
                            <h2 className="text-lg sm:text-lg font-semibold text-[#2c5364]">{service.s_no} : {service.s_name}</h2>
                        </div>
                        <p className="text-gray-500 text-center">{service.s_desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
