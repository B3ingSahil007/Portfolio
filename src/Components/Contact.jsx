"use client"

import { useState } from "react"
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { toast } from "react-toastify"
import Title from "./title"
import { useScrollAnimation } from "../hooks/use-scroll-animation"
import { useTheme } from "../Context/theme-context"

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ref, isVisible] = useScrollAnimation(0.2)
  const { isDark } = useTheme()

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.target)
    formData.append("access_key", "a24cea49-66c8-46b1-81ad-586acd6af1d1")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json())

      if (res.success) {
        console.log("Success", res)
        toast.success("E-Mail Sent Successfully")
        event.target.reset()
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/B3ingSahil007", label: "GitHub" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/sahil-miyawala-268852252/", label: "LinkedIn" },
    { icon: FaInstagram, url: "https://www.instagram.com/b3ing_sahil_007/", label: "Instagram" },
    { icon: FaFacebook, url: "https://www.facebook.com/B3ingsahil007", label: "Facebook" },
  ]

  return (
    <div
      id="ContactMe"
      className={`contact-section flex flex-col items-center justify-center py-20 transition-all duration-1000 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Title title="Contact Me" />

      <div ref={ref} className="contact-content w-[90%] lg:w-[80%] grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Details */}
        <div
          className={`contact-details flex flex-col items-center lg:items-start p-8 rounded-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          } ${isDark ? "bg-gray-800" : "bg-gray-50"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent mb-6 animate-pulse">
            Let's Talk
          </h2>

          <p
            className={`max-w-lg text-center lg:text-left mb-4 leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Feel free to reach out to me for collaborations, opportunities, or just a friendly chat!
          </p>

          <p
            className={`max-w-lg text-center lg:text-left mb-8 leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            I'm currently available to take on new projects, so feel free to send me a message about anything you'd like
            me to work on. You can contact me anytime.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: MdEmail, label: "Email", value: "chhipasahil163@gmail.com" },
              { icon: MdPhone, label: "Phone", value: "+91 9638473047" },
              { icon: MdLocationOn, label: "Location", value: "Gujarat, India" },
            ].map((contact, index) => (
              <div
                key={contact.label}
                className={`flex items-center gap-3 transition-all duration-500 hover:scale-105 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] p-2 rounded-full">
                  <contact.icon className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-medium">{contact.label}</p>
                  <p className={isDark ? "text-gray-400" : "text-gray-600"}>{contact.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 hover:scale-125 active:scale-95 ${
                  isDark
                    ? "bg-gray-700 text-gray-400 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#3b82f6] hover:text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#3b82f6] hover:text-white"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div
          className={`contact-form border p-8 rounded-2xl shadow-lg transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          } ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
        >
          <h3 className={`text-2xl font-semibold mb-6 ${isDark ? "text-blue-400" : "text-[#2563eb]"}`}>
            Send Me A Message
          </h3>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {[
              { name: "name", type: "text", placeholder: "Your Name" },
              { name: "email", type: "email", placeholder: "Your Email" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                    : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500"
                }`}
                required
                disabled={isSubmitting}
              />
            ))}

            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-300 resize-none hover:scale-105 focus:scale-105 ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400"
                  : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500"
              }`}
              required
              disabled={isSubmitting}
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:scale-105 active:scale-95 transform transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
