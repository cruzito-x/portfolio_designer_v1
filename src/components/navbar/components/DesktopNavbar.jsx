import ThemeButton from "./ThemeButton";

const DesktopNavbar = ({
  navItems,
  activeLink,
  onSelectLink,
  onToggleTheme,
  isScrolled,
}) => {
  return (
    <nav
      className={`site-navbar d-none d-md-flex ${isScrolled ? "is-scrolled" : ""}`}
    >
      <div className="site-navbar-inner">
        <ThemeButton active={activeLink === "#"} onClick={onToggleTheme} />
        <div className="site-navbar-links">
          {navItems.slice(1).map((item) => (
            <a
              key={item.id}
              href={item.id}
              onClick={() => onSelectLink(item.id)}
              className={
                activeLink === item.id ? "nav_link active_link" : "nav_link"
              }
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
