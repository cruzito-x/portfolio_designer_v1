import { useEffect, useState } from "react";
import en from "./lang/en.json";
import es from "./lang/es.json";
import DesignerPortfolio from "./views/portfolio/DesignerPortfolio";
import "./styles/index.css";

function App() {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("portfolio-language") === "en" ? "en" : "es",
  );

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("portfolio-language", language);
  }, [language]);

  return (
    <DesignerPortfolio
      lang={language === "es" ? es.es : en.en}
      language={language}
      onChangeLanguage={() => setLanguage((current) => current === "es" ? "en" : "es")}
    />
  );
}

export default App;
