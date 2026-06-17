const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    s_no: String,
    s_name: String,
    s_desc: String
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
