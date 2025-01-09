import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Footer = () => {

    return (
        <div className="footer bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-6">
            <div className="container mx-auto px-4">
                {/* Footer Top */}
                <div className="footer-top flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
                    {/* Left Section */}
                    <div className="footer-top-left row flex flex-col md:flex-row gap-3 items-center md:items-start">
                        <h2 style={{ textShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)' }} className="text-2xl font-bold col text-center hover:text-black transition-colors duration-200">
                            Sahil Miyawala
                        </h2>
                        <p className="text-sm md:w-[50%] col text-center md:text-left">
                            I am a frontend developer from Ahmedabad, Gujarat, India, with experience in building modern web applications. Skilled in React.js, JavaScript, and the MERN stack, I have worked on projects like Invoxify and Fashion Frenzy, delivering seamless user experiences.
                        </p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom flex flex-col md:flex-row justify-between items-center mt-3 border-t border-gray-600 pt-3">
                    {/* Left Section: Copyright */}
                    <div className="footer-bottom-left text-sm text-center md:text-left">
                        &copy; {new Date().getFullYear()} Sahil Miyawala. All Rights Reserved.
                    </div>

                    {/* Center Section: Links */}
                    <ul className="footer-bottom-middle flex flex-wrap justify-center md:justify-start items-center gap-[15px] md:gap-[30px] text-sm font-medium text-gray-400">
                        <li className="cursor-pointer hover:text-black transition-colors duration-200">Terms Of Services</li>
                        <li className="cursor-pointer hover:text-black transition-colors duration-200">Privacy Policy</li>
                        <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`} >
                            <li className="cursor-pointer hover:text-black transition-colors duration-200">
                                Connect With Me
                            </li>
                        </AnchorLink>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
