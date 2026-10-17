import { useEffect, useState } from "react";
import "./styles/navbar.css";
import { useTheme } from "../../context/ThemeContext";

import DesktopNavbar from "@/components/navbar/components/DesktopNavbar";
import MobileNavbar from "@/components/navbar/components/MobileNavbar";
import getNavItems from "@/components/navbar/components/navItems";

const Navbar = ({ lang }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#");
  const [menuOpen, setMenuOpen] = useState(false);

  const { toggleTheme } = useTheme();
  const navItems = getNavItems(lang);

  /*
   * Detectar scroll
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Mantener sincronizado el enlace activo con la sección visible.
   */
  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "experience",
      "skills",
      "portfolio",
      "contact",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || sections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          const sectionId = visibleSection.target.id;
          setActiveLink(sectionId === "home" ? "#" : `#${sectionId}`);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  /*
   * Cerrar menú móvil al cambiar a escritorio
   */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
   * Seleccionar enlace
   */
  const handleSelectLink = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  /*
   * Cambiar tema
   */
  const handleToggleTheme = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    handleSelectLink("#");
    toggleTheme();
  };

  return (
    <>
      <DesktopNavbar
        lang={lang}
        navItems={navItems}
        activeLink={activeLink}
        onSelectLink={handleSelectLink}
        onToggleTheme={handleToggleTheme}
        isScrolled={isScrolled}
      />

      <MobileNavbar
        navItems={navItems}
        activeLink={activeLink}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onSelectLink={handleSelectLink}
      />
    </>
  );
};

export default Navbar;
