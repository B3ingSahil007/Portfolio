const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    durationFrom: { type: String }, // Can be Date or String like "Jan 2023"
    durationTo: { type: String },
    responsibilities: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
