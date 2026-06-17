const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    icon: { type: String }, // URL or icon name
    heading: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Services', serviceSchema);
