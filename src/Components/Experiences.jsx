import React from 'react';
import Experience_Data from '../assets/experience_data';
import Title from './Title';

const Experiences = () => {
    return (
        <div id='Experiences' className="experience-section flex flex-col items-center justify-center py-16">
            {/* Title Section */}
            <Title title="My Experience" />

            {/* Experiences List */}
            <div className="experience-list w-[90%] sm:w-[85%] lg:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                {Experience_Data.reverse().map((experience, index) => (
                    <div key={index} className="experience-card border border-[#2c5364] p-4 rounded-lg shadow-md transition transform ease-linear hover:scale-105 hover:bg-gradient-to-r hover:from-[#0f2027] hover:via-[#203a43] hover:to-[#2c5364] duration-400 group" >
                        <h3 className="text-xl sm:text-2xl font-semibold text-[#2c5364] mb-2">{experience.e_name}</h3>
                        <div className="mb-4 flex flex-wrap">
                            <p className="text-sm font-medium text-gray-500 w-full sm:w-auto mr-2">{experience.e_time}</p>
                            {experience.e_company && (
                                <p className="text-sm font-medium text-gray-500 w-full sm:w-auto">
                                    <strong>Company:</strong> {experience.e_company}
                                </p>
                            )}
                        </div>
                        <p className="text-base text-gray-700 group-hover:text-gray-400">
                            {experience.s_desc || 'Description coming soon...'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experiences;
