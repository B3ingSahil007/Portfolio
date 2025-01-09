import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa"; // Importing the arrow icon
import mywork_data from '../assets/mywork_data'; // Importing the data from the assets file
import Title from './Title';
import error from '../assets/error.gif';

const MyWork = () => {
    const [expandedDescriptions, setExpandedDescriptions] = useState({}); // To track which descriptions are expanded

    // Function to toggle "Read More" and "Read Less"
    const toggleDescription = (index) => {
        setExpandedDescriptions((prevState) => ({
            ...prevState,
            [index]: !prevState[index], // Toggle the current index
        }));
    };

    return (
        <div id='MyWork' className="work flex flex-col items-center justify-center py-16">
            {/* Title Section */}
            <Title title="My Work" />

            {/* Work Section */}
            <div className="work-gallery w-[90%] sm:w-[85%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mywork_data.map((project, index) => (
                    <div key={index} className="work-card relative border border-[#2c5364] p-3 rounded-lg shadow-lg transition ease-linear hover:scale-105 hover:bg-gradient-to-r hover:from-[#0f2027] hover:via-[#203a43] hover:to-[#2c5364] duration-400 transform overflow-hidden z-0 self-start" >
                        <div className="work-image mb-4">
                            <img src={project.w_img || error} alt={project.w_name} className="w-full h-[200px] sm:h-[220px] lg:h-[200px] object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#2c5364]">{project.w_no}. {project.w_name}</h3>
                        <p className="text-base text-gray-500">
                            {expandedDescriptions[index] ? project.w_desc : `${project.w_desc.slice(0, 100)}...`}
                            <span onClick={() => toggleDescription(index)} className="text-[#2c5364] font-medium cursor-pointer ml-1" >
                                {expandedDescriptions[index] ? "Read Less" : "Read More"}
                            </span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Show More Section with Arrow Icon */}
            <a href="https://github.com/B3ingSahil007?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" >
                <div className="work-showmore border rounded-full px-8 sm:px-10 py-2 flex items-center justify-center mt-10 cursor-pointer text-[#2c5364] group">
                    <p className="mr-2 group-hover:-translate-x-2 transition-all duration-200 ease-linear">
                        Show More
                    </p>
                    <FaArrowRight className="text-xl group-hover:translate-x-2 transition-all duration-200 ease-linear" />
                </div>
            </a>
        </div>
    );
};

export default MyWork;
