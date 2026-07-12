import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import Project from '../models/Project.js';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup env
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Original Hardcoded Projects
const originalProjects = [
  {
    title: "Izunwachukwu Foundation Website",
    desc: "Nonprofit site for community programs and donations.",
    imageFile: "izunwachukwu.jpg",
    link: "https://www.izunwachukwufoundation.org/"
  },
  {
    title: "HealthStar EMS Inc.",
    desc: "Emergency medical services website focused on accessibility and trust.",
    imageFile: "healthstar.jpg",
    link: "https://www.healthstaremsinc.com/"
  },
  {
    title: "BloodMatch",
    desc: "Blood donation and matching platform.",
    imageFile: "bloodmatch.jpg",
    link: "https://bloodmatch.onrender.com/"
  },
  {
    title: "JuTeLabs CGPA Calculator",
    desc: "An academic tool for calculating CGPA.",
    imageFile: "cgpa.jpg",
    link: "https://jutelabs-cgpa-calculator.vercel.app/"
  },
  {
    title: "Student Association Website",
    desc: "Platform for student engagement.",
    imageFile: "studentassoc.jpg",
    link: "https://nauradsa-official.vercel.app/"
  },
  {
    title: "The Charles Osuji Foundation",
    desc: "Foundation site showcasing projects and impact.",
    imageFile: "charlesosujifoundation.png",
    link: "https://www.charlesosujifoundation.ca/"
  },
  {
    title: "Pregvett - project ongoing💕💕",
    desc: "PregVett is Nigeria's leading maternal health platform, providing comprehensive care, guidance, and support for pregnant women throughout their journey.",
    imageFile: "pregvett.png",
    link: "https://pregvett-frontend.onrender.com/"
  },
  {
    title: "FIDI - MAIN WEBSITE",
    desc: "FIDI is a website for a law firm that offers a unique opportunity for internationally trained lawyers to gain practical skills and knowledge in the practice of law in Alberta, Canada.",
    imageFile: "fidi-web-photo.png",
    link: "https://www.fidiosujismith.ca/"
  },
  {
    title: "Phone Number Identifier",
    desc: "A website Dedicated to bringing certainty in mobile phone number validation across all providers",
    imageFile: "phone-id.png",
    link: "https://juliusmonday.github.io/numberIdentifier/"
  },
  {
    title: "KedgeAnchorLaw",
    desc: "A website for a law firm that offers a unique opportunity for internationally trained lawyers to gain practical skills and knowledge in the practice of law in Alberta, Canada.",
    imageFile: "kedgeanchorlaw-photo.png",
    link: "https://kedgeanchorlaw.ca/"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected successfully!');

    // 2. Clear existing projects just in case
    await Project.deleteMany();
    console.log('Cleared existing projects from DB');

    // 3. Loop through projects, upload image to Cloudinary, save to DB
    for (const proj of originalProjects) {
      console.log(`Uploading image for: ${proj.title}...`);
      
      const imagePath = path.resolve(__dirname, `../../frontend/src/assets/${proj.imageFile}`);
      
      try {
        const uploadResponse = await cloudinary.uploader.upload(imagePath, {
          folder: 'jutelabs_projects',
        });

        await Project.create({
          title: proj.title,
          desc: proj.desc,
          link: proj.link,
          image: uploadResponse.secure_url,
        });
        
        console.log(`✅ Saved: ${proj.title}`);
      } catch (uploadError) {
        console.error(`❌ Failed to upload image for ${proj.title}:`, uploadError.message);
      }
    }

    console.log('🎉 Seeding complete! All your original projects have been restored via the backend.');
    process.exit();
  } catch (error) {
    console.error('Fatal Error:', error);
    process.exit(1);
  }
};

seedDatabase();
