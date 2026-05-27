const BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = { ...((opts.headers as any) || {}) };
  if (!headers['Content-Type'] && !(opts.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  const res = await fetch(`${BASE}${path}`, { ...opts, headers, credentials: 'include' });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body?.error || body?.message || res.statusText);
  return body;
}

export async function loginUser(payload: { email: string; password: string }) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export async function registerUser(payload: { firstName: string; lastName: string; email: string; password: string; role: 'tenant' | 'landlord' }) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getMe(token: string) {
  return fetch(`${BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(async (res) => {
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body?.error || res.statusText);
    return body;
  });
}

export default { loginUser, registerUser, getMe };
