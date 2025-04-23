import { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = ({ isDarkMode, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = ['home', 'skills', 'projects', 'contact'];
      let current = 'home';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', updateActiveSection);
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  return (
    <>
      <header className="navbar">
      <div className="logo">
        <div className="logo-icon">JL </div>
        <h1 className="logo-text">JuTeLabs</h1>
      </div>

      <nav className={`nav-links ${isMenuOpen ? 'open' : 'closed'}`}>        
        <ul>
        <li>
              <a
                href="#home"
                className={`nav-link ${activeSection === "home" ? "active" : ""} cursor-pointer`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`nav-link ${activeSection === "skills" ? "active" : ""} cursor-pointer`}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`nav-link ${activeSection === "projects" ? "active" : ""} cursor-pointer`}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeSection === "contact" ? "active" : ""} cursor-pointer`}
              >
                Contact
              </a>
            </li>
        </ul>
      </nav>

      <div className="controls">
        <button onClick={onToggleTheme} className="theme-toggle" aria-label="Toggle theme">
          <span className="toggle-circle">
            <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} icon`}></i>
          </span>
        </button>

        <a href="/resume.pdf" download className="download-btn">Download CV</a>

        <button onClick={() => setIsMenuOpen(prev => !prev)} className="hamburger" aria-label="Menu">
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
    </>
  );
};

export default NavBar;