import SkillGrid from "./SkillGrid";

import {
  frontendSkills,
  otherSkills,
} from "@/assets/data/skillsData";

const SkillsCarousel = ({ lang }) => {
  const complementaryToolsTitle = lang.complementary_tools?.text
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const skillCategories = [
    {
      title: lang.design_skills?.text,
      skills: otherSkills.filter((skill) => skill.name === "Figma"),
      note: lang.photoshop_basic?.text,
    },
    {
      title: lang.web_skills?.text,
      skills: frontendSkills,
    },
    {
      title: complementaryToolsTitle,
      skills: otherSkills.filter((skill) => skill.name !== "Figma"),
    },
  ];

  return (
    <div
      id="skillsCarousel"
      className="carousel slide mt-5"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <h5 className="fw-semibold enphasis-text mb-4 d-flex w-100 justify-content-center">
              {category.title}
            </h5>

            <SkillGrid skills={category.skills} />

            {category.note && (
              <p className="skill-level-note">{category.note}</p>
            )}
          </div>
        ))}
      </div>

      <div className="carousel-indicators">
        {skillCategories.map((category, index) => (
          <button
            key={category.title}
            type="button"
            data-bs-target="#skillsCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;
