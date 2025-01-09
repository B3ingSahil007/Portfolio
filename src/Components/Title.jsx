import React from 'react'

const Title = ({ title }) => {
    return (
        <>
            {/* Title Section */}
            <div className="contact-title text-center mb-8">
                <h1 style={{ textShadow: '0px 0px 2px rgba(255, 255, 255, 0.6)' }} className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] mx-auto"></div>
            </div>
        </>
    )
}

export default Title
