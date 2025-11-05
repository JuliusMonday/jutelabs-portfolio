import React from "react";
import {
  FaLaptopCode,
  FaServer,
  FaPaintBrush,
  FaPrint,
  FaFileAlt,
  FaPython,
  FaFlask,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { motion } from "framer-motion";

const SERVICES = [
  { icon: <FaLaptopCode size={22} />, title: "Frontend Development", desc: "Responsive interfaces with React & Tailwind" },
  { icon: <FaServer size={22} />, title: "Backend Development", desc: "APIs and services with Node.js & Express" },
  { icon: <FaPaintBrush size={22} />, title: "Graphics Designing", desc: "Flyers, banners, logos and branding" },
  { icon: <FaPrint size={22} />, title: "Typing & Printing", desc: "Document formatting & print-ready files" },
  { icon: <FaFileAlt size={22} />, title: "CV Creation", desc: "Professional resumes & cover letters" },
  { icon: <FaPython size={22} />, title: "Python Development", desc: "Automation, scripts, and data tasks" },
  { icon: <FaFlask size={22} />, title: "Biochemistry Techniques", desc: "Laboratory experience and analysis" },
  { icon: <FaChalkboardTeacher size={22} />, title: "Teaching Programming", desc: "Beginner-friendly mentoring and training" },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-[#111111] text-white px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#00FFF0]"
        >
          My Services
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((s, index) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-6 bg-[#111111] border border-[#1E1E1E] rounded-2xl shadow-md hover:shadow-[#00FFF0]/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-[#00FFF0] text-xl">{s.icon}</div>
                <h4 className="font-semibold text-lg">{s.title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
