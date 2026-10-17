import ProjectTechs from "./ProjectTechs";
import ProjectLinks from "./ProjectLinks";

const ProjectCard = ({
  project,
  lang,
  showCategory = false,
  showLinks = false,
}) => {
  return (
    <article className="project-card h-100">
      <img src={project.image} alt={project.title} className="project-image" />

      <div className="project-card-body">
        <h5 className="project-title">
          {project.title}

          {showCategory && (
            <>
              <br />

              <span
                className="project-category"
                style={{
                  fontSize: "11px",
                  border: `1px solid ${project.category_color}`,
                  color: project.category_color,
                }}
              >
                {project.category}
              </span>
            </>
          )}
        </h5>

        <p
          className="project-description"
          style={{
            whiteSpace: "normal",
          }}
        >
          {project.description}
        </p>

        <ProjectTechs techs={project.techs} />

        {showLinks && <ProjectLinks project={project} lang={lang} />}
      </div>
    </article>
  );
};

export default ProjectCard;
