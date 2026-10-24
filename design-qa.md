# Revisión visual — correcciones de identidad

## Alcance

Ajustes solicitados por David: utilizar su mascota Vesper, quitar la marquesina, rediseñar «Mi universo creativo» y dar a los filtros de proyectos el estilo de las badges de intereses.

Vista local: http://localhost:5173/#home

## Resultado

- Vesper sustituye al personaje anterior. Se usa el PNG transparente aportado por el usuario, exportado a WebP con alfa, sin redibujar el personaje.
- La marquesina y sus animaciones se eliminaron del componente y de los estilos.
- «Mi universo creativo» tiene una composición abierta: titular, relato personal, influencias y paleta. Se eliminó el contenedor de fondo albaricoque con borde completo.
- Badges de intereses y filtros comparten una regla de estilo: bordes, fondo, radio de 5 px y letra de 10 px. Los filtros conservan 44 px de altura para facilitar su uso y la selección en rojo vino.
- Se mantiene el lenguaje masculino, la tipografía latina, la paleta personal y el contenido de los 12 proyectos.

## Comprobaciones

| Revisión | Evidencia |
| --- | --- |
| Escritorio, 1440 × 1000 | Vesper visible en la portada; composición personal de tres columnas; filtros rectangulares en tema oscuro. Sin desbordamiento horizontal. |
| Móvil, 390 × 1000 | Universo creativo en una columna, colores y badges legibles; los tres filtros caben en una fila. Ancho cliente y scroll: 375 px. |
| Móvil estrecho, 320 × 740 | Inglés y tema oscuro: sin recortes en cabecera, relato y paleta. Ancho cliente y scroll: 305 px. |
| Filtros | Sitios web: 8; UI/UX: 4; Todos: 12. Se restableció Todos. |
| Imágenes y marquesina | Cero elementos img y cero nodos de la marquesina. Vesper es un fondo CSS de un div con descripción accesible. |
| Producción | npm run build correcto; incluye vesper-*.webp (109 kB). |
| Consola | Sin errores devueltos por el navegador. |

## Capturas

- artifacts/redesign/vesper-hero.jpg
- artifacts/redesign/vesper-filters-dark.jpg
- artifacts/redesign/vesper-universe-mobile-dark.jpg
- artifacts/redesign/vesper-filters-mobile-dark.jpg
- artifacts/redesign/vesper-final.jpg

Estado de entrega: español, tema claro, Todos, portada y viewport original del navegador.

Cambios locales. No se ha publicado un despliegue nuevo.

final result: passed

## Actualización — retrato en la portada

- El retrato de David se trasladó de «Sobre mí» a la portada y se retiraron las tarjetas superpuestas de proyectos del inicio.
- Escritorio: foto junto a la presentación. A 1440 × 1000, ocupa desde y=185 hasta y=651, completamente dentro de la primera pantalla.
- Móvil: nombre y retrato antes del titular. A 320 × 740, el retrato ocupa desde y=180 hasta y=446, visible sin desplazarse.
- Se revisó inglés y tema oscuro a 320 px: ancho cliente y scroll de 305 px; sin desbordamiento horizontal. Cero elementos img; un único retrato con fondo CSS.
- «Sobre mí» se reorganizó en dos columnas y una en móvil. Vesper acompaña la foto como detalle secundario.
- Influencias actuales: Anime & cosplay, Cultura retro Y2K y Minimalismo.
- Capturas: artifacts/redesign/portrait-home-desktop.jpg y portrait-home-mobile-dark.jpg.
- Compilación de producción y git diff --check correctos.

## Actualización — continuidad de la presentación

- Biografía y universo creativo comparten una composición de dos columnas, con el texto debajo de cada título. En móvil pasan a una columna.
- Se eliminaron la fila de metadatos bajo la portada, las etiquetas redundantes y los divisores horizontal y vertical de la ficha personal.
- La transición entre la portada y el contenido de presentación es de 28 px en escritorio. El bloque de presentación mide aproximadamente 399 px de alto a 1440 px de viewport.
- Se redujo también el espacio hasta la galería de proyectos, manteniendo las badges, la paleta y los enlaces a CV e Instagram.
- Revisado a 1440 × 1000 en español claro y a 320 × 740 en inglés oscuro. Sin recortes de texto ni desbordamiento; a 320 px, ancho cliente y scroll son 305 px.
- Cero elementos img y sin errores de consola. Compilación y git diff --check correctos.
- Evidencia: artifacts/redesign/continuous-about-desktop.jpg y continuous-about-mobile-dark.jpg.
