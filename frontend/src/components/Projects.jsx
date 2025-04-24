import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const demoProjects = [
  {
    id: 1,
    title: 'FinTech Mobile App',
    description:
      'A comprehensive financial management application with advanced analytics and secure transactions.',
    shortDescription:
      'A comprehensive financial management application with advanced analytics.',
    image:
      'https://readdy.ai/api/search-image?query=Modern%20mobile%20app%20interface%20with%20purple%20and%20blue%20color%20scheme%2C%20sleek%20design%2C%20showing%20financial%20dashboard%20with%20charts%20and%20analytics%2C%20clean%20UI%20design%20with%20professional%20look%2C%20digital%20finance%20application%20screen&width=600&height=400&seq=proj1&orientation=landscape',
    tags: ['React Native', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description:
      'A scalable e-commerce solution with integrated payment gateways and inventory management.',
    shortDescription:
      'A scalable e-commerce solution with integrated payment gateways.',
    image:
      'https://readdy.ai/api/search-image?query=E-commerce%20website%20with%20modern%20design%2C%20purple%20and%20blue%20color%20scheme%2C%20product%20display%20grid%20with%20elegant%20layout%2C%20clean%20interface%20showing%20clothing%20items%2C%20professional%20online%20store%20with%20shopping%20cart%20functionality&width=600&height=400&seq=proj2&orientation=landscape',
    tags: ['React', 'Express', 'PostgreSQL'],
  },
  {
    id: 3,
    title: 'AI Analytics Dashboard',
    description:
      'An intelligent analytics platform that leverages machine learning for predictive insights.',
    shortDescription:
      'An intelligent analytics platform with machine learning capabilities.',
    image:
      'https://readdy.ai/api/search-image?query=AI-powered%20data%20visualization%20dashboard%20with%20machine%20learning%20analytics%2C%20purple%20and%20blue%20interface%20with%20charts%20and%20graphs%2C%20futuristic%20business%20intelligence%20platform%20with%20clean%20design%2C%20professional%20data%20analysis%20tool%20with%20modern%20UI&width=600&height=400&seq=proj3&orientation=landscape',
    tags: ['Python', 'TensorFlow', 'Vue.js'],
  },
];

const Projects = () => {
  const [projects, setProjects] = useState(demoProjects);

  useEffect(() => {
    // Fetch projects from backend
    fetch('/api/projects')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>
            Explore our portfolio of innovative solutions that have helped our
            clients achieve their goals.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="view-all">
          <a href="/projects" className="view-all-button">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
