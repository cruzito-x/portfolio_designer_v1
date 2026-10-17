const MobileNavbar = ({
  navItems,
  activeLink,
  menuOpen,
  onToggleMenu,
  onSelectLink,
}) => {
  return (
    <div className="mobile-navbar d-md-none">
      <button
        className={`mobile-menu-toggle ${menuOpen ? "is-open" : ""}`}
        onClick={onToggleMenu}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <i className={`bx ${menuOpen ? "bx-x" : "bx-cube-alt"}`} />
      </button>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menú principal">
          <div className="mobile-menu-header">
            <span>David Cruz | Portfolio</span>
            <button
              type="button"
              onClick={onToggleMenu}
              aria-label="Cerrar menú"
            >
              <i className="bx bx-x" />
            </button>
          </div>

          <nav className="mobile-menu-grid">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id}
                className={activeLink === item.id ? "active_link" : ""}
                onClick={() => onSelectLink(item.id)}
              >
                <span className="mobile-menu-icon">
                  <i className={`bx ${item.icon}`} />
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
