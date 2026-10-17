// Prefix with shared helpers and LONG_INDEX. Existing artwork is retained as the opening.
const configurations = [
  {
    brand: "ATLAS",
    root: "6:2",
    mobile: "6:3",
    bg: "#F2F3EF",
    ink: "#1C211F",
    accent: "#CE4D37",
    muted: "#727973",
    border: "#CBD0C9",
    family: "Manrope",
    weight: "Regular",
    hash: "13064f5ed14501a8743353296a9f58b9b9229a38",
    nav: ["Proyectos", "Enfoque", "Hablemos"],
  },
  {
    brand: "BRUMA",
    root: "5:2",
    mobile: "5:3",
    bg: "#FFF4D7",
    ink: "#272219",
    accent: "#B9392A",
    muted: "#78634A",
    border: "#272219",
    family: "Space Grotesk",
    weight: "Bold",
    hash: "a8d25860315f8faab885d634129b77d2ac3e2631",
    nav: ["Nuestro café", "El origen", "Tu bolsa"],
  },
  {
    brand: "SENDA",
    root: "6:2",
    mobile: "6:3",
    bg: "#F5F3EC",
    ink: "#314B42",
    accent: "#9F8256",
    muted: "#7A8277",
    border: "#D5CCB8",
    family: "Cormorant Garamond",
    weight: "Regular",
    hash: "d337a9c8a81636d4545f1f324f6596a7a71d6a56",
    nav: ["Experiencias", "El refugio", "Reservar"],
  },
  {
    brand: "ORBIT",
    root: "6:2",
    mobile: "6:3",
    bg: "#F8FBFF",
    ink: "#17304E",
    accent: "#2C60D9",
    muted: "#718299",
    border: "#DEE6F2",
    family: "Inter",
    weight: "Bold",
    hash: null,
    nav: ["Producto", "Planes", "Ver demo"],
  },
];
const c = configurations[LONG_INDEX];
await Promise.all(
  [
    ["Cormorant Garamond", "Regular"],
    ["Cormorant Garamond", "Italic"],
    ["Inter", "Regular"],
    ["Inter", "Medium"],
    ["Inter", "Semi Bold"],
    ["Inter", "Bold"],
  ].map(([family, style]) => figma.loadFontAsync({ family, style })),
);
const previous = await Promise.all(
  [c.root, c.mobile].map((id) => figma.getNodeByIdAsync(id)),
);
const actualFonts = previous.flatMap((root) =>
  root
    .findAll((n) => n.type === "TEXT")
    .flatMap((n) =>
      n.getStyledTextSegments(["fontName"]).map((s) => s.fontName),
    ),
);
await Promise.all(
  [...new Map(actualFonts.map((f) => [JSON.stringify(f), f])).values()].map(
    (f) => figma.loadFontAsync(f),
  ),
);
if (page.children.some((n) => n.name === c.brand + " / Interactive / Desktop"))
  throw new Error("Interactive draft exists. Inspect instead of duplicating.");
const start = Math.max(...page.children.map((n) => n.x + n.width)) + 240;
const variableIds = [],
  styleIds = [],
  componentIds = [],
  sectionIds = [],
  reactions = [];
// Scoped foundations use the same raw/semantic pattern as createSemanticTokens.js.
const collection = figma.variables.createVariableCollection(
  c.brand + " / Web foundations",
);
const colors = {};
for (const [name, value] of Object.entries({
  surface: c.bg,
  text: c.ink,
  accent: c.accent,
  muted: c.muted,
  border: c.border,
})) {
  const primitive = figma.variables.createVariable(
    "primitive/" + name,
    collection,
    "COLOR",
  );
  primitive.scopes = [];
  primitive.setValueForMode(collection.defaultModeId, { ...rgb(value), a: 1 });
  variableIds.push(primitive.id);
  const semantic = figma.variables.createVariable(
    "color/" + name,
    collection,
    "COLOR",
  );
  semantic.scopes = ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"];
  semantic.setValueForMode(collection.defaultModeId, {
    type: "VARIABLE_ALIAS",
    id: primitive.id,
  });
  semantic.setVariableCodeSyntax(
    "WEB",
    "var(--" + c.brand.toLowerCase() + "-" + name + ")",
  );
  colors[value] = semantic;
  variableIds.push(semantic.id);
}
const spaces = {};
for (const value of [16, 24, 32, 64]) {
  const v = figma.variables.createVariable(
    "space/" + value,
    collection,
    "FLOAT",
  );
  v.scopes = ["GAP"];
  v.setValueForMode(collection.defaultModeId, value);
  v.setVariableCodeSyntax("WEB", "var(--space-" + value + ")");
  spaces[value] = v;
  variableIds.push(v.id);
}
function bindTree(root) {
  for (const n of [root, ...root.findAll(() => true)]) {
    if ("fills" in n && Array.isArray(n.fills))
      n.fills = n.fills.map((p) => {
        if (p.type !== "SOLID") return p;
        const hex =
          "#" +
          [p.color.r, p.color.g, p.color.b]
            .map((v) =>
              Math.round(v * 255)
                .toString(16)
                .padStart(2, "0"),
            )
            .join("")
            .toUpperCase();
        return colors[hex]
          ? figma.variables.setBoundVariableForPaint(p, "color", colors[hex])
          : p;
      });
    if (n.type === "FRAME" || n.type === "COMPONENT")
      for (const prop of [
        "itemSpacing",
        "paddingTop",
        "paddingBottom",
        "paddingLeft",
        "paddingRight",
      ])
        if (spaces[n[prop]]) n.setBoundVariable(prop, spaces[n[prop]]);
  }
}
const textStyles = {};
for (const [name, size, family, style] of [
  ["Card title", 23, c.family, c.weight],
  ["Body", 13, "Manrope", "Regular"],
]) {
  const s = figma.createTextStyle();
  s.name = c.brand + " / " + name;
  s.fontName = { family, style };
  s.fontSize = size;
  s.lineHeight = { unit: "PERCENT", value: 150 };
  styleIds.push(s.id);
  textStyles[name] = s;
}
function remember(root) {
  ids.push(root.id);
  root.findAll(() => true).forEach((n) => ids.push(n.id));
  return root;
}
function hug(node) {
  node.layoutSizingVertical = "HUG";
  return node;
}
function bordered(node, weight = 1) {
  node.strokes = fill(c.border);
  node.strokeWeight = weight;
  return node;
}
function para(parent, value, width, size = 15, ink = c.muted) {
  return text(
    parent,
    value,
    size,
    width,
    ink,
    LONG_INDEX === 3 ? "Inter" : "Manrope",
    "Regular",
    1.65,
  );
}
function title(parent, value, width, size = 56, ink = c.ink) {
  return text(
    parent,
    value,
    size,
    width,
    ink,
    c.family,
    c.weight,
    LONG_INDEX === 2 ? 1.05 : 1.12,
  );
}
function section(parent, name, small, background = c.bg, gap = 40) {
  const s = box(
    parent,
    name,
    small ? 390 : 1440,
    100,
    background,
    "VERTICAL",
    small ? 28 : gap,
    [small ? 56 : 88, small ? 24 : 64],
  );
  sectionIds.push(s.id);
  return hug(s);
}
function sectionHead(parent, label, heading, description, small) {
  const w = small ? 342 : 1312;
  mono(parent, label, w, c.accent, small ? 9 : 11);
  title(parent, heading, w, small ? 39 : 60);
  if (description) para(parent, description, small ? w : 720, small ? 14 : 17);
}
function grid(parent, name, small, columns = 3, gap = 24) {
  return hug(
    box(
      parent,
      name,
      small ? 342 : 1312,
      100,
      null,
      small ? "VERTICAL" : "HORIZONTAL",
      gap,
    ),
  );
}
function action(parent, label, width = 260, dark = false) {
  const n = button(
    parent,
    label,
    width,
    dark ? c.ink : c.accent,
    c.bg,
    LONG_INDEX === 2 ? 26 : LONG_INDEX === 3 ? 7 : 0,
  );
  if (LONG_INDEX === 1) {
    bordered(n, 2);
    n.effects = [
      {
        type: "DROP_SHADOW",
        color: { ...rgb(c.ink), a: 1 },
        offset: { x: 4, y: 4 },
        radius: 0,
        spread: 0,
        visible: true,
        blendMode: "NORMAL",
      },
    ];
  }
  return n;
}
function wire(node, target, navigation = "SCROLL_TO") {
  reactions.push({
    node,
    value: [
      {
        trigger: { type: "ON_CLICK" },
        actions: [
          {
            type: "NODE",
            destinationId: target.id,
            navigation,
            transition:
              navigation === "SCROLL_TO"
                ? {
                    type: "SCROLL_ANIMATE",
                    easing: { type: "EASE_OUT" },
                    duration: 0.45,
                  }
                : {
                    type: "DISSOLVE",
                    easing: { type: "EASE_OUT" },
                    duration: 0.2,
                  },
            resetScrollPosition: navigation === "NAVIGATE",
          },
        ],
      },
    ],
  });
}
function closeWire(node) {
  reactions.push({
    node,
    value: [{ trigger: { type: "ON_CLICK" }, actions: [{ type: "CLOSE" }] }],
  });
}
const masters = hug(
  box(
    page,
    c.brand + " / Reusable website cards",
    880,
    100,
    c.bg,
    "VERTICAL",
    32,
    24,
  ),
);
masters.x = start + 2080;
masters.y = 200;
function cardMaster(width, small) {
  const comp = track(figma.createComponent());
  comp.name = c.brand + " / Content card / " + (small ? "Mobile" : "Desktop");
  comp.description =
    "Reusable " +
    c.brand +
    " content card. Editable title, description, metadata and action; responsive sizes match the website grid.";
  comp.layoutMode = "VERTICAL";
  comp.resize(width, 100);
  comp.primaryAxisSizingMode = "AUTO";
  comp.counterAxisSizingMode = "FIXED";
  comp.itemSpacing = 16;
  comp.paddingTop =
    comp.paddingBottom =
    comp.paddingLeft =
    comp.paddingRight =
      16;
  comp.fills = fill(LONG_INDEX === 1 ? "#FFD256" : c.bg);
  masters.appendChild(comp);
  componentIds.push(comp.id);
  if (LONG_INDEX === 1 || LONG_INDEX === 3) {
    bordered(comp, LONG_INDEX === 1 ? 2 : 1);
    comp.cornerRadius = LONG_INDEX === 3 ? 10 : 0;
  }
  const cw = width - 32;
  if (c.hash) {
    const p = photo(comp, "Card photography", cw, small ? 210 : 250, c.hash);
    if (LONG_INDEX === 2) p.topLeftRadius = p.topRightRadius = cw / 2;
  } else {
    const graphic = box(
      comp,
      "Product workflow illustration",
      cw,
      138,
      "#E7EEFC",
      "VERTICAL",
      12,
      20,
    );
    graphic.cornerRadius = 8;
    [0, 1, 2].forEach((_, i) => {
      const line = row(graphic, "Workflow preview", cw - 40, 22, 0, "#FFFFFF");
      line.cornerRadius = 4;
      circle(line, 6, c.accent);
      text(
        line,
        ["Planificar", "Colaborar", "Entregar"][i],
        9,
        cw - 65,
        c.ink,
        "Inter",
      );
    });
  }
  const meta = mono(comp, "CATEGORY / 01", cw, c.accent, 9);
  meta.name = "Metadata";
  const heading = title(comp, "Título del contenido", cw, 23);
  heading.name = "Card title";
  heading.textStyleId = textStyles["Card title"].id;
  const body = para(
    comp,
    "Una descripción breve y clara del contenido.",
    cw,
    13,
  );
  body.name = "Card description";
  body.textStyleId = textStyles.Body.id;
  const btn = row(comp, "Card action", cw, 44);
  const label = text(
    btn,
    "Explorar",
    12,
    cw - 36,
    c.ink,
    "Manrope",
    "SemiBold",
  );
  label.name = "Action label";
  icon(btn, c.accent);
  hug(comp);
  bindTree(comp);
  return comp;
}
const masterD = cardMaster((1312 - 48) / 3, false),
  masterM = cardMaster(342, true);
function card(parent, data, small) {
  const n = remember((small ? masterM : masterD).createInstance());
  parent.appendChild(n);
  const values = {
    Metadata: data[0],
    "Card title": data[1],
    "Card description": data[2],
    "Action label": data[3] || "Explorar",
  };
  for (const t of n.findAll((n) => n.type === "TEXT"))
    if (values[t.name]) t.characters = values[t.name];
  return n;
}
let overlayCount = 0;
function overlayFrame(name, small, headline, body, details) {
  const n = hug(
    box(
      page,
      c.brand + " / " + name + " / " + (small ? "Mobile" : "Desktop"),
      small ? 342 : 460,
      100,
      c.bg,
      "VERTICAL",
      24,
      28,
    ),
  );
  n.x = start + 3100 + (small ? 520 : 0);
  n.y = 200 + overlayCount++ * 680;
  n.cornerRadius = LONG_INDEX === 3 ? 14 : 0;
  bordered(n, LONG_INDEX === 1 ? 2 : 1);
  mono(n, "DEMO CONCEPTUAL / " + name.toUpperCase(), n.width - 56, c.accent, 8);
  title(n, headline, n.width - 56, small ? 30 : 36);
  para(n, body, n.width - 56, 13);
  if (details) {
    rule(n, n.width - 56, c.border);
    para(n, details, n.width - 56, 14, c.ink);
  }
  const close = action(n, "Seguir explorando", n.width - 56, true);
  closeWire(close);
  bindTree(n);
  return n;
}
const screens = [];
for (let device = 0; device < 2; device++) {
  const small = device === 1,
    w = small ? 390 : 1440,
    inner = small ? 342 : 1312;
  const root = box(
    page,
    c.brand + " / Interactive / " + (small ? "Mobile" : "Desktop"),
    w,
    small ? 844 : 900,
    c.bg,
  );
  root.x = start + (small ? 1480 : 0);
  root.y = 200;
  root.clipsContent = true;
  root.overflowDirection = "VERTICAL";
  const body = remember(previous[device].clone());
  root.appendChild(body);
  body.name = "Scrollable website content";
  body.x = body.y = 0;
  body.clipsContent = false;
  hug(body);
  const targets = [],
    additional = [];
  if (LONG_INDEX === 0) {
    const projects = section(body, "01 / Selected architecture", small);
    targets.push(projects);
    sectionHead(
      projects,
      "01 / TRABAJO EN CONTEXTO",
      "Una casa.\nMuchas formas de vivirla.",
      "Del paisaje al detalle: un recorrido por las decisiones que dan forma a Casa del aire, un proyecto conceptual junto a la costa.",
      small,
    );
    const cards = grid(projects, "Architecture case views", small);
    const entries = [
      [
        "ESPACIO / 01",
        "Casa del aire",
        "La vivienda se abre hacia el horizonte y protege la intimidad del patio.",
        "Recorrer el proyecto",
      ],
      [
        "MATERIA / 02",
        "La piel del espacio",
        "Piedra local, hormigón y madera: una paleta que gana carácter con el tiempo.",
        "Ver materiales",
      ],
      [
        "LUZ / 03",
        "Habitar la transición",
        "Umbrales, sombras y recorridos que conectan el interior con el paisaje.",
        "Ver el detalle",
      ],
    ];
    const detail = box(
      page,
      "ATLAS / Case study / " + (small ? "Mobile" : "Desktop"),
      w,
      small ? 844 : 900,
      c.bg,
    );
    detail.x = start + 4300 + (small ? 1480 : 0);
    detail.y = 200;
    detail.clipsContent = true;
    detail.overflowDirection = "VERTICAL";
    const content = hug(
      box(detail, "Case study scroll content", w, 100, c.bg, "VERTICAL", 0),
    );
    const d = section(content, "Project introduction", small);
    const back = action(d, "Volver a ATLAS", Math.min(inner, 260), true);
    wire(back, root, "NAVIGATE");
    mono(d, "CASO CONCEPTUAL / RESIDENCIAL", inner, c.accent, 10);
    title(d, "Casa del aire.", inner, small ? 48 : 94);
    para(
      d,
      "Una vivienda que convierte la luz, la sombra y el paisaje en parte de la vida cotidiana.",
      inner,
      small ? 16 : 23,
    );
    photo(d, "Architecture case photograph", inner, small ? 300 : 590, c.hash);
    const spec = section(content, "Project decisions", small);
    sectionHead(
      spec,
      "LA IDEA",
      "Abrirse al paisaje.\nCuidar la escala humana.",
      "El programa se organiza alrededor de un patio. Las aperturas enmarcan las vistas y los voladizos regulan el sol; el material une espacios interiores y exteriores.",
      small,
    );
    [
      [
        "Estrategia espacial",
        "Un patio central ordena el recorrido y aporta luz a las zonas comunes.",
      ],
      [
        "Paleta material",
        "Piedra, hormigón visto y madera natural para una lectura serena del conjunto.",
      ],
      [
        "Relación con el lugar",
        "Las terrazas funcionan como umbral entre la casa y el horizonte.",
      ],
    ].forEach(([h, b]) => {
      rule(spec, inner, c.border);
      title(spec, h, inner, small ? 25 : 35);
      para(spec, b, inner, 15);
    });
    const end = action(spec, "Volver al estudio", Math.min(inner, 280), true);
    wire(end, root, "NAVIGATE");
    additional.push(detail.id);
    entries.forEach((entry) =>
      wire(card(cards, entry, small), detail, "NAVIGATE"),
    );
    const approach = section(body, "02 / Studio approach", small, "#E5E8E1");
    targets.push(approach);
    sectionHead(
      approach,
      "02 / ENFOQUE",
      "Diseñar desde\nlo que importa.",
      "Un proceso que conecta contexto, uso y materia. Cada decisión debe mejorar la forma de habitar.",
      small,
    );
    const steps = grid(approach, "Architecture process", small);
    [
      [
        "01",
        "Escuchar el lugar",
        "Orientación, escala, paisaje y vida cotidiana antes de dibujar.",
      ],
      [
        "02",
        "Encontrar el orden",
        "Un sistema espacial claro que permita vivir con libertad.",
      ],
      [
        "03",
        "Afinar la materia",
        "Detalles que hacen coherente la idea, desde la estructura hasta el encuentro de materiales.",
      ],
    ].forEach(([i, h, b]) => {
      const n = hug(
        box(steps, h, small ? 342 : (1312 - 48) / 3, 100, null, "VERTICAL", 24),
      );
      mono(n, i, n.width, c.accent, 12);
      title(n, h, n.width, small ? 29 : 36);
      para(n, b, n.width, 15);
    });
  } else if (LONG_INDEX === 1) {
    const shop = section(body, "01 / Coffee collection", small);
    targets.push(shop);
    sectionHead(
      shop,
      "01 / TU PRÓXIMO RITUAL",
      "Hay un café\npara cada mañana.",
      "Tres perfiles, una misma idea: café honesto, recién tostado y fácil de disfrutar. Catálogo y precios de muestra.",
      small,
    );
    const products = grid(shop, "Coffee product collection", small);
    [
      [
        "EQUILIBRADO / 250 G",
        "Blend diario",
        "Chocolate, caramelo y un final redondo. Tu punto de partida de cada día.",
        "$14.00",
      ],
      [
        "FRUTAL / 250 G",
        "Origen de altura",
        "Dulzor de fruta madura y acidez brillante para una taza con personalidad.",
        "$18.00",
      ],
      [
        "SUAVE / 250 G",
        "Pausa sin prisa",
        "Todo el ritual, con un perfil suave para acompañar la tarde.",
        "$16.00",
      ],
    ].forEach(([meta, h, b, price]) => {
      const n = card(products, [meta, h, b, "Añadir · " + price], small);
      const bag = overlayFrame(
        "Bolsa / " + h,
        small,
        "Buen café, en tu bolsa.",
        h + " · 250 g · 1 unidad",
        "Subtotal de muestra: " +
          price +
          "\nPrototipo de compra: no se realiza ningún cobro.",
      );
      wire(n, bag, "OVERLAY");
      additional.push(bag.id);
    });
    const origin = section(body, "02 / Coffee origin", small, "#F4A4B8");
    targets.push(origin);
    sectionHead(
      origin,
      "02 / DE DÓNDE VIENE LO BUENO",
      "El origen\nno es una etiqueta.",
      "Es conocer la tierra, cuidar el tueste y respetar el trabajo detrás de cada grano. Una historia conceptual de café con carácter.",
      small,
    );
    const originGrid = grid(origin, "Coffee origin story", small, 2);
    photo(
      originGrid,
      "Origin product editorial",
      small ? 342 : 644,
      small ? 270 : 400,
      c.hash,
    );
    const story = hug(
      box(
        originGrid,
        "Brand commitments",
        small ? 342 : 644,
        100,
        null,
        "VERTICAL",
        26,
        small ? 0 : 24,
      ),
    );
    [
      ["01 / ORIGEN", "Una selección con intención."],
      ["02 / TUESTE", "El perfil que deja hablar al café."],
      ["03 / RITUAL", "Una taza a tu manera."],
    ].forEach(([label, h]) => {
      mono(story, label, story.width - (small ? 0 : 48), c.accent, 10);
      title(story, h, story.width - (small ? 0 : 48), small ? 27 : 36);
    });
    const brew = section(body, "03 / Brew guide", small);
    sectionHead(
      brew,
      "03 / HAZLO TUYO",
      "Tu mejor taza.\nSin complicarte.",
      "Una guía sencilla para empezar; ajusta la receta a lo que te gusta.",
      small,
    );
    const guide = grid(brew, "Coffee preparation steps", small);
    [
      [
        "01 / MUELE",
        "Justo antes.",
        "Empieza con 18 g de café para 300 ml de agua.",
      ],
      [
        "02 / PREPARA",
        "Agua, con calma.",
        "Humedece el café primero y vierte el resto de forma pausada.",
      ],
      [
        "03 / DISFRUTA",
        "Prueba y ajusta.",
        "Más intenso o más ligero: el mejor café es el que disfrutas.",
      ],
    ].forEach((e) => card(guide, [...e, "GUÍA DE PREPARACIÓN"], small));
  } else if (LONG_INDEX === 2) {
    const experiences = section(body, "01 / Retreat experiences", small);
    targets.push(experiences);
    sectionHead(
      experiences,
      "01 / LO ESENCIAL",
      "El paisaje también\nes parte de la estancia.",
      "Tres maneras de volver a estar presente. Una propuesta conceptual de bienestar sin itinerarios apresurados.",
      small,
    );
    const items = grid(experiences, "Retreat experiences", small);
    const reserve = overlayFrame(
      "Consulta de estancia",
      small,
      "Tu pausa empieza aquí.",
      "Estancia de muestra · 2 noches · 2 personas",
      "Refugio del bosque\nConsulta conceptual de disponibilidad. No se envía una reserva ni se realiza un pago.",
    );
    additional.push(reserve.id);
    [
      [
        "BOSQUE / AL AMANECER",
        "Caminar sin destino",
        "Senderos para descubrir el bosque a tu ritmo y escuchar lo que suele pasar desapercibido.",
      ],
      [
        "AGUA / EN CALMA",
        "Dejarse llevar",
        "Una pausa junto al agua entre vapor, piedra y paisaje.",
      ],
      [
        "MESA / DE TEMPORADA",
        "Volver al origen",
        "Ingredientes de temporada y tiempo para disfrutar de una mesa compartida.",
      ],
    ].forEach((e) =>
      wire(
        card(items, [...e, "Consultar experiencia"], small),
        reserve,
        "OVERLAY",
      ),
    );
    const stays = section(body, "02 / Stay at the refuge", small, "#E9E9DF");
    targets.push(stays);
    sectionHead(
      stays,
      "02 / EL REFUGIO",
      "Un espacio para\nno hacer nada más.",
      "Luz suave, materiales naturales y una relación cercana con el bosque. El confort se entiende como una forma de sencillez.",
      small,
    );
    photo(stays, "Refuge landscape", inner, small ? 300 : 520, c.hash);
    const reserveAction = action(
      stays,
      "Consultar una estancia",
      Math.min(inner, 300),
    );
    wire(reserveAction, reserve, "OVERLAY");
    const ritual = section(body, "03 / A slower day", small);
    sectionHead(
      ritual,
      "03 / UN DÍA EN SENDA",
      "El tiempo,\na tu manera.",
      null,
      small,
    );
    [
      [
        "08:00",
        "Despertar con el bosque",
        "Un desayuno tranquilo y la primera luz entrando por la ventana.",
      ],
      [
        "11:00",
        "Salir sin prisa",
        "Un paseo, un libro o una pausa junto al agua.",
      ],
      [
        "18:00",
        "Volver a la mesa",
        "Compartir el final del día con sabores de temporada.",
      ],
    ].forEach(([hour, h, b]) => {
      rule(ritual, inner, c.border);
      const r = hug(
        box(ritual, h, inner, 100, null, small ? "VERTICAL" : "HORIZONTAL", 24),
      );
      mono(r, hour, small ? inner : 140, c.accent, 12);
      const copy = hug(
        box(
          r,
          "Ritual description",
          small ? inner : 1100,
          100,
          null,
          "VERTICAL",
          12,
        ),
      );
      title(copy, h, copy.width, small ? 29 : 42);
      para(copy, b, copy.width, 15);
    });
  } else {
    const product = section(body, "01 / Product workflow", small);
    targets.push(product);
    sectionHead(
      product,
      "01 / DEL PLAN A LA ENTREGA",
      "Menos contexto perdido.\nMás trabajo conectado.",
      "Una estructura común para que el equipo sepa qué hacer, quién participa y qué sigue después. Información de producto ficticia.",
      small,
    );
    const modules = grid(product, "Product capabilities", small);
    [
      [
        "PLANIFICAR",
        "Todo empieza con claridad",
        "Objetivos, responsables y fechas en un espacio que todo el equipo puede consultar.",
        "Ver el espacio",
      ],
      [
        "COLABORAR",
        "El contexto viaja con el trabajo",
        "Decisiones y archivos cerca de la tarea para evitar conversaciones fragmentadas.",
        "Explorar la demo",
      ],
      [
        "ENTREGAR",
        "Cada avance, visible",
        "Un resumen de prioridades y bloqueos para decidir el siguiente paso.",
        "Abrir el tablero",
      ],
    ].forEach((e) => card(modules, e, small));
    const dashboard = box(
      page,
      "ORBIT / Product demo / " + (small ? "Mobile" : "Desktop"),
      w,
      small ? 844 : 900,
      c.bg,
    );
    dashboard.x = start + 4300 + (small ? 1480 : 0);
    dashboard.y = 200;
    dashboard.overflowDirection = "VERTICAL";
    dashboard.clipsContent = true;
    const dc = hug(
      box(dashboard, "Workspace scroll content", w, 100, c.bg, "VERTICAL", 0),
    );
    const ds = section(dc, "Workspace demo", small);
    const back = action(ds, "Volver a ORBIT", Math.min(inner, 250), true);
    wire(back, root, "NAVIGATE");
    sectionHead(
      ds,
      "ESPACIO DE MUESTRA",
      "Resumen del equipo.",
      "Una vista conceptual del trabajo, sus prioridades y el siguiente paso.",
      small,
    );
    const source = previous[device].findAll(
      (n) =>
        n.type === "FRAME" &&
        n.name === "Corporate product / Editable interface",
    )[0];
    const app = remember(source.clone());
    ds.appendChild(app);
    app.x = app.y = 0;
    const next = section(dc, "Project board", small);
    sectionHead(
      next,
      "PRÓXIMOS PASOS",
      "El trabajo, en contexto.",
      null,
      small,
    );
    [
      ["Norte / Identidad visual", "Ana · Revisión de dirección · Hoy"],
      ["Colección Otoño / Web", "Equipo web · Preparar entrega · Mañana"],
      ["Sistema de componentes", "Diseño · Documentar estados · Esta semana"],
    ].forEach(([h, b]) => {
      rule(next, inner, c.border);
      title(next, h, inner, small ? 21 : 29);
      para(next, b, inner, 14);
    });
    additional.push(dashboard.id);
    product
      .findAll((n) => n.type === "INSTANCE")
      .forEach((n) => wire(n, dashboard, "NAVIGATE"));
    const integrations = section(
      body,
      "02 / Connected tools",
      small,
      "#E7EEFC",
    );
    sectionHead(
      integrations,
      "02 / TU HERRAMIENTAS, CONECTADAS",
      "Un lugar común\npara seguir avanzando.",
      "Concepto de integración con las herramientas que ya forman parte del trabajo del equipo.",
      small,
    );
    const toolGrid = grid(integrations, "Integration examples", small, 3);
    ["Figma / Diseño", "Drive / Archivos", "Calendar / Agenda"].forEach(
      (label) => {
        const item = bordered(
          box(
            toolGrid,
            label,
            small ? 342 : (1312 - 48) / 3,
            80,
            "#FFFFFF",
            "HORIZONTAL",
            20,
            24,
          ),
        );
        item.counterAxisAlignItems = "CENTER";
        circle(item, 14, c.accent);
        text(item, label, 17, item.width - 90, c.ink, "Inter", "Semi Bold");
      },
    );
    const pricing = section(body, "03 / Product plans", small);
    targets.push(pricing);
    sectionHead(
      pricing,
      "03 / UN ESPACIO A TU MEDIDA",
      "Empieza pequeño.\nCrece con tu equipo.",
      "Planes y precios conceptuales para mostrar la arquitectura de la información; no representan un servicio comercial.",
      small,
    );
    const plans = grid(pricing, "Pricing comparison", small);
    [
      [
        "PERSONAL / $0",
        "Para tus proyectos",
        "1 espacio de trabajo · Vistas esenciales · Hasta 3 colaboradores",
        "Probar la demo",
      ],
      [
        "EQUIPO / $12",
        "Para crear juntos",
        "Espacios compartidos · Permisos del equipo · Historial de actividad",
        "Explorar Equipo",
      ],
      [
        "ESTUDIO / A MEDIDA",
        "Para coordinar más",
        "Configuración de espacios · Gestión de acceso · Soporte dedicado",
        "Ver el producto",
      ],
    ].forEach((e) => wire(card(plans, e, small), dashboard, "NAVIGATE"));
  }
  const faq = section(body, "04 / Questions and answers", small);
  sectionHead(
    faq,
    "04 / ANTES DE EMPEZAR",
    [
      "Las preguntas que abren un proyecto.",
      "Un café, sin dudas.",
      "Para disfrutar de la pausa.",
      "Las respuestas, a mano.",
    ][LONG_INDEX],
    null,
    small,
  );
  const questions = [
    [
      [
        "¿Cómo empieza un proyecto?",
        "Con una conversación sobre el lugar, el programa y la forma de vivir. A partir de ahí se define el alcance y el recorrido de diseño.",
      ],
      [
        "¿Qué incluye el proceso?",
        "Concepto, desarrollo espacial y detalle. Cada fase se revisa con una intención clara antes de avanzar.",
      ],
    ],
    [
      [
        "¿Cómo elijo mi primer café?",
        "Empieza por Blend diario si buscas una taza equilibrada. Origen de altura propone un perfil más frutal y Pausa sin prisa, una opción suave.",
      ],
      [
        "¿Puedo elegir la molienda?",
        "En una tienda real, la selección de molienda se mostraría junto al producto. Este prototipo ilustra la elección de café y la bolsa.",
      ],
    ],
    [
      [
        "¿Hace falta seguir un programa?",
        "No. Las experiencias se proponen como posibilidades y puedes recorrer la estancia a tu propio ritmo.",
      ],
      [
        "¿Cómo consulto una estancia?",
        "El botón Reservar abre una vista conceptual de la consulta. La disponibilidad y el envío real quedan fuera de esta demo.",
      ],
    ],
    [
      [
        "¿Puedo empezar con un equipo pequeño?",
        "Sí. La propuesta organiza los planes según la escala del equipo y mantiene visible lo que incluye cada nivel.",
      ],
      [
        "¿La demo contiene información real?",
        "No. Los proyectos, las personas y los datos mostrados forman parte de un ejemplo ficticio de producto.",
      ],
    ],
  ][LONG_INDEX];
  questions.forEach(([q, a]) => {
    rule(faq, inner, c.border);
    title(faq, q, inner, small ? 23 : 30);
    para(faq, a, small ? inner : 960, small ? 13 : 15);
  });
  const contact = section(
    body,
    "05 / Closing and navigation",
    small,
    LONG_INDEX === 1 ? "#FFD256" : c.ink,
  );
  targets.push(contact);
  mono(
    contact,
    c.brand + " / SIGUIENTE PASO",
    inner,
    LONG_INDEX === 1 ? c.ink : c.bg,
    10,
  );
  title(
    contact,
    [
      "Hablemos de lo que\nquieres habitar.",
      "Tu próxima buena\nmañana empieza aquí.",
      "Un lugar para\nvolver a ti.",
      "Dale claridad al\ntrabajo de tu equipo.",
    ][LONG_INDEX],
    inner,
    small ? 43 : 76,
    LONG_INDEX === 1 ? c.ink : c.bg,
  );
  const end = action(
    contact,
    [
      "Ver el proyecto",
      "Elegir mi café",
      "Consultar estancia",
      "Abrir la demo",
    ][LONG_INDEX],
    Math.min(inner, 300),
  );
  wire(
    end,
    LONG_INDEX === 1 ? targets[0] : await figma.getNodeByIdAsync(additional[0]),
    LONG_INDEX === 1 ? "SCROLL_TO" : LONG_INDEX === 2 ? "OVERLAY" : "NAVIGATE",
  );
  para(
    contact,
    "Proyecto ficticio de portfolio · Diseño y prototipo responsive",
    inner,
    11,
    LONG_INDEX === 1 ? c.ink : "#CAD0CA",
  );
  const header = row(
    root,
    "Fixed navigation / " + (small ? "Mobile" : "Desktop"),
    w,
    small ? 68 : 82,
    [0, small ? 24 : 64],
    c.bg,
  );
  absolute(header, 0, 0);
  title(
    header,
    LONG_INDEX === 1
      ? "bruma."
      : LONG_INDEX === 2
        ? "senda"
        : LONG_INDEX === 3
          ? "orbit"
          : "ATLAS",
    small ? 130 : 280,
    small ? 29 : 34,
  );
  const nav = row(header, "Prototype navigation", small ? 170 : 640, 44);
  const labels = small ? ["Explorar ↓"] : c.nav;
  labels.forEach((label, i) => {
    const link = text(
      nav,
      label,
      small ? 11 : 12,
      small ? 150 : 180,
      c.ink,
      "Manrope",
      "SemiBold",
    );
    const isSpecial = !small && i === 2 && LONG_INDEX > 0;
    const targetId = isSpecial
      ? additional[0]
      : targets[Math.min(i, targets.length - 1)].id;
    reactions.push({
      node: link,
      value: [
        {
          trigger: { type: "ON_CLICK" },
          actions: [
            {
              type: "NODE",
              destinationId: targetId,
              navigation: isSpecial
                ? LONG_INDEX === 3
                  ? "NAVIGATE"
                  : "OVERLAY"
                : "SCROLL_TO",
              transition: isSpecial
                ? null
                : {
                    type: "SCROLL_ANIMATE",
                    easing: { type: "EASE_OUT" },
                    duration: 0.45,
                  },
            },
          ],
        },
      ],
    });
  });
  root.numberOfFixedChildren = 1;
  const heroLinks = body.children
    .slice(0, 8)
    .flatMap((n) =>
      "findAll" in n
        ? n.findAll(
            (n) =>
              n.type === "FRAME" &&
              /Studio project link|Mobile project link|Action \/ Encuentra tu café/.test(
                n.name,
              ),
          )
        : [],
    );
  heroLinks.forEach((n) => wire(n, targets[0]));
  const overview = remember(body.clone());
  page.appendChild(overview);
  overview.name =
    c.brand + " / Complete page / " + (small ? "Mobile" : "Desktop");
  overview.x = start + (small ? 1480 : 0);
  overview.y = 1400;
  overview.x = overview.x;
  overview.clipsContent = true;
  bindTree(root);
  bindTree(overview);
  screens.push({
    rootId: root.id,
    contentId: body.id,
    overviewId: overview.id,
    width: w,
    height: overview.height,
    sectionIds: targets.map((n) => n.id),
    additionalIds: additional,
  });
}
for (const reaction of reactions)
  await reaction.node.setReactionsAsync(reaction.value);
page.flowStartingPoints = [
  { nodeId: screens[0].rootId, name: c.brand + " / Desktop scroll" },
  { nodeId: screens[1].rootId, name: c.brand + " / Mobile scroll" },
];
return {
  brand: c.brand,
  createdNodeIds: [...new Set(ids)],
  collectionId: collection.id,
  variableIds,
  styleIds,
  componentIds,
  screens,
  interactionCount: reactions.length,
  sectionIds,
  previousRootIds: [c.root, c.mobile],
  mutatedNodeIds: [page.id],
};
