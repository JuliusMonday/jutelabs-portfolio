import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a192f] text-[#d9e3f0] py-8 border-t border-[#111111]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6">
        {/* Left section */}
        <div className="flex items-center gap-4 text-sm md:text-base text-[#d9e3f0]/90">
          <img
            src="/julius.jpg"
            alt="Monday Chimaobi Julius"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#00ffff]"
          />
          <p>
            © 2025{" "}
            <span className="font-semibold text-white">
              Monday Chimaobi Julius
            </span>{" "}
            — A Passionate{" "}
            <span className="text-[#22d39a]">Biochemist & Full Stack Developer</span>
          </p>
        </div>

        {/* Right section - social links */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffff] transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffff] transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00ffff] transition-colors"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}
