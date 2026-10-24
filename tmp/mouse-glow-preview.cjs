const fs = require('node:fs');
const sharp = require('C:/Users/dcruz/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const base = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="210"><path fill="#fffdfb" d="M0 0h240v210H0z"/><path fill="#111d31" d="M240 0h240v210H240z"/><g font-family="sans-serif" font-size="11"><g fill="#182b49"><text x="20" y="28">CLARO</text><text x="64" y="190" text-anchor="middle">Cursor</text><text x="176" y="190" text-anchor="middle">Enlaces</text></g><g fill="#d4dfec"><text x="260" y="28">OSCURO</text><text x="304" y="190" text-anchor="middle">Cursor</text><text x="416" y="190" text-anchor="middle">Enlaces</text></g></g></svg>`);
const cursor = fs.readFileSync('src/assets/cursors/glow-default.svg');
const pointer = fs.readFileSync('src/assets/cursors/glow-pointer.svg');
sharp(base).composite([
  {input:cursor,left:8,top:50}, {input:pointer,left:120,top:50},
  {input:cursor,left:248,top:50}, {input:pointer,left:360,top:50},
]).png().toFile('artifacts/redesign/mouse-glow-preview.png').then(()=>console.log('Vista del cursor generada'));
