import { useEffect } from "react";

const ExperienceTabs = ({ activeTab, setActiveTab, lang }) => {
  const laboral = lang.laboral_title?.text;
  const education = lang.education_title?.text;

  useEffect(() => {
    if (laboral) {
      setActiveTab(laboral);
    }
  }, [laboral, setActiveTab]);

  return (
    <div className="d-flex w-100 justify-content-center align-items-center mb-3">
      <button
        type="button"
        className={`btn me-1 fw-semibold fs-6 border-0 ${
          activeTab === laboral ? "enphasis-text" : "enphasis-text-dark"
        }`}
        onClick={() => setActiveTab(laboral)}
      >
        {laboral}
      </button>

      <button
        type="button"
        className={`btn ms-1 fw-semibold fs-6 border-0 ${
          activeTab === education ? "enphasis-text" : "enphasis-text-dark"
        }`}
        onClick={() => setActiveTab(education)}
      >
        {education}
      </button>
    </div>
  );
};

export default ExperienceTabs;
