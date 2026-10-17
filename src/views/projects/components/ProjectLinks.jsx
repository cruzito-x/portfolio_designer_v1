const ProjectLinks = ({ project, lang }) => {
  return (
    <div className="mt-2 d-flex align-items-center flex-wrap">
      {project.deploy_url && (
        <a
          href={project.deploy_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <i className="bx bx-rocket me-1"></i>
          {lang.deploy?.text}
        </a>
      )}

      {project.source_url && (
        <a
          href={project.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <i className="bx bxl-github me-1"></i>
          {lang.source_code?.text}
        </a>
      )}

      {project.extension_url && (
        <a
          href={project.extension_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <i className="bx bxl-microsoft me-1"></i>
          {lang.extension_source?.text}
        </a>
      )}

      {project.design_url && (
        <a
          href={project.design_url}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <i className="bx bxl-figma"></i>
          {lang.design?.text}
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
