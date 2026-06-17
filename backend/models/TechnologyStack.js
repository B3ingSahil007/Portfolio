const mongoose = require('mongoose');

const technologyStackSchema = new mongoose.Schema({
    frontend: [{ type: String }],
    backend: [{ type: String }],
    ecosystemAndDesign: [{ type: String }],
    others: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('TechnologyStack', technologyStackSchema);
