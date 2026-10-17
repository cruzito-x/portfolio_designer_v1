import { useEffect, useRef, useState } from "react";

const labels = {
  es: { close: "Cerrar vista del diseño", desktop: "Escritorio", mobile: "Móvil", scroll: "Desliza para recorrer el diseño completo", prototype: "Probar prototipo", psd: "Descargar PSD", figma: "Abrir Figma", region: "Diseño completo con desplazamiento", concept: "Concepto ficticio de portfolio" },
  en: { close: "Close design preview", desktop: "Desktop", mobile: "Mobile", scroll: "Scroll to explore the complete design", prototype: "Try prototype", psd: "Download PSD", figma: "Open Figma", region: "Scrollable full design preview", concept: "Fictional portfolio concept" },
};

export default function ProjectPreview({ project, language, onClose }) {
  const dialogRef = useRef(null);
  const [device, setDevice] = useState("desktop");
  const copy = labels[language];
  const view = project.previewViews[device];

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  return (
    <dialog
      className="project-preview"
      ref={dialogRef}
      aria-labelledby="project-preview-title"
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
    >
      <header className="project-preview-header">
        <div><span className="small-eyebrow">{project.designTool} / {copy.concept}</span><h2 id="project-preview-title">{project.title}</h2></div>
        <button className="preview-close" onClick={() => dialogRef.current.close()} aria-label={copy.close}>×</button>
      </header>
      <div className="project-preview-toolbar">
        <div className="preview-devices" role="group" aria-label={language === "es" ? "Vista del diseño" : "Design view"}>
          {Object.keys(project.previewViews).map((key) => <button key={key} aria-pressed={key === device} onClick={() => setDevice(key)}>{copy[key]}</button>)}
        </div>
        <div className="preview-resource-links">
          {project.prototype_url && <a href={project.prototype_url} target="_blank" rel="noopener noreferrer">{copy.prototype} ↗</a>}
          <a href={project.download_url || project.design_url} download={project.download_url ? true : undefined} target={project.download_url ? undefined : "_blank"} rel={project.download_url ? undefined : "noopener noreferrer"}>{project.download_url ? copy.psd : copy.figma} ↗</a>
        </div>
      </div>
      <p className="preview-scroll-hint">{copy.scroll} <span aria-hidden="true">↓</span></p>
      <div className="project-preview-scroll" key={device} tabIndex={0} role="region" aria-label={copy.region}>
        <div className={`preview-artboard preview-artboard--${device}`}>
          <div
            className="preview-design-background"
            role="img"
            aria-label={`${project.title} — ${copy[device]}`}
            style={{ backgroundImage: `url("${view.image}")`, aspectRatio: `${view.width} / ${view.height}` }}
          />
        </div>
      </div>
    </dialog>
  );
}
