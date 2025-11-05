import React from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiGithub,
  SiMongodb,
  SiWordpress,
  SiPython,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
const TECH = [
  { icon: <SiHtml5 className="text-orange-500" />, label: "HTML" },
  { icon: <SiCss3 className="text-blue-500" />, label: "CSS" },
  { icon: <SiJavascript className="text-yellow-400" />, label: "JavaScript" },
  { icon: <SiTailwindcss className="text-[#00ffff]" />, label: "TailwindCSS" },
  { icon: <SiReact className="text-[#22d39a]" />, label: "React" },
  { icon: <SiNodedotjs className="text-green-600" />, label: "Node.js" },
  { icon: <SiExpress className="text-gray-700" />, label: "Express.js" },
  { icon: <SiGithub className="text-black" />, label: "Git & GitHub" },
  { icon: <SiMongodb className="text-green-500" />, label: "MongoDB" },
  { icon: <SiWordpress className="text-[#22d39a]" />, label: "WordPress" },
{ icon: <SiPython className="text-blue-500" />, label: "Python" },
  { icon: <FaMicrosoft className="text-blue-500" />, label: "Microsoft Packages" },
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-20 px-6 md:px-20 bg-[#d9e3f0]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center md:text-left text-[#0a192f]"
        >
          My <span className="text-[#0a192f]/90">Expertise</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-[#111111]/80 text-center md:text-left"
        >
          Technologies & tools I use frequently:
        </motion.p>

        {/* Tech Grid */}
        <div className="mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {TECH.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.3)",
              }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-md hover:shadow-[#00ffff]/30 transition-all"
            >
              <div className="text-4xl mb-2">{t.icon}</div>
              <div className="text-sm font-medium text-[#0a192f]">
                {t.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
