import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <section className="project-detail">
      <img src={project.image} alt={project.title} className="detail-image" />
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <div className="tags">
        {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>
    </section>
  );
};

export default ProjectDetail;