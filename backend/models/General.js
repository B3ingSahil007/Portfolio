const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: "Sahil Miyawala" },
        roles: { type: [String], default: ["Frontend Developer", "React Native Developer"] },
        subtitle: { type: String, default: "Frontend Developer" }, // Keeping for backward compatibility or singular use
        location: { type: String, default: "based in Ahmedabad, Gujarat, India." },
        description: String,
        resumeLink: String,
        connectLink: String
    },
    about: {
        bio: String,
        stats: [{
            label: String,
            value: String
        }],
        skills: [String]
    },
    footer: {
        copyrightText: String,
        socialLinks: [{
            platform: String,
            url: String
        }]
    }
}, { timestamps: true });

module.exports = mongoose.model('General', generalSchema);
