const mongoose = require('mongoose');
require('dotenv').config();

const General = require('./models/General');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Service = require('./models/Service');

const generalData = {
    hero: {
        title: "I'm Sahil Miyawala",
        subtitle: "Frontend Developer | MERN Stack Developer",
        description: "based in Ahmedabad, Gujarat, India.",
        resumeLink: "/sahil_resume.pdf"
    },
    about: {
        bio: "I am a frontend developer from Ahmedabad, Gujarat, India.",
        stats: [
            { label: "Years of Experience", value: "2+" },
            { label: "Projects Completed", value: "30+" }
        ],
        skills: ["React", "JavaScript", "HTML", "CSS", "Node.js"]
    },
    footer: {
        copyrightText: "Sahil Miyawala. All Rights Reserved.",
        socialLinks: []
    }
};

const servicesData = [
    { s_no: "01", s_name: "Web Design", s_desc: "Crafting visually stunning websites." },
    { s_no: "02", s_name: "MERN Stack", s_desc: "Building robust web apps." }
];

const experienceData = [
    { role: "React Js Developer", company: "SNM TechCraft", period: "April 2025 - Present", description: ["Building apps"] }    
];

const projectsData = [
    { w_no: 1, w_name: "Prescripto", w_img: "/assets/prescrpto.png", w_desc: "Doctor App", tags: ["React"] }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB...");

        await General.deleteMany({});
        await Project.deleteMany({});
        await Experience.deleteMany({});
        await Service.deleteMany({});

        await General.create(generalData);
        await Service.insertMany(servicesData);
        await Experience.insertMany(experienceData);
        await Project.insertMany(projectsData);

        console.log("Database Seeded Successfully!");
        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seedDB();
