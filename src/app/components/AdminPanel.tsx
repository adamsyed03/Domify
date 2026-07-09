import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import domifyLogo from '../../../Domifylogo.png';

type Order = {
  id: string;
  firstName: string;
  lastName: string;
  houseFlatNumber: string;
  street: string;
  city: string;
  country: string;
  phoneNumber: string;
  createdAt: string;
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('sr-RS', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

async function readApiResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  throw new Error('Server nije vratio API odgovor. Proverite da li je backend deployovan zajedno sa sajtom.');
}

export function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminPassword, setAdminPassword] = useState(() => localStorage.getItem('domifyAdminPassword') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storageMode, setStorageMode] = useState('');

  const loadOrders = async (password = adminPassword) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        headers: password ? { 'x-admin-password': password } : {},
      });
      const data = await readApiResponse(response);

      if (response.status === 401) {
        localStorage.removeItem('domifyAdminPassword');
        setIsLoggedIn(false);
        throw new Error(data.error || 'Pogrešna lozinka.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Porudžbine nisu učitane.');
      }

      if (password) {
        localStorage.setItem('domifyAdminPassword', password);
      }

      const statusResponse = await fetch('/api/status');
      const statusData = await readApiResponse(statusResponse);

      setIsLoggedIn(true);
      setStorageMode(statusData.storage || '');
      setOrders(data.orders || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Porudžbine nisu učitane.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem('domifyAdminPassword');

    if (savedPassword) {
      setAdminPassword(savedPassword);
      loadOrders(savedPassword);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#1a1f2e] px-4 py-8 text-gray-950">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            loadOrders(adminPassword);
          }}
          className="w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl shadow-black/25"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <img src={domifyLogo} alt="Domify" className="h-20 w-auto" />
            <h1 className="mt-4 text-2xl font-extrabold">Admin prijava</h1>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Unesite lozinku za pregled porudžbina.
            </p>
          </div>

          <label className="grid gap-2 text-sm font-bold text-gray-800">
            Lozinka
            <input
              type="password"
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
              autoComplete="current-password"
              className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-base font-semibold outline-none transition focus:border-[#7fff00] focus:ring-2 focus:ring-[#7fff00]/30"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#7fff00] px-5 text-base font-extrabold text-[#1a1f2e] transition-colors hover:bg-[#6eee00] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Provera...' : 'Prijavi se'}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 text-gray-950">
      <header className="border-b border-gray-200 bg-[#1a1f2e] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <img src={domifyLogo} alt="Domify" className="h-14 w-auto" />
            <div>
              <h1 className="text-2xl font-extrabold">Admin panel</h1>
              <p className="text-sm text-white/70">Order submissions from the website</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => loadOrders()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7fff00] px-5 py-2.5 text-sm font-extrabold text-[#1a1f2e] transition-colors hover:bg-[#6eee00]"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('domifyAdminPassword');
              setAdminPassword('');
              setIsLoggedIn(false);
              setOrders([]);
            }}
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-extrabold text-white transition-colors hover:bg-white/10"
          >
            Odjavi se
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-bold text-gray-500">Total orders</p>
            <p className="mt-1 text-3xl font-extrabold">{orders.length}</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:col-span-2">
            <p className="text-sm font-bold text-gray-500">Storage</p>
            <p className="mt-1 text-sm text-gray-700">
              {storageMode === 'supabase'
                ? 'Saved in Supabase.'
                : 'Saved locally in data/orders.json on this server.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3 font-extrabold">Datum</th>
                  <th className="px-4 py-3 font-extrabold">Ime</th>
                  <th className="px-4 py-3 font-extrabold">Telefon</th>
                  <th className="px-4 py-3 font-extrabold">Broj</th>
                  <th className="px-4 py-3 font-extrabold">Ulica</th>
                  <th className="px-4 py-3 font-extrabold">Grad</th>
                  <th className="px-4 py-3 font-extrabold">Država</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && (
                  <tr>
                    <td className="px-4 py-8 text-center font-semibold text-gray-500" colSpan={7}>
                      Loading orders...
                    </td>
                  </tr>
                )}

                {!loading && orders.length === 0 && (
                  <tr>
                    <td className="px-4 py-8 text-center font-semibold text-gray-500" colSpan={7}>
                      No orders yet.
                    </td>
                  </tr>
                )}

                {!loading &&
                  orders.map((order) => (
                    <tr key={order.id} className="align-top hover:bg-gray-50">
                      <td className="whitespace-nowrap px-4 py-4 text-gray-600">{formatDate(order.createdAt)}</td>
                      <td className="px-4 py-4 font-bold">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <a className="font-bold text-[#166534] hover:underline" href={`tel:${order.phoneNumber}`}>
                          {order.phoneNumber}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{order.houseFlatNumber}</td>
                      <td className="px-4 py-4 text-gray-700">{order.street}</td>
                      <td className="px-4 py-4 text-gray-700">{order.city}</td>
                      <td className="px-4 py-4 text-gray-700">{order.country}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
