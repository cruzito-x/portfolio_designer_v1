const ProjectsHeader = ({ lang }) => {
  return (
    <div className="section-heading">
      <span className="section-kicker">{lang.portfolio_kicker?.text}</span>
      <h1 className="fw-semibold">{lang.portfolio?.text}</h1>
      <label className="section-subtitle fw-semibold">
        {lang.projects_subtitle?.text}
      </label>
    </div>
  );
};

export default ProjectsHeader;
