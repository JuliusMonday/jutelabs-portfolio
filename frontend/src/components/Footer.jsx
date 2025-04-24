import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-section brand">
          <div className="footer-brand">
            <div className="brand-icon">JL</div>
            <h2 className="brand-title">JuTeLabs</h2>
          </div>
          <p className="brand-description">
            Transforming ideas into innovative technology solutions since 2021. I specialize in cutting-edge development and research.
          </p>
          <a href="/resume.pdf" download className="btn-secondary">Download CV</a>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#skills">Skills & Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section legal">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} JuTeLabs. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;