import profilePhoto from "@/assets/img/me.webp";

const About = ({ lang }) => {
  return (
    <section className="section-shell about-section" id="about">
      <div className="section-heading">
        <span className="section-kicker">{lang.profile_kicker?.text}</span>
        <h1 className="fw-semibold">{lang.about_me?.text}</h1>
        <label className="section-subtitle fw-semibold">
          {lang.about_subtitle?.text}
        </label>
      </div>
      <div className="about-grid">
        <div className="about-image-wrap">
          <img src={profilePhoto} className="about-image" alt="David's Photo" />
        </div>
        <div className="about-copy">
          <p>{lang.about_description?.text}</p>
          <p>{lang.about_secondary_description?.text}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
