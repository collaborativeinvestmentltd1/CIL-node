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

export async function registerUser(payload: { firstName: string; lastName: string; email: string; password: string; role: 'tenant' | 'landlord' | 'agent' | 'realEstate' | 'operations' | 'finance'; phone?: string; companyName?: string; companyWebsite?: string; dateOfBirth?: string; gender?: string; country?: string; state?: string; lga?: string; address?: string; nin?: string; bvn?: string; employer?: string; occupation?: string; incomeRange?: string; nextOfKin?: string; guarantor?: string }) {
  return request('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
}

export async function getSocialProfile(provider: 'google' | 'linkedin') {
  return new Promise<{ firstName: string; lastName: string; email: string }>((resolve, reject) => {
    const mockProfiles = {
      google: { firstName: 'Ada', lastName: 'Okoro', email: 'ada.okoro@gmail.com' },
      linkedin: { firstName: 'Emeka', lastName: 'Adebayo', email: 'emeka.adebayo@linkedin.com' },
    };
    setTimeout(() => {
      if (mockProfiles[provider]) {
        resolve(mockProfiles[provider]);
      } else {
        reject(new Error('Unable to fetch social profile'));
      }
    }, 450);
  });
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

const authApi = { loginUser, registerUser, getMe };
export default authApi;

