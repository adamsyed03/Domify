import { createOrder, getOrderStorageMode, readOrders } from './orderStore.mjs';

const maxBodyBytes = 1024 * 1024;
const adminPassword = process.env.ADMIN_PASSWORD || 'hima';

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;

      if (body.length > maxBodyBytes) {
        reject(Object.assign(new Error('Request body is too large'), { statusCode: 413 }));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error('Invalid JSON body'), { statusCode: 400 }));
      }
    });

    req.on('error', reject);
  });
}

export async function handleApiRequest(req, res) {
  const url = new URL(req.url ?? '/', 'http://localhost');

  try {
    if (url.pathname === '/api/orders' && req.method === 'POST') {
      const payload = await readJsonBody(req);
      const order = await createOrder(payload);
      sendJson(res, 201, { order });
      return true;
    }

    if (url.pathname === '/api/orders' && req.method === 'GET') {
      if (req.headers['x-admin-password'] !== adminPassword) {
        sendJson(res, 401, { error: 'Admin password is required' });
        return true;
      }

      const orders = await readOrders();
      sendJson(res, 200, { orders });
      return true;
    }

    if (url.pathname === '/api/status' && req.method === 'GET') {
      sendJson(res, 200, { storage: getOrderStorageMode() });
      return true;
    }

    if (url.pathname.startsWith('/api/')) {
      sendJson(res, 404, { error: 'Not found' });
      return true;
    }

    return false;
  } catch (error) {
    sendJson(res, error.statusCode ?? 500, { error: error.message || 'Server error' });
    return true;
  }
}

export function orderApiVitePlugin() {
  return {
    name: 'domify-order-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const handled = await handleApiRequest(req, res);

        if (!handled) {
          next();
        }
      });
    },
  };
}
