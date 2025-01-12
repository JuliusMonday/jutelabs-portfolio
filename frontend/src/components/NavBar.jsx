
import { useState } from 'react';
import './Navbar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#">JuTeLabs</a>
      </div>
      <button className={`navbar-toggler ${isOpen ? 'open' : ''}`} onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
        <span className="navbar-toggler-icon"></span>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
