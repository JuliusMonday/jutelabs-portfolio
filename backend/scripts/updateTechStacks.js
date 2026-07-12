import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const projectUpdates = {
  "FIDI - MAIN WEBSITE": {
    techStack: "WordPress, Custom Theme Design, PHP, CSS",
    solution: "Designed and developed a custom WordPress theme from the ground up as a WordPress Developer. Focused on creating a professional, authoritative platform with an intuitive content management experience for the law firm."
  },
  "KedgeAnchorLaw": {
    techStack: "WordPress, Custom Admin Dashboard, PHP, MySQL",
    solution: "Built a robust WordPress site with a completely custom-designed frontend and a tailored custom dashboard for internal management, allowing the firm to effortlessly control their legal training modules and site content."
  },
  "Phone Number Identifier": {
    techStack: "Vanilla HTML, CSS, JavaScript, Regex",
    solution: "Engineered a lightweight, blazing-fast utility website using Vanilla Web Technologies. The core logic utilizes complex JavaScript Regular Expressions (Regex) to instantly validate and identify mobile phone numbers without needing a heavy backend."
  },
  "Pregvett - project ongoing💕💕": {
    techStack: "MERN Stack (MongoDB, Express, React, Node.js)",
    solution: "Currently developing a comprehensive maternal health platform using the full MERN stack. Building a robust React frontend paired with a scalable Node.js/Express backend and MongoDB database for managing patient data securely."
  },
  "The Charles Osuji Foundation": {
    techStack: "WordPress (Frontend), MERN Stack (Backend Services)",
    solution: "Delivered a hybrid architecture: A custom-designed WordPress frontend for highly accessible, marketing-focused content delivery, integrated with secure, custom MERN stack backend services to handle complex organizational data and operations."
  },
  "Student Association Website": {
    techStack: "MERN Stack (MongoDB, Express, React, Node.js)",
    solution: "Created a centralized, high-performance hub for student engagement using the MERN stack. Built custom APIs in Node.js to handle event management, announcements, and a secure member directory with a snappy React frontend."
  },
  "JuTeLabs CGPA Calculator": {
    techStack: "Vanilla HTML, CSS, JavaScript",
    solution: "Designed a lightning-fast, client-side CGPA calculator using pure Vanilla HTML, CSS, and JavaScript. Leveraged browser LocalStorage to persistently save students' academic progress without needing a database connection."
  },
  "BloodMatch": {
    techStack: "MERN Stack (MongoDB, Express, React, Node.js)",
    solution: "Built a real-time blood donation and matching platform leveraging the MERN stack. Engineered the backend to handle geospatial queries and real-time user connections, paired with a responsive React user interface."
  },
  "HealthStar EMS Inc.": {
    techStack: "WordPress, Custom Design",
    solution: "Developed a custom WordPress theme focused on strict accessibility standards and reliability. As a WordPress Developer, I ensured the medical staff could instantly update emergency protocols via a customized, user-friendly WP backend."
  },
  "Izunwachukwu Foundation Website": {
    techStack: "WordPress, Custom Theme Design",
    solution: "Engineered a fully responsive, custom-designed WordPress platform. Integrated tailored plugins and a custom theme to allow volunteers to easily publish program updates and manage community donations securely."
  }
};

const updateProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');

    const projects = await Project.find({});
    
    for (const proj of projects) {
      const data = projectUpdates[proj.title];
      if (data) {
        proj.techStack = data.techStack;
        // Keep the old challenge, but update the solution
        proj.solution = data.solution;
        await proj.save();
        console.log(`✅ Updated: ${proj.title}`);
      }
    }

    console.log('🎉 Tech stacks and solutions updated successfully!');
    process.exit();
  } catch (error) {
    console.error('Fatal Error:', error);
    process.exit(1);
  }
};

updateProjects();
