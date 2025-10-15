import { ExternalLink, Code } from 'lucide-react';
import "./Projects.css";
const Projects = () => {
 const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product management, and payment integration.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
      link: "#"
    },
    {
      title: "Weather Dashboard",
      description: "An interactive weather dashboard that displays current conditions and forecasts using a third-party weather API with beautiful data visualizations.",
      technologies: ["React", "Chart.js", "OpenWeather API"],
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing my work and skills, built with modern web technologies and optimized for performance.",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      link: "#"
    }
  ];
  return (
    <>
            {/* Projects Section */}
       <section id="projects" className="section-projects">
        <div className="container-wrapper">
          <h2 className="section-heading">
            <Code className="section-heading-icon" />
            Featured Projects
          </h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3 className="project-title">
                  {project.title}
                </h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-list">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="project-link"
                >
                  View Project
                  <ExternalLink size={16} className="link-icon" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Projects
