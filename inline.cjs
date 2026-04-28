const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const assetsDir = path.join(distDir, 'assets');
const files = fs.readdirSync(assetsDir);

let cssContent = '';
let jsContent = '';

files.forEach(f => {
  const fullPath = path.join(assetsDir, f);
  if (f.endsWith('.css')) {
    cssContent = fs.readFileSync(fullPath, 'utf-8');
  } else if (f.endsWith('.js')) {
    jsContent = fs.readFileSync(fullPath, 'utf-8');
  }
});

let result = html;

result = result.replace(
  '<link rel="stylesheet" crossorigin href="/assets/index-CFgrgf91.css">',
  `<style>${cssContent}</style>`
);

result = result.replace(
  '<script type="module" crossorigin src="/assets/index-BU0v-NR8.js"></script>',
  `<script type="module">${jsContent}</script>`
);

result = result.replace(/href="\/assets\/[^"]+\.css"/g, '');

fs.writeFileSync(path.join(__dirname, 'mystic-decider.html'), result, 'utf-8');
console.log('Done! Created mystic-decider.html');
