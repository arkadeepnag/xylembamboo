const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

async function main() {
  const file = fs.readFileSync(path.join(__dirname, '..', 'app', 'page.js'), 'utf8');
  const urlRe = /https:\/\/[\w\-\.\/\?\=\&\%\:\@\,\+\;\~\#\[\]0-9A-Za-z_-]+/g;
  const matches = file.match(urlRe) || [];
  const urls = Array.from(new Set(matches.filter(u => u.includes('images.unsplash.com') || u.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i))));
  if (!urls.length) {
    console.log('No image URLs found.');
    return;
  }
  console.log('Checking', urls.length, 'image URLs...');
  for (const u of urls) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(u, { method: 'HEAD', signal: controller.signal });
      clearTimeout(timeout);
      console.log(res.status, res.headers.get('content-type') || '-', u);
    } catch (err) {
      console.log('ERROR', err.message, u);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
