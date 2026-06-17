const mongoose = require('mongoose');

const operationalDeploymentSchema = new mongoose.Schema({
    projectImage: { type: String },
    projectName: { type: String, required: true },
    description: { type: String },
    techUsed: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('OperationalDeployments', operationalDeploymentSchema);
