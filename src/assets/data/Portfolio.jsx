import vulnerabilitiesDashboard from "@/assets/pictures/Designs/work2.webp";
import neuroFriendlyApp from "@/assets/pictures/Designs/work3.webp";
import personalFinanceApp from "@/assets/pictures/Designs/work4.webp";
import irisCodeScanner from "@/assets/pictures/Designs/work1.webp";
import ecommerce from "@/assets/pictures/Frontend/work7.webp";
import spideyPortfolio from "@/assets/pictures/Frontend/work10.webp";
import { techStack } from "@/assets/data/TechStack";
import { getConceptProjects } from "@/assets/data/conceptProjects";
import { getPhotoshopProjects } from "@/assets/data/photoshopProjects";

export const getFilters = (lang) => [
  { name: lang.all?.text },
  { name: lang.web_design?.text, color: "var(--html-color)" },
  { name: lang.ui_ux_design?.text, color: "var(--figma-color)" },
];

const getTechs = (...techNames) =>
  techNames
    .map((techName) => techStack[techName])
    .filter(Boolean)
    .map((tech, index) => ({ id: index + 1, ...tech }));

export const getProjectsData = (lang, language = lang.all?.text === "Todos" ? "es" : "en") => {
  const filters = getFilters(lang);
  const webDesign = filters[1];
  const uiUxDesign = filters[2];

  return [
    {
      id: 1,
      image: spideyPortfolio,
      title: lang.spidey_portfolio_title?.text,
      description: lang.spidey_portfolio_description?.text,
      category: webDesign.name,
      category_color: webDesign.color,
      techs: getTechs("tailwind", "react", "typescript"),
      deploy_url: "https://spidermansv.vercel.app",
    },
    {
      id: 2,
      image: ecommerce,
      title: lang.e_commerce_title?.text,
      description: lang.e_commerce_description?.text,
      category: webDesign.name,
      category_color: webDesign.color,
      techs: getTechs("angular", "express", "mongodb"),
      source_url: "https://github.com/cruzito-x/mean-project",
    },
    {
      id: 3,
      image: vulnerabilitiesDashboard,
      title: lang.vulnerabilities_dashboard_title?.text,
      description: lang.vulnerabilities_dashboard_description?.text,
      category: uiUxDesign.name,
      category_color: uiUxDesign.color,
      techs: getTechs("figma"),
      design_url:
        "https://www.figma.com/design/KEbpsM6D6wlBzbGeSDJd5l/Vulnerability-Management-Dashboard?node-id=0-1&t=POkUbqBsJ6ZmPSGC-1",
    },
    {
      id: 4,
      image: neuroFriendlyApp,
      title: lang.neurodivergent_people_mobile_app_title?.text,
      description: lang.neurodivergent_people_mobile_app_description?.text,
      category: uiUxDesign.name,
      category_color: uiUxDesign.color,
      techs: getTechs("figma"),
      design_url:
        "https://www.figma.com/design/g039NhW9ZAy8NcF2knXqZk/MindMap?m=auto&t=HpVDzN4iSlcsV6dT-6",
    },
    {
      id: 5,
      image: personalFinanceApp,
      title: lang.personal_finances_mobile_app_title?.text,
      description: lang.personal_finances_mobile_app_description?.text,
      category: uiUxDesign.name,
      category_color: uiUxDesign.color,
      techs: getTechs("figma"),
      design_url:
        "https://www.figma.com/design/z9cJh3kNxY3ydh2K2ID8I8/Yoru-%C2%B7-App-de-gastos-%C2%B7-Dise%C3%B1o-desde-c%C3%B3digo?t=yzVL3GiPnZAL64OO-1",
    },
    {
      id: 6,
      image: irisCodeScanner,
      title: lang.vs_marketplace_extension_title?.text,
      description: lang.vs_marketplace_extension_description?.text,
      category: uiUxDesign.name,
      category_color: uiUxDesign.color,
      techs: getTechs("figma"),
      design_url:
        "https://www.figma.com/design/Bh6zAJMZwH1hPVSKdd7zIV/IRIS-Code-Scanner?node-id=0-1&t=WFgD6oEX4MtUZavF-1",
    },
    ...getConceptProjects({ language, category: webDesign.name, techs: getTechs("figma") }),
    ...getPhotoshopProjects({ language, category: webDesign.name }),
  ];
};
