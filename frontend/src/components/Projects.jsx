import { ExternalLink, Code } from 'lucide-react';
import "./Projects.css";
const Projects = () => {
 const projects = [
    {
      title: "Izu Nwachukwu Foundation",
      description: "A full scale, sustainable, and impactful non-profit organization that empowers children and youth from sub-Saharan Africa to achieve their full potential in education, health, and social development.",
      technologies: ["HTML", "Css", "Javascript", "WordPress"],
      link: "#"
    },
    {
      title: "BloodMatch",
      description: "A full-stack application for matching blood donors and recipients based on their blood type, compatitibility, and Clinicals.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      link: "#"
    },

    {
      title: "JuTeLabs CGPA Calculator",
      description: "An interactive tool for calculating the CGPA (College Grade Point Average) of students based on their grades for each semester using NBTE Standard for polytechnic and college students.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      link: "#"
    },
    
    {
      title: "Students' Association Website",
      description: "A responsive website for the Students' Association of JuTeLabs, showcasing the latest news, events, and activities.",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      link: "#"
   },
     {
      title: "HealthStarEMSINC",
      description: "A responsive website for HealthStar EMS,dedicated to offering comprehensive medical transport services tailored to each patient. Our state-of-the-art vehicles, skilled staff, and patient-first approach ensure trusted, effective care across all transport needs.",
      technologies: ["HTML", "CSS", "WORDPRESS", "FIGMA"],
      link: "#"
   },
      {
      title: "The Charles Osuji Foundation",
      description: "A responsive website for the charles osuji foundation a non-profit organisation that aims to empower young people through education and oportunity.",
      technologies: ["HTML", "CSS", "WORDPRESS", "FIGMA"],
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
