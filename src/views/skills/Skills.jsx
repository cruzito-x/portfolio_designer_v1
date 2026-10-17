import SkillsCarousel from "@/views/skills/components/SkillsCarousel";

import "./styles/skills.css";

const Skills = ({ lang }) => {
  return (
    <section className="section-shell skills-section" id="skills">
      <div className="section-heading">
        <span className="section-kicker">{lang.skills_kicker?.text}</span>
        <h1 className="fw-semibold">{lang.skills?.text}</h1>
        <label className="section-subtitle fw-semibold">
          {lang.skills_subtitle?.text}
        </label>
      </div>

      <div className="skills-grid">
        <div className="skills-panel">
          <SkillsCarousel lang={lang} />
        </div>

        <div className="skills-copy d-flex align-items-center">
          <p>{lang.skills_text?.text}</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
