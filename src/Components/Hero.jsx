import React, { memo } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { Typewriter } from "react-simple-typewriter";

// Separate Typewriter Component to prevent unnecessary re-renders
const TypewriterEffect = memo(() => (
    <Typewriter
        words={["Frontend Developer", "Web Designer", "MERN Developer", "Software Developer"]}
        loop={true}
        cursor
        cursorStyle="|"
        typeSpeed={100}
        deleteSpeed={50}
        delaySpeed={1000}
    />
));

const Hero = () => {
    return (
        <div id="Home" className="hero flex flex-col items-center gap-8 py-20 sm:py-40 px-4 sm:px-8 lg:px-16 xl:px-24">
            {/* Main Heading */}
            <h1 className="text-center w-full sm:w-3/4 lg:w-[70%] text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-700 leading-snug">
                I'm <span className="bg-gradient-to-r from-[#2c5364] to-[#203a43] bg-clip-text text-transparent">Sahil Miyawala</span>,{" "}
                <span className="text-[#2c5364]"><TypewriterEffect /></span> based in India.
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg w-full sm:w-3/4 lg:w-2/3 text-center text-gray-500">
                I am a frontend developer from Ahmedabad, Gujarat, India, and have completed my BE degree in Information Technology ( IT ). I specialize in creating seamless, dynamic web experiences and am passionate about learning new technologies to deliver impactful, user-friendly solutions. My goal is to continuously grow as a developer and bring cutting-edge technologies to life.
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-action mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
                    <div className="hero-connect hover:text-black py-2 px-6 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-full cursor-pointer hover:scale-105 transition-all">
                        Connect With Me
                    </div>
                </AnchorLink>
                <a href='/sahil_resume.pdf' download="sahil_resume.pdf" className="hero-resume py-2 px-6 border-2 border-[#2c5364] rounded-full text-[#2c5364] cursor-pointer hover:bg-[#2c5364] hover:text-white transition-all" >
                    My Resume
                </a>
            </div>
        </div>
    );
};

export default Hero;
