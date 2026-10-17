import { useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";

const ProjectsCarousel = ({ projects, lang }) => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!carouselRef.current || projects.length === 0) {
      return;
    }

    const carousel = carouselRef.current;
    const speed = 120;

    let lastTimestamp = null;
    let accumulatedScroll = 0;

    const animate = (timestamp) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const movement = (speed * deltaTime) / 1000;

      accumulatedScroll += movement;

      if (accumulatedScroll >= 1) {
        const pixels = Math.floor(accumulatedScroll);

        carousel.scrollLeft += pixels;
        accumulatedScroll -= pixels;
      }

      const halfWidth = carousel.scrollWidth / 2;

      if (carousel.scrollLeft >= halfWidth) {
        carousel.scrollLeft -= halfWidth;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = null;
    };
  }, [projects.length]);

  const infiniteProjects = [...projects, ...projects];

  return (
    <div
      ref={carouselRef}
      className="mt-3"
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          alignItems: "stretch",
        }}
      >
        {infiniteProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="project-card-shell h-100"
            style={{
              width: "300px",
              minWidth: "300px",
              maxWidth: "300px",
              marginLeft: "8px",
              marginRight: "8px",
              flexShrink: 0,
            }}
          >
            <ProjectCard project={project} lang={lang} showCategory />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsCarousel;
