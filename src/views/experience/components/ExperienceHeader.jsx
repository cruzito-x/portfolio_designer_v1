const ExperienceHeader = ({ lang }) => {
  return (
    <div className="section-heading">
      <span className="section-kicker">{lang.experience_kicker?.text}</span>
      <h1 className="fw-semibold">{lang.experience_title?.text}</h1>
      <label className="section-subtitle fw-semibold">
        {lang.experience_subtitle?.text}
      </label>
    </div>
  );
};

export default ExperienceHeader;
