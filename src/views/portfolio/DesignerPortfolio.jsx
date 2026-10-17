import { useEffect, useState } from "react";
import { getProjectsData } from "@/assets/data/Portfolio";
import { getExperienceData } from "@/assets/data/experienceData";
import { useTheme } from "@/context/ThemeContext";
import portrait from "@/assets/img/me.webp";
import curriculum from "@/assets/docs/David Cruz - Curriculum Vitae.pdf";

const text = {
  es: {
    nav: ["Proyectos", "Sobre mí", "Proceso", "Contacto"],
    menu: "Abrir navegación", close: "Cerrar navegación", skip: "Ir al contenido",
    discipline: "Diseñador web & desarrollador frontend", location: "El Salvador · Para la web, desde cualquier lugar",
    intro: "Hola, soy David Cruz", title: ["Diseño web", "con intención.", "Y carácter."],
    description: "Convierto ideas en sitios web que conectan diseño, claridad y funcionalidad. Desde el primer concepto en Figma hasta el último detalle en el navegador.",
    seeWork: "Explorar proyectos", selected: "Una selección de mi trabajo",
    disciplines: ["Diseño web", "Interfaces UI/UX", "Desarrollo frontend"],
    workLabel: "01 / Trabajo seleccionado", workTitle: "El diseño habla.", workItalic: "Estos son mis proyectos.",
    workDescription: "Sitios web e interfaces donde cada decisión tiene un propósito.",
    filters: ["Todos", "Sitios web", "UI/UX"], web: "Ver sitio web", figma: "Explorar en Figma", source: "Ver código", concept: "Concepto ficticio",
    aboutLabel: "02 / Detrás del diseño", aboutTitle: "Sensibilidad visual.", aboutItalic: "Criterio técnico.",
    aboutDescription: "Soy David, diseñador web e Ingeniero en Sistemas y Computación. Me interesa ese punto en el que una buena idea se convierte en una experiencia clara, útil y con personalidad.",
    aboutMore: "Trabajo en Figma para dar forma a las interfaces y en HTML, CSS, JavaScript y React para llevarlas a la web. Entender ambos lados me permite diseñar con los pies en la tierra y cuidar lo que pasa después del prototipo.",
    cv: "Mi experiencia, en detalle", portrait: "Retrato de David Cruz",
    career: "Experiencia profesional", education: "Formación", toolLabel: "Mi caja de herramientas",
    toolGroups: [
      { title: "Diseño & prototipado", tools: ["Figma", "Prototipos interactivos", "Diseño responsive", "Photoshop · nivel básico"] },
      { title: "Desarrollo web", tools: ["HTML & CSS", "JavaScript & TypeScript", "React", "Tailwind CSS"] },
      { title: "Una visión completa", tools: ["Interfaces web", "Sistemas de componentes", "Integración de APIs", "Git & GitHub"] },
    ],
    processLabel: "03 / Forma de trabajar", processTitle: "De una buena idea", processItalic: "a una mejor experiencia.",
    process: [
      { title: "Entender antes de diseñar.", description: "Definir qué necesita comunicar el sitio, a quién se dirige y qué debe conseguir cada página.", tags: "Objetivos · Estructura · Referencias" },
      { title: "Dar forma y personalidad.", description: "Construir una dirección visual coherente: jerarquía, tipografía, color y prototipos que permitan recorrer la experiencia.", tags: "Figma · UI/UX · Prototipado" },
      { title: "Cuidar hasta el último píxel.", description: "Llevar el diseño a una web responsive, afinar las interacciones y revisar cómo se siente en cada pantalla.", tags: "Frontend · Responsive · Detalle" },
    ],
    contactLabel: "04 / Tu próximo proyecto", contactTitle: "¿Una idea", contactItalic: "en mente?", contactDescription: "Démosle una forma que valga la pena visitar. Cuéntame qué necesitas y empecemos por una conversación.",
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
    disciplines: ["Web design", "UI/UX interfaces", "Frontend development"],
    workLabel: "01 / Selected work", workTitle: "Design speaks.", workItalic: "Here's my work.",
    workDescription: "Websites and interfaces where every decision has a purpose.",
    filters: ["All", "Websites", "UI/UX"], web: "Visit website", figma: "Explore in Figma", source: "View code", concept: "Fictional concept",
    aboutLabel: "02 / Behind the design", aboutTitle: "Visual sensibility.", aboutItalic: "Technical thinking.",
    aboutDescription: "I'm David, a web designer and Systems and Computing Engineer. I'm drawn to that moment when a good idea becomes a clear, useful experience with its own personality.",
    aboutMore: "I use Figma to shape interfaces and HTML, CSS, JavaScript and React to bring them to the web. Understanding both sides helps me design thoughtfully and care for what happens beyond the prototype.",
    cv: "My experience, in detail", portrait: "Portrait of David Cruz",
    career: "Professional experience", education: "Education", toolLabel: "My creative toolkit",
    toolGroups: [
      { title: "Design & prototyping", tools: ["Figma", "Interactive prototypes", "Responsive design", "Photoshop · basic knowledge"] },
      { title: "Web development", tools: ["HTML & CSS", "JavaScript & TypeScript", "React", "Tailwind CSS"] },
      { title: "The complete picture", tools: ["Web interfaces", "Component systems", "API integration", "Git & GitHub"] },
    ],
    processLabel: "03 / My approach", processTitle: "From a good idea", processItalic: "to a better experience.",
    process: [
      { title: "Understand before designing.", description: "Define what the website needs to communicate, who it's for, and what each page should accomplish.", tags: "Goals · Structure · References" },
      { title: "Give it form and personality.", description: "Create a coherent visual direction: hierarchy, typography, colour and prototypes that let you explore the experience.", tags: "Figma · UI/UX · Prototyping" },
      { title: "Care for every last pixel.", description: "Bring the design to a responsive website, refine the interactions and review how it feels on each screen.", tags: "Frontend · Responsive · Detail" },
    ],
    contactLabel: "04 / Your next project", contactTitle: "An idea", contactItalic: "in mind?", contactDescription: "Let's give it a form worth visiting. Tell me what you need, and let's start with a conversation.",
    connect: "Let's connect / LinkedIn",
    footerNote: "Designed with intention. Developed with care.", top: "Back to top", rights: "Designed & developed by David Cruz", light: "Use light theme", dark: "Use dark theme",
  },
};

const Arrow = ({ diagonal = false, className = "" }) => (
  <svg className={`arrow-icon ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
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

const BrowserFrame = ({ project, hero = false }) => (
  <div className={`browser-frame ${hero ? "browser-frame--hero" : ""}`}>
    <div className="browser-bar" aria-hidden="true">
      <span className="browser-dots"><i /><i /><i /></span>
      <span>{project.id === 1 ? "spidermansv.vercel.app" : project.design_url ? "FIGMA / INTERFACE DESIGN" : "WEB / FRONTEND DEVELOPMENT"}</span>
      <span className="browser-plus">+</span>
    </div>
    <div className="browser-screen">
      <BackgroundImage src={project.image} label={project.title} className="project-background" />
    </div>
  </div>
);

function DesignerPortfolio({ lang, language, onChangeLanguage }) {
  const copy = text[language];
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const projects = getProjectsData(lang, language);
  const experience = getExperienceData(lang);
  const visibleProjects = projects.filter((project) => matchesProjectFilter(project, filter));
  const navIds = ["portfolio", "about", "process", "contact"];

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <div className="designer-site">
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className="portfolio-header">
        <div className="page-width header-inner">
          <a className="brand" href="#home" aria-label="David Cruz — Home" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">dc<span>✳</span></span>
            <span className="brand-name">DAVID CRUZ<span>WEB DESIGNER</span></span>
          </a>
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} id="main-navigation" aria-label={language === "es" ? "Navegación principal" : "Main navigation"}>
            {copy.nav.map((label, index) => <a key={navIds[index]} href={`#${navIds[index]}`} onClick={() => setMenuOpen(false)}>{label}{index === 3 && <Arrow diagonal />}</a>)}
          </nav>
          <div className="header-controls">
            <button className="language-toggle" onClick={onChangeLanguage} aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}>{language}<span>/</span>{language === "es" ? "en" : "es"}</button>
            <button className="theme-toggle" onClick={toggleTheme} aria-label={isDarkMode ? copy.light : copy.dark} title={isDarkMode ? copy.light : copy.dark}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{isDarkMode ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.5 14.5A9 9 0 0 1 9.5 3.5a9 9 0 1 0 11 11Z" />}</svg>
            </button>
            <button className="menu-toggle" aria-controls="main-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? copy.close : copy.menu} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="portfolio-hero page-width" id="home">
          <div className="hero-topline"><span><i />{copy.discipline}</span><span>PORTFOLIO — {new Date().getFullYear()}</span></div>
          <div className="portfolio-hero-grid">
            <div className="hero-introduction">
              <p className="small-eyebrow">{copy.intro}</p>
              <h1>{copy.title[0]}<br />{copy.title[1]}<br /><em>{copy.title[2]}</em><span className="title-period">↗</span></h1>
              <p className="hero-summary">{copy.description}</p>
              <a href="#portfolio" className="button button-dark">{copy.seeWork}<Arrow diagonal /></a>
            </div>
            <div className="hero-composition">
              <span className="canvas-cross canvas-cross--one" aria-hidden="true">+</span>
              <span className="canvas-label">SELECTED DIGITAL EXPERIENCES</span>
              <a className="hero-project" href={projects[0].deploy_url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.web}: ${projects[0].title}`}><BrowserFrame project={projects[0]} hero /></a>
              <a className="hero-interface" href={projects[4].design_url} target="_blank" rel="noopener noreferrer" aria-label={`${copy.figma}: ${projects[4].title}`}>
                <span className="mini-project-label"><span className="figma-mark" aria-hidden="true">✦</span> UI EXPLORATION <Arrow diagonal /></span>
                <div className="mini-project-image"><BackgroundImage src={projects[4].image} label={projects[4].title} className="mini-project-background" /></div>
                <span className="mini-project-caption">Yoru<span>Figma / Mobile UI</span></span>
              </a>
              <div className="design-seal" aria-hidden="true"><span>DESIGN</span><span className="seal-star">✳</span><span>DEVELOP</span></div>
              <span className="canvas-cross canvas-cross--two" aria-hidden="true">+</span>
              <span className="canvas-bottom">FIGMA → BROWSER<span>01—{String(projects.length).padStart(2, "0")}</span></span>
            </div>
          </div>
          <div className="hero-bottomline"><span>{copy.location}</span><a href="#portfolio">{copy.selected}<span>↓</span></a></div>
        </section>

        <div className="discipline-band"><div className="page-width">{copy.disciplines.map((item) => <span key={item}>{item}<span aria-hidden="true">✳</span></span>)}</div></div>

        <section className="work-section section-space page-width" id="portfolio">
          <div className="section-label"><span>{copy.workLabel}</span><span>({String(projects.length).padStart(2, "0")})</span></div>
          <div className="work-heading"><h2>{copy.workTitle}<br /><em>{copy.workItalic}</em></h2><p>{copy.workDescription}</p></div>
          <div className="work-filters" role="group" aria-label={language === "es" ? "Filtrar proyectos" : "Filter projects"}>
            {["all", "web", "ui"].map((value, index) => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value} className={filter === value ? "is-active" : ""}>{copy.filters[index]}<span>{projects.filter((project) => matchesProjectFilter(project, value)).length}</span></button>)}
          </div>
          <div className="work-grid" aria-live="polite" aria-atomic="true">
            {visibleProjects.map((project) => {
              const url = project.deploy_url || project.design_url || project.source_url;
              const linkLabel = project.deploy_url ? copy.web : project.design_url ? copy.figma : copy.source;
              return <article id={`project-${project.id}`} className={`work-item work-item--${project.id}`} key={project.id}>
                <a href={url} className={`work-media work-media--${project.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${linkLabel}: ${project.title}`}>
                  <span className="work-number">/{String(project.id).padStart(2, "0")}</span>
                  <BrowserFrame project={project} />
                  <span className="project-open"><Arrow diagonal /></span>
                </a>
                <div className="work-info"><div><span className="project-kind">{project.category}{project.isConcept && <span className="project-concept">{copy.concept}</span>}</span><h3><a href={url} target="_blank" rel="noopener noreferrer">{project.title}</a></h3></div><Arrow diagonal /></div>
                <p className="work-description">{project.description}</p>
                <div className="work-foot"><span>{project.styleLabel || project.techs.map((tech) => tech.name).join(" / ")}</span><a href={url} target="_blank" rel="noopener noreferrer">{linkLabel}<Arrow diagonal /></a></div>
              </article>;
            })}
          </div>
        </section>

        <section className="about-section section-space page-width" id="about">
          <div className="section-label"><span>{copy.aboutLabel}</span><span>DAVID CRUZ</span></div>
          <div className="profile-grid">
            <div className="profile-image"><BackgroundImage src={portrait} label={copy.portrait} className="profile-photo" /><div className="profile-caption"><span>DAVID CRUZ</span><span>EL SALVADOR / WEB DESIGN</span></div></div>
            <div className="profile-copy"><span className="small-eyebrow">DESIGN MEETS DEVELOPMENT</span><h2>{copy.aboutTitle}<br /><em>{copy.aboutItalic}</em></h2><p className="profile-lead">{copy.aboutDescription}</p><p>{copy.aboutMore}</p><a className="text-link" href={curriculum} target="_blank" rel="noopener noreferrer">{copy.cv}<Arrow diagonal /></a></div>
          </div>
          <div className="background-details">
            {[{ title: copy.career, items: experience.laboral }, { title: copy.education, items: experience.education }].map((group) => <details key={group.title}><summary>{group.title}<span>+</span></summary><div className="career-list">{group.items.map((item) => <div className="career-row" key={`${item.title}-${item.time}`}><span>{item.time}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div></details>)}
          </div>
          <div className="toolkit"><span className="small-eyebrow">{copy.toolLabel}</span><div className="toolkit-grid">{copy.toolGroups.map((group, index) => <div className="toolkit-group" key={group.title}><span className="toolkit-index">0{index + 1}</span><h3>{group.title}</h3><ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></div>)}</div></div>
        </section>

        <section className="process-section" id="process"><div className="page-width section-space">
          <div className="section-label"><span>{copy.processLabel}</span><span aria-hidden="true">✳</span></div>
          <h2>{copy.processTitle}<br /><em>{copy.processItalic}</em></h2>
          <div className="process-list">{copy.process.map((step, index) => <article className="process-step" key={step.title}><span className="process-number">0{index + 1}</span><h3>{step.title}</h3><div><p>{step.description}</p><span className="process-tags">{step.tags}</span></div><Arrow diagonal /></article>)}</div>
        </div></section>

        <section className="contact-section page-width section-space" id="contact">
          <div className="section-label"><span>{copy.contactLabel}</span><span>LET'S MAKE IT HAPPEN</span></div>
          <div className="contact-layout">
            <div className="contact-copy">
              <h2>{copy.contactTitle}<br /><em>{copy.contactItalic}</em><span className="contact-star" aria-hidden="true">✳</span></h2>
            </div>
            <div className="contact-invitation">
              <p>{copy.contactDescription}</p>
              <a className="button button-dark" href="https://www.linkedin.com/in/cruzsv" target="_blank" rel="noopener noreferrer">{copy.connect}<Arrow diagonal /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer"><div className="page-width"><div className="footer-top"><span>{copy.footerNote}</span><a href="#home">{copy.top}<span>↑</span></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {copy.rights}</span><div><a href="https://www.linkedin.com/in/cruzsv" target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /></a><a href="https://github.com/cruzito-x" target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal /></a><a href="https://instagram.com/cruzito.x_" target="_blank" rel="noopener noreferrer">Instagram<Arrow diagonal /></a></div></div></div></footer>
    </div>
  );
}

export default DesignerPortfolio;
