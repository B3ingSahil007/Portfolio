const express = require('express');
const router = require('express').Router();
const auth = require('../middleware/auth');
const Hero = require('../models/Hero');
const SystemIdentity = require('../models/SystemIdentity');
const TechnologyStack = require('../models/TechnologyStack');
const Services = require('../models/Services');
const OperationalDeployments = require('../models/OperationalDeployments');
const Experience = require('../models/Experience');
const EstablishConnection = require('../models/EstablishConnection');
const Mail = require('../models/Mail');

// Helper to get singular document collections (create if not exists)
const getSingular = async (Model) => {
    let doc = await Model.findOne();
    if (!doc) {
        doc = new Model({});
        await doc.save();
    }
    return doc;
};

// --- GET ALL CONTENT ---
router.get('/', async (req, res) => {
    try {
        const [
            hero,
            systemIdentity,
            techStack,
            services,
            deployments,
            experiences,
            connection
        ] = await Promise.all([
            getSingular(Hero),
            getSingular(SystemIdentity),
            getSingular(TechnologyStack),
            Services.find(),
            OperationalDeployments.find(),
            Experience.find(),
            getSingular(EstablishConnection)
        ]);

        res.json({
            hero,
            systemIdentity,
            techStack,
            services,
            deployments,
            experiences,
            connection
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error fetching content' });
    }
});

// --- SINGULAR COLLECTIONS (Hero, SystemIdentity, TechStack, Connection) ---

// Generic Update for Singular Models
const updateSingular = (Model) => async (req, res) => {
    try {
        let doc = await Model.findOne();
        if (!doc) doc = new Model();

        Object.assign(doc, req.body);
        await doc.save();
        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: 'Error updating document' });
    }
};

router.put('/hero', auth, updateSingular(Hero));
router.put('/system-identity', auth, updateSingular(SystemIdentity));
router.put('/tech-stack', auth, updateSingular(TechnologyStack));
router.put('/connection', auth, updateSingular(EstablishConnection));


// --- ARRAY COLLECTIONS (Services, Deployments, Experience) ---

// Generic CRUD for Array Models
const createItem = (Model) => async (req, res) => {
    try {
        const newItem = new Model(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Error creating item' });
    }
};

const updateItem = (Model) => async (req, res) => {
    try {
        const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: 'Error updating item' });
    }
};

const deleteItem = (Model) => async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item' });
    }
};

// Services
router.post('/services', auth, createItem(Services));
router.put('/services/:id', auth, updateItem(Services));
router.delete('/services/:id', auth, deleteItem(Services));

// Operational Deployments
router.post('/deployments', auth, createItem(OperationalDeployments));
router.put('/deployments/:id', auth, updateItem(OperationalDeployments));
router.delete('/deployments/:id', auth, deleteItem(OperationalDeployments));

// Experience
router.post('/experiences', auth, createItem(Experience));
router.put('/experiences/:id', auth, updateItem(Experience));
router.delete('/experiences/:id', auth, deleteItem(Experience));


// --- MAIL (Contact Form) ---
router.post('/mail', async (req, res) => {
    try {
        const newMail = new Mail(req.body);
        await newMail.save();
        res.json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error sending message' });
    }
});

router.get('/mail', auth, async (req, res) => {
    try {
        const mails = await Mail.find().sort({ createdAt: -1 });
        res.json(mails);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mails' });
    }
});

router.delete('/mail/:id', auth, async (req, res) => {
    try {
        await Mail.findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting message' });
    }
});

module.exports = router;
