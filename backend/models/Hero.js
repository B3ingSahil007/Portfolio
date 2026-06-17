const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    roles: [{ type: String }],
    location: { type: String, default: '' },
    description: { type: String, default: '' },
    resumeLink: { type: String, default: '' },
    subtitle: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
