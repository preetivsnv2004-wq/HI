/* Minimal static file server for the CRA build/ folder (verification only).
   Built-ins only, single long-lived process. Hash routing is client-side,
   so every non-file request falls back to index.html. */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'build');
const PORT = process.env.PORT || 3000;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.mp4': 'video/mp4', '.txt': 'text/plain; charset=utf-8', '.map': 'application/json',
};

const send = (res, code, body, type) => { res.writeHead(code, { 'Content-Type': type || 'text/plain' }); res.end(body); };

http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
    if (urlPath === '/') urlPath = '/index.html';
    let filePath = path.join(ROOT, path.normalize(urlPath));
    if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden');
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(ROOT, 'index.html'); // SPA fallback
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, fs.readFileSync(filePath), TYPES[ext] || 'application/octet-stream');
  } catch (e) {
    send(res, 500, 'Server error: ' + e.message);
  }
}).listen(PORT, () => console.log('Static build server on http://localhost:' + PORT));
