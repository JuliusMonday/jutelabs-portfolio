import React from "react";
import { motion } from "framer-motion";
import charlesPhoto from "../assets/charlesosujifoundation.png";
import healthStar from "../assets/healthstar.jpg";
import izunwachukwu from "../assets/izunwachukwu.jpg";
import association from "../assets/studentassoc.jpg";
import bloodmatch from "../assets/bloodmatch.jpg";
import cgpa from "../assets/cgpa.jpg";
import pregvett from "../assets/pregvett.png";
import fidi from "../assets/fidi-web-photo.png";
import phoneId from "../assets/phone-id.png";
const PROJECTS = [
  {
    title: "Izunwachukwu Foundation Website",
    desc: "Nonprofit site for community programs and donations.",
    image: izunwachukwu,
    link:"https://www.izunwachukwufoundation.org/"
  },
  {
    title: "HealthStar EMS Inc.",
    desc: "Emergency medical services website focused on accessibility and trust.",
    image: healthStar,
    link:"https://www.healthstaremsinc.com/"
  },
  {
    title: "BloodMatch",
    desc: "Blood donation and matching platform.",
    image: bloodmatch,
    link:"https://bloodmatch.onrender.com/"
  },
  {
    title: "JuTeLabs CGPA Calculator",
    desc: "An academic tool for calculating CGPA.",
    image: cgpa,
    link: "https://jutelabs-cgpa-calculator.vercel.app/"
  },
  {
    title: "Student Association Website",
    desc: "Platform for student engagement.",
    image: association,
    link:"https://nauradsa-official.vercel.app/"
  },
  {
    title: "The Charles Osuji Foundation",
    desc: "Foundation site showcasing projects and impact.",
    image: charlesPhoto,
    link: "https://www.charlesosujifoundation.ca/"
  },
   {
    title: "Pregvett - project ongoing💕💕",
    desc: "PregVett is Nigeria's leading maternal health platform, providing comprehensive care, guidance, and support for pregnant women throughout their journey.",
    image: pregvett,
    link: "https://pregvett-frontend.onrender.com/"
  },
  {
    title: "FIDI - MAIN WEBSITE",
    desc: "FIDI is a website for a law firm that offers a unique opportunity for internationally trained lawyers to gain practical skills and knowledge in the practice of law in Alberta, Canada.",
    image: fidi,
    link: "https://www.fidiosujismith.ca/"
  },
  {
    title: "Phone Number Identifier",
    desc: "A website Dedicated to bringing certainty in mobile phone number validation across all providers",
    image: phoneId,
    link: "https://juliusmonday.github.io/numberIdentifier/"
  }
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-20 bg-[#0a192f] text-[#d9e3f0]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center md:text-left"
        >
          Featured <span className="text-[#00ffff]">Projects</span>
        </motion.h2>

        {/* Project Grid */}
        <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-col sm:flex-row items-center gap-4 bg-[#d9e3f0] text-[#0a192f] p-5 rounded-xl shadow-md hover:shadow-[0_0_15px_#00ffff55] transition-all"
            >
              {/* Image */}
              <div className="w-full sm:w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                //   onError={(e) => {
                //     e.currentTarget.src =
                //       'https://via.placeholder.com/320x180?text=Project';
                //   }}
                />
              </div>

              {/* Text */}
              <div>
                <h4 className="font-semibold text-lg">{p.title}</h4>
                <p className="text-sm mt-2 text-[#111111b3] leading-relaxed">
                  {p.desc}
                </p>
                <div className="mt-3 text-sm font-medium text-[#22d39a] cursor-pointer hover:underline">
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                              View case study →
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
