import { loadLocalEnv } from './env.mjs';

loadLocalEnv();

const tableName = process.env.SUPABASE_ORDERS_TABLE || 'orders';

function normalizeSupabaseUrl(url) {
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    endpoint: `${normalizeSupabaseUrl(url)}/rest/v1/${tableName}`,
    serviceRoleKey,
  };
}

function toDatabaseOrder(order) {
  return {
    id: order.id,
    first_name: order.firstName,
    last_name: order.lastName,
    house_flat_number: order.houseFlatNumber,
    street: order.street,
    city: order.city,
    country: order.country,
    phone_number: order.phoneNumber,
    created_at: order.createdAt,
  };
}

function fromDatabaseOrder(order) {
  return {
    id: order.id,
    firstName: order.first_name,
    lastName: order.last_name,
    houseFlatNumber: order.house_flat_number,
    street: order.street,
    city: order.city,
    country: order.country,
    phoneNumber: order.phone_number,
    createdAt: order.created_at,
  };
}

async function requestSupabase(pathAndQuery = '', options = {}) {
  const config = getSupabaseConfig();

  if (!config) {
    return null;
  }

  const headers = {
    apikey: config.serviceRoleKey,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
    ...(options.headers || {}),
  };

  if (!config.serviceRoleKey.startsWith('sb_secret_')) {
    headers.Authorization = `Bearer ${config.serviceRoleKey}`;
  }

  let response;

  try {
    response = await fetch(`${config.endpoint}${pathAndQuery}`, {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(`Supabase connection failed: ${error.message}`);
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(data?.message || data?.error || 'Supabase request failed');
    error.statusCode = response.status;
    throw error;
  }

  return data;
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseConfig());
}

export async function readSupabaseOrders() {
  const data = await requestSupabase('?select=*&order=created_at.desc');

  if (!data) {
    return null;
  }

  return data.map(fromDatabaseOrder);
}

export async function createSupabaseOrder(order) {
  const data = await requestSupabase('', {
    method: 'POST',
    body: JSON.stringify(toDatabaseOrder(order)),
  });

  if (!data) {
    return null;
  }

  return fromDatabaseOrder(data[0]);
}
