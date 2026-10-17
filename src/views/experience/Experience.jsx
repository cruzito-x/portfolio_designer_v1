import { useState } from "react";
import "./styles/experience.css";
import ExperienceHeader from "@/views/experience/components/ExperienceHeader";
import ExperienceTabs from "@/views/experience/components/ExperienceTabs";
import Timeline from "@/views/experience/components/Timeline";
import ExperienceAnimation from "@/views/experience/components/ExperienceAnimation";
import { getExperienceData } from "@/assets/data/experienceData";

const Experience = ({ lang }) => {
  const [activeTab, setActiveTab] = useState(lang.laboral_title?.text);

  const experienceData = getExperienceData(lang);

  const isLaboral = activeTab === lang.laboral_title?.text;

  const timelineItems = isLaboral
    ? experienceData.laboral
    : experienceData.education;

  return (
    <section className="section-shell" id="experience">
      <ExperienceHeader lang={lang} />

      <div className="experience-grid">
        <div className="d-flex align-items-center">
          <div className="w-100">
            <ExperienceTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              lang={lang}
            />

            <Timeline items={timelineItems} />
          </div>
        </div>

        <div className="experience-aside">
          <ExperienceAnimation />
        </div>
      </div>
    </section>
  );
};

export default Experience;
