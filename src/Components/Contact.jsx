import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";
import Title from './Title';

const Contact = (props) => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "a24cea49-66c8-46b1-81ad-586acd6af1d1");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        }).then((res) => res.json());

        if (res.success) {
            toast.success("E-Mail Sent Successfully");
        }
    };

    return (
        <div id="ContactMe" className="contact-section flex flex-col items-center justify-center py-16">
            {/* Title Section */}
            <Title title="Contact Me" />

            {/* Contact Details & Form Section */}
            <div className="contact-content w-[90%] lg:w-[80%] grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div className="contact-details flex flex-col items-center lg:items-start">
                    <h2 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#203a43] via-[#0f2027] to-[#2c5364] mb-4">
                        Let's Talk
                    </h2>
                    <p className="text-gray-600 max-w-lg lg:text-left">
                        Feel free to reach out to me for collaborations, opportunities, or just a friendly chat!
                    </p>
                    <p className="text-gray-600 max-w-lg lg:text-left mb-6">
                        I'm currently available to take on new projects, so feel free to send me a message about anything
                        you'd like me to work on. You can contact me anytime.
                    </p>
                    <div>
                        <p className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                            <MdEmail className="text-[#2c5364] text-xl" />
                            <strong>Email:</strong> chhipasahil163@gmail.com
                        </p>
                        <p className="text-gray-700 font-medium flex items-center gap-2 mb-2">
                            <MdPhone className="text-[#2c5364] text-xl" />
                            <strong>Phone:</strong> +91 9638473047
                        </p>
                        <p className="text-gray-700 font-medium flex items-center gap-2 mb-4">
                            <MdLocationOn className="text-[#2c5364] text-xl" />
                            <strong>Location:</strong> Gujarat, India
                        </p>
                        <div className="contact-details-icons flex gap-4 text-gray-500">
                            <a href="https://github.com/B3ingSahil007" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" >
                                <FaGithub size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/sahil-miyawala-268852252/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" >
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://www.instagram.com/b3ing_sahil_007/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" >
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.facebook.com/B3ingsahil007" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" >
                                <FaFacebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form border border-[#2c5364] p-3 sm:p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-[#2c5364] mb-4">Send Me A Message :</h3>
                    <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <input type="text" placeholder="Your Name" className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]" required />
                        <input type="email" placeholder="Your Email" className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]" required />
                        <textarea placeholder="Your Message" rows="4" className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c5364]" required ></textarea>
                        <button type="submit" className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] px-6 py-2 rounded-lg text-white hover:text-black shadow-md hover:scale-105 transform transition duration-300 ease-in-out" >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
