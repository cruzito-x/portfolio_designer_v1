import ProjectCard from "./ProjectCard";

const ProjectsGrid = ({ projects, lang }) => {
  return (
    <div className="row mt-3 justify-content-center">
      {projects.map((project) => (
        <div
          key={project.id}
          className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3"
        >
          <ProjectCard project={project} lang={lang} showLinks />
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
