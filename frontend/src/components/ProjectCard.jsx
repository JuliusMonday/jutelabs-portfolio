import PropTypes from 'prop-types';
import './ProjectCard.css';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const { id, image, title, shortDescription } = project;

  const handleClick = () => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="project-card" onClick={handleClick}>
      <div className="project-image">
        <img src={image} alt={title} />
        <div className="overlay">
          <h3>{title}</h3>
          <p>{shortDescription}</p>
        </div>
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{shortDescription}</p>
        <button className="view-details">View Details</button>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
