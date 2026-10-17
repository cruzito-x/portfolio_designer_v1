import atlas from "@/assets/pictures/Concepts/atlas.webp";
import bruma from "@/assets/pictures/Concepts/bruma.webp";
import senda from "@/assets/pictures/Concepts/senda.webp";
import orbit from "@/assets/pictures/Concepts/orbit.webp";
import atlasFull from "@/assets/pictures/Concepts/atlas-full.webp";
import atlasMobile from "@/assets/pictures/Concepts/atlas-mobile.webp";
import brumaFull from "@/assets/pictures/Concepts/bruma-full.webp";
import brumaMobile from "@/assets/pictures/Concepts/bruma-mobile.webp";
import sendaFull from "@/assets/pictures/Concepts/senda-full.webp";
import sendaMobile from "@/assets/pictures/Concepts/senda-mobile.webp";
import orbitFull from "@/assets/pictures/Concepts/orbit-full.webp";
import orbitMobile from "@/assets/pictures/Concepts/orbit-mobile.webp";
import previewSizes from "./conceptPreviewSizes.json";

const previewImages = { atlas: [atlasFull, atlasMobile], bruma: [brumaFull, brumaMobile], senda: [sendaFull, sendaMobile], orbit: [orbitFull, orbitMobile] };

const concepts = [
  {
    id: 7,
    slug: "atlas",
    image: atlas,
    figmaFile: "https://www.figma.com/design/MUvm7cs6NlRypLTtZaYTI3",
    node: "9-176", prototypeNode: "9-38",
    title: { es: "ATLAS — Arquitectura contemporánea", en: "ATLAS — Contemporary architecture" },
    style: { es: "Editorial suizo", en: "Swiss editorial" },
    description: {
      es: "Estudio de arquitectura ficticio con retícula editorial, caso de proyecto y explicación del proceso. Prototipo responsive con navegación fija, scroll entre secciones y una vista de detalle.",
      en: "A fictional architecture studio with an editorial grid, project case study and design process. A responsive prototype with fixed navigation, section scrolling and a detail view.",
    },
  },
  {
    id: 8,
    slug: "bruma",
    image: bruma,
    figmaFile: "https://www.figma.com/design/SH4e4GFIGbvme1KdAVaSkp",
    node: "10-222", prototypeNode: "10-38",
    title: { es: "BRUMA — Café de especialidad", en: "BRUMA — Specialty coffee" },
    style: { es: "Neobrutalismo cálido", en: "Warm neobrutalism" },
    description: {
      es: "Tienda de café ficticia con una identidad enérgica, catálogo, historia de origen y guía de preparación. El prototipo permite recorrer la página y abrir una bolsa conceptual para cada producto.",
      en: "A fictional coffee shop with an energetic identity, a catalogue, origin story and brewing guide. The prototype supports page scrolling and a conceptual shopping bag for each product.",
    },
  },
  {
    id: 9,
    slug: "senda",
    image: senda,
    figmaFile: "https://www.figma.com/design/df5suB2jaRWf9FTWrDGKxF",
    node: "9-164", prototypeNode: "9-38",
    title: { es: "SENDA — Refugio de bienestar", en: "SENDA — Wellness retreat" },
    style: { es: "Lujo orgánico", en: "Organic luxury" },
    description: {
      es: "Refugio de bienestar ficticio con experiencias, estancia y un recorrido por el día. Tipografía serif, fotografía orgánica y un prototipo responsive con scroll y consulta conceptual de reserva.",
      en: "A fictional wellness retreat with experiences, accommodation and a day-at-the-retreat journey. Serif typography, organic photography and a responsive prototype with scrolling and a conceptual booking enquiry.",
    },
  },
  {
    id: 10,
    slug: "orbit",
    image: orbit,
    figmaFile: "https://www.figma.com/design/uk5X4y3QUSlwn48d7tovgZ",
    node: "9-428", prototypeNode: "9-56",
    title: { es: "ORBIT — Plataforma para equipos creativos", en: "ORBIT — Creative team platform" },
    style: { es: "Producto corporativo", en: "Corporate product" },
    description: {
      es: "Producto SaaS ficticio con flujo de trabajo, integraciones y comparación de planes. Landing responsive con navegación por secciones y una demo de gestión conectada al prototipo.",
      en: "A fictional SaaS product with workflows, integrations and plan comparison. A responsive landing page with section navigation and a management demo connected to the prototype.",
    },
  },
];

export const getConceptProjects = ({ language, category, techs }) =>
  concepts.map(({ title, description, style, figmaFile, node, prototypeNode, slug, ...project }) => ({
    ...project,
    title: title[language],
    description: description[language],
    styleLabel: style[language],
    category,
    category_color: "var(--accent-strong)",
    kind: "web",
    isConcept: true,
    techs,
    designTool: "Figma",
    design_url: `${figmaFile}?node-id=${node}`,
    prototype_url: `${figmaFile.replace("/design/", "/proto/")}?node-id=${prototypeNode}&scaling=scale-down-width&content-scaling=fixed`,
    previewViews: {
      desktop: { image: previewImages[slug][0], ...previewSizes[slug].desktop },
      mobile: { image: previewImages[slug][1], ...previewSizes[slug].mobile },
    },
  }));
