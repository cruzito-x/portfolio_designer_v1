const techStack = {
  html: {
    name: "HTML",
    color: "var(--html-color)",
    icon: <i className="bx bxl-html5"></i>,
  },

  css: {
    name: "CSS",
    color: "var(--css-color)",
    icon: <i className="bx bxl-css3"></i>,
  },

  javascript: {
    name: "JavaScript",
    color: "var(--javascript-color)",
    icon: <i className="bx bxl-javascript"></i>,
  },

  typescript: {
    name: "TypeScript",
    color: "var(--typescript-color)",
    icon: <i className="bx bxl-typescript"></i>,
  },

  bootstrap: {
    name: "Bootstrap",
    color: "var(--bootstrap-color)",
    icon: <i className="bx bxl-bootstrap"></i>,
  },

  tailwind: {
    name: "Tailwind",
    color: "var(--tailwind-color)",
    icon: <i className="bx bxl-tailwind-css"></i>,
  },

  jQuery: {
    name: "jQuery",
    color: "var(--jquery-color)",
    icon: <i className="bx bxl-jquery"></i>,
  },

  node: {
    name: "Node.js",
    color: "var(--express-color)",
    icon: <i className="bx bxl-nodejs"></i>,
  },

  react: {
    name: "React.js",
    color: "var(--react-color)",
    icon: <i className="bx bxl-react"></i>,
  },

  antd: {
    name: "Ant Design",
    color: "var(--ant-design-color)",
    icon: <i className="bx bxl-react"></i>,
  },

  angular: {
    name: "Angular",
    color: "var(--angular-color)",
    icon: <i className="bx bxl-angular"></i>,
  },

  java: {
    name: "Java",
    color: "var(--java-color)",
    icon: <i className="bx bxl-java"></i>,
  },

  express: {
    name: "Express.js",
    color: "var(--express-color)",
    icon: <i className="bx bxl-nodejs"></i>,
  },

  mysql: {
    name: "MySQL",
    color: "var(--mysql-color)",
    icon: <i className="bx bxs-data"></i>,
  },

  python: {
    name: "Python",
    color: "var(--python-color)",
    icon: <i className="bx bxl-python"></i>,
  },

  sqlserver: {
    name: "SQL Server",
    color: "geekblue",
    icon: <i className="bx bxs-data"></i>,
  },

  mongodb: {
    name: "MongoDB",
    color: "var(--mongodb-color)",
    icon: <i className="bx bxl-mongodb"></i>,
  },

  figma: {
    name: "Figma",
    color: "var(--figma-color)",
    icon: <i className="bx bxl-figma"></i>,
  },

  photoshop: {
    name: "Photoshop",
    color: "var(--photoshop-color)",
    icon: <i className="bx bxl-droplet-half"></i>,
  },

  swagger: {
    name: "Swagger",
    color: "var(--swagger-color)",
    icon: <i className="bx bx-code-curly"></i>,
  },

  googleColab: {
    name: "G. Colab",
    color: "var(--google-colab-color)",
    icon: <i className="bx bxl-google-cloud"></i>,
  },

  yolo: {
    name: "YOLO",
    color: "var(--yolo-color)",
    icon: <i className="bx bx-braille"></i>,
  },

  openCV: {
    name: "OpenCV",
    color: "var(--open-cv-color)",
    icon: <i className="bx bx-webcam"></i>,
  },

  mistral: {
    name: "Mistral",
    color: "var(--mistral-color)",
    icon: <i className="bx bx-brain"></i>,
  },
};

export const getTechs = (techs = []) =>
  techs
    .map((tech) => {
      const technology = techStack[tech];

      if (!technology) {
        return null;
      }

      return technology;
    })
    .filter(Boolean);

export { techStack };
