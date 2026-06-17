const mongoose = require('mongoose');

const establishConnectionSchema = new mongoose.Schema({
    description: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    location: { type: String },
    socialLinks: [{
        platform: { type: String },
        url: { type: String }
    }]
}, { timestamps: true });

module.exports = mongoose.model('EstablishConnection', establishConnectionSchema);
