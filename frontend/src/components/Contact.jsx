import './Contact.css';

const Contact = () => (
    <>
        <section id="contact" className="contact-section">
    <div className="container">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p>Have a project in mind? Let&apos;s discuss how I can bring your ideas to life.</p>
      </div>
      <div className="contact-grid">
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your message"></textarea>
          </div>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>
        <div className="contact-info">
          <div className="info-card">
            <i className="fas fa-map-marker-alt info-icon"></i>
            <div>
              <h3>Location</h3>
              <p>FedPoly Oko, Anambra State</p>
            </div>
          </div>
          <div className="info-card">
            <i className="fas fa-envelope info-icon"></i>
            <div>
              <h3>Email</h3>
              <p>juliuschimaobi6@gmail,com</p>
            </div>
          </div>
          <div className="info-card">
            <i className="fas fa-phone-alt info-icon"></i>
            <div>
              <h3>Phone</h3>
              <p>+2347068209902</p>
            </div>
          </div>
          <div className="social-links">
            <h3>Connect With Me</h3>
            <div className="social-icons">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        </div>
    </div>
    </section>
    
    </>
  

);

export default Contact;