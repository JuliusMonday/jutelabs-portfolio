import React from "react";
import { motion } from "framer-motion";
import { ReactTyped }from "react-typed";
import ThreeScene from "./ThreeScene.jsx";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex my-0 items-center justify-center overflow-hidden bg-[#0a192f] text-[#d9e3f0] m-0 p-0"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ThreeScene />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a192f]/80 via-[#0a192f]/40 to-[#0a192f]/95 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 px-6 md:px-20 max-w-6xl w-full">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Hi, I’m{" "}
            <span className="text-[#00ffff]">
              <ReactTyped
                strings={[
                  "Monday Chimaobi Julius",
                  "a Full Stack Developer",
                  "a Biochemist",
                  "Founder of JuTeLabs",
                ]}
                typeSpeed={70}
                backSpeed={50}
                loop
              />
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#d9e3f0] max-w-lg mx-auto md:mx-0 leading-relaxed">
            I build scalable web applications, design engaging visuals, and help
            businesses and individuals bring ideas to life through technology and science.
          </p>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            className="inline-block mt-6 px-6 py-3 bg-[#22d39a] hover:bg-[#00ffff] text-[#111111] font-medium rounded-full shadow-lg transition-all duration-200"
          >
            View My Work
          </motion.a>
        </motion.div>

        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="flex-shrink-0"
        >
          <motion.img
            src="/assets/julius.jpg"
            alt="Monday Chimaobi Julius"
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#00ffff] shadow-[0_0_30px_#00ffff55]"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/300x300?text=Julius";
            }}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#22d39a] z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
