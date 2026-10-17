import { useEffect, useState } from "react";

import { getProjectsData, getFilters } from "@/assets/data/Portfolio";
import ProjectsHeader from "@/views/projects/components/ProjectsHeader";
import ProjectFilters from "@/views/projects/components/ProjectFilters";
import ProjectsCarousel from "@/views/projects/components/ProjectsCarousel";
import ProjectsGrid from "@/views/projects/components/ProjectsGrid";

const Projects = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const projectsData = getProjectsData(lang);
  const filters = getFilters(lang);

  const allCategory = lang.all?.text;

  useEffect(() => {
    setSelectedCategory("all");
  }, [allCategory]);

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <section className="section-shell projects-section" id="portfolio">
      <ProjectsHeader lang={lang} />

      <ProjectFilters
        filters={filters}
        selectedCategory={
          selectedCategory === "all" ? allCategory : selectedCategory
        }
        onCategoryChange={(category) => {
          const categoryKey = category === allCategory ? "all" : category;

          setSelectedCategory(categoryKey);
        }}
      />

      {selectedCategory === "all" ? (
        <ProjectsCarousel projects={filteredProjects} lang={lang} />
      ) : (
        <ProjectsGrid projects={filteredProjects} lang={lang} />
      )}
    </section>
  );
};

export default Projects;
