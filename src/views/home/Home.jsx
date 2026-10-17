import "./styles/home.css";

import SocialLinks from "@/views/home/components/SocialLinks";
import HomeIntro from "@/views/home/components/HomeIntro";
import HomeAnimation from "@/views/home/components/HomeAnimation";

const Home = ({ lang }) => {
  return (
    <main className="section-shell hero-section" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <SocialLinks />
          <HomeIntro lang={lang} />
        </div>
        <div className="hero-visual">
          <HomeAnimation lang={lang} />
        </div>
      </div>
    </main>
  );
};

export default Home;
