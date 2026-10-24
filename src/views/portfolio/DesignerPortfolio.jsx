import { useEffect, useState } from "react";
import { getProjectsData } from "@/assets/data/Portfolio";
import { getExperienceData } from "@/assets/data/experienceData";
import { useTheme } from "@/context/ThemeContext";
import portrait from "@/assets/img/me.webp";
import curriculum from "@/assets/docs/David Cruz - Curriculum Vitae.pdf";
import ProjectPreview from "./ProjectPreview";

const text = {
  es: {
    nav: ["Proyectos", "Sobre mí", "Proceso", "Contacto"],
    menu: "Abrir navegación", close: "Cerrar navegación", skip: "Ir al contenido",
    discipline: "Diseñador web & desarrollador frontend", location: "El Salvador · Para la web, desde cualquier lugar",
    intro: "Hola, soy David Cruz", title: ["Diseño web", "con intención.", "Y carácter."],
    description: "Convierto ideas en sitios web que conectan diseño, claridad y funcionalidad. Desde el primer concepto en Figma hasta el último detalle en el navegador.",
    seeWork: "Explorar proyectos", selected: "Una selección de mi trabajo",
    workLabel: "02 / Trabajo seleccionado", workTitle: "Proyectos", workItalic: "con personalidad.",
    workDescription: "Sitios web e interfaces donde cada decisión tiene un propósito.",
    filters: ["Todos", "Sitios web", "UI/UX"], web: "Ver sitio web", figma: "Explorar en Figma", source: "Ver código", concept: "Concepto ficticio", preview: "Recorrer diseño completo", psd: "Descargar PSD",
    aboutLabel: "01 / Detrás del diseño", aboutTitle: "Creatividad que", aboutItalic: "cruza pantallas.",
    aboutDescription: "Soy David, diseñador web e Ingeniero en Sistemas y Computación. Me interesa ese punto en el que una buena idea se convierte en una experiencia clara, útil y con personalidad.",
    aboutMore: "Trabajo en Figma para dar forma a las interfaces y en HTML, CSS, JavaScript y React para llevarlas a la web. Entender ambos lados me permite diseñar con los pies en la tierra y cuidar lo que pasa después del prototipo.",
    cv: "Mi experiencia, en detalle", portrait: "Retrato de David Cruz",
    career: "Experiencia profesional", education: "Formación", toolLabel: "Mi caja de herramientas",
    toolGroups: [
      { title: "Diseño & prototipado", tools: ["Figma", "Prototipos interactivos", "Diseño responsive", "Photoshop · en aprendizaje"] },
      { title: "Desarrollo web", tools: ["HTML & CSS", "JavaScript & TypeScript", "React", "Tailwind CSS"] },
      { title: "Una visión completa", tools: ["Interfaces web", "Sistemas de componentes", "Integración de APIs", "Git & GitHub"] },
    ],
    processLabel: "04 / Forma de trabajar", processTitle: "Una idea.", processItalic: "Todo un proceso.",
    process: [
      { title: "Entender antes de diseñar.", description: "Definir qué necesita comunicar el sitio, a quién se dirige y qué debe conseguir cada página.", tags: "Objetivos · Estructura · Referencias" },
      { title: "Dar forma y personalidad.", description: "Construir una dirección visual coherente: jerarquía, tipografía, color y prototipos que permitan recorrer la experiencia.", tags: "Figma · UI/UX · Prototipado" },
      { title: "Cuidar hasta el último píxel.", description: "Llevar el diseño a una web responsive, afinar las interacciones y revisar cómo se siente en cada pantalla.", tags: "Frontend · Responsive · Detalle" },
    ],
    contactLabel: "05 / Tu próximo proyecto", contactTitle: "Hagamos algo", contactItalic: "que importe.", contactDescription: "Una web, una interfaz, una idea que aún no tiene forma. Cuéntame qué tienes en mente y empecemos por una conversación.",
    connect: "Conectemos / LinkedIn",
    footerNote: "Diseño con intención. Desarrollo con detalle.", top: "Volver arriba", rights: "Diseñado y desarrollado por David Cruz", light: "Usar tema claro", dark: "Usar tema oscuro",
  },
  en: {
    nav: ["Work", "About", "Process", "Contact"],
    menu: "Open navigation", close: "Close navigation", skip: "Skip to content",
    discipline: "Web designer & frontend developer", location: "El Salvador · For the web, from anywhere",
    intro: "Hello, I'm David Cruz", title: ["Web design", "with intention.", "And character."],
    description: "I turn ideas into websites that connect design, clarity and functionality. From the first concept in Figma to the final detail in the browser.",
    seeWork: "Explore my work", selected: "A selection of my work",
    workLabel: "02 / Selected work", workTitle: "Projects", workItalic: "with personality.",
    workDescription: "Websites and interfaces where every decision has a purpose.",
    filters: ["All", "Websites", "UI/UX"], web: "Visit website", figma: "Explore in Figma", source: "View code", concept: "Fictional concept", preview: "Explore complete design", psd: "Download PSD",
    aboutLabel: "01 / Behind the design", aboutTitle: "Creativity", aboutItalic: "beyond the screen.",
    aboutDescription: "I'm David, a web designer and Systems and Computing Engineer. I'm drawn to that moment when a good idea becomes a clear, useful experience with its own personality.",
    aboutMore: "I use Figma to shape interfaces and HTML, CSS, JavaScript and React to bring them to the web. Understanding both sides helps me design thoughtfully and care for what happens beyond the prototype.",
    cv: "My experience, in detail", portrait: "Portrait of David Cruz",
    career: "Professional experience", education: "Education", toolLabel: "My creative toolkit",
    toolGroups: [
      { title: "Design & prototyping", tools: ["Figma", "Interactive prototypes", "Responsive design", "Photoshop · learning"] },
      { title: "Web development", tools: ["HTML & CSS", "JavaScript & TypeScript", "React", "Tailwind CSS"] },
      { title: "The complete picture", tools: ["Web interfaces", "Component systems", "API integration", "Git & GitHub"] },
    ],
    processLabel: "04 / My approach", processTitle: "One idea.", processItalic: "A whole process.",
    process: [
      { title: "Understand before designing.", description: "Define what the website needs to communicate, who it's for, and what each page should accomplish.", tags: "Goals · Structure · References" },
      { title: "Give it form and personality.", description: "Create a coherent visual direction: hierarchy, typography, colour and prototypes that let you explore the experience.", tags: "Figma · UI/UX · Prototyping" },
      { title: "Care for every last pixel.", description: "Bring the design to a responsive website, refine the interactions and review how it feels on each screen.", tags: "Frontend · Responsive · Detail" },
    ],
    contactLabel: "05 / Your next project", contactTitle: "Let's make", contactItalic: "it matter.", contactDescription: "A website, an interface, an idea waiting to take shape. Tell me what you have in mind, and let's start with a conversation.",
    connect: "Let's connect / LinkedIn",
    footerNote: "Designed with intention. Developed with care.", top: "Back to top", rights: "Designed & developed by David Cruz", light: "Use light theme", dark: "Use dark theme",
  },
};

const Arrow = ({ diagonal = false, className = "" }) => (
  <svg className={`arrow-icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>
);

const ThemeIcon = ({ isDarkMode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {isDarkMode ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></> : <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />}
  </svg>
);

const BackgroundImage = ({ src, label, className }) => (
  <div
    className={`background-image ${className}`}
    role="img"
    aria-label={label}
    style={{ backgroundImage: `url("${src}")` }}
  />
);

const matchesProjectFilter = (project, filter) =>
  filter === "all" || filter === (project.kind || (project.design_url ? "ui" : "web"));

function DesignerPortfolio({ lang, language, onChangeLanguage }) {
  const copy = text[language];
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [previewProject, setPreviewProject] = useState(null);
  const projects = getProjectsData(lang, language);
  const experience = getExperienceData(lang);
  const visibleProjects = projects.filter((project) => matchesProjectFilter(project, filter));
  const navIds = ["portfolio", "about", "process", "contact"];
  const es = language === "es";

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  const openProject = (project) => {
    setMenuOpen(false);
    setPreviewProject(project);
  };

  return (
    <div className="designer-site">
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className="portfolio-header">
        <div className="page-width header-inner">
          <a className="brand" href="#home" aria-label="David Cruz — Home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">D. CRUZ</span><span className="brand-caption">DESIGN / CODE / IMAGINATION</span>
          </a>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-navigation" aria-label={es ? "Navegación principal" : "Main navigation"}>
            {copy.nav.map((label, index) => <a key={navIds[index]} href={`#${navIds[index]}`} onClick={() => setMenuOpen(false)}><span className="nav-index">0{index + 1}</span>{label}</a>)}
          </nav>
          <div className="header-controls">
            <button className="language-toggle" onClick={() => { onChangeLanguage(); setMenuOpen(false); }} aria-label={es ? "Switch to English" : "Cambiar a español"}>{language}<span>/</span>{es ? "en" : "es"}</button>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={isDarkMode ? copy.light : copy.dark} title={isDarkMode ? copy.light : copy.dark}><ThemeIcon isDarkMode={isDarkMode} /></button>
            <button className="menu-toggle" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? copy.close : copy.menu} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? (es ? "CERRAR" : "CLOSE") : "MENU"}</button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="portfolio-hero page-width" id="home">
          <div className="hero-topline"><span>{copy.discipline}</span><span>EL SALVADOR / VOL. {new Date().getFullYear()}</span></div>
          <div className="personal-hero">
            <div className="personal-hero-copy">
              <span className="intro-label">{copy.intro}</span>
              <h1 className="personal-hero-title">{es ? "Creo webs" : "Web design"}<br /><span>{es ? "con alma." : "with soul."}</span></h1>
              <p className="hero-description">{copy.description}</p>
              <div className="hero-actions"><a href="#portfolio" className="oval-link primary-link">{copy.seeWork}<Arrow diagonal /></a><a href="#about" className="hero-about-link">{es ? "Conóceme un poco" : "A little about me"}<Arrow /></a></div>
              <div className="creative-signature"><span>WEB DESIGNER</span><span>ANIME & COSPLAY</span><span>CREATIVE SOUL</span></div>
            </div>
            <div className="hero-stage">
              <BackgroundImage src={portrait} label={copy.portrait} className="hero-portrait" />
              <div className="portrait-caption"><span>DAVID CRUZ</span><span>DESIGN / CODE / SV</span></div>
            </div>
          </div>
        </section>

        <section className="about-section section-space page-width" id="about" aria-labelledby="about-title">
          <div className="about-story">
            <div className="profile-intro">
              <div className="profile-heading"><span className="section-kicker">{copy.aboutLabel}</span><h2 id="about-title">{copy.aboutTitle}<br />{copy.aboutItalic}</h2></div>
              <div className="profile-copy"><p className="profile-lead">{copy.aboutDescription}</p><p>{copy.aboutMore}</p><a className="oval-link" href={curriculum} target="_blank" rel="noopener noreferrer">{copy.cv}<Arrow diagonal /></a></div>
            </div>
            <div className="personal-note">
              <div className="personal-note-heading"><span className="small-eyebrow">{es ? "Mi universo creativo" : "My creative universe"}</span><h3>{es ? "Del cosplay al píxel." : "From cosplay to pixels."}</h3></div>
              <div className="personal-note-copy"><p>{es ? "Fuera de la pantalla, hago cosplay y disfruto del anime japonés. Me fijo en cómo un personaje cuenta su historia a través de sus colores, su vestuario y los pequeños detalles. Esa curiosidad también me acompaña al diseñar." : "Away from the screen, I cosplay and enjoy Japanese anime. I notice how a character tells their story through colour, costume and small details. That curiosity comes with me when I design."}</p></div>
              <div className="personal-details">
                <ul className="interest-tags" aria-label={es ? "Mis intereses" : "My interests"}>{["Anime & cosplay", es ? "Cultura retro Y2K" : "Retro Y2K culture", es ? "Minimalismo" : "Minimalism"].map(interest => <li key={interest}>{interest}</li>)}</ul>
                <div className="personal-palette"><span className="personal-detail-label">{es ? "Mi paleta" : "My palette"}</span><div className="palette-colours" role="img" aria-label={es ? "Mis colores: azul marino, azul cielo, rojo vino, albaricoque y blanco" : "My colours: navy, sky blue, burgundy, apricot and white"}><span className="swatch swatch--navy" /><span className="swatch swatch--sky" /><span className="swatch swatch--wine" /><span className="swatch swatch--apricot" /><span className="swatch swatch--white" /></div></div>
              </div>
              <a className="creative-link" href="https://instagram.com/cruzito.x_" target="_blank" rel="noopener noreferrer">{es ? "Mi lado creativo / Instagram" : "My creative side / Instagram"}<Arrow diagonal /></a>
            </div>
          </div>
        </section>

        <section className="work-section section-space page-width" id="portfolio">
          <div className="section-label"><span>{copy.workLabel}</span><span>SELECTED WORK / {String(projects.length).padStart(2, "0")}</span></div>
          <div className="work-heading"><div><span className="section-kicker" aria-hidden="true">SELECTED WORK</span><h2>{copy.workTitle}<br />{copy.workItalic}</h2></div><p>{copy.workDescription}</p></div>
          <div className="work-filters" role="group" aria-label={es ? "Filtrar proyectos" : "Filter projects"}>
            {["all", "web", "ui"].map((value, index) => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value} className={filter === value ? "is-active" : ""}>{copy.filters[index]}<span>({String(projects.filter((project) => matchesProjectFilter(project, value)).length).padStart(2, "0")})</span></button>)}
          </div>
          <div className="work-grid" aria-live="polite" aria-atomic="true">
            {visibleProjects.map((project) => {
              const url = project.deploy_url || project.design_url || project.download_url || project.source_url;
              const linkLabel = project.deploy_url ? copy.web : project.design_url ? copy.figma : project.download_url ? copy.psd : copy.source;
              const openPreview = project.previewOnly ? (event) => { event.preventDefault(); openProject(project); } : undefined;
              return <article id={`project-${project.id}`} className={`work-item work-item--${project.id}`} key={project.id}>
                <a href={url} onClick={openPreview} className={`work-media work-media--${project.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${project.previewOnly ? copy.preview : linkLabel}: ${project.title}`}>
                  <BackgroundImage src={project.image} label={project.title} className="project-background" />
                  <span className="work-number">{String(project.id).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><span className="project-open"><Arrow diagonal /></span>
                </a>
                <div className="work-info"><span className="project-kind">{project.category}{project.isConcept && <span className="project-concept">{copy.concept}</span>}</span><h3><a href={url} onClick={openPreview} target="_blank" rel="noopener noreferrer">{project.title}</a></h3></div>
                <p className="work-description">{project.description}</p>
                {project.previewViews && <button className="project-preview-trigger" onClick={() => openProject(project)} aria-label={`${copy.preview}: ${project.title}`}>{copy.preview}<Arrow /></button>}
                <div className="work-foot"><span>{project.styleLabel || project.techs.map((tech) => tech.name).join(" / ")}</span><a href={url} download={project.download_url ? true : undefined} target={project.download_url ? undefined : "_blank"} rel={project.download_url ? undefined : "noopener noreferrer"}>{linkLabel}<Arrow diagonal /></a></div>
              </article>;
            })}
          </div>
        </section>

        <section className="perspective-section page-width section-space" aria-labelledby="perspective-title">
          <div className="section-label"><span>03 / {es ? "Otras formas de mirar" : "Other ways of seeing"}</span><span>DIFFERENT MOODS, SAME CARE</span></div>
          <h2 id="perspective-title">{es ? "Distintos mundos." : "Different worlds."}<br />{es ? "La misma intención." : "The same intention."}</h2>
          <div className="perspective-collage">
            <a href="#project-7" onClick={() => setFilter("all")} className="perspective-image perspective-image--one"><BackgroundImage src={projects[6].image} label={projects[6].title} className="collage-background" /><span>ATLAS / EDITORIAL</span></a>
            <p className="perspective-copy">{es ? "Cada proyecto pide su propio lenguaje. Exploro tipografía, ritmo y composición para encontrar el que mejor cuenta su historia." : "Every project calls for its own language. I explore typography, rhythm and composition to find the one that tells its story best."}</p>
            <a href="#project-12" onClick={() => setFilter("all")} className="perspective-image perspective-image--two"><BackgroundImage src={projects[11].image} label={projects[11].title} className="collage-background" /><span>FOCO / PHOTOGRAPHY</span></a>
            <a href="#project-9" onClick={() => setFilter("all")} className="perspective-image perspective-image--three"><BackgroundImage src={projects[8].image} label={projects[8].title} className="collage-background" /><span>SENDA / WELLNESS</span></a>
            <span className="collage-word" aria-hidden="true">CREATE</span>
          </div>
        </section>

        <section className="background-section page-width section-space" aria-labelledby="background-title">
          <div className="background-heading"><h2 id="background-title">{es ? "Detrás del trabajo." : "Behind the work."}</h2><a className="oval-link" href={curriculum} target="_blank" rel="noopener noreferrer">{es ? "Ver CV" : "View CV"}<Arrow diagonal /></a></div>
          <div className="background-details">
            {[{ title: copy.career, items: experience.laboral }, { title: copy.education, items: experience.education }].map((group) => <details key={group.title}><summary>{group.title}<span className="details-action">{es ? "Explorar" : "Explore"}<Arrow diagonal /></span></summary><div className="career-list">{group.items.map((item) => <div className="career-row" key={`${item.title}-${item.time}`}><span>{item.time}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></details>)}
          </div>
          <div className="toolkit"><span className="small-eyebrow">{copy.toolLabel}</span><div className="toolkit-grid">{copy.toolGroups.map((group, index) => <div className="toolkit-group" key={group.title}><span className="toolkit-index">0{index + 1}</span><h3>{group.title}</h3><ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>)}</div></div>
        </section>

        <section className="process-section" id="process"><div className="page-width section-space">
          <div className="section-label"><span>{copy.processLabel}</span><span>IDEA / EXPLORE / CREATE</span></div>
          <h2>{copy.processTitle}<br />{copy.processItalic}</h2>
          <div className="process-list">{copy.process.map((step, index) => <article className="process-step" key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><div><p>{step.description}</p><span className="process-tags">{step.tags}</span></div><Arrow diagonal /></article>)}</div>
        </div></section>

        <section className="contact-section page-width section-space" id="contact">
          <div className="section-label"><span>{copy.contactLabel}</span><span>LET'S MAKE IT HAPPEN</span></div>
          <div className="contact-layout"><div className="contact-copy"><span className="section-kicker" aria-hidden="true">LET’S CREATE SOMETHING</span><h2>{copy.contactTitle}<br />{copy.contactItalic}</h2></div><div className="contact-invitation"><p>{copy.contactDescription}</p><a className="oval-link" href="https://www.linkedin.com/in/cruzsv" target="_blank" rel="noopener noreferrer">{copy.connect}<Arrow diagonal /></a></div></div>
        </section>
      </main>

      <footer className="portfolio-footer page-width"><div className="footer-top"><a className="footer-brand" href="#home">D. CRUZ<span>DESIGN & DEVELOPMENT</span></a><span>{copy.footerNote}</span><a className="back-top" href="#home">{copy.top}<Arrow /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {copy.rights}</span><div><a href="https://www.linkedin.com/in/cruzsv" target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /></a><a href="https://github.com/cruzito-x" target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal /></a><a href="https://instagram.com/cruzito.x_" target="_blank" rel="noopener noreferrer">Instagram<Arrow diagonal /></a></div><span className="footer-signoff">MADE WITH CARE & CURIOSITY</span></div></footer>
      {previewProject && <ProjectPreview project={previewProject} language={language} onClose={() => setPreviewProject(null)} />}
    </div>
  );
}

export default DesignerPortfolio;
