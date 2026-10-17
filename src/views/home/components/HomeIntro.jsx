import curriculumVitae from "@/assets/docs/David Cruz - Curriculum Vitae.pdf";

const HomeIntro = ({ lang }) => {
  return (
    <div className="w-100">
      <span className="hero-kicker">{lang.hero_kicker?.text}</span>
      <h1 className="text-black fw-bold name">
        {lang.greeting?.text || "Hi there!"}

        <span className="d-block enphasis-text">David Cruz</span>
      </h1>

      <label className="hero-role fw-semibold">{lang.title?.text}</label>

      <p className="hero-description">
        {lang.description?.text.split("\n").map((line, index) => (
          <label key={index}>{line}</label>
        ))}
      </p>

      <div className="hero-actions">
        <a
          href={curriculumVitae}
          className="btn btn-primary text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bx bx-download me-2"></i>
          {lang.download?.text}
        </a>

        <a href="#contact" className="btn btn-primary-dark">
          <i className="bx bx-send me-2" style={{ rotate: "-30deg" }}></i>

          {lang.contact_me?.text}
        </a>
      </div>
    </div>
  );
};

export default HomeIntro;
