const mongoose = require('mongoose');

const systemIdentitySchema = new mongoose.Schema({
    heading: { type: String },
    description: { type: String },
    yearsExp: { type: Number },
    projectsCount: { type: Number },
    classTier: { type: String },
    locationCity: { type: String },
    locationCountry: { type: String },
    missionStatement: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SystemIdentity', systemIdentitySchema);
