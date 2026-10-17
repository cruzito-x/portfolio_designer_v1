// Figma Plugin API source. Prefix with CONCEPT_INDEX (0..3).
// Set TARGET_ROOT_IDS = [desktopId, mobileId] when composing an independent file.
const page = await figma.getNodeByIdAsync("0:1");
await figma.setCurrentPageAsync(page);
const fonts = [
  ["Manrope", "Regular"], ["Manrope", "SemiBold"], ["Manrope", "Bold"],
  ["Instrument Serif", "Regular"], ["Instrument Serif", "Italic"],
  ["DM Mono", "Regular"], ["Space Grotesk", "Regular"], ["Space Grotesk", "Bold"],
];
await Promise.all(fonts.map(([family, style]) => figma.loadFontAsync({ family, style })));
const ids = [];
const track = (node) => { ids.push(node.id); return node; };
const rgb = (hex) => ({ r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255 });
const fill = (hex) => [{ type: "SOLID", color: rgb(hex) }];
function box(parent, name, width, height, color = null, direction = "VERTICAL", gap = 0, padding = 0) {
  const node = track(figma.createAutoLayout(direction));
  node.name = name;
  node.resize(width, height);
  node.primaryAxisSizingMode = "FIXED";
  node.counterAxisSizingMode = "FIXED";
  node.itemSpacing = gap;
  const [vertical, horizontal] = Array.isArray(padding) ? padding : [padding, padding];
  node.paddingTop = node.paddingBottom = vertical;
  node.paddingLeft = node.paddingRight = horizontal;
  node.fills = color ? fill(color) : [];
  parent.appendChild(node);
  return node;
}
function text(parent, value, size, width, color, family = "Manrope", style = "Regular", line = 1.15) {
  const node = track(figma.createText());
  node.name = value.replaceAll("\n", " ").slice(0, 65);
  node.fontName = { family, style };
  node.fontSize = size;
  node.lineHeight = { unit: "PERCENT", value: line * 100 };
  node.letterSpacing = { unit: "PIXELS", value: size > 45 ? -size * .045 : 0 };
  node.fills = fill(color);
  node.characters = value;
  node.resize(width, Math.max(20, size * line));
  node.textAutoResize = "HEIGHT";
  parent.appendChild(node);
  node.layoutSizingVertical = "HUG";
  return node;
}
function icon(parent, color, star = false) {
  const path = star ? "M12 1v22M1 12h22M4 4l16 16M20 4 4 20" : "M5 19 19 5M5 5h14v14";
  const node = track(figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5"><path d="${path}"/></svg>`));
  node.name = star ? "Decorative asterisk" : "Arrow up right";
  node.resize(20, 20); parent.appendChild(node);
  node.findAll(() => true).forEach(child => ids.push(child.id));
  return node;
}
function row(parent, name, width, height, padding = 0, color = null) {
  const node = box(parent, name, width, height, color, "HORIZONTAL", 0, padding);
  node.primaryAxisAlignItems = "SPACE_BETWEEN";
  node.counterAxisAlignItems = "CENTER";
  return node;
}
function rule(parent, width, color) {
  return box(parent, "Divider", width, 1, color);
}
function button(parent, value, width, color, ink, radius = 0) {
  const node = row(parent, "Action / " + value, width, 52, [0, 22], color);
  node.cornerRadius = radius;
  text(node, value, 13, width - 75, ink, "Manrope", "SemiBold");
  icon(node, ink);
  return node;
}
function mono(parent, value, width, color, size = 11) {
  return text(parent, value, size, width, color, "DM Mono", "Regular", 1.5);
}
function circle(parent, size, color) {
  const node = track(figma.createEllipse());
  node.resize(size, size); node.fills = fill(color); parent.appendChild(node); return node;
}
function absolute(node, x, y) { node.layoutPositioning = "ABSOLUTE"; node.x = x; node.y = y; }
function photo(parent, name, width, height, imageHash) {
  const node = box(parent, name, width, height);
  node.fills = [{ type: "IMAGE", imageHash, scaleMode: "FILL" }];
  node.clipsContent = true;
  return node;
}
function overlay(parent, width, height, opacity) {
  const node = box(parent, "Photography contrast overlay", width, height, "#101715");
  node.opacity = opacity; absolute(node, 0, 0); return node;
}
const palettes = [
  { paper: "#F0EDE6", ink: "#272A26", muted: "#77796E", accent: "#B8BB99", brand: "ATLAS", nav: "Estudio          Proyectos          Filosofía" },
  { paper: "#F5EBDD", ink: "#4B1E29", muted: "#957665", accent: "#A44A35", brand: "bruma.", nav: "Nuestro café          El origen          Nosotros" },
  { paper: "#EEF0E6", ink: "#2E493E", muted: "#748475", accent: "#CAD9C5", brand: "senda", nav: "El refugio          Experiencias          Nuestra esencia" },
  { paper: "#11131D", ink: "#F5F4FB", muted: "#A5A4B8", accent: "#B7A8F9", brand: "orbit", nav: "Producto          Recursos          Planes" },
];
const palette = palettes[CONCEPT_INDEX];
const rootIds = typeof TARGET_ROOT_IDS !== "undefined"
  ? TARGET_ROOT_IDS
  : [["5:2", "5:3"], ["5:4", "5:5"], ["5:6", "5:7"], ["5:8", "5:9"]][CONCEPT_INDEX];
const desktop = await figma.getNodeByIdAsync(rootIds[0]);
const mobile = await figma.getNodeByIdAsync(rootIds[1]);
if (desktop.children.length || mobile.children.length) throw new Error("Existing concept content: inspect before editing.");
desktop.fills = mobile.fills = fill(palette.paper);

function header(root, isMobile) {
  const width = isMobile ? 390 : 1440;
  const node = row(root, "Navigation", width, isMobile ? 68 : 84, [0, isMobile ? 24 : 64], palette.paper);
  text(node, palette.brand, CONCEPT_INDEX === 0 ? 24 : 37, isMobile ? 185 : 245, palette.ink,
    CONCEPT_INDEX === 1 || CONCEPT_INDEX === 2 ? "Instrument Serif" : "Space Grotesk",
    CONCEPT_INDEX === 0 || CONCEPT_INDEX === 3 ? "Bold" : "Regular");
  if (isMobile) {
    mono(node, "MENÚ  +", 70, palette.ink, 10);
  } else {
    text(node, palette.nav, 13, 530, palette.ink);
    const cta = ["Hablemos", "Explora el café", "Encuentra tu pausa", "Empieza gratis"][CONCEPT_INDEX];
    button(node, cta, 205, CONCEPT_INDEX === 3 ? palette.accent : palette.ink, CONCEPT_INDEX === 3 ? palette.paper : palette.paper, CONCEPT_INDEX === 2 ? 30 : 2);
  }
  return node;
}

function atlas() {
  const imageHash = "13064f5ed14501a8743353296a9f58b9b9229a38";
  header(desktop, false);
  const hero = photo(desktop, "Hero / Casa del aire", 1440, 650, imageHash);
  hero.paddingLeft = hero.paddingRight = 64;
  hero.paddingTop = hero.paddingBottom = 45;
  hero.primaryAxisAlignItems = "SPACE_BETWEEN";
  overlay(hero, 1440, 650, .21);
  const eyebrow = row(hero, "Architecture discipline", 1312, 30);
  mono(eyebrow, "ARQUITECTURA CONSCIENTE / ESTUDIO INDEPENDIENTE", 750, "#FFFFFF");
  mono(eyebrow, "EL ESPACIO ES EL PRINCIPIO", 280, "#FFFFFF", 10);
  const copy = box(hero, "Editorial heading", 1120, 300, null, "VERTICAL", 25);
  text(copy, "Espacios que\nse sienten.", 116, 1080, "#FFFFFF", "Manrope", "Regular", 1.02);
  const lower = row(hero, "Featured architecture project", 1312, 68);
  const caption = box(lower, "Project caption", 710, 60, null, "VERTICAL", 7);
  mono(caption, "01 / CASA DEL AIRE", 500, "#FFFFFF", 12);
  text(caption, "Lo esencial no siempre se ve. A veces se habita.", 16, 620, "#FFFFFF");
  button(lower, "Explorar el proyecto", 240, "#F0EDE6", "#272A26");
  const closing = row(desktop, "Studio manifesto", 1440, 266, [42, 64], palette.paper);
  text(closing, "La forma sigue\na la vida.", 55, 520, palette.ink, "Instrument Serif");
  const info = box(closing, "Manifesto detail", 580, 140, null, "VERTICAL", 22);
  text(info, "Diseñamos lugares que dialogan con su entorno. Luz, materia y proporción al servicio de una manera más humana de habitar.", 18, 550, palette.ink, "Manrope", "Regular", 1.65);
  mono(info, "ESTUDIO CONCEPTUAL · DISEÑO WEB POR DAVID CRUZ", 570, palette.muted, 10);

  header(mobile, true);
  const mh = photo(mobile, "Mobile / Architecture hero", 390, 560, imageHash);
  overlay(mh, 390, 560, .25);
  mh.paddingLeft = mh.paddingRight = 24; mh.paddingTop = mh.paddingBottom = 30; mh.primaryAxisAlignItems = "SPACE_BETWEEN";
  mono(mh, "ARQUITECTURA CONSCIENTE", 330, "#FFFFFF", 9);
  const mc = box(mh, "Mobile editorial title", 342, 275, null, "VERTICAL", 22);
  text(mc, "Espacios\nque se\nsienten.", 65, 342, "#FFFFFF", "Manrope", "Regular", 1.03);
  mono(mc, "01 / CASA DEL AIRE", 330, "#FFFFFF", 10);
  button(mh, "Explorar el proyecto", 260, palette.paper, palette.ink);
  const end = box(mobile, "Mobile / Manifesto", 390, 216, palette.paper, "VERTICAL", 18, 24);
  text(end, "La forma sigue a la vida.", 36, 342, palette.ink, "Instrument Serif");
  text(end, "Luz, materia y proporción para una manera más humana de habitar.", 13, 342, palette.muted, "Manrope", "Regular", 1.6);
  mono(end, "CONCEPTO FICTICIO / DAVID CRUZ", 340, palette.muted, 8);
}

function bruma() {
  const imageHash = "a8d25860315f8faab885d634129b77d2ac3e2631";
  header(desktop, false);
  const hero = row(desktop, "Coffee editorial composition", 1440, 690, [38, 64]);
  const copy = box(hero, "Coffee / Brand story", 540, 608, null, "VERTICAL", 24, [5, 0]);
  mono(copy, "DE LA TIERRA A TU PRIMERA TAZA", 520, palette.accent, 11);
  text(copy, "Un buen café.\nUn mejor\ncomienzo.", 100, 540, palette.ink, "Instrument Serif", "Regular", .98);
  text(copy, "Café de especialidad con raíces cercanas.\nTostado con calma, para disfrutar sin prisa.", 16, 500, palette.muted, "Manrope", "Regular", 1.65);
  button(copy, "Encuentra tu café", 240, palette.ink, palette.paper, 28);
  mono(copy, "CAFÉ REAL. MOMENTOS SIMPLES.", 500, palette.accent, 10);
  const image = photo(hero, "Coffee still life / Editorial photography", 690, 608, imageHash);
  image.cornerRadius = 8;
  const strip = row(desktop, "Roastery values strip", 1440, 66, [0, 64], palette.ink);
  ["ORIGEN CONSCIENTE", "✳", "TOSTADO FRESCO", "✳", "CADA TAZA CUENTA"].forEach(value => value === "✳" ? icon(strip, palette.paper, true) : mono(strip, value, 280, palette.paper, 13));
  const end = row(desktop, "Roastery philosophy", 1440, 160, [24, 64]);
  text(end, "Lo bueno empieza cerca.", 42, 560, palette.ink, "Instrument Serif");
  const ec = box(end, "Coffee provenance", 560, 95, null, "VERTICAL", 16);
  text(ec, "Del origen al tueste, una historia que merece ser contada. Una identidad cálida para un ritual de todos los días.", 15, 550, palette.muted, "Manrope", "Regular", 1.6);
  mono(ec, "MARCA FICTICIA / CONCEPTO DE E-COMMERCE", 550, palette.accent, 9);

  header(mobile, true);
  const mc = box(mobile, "Mobile / Coffee story", 390, 300, palette.paper, "VERTICAL", 18, 24);
  mono(mc, "DE LA TIERRA A TU TAZA", 342, palette.accent, 9);
  text(mc, "Un buen café.\nUn mejor comienzo.", 55, 342, palette.ink, "Instrument Serif", "Regular", 1);
  text(mc, "Tostado con calma, para disfrutar sin prisa.", 13, 342, palette.muted);
  button(mc, "Encuentra tu café", 240, palette.ink, palette.paper, 28);
  photo(mobile, "Mobile / Coffee photography", 390, 340, imageHash);
  const me = box(mobile, "Mobile / Brand close", 390, 136, palette.ink, "VERTICAL", 14, 24);
  text(me, "Lo bueno empieza cerca.", 31, 342, palette.paper, "Instrument Serif");
  mono(me, "CONCEPTO FICTICIO / DAVID CRUZ", 342, palette.paper, 8);
}

function senda() {
  const imageHash = "d337a9c8a81636d4545f1f324f6596a7a71d6a56";
  header(desktop, false);
  const hero = photo(desktop, "Wellness / Immersive landscape", 1440, 610, imageHash);
  overlay(hero, 1440, 610, .19);
  hero.paddingTop = 58; hero.paddingBottom = 30; hero.paddingLeft = hero.paddingRight = 64;
  hero.primaryAxisAlignItems = "SPACE_BETWEEN"; hero.counterAxisAlignItems = "CENTER";
  const copy = box(hero, "Wellness / Central headline", 1200, 365, null, "VERTICAL", 20);
  copy.counterAxisAlignItems = "CENTER";
  const ey = mono(copy, "UN REFUGIO PARA VOLVER A LO ESENCIAL", 900, "#FFFFFF", 11); ey.textAlignHorizontal = "CENTER";
  const title = text(copy, "Baja el ruido.\nVuelve a ti.", 124, 1100, "#FFFFFF", "Instrument Serif", "Regular", .98); title.textAlignHorizontal = "CENTER";
  const subtitle = text(copy, "Naturaleza, calma y tiempo para escucharte.", 17, 900, "#FFFFFF"); subtitle.textAlignHorizontal = "CENTER";
  const booking = row(hero, "Experience discovery strip", 1180, 90, [0, 28], palette.paper); booking.cornerRadius = 5;
  [["EL LUGAR", "Bosque y montaña"], ["LA EXPERIENCIA", "Una pausa consciente"], ["EL RITMO", "El tuyo"]].forEach(([label, value]) => { const field = box(booking, label, 230, 48, null, "VERTICAL", 8); mono(field, label, 225, palette.muted, 9); text(field, value, 15, 225, palette.ink); });
  button(booking, "Descubre Senda", 260, palette.ink, palette.paper, 28);
  const closing = row(desktop, "Wellness / Three pillars", 1440, 306, [45, 64]);
  text(closing, "Cuidarte también\nes hacer una pausa.", 58, 550, palette.ink, "Instrument Serif");
  const pillars = box(closing, "Ritual pillars", 620, 215, null, "VERTICAL", 20);
  [["01", "Respirar", "Hacer espacio para lo que importa."], ["02", "Reconectar", "Habitar el momento, sin distracciones."], ["03", "Pausar", "Regresar con otra perspectiva."]].forEach(([index, title, desc]) => { const line = row(pillars, title, 620, 46); mono(line, index, 40, palette.muted); text(line, title, 22, 155, palette.ink, "Instrument Serif"); text(line, desc, 12, 350, palette.muted); });
  mono(pillars, "REFUGIO FICTICIO / CONCEPTO DE HOSPITALIDAD", 610, palette.muted, 8);

  header(mobile, true);
  const mh = photo(mobile, "Mobile / Retreat hero", 390, 560, imageHash); overlay(mh, 390, 560, .24);
  mh.paddingLeft = mh.paddingRight = 24; mh.paddingTop = mh.paddingBottom = 30; mh.primaryAxisAlignItems = "SPACE_BETWEEN";
  mono(mh, "VOLVER A LO ESENCIAL", 342, "#FFFFFF", 9);
  text(mh, "Baja el\nruido.\nVuelve a ti.", 74, 342, "#FFFFFF", "Instrument Serif", "Regular", .98);
  button(mh, "Encuentra tu pausa", 285, palette.paper, palette.ink, 28);
  const end = box(mobile, "Mobile / Retreat close", 390, 216, palette.paper, "VERTICAL", 18, 24);
  text(end, "Naturaleza.\nCalma. Tú.", 45, 342, palette.ink, "Instrument Serif", "Regular", 1);
  text(end, "Tiempo para escucharte y espacio para respirar.", 13, 342, palette.muted);
  mono(end, "CONCEPTO FICTICIO / DAVID CRUZ", 342, palette.muted, 8);
}

function dashboard(parent, width, height, small = false) {
  const app = box(parent, "Orbit / Editable product interface", width, height, "#FBFAFF", "HORIZONTAL"); app.cornerRadius = 13; app.clipsContent = true;
  const sideWidth = small ? 0 : 135;
  if (!small) {
    const side = box(app, "App sidebar", sideWidth, height, "#EEECF6", "VERTICAL", 24, [24, 15]);
    text(side, "orbit", 24, 105, "#343044", "Space Grotesk", "Bold");
    ["◉ Resumen", "▦ Proyectos", "◷ Mi agenda", "◎ Mi equipo", "＋ Invitar"].forEach((label, i) => text(side, label, 10, 105, i === 0 ? "#7461CC" : "#827C95"));
    const spacer = box(side, "Sidebar breathing room", 105, 145);
    mono(side, "ESPACIO CREATIVO", 105, "#827C95", 7);
  }
  const contentWidth = width - sideWidth;
  const content = box(app, "App main content", contentWidth, height, "#FBFAFF", "VERTICAL", small ? 11 : 21, small ? 16 : 24);
  const inner = contentWidth - (small ? 32 : 48);
  const head = row(content, "Dashboard header", inner, 42);
  const hc = box(head, "Dashboard greeting", inner - 60, 42, null, "VERTICAL", 5);
  text(hc, "Buen día, Sofía", small ? 17 : 19, inner - 65, "#383347", "Space Grotesk", "Bold");
  text(hc, "Aquí empieza tu próximo gran proyecto.", 9, inner - 65, "#9B94AA");
  circle(head, 30, "#DDD4FF");
  const metrics = row(content, "Dashboard metrics", inner, small ? 60 : 76);
  [["Proyectos", "12", "#EDE6FF"], ["En curso", "08", "#E3F2ED"], ["Completados", "24", "#F8EBDC"]].forEach(([label, number, color]) => { const card = box(metrics, label, (inner - 16) / 3, small ? 60 : 76, color, "VERTICAL", 6, small ? 9 : 12); card.cornerRadius = 7; text(card, label, small ? 7 : 9, card.width - 22, "#7E768E"); text(card, number, small ? 19 : 23, card.width - 22, "#4C3F68", "Space Grotesk", "Bold"); });
  const chart = box(content, "Weekly activity chart", inner, small ? 116 : 152, "#FFFFFF", "VERTICAL", 9, 14); chart.cornerRadius = 8;
  text(chart, "Tu energía creativa esta semana", 10, inner - 28, "#635B75", "Manrope", "SemiBold");
  const bars = row(chart, "Activity columns", inner - 28, small ? 62 : 96); bars.counterAxisAlignItems = "MAX";
  [42, 63, 51, 87, 74, 45, 32].forEach((number, index) => { const column = box(bars, "Day " + (index + 1), (inner - 65) / 7, small ? number * .6 : number, index === 3 ? "#AA94F0" : "#E4DCF9"); column.cornerRadius = 4; });
  const list = box(content, "Upcoming work", inner, small ? 66 : 110, null, "VERTICAL", small ? 6 : 12);
  text(list, "En tu órbita", 12, inner, "#514765", "Space Grotesk", "Bold");
  ["Identidad visual — Estudio Norte", "Diseño web — Colección Otoño", "Revisión creativa con el equipo"].slice(0, small ? 2 : 3).forEach((value, index) => { const item = row(list, value, inner, 18); circle(item, 6, ["#AA94F0", "#82B7A1", "#E1B78C"][index]); text(item, value, small ? 8 : 9, inner - 35, "#8B829C"); });
  return app;
}

function orbit() {
  header(desktop, false);
  const hero = row(desktop, "Product / Hero composition", 1440, 660, [45, 64]);
  const copy = box(hero, "Product / Marketing story", 548, 540, null, "VERTICAL", 25, [18, 0]);
  mono(copy, "TU EQUIPO CREATIVO, EN LA MISMA ÓRBITA", 545, palette.accent, 10);
  text(copy, "Menos caos.", 85, 548, palette.ink, "Space Grotesk", "Bold", 1);
  text(copy, "Más foco.", 91, 548, palette.accent, "Space Grotesk", "Bold", 1);
  text(copy, "Ideas, proyectos y personas. Todo conectado en un espacio diseñado para que tu mejor trabajo suceda.", 17, 480, palette.muted, "Manrope", "Regular", 1.7);
  const ctas = row(copy, "Product actions", 475, 52);
  button(ctas, "Empieza gratis", 224, palette.accent, palette.paper, 7);
  const secondary = button(ctas, "Explorar producto", 225, palette.paper, palette.ink, 7); secondary.strokes = fill("#3B3A4E"); secondary.strokeWeight = 1;
  mono(copy, "MÁS CLARIDAD. MÁS ESPACIO PARA CREAR.", 530, palette.muted, 9);
  dashboard(hero, 690, 512);
  const features = box(desktop, "Product / Features", 1440, 256, palette.paper, "VERTICAL", 24, [22, 64]);
  rule(features, 1312, "#2B2D3D");
  const columns = row(features, "Three product benefits", 1312, 144);
  [["01", "Todo en un lugar.", "Proyectos, conversaciones y archivos.\nUn espacio para conectar las piezas."], ["02", "A tu ritmo.", "Visualiza tus prioridades y encuentra\nun flujo que funcione para tu equipo."], ["03", "El trabajo se mueve.", "De la primera idea a la entrega final,\ncon claridad en cada paso."]].forEach(([index, title, desc]) => { const card = box(columns, title, 390, 136, null, "VERTICAL", 15); mono(card, index, 360, palette.accent, 9); text(card, title, 25, 380, palette.ink, "Space Grotesk", "Regular"); text(card, desc, 12, 380, palette.muted, "Manrope", "Regular", 1.6); });
  mono(features, "PRODUCTO FICTICIO / CONCEPTO SAAS POR DAVID CRUZ", 1310, palette.muted, 8);

  header(mobile, true);
  const lead = box(mobile, "Mobile / Product story", 390, 330, palette.paper, "VERTICAL", 19, 24);
  mono(lead, "EL ESPACIO DE TU EQUIPO CREATIVO", 342, palette.accent, 8);
  text(lead, "Menos caos.\nMás foco.", 58, 342, palette.ink, "Space Grotesk", "Bold", 1.02);
  text(lead, "Ideas, proyectos y personas.\nEn la misma órbita.", 14, 342, palette.muted, "Manrope", "Regular", 1.5);
  button(lead, "Empieza gratis", 235, palette.accent, palette.paper, 6);
  const stage = box(mobile, "Mobile / Product preview", 390, 360, palette.paper, "VERTICAL", 0, [0, 24]);
  dashboard(stage, 342, 350, true);
  const end = box(mobile, "Mobile / Concept credit", 390, 86, palette.paper, "VERTICAL", 13, 24);
  mono(end, "MÁS ESPACIO PARA CREAR.", 342, palette.accent, 10);
  mono(end, "CONCEPTO FICTICIO / DAVID CRUZ", 342, palette.muted, 8);
}

[atlas, bruma, senda, orbit][CONCEPT_INDEX]();
return {
  concept: palette.brand,
  createdNodeIds: ids,
  mutatedNodeIds: [desktop.id, mobile.id],
  desktop: { id: desktop.id, width: desktop.width, height: desktop.height, children: desktop.children.length },
  mobile: { id: mobile.id, width: mobile.width, height: mobile.height, children: mobile.children.length },
};
