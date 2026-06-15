const fs = require('fs');
const path = require('path');
const root = path.resolve(process.cwd(), 'src');
const exts = new Set(['.js', '.jsx', '.ts', '.tsx']);
let count = 0;
function walk(dir) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      walk(full);
      continue;
    }
    if (!exts.has(path.extname(name.name))) continue;
    const text = fs.readFileSync(full, 'utf8');
    if (text.includes('/*#__PURE__*/')) {
      const updated = text.split('/*#__PURE__*/').join('');
      fs.writeFileSync(full, updated, 'utf8');
      count += 1;
      console.log('cleaned: ' + path.relative(process.cwd(), full));
    }
  }
}
walk(root);
console.log('removed comments from ' + count + ' file(s)');
