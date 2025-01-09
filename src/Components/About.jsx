import React from "react";
import Skills from "./Skills";
import Title from "./Title";

const About = () => {
    return (
        <>
            <div id="AboutMe" className="about flex flex-col items-center justify-center gap-8 py-20 sm:py-40 pt-0 px-4 sm:px-8 lg:px-16">
                {/* Title Section */}
                <Title title="About Me" />

                {/* Paragraph Section */}
                <div className="about-sections w-full sm:w-[80%] lg:w-[70%]">
                    <div className="about-para text-center text-gray-500 text-base sm:text-lg leading-relaxed space-y-4">
                        <p>
                            I am a dedicated Frontend Developer from Ahmedabad, Gujarat, with a BE in Information Technology and practical experience through internships and diverse projects. Skilled in HTML, CSS, JavaScript, ReactJS, Bootstrap, Material-UI, Git, and the MERN stack, I specialize in building responsive, user-friendly web applications.
                        </p>
                        <p>
                            I’ve worked on e-commerce platforms, news apps, and personal portfolios, showcasing my ability to create scalable and impactful solutions. With a passion for problem-solving and continuous learning, I strive to craft innovative digital experiences that bring ideas to life.
                        </p>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="skills px-4 sm:px-8 lg:px-16">
                <Skills />
            </div>
        </>
    );
};

export default About;
