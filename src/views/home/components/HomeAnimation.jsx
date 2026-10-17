const HomeAnimation = ({ lang }) => {
  const card = {
    ariaLabel:
      lang?.build_card_aria?.text ||
      "David Cruz, Systems Engineer and AI Specialist",
    notes: lang?.build_card_notes?.text || "FILES / NOTES",
    date: lang?.build_card_date?.text || "29-26",
    titleStart: lang?.build_card_title_start?.text || "Para programar,",
    titleEnd:
      lang?.build_card_title_end?.text || "Tu imaginación es el límite.",
    copy:
      lang?.build_card_copy?.text ||
      "Entender lo complejo, ordenarlo y hacerlo mío, es mi forma de ser dev.",
    flowLabel: lang?.build_card_flow?.text || "Proceso de desarrollo",
    idea: lang?.build_card_idea?.text || "IDEA",
    design: lang?.build_card_design?.text || "DISEÑO",
    development: lang?.build_card_development?.text || "DESARROLLO",
    ship: lang?.build_card_ship?.text || "PUBLICAR",
    stack: lang?.build_card_stack?.text || "FIGMA / REACT / NODE / PYTHON",
  };

  return (
    <div className="system-card build-card" aria-label={card.ariaLabel}>
      <div className="build-card-toolbar">
        <div className="build-card-toolbar-meta">
          <div className="build-card-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span>
            /david/{lang?.portfolio?.text?.toLowerCase() || "portfolio"}/2026
          </span>
        </div>
        <span className="build-card-close" aria-hidden="true">
          ×
        </span>
      </div>

      <div className="build-card-sheet">
        <span className="build-card-margin" aria-hidden="true" />

        <div className="build-card-head">
          <span>{card.notes}</span>
          <span>{card.date}</span>
        </div>

        <h2>
          {card.titleStart}
          <br />
          <em>{card.titleEnd}</em>
        </h2>
        <p className="build-card-copy">{card.copy}</p>

        <div className="build-card-flow" aria-label={card.flowLabel}>
          <span className="build-card-flow-track" aria-hidden="true" />
          <span className="build-card-node build-card-node-idea">
            {card.idea}
          </span>
          <span className="build-card-node build-card-node-design">
            {card.design}
          </span>
          <span className="build-card-node build-card-node-development">
            {card.development}
          </span>
          <span className="build-card-node build-card-node-ship">
            {card.ship}
          </span>
        </div>

        <div className="build-card-footer">
          <span>{card.stack}</span>
        </div>
      </div>
    </div>
  );
};

export default HomeAnimation;
