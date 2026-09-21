import fs from 'node:fs';
import path from 'node:path';
const routes = JSON.parse(fs.readFileSync('src/routes.json', 'utf8'));
const errors = [];
for (const {file} of routes) {
  const html = fs.readFileSync(file, 'utf8');
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${file}: expected one h1`);
  if (/undefined|\[object Object\]|var\(--variable-/.test(html)) errors.push(`${file}: unresolved source content`);
  for (const [,ref] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#|data:)/.test(ref)) continue;
    const target = path.resolve(path.dirname(file), ref.split('#')[0]);
    if (!fs.existsSync(target)) errors.push(`${file}: missing ${ref}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
else console.log(`Checked ${routes.length} pages: headings, local links, images, videos, fonts, scripts, and styles resolve.`);
