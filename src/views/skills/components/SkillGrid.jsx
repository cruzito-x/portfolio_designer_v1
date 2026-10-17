const SkillGrid = ({ skills }) => {
  return (
    <div className="row justify-content-center align-items-center">
      {skills.map((skill) => (
        <div key={skill.name} className="col-4 col-lg-3 mb-3 text-center">
          <img
            src={skill.icon}
            alt={`${skill.name} icon`}
            width={100}
            style={{ aspectRatio: "1/1" }}
          />

          <label
            className="fw-semibold mt-1 mb-2 d-block"
            style={{ color: skill.color }}
          >
            {skill.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
