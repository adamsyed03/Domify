import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createSupabaseOrder, isSupabaseConfigured, readSupabaseOrders } from './supabaseStore.mjs';

const dataDir = path.resolve(process.cwd(), 'data');
const ordersFile = path.join(dataDir, 'orders.json');

const orderFields = ['firstName', 'lastName', 'houseFlatNumber', 'street', 'city', 'country', 'phoneNumber'];

export function getOrderStorageMode() {
  return isSupabaseConfigured() ? 'supabase' : 'local-json';
}

function cleanText(value, maxLength = 180) {
  return String(value ?? '').trim().slice(0, maxLength);
}

async function ensureDataFile() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(ordersFile, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }

    await writeFile(ordersFile, '[]\n', 'utf8');
  }
}

export async function readOrders() {
  const supabaseOrders = await readSupabaseOrders();

  if (supabaseOrders) {
    return supabaseOrders;
  }

  await ensureDataFile();

  const contents = await readFile(ordersFile, 'utf8');
  const parsed = JSON.parse(contents);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed;
}

export async function createOrder(payload) {
  const order = {
    id: randomUUID(),
    firstName: cleanText(payload.firstName, 80),
    lastName: cleanText(payload.lastName, 80),
    houseFlatNumber: cleanText(payload.houseFlatNumber, 50),
    street: cleanText(payload.street, 140),
    city: cleanText(payload.city, 80),
    country: cleanText(payload.country, 80),
    phoneNumber: cleanText(payload.phoneNumber, 50),
    createdAt: new Date().toISOString(),
  };

  const missingField = orderFields.find((field) => !order[field]);

  if (missingField) {
    const error = new Error(`${missingField} is required`);
    error.statusCode = 400;
    throw error;
  }

  const supabaseOrder = await createSupabaseOrder(order);

  if (supabaseOrder) {
    return supabaseOrder;
  }

  const orders = await readLocalOrders();
  orders.unshift(order);
  await writeFile(ordersFile, `${JSON.stringify(orders, null, 2)}\n`, 'utf8');

  return order;
}

async function readLocalOrders() {
  await ensureDataFile();

  const contents = await readFile(ordersFile, 'utf8');
  const parsed = JSON.parse(contents);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed;
}
