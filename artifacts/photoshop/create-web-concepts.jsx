#target photoshop
// Run inside the installed Photoshop 2025 through File > Scripts > Browse.
// Layout and text remain separate native Photoshop layers. Photos are clipped, not flattened.
(function () {
  var root = "C:/Users/dcruz/OneDrive/Escritorio/portfolio_web_designer";
  var output = new Folder(root + "/public/designs"); output.create();
  var art = new Folder(root + "/artifacts/photoshop"); art.create();
  var originalUnits = app.preferences.rulerUnits, originalDialogs = app.displayDialogs;
  var results = [], stage = "Starting";
  app.preferences.rulerUnits = Units.PIXELS;
  app.displayDialogs = DialogModes.NO;
  function color(hex) { var c = new SolidColor(); c.rgb.hexValue = hex.replace("#", ""); return c; }
  function group(doc, name) { stage = "Group: " + name; var g = doc.layerSets.add(); g.name = name; return g; }
  function rect(doc, g, name, x, y, w, h, hex) { var l = g.artLayers.add(); l.name = name; doc.activeLayer = l; doc.selection.select([[x,y],[x+w,y],[x+w,y+h],[x,y+h]]); doc.selection.fill(color(hex)); doc.selection.deselect(); return l; }
  function type(doc, g, name, contents, x, y, w, h, size, hex, face, leading, tracking) {
    var l = g.artLayers.add(); l.kind = LayerKind.TEXT; l.name = name;
    var t = l.textItem; t.kind = TextType.PARAGRAPHTEXT; t.position = [UnitValue(x,"px"),UnitValue(y,"px")]; t.width = UnitValue(w,"px"); t.height = UnitValue(h,"px"); t.font = face || "ArialMT"; t.size = UnitValue(size,"px"); t.color = color(hex); t.contents = contents.replace(/\n/g,"\r"); t.useAutoLeading = false; t.leading = UnitValue(leading || size*1.25,"px"); t.tracking = tracking || 0; t.antiAliasMethod = AntiAlias.SHARP; return l;
  }
  function photo(doc, g, name, path, x, y, w, h, zoom, fx, fy) {
    var base = rect(doc,g,name+" / Clipping frame",x,y,w,h,"FFFFFF");
    var source = app.open(new File(path)); var layer = source.activeLayer.duplicate(doc,ElementPlacement.PLACEATBEGINNING); source.close(SaveOptions.DONOTSAVECHANGES); app.activeDocument = doc;
    layer.move(base,ElementPlacement.PLACEBEFORE); layer.name = name + " / Source photograph";
    var b = layer.bounds, sw = b[2].as("px")-b[0].as("px"), sh=b[3].as("px")-b[1].as("px"), scale=Math.max(w/sw,h/sh)*(zoom||1)*100;
    layer.resize(scale,scale,AnchorPosition.MIDDLECENTER); b=layer.bounds; sw=b[2].as("px")-b[0].as("px");sh=b[3].as("px")-b[1].as("px");
    layer.translate(x+w/2-sw*(fx===undefined?.5:fx)-b[0].as("px"),y+h/2-sh*(fy===undefined?.5:fy)-b[1].as("px")); layer.grouped=true; return layer;
  }
  function button(doc,g,label,x,y,w,bg,fg) { rect(doc,g,"Button / "+label,x,y,w,52,bg); type(doc,g,"Button label / "+label,label,x+21,y+17,w-42,28,14,fg,"ArialMT",18); }
  function newDocument(name,bg) {
    stage = "Create document";
    var doc = app.documents.add(UnitValue(1440,"px"),UnitValue(1800,"px"),72,name.replace(" / "," - "),NewDocumentMode.RGB,DocumentFill.WHITE);
    app.activeDocument = doc;
    var foundation = group(doc,"00 / Foundation");
    stage = "Canvas rectangle";
    rect(doc,foundation,"Canvas / "+bg,0,0,1440,1800,bg);
    stage = "Guides";
    for(var x=80;x<=1360;x+=160) doc.guides.add(Direction.VERTICAL,UnitValue(x,"px"));
    return doc;
  }
  function countLayers(container) { var n=0;for(var i=0;i<container.layers.length;i++){n++;if(container.layers[i].typename==="LayerSet")n+=countLayers(container.layers[i]);}return n; }
  function save(doc,slug) {
    doc.info.caption="Fictional web design concept, composed with editable text and grouped layers in Adobe Photoshop "+app.version+". Supporting photograph generated with OpenAI ImageGen.";
    var psdFile=new File(output.fsName+"/"+slug+"-web-concept.psd");if(psdFile.exists)throw new Error("Output already exists: "+psdFile.fsName);
    var options=new PhotoshopSaveOptions();options.layers=true;options.embedColorProfile=true;doc.saveAs(psdFile,options,false,Extension.LOWERCASE);
    var png=new PNGSaveOptions();png.interlaced=false;doc.saveAs(new File(art.fsName+"/"+slug+"-full.png"),png,true,Extension.LOWERCASE);
    var cover=doc.duplicate(slug+" / Portfolio cover",true);cover.crop([0,0,1440,1000]);cover.saveAs(new File(art.fsName+"/"+slug+"-cover.png"),png,true,Extension.LOWERCASE);cover.close(SaveOptions.DONOTSAVECHANGES);app.activeDocument=doc;
    results.push('{"name":"'+slug+'","width":1440,"height":1800,"layers":'+countLayers(doc)+',"path":"public/designs/'+slug+'-web-concept.psd"}');
  }
  try {
    var doc=newDocument("LINO / Web concept", "F6F2E9"), ink="30291F", clay="A64C33", muted="81786A", g=group(doc,"01 / Navigation");
    type(doc,g,"Brand / LINO","LINO",80,29,300,46,30,ink,"Arial-BoldMT",36,160);type(doc,g,"Navigation","Colección          El taller          Contacto",710,41,440,28,14,ink,"ArialMT",20);button(doc,g,"Ver colección  →",1180,25,180,ink,"F6F2E9");rect(doc,g,"Fine divider",80,96,1280,1,"D7CFC1");
    g=group(doc,"02 / Hero");type(doc,g,"Eyebrow","CERÁMICA PARA LO COTIDIANO",80,162,600,24,11,clay,"ArialMT",16,140);type(doc,g,"Main headline","Hecho a mano.\rPara cada día.",80,237,620,205,67,ink,"Georgia",78);type(doc,g,"Hero introduction","Piezas pequeñas que acompañan grandes rituales.\rDiseñadas con calma, hechas para quedarse.",80,473,530,100,17,muted,"ArialMT",28);button(doc,g,"Descubrir piezas  →",80,614,222,clay,"FFFFFF");type(doc,g,"Collection note","Pocas piezas. Cada una, diferente.",80,705,500,30,12,muted,"ArialMT",20);photo(doc,g,"Hero / Handmade ceramics",art.fsName+"/lino-photo.png",730,148,630,650,1,.5,.50);type(doc,g,"Hero image caption","01 / MATERIA NATURAL",730,821,630,25,10,muted,"ArialMT",15,100);
    g=group(doc,"03 / Collection");rect(doc,g,"Section divider",80,912,1280,1,"D7CFC1");type(doc,g,"Collection heading","Objetos con una historia.",80,953,760,72,43,ink,"Georgia",54);type(doc,g,"Collection introduction","Una colección de muestra para dar forma\ra los momentos más sencillos.",980,963,380,64,14,muted,"ArialMT",23);
    var entries=[[80,"Jarrones","Formas que encuentran su lugar.","Desde $28",1.72,.40,.36],[522,"Tazas","Tu primera pausa del día.","Desde $18",1.78,.78,.64],[964,"Cuencos","Una mesa, a tu manera.","Desde $22",1.86,.29,.69]];
    for(var i=0;i<entries.length;i++){var e=entries[i];photo(doc,g,"Collection / "+e[1],art.fsName+"/lino-photo.png",e[0],1060,396,288,e[4],e[5],e[6]);type(doc,g,e[1]+" / Title",e[1],e[0],1374,396,43,25,ink,"Georgia",33);type(doc,g,e[1]+" / Description",e[2],e[0],1424,396,28,12,muted,"ArialMT",19);type(doc,g,e[1]+" / Price",e[3],e[0],1462,396,28,12,clay,"ArialMT",19);}
    g=group(doc,"04 / Workshop story");rect(doc,g,"Warm workshop panel",0,1543,1440,172,"EAE2D5");type(doc,g,"Workshop statement","Pocas piezas.\rMucho cuidado.",80,1576,660,113,35,ink,"Georgia",43);type(doc,g,"Workshop paragraph","Una propuesta de tienda sencilla: fotografía cuidada,\njerarquía clara y espacio para que hable el objeto.",800,1593,560,83,15,muted,"ArialMT",25);
    g=group(doc,"05 / Footer");type(doc,g,"Footer brand","LINO / CONCEPTO FICTICIO",80,1754,700,25,10,muted,"ArialMT",16,90);type(doc,g,"Footer note","Diseño web · Photoshop 2025",1035,1754,325,25,10,muted,"ArialMT",16);save(doc,"lino");
    doc=newDocument("FOCO / Web concept","101112");ink="F0F1ED";muted="A2A7A7";var mint="BDE3D2";g=group(doc,"01 / Navigation");type(doc,g,"Brand / FOCO","FOCO®",80,30,300,50,31,ink,"Arial-BoldMT",38,20);type(doc,g,"Navigation","Series          El estudio          Contacto",882,43,478,27,13,ink,"ArialMT",20);rect(doc,g,"Header rule",80,97,1280,1,"363A3B");
    g=group(doc,"02 / Hero");type(doc,g,"Photographic discipline","FOTOGRAFÍA / ARQUITECTURA / CIUDAD",80,148,900,28,11,mint,"ArialMT",17,110);type(doc,g,"Main headline","La ciudad,\ra otra luz.",80,205,980,224,90,ink,"Arial-BoldMT",95,-35);type(doc,g,"Hero side note","Una mirada al espacio,\nla escala y las formas\nque nos rodean.",1060,249,300,108,15,muted,"ArialMT",25);type(doc,g,"Scroll action","VER SERIES  ↓",1060,379,300,29,11,mint,"ArialMT",17,100);photo(doc,g,"Hero / Concrete and light",art.fsName+"/foco-photo.png",80,467,1280,566,1,.5,.5);type(doc,g,"Hero caption left","01 / GEOMETRÍAS DEL SILENCIO",80,1060,890,28,10,muted,"ArialMT",16,100);type(doc,g,"Hero caption right","Serie conceptual · Blanco y negro",1070,1060,290,28,10,muted,"ArialMT",16);
    g=group(doc,"03 / Selected series");type(doc,g,"Selected series heading","Series seleccionadas.",80,1146,1000,68,40,ink,"ArialMT",52);photo(doc,g,"Series / Geometry",art.fsName+"/foco-photo.png",80,1240,620,280,1.55,.57,.27);photo(doc,g,"Series / Human scale",art.fsName+"/foco-photo.png",740,1240,620,280,1.65,.30,.50);type(doc,g,"Series 01 title","01  /  Geometría cotidiana",80,1542,620,32,16,ink,"ArialMT",23);type(doc,g,"Series 02 title","02  /  Entre escalas",740,1542,620,32,16,ink,"ArialMT",23);
    g=group(doc,"04 / Contact and footer");rect(doc,g,"Closing rule",80,1623,1280,1,"363A3B");type(doc,g,"Closing statement","Una nueva forma de mirar.",80,1661,950,72,37,ink,"ArialMT",47);button(doc,g,"Conocer el estudio  →",1110,1654,250,mint,"101112");type(doc,g,"Concept declaration","FOCO / CONCEPTO FICTICIO",80,1755,800,27,10,muted,"ArialMT",16,100);type(doc,g,"Software note","Diseño web · Photoshop 2025",1030,1755,330,27,10,muted,"ArialMT",16);save(doc,"foco");
    var report=new File(art.fsName+"/photoshop-result.json");report.open("w");report.encoding="UTF8";report.write('{"application":"Adobe Photoshop","version":"'+app.version+'","documents":['+results.join(",")+']}');report.close();
    app.activeDocument=doc;executeAction(charIDToTypeID("FtOn"),undefined,DialogModes.NO);
  } catch(error) { var log=new File(art.fsName+"/photoshop-error.txt");log.open("w");log.encoding="UTF8";log.write(stage+"\n"+error.message+"\nLine: "+error.line);log.close();alert("Photoshop: "+stage+" / "+error.message); }
  finally { app.preferences.rulerUnits=originalUnits;app.displayDialogs=originalDialogs; }
}());
