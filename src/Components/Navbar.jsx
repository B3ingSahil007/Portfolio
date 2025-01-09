import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        setIsMobileMenuOpen(false); // Close mobile menu on selection
    };

    return (
        <div className="navbar flex items-center justify-between py-[20px] px-[20px] lg:px-[140px] shadow-lg relative z-50">
            {/* Logo */}
            <AnchorLink className="anchor-link" offset={50} href={`#Home`}>
                <h1 className="text-xl font-bold text-[#2c5364] cursor-pointer">
                    Sahil Miyawala
                </h1>
            </AnchorLink>

            {/* Mobile Menu Icon */}
            <div className="menu-icon text-2xl text-[#2c5364] lg:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
                {!isMobileMenuOpen && <MdOutlineMenu />}
            </div>

            {/* Navigation Menu */}
            <ul className={`nav-menu fixed lg:static top-0 left-0 bg-[#161513] h-full w-full lg:w-auto lg:bg-transparent lg:flex flex-col lg:flex-row items-center gap-[30px] text-sm font-medium text-gray-400 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:transform-none shadow-none lg:shadow-lg z-50`} >
                {/* Header (Name + Close Button) */}
                {isMobileMenuOpen && (
                    <div className="flex items-center justify-between w-full px-6 py-4 text-white">
                        <h1 className="text-xl font-bold text-[#2c5364] cursor-pointer">Sahil Miyawala</h1>
                        <IoMdClose className="text-2xl cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                )}

                {["Home", "About Me", "Services", "My Work", "Experiences", "Contact Me"].map((menu) => (
                    <AnchorLink className="anchor-link" offset={50} href={`#${menu.replace(/\s+/g, "")}`} >
                        <li key={menu} className={`cursor-pointer px-6 py-3 sm:py-3 lg:py-0 lg:px-0 transition-colors duration-200 ${activeMenu === menu ? "text-[#2c5364] underline-offset-8 underline border-[#2c5364]" : "hover:text-[#2c5364]"}`} onClick={() => handleMenuClick(menu)} >
                            {menu}
                        </li>
                    </AnchorLink>
                ))}
            </ul>

            {/* Connect Button */}
            <div className="nav-connect hidden lg:block hover:text-black py-[10px] px-[20px] rounded-full bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] cursor-pointer transform transition duration-300 ease-in-out hover:scale-105">
                <AnchorLink className="anchor-link" offset={50} href={`#ContactMe`}>
                    Connect With Me
                </AnchorLink>
            </div>
        </div>
    );
};

export default Navbar;
