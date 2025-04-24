import './Skills.css';

const services = [
  { name: 'Frontend Development', icon: 'fas fa-code' },
  { name: 'Backend Development', icon: 'fas fa-server' },
  { name: 'Graphics Designing', icon: 'fas fa-paint-brush' },
  { name: 'Typing & Printing of Documents', icon: 'fas fa-print' },
  { name: 'Creation of CV', icon: 'fas fa-file-alt' },
  { name: 'Python Development', icon: 'fab fa-python' },
  { name: 'Biochemistry Experiments', icon: 'fas fa-flask' },
  { name: 'Teaching Programming', icon: 'fas fa-chalkboard-teacher' },
];

const skills = [
  { name: 'HTML', icon: 'fab fa-html5', level: 95 },
  { name: 'CSS', icon: 'fab fa-css3-alt', level: 90 },
  { name: 'JAVASCRIPT', icon: 'fab fa-js', level: 80 },
  { name: 'REACT', icon: 'fab fa-react', level: 85 },
  { name: 'NODEJS', icon: 'fab fa-node-js', level: 80 },
  { name: 'EXPRESS JS', icon: 'fas fa-server', level: 75 },
  { name: 'GIT & GITHUB', icon: 'fab fa-github', level: 90 },
  { name: 'MONGODB', icon: 'fas fa-database', level: 80 },
  { name: 'WORDPRESS DESIGN', icon: 'fab fa-wordpress', level: 85 },
  { name: 'PYTHON', icon: 'fab fa-python', level: 92 },
  { name: 'MICROSOFT PACKAGES', icon: 'fab fa-microsoft', level: 88 },
];

const Skills = () => (
  <>
    {/* Services Section */}
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2>My Services</h2>
          <p>
            I offer a comprehensive range of technology services to help
            businesses thrive in the digital age.
          </p>
        </div>
        <ul className="services-list">
          {services.map(service => (
            <li key={service.name} className="service-item">
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <span className="service-name">{service.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Expertise Section */}
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Expertise</h2>
          <p>
            I combine technical excellence with creative problem-solving to
            deliver exceptional results.
          </p>
        </div>
        <ul className="skills-list">
          {skills.map(skill => (
            <li key={skill.name} className="skill-item">
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <span className="skill-name">{skill.name}</span>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);

export default Skills;
