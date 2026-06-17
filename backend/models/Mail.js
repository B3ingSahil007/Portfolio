const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true },
    message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Mail', mailSchema);
