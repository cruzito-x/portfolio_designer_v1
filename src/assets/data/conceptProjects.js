import atlas from "@/assets/pictures/Concepts/atlas.webp";
import bruma from "@/assets/pictures/Concepts/bruma.webp";
import senda from "@/assets/pictures/Concepts/senda.webp";
import orbit from "@/assets/pictures/Concepts/orbit.webp";

const concepts = [
  {
    id: 7,
    image: atlas,
    figmaFile: "https://www.figma.com/design/MUvm7cs6NlRypLTtZaYTI3",
    node: "6-2",
    title: { es: "ATLAS — Arquitectura contemporánea", en: "ATLAS — Contemporary architecture" },
    style: { es: "Editorial suizo", en: "Swiss editorial" },
    description: {
      es: "Estudio de arquitectura ficticio. Retícula asimétrica, tipografía sans serif y fotografía sin superposiciones para dar protagonismo a los espacios.",
      en: "A fictional architecture studio. An asymmetric grid, sans serif typography and unobstructed photography keep the focus on the spaces.",
    },
  },
  {
    id: 8,
    image: bruma,
    figmaFile: "https://www.figma.com/design/SH4e4GFIGbvme1KdAVaSkp",
    node: "5-2",
    title: { es: "BRUMA — Café de especialidad", en: "BRUMA — Specialty coffee" },
    style: { es: "Neobrutalismo cálido", en: "Warm neobrutalism" },
    description: {
      es: "Tienda ficticia de café con una identidad enérgica. Titulares contundentes, bordes marcados y colores cálidos que llevan la atención al producto y a la compra.",
      en: "A fictional coffee shop with an energetic identity. Bold headlines, strong borders and warm colours draw attention to the product and shopping actions.",
    },
  },
  {
    id: 9,
    image: senda,
    figmaFile: "https://www.figma.com/design/df5suB2jaRWf9FTWrDGKxF",
    node: "6-2",
    title: { es: "SENDA — Refugio de bienestar", en: "SENDA — Wellness retreat" },
    style: { es: "Lujo orgánico", en: "Organic luxury" },
    description: {
      es: "Refugio de bienestar ficticio. Tipografía serif, encuadres orgánicos y espacio en blanco para transmitir calma y acompañar el descubrimiento de la estancia.",
      en: "A fictional wellness retreat. Serif typography, organic framing and whitespace convey calm and guide visitors through discovering the stay.",
    },
  },
  {
    id: 10,
    image: orbit,
    figmaFile: "https://www.figma.com/design/uk5X4y3QUSlwn48d7tovgZ",
    node: "6-2",
    title: { es: "ORBIT — Plataforma para equipos creativos", en: "ORBIT — Creative team platform" },
    style: { es: "Producto corporativo", en: "Corporate product" },
    description: {
      es: "Producto SaaS ficticio con landing e interfaz de gestión. Azul corporativo, módulos de información y una jerarquía funcional que facilita leer prioridades y actividad.",
      en: "A fictional SaaS product with a landing page and management interface. Corporate blue, information modules and a functional hierarchy make priorities and activity easier to scan.",
    },
  },
];

export const getConceptProjects = ({ language, category, techs }) =>
  concepts.map(({ title, description, style, figmaFile, node, ...project }) => ({
    ...project,
    title: title[language],
    description: description[language],
    styleLabel: style[language],
    category,
    category_color: "var(--accent-strong)",
    kind: "web",
    isConcept: true,
    techs,
    design_url: `${figmaFile}?node-id=${node}`,
  }));
