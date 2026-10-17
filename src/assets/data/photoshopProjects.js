import lino from "@/assets/pictures/Photoshop/lino.webp";
import linoFull from "@/assets/pictures/Photoshop/lino-full.webp";
import foco from "@/assets/pictures/Photoshop/foco.webp";
import focoFull from "@/assets/pictures/Photoshop/foco-full.webp";

const projects = [
  {
    id: 11, image: lino, full: linoFull, slug: "lino",
    title: { es: "LINO — Taller de cerámica", en: "LINO — Ceramics workshop" },
    style: { es: "Photoshop / Minimalismo cálido", en: "Photoshop / Warm minimalism" },
    description: {
      es: "Diseño web sencillo para una tienda de cerámica ficticia. Fotografía de producto, tipografía serif y una colección organizada con espacio y claridad. Compuesto en Photoshop 2025 con texto editable y capas agrupadas.",
      en: "A simple website design for a fictional ceramics shop. Product photography, serif typography and a collection organised with space and clarity. Composed in Photoshop 2025 with editable text and grouped layers.",
    },
  },
  {
    id: 12, image: foco, full: focoFull, slug: "foco",
    title: { es: "FOCO — Portfolio fotográfico", en: "FOCO — Photography portfolio" },
    style: { es: "Photoshop / Fotografía y contraste", en: "Photoshop / Photography & contrast" },
    description: {
      es: "Portfolio fotográfico ficticio de estructura sencilla. Fondo oscuro, titulares directos e imágenes en blanco y negro para centrar la atención en las series. Compuesto en Photoshop 2025 con texto editable y capas agrupadas.",
      en: "A fictional photography portfolio with a simple structure. A dark background, direct headlines and black-and-white imagery keep the focus on the series. Composed in Photoshop 2025 with editable text and grouped layers.",
    },
  },
];

export const getPhotoshopProjects = ({ language, category }) => projects.map(({ title, description, style, full, slug, ...project }) => ({
  ...project,
  title: title[language], description: description[language], styleLabel: style[language],
  category, kind: "web", isConcept: true, previewOnly: true, designTool: "Photoshop 2025",
  techs: [{ id: 1, name: "Photoshop 2025" }],
  download_url: `/designs/${slug}-web-concept.psd`,
  previewViews: { desktop: { image: full, width: 1440, height: 1800 } },
}));
