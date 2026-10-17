// Run after the shared helpers from compose-concepts.js, with STYLE_INDEX = 0..3.
await Promise.all([
  ["Cormorant Garamond", "Regular"], ["Cormorant Garamond", "Italic"],
  ["Inter", "Regular"], ["Inter", "Medium"], ["Inter", "Semi Bold"], ["Inter", "Bold"],
].map(([family, style]) => figma.loadFontAsync({ family, style })));

const brands = ["ATLAS", "BRUMA", "SENDA", "ORBIT"];
const directions = ["Editorial suizo", "Neobrutalismo cálido", "Lujo orgánico", "Producto corporativo"];
const brand = brands[STYLE_INDEX];
const draftName = brand + " / " + directions[STYLE_INDEX];
if (page.children.some(node => node.name === draftName + " / Desktop")) throw new Error("A draft already exists; inspect before retrying.");
const previousDesktop = await figma.getNodeByIdAsync("1:2");
const previousMobile = await figma.getNodeByIdAsync("1:3");
const startX = Math.max(...page.children.map(node => node.x + node.width)) + 240;
const desktop = box(page, draftName + " / Desktop", 1440, 1000);
desktop.x = startX; desktop.y = 200; desktop.clipsContent = true;
const mobile = box(page, draftName + " / Mobile", 390, 844);
mobile.x = startX + 1480; mobile.y = 200; mobile.clipsContent = true;

function outline(node, color, weight = 1) { node.strokes = fill(color); node.strokeWeight = weight; return node; }
function centerText(parent, value, size, width, color, family, style = "Regular", line = 1.1) {
  const node = text(parent, value, size, width, color, family, style, line);
  node.textAlignHorizontal = "CENTER";
  return node;
}
function blockShadow(node, offset, color) {
  node.effects = [{ type: "DROP_SHADOW", color: { ...rgb(color), a: 1 }, offset: { x: offset, y: offset }, radius: 0, spread: 0, visible: true, blendMode: "NORMAL" }];
}
function smallAction(parent, value, width, height, background, ink, radius = 0, family = "Manrope") {
  const node = row(parent, "Action / " + value, width, height, [0, 18], background);
  node.cornerRadius = radius;
  text(node, value, 12, width - 68, ink, family, family === "Inter" ? "Semi Bold" : "SemiBold");
  icon(node, ink);
  return node;
}
function stamp(parent, width, height, background, ink, first, second) {
  const node = box(parent, "Brand stamp", width, height, background, "VERTICAL", 7, 12);
  node.cornerRadius = 999; node.primaryAxisAlignItems = "CENTER"; node.counterAxisAlignItems = "CENTER";
  centerText(node, first, 10, width - 24, ink, "DM Mono");
  centerText(node, second, 17, width - 24, ink, "Space Grotesk", "Bold");
  return node;
}

function atlasSwiss() {
  const paper = "#F2F3EF", ink = "#1C211F", muted = "#727973", accent = "#CE4D37";
  const hash = "13064f5ed14501a8743353296a9f58b9b9229a38";
  desktop.fills = mobile.fills = fill(paper);
  const nav = row(desktop, "Swiss navigation", 1440, 82, [0, 64], paper);
  text(nav, "ATLAS", 32, 230, ink, "Space Grotesk", "Bold");
  mono(nav, "ESTUDIO       PROYECTOS       ENFOQUE", 560, ink, 11);
  const navLink = row(nav, "Contact link", 165, 40); mono(navLink, "HABLEMOS", 120, ink, 10); icon(navLink, accent);
  box(desktop, "Structural rule", 1440, 2, ink);
  const hero = row(desktop, "Asymmetric editorial grid", 1440, 682, [40, 64], paper);
  const copy = box(hero, "Swiss typography column", 430, 602, null, "VERTICAL"); copy.primaryAxisAlignItems = "SPACE_BETWEEN";
  mono(copy, "ARQUITECTURA / ESTUDIO INDEPENDIENTE", 430, muted, 10);
  text(copy, "ESPACIOS\nCON\nCRITERIO.", 79, 430, ink, "Manrope", "Regular", .96);
  text(copy, "Luz, materia y proporción.\nArquitectura que empieza por lo esencial.", 14, 390, muted, "Manrope", "Regular", 1.6);
  const link = row(copy, "Studio project link", 360, 50); mono(link, "VER PROYECTOS", 290, ink, 11); icon(link, accent);
  const image = photo(hero, "Architectural project / Precise image grid", 816, 602, hash);
  const caption = row(image, "Architecture metadata", 816, 62, [0, 23], paper); absolute(caption, 0, 540);
  mono(caption, "01", 42, accent, 13); text(caption, "Casa del aire", 20, 440, ink, "Space Grotesk"); mono(caption, "RESIDENCIAL / CONCEPTO", 240, muted, 9);
  const end = row(desktop, "Swiss project information grid", 1440, 234, [36, 64]);
  text(end, "La precisión\ntambién se siente.", 38, 470, ink, "Space Grotesk", "Regular", 1.15);
  const info = box(end, "Material and context", 740, 158, null, "VERTICAL", 14);
  rule(info, 740, ink);
  [["TIPOLOGÍA", "Residencial"], ["MATERIA", "Piedra, vidrio y luz"], ["CONTEXTO", "Un diálogo con la costa"]].forEach(([label, value]) => { const line = row(info, label, 740, 28); mono(line, label, 230, muted, 9); text(line, value, 15, 450, ink); });
  mono(info, "ATLAS / MARCA FICTICIA / DIRECCIÓN EDITORIAL SUIZA", 740, accent, 8);

  const mn = row(mobile, "Swiss mobile navigation", 390, 68, [0, 24]); text(mn, "ATLAS", 28, 220, ink, "Space Grotesk", "Bold"); mono(mn, "MENÚ +", 70, ink, 9);
  box(mobile, "Mobile structural rule", 390, 2, ink);
  const mc = box(mobile, "Swiss mobile typography", 390, 266, paper, "VERTICAL", 17, 24);
  mono(mc, "ARQUITECTURA / ESTUDIO INDEPENDIENTE", 342, muted, 8);
  text(mc, "ESPACIOS\nCON CRITERIO.", 53, 342, ink, "Manrope", "Regular", .98);
  text(mc, "Luz, materia y proporción.\nLo esencial, en cada proyecto.", 12, 342, muted, "Manrope", "Regular", 1.6);
  const mp = photo(mobile, "Swiss mobile architecture", 390, 330, hash);
  const cap = row(mp, "Mobile project caption", 390, 52, [0, 24], paper); absolute(cap, 0, 278); mono(cap, "01 / CASA DEL AIRE", 300, ink, 10); icon(cap, accent);
  const me = box(mobile, "Swiss mobile manifesto", 390, 178, paper, "VERTICAL", 12, 24);
  text(me, "La precisión también\nse siente.", 26, 342, ink, "Space Grotesk", "Regular", 1.05);
  const ml = row(me, "Mobile project link", 342, 38); mono(ml, "VER PROYECTOS", 280, ink, 10); icon(ml, accent);
  mono(me, "CONCEPTO FICTICIO / EDITORIAL SUIZO", 342, muted, 7);
}

function brumaBold() {
  const paper = "#FFF4D7", yellow = "#FFD256", ink = "#272219", red = "#B9392A", pink = "#F4A4B8";
  const hash = "a8d25860315f8faab885d634129b77d2ac3e2631";
  desktop.fills = mobile.fills = fill(paper);
  const nav = row(desktop, "Bold coffee navigation", 1440, 84, [0, 64], paper);
  text(nav, "bruma.", 44, 240, ink, "Space Grotesk", "Bold"); mono(nav, "NUESTRO CAFÉ      EL ORIGEN      EL CLUB", 580, ink, 11);
  outline(smallAction(nav, "Tu bolsa (0)", 190, 48, paper, ink), ink, 2);
  box(desktop, "Bold navigation rule", 1440, 2, ink);
  const hero = row(desktop, "Neobrutalist commerce hero", 1440, 668, [40, 64], yellow);
  const copy = box(hero, "Bold retail typography", 610, 588, null, "VERTICAL", 23, [4, 0]);
  mono(copy, "BUEN CAFÉ. CERO COMPLICACIONES.", 600, red, 11);
  text(copy, "CAFÉ\nSIN FILTRO.", 108, 610, ink, "Space Grotesk", "Bold", .97);
  text(copy, "Del origen a tu taza, con todo el carácter.\nTu ritual de siempre. Con otra actitud.", 17, 570, ink, "Manrope", "Regular", 1.6);
  const cta = smallAction(copy, "Encuentra tu café", 270, 58, red, paper); outline(cta, ink, 2); blockShadow(cta, 5, ink);
  const tags = row(copy, "Coffee flavour tags", 560, 42);
  ["ORIGEN CONSCIENTE", "TU RITUAL", "TOSTADO FRESCO"].forEach(label => { const tag = box(tags, label, 172, 33, paper, "VERTICAL", 0, [8, 10]); outline(tag, ink, 1.5); mono(tag, label, 150, ink, 8); });
  const wrapper = box(hero, "Coffee image and brand sticker", 610, 588);
  const image = photo(wrapper, "Coffee / Graphic product photograph", 590, 560, hash); image.cornerRadius = 8; outline(image, ink, 2); blockShadow(image, 8, ink);
  const badge = stamp(wrapper, 118, 118, pink, ink, "100%", "BUENA VIBRA"); outline(badge, ink, 2); absolute(badge, 475, -8); badge.rotation = -9;
  const strip = row(desktop, "Bold brand ticker", 1440, 70, [0, 64], ink);
  text(strip, "DE LA TIERRA A TU TAZA.", 24, 440, yellow, "Space Grotesk", "Bold"); icon(strip, yellow, true); text(strip, "BUEN CAFÉ, SIN VUELTAS.", 24, 480, yellow, "Space Grotesk", "Bold"); icon(strip, yellow, true);
  const end = row(desktop, "Coffee brand pillars", 1440, 176, [28, 64], paper);
  [["01", "ORIGEN CONSCIENTE", "Detrás de cada taza hay una historia."], ["02", "FRESCO, SIEMPRE", "Un ritual simple, lleno de carácter."], ["03", "TU PRIMERA PAUSA", "Lo bueno también puede ser cotidiano."]].forEach(([index, label, desc]) => { const card = box(end, label, 402, 120, paper, "VERTICAL", 12, 17); outline(card, ink, 2); const head = row(card, label + " heading", 368, 22); mono(head, index, 40, red, 10); text(head, label, 16, 300, ink, "Space Grotesk", "Bold"); text(card, desc, 12, 365, ink, "Manrope", "Regular", 1.5); });

  const mn = row(mobile, "Bold mobile coffee navigation", 390, 68, [0, 24], paper); text(mn, "bruma.", 34, 240, ink, "Space Grotesk", "Bold"); mono(mn, "BOLSA (0)", 80, ink, 9);
  box(mobile, "Mobile heavy rule", 390, 2, ink);
  const mc = box(mobile, "Mobile bold coffee story", 390, 340, yellow, "VERTICAL", 18, 24);
  mono(mc, "BUEN CAFÉ. CERO COMPLICACIONES.", 342, red, 8);
  text(mc, "CAFÉ\nSIN FILTRO.", 63, 342, ink, "Space Grotesk", "Bold", .97);
  text(mc, "Tu ritual de siempre. Con otra actitud.", 13, 342, ink);
  const ctaM = smallAction(mc, "Encuentra tu café", 270, 52, red, paper); outline(ctaM, ink, 2); blockShadow(ctaM, 4, ink);
  const mp = photo(mobile, "Mobile bold coffee photo", 390, 300, hash); outline(mp, ink, 2);
  const sticker = stamp(mp, 92, 92, pink, ink, "100%", "ACTITUD"); sticker.children[1].fontSize = 13; outline(sticker, ink, 2); absolute(sticker, 278, 18); sticker.rotation = -9;
  const band = row(mobile, "Mobile brand ticker", 390, 54, [0, 24], ink); text(band, "DE LA TIERRA A TU TAZA.", 18, 300, yellow, "Space Grotesk", "Bold"); icon(band, yellow, true);
  const me = box(mobile, "Mobile brand statement", 390, 80, paper, "VERTICAL", 0, [16, 24]); text(me, "Pequeños rituales.\nGrandes mañanas.", 21, 342, ink, "Space Grotesk", "Bold", 1.1);
}

function sendaLuxury() {
  const paper = "#F5F3EC", ink = "#314B42", muted = "#7A8277", gold = "#9F8256";
  const hash = "d337a9c8a81636d4545f1f324f6596a7a71d6a56";
  desktop.fills = mobile.fills = fill(paper);
  const nav = row(desktop, "Quiet luxury navigation", 1440, 92, [0, 64], paper);
  mono(nav, "EL REFUGIO       EXPERIENCIAS", 450, muted, 9);
  centerText(nav, "senda", 49, 260, ink, "Cormorant Garamond");
  const reserve = outline(smallAction(nav, "Reservar", 180, 44, paper, gold, 25), gold); reserve.name = "Discreet reservation action";
  const intro = box(desktop, "Luxury centered editorial opening", 1440, 334, paper, "VERTICAL", 12, [18, 64]); intro.counterAxisAlignItems = "CENTER"; intro.primaryAxisAlignItems = "CENTER";
  centerText(intro, "UN REFUGIO, A OTRO RITMO", 10, 1000, gold, "DM Mono");
  centerText(intro, "El lujo de", 100, 1200, ink, "Cormorant Garamond", "Regular", .94);
  centerText(intro, "bajar el ritmo.", 104, 1200, ink, "Cormorant Garamond", "Italic", .94);
  centerText(intro, "Naturaleza, silencio y tiempo para volver a lo esencial.", 14, 1100, muted, "Manrope", "Regular", 1.5);
  const stage = box(desktop, "Organic landscape stage", 1440, 414, paper, "VERTICAL", 0, [0, 64]);
  const image = photo(stage, "Arched landscape photograph", 1312, 390, hash); image.topLeftRadius = image.topRightRadius = 328; image.bottomLeftRadius = image.bottomRightRadius = 4;
  const caption = box(image, "Quiet landscape caption", 290, 52, paper, "VERTICAL", 0, [17, 24]); caption.cornerRadius = 28; absolute(caption, 48, 304); mono(caption, "NATURALEZA, SIN PRISA.", 245, ink, 9);
  const end = row(desktop, "Luxury experience details", 1440, 160, [28, 64], paper);
  [["La estancia", "Bosque, agua y silencio."], ["El tiempo", "El que necesites."], ["La experiencia", "Volver a lo esencial."]].forEach(([title, desc]) => { const block = box(end, title, 390, 100, null, "VERTICAL", 15); rule(block, 390, "#D5CCB8"); text(block, title, 33, 390, ink, "Cormorant Garamond"); text(block, desc, 12, 390, muted); });

  const mn = row(mobile, "Quiet luxury mobile navigation", 390, 72, [0, 24], paper); text(mn, "senda", 40, 240, ink, "Cormorant Garamond"); mono(mn, "MENÚ +", 75, gold, 9);
  const mc = box(mobile, "Luxury mobile typography", 390, 304, paper, "VERTICAL", 16, 24); mc.counterAxisAlignItems = "CENTER"; mc.primaryAxisAlignItems = "CENTER";
  centerText(mc, "UN REFUGIO, A OTRO RITMO", 8, 342, gold, "DM Mono");
  centerText(mc, "El lujo de", 67, 342, ink, "Cormorant Garamond", "Regular", .96);
  centerText(mc, "bajar el ritmo.", 61, 342, ink, "Cormorant Garamond", "Italic", .96);
  centerText(mc, "Tiempo para volver a lo esencial.", 12, 342, muted, "Manrope");
  const ms = box(mobile, "Mobile organic landscape", 390, 300, paper, "VERTICAL", 0, [0, 24]);
  const mp = photo(ms, "Mobile arched landscape", 342, 276, hash); mp.topLeftRadius = mp.topRightRadius = 171; mp.bottomLeftRadius = mp.bottomRightRadius = 3;
  const me = box(mobile, "Mobile quiet luxury close", 390, 168, paper, "VERTICAL", 14, 24);
  text(me, "Bosque, agua y silencio.", 30, 342, ink, "Cormorant Garamond");
  text(me, "Un lugar para bajar el ruido\ny escuchar lo que importa.", 12, 342, muted, "Manrope", "Regular", 1.6);
  mono(me, "CONCEPTO FICTICIO / LUJO ORGÁNICO", 342, gold, 7);
}

function orbitApp(parent, width, height, small = false) {
  const ink = "#17304E", blue = "#2C60D9", muted = "#7B8BA1", border = "#DEE6F2";
  const app = outline(box(parent, "Corporate product / Editable interface", width, height, "#FFFFFF", "HORIZONTAL"), border); app.cornerRadius = 12; app.clipsContent = true;
  const sidebarWidth = small ? 0 : 208;
  if (!small) {
    const side = box(app, "Enterprise workspace navigation", 208, height, "#F2F6FC", "VERTICAL", 22, [25, 20]);
    text(side, "Equipo Norte", 16, 168, ink, "Inter", "Semi Bold"); mono(side, "WORKSPACE DEMO", 168, muted, 8);
    ["Resumen", "Proyectos", "Tareas", "Agenda", "Mi equipo"].forEach((label, i) => { const item = row(side, "Workspace / " + label, 168, 34, [0, 10], i === 0 ? "#E2EBFF" : "#F2F6FC"); item.cornerRadius = 5; circle(item, 5, i === 0 ? blue : "#AFBED1"); text(item, label, 11, 138, i === 0 ? blue : muted, "Inter", i === 0 ? "Semi Bold" : "Regular"); });
  }
  const pad = small ? 16 : 24, inner = width - sidebarWidth - 2 * pad;
  const content = box(app, "Team overview", width - sidebarWidth, height, "#FFFFFF", "VERTICAL", small ? 13 : 18, pad);
  const header = row(content, "Overview header", inner, small ? 36 : 42);
  const heading = box(header, "Overview title", inner - (small ? 28 : 200), small ? 36 : 42, null, "VERTICAL", 6);
  text(heading, "Resumen del equipo", small ? 15 : 21, heading.width, ink, "Inter", "Semi Bold");
  text(heading, "Tu trabajo, con una visión clara.", small ? 8 : 10, heading.width, muted, "Inter");
  if (!small) { const control = outline(row(header, "Weekly date control", 160, 34, [0, 14], "#FFFFFF"), border); control.cornerRadius = 6; text(control, "Esta semana", 11, 130, muted, "Inter"); } else circle(header, 24, "#DFE9FC");
  const statCount = small ? 3 : 4;
  const metrics = row(content, "Team metrics", inner, small ? 62 : 84);
  [["Proyectos", "12", blue], ["En curso", "08", "#C38C35"], ["Completados", "24", "#328B74"], ["Prioridades", "06", "#7A66B4"]].slice(0, statCount).forEach(([label, value, color]) => { const card = outline(box(metrics, label, (inner - (statCount - 1) * 12) / statCount, small ? 62 : 84, "#FFFFFF", "VERTICAL", 9, small ? 9 : 14), border); card.cornerRadius = 7; text(card, label, small ? 7 : 10, card.width - 20, muted, "Inter"); const values = row(card, label + " value", card.width - (small ? 18 : 28), small ? 22 : 30); text(values, value, small ? 19 : 27, values.width - 15, ink, "Inter", "Semi Bold"); circle(values, 5, color); });
  const chartWidth = small ? inner : Math.round(inner * .6) - 10;
  const lower = small ? content : row(content, "Activity and priorities", inner, 208);
  const chart = outline(box(lower, "Weekly activity module", chartWidth, small ? 132 : 208, "#FFFFFF", "VERTICAL", small ? 10 : 16, 14), border); chart.cornerRadius = 8;
  text(chart, "Actividad semanal", small ? 10 : 13, chartWidth - 28, ink, "Inter", "Semi Bold");
  const bars = row(chart, "Weekly activity chart", chartWidth - 28, small ? 60 : 109); bars.counterAxisAlignItems = "MAX";
  [42, 64, 51, 90, 72, 57, 35].forEach((value, index) => { const col = box(bars, "Activity column " + index, (chartWidth - 65) / 7, small ? value * .65 : value, index === 3 ? blue : "#B5CDF8"); col.cornerRadius = 3; });
  const days = row(chart, "Chart weekday labels", chartWidth - 28, 12); ["L", "M", "M", "J", "V", "S", "D"].forEach(day => centerText(days, day, small ? 6 : 8, (chartWidth - 65) / 7, muted, "Inter"));
  const tasksWidth = small ? inner : inner - chartWidth - 20;
  const list = small ? box(content, "Next priority", inner, 72, null, "VERTICAL", 10) : outline(box(lower, "Team priorities", tasksWidth, 208, "#FFFFFF", "VERTICAL", 18, 16), border);
  list.cornerRadius = 8;
  text(list, "Próximas entregas", small ? 10 : 13, tasksWidth - (small ? 0 : 32), ink, "Inter", "Semi Bold");
  [["Identidad visual / Norte", "En curso"], ["Web / Colección Otoño", "Revisión"], ["Planificación creativa", "Pendiente"]].slice(0, small ? 2 : 3).forEach(([label, status], index) => { const item = row(list, label, tasksWidth - (small ? 0 : 32), small ? 17 : 31); circle(item, 5, [blue, "#328B74", "#C38C35"][index]); text(item, label, small ? 8 : 10, small ? tasksWidth - 17 : tasksWidth - 135, muted, "Inter"); if (!small) { const pill = box(item, status, 74, 23, ["#E8F0FF", "#E6F2ED", "#FAF0DF"][index], "VERTICAL", 0, [6, 6]); pill.cornerRadius = 5; centerText(pill, status, 8, 62, [blue, "#328B74", "#A97D35"][index], "Inter"); } });
  return app;
}

function orbitCorporate() {
  const paper = "#F8FBFF", white = "#FFFFFF", ink = "#17304E", blue = "#2C60D9", muted = "#718299";
  desktop.fills = mobile.fills = fill(paper);
  const nav = row(desktop, "Corporate product navigation", 1440, 84, [0, 64], white); text(nav, "orbit", 31, 250, blue, "Inter", "Bold"); text(nav, "Producto          Soluciones          Recursos          Planes", 13, 650, ink, "Inter"); smallAction(nav, "Empieza gratis", 190, 44, blue, white, 7, "Inter");
  const hero = box(desktop, "Corporate centered value proposition", 1440, 292, paper, "VERTICAL", 14, [20, 64]); hero.counterAxisAlignItems = "CENTER"; hero.primaryAxisAlignItems = "CENTER";
  const eyebrow = box(hero, "Product category badge", 290, 28, "#E7EEFC", "VERTICAL", 0, [7, 12]); eyebrow.cornerRadius = 18; centerText(eyebrow, "EL ESPACIO DE TU EQUIPO", 9, 266, blue, "Inter", "Medium");
  centerText(hero, "Todo tu trabajo.", 65, 1200, ink, "Inter", "Bold", 1.02);
  centerText(hero, "En la misma órbita.", 65, 1200, blue, "Inter", "Bold", 1.02);
  centerText(hero, "Proyectos, conversaciones y prioridades. Una visión clara para avanzar juntos.", 15, 1200, muted, "Inter", "Regular", 1.5);
  const appStage = box(desktop, "Enterprise product preview", 1440, 474, paper, "VERTICAL", 0, [0, 64]); orbitApp(appStage, 1312, 450);
  const end = row(desktop, "Product capabilities", 1440, 150, [25, 64], paper);
  [["01", "Una sola fuente de claridad", "Conecta proyectos, personas y prioridades."], ["02", "Diseñado para colaborar", "El contexto correcto, en el momento correcto."], ["03", "Visibilidad para avanzar", "Cada entrega, con un siguiente paso claro."]].forEach(([index, title, desc]) => { const block = box(end, title, 395, 100, null, "VERTICAL", 12); mono(block, index, 390, blue, 9); text(block, title, 17, 390, ink, "Inter", "Semi Bold"); text(block, desc, 12, 390, muted, "Inter", "Regular", 1.5); });

  const mn = row(mobile, "Corporate mobile navigation", 390, 68, [0, 24], white); text(mn, "orbit", 29, 180, blue, "Inter", "Bold"); smallAction(mn, "Entrar", 130, 38, blue, white, 7, "Inter");
  const mc = box(mobile, "Mobile corporate product story", 390, 238, paper, "VERTICAL", 15, 24); mc.counterAxisAlignItems = "CENTER";
  centerText(mc, "EL ESPACIO DE TU EQUIPO", 8, 342, blue, "Inter", "Medium");
  centerText(mc, "Tu equipo.\nEn órbita.", 44, 342, ink, "Inter", "Bold", 1.04);
  centerText(mc, "Todo tu trabajo conectado.\nUna visión clara para avanzar.", 12, 342, muted, "Inter", "Regular", 1.5);
  const app = box(mobile, "Mobile corporate product preview", 390, 426, paper, "VERTICAL", 0, [0, 24]); orbitApp(app, 342, 400, true);
  const me = box(mobile, "Mobile product capabilities", 390, 112, paper, "VERTICAL", 12, 24); text(me, "Un equipo. Una visión clara.", 18, 342, ink, "Inter", "Semi Bold"); mono(me, "CONCEPTO FICTICIO / PRODUCTO DIGITAL", 342, blue, 7);
}

[atlasSwiss, brumaBold, sendaLuxury, orbitCorporate][STYLE_INDEX]();
return {
  brand,
  direction: directions[STYLE_INDEX],
  createdNodeIds: ids,
  desktopId: desktop.id,
  mobileId: mobile.id,
  previousRootIds: [previousDesktop.id, previousMobile.id],
  screenSizes: [[desktop.width, desktop.height], [mobile.width, mobile.height]],
};
