const ProjectFilters = ({ filters, selectedCategory, onCategoryChange }) => {
  return (
    <div className="project-filters">
      {filters.map((category) => (
        <label
          key={category.name}
          className={`cursor-pointer ${
            selectedCategory === category.name
              ? "btn btn-primary text-white"
              : ""
          }`}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.name}
        </label>
      ))}
    </div>
  );
};

export default ProjectFilters;
