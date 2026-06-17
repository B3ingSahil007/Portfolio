const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    w_no: Number,
    w_name: { type: String, required: true },
    w_img: String,
    w_desc: String,
    tags: [String],
    links: {
        demo: String,
        code: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
