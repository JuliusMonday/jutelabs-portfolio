import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Profile Image */}
        <motion.img
          src="/assets/julius.jpg"
          alt="Monday Chimaobi Julius"
          className="w-64 h-64 rounded-2xl object-cover shadow-lg border-2 border-[#00FFF0]"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Text Section */}
        <motion.div
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#00FFF0]">
            About Me
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            I’m <span className="text-[#00FFF0]">Monday Chimaobi Julius</span>, a passionate
            <b> Full Stack Developer</b> and <b> Biochemist</b> driven by innovation and impact.
            As the Founder of <b className="text-[#00FFF0]">JuTeLabs</b>, I merge technology and
            science to create digital solutions that empower people and organizations.
            From web applications to scientific tools, I aim to bridge the gap between
            <span className="text-[#00FFF0]"> technology</span> and <span className="text-[#00FFF0]">life</span>.
          </p>

          <a
            href="#contact"
            className="px-6 py-3 bg-[#00FFF0] text-black hover:bg-[#00CCC0] rounded-full font-medium shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Let’s Connect
          </a>
        </motion.div>
      </div>
    </section>
  );
}
