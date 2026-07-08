import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { handleApiRequest } from './server/api.mjs';

const port = Number(process.argv[2] || process.env.PORT || 3000);
const distDir = path.resolve(process.cwd(), 'dist');
const indexFile = path.join(distDir, 'index.html');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function safeStaticPath(urlPathname) {
  const decodedPath = decodeURIComponent(urlPathname);
  const requestedPath = decodedPath === '/' ? '/index.html' : decodedPath;
  const filePath = path.resolve(distDir, `.${requestedPath}`);

  if (!filePath.startsWith(distDir)) {
    return null;
  }

  return filePath;
}

async function serveFile(res, filePath) {
  const file = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();

  res.statusCode = 200;
  res.setHeader('Content-Type', contentTypes[extension] || 'application/octet-stream');
  res.end(file);
}

createServer(async (req, res) => {
  if (await handleApiRequest(req, res)) {
    return;
  }

  const url = new URL(req.url ?? '/', `http://localhost:${port}`);
  const filePath = safeStaticPath(url.pathname);

  if (!filePath) {
    res.statusCode = 400;
    res.end('Bad request');
    return;
  }

  try {
    await serveFile(res, filePath);
  } catch (error) {
    try {
      await serveFile(res, indexFile);
    } catch {
      res.statusCode = 404;
      res.end('Not found');
    }
  }
}).listen(port, () => {
  console.log(`Domify server running at http://localhost:${port}`);
});
