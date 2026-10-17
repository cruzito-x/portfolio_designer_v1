import atlas from "@/assets/pictures/Concepts/atlas.webp";
import bruma from "@/assets/pictures/Concepts/bruma.webp";
import senda from "@/assets/pictures/Concepts/senda.webp";
import orbit from "@/assets/pictures/Concepts/orbit.webp";

const concepts = [
  {
    id: 7,
    image: atlas,
    figmaFile: "https://www.figma.com/design/MUvm7cs6NlRypLTtZaYTI3",
    node: "1-2",
    title: { es: "ATLAS — Arquitectura contemporánea", en: "ATLAS — Contemporary architecture" },
    description: {
      es: "Concepto editorial para un estudio de arquitectura. Fotografía inmersiva, tipografía monumental y una composición centrada en los espacios.",
      en: "An editorial concept for an architecture studio. Immersive photography, monumental typography and a composition built around spaces.",
    },
  },
  {
    id: 8,
    image: bruma,
    figmaFile: "https://www.figma.com/design/SH4e4GFIGbvme1KdAVaSkp",
    node: "1-2",
    title: { es: "BRUMA — Café de especialidad", en: "BRUMA — Specialty coffee" },
    description: {
      es: "Marca ficticia de café de especialidad. Una experiencia de compra cálida con fotografía de producto y una identidad inspirada en el origen.",
      en: "A fictional specialty coffee brand. A warm shopping experience with product photography and an identity inspired by its origins.",
    },
  },
  {
    id: 9,
    image: senda,
    figmaFile: "https://www.figma.com/design/df5suB2jaRWf9FTWrDGKxF",
    node: "1-2",
    title: { es: "SENDA — Refugio de bienestar", en: "SENDA — Wellness retreat" },
    description: {
      es: "Concepto de hospitalidad y bienestar. Naturaleza, una paleta serena y una interfaz de exploración que invita a descubrir el refugio.",
      en: "A hospitality and wellness concept. Nature, a serene palette and an exploration interface that invites visitors to discover the retreat.",
    },
  },
  {
    id: 10,
    image: orbit,
    figmaFile: "https://www.figma.com/design/uk5X4y3QUSlwn48d7tovgZ",
    node: "1-2",
    title: { es: "ORBIT — Plataforma para equipos creativos", en: "ORBIT — Creative team platform" },
    description: {
      es: "Concepto de producto SaaS con landing e interfaz de gestión. Contraste oscuro, acentos lavanda y un dashboard diseñado para dar claridad al trabajo.",
      en: "A SaaS product concept with a landing page and management interface. Dark contrast, lavender accents and a dashboard designed for clarity.",
    },
  },
];

export const getConceptProjects = ({ language, category, techs }) =>
  concepts.map(({ title, description, figmaFile, node, ...project }) => ({
    ...project,
    title: title[language],
    description: description[language],
    category,
    category_color: "var(--accent-strong)",
    kind: "web",
    isConcept: true,
    techs,
    design_url: `${figmaFile}?node-id=${node}`,
  }));
