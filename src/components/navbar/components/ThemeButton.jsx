import cruzitoLogo from "@/assets/img/logo.png";

const ThemeButton = ({ onClick }) => {
  return (
    <div className="theme-button">
      <button
        type="button"
        onClick={onClick}
        className="cursor-pointer border-0 bg-transparent p-0"
        aria-label="Cambiar tema"
      >
        <img
          src={cruzitoLogo}
          className="rounded-circle shadow"
          alt="David's logo"
          width={39}
          height={39}
          style={{
            width: "39px",
            aspectRatio: "1 / 1",
          }}
        />
      </button>
      <span className="theme-label">David Cruz</span>
    </div>
  );
};

export default ThemeButton;
