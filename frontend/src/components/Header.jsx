import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = ["about", "services", "projects", "contact"];

  // 🧩 Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [menuOpen]);

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full bg-[#0a192f]/90 backdrop-blur-md border-b border-[#22d39a]/20 z-[60] shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="font-extrabold text-xl tracking-wide text-[#00ffff] hover:text-[#22d39a] transition-colors duration-300 cursor-pointer">
            JuTeLabs
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth
                offset={-80}
                duration={600}
                className="cursor-pointer text-sm uppercase font-medium text-[#d9e3f0] hover:text-[#00ffff] transition-colors duration-300"
              >
                {item}
              </ScrollLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#00ffff] text-3xl focus:outline-none z-[70]"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 90, damping: 15 }}
            className="fixed top-0 right-0 h-screen w-3/4 sm:w-1/2 bg-[#0a192f] border-l border-[#22d39a]/20 shadow-2xl z-[50] flex flex-col items-center justify-center space-y-10"
          >
            {navLinks.map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth
                offset={-70}
                duration={600}
                onClick={closeMenu}
                className="text-[#d9e3f0] text-xl uppercase font-semibold hover:text-[#00ffff] transition-colors duration-300 cursor-pointer"
              >
                {item}
              </ScrollLink>
            ))}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-8 px-6 py-3 bg-[#00ffff] text-[#0a192f] font-bold uppercase rounded-full hover:bg-[#22d39a] transition-all duration-300"
            >
              Let’s Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
