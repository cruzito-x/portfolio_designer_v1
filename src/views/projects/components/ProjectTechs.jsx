const ProjectTechs = ({ techs }) => {
  return (
    <div className="d-flex flex-wrap">
      {techs.map((tech) => (
        <span
          key={tech.id}
          className="badge fw-normal me-1 mb-1 d-flex align-items-center"
          style={{
            border: `1px solid ${tech.color}`,
            color: tech.color,
          }}
        >
          {tech.icon} {tech.name}
        </span>
      ))}
    </div>
  );
};

export default ProjectTechs;
